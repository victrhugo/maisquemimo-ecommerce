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
    <section className="mqm-section">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mqm-eyebrow">Experiência</p>
          <h2 className="mqm-title mt-3 text-3xl font-medium sm:text-4xl">
            A delicadeza está em cada etapa
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="mqm-interactive rounded-[var(--radius-xl)] border border-border/80 bg-card p-6 text-center shadow-[var(--shadow-sm)]"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] border border-border bg-[var(--mqm-paper-100)]">
                <value.icon className="size-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="mqm-title mt-4 text-2xl">{value.title}</h3>
              <p className="mqm-copy mt-2 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
