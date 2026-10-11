import { endpoints, type PartRequest } from "@autoparts/shared";
import { apiFetch } from "@/lib/api";

export const requestsService = {
  listMine() {
    return apiFetch<PartRequest[]>(endpoints.requests.listMine, { auth: true });
  },
  create(payload: Omit<PartRequest, "id" | "createdAt">) {
    return apiFetch<PartRequest>(endpoints.requests.create, {
      method: "POST",
      body: payload,
      auth: true,
    });
  },
};
