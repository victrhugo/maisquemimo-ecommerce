import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="mqm-section relative overflow-hidden pb-8 pt-20 sm:pb-10 sm:pt-24 lg:pt-30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mqm-reveal grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="order-2 lg:order-1 lg:col-span-5 lg:pb-8">
            <p className="mqm-eyebrow">Mais que Mimo</p>
            <h1 className="mqm-title mt-5 text-[2.4rem] font-medium leading-[1.07] sm:text-5xl lg:text-[4.25rem]">
              Um ateliê digital
              <br />
              de carinho em forma
              <br />
              de papelaria.
            </h1>
            <p className="mqm-copy mt-7 max-w-lg text-base sm:text-lg">
              Aqui a organização é bonita, o presente é pessoal
              e a escrita volta a ter tempo.
            </p>

            <Link
              href="/produtos"
              className="mt-9 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-primary transition-colors duration-[var(--motion-fast)] hover:text-foreground"
            >
              Explorar coleção
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <article className="relative overflow-hidden rounded-[var(--radius-xl)]">
              <Image
                src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1800&q=80"
                alt="Mesa de madeira clara com planner aberto, canetas e flores em luz natural"
                width={1200}
                height={820}
                className="h-[30rem] w-full object-cover sm:h-[38rem]"
                priority
              />

              <div className="mqm-caption-chip absolute bottom-5 left-5 hidden max-w-[15rem] p-4 sm:block">
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Rotina com afeto</p>
                <p className="mqm-copy mt-1 text-sm">Planner aberto, caneta à mão e luz natural no fim da tarde.</p>
              </div>
            </article>

            <div className="-mt-10 ml-auto grid w-[92%] grid-cols-[1.05fr_0.95fr] items-end gap-4 sm:-mt-14">
              <article className="overflow-hidden rounded-[var(--radius-lg)]">
                <Image
                  src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80"
                  alt="Caneta apoiada sobre papel texturizado"
                  width={720}
                  height={900}
                  className="h-44 w-full object-cover sm:h-56"
                />
              </article>
              <div className="mqm-surface flex items-end rounded-[var(--radius-lg)] bg-[var(--mqm-paper-50)]/95 px-5 py-6 sm:px-6">
                <p className="font-display text-xl leading-snug text-foreground sm:text-[1.65rem]">
                  Tudo parece
                  <br />
                  escolhido à mão.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
