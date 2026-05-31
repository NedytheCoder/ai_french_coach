"use client";

import React, { createContext, useContext, useState } from "react";
import type { UserLanguagePair } from "./Types";

interface LanguagePairContextValue {
  activePair: UserLanguagePair | null;
  setActivePair: (pair: UserLanguagePair | null) => void;
}

const LanguagePairContext = createContext<LanguagePairContextValue | undefined>(undefined);

export function LanguagePairProvider({ children }: { children: React.ReactNode }) {
  const [activePair, setActivePair] = useState<UserLanguagePair | null>(null);

  return (
    <LanguagePairContext.Provider value={{ activePair, setActivePair }}>
      {children}
    </LanguagePairContext.Provider>
  );
}

export function useLanguagePair() {
  const context = useContext(LanguagePairContext);
  if (!context) {
    throw new Error("useLanguagePair must be used within LanguagePairProvider");
  }
  return context;
}
