"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { PartRequest } from "@autoparts/shared";
import { RequestCard } from "@/components/marketplace/request-card";
import { Loader } from "@/components/ui/loader";
import { requestsService } from "@/services/requests.service";

const schema = z.object({
  title: z.string().min(4, "Escribe qué pieza estás buscando"),
  description: z.string().min(10, "Agrega más detalles a tu solicitud"),
  category: z.string().min(2, "Selecciona una categoría"),
  partNumber: z.string().optional(),
  make: z.string().min(2, "Indica la marca"),
  model: z.string().min(1, "Indica el modelo"),
  year: z.number().min(1950, "Año inválido").max(2035, "Año inválido"),
  location: z.string().min(3, "Indica tu ciudad o estado"),
});

type FormValues = z.infer<typeof schema>;

const inputClass = "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100";

export default function BuyerRequestsPage() {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState("");
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { category: "Frenos" },
  });
  const { data = [], isLoading } = useQuery({
    queryKey: ["my-requests"],
    queryFn: requestsService.listMine,
  });
  const mutation = useMutation({
    mutationFn: (values: FormValues) => {
      const payload: Omit<PartRequest, "id" | "createdAt"> = {
        title: values.title,
        description: values.description,
        category: values.category,
        partNumber: values.partNumber || undefined,
        location: values.location,
        vehicleInfo: {
          make: values.make,
          model: values.model,
          year: values.year,
        },
      };
      return requestsService.create(payload);
    },
    onSuccess: () => {
      form.reset({ category: "Frenos" });
      setSuccess("Tu solicitud fue publicada correctamente.");
      queryClient.invalidateQueries({ queryKey: ["my-requests"] });
    },
  });

  const onSubmit = (values: FormValues) => {
    setSuccess("");
    mutation.mutate(values);
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <section className="mb-8 rounded-[2rem] bg-[#171a1f] p-6 text-white shadow-xl shadow-slate-300/20 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">Área de comprador</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Mis solicitudes</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Publica la pieza que necesitas y permite que vendedores especializados te envíen una cotización.
        </p>
      </section>

      <div className="grid gap-8 xl:grid-cols-[390px_1fr]">
        <section className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:sticky xl:top-28">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Nueva publicación</p>
            <h2 className="mt-1 text-xl font-black text-slate-950">¿Qué autoparte necesitas?</h2>
            <p className="mt-2 text-sm leading-5 text-slate-500">Mientras más detalles agregues, mejores cotizaciones recibirás.</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <label className="block text-sm font-bold text-slate-700">
              Título de la solicitud
              <input {...form.register("title")} placeholder="Ej. Faro izquierdo para Ford F-250" className={inputClass} />
              {form.formState.errors.title && <span className="mt-1 block text-xs font-semibold text-red-600">{form.formState.errors.title.message}</span>}
            </label>

            <label className="block text-sm font-bold text-slate-700">
              Descripción
              <textarea {...form.register("description")} rows={3} placeholder="Describe la pieza, condición, garantía o envío que necesitas" className={inputClass} />
              {form.formState.errors.description && <span className="mt-1 block text-xs font-semibold text-red-600">{form.formState.errors.description.message}</span>}
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm font-bold text-slate-700">
                Categoría
                <select {...form.register("category")} className={inputClass}>
                  <option>Frenos</option>
                  <option>Motor</option>
                  <option>Eléctrico</option>
                  <option>Iluminación</option>
                  <option>Carrocería</option>
                  <option>Suspensión</option>
                  <option>Transmisión</option>
                  <option>Mantenimiento</option>
                </select>
              </label>
              <label className="block text-sm font-bold text-slate-700">
                Número de pieza
                <input {...form.register("partNumber")} placeholder="Opcional" className={inputClass} />
              </label>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Vehículo</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <label className="block text-sm font-bold text-slate-700">
                  Marca
                  <input {...form.register("make")} placeholder="Ford" className={inputClass} />
                </label>
                <label className="block text-sm font-bold text-slate-700">
                  Modelo
                  <input {...form.register("model")} placeholder="F-250" className={inputClass} />
                </label>
              </div>
              <label className="mt-3 block text-sm font-bold text-slate-700">
                Año
                <input {...form.register("year", { valueAsNumber: true })} type="number" placeholder="2024" className={inputClass} />
              </label>
            </div>

            <label className="block text-sm font-bold text-slate-700">
              Ubicación
              <input {...form.register("location")} placeholder="Ciudad, Estado" className={inputClass} />
            </label>

            {mutation.isError && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">No fue posible publicar la solicitud.</p>}
            {success && <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{success}</p>}

            <button type="submit" disabled={mutation.isPending} className="w-full rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60">
              {mutation.isPending ? "Publicando..." : "Publicar solicitud"}
            </button>
          </form>
        </section>

        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Historial</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">Tus publicaciones</h2>
            </div>
            <span className="text-sm font-semibold text-slate-400">{data.length} solicitudes</span>
          </div>
          {isLoading ? <Loader /> : data.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {data.map((request) => <RequestCard key={request.id} request={request} />)}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <h3 className="text-lg font-black text-slate-900">Aún no tienes solicitudes</h3>
              <p className="mt-2 text-sm text-slate-500">Completa el formulario para publicar tu primera búsqueda.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
