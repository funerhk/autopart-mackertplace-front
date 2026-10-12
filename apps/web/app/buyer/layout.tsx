import { RoleGuard } from "@/components/auth/role-guard";

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allow={["BUYER", "SELLER", "ADMIN"]}>{children}</RoleGuard>;
}
