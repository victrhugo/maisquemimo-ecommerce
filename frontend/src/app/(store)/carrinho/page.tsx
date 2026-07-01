"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal);
  const itemCount = useCartStore((state) => state.itemCount);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const shipping = subtotal >= 25000 || itemCount === 0 ? 0 : 1900;
  const total = subtotal + shipping;

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-end justify-between gap-4 border-b border-[color-mix(in_srgb,var(--border)_55%,transparent)] pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[var(--mqm-olive-500)]">Carrinho</p>
            <h1 className="mt-2 font-display text-[2rem] leading-none text-[var(--mqm-olive-800)] sm:text-[2.4rem]">Seus produtos</h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground hover:text-[var(--mqm-blush-700)]"
            >
              Limpar carrinho
            </button>
          )}
        </header>

        {items.length === 0 ? (
          <div className="rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[var(--mqm-warm-50)] px-6 py-10 text-center">
            <p className="text-sm text-muted-foreground">Seu carrinho esta vazio.</p>
            <Link
              href="/produtos"
              className="mt-5 inline-flex rounded-full bg-[var(--mqm-olive-700)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white"
            >
              Explorar produtos
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-12">
            <section className="space-y-4 lg:col-span-8" aria-label="Itens do carrinho">
              {items.map((item) => (
                <article
                  key={item.productId}
                  className="grid grid-cols-[84px_1fr] gap-4 rounded-[1.1rem] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[var(--mqm-warm-50)] p-4 sm:grid-cols-[96px_1fr_auto] sm:items-center"
                >
                  <div className="relative h-21 w-21 overflow-hidden rounded-[0.8rem] bg-[var(--mqm-warm-100)] sm:h-24 sm:w-24">
                    <Image
                      src={item.imageUrl || "/images/product-card-placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-semibold text-[var(--mqm-olive-800)] sm:text-base">{item.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{formatCurrency(item.price)}</p>

                    <div className="mt-3 inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--border)_80%,transparent)] bg-white/70">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        aria-label={`Diminuir quantidade de ${item.name}`}
                        className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-[var(--mqm-olive-700)]"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-[var(--mqm-olive-800)]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        aria-label={`Aumentar quantidade de ${item.name}`}
                        className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-[var(--mqm-olive-700)]"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center justify-between sm:col-span-1 sm:flex-col sm:items-end sm:justify-center sm:gap-3">
                    <p className="text-sm font-semibold text-[var(--mqm-olive-800)]">{formatCurrency(item.price * item.quantity)}</p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.11em] text-muted-foreground hover:text-[var(--mqm-blush-700)]"
                    >
                      <Trash2 className="size-3.5" />
                      Remover
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <aside className="rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[var(--mqm-warm-50)] p-5 lg:col-span-4 lg:self-start">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mqm-olive-600)]">Resumo</h2>
              <div className="mt-4 space-y-2 text-sm text-[var(--mqm-olive-800)]">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Frete</span>
                  <span>{shipping === 0 ? "Gratis" : formatCurrency(shipping)}</span>
                </div>
              </div>

              <div className="mt-4 border-t border-[color-mix(in_srgb,var(--border)_70%,transparent)] pt-4">
                <div className="flex items-center justify-between text-base font-semibold text-[var(--mqm-olive-800)]">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--mqm-olive-700)] px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--mqm-olive-800)]"
              >
                Ir para checkout
              </Link>

              <Link
                href="/produtos"
                className="mt-3 inline-flex w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mqm-olive-600)] hover:text-[var(--mqm-blush-700)]"
              >
                Continuar comprando
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
