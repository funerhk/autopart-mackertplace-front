"use client";

import { useMemo, useState } from "react";
import type { Product } from "@autoparts/shared";

export function useMarketplaceSearch(products: Product[] = []) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return products.filter((item) => {
      const text = `${item.title} ${item.description}`.toLowerCase();
      const queryMatch = text.includes(query.toLowerCase());
      const categoryMatch = category === "all" || item.category === category;
      return queryMatch && categoryMatch;
    });
  }, [products, query, category]);

  return {
    query,
    setQuery,
    category,
    setCategory,
    filtered,
  };
}
