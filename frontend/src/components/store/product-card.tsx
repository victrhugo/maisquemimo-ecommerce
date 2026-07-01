"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";
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
    
    const imageUrl = product.images?.[0]?.imageUrl ?? "/images/product-card-placeholder.svg";
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      imageUrl: imageUrl,
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

  const imageSrc = product.images?.[0]?.imageUrl || "/images/product-card-placeholder.svg";

  return (
    <article className={cn("group flex flex-col h-full", className)}>
      <Link href={`/produto/${product.slug}`} className="flex flex-col h-full">
        {/* Imagem do Produto */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.8rem] bg-[var(--mqm-warm-100)] border border-[color-mix(in_srgb,var(--border)_45%,transparent)] transition-all duration-500 group-hover:shadow-[var(--shadow-xs)]">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Botão de Favoritar - sutil */}
          <button
            onClick={handleFavorite}
            aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            aria-pressed={favorited}
            className={cn(
              "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-[var(--motion-base)]",
              favorited
                ? "bg-[var(--mqm-blush-100)] text-[var(--mqm-blush-700)] shadow-xs"
                : "bg-[var(--mqm-warm-50)]/90 text-[var(--mqm-olive-500)] hover:text-primary hover:bg-white shadow-xs backdrop-blur-xs opacity-0 group-hover:opacity-100"
            )}
          >
            <Heart
              className={cn(
                "size-4 transition-all",
                favorited && "fill-[var(--mqm-blush-600)] text-[var(--mqm-blush-600)]"
              )}
            />
          </button>

          {/* Tag de ESGOTADO discreta na foto */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/5 flex items-center justify-center backdrop-blur-[1px]">
              <span className="bg-white/95 border border-[var(--border)] rounded-full px-4 py-1.5 text-[10px] uppercase font-bold tracking-wider text-[var(--mqm-olive-600)] shadow-sm">
                Esgotado
              </span>
            </div>
          )}
        </div>

        {/* Info - Sem categoria acima do nome, e com espaçamentos elegantes */}
        <div className="mt-4 flex flex-col flex-1 px-1">
          <h3 className="line-clamp-2 font-display text-lg font-semibold leading-[1.25] text-[var(--mqm-olive-800)] transition-colors group-hover:text-[var(--mqm-olive-600)]">
            {product.name}
          </h3>

          <div className="mt-1.5 flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-[var(--mqm-olive-900)]">
                {formatCurrency(product.price / 100)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through font-normal">
                  {formatCurrency(product.originalPrice / 100)}
                </span>
              )}
            </div>

            {/* Link de compra discreto que aparece no hover ou fixa-se no mobile */}
            {product.inStock && (
              <button
                onClick={handleAddToCart}
                className="text-[10px] font-bold uppercase tracking-widest text-[var(--mqm-olive-700)] hover:text-[var(--mqm-blush-700)] border-b border-[color-mix(in_srgb,var(--mqm-olive-300)_50%,transparent)] hover:border-[var(--mqm-blush-400)] pb-0.5 transition-all duration-[var(--motion-fast)]"
              >
                + Adicionar
              </button>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
