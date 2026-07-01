"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types/order";
import { ORDER_STATUS_LABELS } from "@/types/order";
import { useDashboard } from "@/hooks/use-admin";

const statusVariant: Record<OrderStatus, "amber" | "mauve" | "rose" | "sage" | "secondary" | "default"> = {
  PENDING: "amber",
  CONFIRMED: "sage",
  PROCESSING: "mauve",
  SHIPPED: "rose",
  DELIVERED: "sage",
  CANCELLED: "secondary",
  REFUNDED: "secondary",
};

export function RecentOrders() {
  const { data } = useDashboard();
  const recentOrders = (data?.recentOrders ?? []).map((order) => ({
    id: order.id,
    number: order.number,
    status: order.status as OrderStatus,
    total: order.total,
    createdAt: order.createdAt,
    customer: { name: order.customerName, email: order.customerEmail },
  }));

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Pedidos recentes</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Tabela de pedidos recentes">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                  Pedido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-accent/40 transition-colors">
                  <td className="px-6 py-3.5">
                    <span className="font-mono text-xs font-medium text-primary">
                      {order.number}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <div>
                      <p className="font-medium text-foreground">{order.customer.name}</p>
                      <p className="text-xs text-muted-foreground">{order.customer.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-3.5">
                    <Badge variant={statusVariant[order.status]}>
                      {ORDER_STATUS_LABELS[order.status]}
                    </Badge>
                  </td>
                  <td className="px-6 py-3.5 text-right font-medium">
                    {formatCurrency(order.total / 100)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
