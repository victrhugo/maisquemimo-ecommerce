"use client";

import Link from "next/link";
import { ORDER_STATUS_LABELS, type Order } from "@/types/order";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useOrders } from "@/hooks/use-orders";

export default function AccountPage() {
  const { data: ordersData } = useOrders();
  const orders = ordersData ?? [];
  const customer = orders[0]?.customer;

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 border-b border-[color-mix(in_srgb,var(--border)_55%,transparent)] pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[var(--mqm-olive-500)]">Minha conta</p>
          <h1 className="mt-2 font-display text-[2rem] leading-none text-[var(--mqm-olive-800)] sm:text-[2.4rem]">Acompanhar pedidos</h1>
        </header>

        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="space-y-4 lg:col-span-4">
            <article className="rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[var(--mqm-warm-50)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--mqm-olive-500)]">Perfil</p>
              <p className="mt-3 text-base font-semibold text-[var(--mqm-olive-800)]">{customer?.name || "Cliente"}</p>
              <p className="text-sm text-muted-foreground">{customer?.email || ""}</p>
            </article>

            <article className="rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[var(--mqm-warm-50)] p-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--mqm-olive-500)]">Acesso rapido</h2>
              <div className="mt-3 space-y-2">
                <Link href="/produtos" className="block text-sm text-[var(--mqm-olive-700)] hover:text-[var(--mqm-blush-700)]">
                  Continuar comprando
                </Link>
                <Link href="/carrinho" className="block text-sm text-[var(--mqm-olive-700)] hover:text-[var(--mqm-blush-700)]">
                  Ver carrinho
                </Link>
                <Link href="/checkout" className="block text-sm text-[var(--mqm-olive-700)] hover:text-[var(--mqm-blush-700)]">
                  Ir para checkout
                </Link>
              </div>
            </article>
          </aside>

          <section className="space-y-4 lg:col-span-8" aria-label="Pedidos recentes">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[var(--mqm-warm-50)] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--mqm-olive-500)]">Pedido {order.number}</p>
                    <p className="mt-1 text-sm text-muted-foreground">Criado em {formatDate(order.createdAt)}</p>
                  </div>
                  <span className="rounded-full bg-[var(--mqm-olive-50)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--mqm-olive-700)]">
                    {ORDER_STATUS_LABELS[order.status]}
                  </span>
                </div>

                <div className="mt-4 space-y-1.5 text-sm text-[var(--mqm-olive-800)]">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex items-center justify-between">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>{formatCurrency(item.total / 100)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t border-[color-mix(in_srgb,var(--border)_70%,transparent)] pt-4">
                  <div className="flex items-center justify-between text-sm font-semibold text-[var(--mqm-olive-800)]">
                    <span>Total</span>
                    <span>{formatCurrency(order.total / 100)}</span>
                  </div>
                  {order.trackingCode && (
                    <p className="mt-2 text-xs text-muted-foreground">Codigo de rastreio: {order.trackingCode}</p>
                  )}
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
