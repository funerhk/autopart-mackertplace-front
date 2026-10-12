import Link from "next/link";

const metrics = [
  { label: "Ventas del mes", value: "$8,460", detail: "+18.4% vs. mes anterior", tone: "orange" },
  { label: "Pedidos activos", value: "24", detail: "6 requieren atención", tone: "blue" },
  { label: "Ofertas enviadas", value: "68", detail: "12 aceptadas este mes", tone: "violet" },
  { label: "Conversión", value: "17.6%", detail: "+3.2% esta semana", tone: "emerald" },
];

const sales = [
  { day: "Lun", value: 42 },
  { day: "Mar", value: 58 },
  { day: "Mié", value: 36 },
  { day: "Jue", value: 74 },
  { day: "Vie", value: 62 },
  { day: "Sáb", value: 88 },
  { day: "Dom", value: 51 },
];

const requests = [
  { title: "Kit de distribución Toyota Corolla", vehicle: "Corolla 2018 · Motor", offers: 4, time: "Hace 12 min" },
  { title: "Pastillas de freno Ford Territory", vehicle: "Territory 2022 · Frenos", offers: 2, time: "Hace 38 min" },
  { title: "Alternador Chevrolet Aveo", vehicle: "Aveo 2015 · Eléctrico", offers: 7, time: "Hace 1 h" },
];

const activities = [
  { title: "Oferta aceptada", description: "Batería 12V Toyota Corolla", amount: "+$149.50", color: "bg-emerald-500" },
  { title: "Nuevo pedido", description: "Kit de frenos Ford Territory", amount: "$249.99", color: "bg-orange-500" },
  { title: "Producto publicado", description: "Amortiguador delantero Mazda 3", amount: "Publicado", color: "bg-sky-500" },
];

const metricStyles = {
  orange: "bg-orange-50 text-orange-700",
  blue: "bg-sky-50 text-sky-700",
  violet: "bg-violet-50 text-violet-700",
  emerald: "bg-emerald-50 text-emerald-700",
};

export default function SellerDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-5 rounded-[2rem] bg-[#171a1f] p-6 text-white shadow-xl shadow-slate-300/20 sm:flex-row sm:items-center sm:p-8">
        <div>
          <div className="mb-3 inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-300">
            Panel de vendedor
          </div>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Buenos días, vendedor</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
            Revisa el rendimiento de tu tienda, responde solicitudes y mantén tus ventas en movimiento.
          </p>
        </div>
        <Link href="/seller/products/new" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-400">
          Publicar producto <span className="ml-2 text-lg">+</span>
        </Link>
      </section>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Resumen</p>
          <h2 className="mt-1 text-xl font-black text-slate-950">Rendimiento de tu tienda</h2>
        </div>
        <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-bold text-amber-700">Datos de demostración</span>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-slate-500">{metric.label}</p>
              <span className={`h-2.5 w-2.5 rounded-full ${metricStyles[metric.tone as keyof typeof metricStyles]}`} />
            </div>
            <p className="mt-4 text-3xl font-black tracking-tight text-slate-950">{metric.value}</p>
            <p className="mt-2 text-xs font-semibold text-emerald-600">{metric.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-950">Ventas de la semana</h2>
              <p className="mt-1 text-sm text-slate-500">Ingresos confirmados por día</p>
            </div>
            <span className="rounded-lg bg-orange-50 px-2.5 py-1.5 text-xs font-bold text-orange-700">+$1,820</span>
          </div>
          <div className="mt-8 flex h-48 items-end gap-2 sm:gap-4">
            {sales.map((sale) => (
              <div key={sale.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <div className="relative flex w-full flex-1 items-end rounded-t-lg bg-slate-50">
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-orange-600 to-orange-400 transition hover:from-orange-500 hover:to-amber-300" style={{ height: `${sale.value}%` }} />
                </div>
                <span className="text-[11px] font-semibold text-slate-400">{sale.day}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-950">Actividad reciente</h2>
              <p className="mt-1 text-sm text-slate-500">Últimos movimientos de tu cuenta</p>
            </div>
            <Link href="/seller/sales" className="text-xs font-bold text-orange-700 hover:text-orange-900">Ver todo</Link>
          </div>
          <div className="mt-5 divide-y divide-slate-100">
            {activities.map((activity) => (
              <div key={activity.title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${activity.color}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-800">{activity.title}</p>
                  <p className="truncate text-xs text-slate-500">{activity.description}</p>
                </div>
                <span className="text-xs font-bold text-slate-700">{activity.amount}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-black text-slate-950">Solicitudes que pueden interesarte</h2>
            <p className="mt-1 text-sm text-slate-500">Responde rápido para aumentar tus posibilidades de venta.</p>
          </div>
          <Link href="/seller/requests" className="text-sm font-bold text-orange-700 hover:text-orange-900">Ver solicitudes →</Link>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {requests.map((request) => (
            <article key={request.title} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-orange-200 hover:bg-orange-50/40">
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Nueva</span>
                <span className="text-[11px] font-semibold text-slate-400">{request.time}</span>
              </div>
              <h3 className="mt-3 text-sm font-bold leading-5 text-slate-900">{request.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{request.vehicle}</p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-3">
                <span className="text-xs font-semibold text-slate-500">{request.offers} ofertas</span>
                <Link href="/seller/quotes/new" className="text-xs font-bold text-orange-700 hover:text-orange-900">Cotizar →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <Link href="/seller/products/new" className="rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md">
          <p className="text-sm font-bold text-slate-900">Publicar producto</p>
          <p className="mt-1 text-xs text-slate-500">Agrega una pieza a tu catálogo.</p>
        </Link>
        <Link href="/seller/inventory" className="rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md">
          <p className="text-sm font-bold text-slate-900">Revisar inventario</p>
          <p className="mt-1 text-xs text-slate-500">Controla existencias y stock.</p>
        </Link>
        <Link href="/seller/stats" className="rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md">
          <p className="text-sm font-bold text-slate-900">Ver estadísticas</p>
          <p className="mt-1 text-xs text-slate-500">Analiza tu conversión.</p>
        </Link>
      </section>
    </div>
  );
}
