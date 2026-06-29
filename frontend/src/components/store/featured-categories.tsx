import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
  {
    slug: "cadernos",
    label: "Cadernos",
    description: "Para registrar cada momento",
    emoji: "📓",
    color: "from-[var(--mqm-rose-100)] to-[var(--mqm-rose-200)]",
    textColor: "text-[var(--mqm-rose-700)]",
  },
  {
    slug: "adesivos",
    label: "Adesivos",
    description: "Decore com personalidade",
    emoji: "🎨",
    color: "from-[var(--mqm-mauve-100)] to-[var(--mqm-mauve-200)]",
    textColor: "text-[var(--mqm-mauve-700)]",
  },
  {
    slug: "planner",
    label: "Planner",
    description: "Organize sua vida com estilo",
    emoji: "📅",
    color: "from-[var(--mqm-cream-200)] to-[var(--mqm-cream-300)]",
    textColor: "text-amber-700",
  },
  {
    slug: "presentes",
    label: "Presentes",
    description: "Para quem você ama",
    emoji: "🎁",
    color: "from-emerald-100 to-emerald-200",
    textColor: "text-emerald-700",
  },
  {
    slug: "canetas",
    label: "Canetas & Marcadores",
    description: "Escreva com beleza",
    emoji: "✒️",
    color: "from-sky-100 to-sky-200",
    textColor: "text-sky-700",
  },
  {
    slug: "kits",
    label: "Kits Especiais",
    description: "Conjuntos pensados com afeto",
    emoji: "✨",
    color: "from-[var(--mqm-rose-100)] to-[var(--mqm-mauve-100)]",
    textColor: "text-[var(--mqm-rose-600)]",
  },
];

export function FeaturedCategories() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Explore por categoria
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Encontre exatamente o que seu coração procura
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/produtos?categoria=${category.slug}`}
              className={cn(
                "group flex flex-col items-center gap-3 rounded-2xl p-5 text-center transition-all duration-200",
                "bg-gradient-to-b hover:shadow-md hover:-translate-y-0.5",
                category.color
              )}
            >
              <span className="text-3xl transition-transform duration-200 group-hover:scale-110" role="img" aria-label={category.label}>
                {category.emoji}
              </span>
              <div>
                <p className={cn("text-sm font-semibold", category.textColor)}>
                  {category.label}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground hidden sm:block">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
