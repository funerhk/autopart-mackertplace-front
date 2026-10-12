import type { Product } from "@autoparts/shared";

const storageKey = "autiko-recent-products";

export function rememberProduct(product: Product) {
  if (typeof window === "undefined") return;

  const stored = readRecentProducts();
  const next = [product, ...stored.filter((item) => item.id !== product.id)].slice(0, 6);
  window.localStorage.setItem(storageKey, JSON.stringify(next));
}

export function readRecentProducts(): Product[] {
  if (typeof window === "undefined") return [];

  const stored = window.localStorage.getItem(storageKey);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as Product[];
  } catch {
    return [];
  }
}
