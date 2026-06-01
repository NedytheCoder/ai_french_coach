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

export interface DailyRecord {
  date: string
  xp_earned: number
  lessons_completed: number
}

export interface LevelProgress {
  current_level: string
  xp_in_level: number
  xp_required: number
  percent: number
}

export interface ProgressData {
  pair_id: number
  current_level: string
  total_xp: number
  streak_days: number
  longest_streak: number
  lessons_completed: number
  messages_sent: number
  daily_history: DailyRecord[]
  level_progress: LevelProgress
}

export interface VocabularyItem {
  id: number
  target_word: string
  source_translation: string
  context_sentence: string | null
  times_seen: number
  times_correct: number
  next_review_at: string | null
}

export interface ReviewResult {
  item_id: number
  next_review_at: string
  xp_awarded: number
}

export interface AssessmentQuestion {
  id: string
  skill: string
  type: "multiple_choice" | "open_response"
  level: string
  xp_reward: number
  instructions: string
  question?: string
  passage?: string        // multiple_choice — target-language text
  options?: string[]      // multiple_choice — source-language options
  placeholder?: string    // open_response
}

export interface AssessmentResult {
  overall_level: string
  skill_levels: Record<string, string>
  total_xp_awarded: number
  feedback: string
}

export interface StartAssessmentResponse {
  assessment_id: number
  questions: AssessmentQuestion[]
}

export interface SubmitAssessmentResponse {
  assessment_id: number
  result: AssessmentResult
}

export interface LessonOut {
  lesson_id: number
  pair_id: number
  level: string
  lesson_type: string
  title: string
  xp_reward: number
  content: Record<string, unknown>
  is_completed: boolean
  created_at: string
}

export interface CompleteLessonResponse {
  lesson_id: number
  xp_awarded: number
  total_xp: number
  level_up: boolean
  new_level: string | null
}

export interface WritingScoreResult {
  is_correct: boolean
  feedback: string
  xp_awarded: number
}

export interface SpeakingScoreResult {
  is_correct: boolean
  feedback: string
  xp_awarded: number
  transcription: string
}