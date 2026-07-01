"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { useAdminCustomers } from "@/hooks/use-admin";
import { Search, Mail, Phone, MapPin, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import type { AdminCustomer } from "@/types/admin";

export default function AdminCustomersPage() {
  const { toast } = useToast();
  const { data: customersData } = useAdminCustomers();
  const customers = customersData ?? [];
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  function viewDetails(customer: AdminCustomer) {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  }

  return (
    <div className="space-y-6 select-none font-sans">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium text-foreground">Clientes</h1>
        <p className="text-muted-foreground text-sm">Gerencie o cadastro de clientes e histórico de compras</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, e-mail ou cidade..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Customers Table */}
      <div className="rounded-[var(--radius-xl)] border border-border/80 bg-card shadow-[var(--shadow-sm)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" aria-label="Tabela de clientes">
            <thead>
              <tr className="border-b bg-muted/35">
                <th className="px-6 py-4 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider">Contato</th>
                <th className="px-6 py-4 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider">Localização</th>
                <th className="px-6 py-4 text-center font-semibold text-xs text-muted-foreground uppercase tracking-wider">Pedidos</th>
                <th className="px-6 py-4 text-right font-semibold text-xs text-muted-foreground uppercase tracking-wider">Total Gasto</th>
                <th className="px-6 py-4 text-right font-semibold text-xs text-muted-foreground uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-accent/45 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <Mail className="size-3 text-muted-foreground/60" />
                      {c.email}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Phone className="size-3 text-muted-foreground/60" />
                      {c.phone}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="size-3 text-muted-foreground/60" />
                      {c.city} - {c.state}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-bold font-mono text-[var(--mqm-olive-700)]">
                    {c.ordersCount}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-foreground text-sm font-mono">
                    {formatCurrency(c.totalSpent / 100)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => viewDetails(c)}
                        className="cursor-pointer"
                      >
                        <Eye className="size-3.5 mr-1" />
                        Histórico
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground text-sm">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-md select-none font-sans">
          <DialogHeader>
            <DialogTitle>Histórico de {selectedCustomer?.name}</DialogTitle>
            <DialogDescription>
              Resumo e comportamento de compra do cliente.
            </DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3.5 space-y-1 bg-card">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Total de Pedidos</p>
                  <p className="text-xl font-bold font-mono text-[var(--mqm-olive-700)]">{selectedCustomer.ordersCount} compras</p>
                </div>
                <div className="rounded-lg border p-3.5 space-y-1 bg-card">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Total Gasto</p>
                  <p className="text-xl font-bold font-mono text-[var(--mqm-blush-800)]">{formatCurrency(selectedCustomer.totalSpent / 100)}</p>
                </div>
              </div>

              <div className="divide-y border rounded-lg bg-card overflow-hidden">
                <div className="p-3.5 flex justify-between text-xs text-muted-foreground font-bold uppercase tracking-wider bg-muted/20">
                  <span>Informação</span>
                  <span>Dado</span>
                </div>
                <div className="p-3.5 flex justify-between text-sm">
                  <span className="text-muted-foreground">E-mail</span>
                  <span className="font-semibold">{selectedCustomer.email}</span>
                </div>
                <div className="p-3.5 flex justify-between text-sm">
                  <span className="text-muted-foreground">Telefone</span>
                  <span className="font-semibold">{selectedCustomer.phone}</span>
                </div>
                <div className="p-3.5 flex justify-between text-sm">
                  <span className="text-muted-foreground">Cidade / Estado</span>
                  <span className="font-semibold">{selectedCustomer.city} - {selectedCustomer.state}</span>
                </div>
                <div className="p-3.5 flex justify-between text-sm">
                  <span className="text-muted-foreground">Última Compra</span>
                  <span className="font-semibold font-mono">{selectedCustomer.lastOrderDate}</span>
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
