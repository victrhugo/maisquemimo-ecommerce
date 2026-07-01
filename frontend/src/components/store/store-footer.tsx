"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MessageCircle, Mail, Camera, ArrowRight, Check } from "lucide-react";

const footerLinks = {
  loja: [
    { href: "/produtos", label: "Todos os produtos" },
    { href: "/produtos?categoria=cadernos", label: "Cadernos" },
    { href: "/produtos?categoria=planner", label: "Planners" },
    { href: "/produtos?categoria=presentes", label: "Presentes" },
    { href: "/produtos?categoria=kits", label: "Kits" },
  ],
  ajuda: [
    { href: "/paginas/sobre", label: "Sobre a Marca" },
    { href: "/paginas/faq", label: "Perguntas Frequentes" },
    { href: "/paginas/politica-privacidade", label: "Política de Privacidade" },
  ],
};

export function StoreFooter() {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setEmailInput("");
  }

  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--mqm-olive-200)_35%,transparent)] bg-[color-mix(in_srgb,var(--mqm-warm-200)_20%,white)] select-none">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column - Branding, Description, Newsletter */}
          <div className="space-y-8 lg:col-span-6">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-3.5 leading-none">
                <Image
                  src="/images.png"
                  alt="Logo Mais que Mimo"
                  width={68}
                  height={68}
                  className="h-[52px] w-[52px] rounded-full object-cover border border-[color-mix(in_srgb,var(--border)_45%,transparent)] shadow-[var(--shadow-xs)]"
                />
                <div className="flex flex-col">
                  <span className="font-display text-[1.3rem] font-bold text-[var(--mqm-olive-800)] uppercase tracking-[0.02em]">
                    mais que mimo
                  </span>
                  <span className="font-cursive text-xs text-[var(--mqm-blush-600)] leading-none mt-0.5 font-semibold">
                    papelaria afetiva
                  </span>
                </div>
              </Link>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--mqm-olive-700)] font-sans">
                FEITO À MÃO COM AFETO ♡
              </h4>
              <p className="max-w-md text-xs leading-relaxed text-muted-foreground font-sans">
                A Mais que Mimo produz papelaria artesanal e delicada para inspirar a sua rotina e trazer mais leveza, cor e carinho aos seus dias.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/_maisquemimo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--mqm-warm-50)] text-muted-foreground border border-[color-mix(in_srgb,var(--border)_80%,transparent)] shadow-[var(--shadow-xs)] transition-colors hover:text-[var(--mqm-blush-700)] hover:border-[var(--mqm-blush-300)]"
              >
                <Camera className="size-4" />
              </a>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--mqm-warm-50)] text-muted-foreground border border-[color-mix(in_srgb,var(--border)_80%,transparent)] shadow-[var(--shadow-xs)] transition-colors hover:text-[var(--mqm-olive-700)] hover:border-[var(--mqm-olive-300)]"
              >
                <MessageCircle className="size-4" />
              </a>
              <a
                href="mailto:oi@maisquemimo.com.br"
                aria-label="E-mail"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--mqm-warm-50)] text-muted-foreground border border-[color-mix(in_srgb,var(--border)_80%,transparent)] shadow-[var(--shadow-xs)] transition-colors hover:text-[var(--mqm-olive-700)] hover:border-[var(--mqm-olive-300)]"
              >
                <Mail className="size-4" />
              </a>
            </div>

            {/* Integrated Newsletter Form */}
            <div className="space-y-3">
              <h5 className="text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--mqm-olive-800)] font-sans">
                Assine nossas novidades
              </h5>
              
              {subscribed ? (
                <div className="flex max-w-sm items-center gap-2 rounded-full border border-[var(--mqm-olive-200)] bg-[var(--mqm-olive-50)] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--mqm-olive-800)] shadow-[var(--shadow-xs)] font-sans">
                  <Check className="size-3" />
                  E-mail cadastrado com sucesso!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Seu e-mail"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full h-10 rounded-full border border-[color-mix(in_srgb,var(--border)_90%,transparent)] bg-[var(--mqm-warm-50)] pl-4 pr-12 text-xs text-[var(--mqm-olive-900)] outline-none focus:border-[var(--mqm-blush-400)] transition-colors placeholder:text-muted-foreground/45 font-sans"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--mqm-olive-700)] text-white hover:bg-[var(--mqm-olive-800)] transition-colors active:scale-95 cursor-pointer"
                    aria-label="Confirmar inscrição"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column - Navigation Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:pl-8">
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--mqm-olive-800)] font-sans">
                Loja
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.loja.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground transition-colors hover:text-[var(--mqm-blush-700)] font-sans font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--mqm-olive-800)] font-sans">
                Ajuda
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.ajuda.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground transition-colors hover:text-[var(--mqm-blush-700)] font-sans font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--mqm-olive-300)] bg-[var(--mqm-warm-50)] px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--mqm-olive-700)] hover:bg-[var(--mqm-olive-700)] hover:text-white transition-colors font-sans"
                >
                  Fale Conosco
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1" />
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[color-mix(in_srgb,var(--border)_55%,transparent)] pt-8 text-center sm:flex-row sm:text-left select-none">
          <p className="text-[10px] font-semibold text-muted-foreground/80 font-sans tracking-wide">
            © {new Date().getFullYear()} Mais que Mimo. Todos os direitos reservados.
          </p>
          <p className="text-[10px] font-semibold text-muted-foreground/80 font-sans tracking-wide">
            Feito com amor no Brasil • Pagamento seguro e envios para todo o país.
          </p>
        </div>
      </div>
    </footer>
  );
}
