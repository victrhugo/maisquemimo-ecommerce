import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/store/product-card";
import type { Product } from "@/types/product";

// Dados mock para desenvolvimento — serão substituídos pela API
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Caderno Floral Rosé A5",
    slug: "caderno-floral-rose-a5",
    description: "Caderno floral para anotações",
    price: 4990,
    originalPrice: 6490,
    categoryId: "1",
    stockQuantity: 10,
    sku: "CAD-001",
    rating: 4.9,
    reviewCount: 127,
    isNew: false,
    isFeatured: true,
    active: true,
    inStock: true,
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Kit Adesivos Botanical",
    slug: "kit-adesivos-botanical",
    description: "Kit de adesivos botanical",
    price: 1890,
    originalPrice: null,
    categoryId: "2",
    stockQuantity: 20,
    sku: "ADH-001",
    rating: 5.0,
    reviewCount: 89,
    isNew: true,
    isFeatured: true,
    active: true,
    inStock: true,
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Planner Mensal 2025",
    slug: "planner-mensal-2025",
    description: "Planner mensal completo",
    price: 8990,
    originalPrice: 11990,
    categoryId: "3",
    stockQuantity: 5,
    sku: "PLN-001",
    rating: 4.8,
    reviewCount: 203,
    isNew: false,
    isFeatured: true,
    active: true,
    inStock: true,
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Canetas Pastel — Kit 8 cores",
    slug: "canetas-pastel-kit-8",
    description: "Kit de canetas pastel com 8 cores",
    price: 3490,
    originalPrice: null,
    categoryId: "4",
    stockQuantity: 0,
    sku: "CAN-001",
    rating: 4.7,
    reviewCount: 56,
    isNew: true,
    isFeatured: true,
    active: true,
    inStock: false,
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function FeaturedProducts() {
  return (
    <section className="bg-[var(--mqm-cream-50)] py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              Mais amados
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Os favoritos das nossas clientes
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <Link href="/produtos">
              Ver todos
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/produtos">Ver todos os produtos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
