import { Truck, RefreshCw, ShieldCheck, Heart } from "lucide-react";

const values = [
  {
    icon: Truck,
    title: "Entrega com cuidado",
    description: "Embalagens especiais para os seus produtos chegarem perfeitos.",
  },
  {
    icon: RefreshCw,
    title: "Troca fácil",
    description: "Não ficou perfeito? Trocamos sem burocracia.",
  },
  {
    icon: ShieldCheck,
    title: "Compra segura",
    description: "Seus dados protegidos com a mais alta criptografia.",
  },
  {
    icon: Heart,
    title: "Feito com afeto",
    description: "Cada produto é escolhido com amor e curadoria especial.",
  },
];

export function BrandValues() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--mqm-rose-100)]">
                <value.icon className="size-5 text-[var(--mqm-rose-500)]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{value.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
