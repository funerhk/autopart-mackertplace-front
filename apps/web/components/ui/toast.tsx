"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface ToastMessage {
  id: number;
  text: string;
}

const ToastContext = createContext<{ push: (text: string) => void }>({ push: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const push = useCallback((text: string) => {
    const id = Date.now();
    setMessages((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }, 2500);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 bottom-4 z-50 space-y-2">
        {messages.map((item) => (
          <div key={item.id} className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
            {item.text}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
