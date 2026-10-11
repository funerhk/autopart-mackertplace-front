import { endpoints, type ChatMessage, type ChatRoom } from "@autoparts/shared";
import { apiFetch } from "@/lib/api";

export const chatService = {
  roomByRequest(requestId: string) {
    return apiFetch<ChatRoom>(endpoints.chat.roomByRequest(requestId), { auth: true });
  },
  messages(roomId: string) {
    return apiFetch<ChatMessage[]>(endpoints.chat.roomMessages(roomId), { auth: true });
  },
};
