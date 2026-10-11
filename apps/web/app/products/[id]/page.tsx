import { productsService } from "@/services/products.service";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await productsService.getById(id);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold">Detalle de producto</h1>
      {!product ? (
        <p className="mt-4 text-slate-600">Pendiente backend: endpoint de detalle de producto no disponible en TESTING_GUIDE.</p>
      ) : (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p className="mt-2 text-slate-600">{product.description}</p>
        </div>
      )}
    </main>
  );
}
