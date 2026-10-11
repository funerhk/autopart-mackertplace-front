"use client";

import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/services/products.service";

export function useProducts() {
  return useQuery({ queryKey: ["products"], queryFn: productsService.list });
}
