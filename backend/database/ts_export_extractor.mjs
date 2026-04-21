import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
let ts
try {
  ts = require('typescript')
} catch {
  const currentDir = path.dirname(fileURLToPath(import.meta.url))
  ts = require(path.resolve(currentDir, '../../frontend/node_modules/typescript'))
}

function parseArgs() {
  const [, , ...rest] = process.argv
  const out = { file: null }
  for (let i = 0; i < rest.length; i += 1) {
    const arg = rest[i]
    if (arg === '--file') {
      out.file = rest[i + 1]
      i += 1
    }
  }
  return out
}

function toValue(node) {
  if (!node) return null
  if (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) || ts.isSatisfiesExpression?.(node)) {
    return toValue(node.expression)
  }
  if (ts.isParenthesizedExpression(node)) return toValue(node.expression)
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (node.kind === ts.SyntaxKind.NullKeyword) return null

  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map(element => toValue(element))
  }

  if (ts.isObjectLiteralExpression(node)) {
    const out = {}
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) {
        const keyNode = prop.name
        let key = null
        if (ts.isIdentifier(keyNode) || ts.isStringLiteral(keyNode) || ts.isNumericLiteral(keyNode)) {
          key = keyNode.text
        } else if (ts.isComputedPropertyName(keyNode)) {
          continue
        }
        if (!key) continue
        out[key] = toValue(prop.initializer)
      } else if (ts.isShorthandPropertyAssignment(prop)) {
        out[prop.name.text] = `__unresolved_ref__:${prop.name.text}`
      }
    }
    return out
  }

  if (ts.isPrefixUnaryExpression(node)) {
    const val = toValue(node.operand)
    if (node.operator === ts.SyntaxKind.MinusToken && typeof val === 'number') return -val
    return val
  }

  if (ts.isIdentifier(node)) {
    return `__identifier__:${node.text}`
  }

  return '__unsupported__'
}

function extractFunctionMeta(functionNode, sourceText) {
  const statements = functionNode?.body?.statements ?? []
  const resultMessages = []
  let currentBand = 'default'

  for (const stmt of statements) {
    if (ts.isIfStatement(stmt)) {
      currentBand = sourceText.slice(stmt.expression.pos, stmt.expression.end).trim()
      const thenStatements = ts.isBlock(stmt.thenStatement)
        ? stmt.thenStatement.statements
        : [stmt.thenStatement]
      for (const thenStmt of thenStatements) {
        if (ts.isReturnStatement(thenStmt) && thenStmt.expression && ts.isObjectLiteralExpression(thenStmt.expression)) {
          resultMessages.push({
            score_band: currentBand,
            payload: toValue(thenStmt.expression)
          })
        }
      }
      let elseNode = stmt.elseStatement
      while (elseNode) {
        if (ts.isIfStatement(elseNode)) {
          currentBand = sourceText.slice(elseNode.expression.pos, elseNode.expression.end).trim()
          const nestedStatements = ts.isBlock(elseNode.thenStatement)
            ? elseNode.thenStatement.statements
            : [elseNode.thenStatement]
          for (const nestedStmt of nestedStatements) {
            if (
              ts.isReturnStatement(nestedStmt) &&
              nestedStmt.expression &&
              ts.isObjectLiteralExpression(nestedStmt.expression)
            ) {
              resultMessages.push({
                score_band: currentBand,
                payload: toValue(nestedStmt.expression)
              })
            }
          }
          elseNode = elseNode.elseStatement
        } else {
          const fallbackStatements = ts.isBlock(elseNode) ? elseNode.statements : [elseNode]
          for (const fallbackStmt of fallbackStatements) {
            if (
              ts.isReturnStatement(fallbackStmt) &&
              fallbackStmt.expression &&
              ts.isObjectLiteralExpression(fallbackStmt.expression)
            ) {
              resultMessages.push({
                score_band: 'else',
                payload: toValue(fallbackStmt.expression)
              })
            }
          }
          elseNode = null
        }
      }
    } else if (ts.isReturnStatement(stmt) && stmt.expression && ts.isObjectLiteralExpression(stmt.expression)) {
      resultMessages.push({
        score_band: 'default',
        payload: toValue(stmt.expression)
      })
    }
  }

  return resultMessages
}

function main() {
  const args = parseArgs()
  if (!args.file) {
    console.error('Missing --file argument')
    process.exit(1)
  }

  const sourceText = fs.readFileSync(args.file, 'utf8')
  const sourceFile = ts.createSourceFile(args.file, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

  const exportsPayload = {}
  const meta = {
    result_messages: []
  }

  for (const statement of sourceFile.statements) {
    if (
      ts.isVariableStatement(statement) &&
      statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name) || !declaration.initializer) continue
        const exportName = declaration.name.text
        exportsPayload[exportName] = toValue(declaration.initializer)
      }
    }

    if (
      ts.isFunctionDeclaration(statement) &&
      statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) &&
      statement.name
    ) {
      const fnName = statement.name.text
      if (fnName === 'getPerformanceMessage' || fnName === 'getResultMessage') {
        meta.result_messages.push(...extractFunctionMeta(statement, sourceText))
      }
    }
  }

  process.stdout.write(
    JSON.stringify(
      {
        exports: exportsPayload,
        meta
      },
      null,
      2
    )
  )
}

main()

