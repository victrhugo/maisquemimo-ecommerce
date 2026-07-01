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
      {/* Hero Section - Centered and compact */}
      <section className="px-4 py-14 sm:px-6 sm:py-20 bg-[var(--mqm-warm-50)] text-center border-b border-[color-mix(in_srgb,var(--border)_45%,transparent)] select-none">
        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--mqm-olive-500)] font-sans">
            Feito à mão • Papelaria Afetiva
          </p>
          <h1 className="mt-4 font-display text-[2.2rem] leading-[1.08] text-[var(--mqm-olive-800)] sm:text-[3.2rem] font-bold">
            Organize a rotina com delicadeza.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[var(--mqm-olive-700)]/85 font-sans">
            Produtos artesanais com design minimalista criados para trazer leveza, afeto e inspiração ao seu dia a dia.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/produtos"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--mqm-olive-700)] px-6 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[var(--mqm-olive-800)] shadow-[var(--shadow-xs)] font-sans active:scale-[0.98]"
            >
              Explorar produtos
            </Link>
            <Link
              href="/produtos?categoria=planner"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--mqm-olive-400)] bg-[var(--mqm-warm-50)] px-6 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--mqm-olive-700)] transition-colors hover:bg-[var(--mqm-blush-100)]/60 hover:text-[var(--mqm-blush-700)] hover:border-[var(--mqm-blush-300)] shadow-[var(--shadow-xs)] font-sans active:scale-[0.98]"
            >
              Ver Planners
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section - Circular elegant items */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 border-b border-[color-mix(in_srgb,var(--border)_45%,transparent)] bg-[var(--background)]" id="categorias">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-display text-[1.45rem] sm:text-[1.65rem] font-bold text-[var(--mqm-olive-800)] uppercase tracking-wider">
              Categorias
            </h2>
            <Link href="/produtos" className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--mqm-olive-600)] hover:text-[var(--mqm-blush-700)] transition-colors font-sans">
              Ver tudo →
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {storeCategories.map((category) => (
               <Link key={category.id} href={category.href} className="group flex flex-col items-center">
                 <div className="relative aspect-square w-full max-w-[100px] sm:max-w-[120px] overflow-hidden rounded-full border border-[color-mix(in_srgb,var(--border)_45%,transparent)] bg-[var(--mqm-warm-50)] shadow-[var(--shadow-xs)] transition-transform duration-500 group-hover:scale-[1.05] group-hover:shadow-[var(--shadow-sm)]">
                   <Image
                     src={category.imageSrc}
                     alt={category.name}
                     fill
                     className="object-cover p-1 rounded-full"
                     sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 10vw"
                   />
                 </div>
                 <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--mqm-olive-800)] group-hover:text-[var(--mqm-blush-700)] transition-colors text-center font-sans">
                   {category.name}
                 </p>
               </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lançamentos Section - 4 columns layout */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 border-b border-[color-mix(in_srgb,var(--border)_45%,transparent)] bg-[var(--background)]" id="lancamentos">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-display text-[1.45rem] sm:text-[1.65rem] font-bold text-[var(--mqm-olive-800)] uppercase tracking-wider">
              Lançamentos
            </h2>
            <Link href="/produtos?sort=new" className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--mqm-olive-600)] hover:text-[var(--mqm-blush-700)] transition-colors font-sans">
              Ver todos →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {launches.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Mais vendidos Section - 4 columns layout */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 border-b border-[color-mix(in_srgb,var(--border)_45%,transparent)] bg-[var(--background)]" id="mais-vendidos">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-display text-[1.45rem] sm:text-[1.65rem] font-bold text-[var(--mqm-olive-800)] uppercase tracking-wider">
              Mais vendidos
            </h2>
            <Link href="/produtos?sort=mais-vendidos" className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--mqm-olive-600)] hover:text-[var(--mqm-blush-700)] transition-colors font-sans">
              Ver todos →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Coleções Section - 3 columns clean grid */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 border-b border-[color-mix(in_srgb,var(--border)_45%,transparent)] bg-[var(--background)]" id="colecoes">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-display text-[1.45rem] sm:text-[1.65rem] font-bold text-[var(--mqm-olive-800)] uppercase tracking-wider">
              Coleções
            </h2>
            <Link href="/produtos" className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--mqm-olive-600)] hover:text-[var(--mqm-blush-700)] transition-colors font-sans">
              Explorar →
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {storeCollections.map((collection) => (
              <Link key={collection.id} href={collection.href} className="group block">
                <article className="overflow-hidden rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_45%,transparent)] bg-[var(--mqm-warm-50)] shadow-[var(--shadow-xs)] transition-all duration-300 hover:shadow-[var(--shadow-sm)] hover:border-[var(--mqm-blush-300)] flex flex-col h-full">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-[color-mix(in_srgb,var(--border)_35%,transparent)] shrink-0">
                    <Image
                      src={collection.imageSrc}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5 text-center flex-1 flex flex-col justify-center">
                    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--mqm-olive-800)] group-hover:text-[var(--mqm-blush-700)] transition-colors font-sans">
                      {collection.name}
                    </h3>
                    <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground font-sans">
                      {collection.description}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Clean, centered */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 bg-[var(--mqm-warm-50)]" id="newsletter">
        <div className="mx-auto max-w-2xl text-center select-none">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--mqm-blush-600)] font-sans">
            Fique por dentro
          </p>
          <h2 className="mt-3 font-display text-[1.85rem] font-bold text-[var(--mqm-olive-800)] uppercase tracking-wider">
            Assine nossa Newsletter
          </h2>
          <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-[var(--mqm-olive-700)]/80 font-sans">
            Receba novidades exclusivas, lançamentos de coleções e mimos direto na sua caixa de entrada.
          </p>

          {newsletterSubscribed ? (
            <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-full border border-[var(--mqm-olive-200)] bg-[var(--mqm-olive-50)] px-4 py-3 text-xs font-bold uppercase tracking-[0.11em] text-[var(--mqm-olive-800)] shadow-[var(--shadow-xs)] font-sans">
              <Check className="size-3.5" />
              Inscrição Confirmada!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
              <input
                type="email"
                required
                placeholder="Seu melhor e-mail"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="h-11 flex-1 rounded-full border border-[color-mix(in_srgb,var(--border)_80%,transparent)] bg-[var(--mqm-warm-50)] px-5 text-xs text-[var(--mqm-olive-900)] outline-none transition-all focus:border-[var(--mqm-blush-400)] focus:ring-1 focus:ring-[var(--mqm-blush-300)] placeholder:text-muted-foreground/50 font-sans"
              />
              <button
                type="submit"
                className="h-11 rounded-full bg-[var(--mqm-olive-700)] px-6 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[var(--mqm-olive-800)] shadow-[var(--shadow-xs)] active:scale-[0.98] cursor-pointer font-sans"
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
