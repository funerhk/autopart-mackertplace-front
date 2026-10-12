import type { Product } from "@autoparts/shared";

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Kit de frenos Ford Territory",
    description: "Discos y pastillas premium con garantía de fábrica.",
    price: 249.99,
    condition: "NEW",
    stock: 12,
    category: "Frenos",
  },
  {
    id: "2",
    title: "Batería 12V Toyota Corolla",
    description: "Arranque rápido, sellada y libre de mantenimiento.",
    price: 149.5,
    condition: "NEW",
    stock: 8,
    category: "Electrico",
  },
  {
    id: "3",
    title: "Bomba de agua Corolla 2018",
    description: "Compatible con part number 16100-39466.",
    price: 120.5,
    condition: "NEW",
    stock: 5,
    category: "Motor",
  },
  {
    id: "4",
    title: "Filtro de aire Nissan Versa",
    description: "Filtración de alto rendimiento para uso diario.",
    price: 28.9,
    condition: "NEW",
    stock: 24,
    category: "Mantenimiento",
  },
  {
    id: "5",
    title: "Amortiguador delantero Mazda 3",
    description: "Conducción estable y confort para ciudad y carretera.",
    price: 184.75,
    condition: "NEW",
    stock: 6,
    category: "Suspensión",
  },
  {
    id: "6",
    title: "Alternador Chevrolet Aveo",
    description: "Alternador reacondicionado con garantía de 6 meses.",
    price: 215,
    condition: "REFURBISHED",
    stock: 3,
    category: "Electrico",
  },
];

export const productsService = {
  async list(): Promise<Product[]> {
    return mockProducts;
  },
  async getById(id: string): Promise<Product | null> {
    return mockProducts.find((product) => product.id === id) || null;
  },
};
