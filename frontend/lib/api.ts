import type { Language, UserLanguagePair, ChatApiResponse, ChatSession, ChatMessage, ProgressData, VocabularyItem, ReviewResult, StartAssessmentResponse, SubmitAssessmentResponse, LessonOut, CompleteLessonResponse, WritingScoreResult, SpeakingScoreResult } from "../app/Types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) {
    const body = await res.json().catch(() => null) as Record<string, unknown> | null;
    const msg = String(body?.detail ?? body?.message ?? res.statusText ?? "Request failed");
    throw new Error(msg);
  }
  if (res.status === 204) return null as T;
  return res.json() as Promise<T>;
}

function authed(token: string): HeadersInit {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

export const languagesApi = {
  list: (): Promise<{ languages: Language[] }> =>
    request("/languages"),
};

export const pairsApi = {
  list: (token: string): Promise<{ pairs: UserLanguagePair[] }> =>
    request("/user/language-pairs", { headers: authed(token) }),

  create: (
    token: string,
    sourceCode: string,
    targetCode: string
  ): Promise<UserLanguagePair> =>
    request("/user/language-pairs", {
      method: "POST",
      headers: authed(token),
      body: JSON.stringify({ source_language_code: sourceCode, target_language_code: targetCode }),
    }),

  remove: (token: string, pairId: number): Promise<null> =>
    request(`/user/language-pairs/${pairId}`, {
      method: "DELETE",
      headers: authed(token),
    }),
};

export const transcriptionApi = {
  transcribe: (audio: Blob): Promise<{ transcription?: string; detail?: string }> => {
    const form = new FormData();
    form.append("file", audio, "recording.webm");
    return request("/conversation/transcribe", { method: "POST", body: form });
  },
};

export const progressApi = {
  get: (token: string, pairId: number): Promise<ProgressData> =>
    request(`/progress/${pairId}`, { headers: authed(token) }),
};

export const vocabularyApi = {
  list: (
    token: string,
    pairId: number,
    dueForReview = false,
    limit = 50
  ): Promise<{ items: VocabularyItem[] }> =>
    request(`/vocabulary?pair_id=${pairId}&due_for_review=${dueForReview}&limit=${limit}`, {
      headers: authed(token),
    }),

  review: (token: string, itemId: number, correct: boolean): Promise<ReviewResult> =>
    request(`/vocabulary/${itemId}/review`, {
      method: "POST",
      headers: authed(token),
      body: JSON.stringify({ correct }),
    }),
};

export const assessmentApi = {
  start: (
    token: string,
    pairId: number,
    assessmentType: "placement" | "progress",
    skills: string[]
  ): Promise<StartAssessmentResponse> =>
    request("/assessment/start", {
      method: "POST",
      headers: authed(token),
      body: JSON.stringify({ pair_id: pairId, assessment_type: assessmentType, skills }),
    }),

  submit: (
    token: string,
    assessmentId: number,
    answers: { question_id: string; skill: string; answer: string }[]
  ): Promise<SubmitAssessmentResponse> =>
    request(`/assessment/${assessmentId}/submit`, {
      method: "POST",
      headers: authed(token),
      body: JSON.stringify({ answers }),
    }),
};

export const lessonApi = {
  generate: (
    token: string,
    pairId: number,
    level: string,
    lessonType: string,
    topic?: string
  ): Promise<LessonOut> =>
    request("/lesson/generate", {
      method: "POST",
      headers: authed(token),
      body: JSON.stringify({
        pair_id: pairId,
        level,
        lesson_type: lessonType,
        ...(topic ? { topic } : {}),
      }),
    }),

  get: (token: string, lessonId: number): Promise<LessonOut> =>
    request(`/lesson/${lessonId}`, { headers: authed(token) }),

  complete: (
    token: string,
    lessonId: number,
    score: number,
    maxScore: number
  ): Promise<CompleteLessonResponse> =>
    request(`/lesson/${lessonId}/complete`, {
      method: "POST",
      headers: authed(token),
      body: JSON.stringify({ score, max_score: maxScore }),
    }),
};

export const scoringApi = {
  scoreWriting: (
    token: string,
    pairId: number,
    question: string,
    level: string,
    userAnswer: string,
    xpReward: number
  ): Promise<WritingScoreResult> =>
    request("/assessment/score-writing", {
      method: "POST",
      headers: authed(token),
      body: JSON.stringify({ pair_id: pairId, question, level, user_answer: userAnswer, xp_reward: xpReward }),
    }),

  scoreSpeaking: (
    token: string,
    audio: Blob,
    pairId: number,
    question: string,
    level: string,
    xpReward: number
  ): Promise<SpeakingScoreResult> => {
    const form = new FormData();
    form.append("audio", audio, "recording.webm");
    form.append("pair_id", String(pairId));
    form.append("question", question);
    form.append("level", level);
    form.append("xp_reward", String(xpReward));
    return request("/assessment/score-speaking", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
  },
};

export const chatApi = {
  send: (
    token: string,
    pairId: number,
    message: string,
    mode: string,
    sessionId?: number
  ): Promise<ChatApiResponse> =>
    request("/chat", {
      method: "POST",
      headers: authed(token),
      body: JSON.stringify({
        pair_id: pairId,
        message,
        mode,
        session_id: sessionId ?? null,
      }),
    }),

  getSessions: (
    token: string,
    pairId: number
  ): Promise<{ sessions: ChatSession[] }> =>
    request(`/chat/sessions?pair_id=${pairId}`, { headers: authed(token) }),

  getMessages: (
    token: string,
    sessionId: number
  ): Promise<{ session_id: number; messages: ChatMessage[] }> =>
    request(`/chat/sessions/${sessionId}/messages`, { headers: authed(token) }),
};
