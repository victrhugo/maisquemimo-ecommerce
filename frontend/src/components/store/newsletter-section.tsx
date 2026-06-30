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
    <section className="mqm-section">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-[var(--radius-xl)] border border-border/80 bg-card px-6 py-12 text-center shadow-[var(--shadow-md)] sm:px-10">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] border border-border bg-[var(--mqm-paper-100)]">
              <Mail className="size-5 text-primary" aria-hidden="true" />
            </div>
          </div>

          <p className="mqm-eyebrow">Clube Mais que Mimo</p>
          <h2 className="mqm-title mt-3 text-3xl font-medium sm:text-4xl">
            Receba inspirações e lançamentos exclusivos
          </h2>
          <p className="mqm-copy mx-auto mt-4 max-w-xl text-base">
            Conteúdos sazonais, novidades de coleção e convites para pré-vendas selecionadas.
          </p>

          {submitted ? (
            <div className="mt-8 flex flex-col items-center gap-3">
              <CheckCircle2 className="size-10 text-primary" aria-hidden="true" />
              <p className="font-medium text-foreground">Cadastro confirmado com sucesso.</p>
              <p className="text-sm text-muted-foreground">
                Em breve você receberá nossos conteúdos mais especiais.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              aria-label="Formulário de newsletter"
            >
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="E-mail para newsletter"
                className="h-11 flex-1"
              />
              <Button
                type="submit"
                loading={loading}
                className="h-11 shrink-0 px-6"
              >
                Quero receber
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            Sem spam. Apenas conteúdo que você vai amar. Cancele quando quiser.
          </p>
        </div>
      </div>
    </section>
  );
}
