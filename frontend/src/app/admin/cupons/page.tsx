"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Search, Pencil, Trash2, Ticket } from "lucide-react";

interface MockCoupon {
  id: string;
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number; // e.g. 10 for 10% or 1500 for R$ 15.00
  isActive: boolean;
  usageLimit: number;
  usageCount: number;
}

const initialCoupons: MockCoupon[] = [
  {
    id: "1",
    code: "MIMO10",
    type: "PERCENTAGE",
    value: 10,
    isActive: true,
    usageLimit: 100,
    usageCount: 42,
  },
  {
    id: "2",
    code: "BOASVINDAS",
    type: "FIXED",
    value: 1500, // R$ 15,00
    isActive: true,
    usageLimit: 50,
    usageCount: 18,
  },
  {
    id: "3",
    code: "FRETEGRATIS",
    type: "PERCENTAGE",
    value: 100, // 100% discount on shipping
    isActive: false,
    usageLimit: 200,
    usageCount: 115,
  },
];

export default function AdminCouponsPage() {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<MockCoupon[]>(initialCoupons);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<MockCoupon | null>(null);

  // Form states
  const [code, setCode] = useState("");
  const [type, setType] = useState<"PERCENTAGE" | "FIXED">("PERCENTAGE");
  const [value, setValue] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [usageLimit, setUsageLimit] = useState(100);

  const filteredCoupons = coupons.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  function openCreateDialog() {
    setEditingCoupon(null);
    setCode("");
    setType("PERCENTAGE");
    setValue(10);
    setIsActive(true);
    setUsageLimit(100);
    setIsDialogOpen(true);
  }

  function openEditDialog(coupon: MockCoupon) {
    setEditingCoupon(coupon);
    setCode(coupon.code);
    setType(coupon.type);
    setValue(coupon.type === "FIXED" ? coupon.value / 100 : coupon.value);
    setIsActive(coupon.isActive);
    setUsageLimit(coupon.usageLimit);
    setIsDialogOpen(true);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim() || value <= 0) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos corretamente.",
        variant: "destructive",
      });
      return;
    }

    const calculatedValue = type === "FIXED" ? value * 100 : value;

    if (editingCoupon) {
      // Edit
      setCoupons(
        coupons.map((c) =>
          c.id === editingCoupon.id
            ? { ...c, code: code.toUpperCase(), type, value: calculatedValue, isActive, usageLimit }
            : c
        )
      );
      toast({ title: "Sucesso", description: "Cupom atualizado com sucesso!" });
    } else {
      // Create
      const newCoupon: MockCoupon = {
        id: (coupons.length + 1).toString(),
        code: code.toUpperCase(),
        type,
        value: calculatedValue,
        isActive,
        usageLimit,
        usageCount: 0,
      };
      setCoupons([...coupons, newCoupon]);
      toast({ title: "Sucesso", description: "Cupom criado com sucesso!" });
    }

    setIsDialogOpen(false);
  }

  function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja excluir este cupom?")) {
      setCoupons(coupons.filter((c) => c.id !== id));
      toast({ title: "Sucesso", description: "Cupom excluído com sucesso!" });
    }
  }

  function toggleStatus(id: string) {
    setCoupons(
      coupons.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
    const updated = coupons.find((c) => c.id === id);
    toast({
      title: "Cupom atualizado",
      description: `Cupom ${updated?.code} alterado para ${!updated?.isActive ? "Ativo" : "Inativo"}.`,
    });
  }

  return (
    <div className="space-y-6 select-none font-sans">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-foreground">Cupons de Desconto</h1>
          <p className="text-muted-foreground text-sm">Gerencie códigos promocionais e descontos</p>
        </div>
        <Button onClick={openCreateDialog} className="cursor-pointer">
          <Plus className="size-4 mr-2" />
          Novo Cupom
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Buscar cupons pelo código..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Coupons Table */}
      <div className="rounded-[var(--radius-xl)] border border-border/80 bg-card shadow-[var(--shadow-sm)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" aria-label="Tabela de cupons">
            <thead>
              <tr className="border-b bg-muted/35">
                <th className="px-6 py-4 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider">Código</th>
                <th className="px-6 py-4 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-4 text-right font-semibold text-xs text-muted-foreground uppercase tracking-wider">Valor do Desconto</th>
                <th className="px-6 py-4 text-center font-semibold text-xs text-muted-foreground uppercase tracking-wider">Uso</th>
                <th className="px-6 py-4 text-center font-semibold text-xs text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right font-semibold text-xs text-muted-foreground uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-accent/45 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-bold text-[var(--mqm-olive-800)] bg-[var(--mqm-warm-200)]/70 px-2.5 py-1 rounded border">
                      {coupon.code}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {coupon.type === "PERCENTAGE" ? "Porcentagem (%)" : "Valor Fixo (R$)"}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-foreground text-sm font-mono">
                    {coupon.type === "PERCENTAGE"
                      ? `${coupon.value}%`
                      : `R$ ${(coupon.value / 100).toFixed(2).replace(".", ",")}`}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-muted-foreground font-mono">
                    {coupon.usageCount} / {coupon.usageLimit}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleStatus(coupon.id)}
                      className="cursor-pointer focus:outline-none"
                    >
                      <Badge variant={coupon.isActive ? "default" : "secondary"}>
                        {coupon.isActive ? "Ativo" : "Inativo"}
                      </Badge>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(coupon)}
                        className="cursor-pointer"
                      >
                        <Pencil className="size-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(coupon.id)}
                        className="cursor-pointer"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCoupons.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground text-sm">
                    Nenhum cupom encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog for Coupon Editor */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md select-none font-sans">
          <DialogHeader>
            <DialogTitle>
              {editingCoupon ? "Editar Cupom" : "Criar Novo Cupom"}
            </DialogTitle>
            <DialogDescription>
              Configure o código promocional e as condições de desconto.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="couponCode">Código do Cupom *</Label>
              <Input
                id="couponCode"
                placeholder="Ex: MIMO15"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="couponType">Tipo de Desconto *</Label>
              <select
                id="couponType"
                value={type}
                onChange={(e) => setType(e.target.value as "PERCENTAGE" | "FIXED")}
                className="w-full h-10 rounded-[var(--radius-lg)] border border-input bg-background/85 px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring transition-all"
              >
                <option value="PERCENTAGE">Porcentagem (%)</option>
                <option value="FIXED">Valor Fixo (R$)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="couponValue">
                {type === "PERCENTAGE" ? "Porcentagem (%) *" : "Valor de Desconto (R$) *"}
              </Label>
              <Input
                id="couponValue"
                type="number"
                step={type === "PERCENTAGE" ? "1" : "0.01"}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="couponLimit">Limite de Usos *</Label>
              <Input
                id="couponLimit"
                type="number"
                value={usageLimit}
                onChange={(e) => setUsageLimit(Number(e.target.value))}
                required
              />
            </div>

            <div className="flex items-center gap-2 pt-2 cursor-pointer select-none">
              <input
                id="couponActive"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 focus:ring-[var(--mqm-blush-400)]"
              />
              <Label htmlFor="couponActive" className="cursor-pointer text-sm">Ativar cupom imediatamente</Label>
            </div>

            <DialogFooter className="pt-4 gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="cursor-pointer">
                Cancelar
              </Button>
              <Button type="submit" className="cursor-pointer">
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
