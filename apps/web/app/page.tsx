import Link from "next/link";
import { ProductCard } from "@/components/marketplace/product-card";
import { PromoSlider } from "@/components/marketplace/promo-slider";
import { mockProducts } from "@/services/products.service";

const featured = mockProducts.slice(0, 3);

const benefits = [
  { title: "Piezas verificadas", description: "Compra con vendedores especializados." },
  { title: "Cotiza en minutos", description: "Recibe ofertas para tu vehículo." },
  { title: "Todo en un lugar", description: "Ordena, vende y da seguimiento." },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        <PromoSlider />

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-sm"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-100 text-sm font-black text-orange-700">
                0{index + 1}
              </span>
              <div>
                <h2 className="text-sm font-bold text-slate-900">{benefit.title}</h2>
                <p className="mt-1 text-xs leading-5 text-slate-500">{benefit.description}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Lo más buscado</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Tendencias para tu vehículo</h2>
            </div>
            <Link href="/search" className="hidden text-sm font-bold text-orange-700 transition hover:text-orange-900 sm:block">
              Ver catálogo →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
          <Link href="/search" className="mt-5 block text-center text-sm font-bold text-orange-700 sm:hidden">
            Ver catálogo completo →
          </Link>
        </section>

        <section className="relative mt-14 overflow-hidden rounded-[2rem] bg-[#171a1f] px-6 py-9 text-white sm:px-10">
          <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">¿No encuentras la pieza?</p>
              <h2 className="mt-2 max-w-xl text-2xl font-black tracking-tight sm:text-3xl">Publica una solicitud y deja que los expertos te encuentren.</h2>
            </div>
            <Link href="/buyer/requests" className="inline-flex shrink-0 items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-400">
              Crear solicitud
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
