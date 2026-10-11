"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(["BUYER", "SELLER"]),
  companyName: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const { register } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { role: "BUYER" },
  });

  const onSubmit = async (values: FormValues) => {
    await register.mutateAsync(values);
  };

  const role = form.watch("role");

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-md items-center px-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3 rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-bold">Crear cuenta</h1>
        <input {...form.register("firstName")} placeholder="Nombre" className="w-full rounded-lg border border-slate-300 p-2" />
        <input {...form.register("lastName")} placeholder="Apellido" className="w-full rounded-lg border border-slate-300 p-2" />
        <input {...form.register("email")} placeholder="Email" className="w-full rounded-lg border border-slate-300 p-2" />
        <input {...form.register("password")} type="password" placeholder="Password" className="w-full rounded-lg border border-slate-300 p-2" />
        <select {...form.register("role")} className="w-full rounded-lg border border-slate-300 p-2">
          <option value="BUYER">Comprador</option>
          <option value="SELLER">Vendedor</option>
        </select>
        {role === "SELLER" && (
          <input {...form.register("companyName")} placeholder="Nombre empresa" className="w-full rounded-lg border border-slate-300 p-2" />
        )}
        <button className="w-full rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white">Registrarme</button>
      </form>
    </main>
  );
}
