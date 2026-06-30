import { HeartHandshake, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";

const values = [
  {
    icon: PackageCheck,
    title: "Envio cuidadoso",
    description: "Embalagem boutique e proteção reforçada para cada pedido.",
  },
  {
    icon: HeartHandshake,
    title: "Atendimento humano",
    description: "Suporte próximo e gentil do início da compra à entrega.",
  },
  {
    icon: ShieldCheck,
    title: "Pagamento protegido",
    description: "Segurança e privacidade em todas as etapas do checkout.",
  },
  {
    icon: Sparkles,
    title: "Curadoria autoral",
    description: "Seleção pensada para um estilo de vida elegante e afetivo.",
  },
];

export function BrandValues() {
  return (
    <section className="bg-[#F8F5F2] py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6C6763]">Experiência</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-[#2E2A28] sm:text-4xl">
            A delicadeza está em cada etapa
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-3xl border border-[#2E2A28]/10 bg-white p-6 text-center shadow-[0_10px_22px_-20px_rgba(46,42,40,0.35)] transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D8A7B3]/45 bg-[#F8F5F2]">
                <value.icon className="size-5 text-[#B8758E]" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-2xl text-[#2E2A28]">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6C6763]">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
