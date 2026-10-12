"use client";

import { useState } from "react";
import type { Product } from "@autoparts/shared";
import { useCartStore } from "@/store/cart-store";
import { rememberProduct } from "@/lib/recent-products";

const categoryStyles: Record<string, string> = {
  Frenos: "from-orange-100 via-orange-50 to-slate-100 text-orange-700",
  Electrico: "from-sky-100 via-slate-50 to-orange-50 text-sky-700",
  Motor: "from-slate-200 via-slate-50 to-orange-100 text-slate-700",
};

export function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const category = product.category || "Autoparte";
  const visualStyle = categoryStyles[category] || "from-slate-100 via-white to-orange-50 text-slate-600";

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article onClick={() => rememberProduct(product)} className="group overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-200/60">
      <div className={`relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br ${visualStyle}`}>
        <div className="absolute -right-7 -top-10 h-32 w-32 rounded-full border-[18px] border-white/60" />
        <div className="absolute -bottom-12 -left-5 h-28 w-28 rounded-full border-[14px] border-slate-900/5" />
        <div className="relative grid h-20 w-20 place-items-center rounded-3xl border border-white/80 bg-white/70 text-3xl font-black shadow-lg backdrop-blur transition group-hover:scale-105">
          {category.charAt(0)}
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 backdrop-blur">
          Tendencia
        </span>
      </div>
      <div className="p-5">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">{category}</div>
        <h3 className="text-base font-bold text-slate-900">{product.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-500">{product.description}</p>
        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Desde</span>
            <div className="text-xl font-black tracking-tight text-slate-950">${product.price.toFixed(2)}</div>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${added ? "bg-emerald-500 text-white" : "bg-orange-50 text-orange-700 hover:bg-orange-500 hover:text-white"}`}
          >
            {added ? "Agregado ✓" : "Añadir al carrito"}
          </button>
        </div>
      </div>
    </article>
  );
}
