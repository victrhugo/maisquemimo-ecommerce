import { DashboardStats } from "@/components/admin/dashboard-stats";
import { RecentOrders } from "@/components/admin/recent-orders";
import { TopProducts } from "@/components/admin/top-products";
import { SalesChart } from "@/components/admin/sales-chart";
import { LowStock } from "@/components/admin/low-stock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Admin | Mais que Mimo",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-medium text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Visão geral do seu negócio
        </p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <TopProducts />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
        <div>
          <LowStock />
        </div>
      </div>
    </div>
  );
}
