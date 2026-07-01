import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Mail, HandHeart, Camera } from "lucide-react";

const footerLinks = {
  jornada: [
    { href: "/produtos", label: "Explorar coleção" },
    { href: "/produtos?categoria=presentes", label: "Presentes com afeto" },
    { href: "/produtos?categoria=planner", label: "Organização diária" },
  ],
  casa: [
    { href: "/paginas/sobre", label: "Sobre a Mais que Mimo" },
    { href: "/paginas/faq", label: "Perguntas frequentes" },
    { href: "/paginas/politica-privacidade", label: "Privacidade" },
  ],
};

export function StoreFooter() {
  return (
    <footer className="border-t border-border/55 bg-[var(--mqm-paper-100)]/70">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="space-y-7 lg:col-span-5">
            <Link href="/" className="flex flex-col leading-none">
              <span className="font-display text-xl font-medium text-primary">
                mais que mimo
              </span>
              <span className="mt-0.5 text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
                escrita . afeto . presença
              </span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              A nossa loja existe para transformar detalhes cotidianos em momentos lembrados.
              Cada coleção nasce da mesma intenção: criar beleza útil para uma rotina mais gentil.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/_maisquemimo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary/35 hover:text-primary"
              >
                <Camera className="size-4" />
              </a>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary/35 hover:text-primary"
              >
                <MessageCircle className="size-4" />
              </a>
              <a
                href="mailto:oi@maisquemimo.com.br"
                aria-label="E-mail"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary/35 hover:text-primary"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">Jornada</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.jornada.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">A casa</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.casa.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <article className="relative overflow-hidden rounded-[var(--radius-xl)] lg:col-span-2">
            <Image
              src="https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=900&q=80"
              alt="Pacote de presente com fita em luz natural"
              width={700}
              height={880}
              className="h-48 w-full object-cover sm:h-64"
            />
            <div className="mqm-caption-chip absolute bottom-3 left-3 px-3 py-2">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Presente</p>
            </div>
          </article>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Mais que Mimo. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Feito com <HandHeart className="size-3 text-primary" /> para quem ama papelaria
          </p>
        </div>
      </div>
    </footer>
  );
}
