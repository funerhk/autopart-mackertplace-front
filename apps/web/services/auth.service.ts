import { endpoints, type AuthUser } from "@autoparts/shared";
import { apiFetch } from "@/lib/api";

interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "BUYER" | "SELLER";
  companyName?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user?: AuthUser;
}

export const authService = {
  register(payload: RegisterPayload) {
    return apiFetch<AuthResponse>(endpoints.auth.register, {
      method: "POST",
      body: payload,
    });
  },
  login(payload: LoginPayload) {
    return apiFetch<AuthResponse>(endpoints.auth.login, {
      method: "POST",
      body: payload,
    });
  },
};
