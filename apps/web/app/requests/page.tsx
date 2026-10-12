"use client";

import { FormEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RequestCard } from "@/components/marketplace/request-card";
import { Loader } from "@/components/ui/loader";
import { requestsService } from "@/services/requests.service";

export default function PublicRequestsPage() {
  const [city, setCity] = useState("");
  const [appliedCity, setAppliedCity] = useState("");
  const { data = [], isLoading } = useQuery({
    queryKey: ["public-requests", appliedCity],
    queryFn: () => requestsService.listPublic(appliedCity),
  });

  const handleCitySearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAppliedCity(city.trim());
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <section className="rounded-[2rem] bg-[#171a1f] p-6 text-white shadow-xl shadow-slate-300/20 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">Solicitudes abiertas</p>
        <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Encuentra la pieza que alguien está buscando</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Explora publicaciones de compradores y descubre oportunidades para ofrecer autopartes compatibles.
            </p>
          </div>
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold text-slate-200">Feed público · Más recientes primero</span>
        </div>
      </section>

      <form onSubmit={handleCitySearch} className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
        <label className="flex-1 text-sm font-bold text-slate-700">
          Buscar por ciudad o ubicación
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Ej. Monterrey, Guadalajara o Ciudad de México"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
          />
        </label>
        <div className="flex items-end gap-2">
          <button type="submit" className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600">Buscar</button>
          {appliedCity && <button type="button" onClick={() => { setCity(""); setAppliedCity(""); }} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50">Todas</button>}
        </div>
      </form>

      <section className="mt-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Publicaciones de piezas</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">{appliedCity ? `Solicitudes en ${appliedCity}` : "Solicitudes recientes"}</h2>
          </div>
          {!isLoading && <span className="text-sm font-semibold text-slate-400">{data.length} publicaciones</span>}
        </div>

        {isLoading ? (
          <Loader />
        ) : data.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">
            No hay solicitudes publicadas por el momento.
          </div>
        )}
      </section>
    </main>
  );
}
