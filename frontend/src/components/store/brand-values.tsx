import Image from "next/image";
import { Heart } from "lucide-react";

export function BrandValues() {
  return (
    <section className="mqm-section py-24 sm:py-30 lg:py-36">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mqm-reveal grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <article className="relative overflow-hidden rounded-[var(--radius-xl)]">
              <Image
                src="/images/manifesto-main.svg"
                alt="Placeholder elegante para seção manifesto"
                width={1600}
                height={980}
                className="h-[23rem] w-full object-cover sm:h-[30rem]"
              />
              <div className="mqm-caption-chip absolute bottom-4 left-4 max-w-[13rem] px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Imagem temporária</p>
                <p className="text-sm text-foreground">Composição final será inserida pela marca.</p>
              </div>
            </article>
          </div>

          <div className="lg:col-span-5">
            <p className="mqm-eyebrow">Manifesto</p>
            <h2 className="mqm-title mt-3 text-4xl font-semibold leading-[1.12] sm:text-[2.9rem]">
              Organização também pode ser afeto.
            </h2>
            <p className="mqm-copy mt-6 max-w-md text-base leading-relaxed">
              Acreditamos em uma rotina mais gentil: papéis que acolhem ideias,
              escrita que desacelera e presentes que dizem o que às vezes não cabe em voz alta.
            </p>
            <p className="mqm-copy mt-4 max-w-md text-base leading-relaxed">
              Mais do que objetos, reunimos ferramentas para criar tempo de qualidade com você mesma e com quem você ama.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 text-sm text-foreground">
              <Heart className="size-4 text-primary" aria-hidden="true" />
              Feito para quem transforma detalhes em memória.
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-[1.25fr_1fr]">
          <article className="overflow-hidden rounded-[var(--radius-lg)]">
            <Image
              src="/images/manifesto-gift.svg"
              alt="Placeholder elegante para imagem de presente"
              width={1200}
              height={820}
              className="h-60 w-full object-cover sm:h-64"
            />
          </article>
          <article className="overflow-hidden rounded-[var(--radius-lg)] sm:translate-y-8">
            <Image
              src="/images/manifesto-desk.svg"
              alt="Placeholder elegante para imagem de mesa de escrita"
              width={1200}
              height={820}
              className="h-52 w-full object-cover sm:h-56"
            />
          </article>
        </div>
      </div>
    </section>
  );
}
