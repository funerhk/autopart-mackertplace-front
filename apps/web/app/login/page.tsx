"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    void signIn("google", { callbackUrl: "/" });
  };

  return (
    <main className="relative flex min-h-[calc(100vh-73px)] items-center justify-center overflow-hidden px-4 py-12">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-amber-100/70 blur-3xl" />

      <section className="relative w-full max-w-md rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-[0_24px_80px_-35px_rgba(15,23,42,0.45)] sm:p-10">
        <div className="text-center">
          <Link href="/" aria-label="Volver al inicio" className="inline-flex justify-center">
            <Image
              src="/autiko-lockup.png"
              alt="Autiko Marketplace de autopartes"
              width={1024}
              height={512}
              className="h-16 w-auto object-contain"
            />
          </Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Bienvenido a Autiko</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Iniciar sesión</h1>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-500">
            Inicia sesión de forma segura con tu cuenta de Google.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full border border-slate-200 text-sm font-black">G</span>
          Continuar con Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Al continuar, aceptas iniciar sesión en Autiko con tu cuenta de Google.
        </p>
      </section>
    </main>
  );
}
