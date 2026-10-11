"use client";

import { OrdersTable } from "@/components/orders/orders-table";
import { Loader } from "@/components/ui/loader";
import { useOrders } from "@/hooks/useOrders";

export default function BuyerOrdersPage() {
  const { data = [], isLoading } = useOrders();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Mis pedidos</h1>
      {isLoading ? <Loader /> : <OrdersTable orders={data} />}
    </main>
  );
}
