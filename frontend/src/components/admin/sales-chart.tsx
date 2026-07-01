"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useDashboard } from "@/hooks/use-admin";

export function SalesChart() {
  const { data } = useDashboard();

  const salesData = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("pt-BR", { month: "short" });
    const monthMap = new Map<string, number>();

    (data?.recentOrders ?? []).forEach((order) => {
      const month = formatter.format(new Date(order.createdAt));
      monthMap.set(month, (monthMap.get(month) ?? 0) + order.total / 100);
    });

    const entries = Array.from(monthMap.entries()).map(([month, revenue]) => ({ month, revenue }));
    return entries.length > 0 ? entries : [{ month: "Atual", revenue: 0 }];
  }, [data?.recentOrders]);

  const maxRevenue = Math.max(...salesData.map((d) => d.revenue), 1);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Receita mensal</CardTitle>
          <span className="text-sm font-semibold text-primary">
            {formatCurrency(salesData[salesData.length - 1]?.revenue ?? 0)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">Dados recentes</p>
      </CardHeader>
      <CardContent>
        {/* Bar chart simples em CSS — será substituído por Recharts ou Chart.js */}
        <div
          className="flex h-40 items-end gap-2"
          role="img"
          aria-label="Gráfico de receita mensal dos últimos 6 meses"
        >
          {salesData.map((data, index) => {
            const height = (data.revenue / maxRevenue) * 100;
            const isLast = index === salesData.length - 1;
            return (
              <div
                key={data.month}
                className="group flex flex-1 flex-col items-center gap-1"
              >
                <div
                  className="relative w-full overflow-hidden rounded-t-md transition-all duration-500"
                  style={{ height: `${height}%` }}
                >
                  <div
                    className={`h-full w-full rounded-t-md ${
                      isLast
                        ? "bg-gradient-to-t from-[var(--mqm-olive-700)] to-[var(--mqm-olive-500)]"
                        : "bg-[var(--mqm-blush-200)] group-hover:bg-[var(--mqm-blush-300)]"
                    } transition-colors`}
                  />
                  <div className="absolute inset-x-0 top-0 hidden -translate-y-7 text-center group-hover:block">
                    <span className="rounded bg-foreground px-1.5 py-0.5 text-[10px] text-background">
                      {formatCurrency(data.revenue)}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground">{data.month}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
