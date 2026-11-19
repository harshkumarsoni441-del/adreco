import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Adreco Heat Pump home">
      <svg viewBox="0 0 40 36" className="h-9 w-10" aria-hidden>
        <path d="M20 2 L38 34 H2 Z" className="fill-accent" />
        <path d="M20 14 L29 30 H11 Z" className={light ? "fill-navy" : "fill-background"} />
      </svg>
      <span className="leading-none">
        <span className={cn("block font-display text-xl font-black tracking-tight", light ? "text-navy-foreground" : "text-navy")}>ADRECO</span>
        <span className={cn("block text-[10px] font-bold uppercase tracking-[0.22em]", light ? "text-navy-foreground/70" : "text-primary")}>Heat Pump</span>
      </span>
    </Link>
  );
}
