import { Link } from "@tanstack/react-router";
import { ArrowRight, GitCompare, Plus, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR, type Product } from "@/data/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ p }: { p: Product }) {
  const { add, compare, toggleCompare } = useStore();
  const inCompare = compare.includes(p.slug);
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link to="/products/$slug" params={{ slug: p.slug }} className="relative block aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={`${p.name} ${p.model}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-navy px-2.5 py-1 text-[11px] font-bold text-navy-foreground">{p.model}</span>
        {p.coldClimate && <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-bold text-primary"><Snowflake className="h-3 w-3" />Cold climate</span>}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">{p.type}</span>
        <h3 className="mt-1 text-lg font-bold text-navy">{p.name}</h3>
        <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div><dt className="text-muted-foreground">Capacity</dt><dd className="font-bold text-foreground">{p.capacityKw[0]}–{p.capacityKw[1]} kW</dd></div>
          <div><dt className="text-muted-foreground">Ambient</dt><dd className="font-bold text-foreground">{p.ambient[0]}° to {p.ambient[1]}°C</dd></div>
          <div><dt className="text-muted-foreground">COP</dt><dd className="font-bold text-foreground">{p.cop}</dd></div>
        </dl>
        <p className="mt-3 text-sm text-muted-foreground">{p.highlight} · up to {p.maxWaterTemp}°C</p>
        <div className="mt-4 text-sm">
          {p.priceFrom ? <><span className="text-muted-foreground">Starting from </span><span className="font-bold text-navy">{formatINR(p.priceFrom)}</span><span className="ml-1 text-[10px] text-muted-foreground">(demo)</span></>
            : <span className="font-bold text-navy">Price on enquiry</span>}
        </div>
        <div className="mt-auto flex items-center gap-2 pt-5">
          <Button variant="cta" size="sm" className="flex-1" onClick={() => add(p.slug)}><Plus />Add to Quote</Button>
          <Button variant="soft" size="sm" onClick={() => toggleCompare(p.slug)} aria-pressed={inCompare} className={cn(inCompare && "bg-primary text-primary-foreground hover:bg-primary")} aria-label="Compare"><GitCompare /></Button>
        </div>
        <Link to="/products/$slug" params={{ slug: p.slug }} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          <span className="border-b-2 border-transparent transition group-hover:border-accent">View Details</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return <div className="h-[460px] animate-pulse rounded-2xl bg-surface" />;
}
