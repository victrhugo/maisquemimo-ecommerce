"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useProductBySlug } from "@/hooks/use-products";
import { useCartStore } from "@/stores/cart-store";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const { data } = useProductBySlug(slug || "");
  const product = data;

  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[var(--mqm-warm-50)] px-6 py-10 text-center">
          <h1 className="font-display text-3xl text-[var(--mqm-olive-800)]">Produto nao encontrado</h1>
          <Link
            href="/produtos"
            className="mt-5 inline-flex rounded-full bg-[var(--mqm-olive-700)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white"
          >
            Voltar para produtos
          </Link>
        </div>
      </div>
    );
  }

  const selectedProduct = product;
  const imageSrc = selectedProduct.images?.[0]?.imageUrl || "/images/product-card-placeholder.svg";

  function handleAddToCart() {
    if (!selectedProduct.inStock) return;

    addItem({
      productId: selectedProduct.id,
      name: selectedProduct.name,
      slug: selectedProduct.slug,
      price: selectedProduct.price,
      imageUrl: imageSrc,
    });

    toast({
      title: "Adicionado ao carrinho",
      description: selectedProduct.name,
      variant: "success",
    });
  }

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-[var(--mqm-warm-100)]">
            <Image
              src={imageSrc}
              alt={selectedProduct.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--mqm-olive-500)]">{selectedProduct.categoryId}</p>
          <h1 className="mt-2 font-display text-[2rem] leading-tight text-[var(--mqm-olive-800)] sm:text-[2.4rem]">
            {selectedProduct.name}
          </h1>

          <div className="mt-5 flex items-baseline gap-2">
            <p className="text-2xl font-bold text-[var(--mqm-olive-800)]">{formatCurrency(selectedProduct.price)}</p>
            {selectedProduct.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">{formatCurrency(selectedProduct.originalPrice)}</p>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-[var(--mqm-olive-700)]/85 sm:text-base">
            {selectedProduct.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!selectedProduct.inStock}
              className="h-11 rounded-full bg-[var(--mqm-olive-700)] px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--mqm-olive-800)] disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
            >
              {selectedProduct.inStock ? "Adicionar ao carrinho" : "Produto esgotado"}
            </button>

            <Link
              href="/produtos"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--mqm-olive-600)] hover:text-[var(--mqm-blush-700)]"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
