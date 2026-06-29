import Link from "next/link";
import { Instagram, MessageCircle, Mail, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  loja: [
    { href: "/produtos", label: "Todos os produtos" },
    { href: "/produtos?categoria=novidades", label: "Novidades" },
    { href: "/produtos?categoria=promocoes", label: "Promoções" },
    { href: "/produtos?destaque=mais-vendidos", label: "Mais vendidos" },
  ],
  ajuda: [
    { href: "/paginas/como-comprar", label: "Como comprar" },
    { href: "/paginas/frete-entrega", label: "Frete e entrega" },
    { href: "/paginas/trocas-devolucoes", label: "Trocas e devoluções" },
    { href: "/paginas/faq", label: "Perguntas frequentes" },
  ],
  institucional: [
    { href: "/paginas/sobre", label: "Sobre nós" },
    { href: "/paginas/politica-privacidade", label: "Política de privacidade" },
    { href: "/paginas/termos-de-uso", label: "Termos de uso" },
  ],
};

export function StoreFooter() {
  return (
    <footer className="border-t border-border bg-[var(--mqm-cream-100)]">
      <div className="container mx-auto px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex flex-col leading-none">
              <span className="font-display text-xl font-semibold text-[var(--mqm-rose-600)]">
                mais que mimo
              </span>
              <span className="mt-0.5 text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
                papelaria afetiva
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Produtos que transformam o cotidiano em arte, com carinho e afeto em cada detalhe.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-[var(--mqm-rose-300)] hover:text-[var(--mqm-rose-500)]"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-emerald-300 hover:text-emerald-600"
              >
                <MessageCircle className="size-4" />
              </a>
              <a
                href="mailto:oi@maisquemimo.com.br"
                aria-label="E-mail"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-[var(--mqm-rose-300)] hover:text-[var(--mqm-rose-500)]"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          {/* Loja */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Loja
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.loja.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ajuda */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Ajuda
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.ajuda.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Institucional
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.institucional.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Mais que Mimo. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Feito com <Heart className="size-3 fill-[var(--mqm-rose-400)] text-[var(--mqm-rose-400)]" /> para quem ama papelaria
          </p>
        </div>
      </div>
    </footer>
  );
}
