import { endpoints, type Offer } from "@autoparts/shared";
import { apiFetch } from "@/lib/api";

interface CreateOfferPayload {
  requestId: string;
  price: number;
  description: string;
  condition: "NEW" | "USED" | "REFURBISHED";
  warranty: boolean;
  warrantyDetails?: string;
  estimatedDeliveryDays: number;
}

export const bidsService = {
  create(payload: CreateOfferPayload) {
    return apiFetch<Offer>(endpoints.offers.create, {
      method: "POST",
      body: payload,
      auth: true,
    });
  },
  byRequest(requestId: string) {
    return apiFetch<Offer[]>(endpoints.offers.byRequest(requestId), { auth: true });
  },
};
