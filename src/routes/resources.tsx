import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Download, FileText, Lock, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs, resources, type ResourceCat } from "@/data/content";
import { PageHero, SectionHeading } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resources")({
  head: () => ({ meta: [
    { title: "Resources — Brochures, Datasheets & Guides | Adreco" },
    { name: "description", content: "Download Adreco heat pump brochures, technical documents, installation guides, case studies and FAQs." },
    { property: "og:title", content: "Resources — Adreco Heat Pump" },
    { property: "og:description", content: "Brochures, technical docs and insights." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Resources,
});

const CATS: ("All" | ResourceCat)[] = ["All", "Brochures", "Technical documents", "Installation guides", "Case studies", "Blog"];

function Resources() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [gate, setGate] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const list = resources.filter((r) => (cat === "All" || r.cat === cat) && (r.title + r.desc).toLowerCase().includes(q.toLowerCase()));
  const open = (r: (typeof resources)[number]) => (r.gated && !unlocked ? setGate(r.title) : toast.success(`${r.title} opened (demo)`));
  return (
    <>
      <PageHero eyebrow="Resources hub" title="Knowledge for better decisions" intro="Brochures, datasheets, installation guides and engineering insights." />
      <section className="container-x py-14 lg:py-20">
        <div className="grid items-center gap-6 overflow-hidden rounded-3xl bg-gradient-navy p-6 text-navy-foreground sm:p-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="flex min-w-0 items-center gap-4"><span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground"><FileText className="h-7 w-7" /></span>
            <div className="min-w-0"><p className="text-xs font-bold uppercase tracking-wider text-accent">Featured</p><h2 className="text-xl font-extrabold sm:text-2xl">Adreco Heat Pump Product Brochure</h2><p className="text-sm text-navy-foreground/75">Full range, specifications and applications in one PDF.</p></div></div>
          <Button variant="cta" onClick={() => toast.success("Brochure opened (demo)")}><Download />Download Brochure</Button>
        </div>
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative md:w-80"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search resources" className="pl-9" aria-label="Search resources" /></div>
          <div className="flex flex-wrap gap-2">{CATS.map((c) => <button key={c} onClick={() => setCat(c)} className={cn("rounded-full border px-3 py-1.5 text-sm font-medium", cat === c ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary")}>{c} <span className="opacity-60">({c === "All" ? resources.length : resources.filter((r) => r.cat === c).length})</span></button>)}</div>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => (
            <article key={r.title} className="group flex flex-col rounded-2xl border border-border bg-background p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift">
              <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-surface text-primary">{r.cat === "Blog" || r.cat === "Case studies" ? <BookOpen /> : <FileText />}</span>{r.gated && !unlocked && <Lock className="h-4 w-4 text-accent" />}</div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-accent">{r.cat}</p>
              <h3 className="mt-1 font-bold text-navy">{r.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.desc}</p>
              <div className="mt-5 flex items-center justify-between"><span className="text-xs text-muted-foreground">{r.meta}</span><Button size="sm" variant="soft" onClick={() => open(r)}><Download />{r.meta.startsWith("PDF") ? "Download" : "Read"}</Button></div>
            </article>
          ))}
        </div>
        {list.length === 0 && <p className="mt-8 rounded-2xl bg-surface p-10 text-center text-muted-foreground">No resources match your search.</p>}
      </section>
      <section className="bg-surface py-14 lg:py-20"><div className="container-x grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div><SectionHeading eyebrow="FAQ" title="Frequently asked questions" intro="Can't find your answer? Our engineers are happy to help." />
          <Button asChild variant="cta" className="mt-6"><Link to="/contact">Ask an Engineer</Link></Button></div>
        <Accordion type="single" collapsible className="rounded-2xl bg-background px-6 shadow-card">{faqs.map((f) => <AccordionItem key={f.q} value={f.q}><AccordionTrigger className="text-left">{f.q}</AccordionTrigger><AccordionContent>{f.a}</AccordionContent></AccordionItem>)}</Accordion>
      </div></section>
      <Dialog open={!!gate} onOpenChange={(v) => !v && setGate(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle className="text-navy">Unlock technical documents</DialogTitle><DialogDescription>Enter your email to access “{gate}”. (Demo — nothing is stored.)</DialogDescription></DialogHeader>
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); const em = new FormData(e.currentTarget).get("email") as string; if (!/^\S+@\S+\.\S+$/.test(em)) { toast.error("Enter a valid email"); return; } setUnlocked(true); setGate(null); toast.success("Documents unlocked"); }}>
            <Input name="email" type="email" placeholder="you@company.com" aria-label="Email" /><Button variant="cta">Unlock</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
