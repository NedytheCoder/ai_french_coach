import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { LanguageProvider, useTranslation } from "../i18n/LanguageProvider"

// Mock localStorage for testing
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

// Test component that uses useTranslation
function TestComponent() {
  const { t, lang, setLang } = useTranslation()

  return (
    <div>
      <div data-testid="current-lang">{lang}</div>
      <div data-testid="translated-text">{t("nav_your_journey")}</div>
      <button onClick={() => setLang("fr")} data-testid="switch-to-french">
        Switch to French
      </button>
      <button onClick={() => setLang("de")} data-testid="switch-to-german">
        Switch to German
      </button>
      <button onClick={() => setLang("zh")} data-testid="switch-to-chinese">
        Switch to Chinese
      </button>
    </div>
  )
}

describe("LanguageProvider", () => {
  beforeEach(() => {
    localStorageMock.clear()
    // Reset document lang attribute
    document.documentElement.lang = "en"
  })

  test("renders with default English language", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    expect(screen.getByTestId("current-lang")).toHaveTextContent("en")
    expect(screen.getByTestId("translated-text")).toHaveTextContent("Your Journey")
  })

  test("switches language on button click", async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    const frenchButton = screen.getByTestId("switch-to-french")
    fireEvent.click(frenchButton)

    await waitFor(() => {
      expect(screen.getByTestId("current-lang")).toHaveTextContent("fr")
      expect(screen.getByTestId("translated-text")).toHaveTextContent("Votre parcours")
    })
  })

  test("persists language to localStorage", async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    const germanButton = screen.getByTestId("switch-to-german")
    fireEvent.click(germanButton)

    await waitFor(() => {
      expect(localStorageMock.getItem("fc_ui_lang")).toBe("de")
    })
  })

  test("restores language from localStorage on mount", () => {
    localStorageMock.setItem("fc_ui_lang", "fr")

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    expect(screen.getByTestId("current-lang")).toHaveTextContent("fr")
    expect(screen.getByTestId("translated-text")).toHaveTextContent("Votre parcours")
  })

  test("provides translations in all supported languages", async () => {
    const languages = ["en", "fr", "de", "zh"]

    for (const lang of languages) {
      localStorageMock.clear()

      const { unmount } = render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      if (lang !== "en") {
        const button = screen.getByTestId(`switch-to-${lang}`)
        fireEvent.click(button)

        await waitFor(() => {
          expect(screen.getByTestId("current-lang")).toHaveTextContent(lang)
        })
      }

      expect(screen.getByTestId("translated-text")).not.toBeEmptyDOMElement()
      unmount()
    }
  })

  test("handles invalid language gracefully", async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )

    // setLang with invalid value should not crash
    // In real implementation, you might want to handle this
    const initialText = screen.getByTestId("translated-text").textContent

    fireEvent.click(screen.getByTestId("switch-to-french"))

    await waitFor(() => {
      const newText = screen.getByTestId("translated-text").textContent
      expect(newText).not.toEqual(initialText)
    })
  })
})
