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
    <article className={cn("group flex flex-col justify-between h-full bg-[var(--card)] p-3 rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_45%,transparent)] transition-all duration-300 hover:shadow-[var(--shadow-sm)]", className)}>
      <Link href={`/produto/${product.slug}`} className="flex flex-col flex-1">
        {/* Image wrapper - 1:1 aspect ratio */}
        <div className="relative aspect-square w-full overflow-hidden rounded-[1rem] bg-[var(--mqm-warm-100)] border border-[color-mix(in_srgb,var(--border)_35%,transparent)]">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          
          {/* Status Badges - Bottom-left of the image */}
          {!product.inStock ? (
            <span className="absolute bottom-2.5 left-2.5 rounded-full bg-[var(--mqm-warm-50)] border border-[color-mix(in_srgb,var(--border)_80%,transparent)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground shadow-[var(--shadow-xs)]">
              Esgotado
            </span>
          ) : product.originalPrice && product.originalPrice > product.price ? (
            <span className="absolute bottom-2.5 left-2.5 rounded-full bg-[var(--mqm-blush-100)] border border-[var(--mqm-blush-300)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--mqm-blush-700)] shadow-[var(--shadow-xs)]">
              Promoção
            </span>
          ) : null}
        </div>

        {/* Info Area - Centered layout */}
        <div className="pt-4 pb-1 flex flex-col items-center text-center flex-1">
          {/* Title - Centered, all-caps, with a fixed height to prevent misalignment */}
          <h3 className="line-clamp-2 uppercase text-[0.8rem] md:text-[0.85rem] font-bold tracking-widest text-[var(--mqm-olive-800)] group-hover:text-[var(--mqm-olive-600)] transition-colors duration-200 h-10 flex items-center justify-center px-1 font-sans">
            {product.name}
          </h3>

          {/* Price - Centered, prominent */}
          <div className="mt-2.5 flex items-baseline justify-center gap-2">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through decoration-[var(--mqm-blush-400)]">
                {formatCurrency(product.originalPrice / 100)}
              </span>
            )}
            <span className="text-[0.95rem] font-bold text-[var(--mqm-blush-800)]">
              {formatCurrency(product.price / 100)}
            </span>
          </div>
        </div>
      </Link>

      {/* Action Button - Discrete, pill shape */}
      <div className="mt-3 pt-1 border-t border-dashed border-[color-mix(in_srgb,var(--border)_45%,transparent)]">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={cn(
            "w-full rounded-full border px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-[var(--motion-base)] ease-[var(--ease-brand)] active:scale-[0.98]",
            product.inStock
              ? "border-[var(--mqm-olive-400)] bg-[var(--mqm-warm-50)] text-[var(--mqm-olive-800)] hover:bg-[var(--mqm-olive-700)] hover:text-white hover:border-[var(--mqm-olive-700)] hover:shadow-[var(--shadow-xs)] cursor-pointer"
              : "border-[color-mix(in_srgb,var(--border)_75%,transparent)] bg-[color-mix(in_srgb,var(--mqm-warm-100)_70%,transparent)] text-muted-foreground/50 cursor-not-allowed"
          )}
        >
          {product.inStock ? "Adicionar ao carrinho" : "Esgotado"}
        </button>
      </div>
    </article>
  );
}
