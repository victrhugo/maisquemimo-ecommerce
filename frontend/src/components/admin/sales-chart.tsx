"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

// Dados mock do gráfico de vendas — será substituído por dados reais
const salesData = [
  { month: "Jan", revenue: 9840 },
  { month: "Fev", revenue: 11200 },
  { month: "Mar", revenue: 10350 },
  { month: "Abr", revenue: 14800 },
  { month: "Mai", revenue: 13200 },
  { month: "Jun", revenue: 18420 },
];

const maxRevenue = Math.max(...salesData.map((d) => d.revenue));

export function SalesChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Receita mensal</CardTitle>
          <span className="text-sm font-semibold text-[var(--mqm-rose-600)]">
            {formatCurrency(salesData[salesData.length - 1].revenue)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
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
                        ? "bg-gradient-to-t from-[var(--mqm-rose-500)] to-[var(--mqm-rose-400)]"
                        : "bg-[var(--mqm-rose-200)] group-hover:bg-[var(--mqm-rose-300)]"
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
