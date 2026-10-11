"use client";

import { useQuery } from "@tanstack/react-query";
import { RequestCard } from "@/components/marketplace/request-card";
import { Loader } from "@/components/ui/loader";
import { requestsService } from "@/services/requests.service";

export default function BuyerRequestsPage() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["my-requests"],
    queryFn: requestsService.listMine,
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Mis solicitudes</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </main>
  );
}
