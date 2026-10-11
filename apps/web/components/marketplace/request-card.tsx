import type { PartRequest } from "@autoparts/shared";

export function RequestCard({ request }: { request: PartRequest }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="text-base font-semibold text-slate-900">{request.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{request.description}</p>
      <div className="mt-3 text-xs text-slate-500">
        {request.vehicleInfo.make} {request.vehicleInfo.model} {request.vehicleInfo.year}
      </div>
    </article>
  );
}
