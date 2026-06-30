import Link from "next/link";
import { BookOpenText, NotebookPen, PackageOpen, PenTool, ScrollText, Sticker } from "lucide-react";

const categories = [
  {
    slug: "cadernos",
    label: "Cadernos",
    description: "Coleções para escrita diária com acabamento sofisticado",
    icon: BookOpenText,
  },
  {
    slug: "adesivos",
    label: "Adesivos",
    description: "Detalhes delicados para personalizar seus rituais",
    icon: Sticker,
  },
  {
    slug: "planner",
    label: "Planner",
    description: "Organização elegante para rotina, metas e autocuidado",
    icon: ScrollText,
  },
  {
    slug: "presentes",
    label: "Presentes",
    description: "Kits para presentear com afeto e presença",
    icon: PackageOpen,
  },
  {
    slug: "canetas",
    label: "Canetas & Marcadores",
    description: "Texturas e pigmentos para experiências de escrita",
    icon: PenTool,
  },
  {
    slug: "kits",
    label: "Kits Especiais",
    description: "Seleções autorais para elevar cada momento",
    icon: NotebookPen,
  },
];

export function FeaturedCategories() {
  return (
    <section className="mqm-section">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mqm-eyebrow">Curadoria</p>
          <h2 className="mqm-title mt-3 text-3xl font-medium sm:text-4xl">
            Descubra por coleção
          </h2>
          <p className="mqm-copy mt-4 text-base">
            Cada categoria foi criada para unir funcionalidade, beleza e emoção em itens de
            papelaria feitos para durar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/produtos?categoria=${category.slug}`}
              className="mqm-interactive group rounded-[var(--radius-xl)] border border-border/80 bg-card p-6 shadow-[var(--shadow-sm)]"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-[var(--radius-md)] border border-border bg-[var(--mqm-paper-100)] p-3 text-primary">
                  <category.icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.12em] text-muted-foreground">Coleção</p>
                  <h3 className="mqm-title mt-1 text-2xl">{category.label}</h3>
                </div>
              </div>
              <p className="mqm-copy mt-6 text-sm">{category.description}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.16em] text-primary">Explorar</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
