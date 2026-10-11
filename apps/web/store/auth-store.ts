"use client";

import { create } from "zustand";
import type { AuthTokens, AuthUser } from "@autoparts/shared";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  setSession: (user: AuthUser, tokens: AuthTokens) => void;
  setTokens: (tokens: AuthTokens) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setSession: (user, tokens) =>
    set({
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken || null,
    }),
  setTokens: (tokens) =>
    set({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken || null,
    }),
  logout: () => set({ user: null, accessToken: null, refreshToken: null }),
}));
