"use client";

import { Filters } from "@/components/marketplace/filters";
import { ProductCard } from "@/components/marketplace/product-card";
import { useMarketplaceSearch } from "@/hooks/useMarketplaceSearch";
import { useProducts } from "@/hooks/useProducts";

export default function SearchPage() {
  const { data = [] } = useProducts();
  const { query, setQuery, category, setCategory, filtered } = useMarketplaceSearch(data);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Buscador</h1>
      <div className="mb-4 space-y-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca por nombre, marca o descripcion"
          className="w-full rounded-xl border border-slate-300 bg-white p-3"
        />
        <Filters category={category} setCategory={setCategory} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </main>
  );
}
