"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
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

  const imageSrc = product.images?.[0]?.imageUrl || "/images/product-card-placeholder.svg";

  return (
    <article className={cn("group", className)}>
      <Link href={`/produto/${product.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem] bg-[var(--mqm-warm-100)]">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/6">
              <span className="rounded-full bg-white/96 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.17em] text-[var(--mqm-olive-700)]">
                Esgotado
              </span>
            </div>
          )}
        </div>

        <div className="pt-4">
          <h3 className="line-clamp-2 text-[0.97rem] font-semibold leading-snug text-[var(--mqm-olive-800)] group-hover:text-[var(--mqm-olive-600)]">
            {product.name}
          </h3>

          <div className="mt-2 flex items-end justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[var(--mqm-olive-800)]">
                {formatCurrency(product.price / 100)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(product.originalPrice / 100)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="border-b border-[color-mix(in_srgb,var(--mqm-olive-300)_55%,transparent)] pb-0.5 text-xs font-semibold uppercase tracking-[0.11em] text-[var(--mqm-olive-700)] transition-colors duration-[var(--motion-fast)] hover:text-[var(--mqm-blush-700)] hover:border-[var(--mqm-blush-400)] disabled:cursor-not-allowed disabled:border-transparent disabled:text-muted-foreground"
            >
              {product.inStock ? "Adicionar" : "Indisponivel"}
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}
