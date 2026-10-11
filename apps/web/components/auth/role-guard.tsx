"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@autoparts/shared";
import { useAuthStore } from "@/store/auth-store";

export function RoleGuard({
  allow,
  children,
}: {
  allow: UserRole[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }
    if (!allow.includes(user.role)) {
      router.replace("/");
    }
  }, [allow, router, user]);

  if (!user || !allow.includes(user.role)) {
    return <div className="p-6 text-sm text-slate-600">Validando permisos...</div>;
  }

  return <>{children}</>;
}
