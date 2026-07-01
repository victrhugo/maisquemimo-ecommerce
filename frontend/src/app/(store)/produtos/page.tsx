"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "@/components/store/product-card";
import { useProducts } from "@/hooks/use-products";
import { usePublicCategories } from "@/hooks/use-categories";
import type { Product } from "@/types/product";

type SortOption = "featured" | "price-asc" | "price-desc" | "new";

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const list = [...products];

  if (sort === "price-asc") {
    return list.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-desc") {
    return list.sort((a, b) => b.price - a.price);
  }

  if (sort === "new") {
    return list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
  }

  return list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
}

function ProductsCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get("categoria")?.toLowerCase() ?? "";

  const { data: categoriesData } = usePublicCategories();
  const [sort, setSort] = useState<SortOption>("featured");
  const { data } = useProducts(0, 48);

  const products = data?.content ?? [];

  const categories = useMemo(() => {
    if (!categoriesData?.length) {
      return [];
    }

    return categoriesData.map((c) => ({
      id: c.id,
      name: c.name,
      href: `/produtos?categoria=${c.id}`,
      imageSrc: c.imageUrl || "/images/product-card-placeholder.svg",
    }));
  }, [categoriesData]);

  const filteredProducts = useMemo(() => {
    const byCategory = selectedCategory
      ? products.filter((product) => product.categoryId.toLowerCase() === selectedCategory)
      : products;

    return sortProducts(byCategory, sort);
  }, [products, selectedCategory, sort]);

  const activeCategoryName =
    categories.find((category) => category.id.toLowerCase() === selectedCategory)?.name ?? "Todos";

  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16 bg-[var(--background)]">
      <div className="mx-auto max-w-6xl">
        {/* Header - Centered and elegant */}
        <header className="mb-12 text-center select-none animate-fade-in">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--mqm-olive-500)] font-sans">
            Nosso Catálogo
          </p>
          <h1 className="mt-3 font-display text-[2.2rem] font-bold text-[var(--mqm-olive-800)] uppercase tracking-wider">
            {activeCategoryName === "Todos" ? "Todos os Produtos" : activeCategoryName}
          </h1>
          <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground font-sans">
            Papelaria artesanal feita à mão com amor, afeto e cuidado em cada detalhe.
          </p>
        </header>

        {/* Filter & Sort Bar - Bordered top and bottom */}
        <div className="mb-10 border-y border-[color-mix(in_srgb,var(--border)_45%,transparent)] py-3 px-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between select-none">
          {/* Filters - Left */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--mqm-olive-600)] font-sans">
                Categoria:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  const val = e.target.value;
                  router.push(val ? `/produtos?categoria=${val}` : "/produtos");
                }}
                className="h-9 rounded-full border border-[color-mix(in_srgb,var(--border)_80%,transparent)] bg-[var(--mqm-warm-50)] px-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--mqm-olive-800)] outline-none cursor-pointer focus:border-[var(--mqm-blush-400)] transition-colors font-sans"
              >
                <option value="">Todas</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort and Count - Right */}
          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--mqm-olive-600)] font-sans">
                Ordenar:
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="h-9 rounded-full border border-[color-mix(in_srgb,var(--border)_80%,transparent)] bg-[var(--mqm-warm-50)] px-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--mqm-olive-800)] outline-none cursor-pointer focus:border-[var(--mqm-blush-400)] transition-colors font-sans"
              >
                <option value="featured">Destaques</option>
                <option value="new">Novidades</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
              </select>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--mqm-olive-600)] font-sans">
              {filteredProducts.length} {filteredProducts.length === 1 ? "Produto" : "Produtos"}
            </span>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[var(--mqm-warm-50)] px-6 py-10 text-center">
            <p className="text-sm text-muted-foreground">Nenhum produto encontrado.</p>
          </div>
        ) : (
          <section className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 animate-fade-in" aria-label="Lista de produtos">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="px-4 py-10 sm:px-6 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--mqm-olive-600)]">Carregando catálogo...</div>}>
      <ProductsCatalog />
    </Suspense>
  );
}
