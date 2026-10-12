import type { PartRequest } from "@autoparts/shared";

function formatDate(date?: string) {
  if (!date) return "Fecha no disponible";

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function RequestCard({ request }: { request: PartRequest }) {
  const vehicle = `${request.vehicleInfo.make} ${request.vehicleInfo.model} ${request.vehicleInfo.year}`;

  return (
    <article className="group rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-700">
          {request.category}
        </span>
        <span className="text-xs font-semibold text-slate-400">{formatDate(request.createdAt)}</span>
      </div>
      <h3 className="mt-4 text-base font-black leading-6 text-slate-950">{request.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-5 text-slate-500">{request.description}</p>
      <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-slate-100 font-bold text-slate-500">V</span>
          <span><strong className="font-bold text-slate-800">Vehículo:</strong> {vehicle}</span>
        </div>
        {request.partNumber && (
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-slate-100 font-bold text-slate-500">#</span>
            <span><strong className="font-bold text-slate-800">Pieza:</strong> {request.partNumber}</span>
          </div>
        )}
        {request.location && (
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-slate-100 font-bold text-slate-500">L</span>
            <span><strong className="font-bold text-slate-800">Ubicación:</strong> {request.location}</span>
          </div>
        )}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400">Publicación reciente</span>
        <span className="text-xs font-bold text-orange-700 transition group-hover:text-orange-900">Ver solicitud →</span>
      </div>
    </article>
  );
}
