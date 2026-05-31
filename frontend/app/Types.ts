export interface Level {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  xp: number
  level_code: string
}

export interface Language {
  id: number
  code: string
  name: string
  native_name: string
  is_active: boolean
  is_rtl: boolean
}

export interface LanguageBrief {
  code: string
  name: string
}

export interface UserLanguagePair {
  id: number
  source_language: LanguageBrief
  target_language: LanguageBrief
  current_level: string
  total_xp: number
  streak_days: number
  created_at: string
}

export interface ChatApiResponse {
  session_id: number
  reply: string
  xp_awarded: number
  vocabulary_saved: string[]
}

export interface ChatSession {
  id: number
  pair_id: number
  mode: string
  message_count: number
  created_at: string
  last_message_at: string | null
}

export interface ChatMessage {
  id: number
  role: "user" | "assistant"
  content: string
  created_at: string
}