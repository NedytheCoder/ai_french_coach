"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoading && !auth.user) {
      router.replace("/auth/login");
    }
  }, [auth.isLoading, auth.user, router]);

  if (auth.isLoading || !auth.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-xl shadow-slate-200/50 text-center">
          <p className="text-base font-medium text-slate-700">Checking authentication…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
