import { useCallback, useEffect, useState } from "react";
import { languagesApi, pairsApi, chatApi } from "./api";
import type { Language, UserLanguagePair, ChatSession } from "../app/Types";

export function useLanguages() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    languagesApi
      .list()
      .then((data) => setLanguages(data.languages))
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : "Failed to load languages")
      )
      .finally(() => setIsLoading(false));
  }, []);

  return { languages, isLoading, error };
}

export function usePairs(token: string | null) {
  const [pairs, setPairs] = useState<UserLanguagePair[]>([]);
  const [isLoading, setIsLoading] = useState(!!token);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!token) return;
    setIsLoading(true);
    pairsApi
      .list(token)
      .then((data) => setPairs(data.pairs))
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : "Failed to load language pairs")
      )
      .finally(() => setIsLoading(false));
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  return { pairs, isLoading, error, refetch: load };
}

export function useSessions(token: string | null, pairId: number | null) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(() => {
    if (!token || !pairId) return;
    setIsLoading(true);
    chatApi
      .getSessions(token, pairId)
      .then((data) => setSessions(data.sessions))
      .catch(() => setSessions([]))
      .finally(() => setIsLoading(false));
  }, [token, pairId]);

  useEffect(() => {
    load();
  }, [load]);

  return { sessions, isLoading, refetch: load };
}
