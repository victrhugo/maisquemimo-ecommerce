import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Mail, HandHeart, Camera } from "lucide-react";
import { PhotoSlot } from "@/components/store/photo-slot";

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
    <footer className="bg-[color-mix(in_srgb,var(--mqm-warm-200)_48%,white)]">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="space-y-7 lg:col-span-5">
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
            <PhotoSlot
              className="h-48 sm:h-64"
              label="Fotografia real da loja sera inserida aqui"
            />
          </article>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 pt-6 text-center sm:flex-row sm:text-left">
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
