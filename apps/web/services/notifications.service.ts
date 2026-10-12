import { endpoints, type Notification } from "@autoparts/shared";
import { apiFetch } from "@/lib/api";

const demoNotificationsStorageKey = "autiko-demo-notifications";

const initialDemoNotifications: Notification[] = [
  {
    id: "notification-1",
    title: "Nueva oferta recibida",
    message: "Refacciones Norte envió una oferta para tu solicitud de faro izquierdo para Ford F-250.",
    requestId: "request-1",
    type: "OFFER",
    read: false,
    createdAt: "2026-10-11T17:10:00.000Z",
  },
  {
    id: "notification-2",
    title: "Vendedor interesado",
    message: "AutoPartes del Centro está interesado en cotizar tu solicitud de defensa delantera Toyota Corolla.",
    requestId: "request-2",
    type: "INTEREST",
    read: false,
    createdAt: "2026-10-11T15:02:00.000Z",
  },
  {
    id: "notification-3",
    title: "Solicitud vista",
    message: "Un vendedor consultó los detalles de tu solicitud de alternador para Chevrolet Aveo.",
    requestId: "request-3",
    type: "VIEW",
    read: true,
    createdAt: "2026-10-10T22:05:00.000Z",
  },
];

function sortByDate(notifications: Notification[]) {
  return [...notifications].sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
  );
}

function readDemoNotifications() {
  if (typeof window === "undefined") return initialDemoNotifications;

  const stored = window.localStorage.getItem(demoNotificationsStorageKey);
  if (!stored) return initialDemoNotifications;

  try {
    return JSON.parse(stored) as Notification[];
  } catch {
    return initialDemoNotifications;
  }
}

function writeDemoNotifications(notifications: Notification[]) {
  window.localStorage.setItem(demoNotificationsStorageKey, JSON.stringify(notifications));
}

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
  listDemo() {
    return Promise.resolve(sortByDate(readDemoNotifications()));
  },
  markDemoAsRead(id: string) {
    const notifications = readDemoNotifications().map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    );
    writeDemoNotifications(notifications);
    return Promise.resolve(notifications.find((notification) => notification.id === id));
  },
};
