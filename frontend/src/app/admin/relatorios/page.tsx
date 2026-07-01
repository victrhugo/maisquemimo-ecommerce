"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Percent, Calendar } from "lucide-react";

// Mock report data
const kpiStats = [
  { title: "Faturamento Bruto", value: 1842050, change: "+12.5%", icon: DollarSign, color: "text-[var(--mqm-olive-800)]", bg: "bg-[var(--mqm-olive-100)]" },
  { title: "Ticket Médio", value: 12972, change: "+4.2%", icon: TrendingUp, color: "text-[var(--mqm-blush-700)]", bg: "bg-[var(--mqm-blush-100)]" },
  { title: "Pedidos Concluídos", value: 142, change: "+8.1%", icon: ShoppingCart, color: "text-amber-700", bg: "bg-amber-100" },
  { title: "Taxa de Conversão", value: "3.42%", change: "+0.3%", icon: Percent, color: "text-blue-700", bg: "bg-blue-100" },
];

const dailySales = [
  { date: "Seg", sales: 1240 },
  { date: "Ter", sales: 1890 },
  { date: "Qua", sales: 1450 },
  { date: "Qui", sales: 2200 },
  { date: "Sex", sales: 2840 },
  { date: "Sáb", sales: 3420 },
  { date: "Dom", sales: 1980 },
];

const categoryDistribution = [
  { name: "Cadernos", count: 184, share: 45 },
  { name: "Planners", count: 122, share: 30 },
  { name: "Kits", count: 61, share: 15 },
  { name: "Escrita & Mimos", count: 41, share: 10 },
];

export default function AdminReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"7days" | "30days" | "year">("7days");

  const maxSales = Math.max(...dailySales.map((d) => d.sales));

  return (
    <div className="space-y-6 select-none font-sans pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-foreground">Relatórios & Analytics</h1>
          <p className="text-muted-foreground text-sm">Monitore a performance financeira e vendas da loja</p>
        </div>
        
        {/* Period Selector */}
        <div className="flex items-center gap-2 self-start">
          <Calendar className="size-4 text-muted-foreground mr-1" />
          {["7days", "30days", "year"].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period as any)}
              className="cursor-pointer text-xs"
            >
              {period === "7days" ? "Últimos 7 dias" : period === "30days" ? "Últimos 30 dias" : "Este Ano"}
            </Button>
          ))}
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiStats.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{kpi.title}</p>
                <p className="font-display text-xl font-bold text-foreground">
                  {typeof kpi.value === "number" ? formatCurrency(kpi.value / 100) : kpi.value}
                </p>
                <span className="text-[10px] font-bold text-[var(--mqm-olive-700)] bg-[var(--mqm-olive-100)] px-2 py-0.5 rounded-full">
                  {kpi.change} vs. período anterior
                </span>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${kpi.bg}`}>
                <kpi.icon className={`size-5 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-bold uppercase tracking-wider text-[var(--mqm-olive-800)]">Faturamento Diário</CardTitle>
            <CardDescription className="text-xs">Faturamento bruto registrado por dia no período selecionado</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex h-60 items-end gap-3 px-2 border-b pb-2" role="img" aria-label="Gráfico de faturamento diário">
              {dailySales.map((data, index) => {
                const height = (data.sales / maxSales) * 100;
                const isLast = index === dailySales.length - 1;
                return (
                  <div key={data.date} className="group flex flex-1 flex-col items-center gap-1.5 h-full justify-end">
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
                        <span className="rounded bg-foreground px-1.5 py-0.5 text-[9px] text-background font-mono">
                          {formatCurrency(data.sales)}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{data.date}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Category distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold uppercase tracking-wider text-[var(--mqm-olive-800)]">Vendas por Categoria</CardTitle>
            <CardDescription className="text-xs">Divisão de quantidade vendida por setor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            {categoryDistribution.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-foreground">{cat.name}</span>
                  <span className="text-muted-foreground">{cat.count} itens ({cat.share}%)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--mqm-blush-400)] to-[var(--mqm-olive-500)]"
                    style={{ width: `${cat.share}%` }}
                    role="progressbar"
                    aria-valuenow={cat.share}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
