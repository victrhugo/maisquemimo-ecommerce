import Link from "next/link";
import Image from "next/image";

const storeJourney = [
  {
    title: "Logo na entrada",
    description:
      "Capas em tecido, papéis de gramatura alta e cores suaves em uma mesa que convida ao toque.",
    image: "/images/category-1.svg",
    links: [
      { href: "/produtos?categoria=cadernos", label: "Cadernos" },
      { href: "/produtos?categoria=planner", label: "Planners" },
    ],
  },
  {
    title: "No centro da loja",
    description:
      "Canetas, fitas e papéis especiais organizados para quem gosta de escrever com presença.",
    image: "/images/category-2.svg",
    links: [
      { href: "/produtos?categoria=canetas", label: "Canetas e marcadores" },
      { href: "/produtos?categoria=adesivos", label: "Adesivos" },
    ],
  },
  {
    title: "Antes de sair",
    description:
      "Embalagens e conjuntos para presentear com intenção, como quem escreve um bilhete à mão.",
    image: "/images/category-3.svg",
    links: [
      { href: "/produtos?categoria=presentes", label: "Presentes" },
      { href: "/produtos?categoria=kits", label: "Kits" },
    ],
  },
];

export function FeaturedCategories() {
  return (
    <section className="mqm-section pt-10 sm:pt-14">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mqm-eyebrow">Percurso</p>
          <h2 className="mqm-title mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Como entrar em uma pequena loja de bairro,
            <br className="hidden sm:block" />
            onde cada mesa conta uma história.
          </h2>
          <p className="mqm-copy mx-auto mt-5 max-w-2xl text-base">
            Da escrita ao presente: um caminho calmo, feito de texturas, luz natural e escolhas com intenção.
          </p>
        </div>

        <div className="space-y-20 lg:space-y-24">
          {storeJourney.map((step, index) => (
            <article key={step.title} className="mqm-reveal grid items-center gap-9 lg:grid-cols-12 lg:gap-12">
              <div className={`lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative overflow-hidden rounded-[var(--radius-xl)]">
                  <Image
                    src={step.image}
                    alt={`Placeholder elegante da seção ${step.title}`}
                    width={1400}
                    height={900}
                    className={`w-full object-cover ${index === 1 ? "h-[26rem] sm:h-[34rem]" : "h-[22rem] sm:h-[29rem]"}`}
                  />
                  {index !== 1 && (
                    <div className="mqm-caption-chip absolute bottom-4 right-4 px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Imagem temporária</p>
                      <p className="text-sm text-foreground">A fotografia oficial será aplicada depois.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{step.title}</p>
                <p className="mqm-title mt-3 text-3xl leading-[1.22] sm:text-4xl">
                  {step.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  {step.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center text-xs uppercase tracking-[0.14em] text-primary transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
