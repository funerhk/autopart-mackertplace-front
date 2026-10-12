"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@autoparts/shared";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.product.id === product.id);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return { items: [...state.items, { product, quantity: 1 }] };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity > 0
              ? state.items.map((item) =>
                  item.product.id === productId ? { ...item, quantity } : item,
                )
              : state.items.filter((item) => item.product.id !== productId),
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "autiko-cart" },
  ),
);
