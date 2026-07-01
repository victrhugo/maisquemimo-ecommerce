import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const curatedProducts = [
  {
    id: "1",
    name: "Caderno Floral Rosé A5",
    slug: "caderno-floral-rose-a5",
    description: "Capa em linho rosé, miolo pontilhado e acabamento dourado.",
    price: 4990,
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "2",
    name: "Planner Anual Atelier",
    slug: "planner-anual-atelier",
    description: "Planejamento semanal com páginas de intenção e autocuidado.",
    price: 8990,
    image:
      "https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    name: "Kit Escrita Calmaria",
    slug: "kit-escrita-calmaria",
    description: "Caneta gel, bloco de notas e adesivos em um conjunto pensado para escrever sem pressa.",
    price: 3490,
    image:
      "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=1200&q=80",
  },
];

export function FeaturedProducts() {
  return (
    <section className="mqm-section bg-[var(--mqm-paper-100)]/55 py-24 sm:py-28 lg:py-34">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="mqm-eyebrow">Escolhas da casa</p>
            <h2 className="mqm-title mt-3 text-3xl font-medium leading-tight sm:text-4xl lg:text-[2.8rem]">
              Três peças para viver no cotidiano,
              <br className="hidden sm:block" />
              não apenas para preencher uma prateleira.
            </h2>
            <p className="mqm-copy mt-4 text-base">
              Três itens que resumem o nosso jeito de selecionar papelaria:
              materiais honestos, acabamento delicado e presença.
            </p>
          </div>
          <Link
            href="/produtos"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:text-foreground"
          >
            Ver toda a coleção
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid gap-14 lg:gap-16">
          {curatedProducts.map((product, index) => (
            <article
              key={product.id}
              className="mqm-reveal grid items-center gap-8 lg:grid-cols-12 lg:gap-11"
            >
              <div className={`relative overflow-hidden rounded-[var(--radius-xl)] lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={1300}
                  height={840}
                  className={`w-full object-cover ${index === 0 ? "h-80 sm:h-[25rem]" : "h-72 sm:h-80"}`}
                />
                {index === 0 && (
                  <div className="mqm-caption-chip absolute bottom-4 right-4 px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Mesa da semana</p>
                    <p className="text-sm text-foreground">Matérias e texturas para uso diário.</p>
                  </div>
                )}
              </div>

              <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <h3 className="mqm-title text-3xl leading-tight sm:text-4xl">{product.name}</h3>
                <p className="mqm-copy mt-4 max-w-md text-base">{product.description}</p>
                <p className="mt-6 font-display text-[1.75rem] text-foreground">{formatCurrency(product.price / 100)}</p>
                <Link
                  href={`/produto/${product.slug}`}
                  className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-primary transition-colors duration-[var(--motion-fast)] hover:text-foreground"
                >
                  Ver produto
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
