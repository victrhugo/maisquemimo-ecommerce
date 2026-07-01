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
                src="https://images.unsplash.com/photo-1463320898484-cdee8141c787?auto=format&fit=crop&w=1800&q=80"
                alt="Mesa com papéis, flores e fitas de presente organizadas"
                width={1600}
                height={980}
                className="h-[23rem] w-full object-cover sm:h-[30rem]"
              />
              <div className="mqm-caption-chip absolute bottom-4 left-4 max-w-[13rem] px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Ateliê</p>
                <p className="text-sm text-foreground">Texturas reais e composição manual.</p>
              </div>
            </article>
          </div>

          <div className="lg:col-span-5">
            <p className="mqm-eyebrow">Manifesto</p>
            <h2 className="mqm-title mt-3 text-4xl font-medium leading-[1.12] sm:text-[2.9rem]">
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
              src="https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&w=1400&q=80"
              alt="Embrulho de presente com papel pardo e laço"
              width={1200}
              height={820}
              className="h-60 w-full object-cover sm:h-64"
            />
          </article>
          <article className="overflow-hidden rounded-[var(--radius-lg)] sm:translate-y-8">
            <Image
              src="https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1400&q=80"
              alt="Mesa clara com cadernos e canetas alinhados"
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
