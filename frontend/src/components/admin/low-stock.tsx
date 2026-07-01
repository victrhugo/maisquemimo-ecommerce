import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const lowStockItems = [
  { id: "prd-8", name: "Planner Mensal Sereno", stock: 0 },
  { id: "prd-6", name: "Caixa Presente Afeto", stock: 4 },
  { id: "prd-3", name: "Kit Escrita Calmaria", stock: 6 },
];

export function LowStock() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-base flex items-center gap-2 text-destructive">
          <AlertCircle className="size-4.5" />
          <span>Alerta de Estoque Baixo</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-border" aria-label="Lista de produtos com estoque baixo">
          {lowStockItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
              <span className="text-sm font-medium text-foreground line-clamp-1">{item.name}</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full font-mono ${
                item.stock === 0
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "bg-amber-50 text-amber-600 border border-amber-200"
              }`}>
                {item.stock === 0 ? "Esgotado" : `${item.stock} un`}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
