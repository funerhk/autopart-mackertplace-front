"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/store/auth-store";

export function AuthSessionSync() {
  const { data: session, status } = useSession();
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.email || !session.user.id) {
      return;
    }

    setSession(
      {
        id: session.user.id,
        email: session.user.email,
        firstName: session.user.name?.split(" ")[0] || "Usuario",
        lastName: session.user.name?.split(" ").slice(1).join(" ") || "Google",
        role: session.user.role,
      },
      {
        accessToken: session.user.accessToken || `google-session-${session.user.id}`,
      },
    );
  }, [session, setSession, status]);

  return null;
}
