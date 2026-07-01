"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // TODO: integrar com API de newsletter
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <section className="mqm-section pb-24 pt-14 sm:pb-28 sm:pt-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mqm-reveal mx-auto max-w-3xl px-2 text-center sm:px-6">
          <div className="mb-5 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--mqm-blush-100)] shadow-[var(--shadow-xs)]">
              <Mail className="size-5 text-primary" aria-hidden="true" />
            </div>
          </div>

          <p className="mqm-eyebrow">Cartas da Mais que Mimo</p>
          <h2 className="mqm-title mt-3 text-3xl font-medium sm:text-4xl">
            Um e-mail calmo, de tempos em tempos.
          </h2>
          <p className="mqm-copy mx-auto mt-4 max-w-xl text-base">
            Enviamos referências de organização, escrita, presentes e novidades da casa sem pressa,
            sempre com a mesma linguagem da loja.
          </p>

          {submitted ? (
            <div className="mt-8 flex flex-col items-center gap-3 rounded-[var(--radius-lg)] bg-[color-mix(in_srgb,var(--mqm-warm-200)_50%,white)] px-6 py-7 shadow-[var(--shadow-xs)]">
              <CheckCircle2 className="size-10 text-primary" aria-hidden="true" />
              <p className="font-medium text-foreground">Seu e-mail foi recebido com carinho.</p>
              <p className="text-sm text-muted-foreground">
                Quando houver novidades que façam sentido, elas chegam até você.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mqm-paper-card mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-[var(--radius-xl)] p-3 sm:flex-row sm:items-center"
              aria-label="Formulário de newsletter"
            >
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="E-mail para newsletter"
                className="h-11 flex-1 border-transparent bg-background"
              />
              <Button
                type="submit"
                loading={loading}
                className="h-11 shrink-0 rounded-full px-7"
              >
                Quero receber
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            Sem excessos. Você pode sair quando quiser.
          </p>
        </div>
      </div>
    </section>
  );
}
