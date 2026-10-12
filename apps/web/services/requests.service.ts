import { endpoints, type PartRequest } from "@autoparts/shared";
import { apiFetch } from "@/lib/api";

const demoRequestsStorageKey = "autiko-demo-my-requests";

export const publicRequests: PartRequest[] = [
  {
    id: "request-1",
    title: "Faro izquierdo para Ford F-250",
    description: "Busco faro izquierdo original o compatible para Ford F-250. Preferencia por pieza nueva con garantía.",
    category: "Iluminación",
    partNumber: "F250-FARO-IZQ-24",
    vehicleInfo: { make: "Ford", model: "F-250", year: 2024 },
    location: "Monterrey, Nuevo León",
    createdAt: "2026-10-11T16:42:00.000Z",
  },
  {
    id: "request-2",
    title: "Defensa delantera Toyota Corolla",
    description: "Necesito defensa delantera para Corolla. Cotizar pieza con preparación para sensores y envío.",
    category: "Carrocería",
    partNumber: "COR-DEF-FR-22",
    vehicleInfo: { make: "Toyota", model: "Corolla", year: 2022 },
    location: "Guadalajara, Jalisco",
    createdAt: "2026-10-11T14:18:00.000Z",
  },
  {
    id: "request-3",
    title: "Alternador para Chevrolet Aveo",
    description: "Busco alternador nuevo o reacondicionado para Aveo. Indicar amperaje, garantía y tiempo de entrega.",
    category: "Eléctrico",
    partNumber: "AVEO-ALT-14",
    vehicleInfo: { make: "Chevrolet", model: "Aveo", year: 2014 },
    location: "Puebla, Puebla",
    createdAt: "2026-10-10T21:30:00.000Z",
  },
  {
    id: "request-4",
    title: "Kit de clutch Nissan Versa",
    description: "Requiero kit completo de clutch para Versa. Comparar marcas y disponibilidad inmediata.",
    category: "Transmisión",
    partNumber: "VERSA-CLT-19",
    vehicleInfo: { make: "Nissan", model: "Versa", year: 2019 },
    location: "Querétaro, Querétaro",
    createdAt: "2026-10-10T17:05:00.000Z",
  },
  {
    id: "request-5",
    title: "Bomba de agua Mazda 3",
    description: "Busco bomba de agua para Mazda 3 con factura y garantía. Acepto opciones originales o equivalentes.",
    category: "Motor",
    partNumber: "M3-WP-18",
    vehicleInfo: { make: "Mazda", model: "3", year: 2018 },
    location: "Mérida, Yucatán",
    createdAt: "2026-10-09T12:45:00.000Z",
  },
  {
    id: "request-6",
    title: "Pastillas de freno Honda Civic",
    description: "Necesito juego de pastillas delanteras para Civic. Favor de incluir precio por juego y entrega.",
    category: "Frenos",
    partNumber: "CIV-FRONT-PAD-20",
    vehicleInfo: { make: "Honda", model: "Civic", year: 2020 },
    location: "Ciudad de México",
    createdAt: "2026-10-08T09:20:00.000Z",
  },
];

function sortByDate(requests: PartRequest[]) {
  return [...requests].sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
  );
}

function readDemoRequests(): PartRequest[] {
  if (typeof window === "undefined") return [];

  const stored = window.localStorage.getItem(demoRequestsStorageKey);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as PartRequest[];
  } catch {
    return [];
  }
}

export const requestsService = {
  listMine() {
    return apiFetch<PartRequest[]>(endpoints.requests.listMine, { auth: true });
  },
  async listPublic(city = "") {
    const endpoint = city.trim() ? endpoints.requests.byCity(city.trim()) : endpoints.requests.listPublic;

    try {
      const requests = await apiFetch<PartRequest[]>(endpoint);
      return sortByDate(requests);
    } catch {
      const normalizedCity = city.trim().toLocaleLowerCase();
      const fallback = normalizedCity
        ? publicRequests.filter((request) => request.location?.toLocaleLowerCase().includes(normalizedCity))
        : publicRequests;
      return sortByDate(fallback);
    }
  },
  listDemoMine() {
    return Promise.resolve(sortByDate(readDemoRequests()));
  },
  createDemo(payload: Omit<PartRequest, "id" | "createdAt">) {
    const request: PartRequest = {
      ...payload,
      id: `request-demo-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const requests = [request, ...readDemoRequests()];
    window.localStorage.setItem(demoRequestsStorageKey, JSON.stringify(requests));
    return Promise.resolve(request);
  },
  create(payload: Omit<PartRequest, "id" | "createdAt">) {
    return apiFetch<PartRequest>(endpoints.requests.create, {
      method: "POST",
      body: payload,
      auth: true,
    });
  },
};
