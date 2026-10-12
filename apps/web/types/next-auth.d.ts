import type { DefaultSession } from "next-auth";
import type { UserRole } from "@autoparts/shared";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      accessToken?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    googleAccessToken?: string;
  }
}
