import { endpoints, type Notification } from "@autoparts/shared";
import { apiFetch } from "@/lib/api";

export const notificationsService = {
  list() {
    return apiFetch<Notification[]>(endpoints.notifications.list, { auth: true });
  },
  markAsRead(id: string) {
    return apiFetch<Notification>(endpoints.notifications.markRead(id), {
      method: "PATCH",
      auth: true,
    });
  },
};
