"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useAdminOrders, useUpdateOrderStatus } from "@/hooks/use-admin";
import { Search, Eye, ShoppingBag, Check } from "lucide-react";
import type { OrderStatus } from "@/types/order";
import { ORDER_STATUS_LABELS } from "@/types/order";
import type { AdminOrder } from "@/types/admin";

const statusVariant: Record<OrderStatus, "amber" | "mauve" | "rose" | "sage" | "secondary" | "default"> = {
  PENDING: "amber",
  CONFIRMED: "sage",
  PROCESSING: "mauve",
  SHIPPED: "rose",
  DELIVERED: "sage",
  CANCELLED: "secondary",
  REFUNDED: "secondary",
};

export default function AdminOrdersPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const { data: ordersData } = useAdminOrders(selectedStatus);
  const { mutateAsync: updateOrderStatus } = useUpdateOrderStatus();
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const orders = ordersData ?? [];

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.number.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === "ALL" || o.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  function openOrderDetail(order: AdminOrder) {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  }

  async function handleStatusChange(id: string, newStatus: OrderStatus) {
    await updateOrderStatus({ id, status: newStatus });
    if (selectedOrder?.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    toast({
      title: "Status Atualizado",
      description: `Pedido ${orders.find((o) => o.id === id)?.number} alterado para ${ORDER_STATUS_LABELS[newStatus]}.`,
    });
  }

  return (
    <div className="space-y-6 select-none font-sans">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium text-foreground">Pedidos</h1>
        <p className="text-muted-foreground text-sm">Monitore e processe os pedidos dos clientes</p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por código ou cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {["ALL", "PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus(status)}
              className="cursor-pointer text-xs"
            >
              {status === "ALL" ? "Todos" : ORDER_STATUS_LABELS[status as OrderStatus] || status}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders Grid Table */}
      <div className="rounded-[var(--radius-xl)] border border-border/80 bg-card shadow-[var(--shadow-sm)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" aria-label="Tabela de pedidos">
            <thead>
              <tr className="border-b bg-muted/35">
                <th className="px-6 py-4 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider">Código</th>
                <th className="px-6 py-4 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-center font-semibold text-xs text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right font-semibold text-xs text-muted-foreground uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-right font-semibold text-xs text-muted-foreground uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order) => {
                const orderStatus = order.status as OrderStatus;
                return (
                <tr key={order.id} className="hover:bg-accent/45 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold text-[var(--mqm-olive-700)]">
                      {order.number}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant={statusVariant[orderStatus]}>
                      {ORDER_STATUS_LABELS[orderStatus]}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-foreground text-sm font-mono">
                    {formatCurrency(order.total / 100)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openOrderDetail(order)}
                        className="cursor-pointer"
                      >
                        <Eye className="size-3.5 mr-1" />
                        Detalhar
                      </Button>
                    </div>
                  </td>
                </tr>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground text-sm">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg select-none font-sans">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingBag className="size-5 text-[var(--mqm-olive-800)]" />
              <span>Pedido {selectedOrder?.number}</span>
            </DialogTitle>
            <DialogDescription>
              Detalhes da compra efetuada por {selectedOrder?.customerName} em {selectedOrder && formatDate(selectedOrder.createdAt)}.
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4 pt-2">
              {/* Customer summary */}
              <div className="rounded-lg bg-muted/40 p-4 border border-border/50 space-y-1">
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Cliente</p>
                <p className="text-sm font-semibold">{selectedOrder.customerName}</p>
                <p className="text-xs text-muted-foreground">{selectedOrder.customerEmail}</p>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Itens do Pedido</p>
                <div className="divide-y divide-border border rounded-lg bg-card overflow-hidden">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between p-3.5 text-sm">
                      <div className="flex gap-2">
                        <span className="font-bold text-[var(--mqm-olive-700)] font-mono">{item.quantity}x</span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="font-bold text-foreground font-mono">{formatCurrency(item.price / 100)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between p-3.5 bg-muted/20 font-bold text-sm">
                    <span>Total Pago</span>
                    <span className="text-[var(--mqm-blush-800)] font-mono">{formatCurrency(selectedOrder.total / 100)}</span>
                  </div>
                </div>
              </div>

              {/* Process Status Action */}
              <div className="space-y-2 pt-2">
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Mudar Status do Pedido</p>
                <div className="flex flex-wrap gap-2">
                  {(["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"] as OrderStatus[]).map((st) => (
                    <Button
                      key={st}
                      variant={selectedOrder.status === st ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(selectedOrder.id, st)}
                      className="cursor-pointer text-xs"
                    >
                      {ORDER_STATUS_LABELS[st]}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button onClick={() => setIsDetailOpen(false)} className="cursor-pointer">
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
