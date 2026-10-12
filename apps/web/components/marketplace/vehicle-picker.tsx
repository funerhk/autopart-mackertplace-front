"use client";

import { FormEvent, useState } from "react";

const storageKey = "autiko-selected-vehicle";

type VehicleMode = "make-model" | "vin";

export function VehiclePicker({ mobileLabel = false }: { mobileLabel?: boolean }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<VehicleMode | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [engine, setEngine] = useState("");
  const [vin, setVin] = useState("");

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = mode === "vin" ? `NIV: ${vin.toUpperCase()}` : `${year} ${make} ${model}${engine ? ` · ${engine}` : ""}`;
    setSelectedVehicle(value);
    window.localStorage.setItem(storageKey, value);
    setOpen(false);
    setMode(null);
  };

  const reset = () => {
    setSelectedVehicle("");
    window.localStorage.removeItem(storageKey);
  };

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="group relative inline-flex items-center gap-2 rounded-full px-2 py-2 text-slate-700 transition hover:bg-orange-50 hover:text-orange-700 sm:px-3"
      >
        <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white shadow-sm transition group-hover:border-orange-200 group-hover:bg-orange-50">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 11 1.7-4h10.6l1.7 4M4 11h16v6H4zM7 17v1.5M17 17v1.5M7 13h.01M17 13h.01" />
          </svg>
        </span>
        <span className={`${mobileLabel ? "inline" : "hidden sm:inline"} max-w-[160px] truncate text-xs font-bold`}>{selectedVehicle || "Agregar vehículo"}</span>
      </button>

      {open && (
        <div className="absolute left-0 top-12 z-50 w-[min(92vw,420px)] rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-2xl shadow-slate-900/15">
          {!mode ? (
            <>
              <div className="mb-4">
                <h2 className="text-lg font-black">Agregar vehículo</h2>
                <p className="mt-1 text-sm text-slate-500">Elige una de las siguientes opciones:</p>
              </div>
              <div className="space-y-3">
                <button type="button" onClick={() => setMode("make-model")} className="flex w-full items-center gap-4 rounded-xl bg-slate-100 p-4 text-left transition hover:bg-orange-50">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-slate-800 text-xl text-white">⌕</span>
                  <span>
                    <strong className="block text-base font-black">Marca / Modelo</strong>
                    <span className="mt-1 block text-sm text-slate-500">Buscar por año, marca, modelo y motor</span>
                  </span>
                </button>
                <button type="button" onClick={() => setMode("vin")} className="flex w-full items-center gap-4 rounded-xl bg-slate-100 p-4 text-left transition hover:bg-orange-50">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-slate-800 text-sm font-black text-white">NIV</span>
                  <span>
                    <strong className="block text-base font-black">NIV</strong>
                    <span className="mt-1 block text-sm text-slate-500">Buscar por número de serie</span>
                  </span>
                </button>
              </div>
              {selectedVehicle && (
                <button type="button" onClick={reset} className="mt-4 text-xs font-bold text-red-600 hover:text-red-800">Quitar vehículo seleccionado</button>
              )}
            </>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">Buscar autoparte</p>
                  <h2 className="mt-1 text-lg font-black">{mode === "vin" ? "Buscar por NIV" : "Marca y modelo"}</h2>
                </div>
                <button type="button" onClick={() => setMode(null)} className="text-xl text-slate-400 hover:text-slate-900" aria-label="Volver">×</button>
              </div>
              {mode === "vin" ? (
                <label className="block text-sm font-bold text-slate-700">
                  Número de serie (NIV)
                  <input value={vin} onChange={(event) => setVin(event.target.value)} minLength={6} required placeholder="Ej. 3N1CN7AP0KL000000" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm uppercase outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100" />
                </label>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-sm font-bold text-slate-700">
                    Año
                    <input value={year} onChange={(event) => setYear(event.target.value)} required placeholder="2020" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100" />
                  </label>
                  <label className="text-sm font-bold text-slate-700">
                    Marca
                    <input value={make} onChange={(event) => setMake(event.target.value)} required placeholder="Toyota" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100" />
                  </label>
                  <label className="text-sm font-bold text-slate-700">
                    Modelo
                    <input value={model} onChange={(event) => setModel(event.target.value)} required placeholder="Corolla" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100" />
                  </label>
                  <label className="text-sm font-bold text-slate-700">
                    Motor
                    <input value={engine} onChange={(event) => setEngine(event.target.value)} placeholder="1.8L" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100" />
                  </label>
                </div>
              )}
              <button type="submit" className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600">Guardar vehículo</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
