export default function SellerDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard vendedor</h1>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">Solicitudes activas: 12</div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">Ofertas enviadas: 34</div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">Ventas mes: 8</div>
      </div>
    </div>
  );
}
