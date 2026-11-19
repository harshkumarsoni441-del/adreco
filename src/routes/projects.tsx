import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/data/content";
import { PageHero, Reveal } from "@/components/site/Reveal";
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
  component: () => (
    <>
      <PageHero eyebrow="Our projects" title="Real Installations. Real Savings." intro="From the bone-chilling mountains of Ladakh to the humid south." image={pool} />
      <section className="container-x space-y-10 py-16">
        {caseStudies.map((c, i) => (
          <Reveal key={c.slug}>
            <article id={c.slug} className={`grid scroll-mt-28 overflow-hidden rounded-3xl bg-surface shadow-card md:grid-cols-2 ${i % 2 ? "md:[&>img]:order-2" : ""}`}>
              <img src={c.image} alt={`${c.title}, ${c.city}`} loading="lazy" className="h-full min-h-72 w-full object-cover" />
              <div className="p-8 md:p-10">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{c.sector}</span>
                <h2 className="mt-4 text-3xl font-extrabold text-navy">{c.title}</h2>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{c.city}</p>
                <p className="mt-4 font-semibold text-primary">{c.product}</p>
                <p className="mt-4"><b className="text-navy">Challenge:</b> {c.challenge}</p>
                <p className="mt-2"><b className="text-navy">Outcome:</b> {c.outcome}</p>
                <Button asChild variant="cta" className="mt-6"><Link to="/quote">Start a similar project <ArrowRight /></Link></Button>
              </div>
            </article>
          </Reveal>
        ))}
        <p className="text-xs text-muted-foreground">Case studies are demo content; outcomes are illustrative.</p>
      </section>
      <PartnerBanner />
    </>
  ),
});
