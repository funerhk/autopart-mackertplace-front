"use client";

import { useQuery } from "@tanstack/react-query";
import { RequestCard } from "@/components/marketplace/request-card";
import { requestsService } from "@/services/requests.service";

export default function SellerRequestsPage() {
  const { data = [] } = useQuery({
    queryKey: ["seller-visible-requests"],
    queryFn: requestsService.listMine,
  });

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Solicitudes recibidas</h1>
      <p className="mb-4 text-sm text-slate-600">
        Nota: TESTING_GUIDE no expone endpoint de marketplace de solicitudes para vendedores; se usa temporalmente /requests.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {data.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
}
