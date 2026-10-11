"use client";

import { useAuthStore } from "@/store/auth-store";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">Perfil</h1>
      {!user ? (
        <p className="mt-3 text-slate-600">Inicia sesion para ver tu informacion.</p>
      ) : (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
          <p>{user.firstName} {user.lastName}</p>
          <p className="text-slate-600">{user.email}</p>
          <p className="text-slate-600">Rol: {user.role}</p>
        </div>
      )}
    </main>
  );
}
