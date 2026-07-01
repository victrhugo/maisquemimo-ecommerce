"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ProductCard } from "@/components/store/product-card";
import { useFeaturedProducts, useNewProducts } from "@/hooks/use-products";
import { fallbackProducts, storeCategories, storeCollections } from "@/components/store/catalog-data";

const instagramShots = [
  { id: "ig-1", src: "/images/category-1.svg", alt: "Detalhe de caderno artesanal" },
  { id: "ig-2", src: "/images/category-2.svg", alt: "Planner aberto sobre mesa" },
  { id: "ig-3", src: "/images/category-3.svg", alt: "Canetas e bloco de notas" },
  { id: "ig-4", src: "/images/manifesto-desk.svg", alt: "Composicao de escritorio" },
  { id: "ig-5", src: "/images/manifesto-gift.svg", alt: "Embalagem para presente" },
  { id: "ig-6", src: "/images/product-card-placeholder.svg", alt: "Itens de papelaria" },
];

export function HomeStory() {
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const { data: newProductsData } = useNewProducts(8);
  const { data: featuredProductsData } = useFeaturedProducts(8);

  const launches = useMemo(() => {
    if (newProductsData?.content?.length) {
      return newProductsData.content;
    }
    return fallbackProducts.filter((product) => product.isNew).slice(0, 8);
  }, [newProductsData]);

  const bestSellers = useMemo(() => {
    if (featuredProductsData?.content?.length) {
      return featuredProductsData.content;
    }
    return fallbackProducts.filter((product) => product.isFeatured).slice(0, 8);
  }, [featuredProductsData]);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setNewsletterSubscribed(true);
    setEmailInput("");
  }

  return (
    <div className="flex flex-col bg-[var(--background)]">
      <section className="border-b border-[color-mix(in_srgb,var(--border)_55%,transparent)] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[var(--mqm-olive-500)]">Loja Mais que Mimo</p>
            <h1 className="mt-3 font-display text-[2.2rem] leading-[1.02] text-[var(--mqm-olive-800)] sm:text-[2.8rem]">
              Papelaria artesanal para comprar rapido e sem ruido.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--mqm-olive-700)]/85 sm:text-base">
              Selecione por categoria, veja os produtos em destaque e finalize sua escolha com facilidade.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/produtos"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--mqm-olive-700)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[var(--mqm-olive-800)]"
              >
                Ver loja
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="#lancamentos"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--mqm-olive-700)] transition-colors hover:text-[var(--mqm-blush-700)]"
              >
                Ver lancamentos
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[16/8] overflow-hidden rounded-[1.5rem] bg-[var(--mqm-warm-100)]">
              <Image
                src="/images/placeholder-hero.svg"
                alt="Mesa com papelaria artesanal organizada"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14" id="categorias">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl text-[var(--mqm-olive-800)]">Categorias</h2>
            <Link href="/produtos" className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--mqm-olive-600)] hover:text-[var(--mqm-blush-700)]">
              Ver tudo
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {storeCategories.map((category) => (
              <Link key={category.id} href={category.href} className="group">
                <article className="space-y-2.5">
                  <div className="relative aspect-square overflow-hidden rounded-[1.1rem] bg-[var(--mqm-warm-100)]">
                    <Image
                      src={category.imageSrc}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    />
                  </div>
                  <p className="text-sm font-semibold text-[var(--mqm-olive-800)]">{category.name}</p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14" id="lancamentos">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl text-[var(--mqm-olive-800)]">Lancamentos</h2>
            <Link href="/produtos?sort=novidades" className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--mqm-olive-600)] hover:text-[var(--mqm-blush-700)]">
              Ver todos
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {launches.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14" id="mais-vendidos">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl text-[var(--mqm-olive-800)]">Mais vendidos</h2>
            <Link href="/produtos?sort=mais-vendidos" className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--mqm-olive-600)] hover:text-[var(--mqm-blush-700)]">
              Ver todos
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14" id="colecoes">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl text-[var(--mqm-olive-800)]">Colecoes</h2>
            <Link href="/produtos" className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--mqm-olive-600)] hover:text-[var(--mqm-blush-700)]">
              Explorar
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {storeCollections.map((collection) => (
              <Link key={collection.id} href={collection.href} className="group block">
                <article className="overflow-hidden rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_75%,transparent)] bg-[var(--mqm-warm-50)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={collection.imageSrc}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-[var(--mqm-olive-800)]">{collection.name}</h3>
                    <p className="mt-1 text-sm text-[var(--mqm-olive-700)]/80">{collection.description}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14" id="instagram">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl text-[var(--mqm-olive-800)]">Instagram</h2>
            <a
              href="https://www.instagram.com/_maisquemimo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--mqm-olive-600)] hover:text-[var(--mqm-blush-700)]"
            >
              @_maisquemimo
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
            {instagramShots.map((shot) => (
              <article key={shot.id} className="relative aspect-square overflow-hidden rounded-[1rem] bg-[var(--mqm-warm-100)]">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[color-mix(in_srgb,var(--border)_55%,transparent)] px-4 py-12 sm:px-6 sm:py-16" id="newsletter">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl text-[var(--mqm-olive-800)]">Newsletter</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--mqm-olive-700)]/80 sm:text-base">
            Novidades da loja, reposicoes e novas colecoes em um envio leve e objetivo.
          </p>

          {newsletterSubscribed ? (
            <div className="mx-auto mt-6 flex max-w-lg items-center justify-center gap-2 rounded-[1rem] border border-[color-mix(in_srgb,var(--mqm-olive-300)_45%,transparent)] bg-[var(--mqm-olive-50)] px-4 py-3 text-sm font-semibold text-[var(--mqm-olive-800)]">
              <Check className="size-4" />
              Cadastro confirmado
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mx-auto mt-6 flex max-w-lg flex-col gap-2 sm:flex-row">
              <input
                type="email"
                required
                placeholder="Seu e-mail"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="h-11 flex-1 rounded-full border border-[color-mix(in_srgb,var(--border)_90%,transparent)] bg-[var(--mqm-warm-50)] px-4 text-sm text-[var(--mqm-olive-900)] outline-none transition-colors focus:border-[var(--mqm-blush-300)]"
              />
              <button
                type="submit"
                className="h-11 rounded-full bg-[var(--mqm-olive-700)] px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--mqm-olive-800)]"
              >
                Inscrever
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
