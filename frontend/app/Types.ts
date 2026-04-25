export interface Level {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  xp: number
  level_code: string
}