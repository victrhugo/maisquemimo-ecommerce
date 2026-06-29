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
    <section className="bg-gradient-to-br from-[var(--mqm-rose-500)] to-[var(--mqm-mauve-600)] py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
              <Mail className="size-5 text-white" aria-hidden="true" />
            </div>
          </div>

          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Fique por dentro das novidades
          </h2>
          <p className="mt-3 text-sm text-white/80 leading-relaxed">
            Receba em primeira mão lançamentos, promoções exclusivas e conteúdo especial
            sobre papelaria afetiva.
          </p>

          {submitted ? (
            <div className="mt-8 flex flex-col items-center gap-3">
              <CheckCircle2 className="size-10 text-white" aria-hidden="true" />
              <p className="font-medium text-white">
                Que ótimo! Você está na lista. 🎉
              </p>
              <p className="text-sm text-white/70">
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
                className="flex-1 border-white/30 bg-white/20 text-white placeholder:text-white/60 focus-visible:ring-white"
              />
              <Button
                type="submit"
                loading={loading}
                className="bg-white text-[var(--mqm-rose-600)] hover:bg-white/90 font-semibold shrink-0"
              >
                Quero receber
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-white/50">
            Sem spam. Apenas conteúdo que você vai amar. Cancele quando quiser.
          </p>
        </div>
      </div>
    </section>
  );
}
