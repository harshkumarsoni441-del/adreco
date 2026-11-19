import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Fragment } from "react";
import { AlertTriangle, ArrowRight, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { caseStudies, getSolution } from "@/data/content";
import { products } from "@/data/products";
import { PageHero, Reveal, SectionHeading } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { PartnerBanner } from "@/components/site/Sections";

export const Route = createFileRoute("/applications/$slug")({
  loader: ({ params }) => { if (!getSolution(params.slug)) throw notFound(); return { slug: params.slug }; },
  head: ({ loaderData }) => {
    const s = loaderData ? getSolution(loaderData.slug) : undefined;
    const t = s ? `${s.title} Heat Pump Solutions — Adreco` : "Solution — Adreco";
    const d = s ? `${s.short} ${s.challenge}` : "Adreco heat pump solution.";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  notFoundComponent: () => <div className="container-x py-32 text-center"><h1 className="text-3xl font-bold text-navy">Solution not found</h1><Button asChild variant="cta" className="mt-6"><Link to="/applications">All applications</Link></Button></div>,
  component: SolutionPage,
});

function SolutionPage() {
  const s = getSolution(Route.useLoaderData().slug)!;
  const recs = products.filter((p) => p.applications.some((a) => s.productApps.includes(a))).slice(0, 3);
  const cs = caseStudies.find((c) => c.slug === s.caseSlug)!;
  return (
    <>
      <PageHero eyebrow="Solution" title={s.title} intro={s.short} image={s.image} />
      <section className="container-x grid gap-10 py-16 lg:grid-cols-2">
        <Reveal className="rounded-2xl bg-surface p-8">
          <AlertTriangle className="h-8 w-8 text-accent" />
          <h2 className="mt-3 text-2xl font-extrabold text-navy">The common challenge</h2>
          <p className="mt-3 text-muted-foreground">{s.challenge}</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="text-2xl font-extrabold text-navy">Recommended solutions</h2>
          <ul className="mt-4 space-y-3">{s.solutions.map((x) => <li key={x} className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground"><Check className="h-3.5 w-3.5" /></span>{x}</li>)}</ul>
          <div className="mt-8 grid grid-cols-3 gap-3">{s.benefits.map((b) => <div key={b.label} className="rounded-xl bg-gradient-navy p-4 text-navy-foreground"><p className="font-display text-xl font-black text-accent">{b.value}</p><p className="text-xs text-navy-foreground/75">{b.label}</p></div>)}</div>
          <p className="mt-3 text-xs text-muted-foreground">*Indicative; depends on site conditions and engineering assessment.</p>
        </Reveal>
      </section>
      <section className="bg-surface py-16">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title="System process" />
          <ol className="mt-8 flex flex-col items-stretch gap-3 md:flex-row md:items-center">
            {s.process.map((p, i) => (
              <Fragment key={p}>
                <li className="flex-1 rounded-2xl bg-background p-5 text-center shadow-card"><span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span><p className="mt-2 font-semibold text-navy">{p}</p></li>
                {i < s.process.length - 1 && <ChevronRight className="mx-auto h-6 w-6 rotate-90 text-accent md:rotate-0" aria-hidden />}
              </Fragment>
            ))}
          </ol>
        </div>
      </section>
      <section className="container-x py-16">
        <SectionHeading eyebrow="Product suggestions" title="Suggested heat pumps" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{recs.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </section>
      <section className="container-x pb-8">
        <div className="grid overflow-hidden rounded-3xl bg-surface md:grid-cols-2">
          <img src={cs.image} alt={cs.title} loading="lazy" className="h-full min-h-64 w-full object-cover" />
          <div className="p-8">
            <span className="eyebrow">Case study</span>
            <h3 className="mt-2 text-2xl font-extrabold text-navy">{cs.title}, {cs.city}</h3>
            <p className="mt-1 text-sm font-semibold text-primary">{cs.product}</p>
            <p className="mt-4 text-sm"><b>Challenge:</b> {cs.challenge}</p>
            <p className="mt-2 text-sm"><b>Outcome:</b> {cs.outcome}</p>
            <Button asChild variant="cta" className="mt-6"><Link to="/quote">Get a quote for your project <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>
      <PartnerBanner />
    </>
  );
}
