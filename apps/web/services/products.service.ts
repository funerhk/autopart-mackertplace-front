import type { Product } from "@autoparts/shared";

// Pending backend: TESTING_GUIDE.md does not expose products endpoints yet.
export const productsService = {
  async list(): Promise<Product[]> {
    return [];
  },
  async getById(_id: string): Promise<Product | null> {
    return null;
  },
};
