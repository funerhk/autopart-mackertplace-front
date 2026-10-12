"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";

export function CartLink() {
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <Link
      href="/cart"
      className="group relative inline-flex items-center gap-2 rounded-full px-2 py-2 text-slate-700 transition hover:bg-orange-50 hover:text-orange-700 sm:px-3"
      aria-label={`Carrito de compra, ${itemCount} productos`}
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white shadow-sm transition group-hover:border-orange-200 group-hover:bg-orange-50">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 4.5h2l1.8 9.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4l1.5-5.4H6.2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19.2h.01M17 19.2h.01" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.2 7.2h8.5" />
        </svg>
        {itemCount > 0 && (
          <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-[10px] font-black leading-none text-white shadow-sm ring-2 ring-white">
            {itemCount}
          </span>
        )}
      </span>
      <span className="hidden text-xs font-bold sm:inline">Carrito</span>
    </Link>
  );
}
