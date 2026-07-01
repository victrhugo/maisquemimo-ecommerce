"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useUIStore } from "@/stores/ui-store";
import { formatCurrency, cn } from "@/lib/utils";

export function CartDrawer() {
  const { isCartOpen, setCartOpen } = useUIStore();
  const { items, subtotal, updateQuantity, removeItem } = useCartStore();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setCartOpen(false);
      }
    }
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, setCartOpen]);

  // Close drawer when clicking outside
  function handleBackdropClick(e: React.MouseEvent) {
    if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
      setCartOpen(false);
    }
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-all duration-300 select-none",
        isCartOpen ? "visible" : "invisible"
      )}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/35 backdrop-blur-[2px] transition-opacity duration-300",
          isCartOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={handleBackdropClick}
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className={cn(
          "absolute inset-y-0 right-0 flex h-full w-full max-w-md flex-col bg-[var(--mqm-warm-50)] shadow-[var(--shadow-lg)] border-l border-[color-mix(in_srgb,var(--border)_45%,transparent)] transition-transform duration-300 ease-in-out",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex h-20 items-center justify-between border-b border-[color-mix(in_srgb,var(--border)_45%,transparent)] px-6 shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="size-5 text-[var(--mqm-olive-800)]" />
            <h2 className="font-display text-lg font-bold uppercase tracking-wider text-[var(--mqm-olive-800)]">
              Seu Carrinho
            </h2>
            {items.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--mqm-blush-600)] text-[9px] font-bold text-white shadow-[var(--shadow-xs)]">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--border)_75%,transparent)] bg-[var(--mqm-warm-50)] text-muted-foreground transition-all hover:text-[var(--mqm-olive-800)] hover:border-[var(--mqm-olive-300)] cursor-pointer"
            aria-label="Fechar carrinho"
          >
            <X className="size-4.5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-10 space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--mqm-blush-100)] border border-[var(--mqm-blush-300)] text-[var(--mqm-blush-600)]">
                <ShoppingBag className="size-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--mqm-olive-800)] uppercase tracking-wider">
                  Carrinho Vazio
                </p>
                <p className="mt-1 text-xs text-muted-foreground max-w-[240px] leading-relaxed">
                  Explore nossa papelaria e adicione mimos para começar sua rotina organizada.
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full bg-[var(--mqm-olive-700)] px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--mqm-olive-800)] cursor-pointer"
              >
                Voltar a navegar
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[color-mix(in_srgb,var(--border)_45%,transparent)] space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.productId}
                  className={cn(
                    "flex items-start gap-4 py-4 first:pt-0",
                    index > 0 && "pt-4"
                  )}
                >
                  {/* Photo 1:1 */}
                  <div className="relative aspect-square h-20 w-20 overflow-hidden rounded-lg border border-[color-mix(in_srgb,var(--border)_45%,transparent)] bg-[var(--mqm-warm-100)] shrink-0">
                    <Image
                      src={item.imageUrl || "/images/product-card-placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <h3 className="line-clamp-2 uppercase text-[10px] font-bold tracking-wider text-[var(--mqm-olive-800)] pr-4">
                      {item.name}
                    </h3>
                    
                    {/* Mock Variation if applicable */}
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">
                      Tamanho: A5 • Capa Dura
                    </p>

                    {/* Price and Action Row */}
                    <div className="flex items-center justify-between pt-1">
                      {/* Quantity selector */}
                      <div className="flex items-center rounded-full border border-[color-mix(in_srgb,var(--border)_75%,transparent)] bg-[var(--mqm-warm-50)] p-0.5">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:text-[var(--mqm-olive-800)] transition-colors cursor-pointer"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[var(--mqm-olive-800)] font-sans">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:text-[var(--mqm-olive-800)] transition-colors cursor-pointer"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:text-[var(--mqm-blush-700)] hover:bg-[var(--mqm-blush-100)]/40 transition-all cursor-pointer"
                        aria-label="Remover item"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal Item Price */}
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-[var(--mqm-blush-800)]">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[color-mix(in_srgb,var(--border)_45%,transparent)] bg-[var(--mqm-warm-50)] p-6 space-y-4 shrink-0 shadow-[0_-4px_16px_rgba(90,99,56,0.03)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--mqm-olive-700)] font-sans">
                Subtotal
              </span>
              <span className="text-base font-bold text-[var(--mqm-blush-800)]">
                {formatCurrency(subtotal)}
              </span>
            </div>
            
            <p className="text-[10px] text-muted-foreground font-sans text-center leading-normal">
              Taxas e frete calculados na finalização da compra.
            </p>

            <div className="flex flex-col gap-2">
              <Link
                href="/checkout"
                onClick={() => setCartOpen(false)}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--mqm-olive-700)] px-6 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-[var(--shadow-xs)] hover:bg-[var(--mqm-olive-800)] transition-colors"
              >
                <span>Finalizar compra</span>
                <ArrowRight className="size-3.5" />
              </Link>
              
              <button
                onClick={() => setCartOpen(false)}
                className="flex h-11 w-full items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--border)_75%,transparent)] bg-[var(--mqm-warm-50)] px-6 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--mqm-olive-800)] hover:bg-[var(--mqm-blush-100)]/40 hover:text-[var(--mqm-blush-700)] transition-colors cursor-pointer"
              >
                Continuar comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
