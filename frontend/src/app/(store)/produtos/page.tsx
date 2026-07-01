"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/store/product-card";
import { fallbackProducts, storeCategories } from "@/components/store/catalog-data";
import { useProducts } from "@/hooks/use-products";
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
  const selectedCategory = searchParams.get("categoria")?.toLowerCase() ?? "";

  const [sort, setSort] = useState<SortOption>("featured");
  const { data } = useProducts(0, 48);

  const products = data?.content?.length ? data.content : fallbackProducts;

  const filteredProducts = useMemo(() => {
    const byCategory = selectedCategory
      ? products.filter((product) => product.categoryId.toLowerCase() === selectedCategory)
      : products;

    return sortProducts(byCategory, sort);
  }, [products, selectedCategory, sort]);

  const activeCategoryName =
    storeCategories.find((category) => category.id.toLowerCase() === selectedCategory)?.name ?? "Todos";

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 border-b border-[color-mix(in_srgb,var(--border)_55%,transparent)] pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[var(--mqm-olive-500)]">Catalogo</p>
          <h1 className="mt-2 font-display text-[2rem] leading-none text-[var(--mqm-olive-800)] sm:text-[2.4rem]">Produtos</h1>
          <p className="mt-3 text-sm text-[var(--mqm-olive-700)]/80 sm:text-base">
            Categoria ativa: <strong className="text-[var(--mqm-olive-800)]">{activeCategoryName}</strong>
          </p>
        </header>

        <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <nav className="flex flex-wrap gap-2" aria-label="Filtro por categoria">
            <Link
              href="/produtos"
              className="rounded-full border border-[color-mix(in_srgb,var(--border)_75%,transparent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mqm-olive-700)] transition-colors hover:border-[var(--mqm-blush-300)] hover:text-[var(--mqm-blush-700)]"
            >
              Todos
            </Link>
            {storeCategories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="rounded-full border border-[color-mix(in_srgb,var(--border)_75%,transparent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mqm-olive-700)] transition-colors hover:border-[var(--mqm-blush-300)] hover:text-[var(--mqm-blush-700)]"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mqm-olive-600)]">
            Ordenar
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="h-10 rounded-full border border-[color-mix(in_srgb,var(--border)_75%,transparent)] bg-[var(--mqm-warm-50)] px-4 text-xs font-semibold uppercase tracking-[0.11em] text-[var(--mqm-olive-700)] outline-none"
            >
              <option value="featured">Destaques</option>
              <option value="new">Novidades</option>
              <option value="price-asc">Menor preco</option>
              <option value="price-desc">Maior preco</option>
            </select>
          </label>
        </div>

        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--mqm-olive-600)]">
          {filteredProducts.length} produtos
        </div>

        <section className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4" aria-label="Lista de produtos">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="px-4 py-10 sm:px-6">Carregando produtos...</div>}>
      <ProductsCatalog />
    </Suspense>
  );
}
