import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Mail, Camera } from "lucide-react";

const footerLinks = {
  loja: [
    { href: "/produtos", label: "Todos os produtos" },
    { href: "/produtos?categoria=cadernos", label: "Cadernos" },
    { href: "/produtos?categoria=planner", label: "Planners" },
    { href: "/produtos?categoria=presentes", label: "Presentes" },
  ],
  ajuda: [
    { href: "/paginas/sobre", label: "Sobre" },
    { href: "/paginas/faq", label: "Perguntas frequentes" },
    { href: "/paginas/politica-privacidade", label: "Privacidade" },
  ],
};

export function StoreFooter() {
  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--border)_55%,transparent)] bg-[color-mix(in_srgb,var(--mqm-warm-200)_40%,white)]">
      <div className="container mx-auto px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <Link href="/" className="flex items-center gap-3 leading-none">
              <Image
                src="/images.png"
                alt="Logo Mais que Mimo"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover shadow-[var(--shadow-sm)]"
              />
              <span className="font-display text-2xl font-semibold text-primary">
                mais que mimo
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Papelaria artesanal brasileira para organizar a rotina com leveza.
              Produtos, colecoes e presentes em uma navegacao simples.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/_maisquemimo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--mqm-warm-50)] text-muted-foreground shadow-[var(--shadow-xs)] transition-colors hover:text-primary"
              >
                <Camera className="size-4" />
              </a>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--mqm-warm-50)] text-muted-foreground shadow-[var(--shadow-xs)] transition-colors hover:text-primary"
              >
                <MessageCircle className="size-4" />
              </a>
              <a
                href="mailto:oi@maisquemimo.com.br"
                aria-label="E-mail"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--mqm-warm-50)] text-muted-foreground shadow-[var(--shadow-xs)] transition-colors hover:text-primary"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">Loja</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.loja.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">Ajuda</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.ajuda.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1" />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[color-mix(in_srgb,var(--border)_55%,transparent)] pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Mais que Mimo. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground">Pagamento seguro e envio para todo o Brasil.</p>
        </div>
      </div>
    </footer>
  );
}
