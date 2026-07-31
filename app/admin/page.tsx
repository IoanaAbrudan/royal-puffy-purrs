import { redirect } from "next/navigation";

import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { Container } from "@/components/layout/container";
import { getSession } from "@/lib/auth-session";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <Container className="py-10 sm:py-14">
      <AdminDashboard />
    </Container>
  );
}
