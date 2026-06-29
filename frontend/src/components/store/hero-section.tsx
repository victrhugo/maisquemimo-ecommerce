import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--mqm-cream-50)] via-[var(--mqm-rose-50)] to-[var(--mqm-mauve-50)]" />
        {/* Círculos decorativos */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[var(--mqm-rose-100)] opacity-40 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-[var(--mqm-mauve-100)] opacity-30 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #C94F72 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Pill badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--mqm-rose-200)] bg-[var(--mqm-rose-50)] px-4 py-1.5">
            <Sparkles className="size-3.5 text-[var(--mqm-rose-500)]" />
            <span className="text-xs font-medium text-[var(--mqm-rose-600)]">
              Novidades chegando toda semana
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Papelaria que{" "}
            <span className="relative">
              <span className="relative z-10 text-[var(--mqm-rose-500)]">transforma</span>
              <span
                className="absolute -bottom-1 left-0 right-0 h-3 -z-10 rounded-sm opacity-30"
                style={{ background: "var(--mqm-rose-200)" }}
              />
            </span>{" "}
            o seu dia a dia
          </h1>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Cadernos, adesivos, planner e muito mais — tudo com o afeto e a curadoria
            que só o Mais que Mimo tem.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="brand" asChild>
              <Link href="/produtos">
                Explorar produtos
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/produtos?categoria=novidades">Ver novidades</Link>
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
            <div className="text-center">
              <p className="font-display text-2xl font-semibold text-foreground">+2.000</p>
              <p className="text-xs text-muted-foreground">clientes felizes</p>
            </div>
            <div className="hidden h-8 w-px bg-border sm:block" />
            <div className="text-center">
              <p className="font-display text-2xl font-semibold text-foreground">98%</p>
              <p className="text-xs text-muted-foreground">de satisfação</p>
            </div>
            <div className="hidden h-8 w-px bg-border sm:block" />
            <div className="text-center">
              <p className="font-display text-2xl font-semibold text-foreground">+500</p>
              <p className="text-xs text-muted-foreground">produtos disponíveis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
