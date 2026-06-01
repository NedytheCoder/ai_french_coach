import { useCallback, useEffect, useState } from "react";
import { languagesApi, pairsApi, chatApi, progressApi, vocabularyApi, lessonApi } from "./api";
import type { Language, UserLanguagePair, ChatSession, ProgressData, VocabularyItem, LessonOut } from "../app/Types";

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

export function useProgress(token: string | null, pairId: number | null) {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!token || !pairId) return;
    setIsLoading(true);
    progressApi
      .get(token, pairId)
      .then((data) => setProgress(data))
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : "Failed to load progress")
      )
      .finally(() => setIsLoading(false));
  }, [token, pairId]);

  useEffect(() => {
    load();
  }, [load]);

  return { progress, isLoading, error };
}

export function useVocabulary(
  token: string | null,
  pairId: number | null,
  dueForReview = false
) {
  const [items, setItems] = useState<VocabularyItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!token || !pairId) return;
    setIsLoading(true);
    vocabularyApi
      .list(token, pairId, dueForReview)
      .then((data) => setItems(data.items))
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : "Failed to load vocabulary")
      )
      .finally(() => setIsLoading(false));
  }, [token, pairId, dueForReview]);

  useEffect(() => {
    load();
  }, [load]);

  return { items, isLoading, error, refetch: load };
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

export function useLesson(token: string | null, lessonId: number | null) {
  const [lesson, setLesson] = useState<LessonOut | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !lessonId) return;
    setIsLoading(true);
    lessonApi
      .get(token, lessonId)
      .then(setLesson)
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : "Failed to load lesson")
      )
      .finally(() => setIsLoading(false));
  }, [token, lessonId]);

  return { lesson, isLoading, error };
}
