import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { applicationsList, products, productTypes, type Application, type ProductType } from "@/data/products";
import { ProductCard, ProductCardSkeleton } from "@/components/site/ProductCard";
import { PageHero } from "@/components/site/Reveal";
import heroImg from "@/assets/p-commercial.jpg";

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): { type?: ProductType } =>
    typeof s["type"] === "string" && productTypes.includes(s["type"] as ProductType) ? { type: s["type"] as ProductType } : {},
  head: () => ({
    meta: [
      { title: "Shop Heat Pumps — Adreco Product Catalogue" },
      { name: "description", content: "Browse domestic, commercial, EVI, pool, high-temperature and dryer heat pumps. Filter by capacity, temperature and COP." },
      { property: "og:title", content: "Shop Heat Pumps — Adreco" },
      { property: "og:description", content: "Find the right heat pump for your project." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

interface F { types: ProductType[]; apps: Application[]; cap: [number, number]; minAmbient: number; minWater: number; minCop: number; cold: boolean }
const DEFAULT: F = { types: [], apps: [], cap: [0, 70], minAmbient: 0, minWater: 40, minCop: 3, cold: false };

function Filters({ f, set }: { f: F; set: (f: F) => void }) {
  const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  return (
    <div className="space-y-7">
      <fieldset><legend className="text-sm font-bold text-navy">Product type</legend>
        <div className="mt-3 space-y-2">{productTypes.map((t) => (
          <label key={t} className="flex cursor-pointer items-center gap-2 text-sm"><Checkbox checked={f.types.includes(t)} onCheckedChange={() => set({ ...f, types: toggle(f.types, t) })} />{t}</label>))}</div>
      </fieldset>
      <fieldset><legend className="text-sm font-bold text-navy">Application</legend>
        <div className="mt-3 space-y-2">{applicationsList.map((a) => (
          <label key={a} className="flex cursor-pointer items-center gap-2 text-sm"><Checkbox checked={f.apps.includes(a)} onCheckedChange={() => set({ ...f, apps: toggle(f.apps, a) })} />{a}</label>))}</div>
      </fieldset>
      <div><div className="flex justify-between text-sm"><Label className="font-bold text-navy">Heating capacity</Label><span>{f.cap[0]}–{f.cap[1]} kW</span></div>
        <Slider className="mt-3" min={0} max={70} step={1} value={f.cap} onValueChange={(v) => set({ ...f, cap: [v[0] ?? 0, v[1] ?? 70] })} aria-label="Heating capacity" /></div>
      <div><div className="flex justify-between text-sm"><Label className="font-bold text-navy">Operates down to</Label><span>{f.minAmbient}°C</span></div>
        <Slider className="mt-3" min={-25} max={0} step={1} value={[f.minAmbient]} onValueChange={([v]) => set({ ...f, minAmbient: v ?? 0 })} aria-label="Minimum ambient temperature" /></div>
      <div><div className="flex justify-between text-sm"><Label className="font-bold text-navy">Hot water temp (min)</Label><span>{f.minWater}°C</span></div>
        <Slider className="mt-3" min={40} max={80} step={5} value={[f.minWater]} onValueChange={([v]) => set({ ...f, minWater: v ?? 40 })} aria-label="Minimum hot water temperature" /></div>
      <div><div className="flex justify-between text-sm"><Label className="font-bold text-navy">COP (min)</Label><span>{f.minCop.toFixed(1)}</span></div>
        <Slider className="mt-3" min={3} max={5} step={0.1} value={[f.minCop]} onValueChange={([v]) => set({ ...f, minCop: v ?? 3 })} aria-label="Minimum COP" /></div>
      <label className="flex items-center justify-between text-sm font-bold text-navy">Suitable for cold climate<Switch checked={f.cold} onCheckedChange={(v) => set({ ...f, cold: v })} /></label>
      <Button variant="soft" className="w-full" onClick={() => set(DEFAULT)}>Reset filters</Button>
    </div>
  );
}

function Shop() {
  const { type } = Route.useSearch();
  const [f, setF] = useState<F>({ ...DEFAULT, types: type ? [type] : [] });
  const [sort, setSort] = useState("recommended");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => { setF((p) => ({ ...p, types: type ? [type] : [] })); }, [type]);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 450); return () => clearTimeout(t); }, []);

  const list = useMemo(() => {
    const r = products.filter((p) =>
      (!f.types.length || f.types.includes(p.type)) &&
      (!f.apps.length || p.applications.some((a) => f.apps.includes(a))) &&
      p.capacityKw[1] >= f.cap[0] && p.capacityKw[0] <= f.cap[1] &&
      p.ambient[0] <= f.minAmbient && p.maxWaterTemp >= f.minWater && p.cop >= f.minCop && (!f.cold || p.coldClimate));
    if (sort === "capacity") r.sort((a, b) => a.capacityKw[1] - b.capacityKw[1]);
    if (sort === "newest") r.sort((a, b) => b.newness - a.newness);
    if (sort === "cop") r.sort((a, b) => b.cop - a.cop);
    return r;
  }, [f, sort]);

  return (
    <>
      <PageHero eyebrow="Product catalogue" title="Find the Right Heat Pump" intro="Filter by application, capacity and climate. Add products to your quote cart and our engineers will size the final system." image={heroImg} />
      <section className="container-x grid gap-10 py-12 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block"><div className="sticky top-24 rounded-2xl bg-surface p-5"><Filters f={f} set={setF} /></div></aside>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground"><b className="text-navy">{list.length}</b> products</p>
            <div className="flex items-center gap-2">
              <Button variant="soft" className="lg:hidden" onClick={() => setOpen(true)}><SlidersHorizontal />Filters</Button>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-44" aria-label="Sort"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="recommended">Recommended</SelectItem><SelectItem value="capacity">Capacity</SelectItem><SelectItem value="cop">Highest COP</SelectItem><SelectItem value="newest">Newest</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {loading ? Array.from({ length: 6 }, (_, i) => <ProductCardSkeleton key={i} />) : list.map((p) => <div key={p.slug} className="animate-fade-up"><ProductCard p={p} /></div>)}
          </div>
          {!loading && list.length === 0 && (
            <div className="mt-6 rounded-2xl bg-surface p-12 text-center">
              <SearchX className="mx-auto h-10 w-10 text-primary" />
              <p className="mt-3 font-bold text-navy">No products match these filters</p>
              <Button variant="navy" className="mt-4" onClick={() => setF(DEFAULT)}>Reset filters</Button>
            </div>
          )}
          <p className="mt-8 text-xs text-muted-foreground">Prices marked “demo” are sample content. Industrial and commercial pricing is on enquiry.</p>
        </div>
      </section>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="overflow-y-auto"><SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader><div className="mt-4"><Filters f={f} set={setF} /></div>
          <Button variant="cta" className="mt-6 w-full" onClick={() => setOpen(false)}>Show {list.length} products</Button></SheetContent>
      </Sheet>
    </>
  );
}
