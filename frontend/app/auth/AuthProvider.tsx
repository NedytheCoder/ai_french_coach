"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface AuthUser {
  id: number;
  email: string;
  display_name: string;
  source_language_code: string;
  created_at: string;
}

export interface AuthResponse {
  user: AuthUser;
  access_token: string;
  refresh_token: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthContextValue extends AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (displayName: string, email: string, password: string, sourceLanguageCode: string) => Promise<void>;
  logout: () => Promise<void>;
}

const STORAGE_KEY = "fc_auth_state";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const apiUrl = (path: string) => `${API_BASE_URL}${path}`;

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message = payload?.detail || payload?.message || response.statusText || "Request failed";
    throw new Error(message);
  }
  if (response.status === 204) return null;
  return response.json();
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (!saved) return;

        const parsed = JSON.parse(saved) as Partial<AuthState>;
        if (!parsed?.refreshToken) return;

        let token = parsed.accessToken ?? null;

        // Validate with GET /auth/me; fall back to refresh if access token is expired
        let meRes = token
          ? await fetch(apiUrl("/auth/me"), {
              headers: { Authorization: `Bearer ${token}` },
            })
          : null;

        if (!meRes || meRes.status === 401) {
          const refreshRes = await fetch(apiUrl("/auth/refresh"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: parsed.refreshToken }),
          });

          if (!refreshRes.ok) {
            window.localStorage.removeItem(STORAGE_KEY);
            return;
          }

          const refreshData = (await refreshRes.json()) as { access_token: string };
          token = refreshData.access_token;

          meRes = await fetch(apiUrl("/auth/me"), {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        if (!meRes || !meRes.ok) {
          window.localStorage.removeItem(STORAGE_KEY);
          return;
        }

        const validatedUser = (await meRes.json()) as AuthUser;
        setUser(validatedUser);
        setAccessToken(token);
        setRefreshToken(parsed.refreshToken);
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ user: validatedUser, accessToken: token, refreshToken: parsed.refreshToken })
        );
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const saveAuthState = (state: AuthState) => {
    setUser(state.user);
    setAccessToken(state.accessToken);
    setRefreshToken(state.refreshToken);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  const clearAuthState = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(apiUrl("/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const payload = (await handleResponse(response)) as AuthResponse;
    saveAuthState({
      user: payload.user,
      accessToken: payload.access_token,
      refreshToken: payload.refresh_token,
    });
  };

  const register = async (
    displayName: string,
    email: string,
    password: string,
    sourceLanguageCode: string
  ) => {
    const response = await fetch(apiUrl("/auth/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        display_name: displayName,
        email,
        password,
        source_language_code: sourceLanguageCode,
      }),
    });
    const payload = (await handleResponse(response)) as AuthResponse;
    saveAuthState({
      user: payload.user,
      accessToken: payload.access_token,
      refreshToken: payload.refresh_token,
    });
  };

  const logout = async () => {
    if (refreshToken) {
      await fetch(apiUrl("/auth/logout"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })
        .then(handleResponse)
        .catch(() => {
          // clear state even if the server-side revocation fails
        });
    }
    clearAuthState();
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      refreshToken,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
    }),
    [user, accessToken, refreshToken, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
