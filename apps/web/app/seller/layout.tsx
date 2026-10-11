import { Sidebar } from "@/components/layout/sidebar";
import { RoleGuard } from "@/components/auth/role-guard";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allow={["SELLER", "ADMIN"]}>
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <section>{children}</section>
      </main>
    </RoleGuard>
  );
}
