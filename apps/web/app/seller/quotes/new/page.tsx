"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { bidsService } from "@/services/bids.service";

type FormValues = {
  requestId: string;
  price: number;
  description: string;
  condition: "NEW" | "USED" | "REFURBISHED";
  warranty: boolean;
  warrantyDetails?: string;
  estimatedDeliveryDays: number;
};

export default function SellerQuotePage() {
  const form = useForm<FormValues>({
    defaultValues: { condition: "NEW", warranty: true, estimatedDeliveryDays: 3 },
  });

  const mutation = useMutation({ mutationFn: bidsService.create });

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Enviar cotizacion</h1>
      <form
        onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
        className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4"
      >
        <input {...form.register("requestId")} placeholder="ID solicitud" className="w-full rounded-lg border border-slate-300 p-2" />
        <input {...form.register("price", { valueAsNumber: true })} type="number" step="0.01" placeholder="Precio" className="w-full rounded-lg border border-slate-300 p-2" />
        <textarea {...form.register("description")} placeholder="Descripcion" className="w-full rounded-lg border border-slate-300 p-2" />
        <select {...form.register("condition")} className="w-full rounded-lg border border-slate-300 p-2">
          <option value="NEW">Nuevo</option>
          <option value="USED">Usado</option>
          <option value="REFURBISHED">Reacondicionado</option>
        </select>
        <input {...form.register("estimatedDeliveryDays", { valueAsNumber: true })} type="number" placeholder="Dias estimados" className="w-full rounded-lg border border-slate-300 p-2" />
        <button className="rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white">Enviar oferta</button>
      </form>
    </div>
  );
}
