import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Download, FileText, GitCompare, Headphones, Plus, Rotate3d, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { formatINR, getProduct, products } from "@/data/products";
import { faqs, solutions } from "@/data/content";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";
import { SpecTable } from "@/components/site/SpecTable";
import { SectionHeading } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    const title = p ? `${p.name} ${p.model} — Adreco Heat Pump` : "Product — Adreco Heat Pump";
    const desc = p ? `${p.tagline} ${p.capacityKw[0]}–${p.capacityKw[1]} kW, COP ${p.cop}, ${p.ambient[0]}°C to ${p.ambient[1]}°C.` : "Adreco heat pump product details.";
    return { meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }, { property: "og:type", content: "product" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  notFoundComponent: () => (
    <div className="container-x py-32 text-center"><h1 className="text-3xl font-bold text-navy">Product not found</h1><Button asChild variant="cta" className="mt-6"><Link to="/shop">Back to shop</Link></Button></div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const { add, toggleCompare, compare, setAssessmentOpen, setAdvisorOpen } = useStore();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [view360, setView360] = useState(false);
  const recs = products.filter((x) => x.slug !== p.slug && x.applications.some((a) => p.applications.includes(a))).slice(0, 3);
  const apps = solutions.filter((s) => s.productApps.some((a) => p.applications.includes(a))).slice(0, 4);

  return (
    <div className="container-x py-8">
      <Breadcrumb><BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink asChild><Link to="/shop">Shop</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>{p.name}</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList></Breadcrumb>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl bg-surface"
                onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }}
                onMouseLeave={() => setZoom(null)}>
                {view360 ? (
                  <div className="grid h-full place-items-center text-center"><div><Rotate3d className="mx-auto h-14 w-14 animate-spin text-primary [animation-duration:6s]" /><p className="mt-3 font-semibold text-navy">360° view coming soon</p><p className="text-sm text-muted-foreground">Interactive model placeholder</p></div></div>
                ) : (
                  <img src={p.gallery[img]} alt={`${p.name} view ${img + 1}`} className="h-full w-full object-cover transition-transform duration-200"
                    style={zoom ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined} />
                )}
              </div>
              <div className="mt-3 flex gap-3">
                {p.gallery.map((g, i) => (
                  <button key={i} onClick={() => { setImg(i); setView360(false); }} aria-label={`Image ${i + 1}`} className={cn("h-20 w-20 overflow-hidden rounded-xl border-2", img === i && !view360 ? "border-accent" : "border-transparent")}>
                    <img src={g} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
                <button onClick={() => setView360(true)} className={cn("grid h-20 w-20 place-items-center rounded-xl border-2 bg-surface text-xs font-bold text-primary", view360 ? "border-accent" : "border-transparent")}><Rotate3d className="h-6 w-6" />360°</button>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">{p.type} heat pump</span>
              <h1 className="mt-1 text-3xl font-extrabold text-navy md:text-4xl">{p.name}</h1>
              <p className="mt-1 font-semibold text-primary">{p.model}</p>
              <p className="mt-4 text-muted-foreground">{p.tagline}</p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[["Capacity", `${p.capacityKw[1]} kW`], ["COP", p.cop], ["Outlet", `${p.maxWaterTemp}°C`]].map(([l, v]) => (
                  <div key={l as string} className="rounded-xl bg-surface p-3 text-center"><p className="text-xs text-muted-foreground">{l}</p><p className="font-display text-lg font-black text-navy">{v}</p></div>
                ))}
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm"><Truck className="h-4 w-4 text-success" />In stock · typical lead time 2–4 weeks (placeholder)</p>
              <p className="mt-3 text-lg">{p.priceFrom ? <>Starting from <b className="text-navy">{formatINR(p.priceFrom)}</b> <span className="text-xs text-muted-foreground">(demo price)</span></> : <b className="text-navy">Price on enquiry</b>}</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center rounded-full border">
                  <button className="h-11 w-11" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button>
                  <span className="w-8 text-center font-bold" aria-live="polite">{qty}</span>
                  <button className="h-11 w-11" onClick={() => setQty(qty + 1)} aria-label="Increase quantity">+</button>
                </div>
                <Button variant="cta" size="lg" className="flex-1" onClick={() => add(p.slug, qty)}><Plus />Add to Quote Cart</Button>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button asChild variant="navy"><Link to="/quote" onClick={() => add(p.slug, qty)}>Request Quote</Link></Button>
                <Button variant="soft" onClick={() => toggleCompare(p.slug)}><GitCompare />{compare.includes(p.slug) ? "Comparing" : "Compare"}</Button>
                <Button variant="soft" onClick={() => toast.success("Brochure download started (demo)")}><Download />Brochure</Button>
                <Button variant="soft" onClick={() => setAdvisorOpen(true)}><Headphones />Talk to an Expert</Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="mt-12">
            <TabsList className="flex h-auto w-full justify-start overflow-x-auto bg-surface p-1">
              {["overview", "specifications", "features", "applications", "installation", "downloads", "faq"].map((t) => (
                <TabsTrigger key={t} value={t} className="capitalize data-[state=active]:bg-background data-[state=active]:text-accent">{t === "installation" ? "Installation" : t === "faq" ? "FAQ" : t}</TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="overview" className="mt-6 space-y-4 text-muted-foreground">
              <p>The {p.name} ({p.model}) extracts free heat from ambient air using {p.refrigerant} refrigerant and a {p.compressor} compressor, delivering up to {p.maxWaterTemp}°C water at a rated COP of {p.cop}.</p>
              <p>Designed and tested for Indian site conditions — from humid coasts to Himalayan winters — with automatic operation after one-time parameter setting and smart error codes for easy troubleshooting.</p>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6"><SpecTable p={p} /></TabsContent>
            <TabsContent value="features" className="mt-6">
              <ul className="grid gap-3 sm:grid-cols-2">{[...p.features, "Water flow switch protection", "High pressure protection", "Power-fluctuation protection software", "Zero fire & explosion hazard"].map((f) => (
                <li key={f} className="flex gap-3 rounded-xl bg-surface p-3 text-sm"><Check className="h-5 w-5 shrink-0 text-accent" />{f}</li>))}</ul>
            </TabsContent>
            <TabsContent value="applications" className="mt-6 grid gap-3 sm:grid-cols-2">
              {apps.map((s) => <Link key={s.slug} to="/applications/$slug" params={{ slug: s.slug }} className="flex items-center gap-3 rounded-xl bg-surface p-3 hover:shadow-card"><img src={s.image} alt="" className="h-14 w-14 rounded-lg object-cover" /><span className="font-semibold text-navy">{s.title}</span></Link>)}
            </TabsContent>
            <TabsContent value="installation" className="mt-6">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Outdoor placement with min. 600 mm side clearance and 2 m free air discharge</li>
                <li>• Level concrete plinth with anti-vibration pads; drain for defrost water</li>
                <li>• Dedicated MCB/MCCB supply as per input power ({p.inputKw} kW)</li>
                <li>• Insulated water piping, strainer, and flow switch at inlet</li>
                <li>• Commissioning by an Adreco-authorised engineer</li>
              </ul>
            </TabsContent>
            <TabsContent value="downloads" className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Product datasheet", "Installation manual", "Wiring diagram", "Warranty terms"].map((d) => (
                <button key={d} onClick={() => toast.success(`${d} download started (demo)`)} className="flex items-center gap-3 rounded-xl bg-surface p-4 text-left hover:shadow-card"><FileText className="h-6 w-6 text-primary" /><span className="flex-1 font-semibold text-navy">{d}</span><Download className="h-4 w-4 text-accent" /></button>
              ))}
            </TabsContent>
            <TabsContent value="faq" className="mt-6">
              <Accordion type="single" collapsible>{faqs.map((f) => <AccordionItem key={f.q} value={f.q}><AccordionTrigger className="text-left">{f.q}</AccordionTrigger><AccordionContent>{f.a}</AccordionContent></AccordionItem>)}</Accordion>
            </TabsContent>
          </Tabs>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 overflow-hidden rounded-2xl bg-gradient-navy p-6 text-navy-foreground shadow-lift">
            <p className="text-xs font-bold uppercase tracking-wider text-accent">Project enquiry</p>
            <p className="mt-2 text-xl font-bold">Need help sizing {p.model}?</p>
            <p className="mt-2 text-sm text-navy-foreground/75">Our engineers will assess your load, climate and site before recommending a final system.</p>
            <ul className="mt-4 space-y-2 text-sm">{["Free load calculation", "Site assessment", "Installation & AMC"].map((x) => <li key={x} className="flex gap-2"><Check className="h-4 w-4 text-accent" />{x}</li>)}</ul>
            <Button variant="cta" size="lg" className="mt-6 w-full" onClick={() => setAssessmentOpen(true)}>Book a Site Assessment</Button>
            <Button asChild variant="ghostLight" className="mt-2 w-full"><Link to="/quote" onClick={() => add(p.slug, qty)}>Request Quote</Link></Button>
          </div>
        </aside>
      </div>

      {recs.length > 0 && (
        <section className="mt-20">
          <SectionHeading eyebrow="You may also need" title="Recommended for you" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{recs.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
        </section>
      )}
    </div>
  );
}
