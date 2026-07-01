"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/lib/utils";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const [done, setDone] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const shipping = subtotal >= 25000 || items.length === 0 ? 0 : 1900;
  const total = subtotal + shipping;

  function handleFinishOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (items.length === 0) return;
    setOrderNumber(`MQM-${new Date().getTime().toString().slice(-6)}`);
    clearCart();
    setDone(true);
  }

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 border-b border-[color-mix(in_srgb,var(--border)_55%,transparent)] pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[var(--mqm-olive-500)]">Checkout</p>
          <h1 className="mt-2 font-display text-[2rem] leading-none text-[var(--mqm-olive-800)] sm:text-[2.4rem]">
            Finalizar compra
          </h1>
        </header>

        {done ? (
          <section className="rounded-[1.2rem] border border-[color-mix(in_srgb,var(--mqm-olive-300)_45%,transparent)] bg-[var(--mqm-olive-50)] px-6 py-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--mqm-olive-600)]">Pedido confirmado</p>
            <h2 className="mt-2 font-display text-3xl text-[var(--mqm-olive-800)]">Obrigada pela compra</h2>
            <p className="mt-3 text-sm text-[var(--mqm-olive-700)]/85">Numero do pedido: {orderNumber || "MQM-000000"}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/conta"
                className="inline-flex rounded-full bg-[var(--mqm-olive-700)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white"
              >
                Ver meus pedidos
              </Link>
              <Link
                href="/produtos"
                className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mqm-olive-600)] hover:text-[var(--mqm-blush-700)]"
              >
                Voltar para loja
              </Link>
            </div>
          </section>
        ) : (
          <div className="grid gap-8 lg:grid-cols-12">
            <form onSubmit={handleFinishOrder} className="space-y-5 lg:col-span-8">
              <section className="rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[var(--mqm-warm-50)] p-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mqm-olive-600)]">Dados pessoais</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input required placeholder="Nome completo" className="h-11 rounded-full border border-[color-mix(in_srgb,var(--border)_80%,transparent)] bg-white/70 px-4 text-sm outline-none focus:border-[var(--mqm-blush-300)]" />
                  <input required type="email" placeholder="E-mail" className="h-11 rounded-full border border-[color-mix(in_srgb,var(--border)_80%,transparent)] bg-white/70 px-4 text-sm outline-none focus:border-[var(--mqm-blush-300)]" />
                  <input required placeholder="CPF" className="h-11 rounded-full border border-[color-mix(in_srgb,var(--border)_80%,transparent)] bg-white/70 px-4 text-sm outline-none focus:border-[var(--mqm-blush-300)]" />
                  <input required placeholder="Telefone" className="h-11 rounded-full border border-[color-mix(in_srgb,var(--border)_80%,transparent)] bg-white/70 px-4 text-sm outline-none focus:border-[var(--mqm-blush-300)]" />
                </div>
              </section>

              <section className="rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[var(--mqm-warm-50)] p-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mqm-olive-600)]">Entrega</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-6">
                  <input required placeholder="CEP" className="h-11 rounded-full border border-[color-mix(in_srgb,var(--border)_80%,transparent)] bg-white/70 px-4 text-sm outline-none focus:border-[var(--mqm-blush-300)] sm:col-span-2" />
                  <input required placeholder="Rua" className="h-11 rounded-full border border-[color-mix(in_srgb,var(--border)_80%,transparent)] bg-white/70 px-4 text-sm outline-none focus:border-[var(--mqm-blush-300)] sm:col-span-4" />
                  <input required placeholder="Numero" className="h-11 rounded-full border border-[color-mix(in_srgb,var(--border)_80%,transparent)] bg-white/70 px-4 text-sm outline-none focus:border-[var(--mqm-blush-300)] sm:col-span-2" />
                  <input placeholder="Complemento" className="h-11 rounded-full border border-[color-mix(in_srgb,var(--border)_80%,transparent)] bg-white/70 px-4 text-sm outline-none focus:border-[var(--mqm-blush-300)] sm:col-span-4" />
                  <input required placeholder="Cidade" className="h-11 rounded-full border border-[color-mix(in_srgb,var(--border)_80%,transparent)] bg-white/70 px-4 text-sm outline-none focus:border-[var(--mqm-blush-300)] sm:col-span-4" />
                  <input required placeholder="UF" className="h-11 rounded-full border border-[color-mix(in_srgb,var(--border)_80%,transparent)] bg-white/70 px-4 text-sm uppercase outline-none focus:border-[var(--mqm-blush-300)] sm:col-span-2" />
                </div>
              </section>

              <section className="rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[var(--mqm-warm-50)] p-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mqm-olive-600)]">Pagamento</h2>
                <div className="mt-4 space-y-2 text-sm text-[var(--mqm-olive-800)]">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" defaultChecked />
                    Cartao de credito
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" />
                    Pix
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" />
                    Boleto
                  </label>
                </div>
              </section>

              <button
                type="submit"
                disabled={items.length === 0}
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--mqm-olive-700)] px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--mqm-olive-800)] disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
              >
                Confirmar pedido
              </button>
            </form>

            <aside className="rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[var(--mqm-warm-50)] p-5 lg:col-span-4 lg:self-start">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mqm-olive-600)]">Resumo</h2>
              <p className="mt-3 text-xs text-muted-foreground">{items.length} itens</p>
              <div className="mt-4 space-y-2 text-sm text-[var(--mqm-olive-800)]">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal / 100)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Frete</span>
                  <span>{shipping === 0 ? "Gratis" : formatCurrency(shipping / 100)}</span>
                </div>
              </div>
              <div className="mt-4 border-t border-[color-mix(in_srgb,var(--border)_70%,transparent)] pt-4 text-base font-semibold text-[var(--mqm-olive-800)]">
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span>{formatCurrency(total / 100)}</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
