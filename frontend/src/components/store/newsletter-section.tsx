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
    <section className="bg-[#F8F5F2] py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#2E2A28]/10 bg-white px-6 py-12 text-center shadow-[0_16px_34px_-28px_rgba(46,42,40,0.35)] sm:px-10">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D8A7B3]/40 bg-[#F8F5F2]">
              <Mail className="size-5 text-[#B8758E]" aria-hidden="true" />
            </div>
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-[#6C6763]">Clube Mais que Mimo</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-[#2E2A28] sm:text-4xl">
            Receba inspirações e lançamentos exclusivos
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#6C6763]">
            Conteúdos sazonais, novidades de coleção e convites para pré-vendas selecionadas.
          </p>

          {submitted ? (
            <div className="mt-8 flex flex-col items-center gap-3">
              <CheckCircle2 className="size-10 text-[#B8758E]" aria-hidden="true" />
              <p className="font-medium text-[#2E2A28]">Cadastro confirmado com sucesso.</p>
              <p className="text-sm text-[#6C6763]">
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
                className="h-11 flex-1 rounded-full border-[#2E2A28]/15 bg-[#F8F5F2] text-[#2E2A28] placeholder:text-[#6C6763]/70 focus-visible:ring-[#B8758E]"
              />
              <Button
                type="submit"
                loading={loading}
                className="h-11 rounded-full border border-[#2E2A28]/10 bg-[#2E2A28] px-6 text-[#F8F5F2] hover:bg-[#2E2A28]/90 shrink-0"
              >
                Quero receber
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-[#6C6763]">
            Sem spam. Apenas conteúdo que você vai amar. Cancele quando quiser.
          </p>
        </div>
      </div>
    </section>
  );
}
