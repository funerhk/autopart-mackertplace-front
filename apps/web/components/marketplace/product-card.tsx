import type { Product } from "@autoparts/shared";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 text-sm text-slate-500">{product.category || "Autoparte"}</div>
      <h3 className="text-base font-semibold text-slate-900">{product.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-slate-600">{product.description}</p>
      <div className="mt-3 text-lg font-bold text-slate-900">${product.price.toFixed(2)}</div>
    </article>
  );
}
