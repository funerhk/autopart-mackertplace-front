"use client";

import { useOrders } from "@/hooks/useOrders";
import { OrdersTable } from "@/components/orders/orders-table";

export default function SellerSalesPage() {
  const { data = [] } = useOrders();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Ventas</h1>
      <OrdersTable orders={data} />
    </div>
  );
}
