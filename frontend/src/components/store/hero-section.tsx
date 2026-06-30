import Link from "next/link";
import { ArrowRight, BookOpenText, Gift, PenTool } from "lucide-react";

export function HeroSection() {
  return (
    <section className="mqm-section relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="max-w-xl">
            <p className="mqm-eyebrow">
              Mais que Mimo
            </p>
            <h1 className="mqm-title mt-5 text-4xl font-medium leading-tight sm:text-5xl lg:text-[3.5rem]">
              Papelaria premium para mulheres que celebram os detalhes.
            </h1>
            <p className="mqm-copy mt-6 max-w-lg text-base sm:text-lg">
              Cadernos, planners e itens de escrita com curadoria delicada para transformar
              sua rotina em um ritual de presença, beleza e afeto.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/produtos"
                className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-[var(--motion-base)] ease-[var(--ease-brand)] hover:scale-[1.02] hover:brightness-105"
              >
                Explorar coleção
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/produtos?categoria=planner"
                className="inline-flex items-center rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-all duration-[var(--motion-base)] ease-[var(--ease-brand)] hover:scale-[1.02] hover:border-primary/30"
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
                <div key={item.label} className="rounded-[var(--radius-lg)] border border-border/75 bg-card p-4 shadow-[var(--shadow-xs)]">
                  <p className="font-display text-2xl text-foreground">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <article className="mqm-interactive overflow-hidden rounded-[var(--radius-xl)] border border-border/75 bg-card shadow-[var(--shadow-md)]">
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80"
                alt="Mesa com caderno elegante e caneta"
                className="h-64 w-full object-cover sm:h-72"
                loading="lazy"
              />
              <div className="grid gap-3 p-5 sm:grid-cols-3">
                <div className="rounded-[var(--radius-md)] border border-border/80 bg-background p-3 text-foreground">
                  <BookOpenText className="size-4" />
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">Cadernos</p>
                </div>
                <div className="rounded-[var(--radius-md)] border border-border/80 bg-background p-3 text-foreground">
                  <PenTool className="size-4" />
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">Escrita</p>
                </div>
                <div className="rounded-[var(--radius-md)] border border-border/80 bg-background p-3 text-foreground">
                  <Gift className="size-4" />
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">Presentes</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
