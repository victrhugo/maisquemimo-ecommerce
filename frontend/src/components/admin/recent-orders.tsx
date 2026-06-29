import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types/order";
import { ORDER_STATUS_LABELS } from "@/types/order";

// TODO: dados reais via React Query
const mockOrders: Pick<Order, "id" | "number" | "status" | "total" | "createdAt" | "customer">[] =
  [
    { id: "1", number: "MQM-001234", status: "SHIPPED", total: 8990, createdAt: "2026-06-28T10:00:00Z", customer: { name: "Ana Lima", email: "ana@email.com" } },
    { id: "2", number: "MQM-001235", status: "PROCESSING", total: 4990, createdAt: "2026-06-28T11:30:00Z", customer: { name: "Carla Souza", email: "carla@email.com" } },
    { id: "3", number: "MQM-001236", status: "CONFIRMED", total: 12890, createdAt: "2026-06-28T13:00:00Z", customer: { name: "Fernanda Melo", email: "fer@email.com" } },
    { id: "4", number: "MQM-001237", status: "PENDING", total: 3490, createdAt: "2026-06-29T08:00:00Z", customer: { name: "Juliana Costa", email: "ju@email.com" } },
    { id: "5", number: "MQM-001238", status: "DELIVERED", total: 6990, createdAt: "2026-06-27T14:20:00Z", customer: { name: "Marina Reis", email: "marina@email.com" } },
  ];

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
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-accent/40 transition-colors">
                  <td className="px-6 py-3.5">
                    <span className="font-mono text-xs font-medium text-[var(--mqm-rose-600)]">
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
