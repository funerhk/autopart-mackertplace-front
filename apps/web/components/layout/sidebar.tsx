import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-full rounded-2xl border border-slate-200 bg-white p-4 lg:w-64">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Vendedor</h3>
      <div className="space-y-2 text-sm text-slate-700">
        <Link className="block" href="/seller/dashboard">Dashboard</Link>
        <Link className="block" href="/seller/products/new">Publicar producto</Link>
        <Link className="block" href="/seller/inventory">Inventario</Link>
        <Link className="block" href="/seller/requests">Solicitudes</Link>
        <Link className="block" href="/seller/quotes/new">Enviar cotizacion</Link>
        <Link className="block" href="/seller/sales">Ventas</Link>
        <Link className="block" href="/seller/stats">Estadisticas</Link>
      </div>
    </aside>
  );
}
