import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Cpu, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { caseStudies } from "@/data/content";
import { PageHero, Reveal, SectionHeading } from "@/components/site/Reveal";
import { PartnerBanner } from "@/components/site/Sections";
import pool from "@/assets/s-pool.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [
    { title: "Projects & Case Studies — Adreco Heat Pump" },
    { name: "description", content: "Heat pump installations across India: hotels in Pune, schools in Bengaluru, food plants in Ludhiana and resorts in Ladakh." },
    { property: "og:title", content: "Projects — Adreco Heat Pump" },
    { property: "og:description", content: "Real installations. Real savings." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Projects,
});

function Projects() {
  const sectors = ["All", ...Array.from(new Set(caseStudies.map((c) => c.sector)))];
  const [f, setF] = useState("All");
  const list = caseStudies.filter((c) => f === "All" || c.sector === f);
  return (
    <>
      <PageHero eyebrow="Our projects" title="Real Installations. Real Savings." intro="From the bone-chilling mountains of Ladakh to the humid south." image={pool} />
      <section className="container-x py-14 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <SectionHeading eyebrow="Case studies" title="Projects across India" intro="Each system is sized for its climate, load and site." />
          <div className="flex flex-wrap gap-2">{sectors.map((s) => (
            <button key={s} onClick={() => setF(s)} className={cn("rounded-full border px-4 py-2 text-sm font-semibold transition", f === s ? "border-accent bg-accent text-accent-foreground" : "border-border text-navy hover:border-accent")}>{s}</button>))}</div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {list.map((c) => (
            <Reveal key={c.slug}>
              <article id={c.slug} className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-card transition hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={c.image} alt={`${c.title}, ${c.city}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{c.sector}</span>
                  <div className="absolute bottom-4 left-5 right-5 text-navy-foreground">
                    <h2 className="text-2xl font-extrabold">{c.title}</h2>
                    <p className="mt-1 flex items-center gap-1 text-sm opacity-90"><MapPin className="h-4 w-4" />{c.city}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="inline-flex w-fit items-center gap-2 rounded-lg bg-surface px-3 py-1.5 text-sm font-semibold text-primary"><Cpu className="h-4 w-4" />{c.product}</p>
                  <dl className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
                    <div><dt className="text-xs font-bold uppercase tracking-wider text-accent">Challenge</dt><dd className="mt-1 text-sm text-muted-foreground">{c.challenge}</dd></div>
                    <div><dt className="text-xs font-bold uppercase tracking-wider text-accent">Outcome</dt><dd className="mt-1 text-sm text-muted-foreground">{c.outcome}</dd></div>
                  </dl>
                  <Link to="/quote" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-accent">Start a similar project <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">Case studies are demo content; outcomes are illustrative and depend on site conditions.</p>
      </section>
      <PartnerBanner />
    </>
  );
}
