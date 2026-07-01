"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/store/product-card";
import { useProducts } from "@/hooks/use-products";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { data } = useProducts(0, 80);

  const products = data?.content ?? [];

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;

    return products.filter((product) => {
      const haystack = `${product.name} ${product.description} ${product.categoryId}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [products, query]);

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 border-b border-[color-mix(in_srgb,var(--border)_55%,transparent)] pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[var(--mqm-olive-500)]">Busca</p>
          <h1 className="mt-2 font-display text-[2rem] leading-none text-[var(--mqm-olive-800)] sm:text-[2.4rem]">Encontrar produtos</h1>
        </header>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <label className="relative block w-full max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nome, categoria ou descricao"
              className="h-11 w-full rounded-full border border-[color-mix(in_srgb,var(--border)_80%,transparent)] bg-[var(--mqm-warm-50)] pl-11 pr-4 text-sm outline-none focus:border-[var(--mqm-blush-300)]"
            />
          </label>

          <Link
            href="/produtos"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mqm-olive-600)] hover:text-[var(--mqm-blush-700)]"
          >
            Ver catalogo completo
          </Link>
        </div>

        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--mqm-olive-600)]">{results.length} resultados</p>

        {results.length === 0 ? (
          <div className="rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[var(--mqm-warm-50)] px-6 py-10 text-center">
            <p className="text-sm text-muted-foreground">Nenhum produto encontrado para sua busca.</p>
            <Link
              href="/produtos"
              className="mt-5 inline-flex rounded-full bg-[var(--mqm-olive-700)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white"
            >
              Explorar produtos
            </Link>
          </div>
        ) : (
          <section className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4" aria-label="Resultados da busca">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
