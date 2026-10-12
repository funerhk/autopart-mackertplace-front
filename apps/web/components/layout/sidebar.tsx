import Link from "next/link";

const sellerLinks = [
  { href: "/seller/dashboard", label: "Dashboard", icon: "▦" },
  { href: "/seller/products/new", label: "Publicar producto", icon: "+" },
  { href: "/seller/inventory", label: "Inventario", icon: "□" },
  { href: "/seller/requests", label: "Solicitudes", icon: "◌" },
  { href: "/seller/quotes/new", label: "Enviar cotización", icon: "↗" },
  { href: "/seller/sales", label: "Ventas", icon: "$" },
  { href: "/seller/stats", label: "Estadísticas", icon: "⌁" },
];

export function Sidebar() {
  return (
    <aside className="h-fit w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-28 lg:w-64">
      <div className="mb-4 rounded-xl bg-[#171a1f] p-4 text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-300">Autiko</p>
        <h2 className="mt-2 text-lg font-black">Centro de ventas</h2>
        <p className="mt-1 text-xs text-slate-400">Gestiona tu negocio</p>
      </div>
      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Menú vendedor</p>
      <nav className="space-y-1">
        {sellerLinks.map((link, index) => (
          <Link
            key={link.href}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${index === 0 ? "bg-orange-50 text-orange-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}
            href={link.href}
          >
            <span className={`grid h-7 w-7 place-items-center rounded-lg text-sm ${index === 0 ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-orange-100 group-hover:text-orange-700"}`}>
              {link.icon}
            </span>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
