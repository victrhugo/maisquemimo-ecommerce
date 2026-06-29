"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      imageUrl: product.imageUrl,
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
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--mqm-cream-100)]">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            // Placeholder elegante
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-5xl opacity-30" aria-hidden="true">🎀</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge variant="rose" className="text-[10px]">Novo</Badge>
            )}
            {discount && (
              <Badge variant="sage" className="text-[10px]">-{discount}%</Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary" className="text-[10px]">Esgotado</Badge>
            )}
          </div>

          {/* Favorite button */}
          <button
            onClick={handleFavorite}
            aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            aria-pressed={favorited}
            className={cn(
              "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
              "opacity-0 group-hover:opacity-100",
              favorited
                ? "bg-[var(--mqm-rose-100)] text-[var(--mqm-rose-500)]"
                : "bg-white/80 text-muted-foreground hover:text-[var(--mqm-rose-500)] backdrop-blur-sm"
            )}
          >
            <Heart
              className={cn(
                "size-4 transition-all",
                favorited && "fill-[var(--mqm-rose-500)]"
              )}
            />
          </button>

          {/* Add to cart button — hover reveal */}
          <div className="absolute inset-x-2 bottom-2 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
            <Button
              size="sm"
              variant="brand"
              className="w-full shadow-lg"
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
        <div className="mt-3 space-y-1 px-0.5">
          <p className="text-xs text-muted-foreground">{product.category}</p>
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground group-hover:text-[var(--mqm-rose-600)] transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <Star className="size-3 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span className="text-xs font-medium text-foreground">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>
          )}

          {/* Price */}
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
        </div>
      </Link>
    </article>
  );
}
