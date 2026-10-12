"use client";

import { useEffect } from "react";
import { Filters } from "@/components/marketplace/filters";
import { ProductCard } from "@/components/marketplace/product-card";
import { useMarketplaceSearch } from "@/hooks/useMarketplaceSearch";
import { useProducts } from "@/hooks/useProducts";

export default function SearchPage() {
  const { data = [] } = useProducts();
  const { query, setQuery, category, setCategory, filtered } = useMarketplaceSearch(data);

  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search).get("query");
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [setQuery]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Marketplace Autiko</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950">{query ? `Resultados para “${query}”` : "Buscador"}</h1>
      </div>
      <div className="mb-4 space-y-3">
        {!query && (
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca por nombre, marca o descripción"
            className="w-full rounded-xl border border-slate-300 bg-white p-3"
          />
        )}
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
