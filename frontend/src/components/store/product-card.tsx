"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [favorited, setFavorited] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      imageUrl: product.images?.[0]?.imageUrl ?? '',
    });
    toast({
      title: "Adicionado ao carrinho!",
      description: product.name,
      variant: "success",
    });
  }

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setFavorited(!favorited);
  }

  return (
    <article className={cn("group", className)}>
      <Link href={`/produto/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--mqm-warm-200)]">
          <Image
            src="/images/product-card-placeholder.svg"
            alt={`Placeholder elegante para ${product.name}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          <button
            onClick={handleFavorite}
            aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            aria-pressed={favorited}
            className={cn(
              "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
              "opacity-100",
              favorited
                ? "bg-secondary text-primary"
                : "bg-[var(--mqm-warm-50)]/86 text-muted-foreground hover:text-primary backdrop-blur-sm"
            )}
          >
            <Heart
              className={cn(
                "size-4 transition-all",
                favorited && "fill-primary"
              )}
            />
          </button>

          <div className="absolute bottom-2 left-2">
            <span className="mqm-caption-chip px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {product.inStock ? "Disponível" : "Indisponível"}
            </span>
          </div>

          <div className="absolute bottom-2 right-2">
            <Button
              size="sm"
              variant="brand"
              className="h-8 rounded-full px-3 text-[11px]"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              aria-label={`Adicionar ${product.name} ao carrinho`}
            >
              <ShoppingBag className="size-3.5" />
              {product.inStock ? "Adicionar" : "Esgotado"}
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-3 space-y-1.5 px-0.5">
          <p className="text-xs uppercase tracking-[0.13em] text-muted-foreground">{product.categoryId}</p>
          <h3 className="line-clamp-2 font-display text-xl font-semibold leading-[1.15] text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-base font-semibold text-foreground">
              {formatCurrency(product.price / 100)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(product.originalPrice / 100)}
              </span>
            )}
          </div>

          {!product.inStock && (
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Indisponível no momento</p>
          )}
        </div>
      </Link>
    </article>
  );
}
