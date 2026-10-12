"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthSessionSync } from "@/components/auth/auth-session-sync";
import { queryClient } from "@/lib/query-client";
import { ToastProvider } from "@/components/ui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AuthSessionSync />
          {children}
        </ToastProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
