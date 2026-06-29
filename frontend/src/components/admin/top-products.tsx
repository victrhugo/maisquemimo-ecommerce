import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const topProducts = [
  { id: "1", name: "Caderno Floral Rosé A5", sales: 89, revenue: 444110 },
  { id: "2", name: "Kit Adesivos Botanical", sales: 134, revenue: 252260 },
  { id: "3", name: "Planner Mensal 2025", sales: 45, revenue: 404550 },
  { id: "4", name: "Canetas Pastel — Kit 8", sales: 67, revenue: 234030 },
  { id: "5", name: "Caderno Dot Grid A4", sales: 52, revenue: 311220 },
];

const maxSales = Math.max(...topProducts.map((p) => p.sales));

export function TopProducts() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Produtos mais vendidos</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4" aria-label="Lista de produtos mais vendidos">
          {topProducts.map((product, index) => (
            <li key={product.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--mqm-rose-100)] text-[10px] font-bold text-[var(--mqm-rose-600)]">
                    {index + 1}
                  </span>
                  <span className="font-medium text-foreground line-clamp-1">
                    {product.name}
                  </span>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {product.sales} vendas
                </span>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--mqm-rose-400)] to-[var(--mqm-mauve-500)] transition-all duration-500"
                  style={{ width: `${(product.sales / maxSales) * 100}%` }}
                  role="progressbar"
                  aria-valuenow={product.sales}
                  aria-valuemax={maxSales}
                  aria-label={`${product.name}: ${product.sales} vendas`}
                />
              </div>
              <p className="text-right text-xs text-muted-foreground">
                {formatCurrency(product.revenue / 100)}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
