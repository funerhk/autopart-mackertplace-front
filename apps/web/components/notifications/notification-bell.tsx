"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationsService } from "@/services/notifications.service";

function formatDate(date?: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
  }).format(new Date(date));
}

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data = [] } = useQuery({
    queryKey: ["demo-notifications"],
    queryFn: notificationsService.listDemo,
  });
  const markAsRead = useMutation({
    mutationFn: notificationsService.markDemoAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["demo-notifications"] }),
  });
  const unreadCount = data.filter((notification) => !notification.read).length;

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={`Notificaciones, ${unreadCount} sin leer`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="group relative grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-[10px] font-black leading-none text-white shadow-sm ring-2 ring-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div>
              <h2 className="text-sm font-black text-slate-950">Notificaciones</h2>
              <p className="mt-0.5 text-xs text-slate-400">Actividad relacionada con tus solicitudes</p>
            </div>
            {unreadCount > 0 && <span className="text-xs font-bold text-orange-600">{unreadCount} nuevas</span>}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {data.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-slate-500">No tienes notificaciones.</p>
            ) : data.map((notification) => (
              <div key={notification.id} className={`border-b border-slate-100 px-4 py-3 last:border-0 ${notification.read ? "bg-white" : "bg-orange-50/50"}`}>
                <div className="flex gap-3">
                  <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${notification.read ? "bg-slate-300" : "bg-orange-500"}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-slate-800">{notification.title}</p>
                      <span className="shrink-0 text-[10px] font-semibold text-slate-400">{formatDate(notification.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{notification.message}</p>
                    <div className="mt-2 flex items-center gap-3">
                      {notification.requestId && (
                        <Link href={`/buyer/requests?request=${notification.requestId}`} onClick={() => setOpen(false)} className="text-xs font-bold text-orange-700 hover:text-orange-900">
                          Ver solicitud
                        </Link>
                      )}
                      {!notification.read && (
                        <button type="button" onClick={() => markAsRead.mutate(notification.id)} className="text-xs font-semibold text-slate-400 hover:text-slate-700">
                          Marcar leída
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
