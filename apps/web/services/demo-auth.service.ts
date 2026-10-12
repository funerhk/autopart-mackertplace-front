import type { AuthTokens, AuthUser } from "@autoparts/shared";

export interface DemoCredentials {
  email: string;
  password: string;
}

export interface DemoRegistration extends DemoCredentials {
  firstName: string;
  lastName: string;
  role: "BUYER" | "SELLER";
  companyName?: string;
}

export interface DemoAuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

const demoAccounts = new Map<string, { user: AuthUser; password: string }>([
  [
    "vendedor.demo@autiko.test",
    {
      password: "demo123",
      user: {
        id: "demo-seller",
        email: "vendedor.demo@autiko.test",
        firstName: "Alex",
        lastName: "Mendoza",
        role: "SELLER",
        companyName: "Autiko Parts Demo",
      },
    },
  ],
  [
    "comprador.demo@autiko.test",
    {
      password: "demo123",
      user: {
        id: "demo-buyer",
        email: "comprador.demo@autiko.test",
        firstName: "María",
        lastName: "López",
        role: "BUYER",
      },
    },
  ],
]);

function buildResponse(user: AuthUser): DemoAuthResponse {
  return {
    user,
    tokens: {
      accessToken: `demo-access-${user.id}`,
      refreshToken: `demo-refresh-${user.id}`,
    },
  };
}

export const demoAuthService = {
  login({ email, password }: DemoCredentials): DemoAuthResponse {
    const account = demoAccounts.get(email.trim().toLowerCase());

    if (!account || account.password !== password) {
      throw new Error("Usuario o contraseña incorrectos.");
    }

    return buildResponse(account.user);
  },
  register(payload: DemoRegistration): DemoAuthResponse {
    const email = payload.email.trim().toLowerCase();

    if (demoAccounts.has(email)) {
      throw new Error("Ya existe una cuenta con este email.");
    }

    const user: AuthUser = {
      id: `demo-${Date.now()}`,
      email,
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
      role: payload.role,
      companyName: payload.companyName?.trim() || undefined,
    };

    demoAccounts.set(email, { user, password: payload.password });
    return buildResponse(user);
  },
};
