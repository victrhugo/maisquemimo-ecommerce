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
    <section className="bg-[#F8F5F2] py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6C6763]">Curadoria</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-[#2E2A28] sm:text-4xl">
            Descubra por coleção
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#6C6763]">
            Cada categoria foi criada para unir funcionalidade, beleza e emoção em itens de
            papelaria feitos para durar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/produtos?categoria=${category.slug}`}
              className="group rounded-3xl border border-[#2E2A28]/10 bg-white p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_14px_30px_-24px_rgba(46,42,40,0.38)]"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-[#2E2A28]/10 bg-[#F8F5F2] p-3 text-[#B8758E]">
                  <category.icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.12em] text-[#6C6763]">Coleção</p>
                  <h3 className="mt-1 font-display text-2xl text-[#2E2A28]">{category.label}</h3>
                </div>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-[#6C6763]">{category.description}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.16em] text-[#B8758E]">Explorar</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
