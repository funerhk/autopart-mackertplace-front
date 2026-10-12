"use client";

import Link from "next/link";
import { ProductCard } from "@/components/marketplace/product-card";
import { mockProducts } from "@/services/products.service";
import { useCartStore } from "@/store/cart-store";

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "USD",
});

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Tu selección</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-950">Carrito de compra</h1>
            <p className="mt-2 text-sm text-slate-500">
              {totalItems === 0 ? "Todavía no has añadido productos." : `${totalItems} producto${totalItems === 1 ? "" : "s"} seleccionado${totalItems === 1 ? "" : "s"}.`}
            </p>
          </div>
          {items.length > 0 && (
            <button type="button" onClick={clear} className="text-sm font-bold text-slate-500 transition hover:text-red-600">
              Vaciar carrito
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <section>
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-orange-100 text-2xl font-black text-orange-600">+</div>
            <h2 className="mt-5 text-xl font-black text-slate-900">Tu carrito está vacío</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Basado en tus intereses, estas piezas podrían ser lo que estás buscando.
            </p>
          </div>
          <div className="mt-10">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Tus intereses</p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">Productos vistos recientemente</h2>
              </div>
              <Link href="/search" className="text-sm font-bold text-orange-700 transition hover:text-orange-900">Ver catálogo →</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockProducts.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </section>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="space-y-3">
            {items.map(({ product, quantity }) => (
              <article key={product.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">
                <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-100 via-white to-slate-100 text-3xl font-black text-orange-700">
                  {(product.category || "A").charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{product.category || "Autoparte"}</p>
                  <h2 className="mt-1 truncate text-base font-bold text-slate-900">{product.title}</h2>
                  <p className="mt-1 line-clamp-1 text-sm text-slate-500">{product.description}</p>
                  <p className="mt-2 text-lg font-black text-slate-950">{currency.format(product.price)}</p>
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-1">
                    <button type="button" aria-label={`Reducir cantidad de ${product.title}`} onClick={() => updateQuantity(product.id, quantity - 1)} className="grid h-7 w-7 place-items-center rounded-full text-slate-600 transition hover:bg-white hover:text-orange-600">−</button>
                    <span className="w-8 text-center text-sm font-bold text-slate-900">{quantity}</span>
                    <button type="button" aria-label={`Aumentar cantidad de ${product.title}`} onClick={() => updateQuantity(product.id, quantity + 1)} className="grid h-7 w-7 place-items-center rounded-full text-slate-600 transition hover:bg-white hover:text-orange-600">+</button>
                  </div>
                  <button type="button" onClick={() => removeItem(product.id)} className="text-xs font-bold text-slate-400 transition hover:text-red-600">Eliminar</button>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
            <h2 className="text-lg font-black text-slate-950">Resumen de compra</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-slate-500"><span>Subtotal</span><span className="font-semibold text-slate-900">{currency.format(subtotal)}</span></div>
              <div className="flex justify-between text-slate-500"><span>Envío</span><span className="font-semibold text-emerald-600">Gratis</span></div>
              <div className="my-4 border-t border-dashed border-slate-200" />
              <div className="flex justify-between text-base font-black text-slate-950"><span>Total</span><span>{currency.format(subtotal)}</span></div>
            </div>
            <Link href="/checkout" className="mt-6 flex w-full justify-center rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600">
              Continuar al checkout
            </Link>
            <Link href="/search" className="mt-3 flex w-full justify-center text-sm font-bold text-slate-500 transition hover:text-orange-600">
              Seguir comprando
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
