"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    await login.mutateAsync(values);
    router.push("/");
  };

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-md items-center px-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-bold">Iniciar sesion</h1>
        <input {...form.register("email")} placeholder="Email" className="w-full rounded-lg border border-slate-300 p-2" />
        <input {...form.register("password")} type="password" placeholder="Password" className="w-full rounded-lg border border-slate-300 p-2" />
        <button className="w-full rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white">Entrar</button>
      </form>
    </main>
  );
}
