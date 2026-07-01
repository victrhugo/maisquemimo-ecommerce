import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="mqm-section relative overflow-hidden pb-8 pt-16 sm:pb-10 sm:pt-20 lg:pt-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mqm-reveal grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="order-2 lg:order-1 lg:col-span-5 lg:pb-8">
            <p className="mqm-eyebrow">Mais que Mimo</p>
            <h1 className="mqm-title mt-5 text-[2.4rem] font-semibold leading-[1.04] sm:text-5xl lg:text-[4.15rem]">
              Papelaria com alma
              <br />
              de ateliê,
              <br />
              feita para acolher.
            </h1>
            <p className="mqm-copy mt-7 max-w-lg text-base sm:text-lg">
              Organização bonita, toque artesanal e pequenos rituais de escrita
              para dias mais leves.
            </p>

            <Link
              href="/produtos"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-[var(--mqm-blush-100)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-[var(--shadow-xs)] transition-colors duration-[var(--motion-fast)] hover:text-foreground"
            >
              Explorar coleção
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <article className="relative overflow-hidden rounded-[var(--radius-xl)]">
              <Image
                src="/images/placeholder-hero.svg"
                alt="Placeholder elegante para imagem principal da papelaria"
                width={1200}
                height={820}
                className="h-[30rem] w-full object-cover sm:h-[38rem]"
                priority
              />

              <div className="mqm-caption-chip absolute bottom-5 left-5 hidden max-w-[15rem] p-4 sm:block">
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Imagem temporária</p>
                <p className="mqm-copy mt-1 text-sm">Foto final será inserida com a curadoria visual da marca.</p>
              </div>
            </article>

            <div className="-mt-10 ml-auto grid w-[92%] grid-cols-[1.05fr_0.95fr] items-end gap-4 sm:-mt-14">
              <article className="overflow-hidden rounded-[var(--radius-lg)]">
                <Image
                  src="/images/hero-detail.svg"
                  alt="Placeholder elegante para detalhe da hero"
                  width={720}
                  height={900}
                  className="h-44 w-full object-cover sm:h-56"
                />
              </article>
              <div className="mqm-paper-card flex items-end rounded-[var(--radius-lg)] px-5 py-6 sm:px-6">
                <p className="font-display text-[1.65rem] leading-snug text-foreground sm:text-[1.9rem]">
                  Cada detalhe
                  <br />
                  parece escolhido à mão.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
