import { endpoints, type Order, type OrderStatus } from "@autoparts/shared";
import { apiFetch } from "@/lib/api";

export const ordersService = {
  listMine() {
    return apiFetch<Order[]>(endpoints.orders.list, { auth: true });
  },
  updateStatus(orderId: string, status: OrderStatus) {
    return apiFetch<Order>(endpoints.orders.updateStatus(orderId), {
      method: "PATCH",
      body: { status },
      auth: true,
    });
  },
};
