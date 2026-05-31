import type { Language, UserLanguagePair, ChatApiResponse, ChatSession, ChatMessage } from "../app/Types";

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
