import Link from "next/link";
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
    label: "Best Seller",
  },
  {
    id: "2",
    name: "Planner Anual Atelier",
    slug: "planner-anual-atelier",
    description: "Planejamento semanal com páginas de intenção e autocuidado.",
    price: 8990,
    image:
      "https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?auto=format&fit=crop&w=1200&q=80",
    label: "Edição Limitada",
  },
  {
    id: "3",
    name: "Kit Escrita Calmaria",
    slug: "kit-escrita-calmaria",
    description: "Caneta gel, bloco de notas e adesivos em uma seleção exclusiva.",
    price: 3490,
    image:
      "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=1200&q=80",
    label: "Novo",
  },
];

export function FeaturedProducts() {
  return (
    <section className="mqm-section bg-[var(--mqm-paper-100)]/75">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="mqm-eyebrow">Seleção da semana</p>
            <h2 className="mqm-title mt-3 text-3xl font-medium sm:text-4xl">
              Curadoria para uma rotina mais bonita
            </h2>
            <p className="mqm-copy mt-4 text-base">
              Peças com estética atemporal e materiais de alta qualidade para acompanhar
              seus projetos pessoais e profissionais.
            </p>
          </div>
          <Link
            href="/produtos"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground transition-all duration-[var(--motion-base)] ease-[var(--ease-brand)] hover:scale-[1.02] hover:border-primary/35"
          >
            Ver catálogo completo
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {curatedProducts.map((product) => (
            <article
              key={product.id}
              className="mqm-interactive group overflow-hidden rounded-[var(--radius-xl)] border border-border/80 bg-card shadow-[var(--shadow-sm)]"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 rounded-full border border-border/70 bg-background/90 px-3 py-1 text-[11px] uppercase tracking-[0.13em] text-foreground backdrop-blur-sm">
                  {product.label}
                </span>
              </div>
              <div className="space-y-4 p-6">
                <h3 className="mqm-title text-2xl">{product.name}</h3>
                <p className="mqm-copy text-sm">{product.description}</p>
                <div className="flex items-center justify-between border-t border-border/75 pt-4">
                  <p className="text-xl font-medium text-foreground">{formatCurrency(product.price / 100)}</p>
                  <Link
                    href={`/produto/${product.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-primary transition-colors duration-[var(--motion-fast)] hover:text-foreground"
                  >
                    Ver produto
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
