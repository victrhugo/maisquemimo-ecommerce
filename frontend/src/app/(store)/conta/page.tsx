"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ORDER_STATUS_LABELS, type Order } from "@/types/order";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useOrders } from "@/hooks/use-orders";
import { useAuthProfile, useAuthSession, useUpdateProfile } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AccountPage() {
  const router = useRouter();
  const { logout } = useAuthSession();
  const { data: profile } = useAuthProfile();
  const updateProfileMutation = useUpdateProfile();
  const { data: ordersData } = useOrders();
  const orders = ordersData ?? [];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) {
      return;
    }
    setName(profile.name);
    setEmail(profile.email);
  }, [profile]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleProfileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaveMessage(null);

    try {
      await updateProfileMutation.mutateAsync({ name, email });
      setSaveMessage('Dados atualizados com sucesso.');
    } catch {
      setSaveMessage('Não foi possível atualizar seus dados agora.');
    }
  };

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
              <p className="mt-3 text-base font-semibold text-[var(--mqm-olive-800)]">{profile?.name || "Cliente"}</p>
              <p className="text-sm text-muted-foreground">{profile?.email || ""}</p>
              <Button type="button" variant="outline" size="sm" className="mt-4" onClick={handleLogout}>
                Sair da conta
              </Button>
            </article>

            <article className="rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[var(--mqm-warm-50)] p-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--mqm-olive-500)]">Editar dados</h2>
              <form className="mt-3 space-y-3" onSubmit={handleProfileSubmit}>
                <div className="space-y-1.5">
                  <Label htmlFor="profile-name">Nome</Label>
                  <Input
                    id="profile-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    disabled={updateProfileMutation.isPending}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="profile-email">E-mail</Label>
                  <Input
                    id="profile-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={updateProfileMutation.isPending}
                    required
                  />
                </div>

                <Button type="submit" size="sm" loading={updateProfileMutation.isPending}>
                  Salvar dados
                </Button>
              </form>

              {saveMessage && <p className="mt-3 text-xs text-muted-foreground">{saveMessage}</p>}
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
            {orders.length === 0 ? (
              <article className="rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[var(--mqm-warm-50)] p-5 text-sm text-muted-foreground">
                Você ainda não possui pedidos. Quando concluir sua primeira compra, ela aparecerá aqui.
              </article>
            ) : (
              orders.map((order) => <OrderCard key={order.id} order={order} />)
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <article className="rounded-[1.2rem] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[var(--mqm-warm-50)] p-5">
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
  );
}
