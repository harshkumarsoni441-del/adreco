import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, GitCompare, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProduct, products, type Product } from "@/data/products";
import { useStore } from "@/lib/store";
import { specRows } from "@/components/site/SpecTable";
import { PageHero } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/compare")({
  head: () => ({ meta: [
    { title: "Compare Heat Pumps — Adreco" },
    { name: "description", content: "Compare up to three Adreco heat pumps side by side: capacity, COP, temperature range, noise and more." },
    { property: "og:title", content: "Compare Heat Pumps — Adreco" },
    { property: "og:description", content: "Side-by-side technical comparison of Adreco heat pumps." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Compare,
});

function useCaseFor(ps: Product[]) {
  const pick = (f: (a: Product, b: Product) => boolean) => ps.reduce((a, b) => (f(b, a) ? b : a));
  return [
    { label: "Best for cold climate", p: pick((a, b) => a.ambient[0] < b.ambient[0]) },
    { label: "Best for hotel hot water", p: pick((a, b) => (a.applications.includes("Hotels") ? a.capacityKw[1] : 0) > (b.applications.includes("Hotels") ? b.capacityKw[1] : 0)) },
    { label: "Best efficiency (COP)", p: pick((a, b) => a.cop > b.cop) },
    { label: "Best for pool heating", p: ps.find((x) => x.type === "Swimming Pool") },
  ].filter((x) => x.p) as { label: string; p: Product }[];
}

function Compare() {
  const { compare, toggleCompare, add } = useStore();
  const ps = compare.map(getProduct).filter(Boolean) as Product[];
  const suggestions = products.filter((p) => !compare.includes(p.slug)).slice(0, 4);
  return (
    <>
      <PageHero eyebrow="Product comparison" title="Compare side by side" intro="Select up to 3 products. Best values for each specification are highlighted." />
      <section className="container-x py-12">
        {ps.length === 0 ? (
          <div className="rounded-2xl bg-surface p-12 text-center">
            <GitCompare className="mx-auto h-10 w-10 text-primary" />
            <p className="mt-3 font-bold text-navy">No products selected yet</p>
            <p className="text-sm text-muted-foreground">Use the compare button on any product card.</p>
            <Button asChild variant="cta" className="mt-5"><Link to="/shop">Browse products</Link></Button>
          </div>
        ) : (
          <>
            {ps.length > 1 && (
              <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {useCaseFor(ps).map((u) => (
                  <div key={u.label} className="rounded-2xl bg-gradient-navy p-5 text-navy-foreground">
                    <Award className="h-6 w-6 text-accent" /><p className="mt-2 text-xs font-bold uppercase tracking-wider text-accent">{u.label}</p><p className="mt-1 font-bold">{u.p.name}</p><p className="text-xs text-navy-foreground/70">{u.p.model}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="overflow-x-auto rounded-2xl border">
              <table className="w-full min-w-[640px] text-sm">
                <thead><tr className="bg-surface">
                  <th className="w-48 p-4 text-left text-muted-foreground">Specification</th>
                  {ps.map((p) => (
                    <th key={p.slug} className="p-4 text-left align-top">
                      <div className="relative">
                        <button onClick={() => toggleCompare(p.slug)} aria-label={`Remove ${p.name}`} className="absolute right-0 top-0 text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
                        <img src={p.image} alt="" className="h-24 w-24 rounded-xl object-cover" />
                        <Link to="/products/$slug" params={{ slug: p.slug }} className="mt-2 block font-bold text-navy hover:text-accent">{p.name}</Link>
                        <Button size="sm" variant="cta" className="mt-2" onClick={() => add(p.slug)}><Plus />Quote</Button>
                      </div>
                    </th>
                  ))}
                </tr></thead>
                <tbody>
                  {specRows.map((r, i) => {
                    const best = ps.length > 1 ? r.best?.(ps) : undefined;
                    return (
                      <tr key={r.label} className={i % 2 ? "bg-surface/50" : ""}>
                        <th scope="row" className="p-4 text-left font-semibold text-muted-foreground">{r.label}</th>
                        {ps.map((p) => <td key={p.slug} className={cn("p-4 font-semibold text-navy", best === p.slug && "bg-accent/10 text-accent")}>{r.get(p)}{best === p.slug && " ★"}</td>)}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
        {ps.length < 3 && (
          <div className="mt-10">
            <p className="font-bold text-navy">Add another product</p>
            <div className="mt-3 flex flex-wrap gap-2">{suggestions.map((s) => <Button key={s.slug} variant="soft" size="sm" onClick={() => toggleCompare(s.slug)}><Plus />{s.name}</Button>)}</div>
          </div>
        )}
      </section>
    </>
  );
}
