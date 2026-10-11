export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export const endpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    refresh: process.env.NEXT_PUBLIC_AUTH_REFRESH_PATH || "",
  },
  requests: {
    listMine: "/requests",
    create: "/requests",
  },
  offers: {
    create: "/offers",
    byRequest: (requestId: string) => `/offers/request/${requestId}`,
  },
  notifications: {
    list: "/notifications",
    markRead: (id: string) => `/notifications/${id}/read`,
  },
  orders: {
    list: "/orders",
    updateStatus: (id: string) => `/orders/${id}/status`,
  },
  chat: {
    roomByRequest: (requestId: string) => `/chat/rooms/${requestId}`,
    roomMessages: (roomId: string) => `/chat/rooms/${roomId}/messages`,
    namespace: "/chat",
  },
} as const;
