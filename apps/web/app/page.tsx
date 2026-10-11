import { Navbar } from "@/components/layout/navbar";
import { ProductCard } from "@/components/marketplace/product-card";

const featured = [
  {
    id: "1",
    title: "Kit de frenos Ford Territory",
    description: "Discos + pastillas premium con garantia de fabrica.",
    price: 249.99,
    category: "Frenos",
  },
  {
    id: "2",
    title: "Bateria 12V Toyota Corolla",
    description: "Arranque rapido, sellada y libre de mantenimiento.",
    price: 149.5,
    category: "Electrico",
  },
  {
    id: "3",
    title: "Bomba de agua Corolla 2018",
    description: "Compatible con part number 16100-39466.",
    price: 120.5,
    category: "Motor",
  },
];

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <section className="rounded-3xl bg-gradient-to-r from-orange-700 via-orange-600 to-amber-500 p-8 text-white shadow-lg">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-orange-100">
            Marketplace de autopartes
          </p>
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            Compra, cotiza y vende autopartes en minutos
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-orange-50 md:text-base">
            Publica solicitudes por marca/modelo, recibe ofertas competitivas y gestiona tus ordenes en un solo flujo.
          </p>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Destacados</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
