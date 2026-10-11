"use client";

import { API_BASE_URL } from "@autoparts/shared";
import { useAuthStore } from "@/store/auth-store";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  auth?: boolean;
}

async function tryRefreshToken(): Promise<string | null> {
  const { refreshToken, setTokens, logout } = useAuthStore.getState();
  const refreshPath = process.env.NEXT_PUBLIC_AUTH_REFRESH_PATH;

  if (!refreshPath || !refreshToken) {
    logout();
    return null;
  }

  const response = await fetch(`${API_BASE_URL}${refreshPath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    logout();
    return null;
  }

  const data = (await response.json()) as {
    access_token?: string;
    refresh_token?: string;
  };

  if (!data.access_token) {
    logout();
    return null;
  }

  setTokens({ accessToken: data.access_token, refreshToken: data.refresh_token });
  return data.access_token;
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { accessToken } = useAuthStore.getState();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.auth && accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (response.status === 401 && options.auth) {
    const refreshedToken = await tryRefreshToken();
    if (refreshedToken) {
      return apiFetch<T>(path, options);
    }
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed (${response.status})`);
  }

  return response.json() as Promise<T>;
}
