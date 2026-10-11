"use client";

import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";

export function useAuth() {
  const store = useAuthStore();

  const login = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      if (data.user) {
        store.setSession(data.user, {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        });
      }
    },
  });

  const register = useMutation({
    mutationFn: authService.register,
  });

  return {
    user: store.user,
    accessToken: store.accessToken,
    login,
    register,
    logout: store.logout,
  };
}
