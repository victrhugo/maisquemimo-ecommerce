"use client";

import { ShoppingBag, Users, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useDashboard } from "@/hooks/use-admin";

export function DashboardStats() {
  const { data } = useDashboard();

  const stats = [
    {
      title: "Receita do mês",
      value: formatCurrency((Number(data?.monthRevenue ?? 0) || 0)),
      change: 0,
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-secondary",
    },
    {
      title: "Pedidos",
      value: String(data?.ordersCount ?? 0),
      change: 0,
      icon: ShoppingBag,
      color: "text-[var(--mqm-olive-700)]",
      bg: "bg-[var(--mqm-olive-100)]",
    },
    {
      title: "Clientes",
      value: String(data?.customersCount ?? 0),
      change: 0,
      icon: Users,
      color: "text-[var(--mqm-blush-700)]",
      bg: "bg-[var(--mqm-blush-100)]",
    },
    {
      title: "Produtos ativos",
      value: String(data?.activeProductsCount ?? 0),
      change: 0,
      icon: Package,
      color: "text-[var(--mqm-olive-800)]",
      bg: "bg-[var(--mqm-warm-200)]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="mt-2 font-display text-2xl font-semibold text-foreground">
                  {stat.value}
                </p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`size-5 ${stat.color}`} aria-hidden="true" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              {stat.change >= 0 ? (
                <ArrowUpRight className="size-3.5 text-[var(--mqm-olive-700)]" aria-hidden="true" />
              ) : (
                <ArrowDownRight className="size-3.5 text-destructive" aria-hidden="true" />
              )}
              <span
                className={`text-xs font-medium ${
                  stat.change >= 0 ? "text-[var(--mqm-olive-700)]" : "text-destructive"
                }`}
              >
                {Math.abs(stat.change)}%
              </span>
              <span className="text-xs text-muted-foreground">vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
