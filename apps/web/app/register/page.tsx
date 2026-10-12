"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { demoAuthService } from "@/services/demo-auth.service";
import { useAuthStore } from "@/store/auth-store";

const schema = z.object({
  firstName: z.string().min(2, "Ingresa tu nombre"),
  lastName: z.string().min(2, "Ingresa tu apellido"),
  email: z.email("Ingresa un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.enum(["BUYER", "SELLER"]),
  companyName: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const [error, setError] = useState("");
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { role: "BUYER" },
  });
  const role = form.watch("role");
  const formError = form.formState.errors;

  const onSubmit = (values: FormValues) => {
    setError("");

    try {
      const response = demoAuthService.register(values);
      setSession(response.user, response.tokens);
      router.push(response.user.role === "SELLER" ? "/seller/dashboard" : "/buyer/requests");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "No fue posible crear la cuenta.");
    }
  };

  return (
    <main className="relative flex min-h-[calc(100vh-73px)] items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-amber-100/70 blur-3xl" />

      <section className="relative w-full max-w-lg rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-[0_24px_80px_-35px_rgba(15,23,42,0.45)] sm:p-10">
        <div className="text-center">
          <Link href="/" aria-label="Volver al inicio" className="inline-flex justify-center">
            <Image
              src="/autiko-lockup.png"
              alt="Autiko Marketplace de autopartes"
              width={1024}
              height={512}
              className="h-14 w-auto object-contain"
            />
          </Link>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Únete a Autiko</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Crear cuenta</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">Regístrate para comprar, solicitar o vender autopartes.</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-bold text-slate-700">
              Nombre
              <input {...form.register("firstName")} placeholder="Alex" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100" />
              {formError.firstName && <span className="mt-1 block text-xs font-semibold text-red-600">{formError.firstName.message}</span>}
            </label>
            <label className="block text-sm font-bold text-slate-700">
              Apellido
              <input {...form.register("lastName")} placeholder="Mendoza" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100" />
              {formError.lastName && <span className="mt-1 block text-xs font-semibold text-red-600">{formError.lastName.message}</span>}
            </label>
          </div>

          <label className="block text-sm font-bold text-slate-700">
            Usuario o email
            <input {...form.register("email")} type="email" autoComplete="email" placeholder="tu@email.com" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100" />
            {formError.email && <span className="mt-1 block text-xs font-semibold text-red-600">{formError.email.message}</span>}
          </label>

          <label className="block text-sm font-bold text-slate-700">
            Contraseña
            <input {...form.register("password")} type="password" autoComplete="new-password" placeholder="Mínimo 6 caracteres" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100" />
            {formError.password && <span className="mt-1 block text-xs font-semibold text-red-600">{formError.password.message}</span>}
          </label>

          <label className="block text-sm font-bold text-slate-700">
            Tipo de cuenta
            <select {...form.register("role")} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100">
              <option value="BUYER">Comprador</option>
              <option value="SELLER">Vendedor</option>
            </select>
          </label>

          {role === "SELLER" && (
            <label className="block text-sm font-bold text-slate-700">
              Nombre de empresa
              <input {...form.register("companyName")} placeholder="Autiko Parts" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100" />
            </label>
          )}

          {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">{error}</p>}

          <button type="submit" className="w-full rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl">
            Crear cuenta
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-bold text-orange-700 hover:text-orange-900">Inicia sesión</Link>
        </p>
        <p className="mt-4 text-center text-xs leading-5 text-slate-400">Registro local de demostración. Se conectará al backend cuando el endpoint esté disponible.</p>
      </section>
    </main>
  );
}
