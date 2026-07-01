import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoSlot } from "@/components/store/photo-slot";

const narrativeMoments = [
  {
    step: "Chegar",
    title: "A loja abre devagar, como quem prepara a mesa antes de escrever.",
    copy: "A experiencia da Mais que Mimo comeca no tempo certo: acolhe, organiza e deixa cada detalhe respirar.",
    href: "/produtos",
    cta: "Entrar na colecao",
  },
  {
    step: "Tocar",
    title: "Papel, capa, fita e textura viram escolha afetiva, nao pressa.",
    copy: "Cada area foi pensada para parecer curadoria de papelaria fisica: proximidade humana, ordem bonita e escolhas com intencao.",
    href: "/produtos?categoria=cadernos",
    cta: "Ver cadernos",
  },
  {
    step: "Presentear",
    title: "Presentes entram na historia como gesto, nao como vitrine.",
    copy: "A navegacao convida para compor kits, combinar cores e montar um carinho pronto para entregar.",
    href: "/produtos?categoria=presentes",
    cta: "Explorar presentes",
  },
  {
    step: "Voltar",
    title: "Organizacao bonita para a rotina inteira, e nao so para um clique.",
    copy: "A Home termina com continuidade: voce sai com caminhos claros para a proxima visita, sem ruido visual de template.",
    href: "/produtos?categoria=planner",
    cta: "Ver planners",
  },
];

export function HomeStory() {
  return (
    <section className="relative pb-24 pt-10 sm:pb-28 sm:pt-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mqm-reveal flex flex-col items-center text-center">
            <Image
              src="/images.png"
              alt="Logo Mais que Mimo"
              width={198}
              height={198}
              priority
              className="h-40 w-40 rounded-full object-cover shadow-[var(--shadow-md)] sm:h-48 sm:w-48"
            />
            <p className="mqm-eyebrow mt-8">Mais que Mimo</p>
            <h1 className="mqm-title mt-4 max-w-4xl text-[2.25rem] font-semibold leading-[1.08] sm:text-[3rem] lg:text-[4rem]">
              Uma Home em fluxo continuo,
              <br className="hidden sm:block" />
              como passeio por uma papelaria feita a mao.
            </h1>
            <p className="mqm-copy mt-6 max-w-2xl text-base sm:text-lg">
              Sem blocos genericos de e-commerce. Sem layout de landing page.
              Apenas uma narrativa visual que combina carinho, delicadeza e organizacao bonita.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="brand">
                <Link href="/produtos">Comecar pela colecao</Link>
              </Button>
              <Button asChild size="lg" variant="soft">
                <Link href="/produtos?categoria=presentes">Ver ideias de presente</Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 sm:mt-20">
            <PhotoSlot className="aspect-[16/7] min-h-[16rem]" label="Fotografia principal da loja" />
          </div>

          <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-24">
            {narrativeMoments.map((moment, index) => (
              <article key={moment.step} className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
                <div className={`md:col-span-6 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <p className="mqm-eyebrow">{moment.step}</p>
                  <h2 className="mqm-title mt-3 text-3xl font-semibold leading-[1.16] sm:text-[2.45rem]">
                    {moment.title}
                  </h2>
                  <p className="mqm-copy mt-5 max-w-xl text-base">{moment.copy}</p>
                  <Link
                    href={moment.href}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground"
                  >
                    {moment.cta}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className={`md:col-span-6 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <PhotoSlot
                    className="aspect-[5/4] min-h-[18rem]"
                    label={`Fotografia da etapa ${moment.step.toLowerCase()}`}
                  />
                </div>
              </article>
            ))}
          </div>

          <div className="mqm-paper-card mt-16 rounded-[var(--radius-xl)] px-6 py-8 sm:mt-20 sm:px-10 sm:py-10">
            <div className="grid items-end gap-6 md:grid-cols-[1.3fr_0.7fr]">
              <div>
                <p className="mqm-eyebrow">Continuar</p>
                <h3 className="mqm-title mt-2 text-3xl font-semibold leading-tight">
                  Escolha seu proximo gesto de carinho.
                </h3>
                <p className="mqm-copy mt-3 max-w-2xl text-base">
                  A jornada segue com caminhos simples: cadernos, planners, escrita e presentes.
                  Cada clique preserva o mesmo tom da marca.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button asChild variant="brand">
                  <Link href="/produtos">Ir para produtos</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/produtos?categoria=canetas">Itens de escrita</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
