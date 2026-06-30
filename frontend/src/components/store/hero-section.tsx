import Link from "next/link";
import { ArrowRight, BookOpenText, Gift, PenTool } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-[#F8F5F2] py-14 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.22em] text-[#6C6763]">
              Mais que Mimo
            </p>
            <h1 className="mt-5 font-display text-4xl font-medium leading-tight text-[#2E2A28] sm:text-5xl lg:text-[3.5rem]">
              Papelaria premium para mulheres que celebram os detalhes.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#6C6763] sm:text-lg">
              Cadernos, planners e itens de escrita com curadoria delicada para transformar
              sua rotina em um ritual de presença, beleza e afeto.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/produtos"
                className="inline-flex items-center gap-2 rounded-full border border-[#2E2A28]/10 bg-[#2E2A28] px-6 py-2.5 text-sm font-medium text-[#F8F5F2] transition-all duration-500 hover:scale-[1.02] hover:bg-[#2E2A28]/90"
              >
                Explorar coleção
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/produtos?categoria=planner"
                className="inline-flex items-center rounded-full border border-[#2E2A28]/15 bg-white px-6 py-2.5 text-sm font-medium text-[#2E2A28] transition-all duration-500 hover:scale-[1.02]"
              >
                Ver planners
              </Link>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-3 text-center">
              {[
                { value: "+8 mil", label: "clientes" },
                { value: "4.9/5", label: "avaliação" },
                { value: "48h", label: "envio" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#2E2A28]/8 bg-white p-4">
                  <p className="font-display text-2xl text-[#2E2A28]">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#6C6763]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <article className="overflow-hidden rounded-3xl border border-[#2E2A28]/8 bg-white shadow-[0_12px_30px_-24px_rgba(46,42,40,0.45)] transition-transform duration-700 hover:scale-[1.02]">
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80"
                alt="Mesa com caderno elegante e caneta"
                className="h-64 w-full object-cover sm:h-72"
                loading="lazy"
              />
              <div className="grid gap-3 p-5 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#2E2A28]/8 bg-[#F8F5F2] p-3 text-[#2E2A28]">
                  <BookOpenText className="size-4" />
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#6C6763]">Cadernos</p>
                </div>
                <div className="rounded-2xl border border-[#2E2A28]/8 bg-[#F8F5F2] p-3 text-[#2E2A28]">
                  <PenTool className="size-4" />
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#6C6763]">Escrita</p>
                </div>
                <div className="rounded-2xl border border-[#2E2A28]/8 bg-[#F8F5F2] p-3 text-[#2E2A28]">
                  <Gift className="size-4" />
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#6C6763]">Presentes</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
