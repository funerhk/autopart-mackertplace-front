import type { Order } from "@autoparts/shared";

export function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3">Orden</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-slate-100">
              <td className="px-4 py-3">{order.id}</td>
              <td className="px-4 py-3">{order.status}</td>
              <td className="px-4 py-3">{order.createdAt || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
