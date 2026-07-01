import { cn } from "@/lib/utils";

interface PhotoSlotProps {
  label?: string;
  className?: string;
}

export function PhotoSlot({
  label = "Espaco reservado para fotografia da marca",
  className,
}: PhotoSlotProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-xl)] bg-[color-mix(in_srgb,var(--mqm-warm-50)_92%,white)] shadow-[var(--shadow-xs)]",
        className
      )}
    >
      <div className="absolute inset-0 border border-dashed border-[color-mix(in_srgb,var(--mqm-olive-300)_45%,transparent)]" />
      <div className="flex h-full items-center justify-center px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  );
}
