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
    <section className="bg-[#EEE3DA] py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#6C6763]">Seleção da semana</p>
            <h2 className="mt-3 font-display text-3xl font-medium text-[#2E2A28] sm:text-4xl">
              Curadoria para uma rotina mais bonita
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#6C6763]">
              Peças com estética atemporal e materiais de alta qualidade para acompanhar
              seus projetos pessoais e profissionais.
            </p>
          </div>
          <Link
            href="/produtos"
            className="inline-flex items-center gap-2 rounded-full border border-[#2E2A28]/12 bg-white px-5 py-2 text-sm font-medium text-[#2E2A28] transition-all duration-500 hover:scale-[1.02]"
          >
            Ver catálogo completo
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {curatedProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-3xl border border-[#2E2A28]/10 bg-[#F8F5F2] shadow-[0_12px_24px_-20px_rgba(46,42,40,0.35)] transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 rounded-full border border-white/55 bg-white/75 px-3 py-1 text-[11px] uppercase tracking-[0.13em] text-[#2E2A28] backdrop-blur-sm">
                  {product.label}
                </span>
              </div>
              <div className="space-y-4 p-6">
                <h3 className="font-display text-2xl text-[#2E2A28]">{product.name}</h3>
                <p className="text-sm leading-relaxed text-[#6C6763]">{product.description}</p>
                <div className="flex items-center justify-between border-t border-[#2E2A28]/10 pt-4">
                  <p className="text-xl font-medium text-[#2E2A28]">{formatCurrency(product.price / 100)}</p>
                  <Link
                    href={`/produto/${product.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#B8758E] transition-colors duration-500 hover:text-[#2E2A28]"
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
