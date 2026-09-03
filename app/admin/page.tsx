import { redirect } from "next/navigation";

import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { Container } from "@/components/layout/container";
import { getSession } from "@/lib/auth-session";
import { getCatsStore } from "@/lib/cats-store";
import { getHotelStore } from "@/lib/hotel-store";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [hotelStore, catsStore] = await Promise.all([
    getHotelStore(),
    getCatsStore(),
  ]);

  return (
    <Container className="py-10 sm:py-14">
      <AdminDashboard
        initialHotelStore={hotelStore}
        initialCatsStore={catsStore}
      />
    </Container>
  );
}
