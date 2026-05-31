"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaPlus, FaTrash, FaArrowRight, FaGlobe, FaFire } from "react-icons/fa";
import { AuthGuard } from "../auth/AuthGuard";
import { useAuth } from "../auth/AuthProvider";
import { useLanguages, usePairs } from "../../lib/hooks";
import { pairsApi } from "../../lib/api";
import type { UserLanguagePair } from "../Types";

export default function LanguagesPage() {
  return (
    <AuthGuard>
      <LanguagesContent />
    </AuthGuard>
  );
}

function LanguagesContent() {
  const { accessToken } = useAuth();
  const { languages, isLoading: langsLoading } = useLanguages();
  const { pairs, isLoading: pairsLoading, refetch } = usePairs(accessToken);

  const [sourceCode, setSourceCode] = useState("");
  const [targetCode, setTargetCode] = useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !sourceCode || !targetCode) return;
    if (sourceCode === targetCode) {
      setAddError("Source and target language must be different.");
      return;
    }
    setAdding(true);
    setAddError("");
    try {
      await pairsApi.create(accessToken, sourceCode, targetCode);
      setSourceCode("");
      setTargetCode("");
      refetch();
    } catch (err) {
      setAddError(err instanceof Error ? err.message : "Failed to add language pair.");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (pairId: number) => {
    if (!accessToken) return;
    setDeletingId(pairId);
    try {
      await pairsApi.remove(accessToken, pairId);
      refetch();
    } catch {
      // silently ignore — pair still shows until refetch
    } finally {
      setDeletingId(null);
    }
  };

  const languageOptions = languages.map((l) => ({
    value: l.code,
    label: l.name,
    nativeName: l.native_name,
    isRtl: l.is_rtl,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">
            <span>← Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <FaGlobe className="text-indigo-500 w-4 h-4" />
            <span className="font-semibold text-slate-800">My Languages</span>
          </div>
          <div className="w-20" />
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* Add Language Pair */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm shadow-slate-100 p-6"
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Add a language</h2>
          <p className="text-sm text-slate-500 mb-5">Choose what you already speak and what you want to learn.</p>

          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">I speak</label>
                <select
                  value={sourceCode}
                  onChange={(e) => { setSourceCode(e.target.value); setAddError(""); }}
                  disabled={langsLoading}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent disabled:opacity-50"
                >
                  <option value="">Select a language</option>
                  {languageOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">I want to learn</label>
                <select
                  value={targetCode}
                  onChange={(e) => { setTargetCode(e.target.value); setAddError(""); }}
                  disabled={langsLoading}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent disabled:opacity-50"
                >
                  <option value="">Select a language</option>
                  {languageOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}{opt.nativeName !== opt.label ? ` — ${opt.nativeName}` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <AnimatePresence>
              {addError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2"
                >
                  {addError}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={adding || !sourceCode || !targetCode}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              <FaPlus className="w-3.5 h-3.5" />
              {adding ? "Adding…" : "Add language pair"}
            </button>
          </form>
        </motion.section>

        {/* Active Pairs */}
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            {pairsLoading ? "Loading your languages…" : pairs.length === 0 ? "No languages added yet" : `Your languages (${pairs.length})`}
          </h2>

          {!pairsLoading && pairs.length === 0 && (
            <p className="text-sm text-slate-500">Add your first language pair above to get started.</p>
          )}

          <div className="space-y-3">
            <AnimatePresence>
              {pairs.map((pair) => (
                <PairCard
                  key={pair.id}
                  pair={pair}
                  deleting={deletingId === pair.id}
                  onDelete={() => handleDelete(pair.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}

function PairCard({
  pair,
  deleting,
  onDelete,
}: {
  pair: UserLanguagePair;
  deleting: boolean;
  onDelete: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm shadow-slate-100 p-5 flex flex-col sm:flex-row sm:items-center gap-4"
    >
      {/* Languages */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-semibold text-slate-800">{pair.source_language.name}</span>
          <FaArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="text-base font-semibold text-indigo-700">{pair.target_language.name}</span>
        </div>
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
            {pair.current_level}
          </span>
          <span className="text-xs text-slate-500">{pair.total_xp.toLocaleString()} XP</span>
          {pair.streak_days > 0 && (
            <span className="flex items-center gap-1 text-xs text-orange-600 font-medium">
              <FaFire className="w-3 h-3" />
              {pair.streak_days}-day streak
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/learn/${pair.id}/chat`}
          className="flex items-center gap-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-colors"
        >
          Start learning <FaArrowRight className="w-3 h-3" />
        </Link>

        {confirmDelete ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setConfirmDelete(false); onDelete(); }}
              disabled={deleting}
              className="text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 px-3 py-2 rounded-xl transition-colors disabled:opacity-50"
            >
              {deleting ? "Removing…" : "Confirm"}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-xs font-medium text-slate-600 hover:text-slate-800 px-3 py-2 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-xl hover:bg-rose-50"
            aria-label="Remove language pair"
          >
            <FaTrash className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
