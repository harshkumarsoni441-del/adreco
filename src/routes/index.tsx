import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Leaf, Plus, ShieldCheck, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/data/products";
import { solutions } from "@/data/content";
import { useStore } from "@/lib/store";
import { Counter, Reveal, SectionHeading } from "@/components/site/Reveal";
import { SmartTools } from "@/components/site/SmartTools";
import { ApplicationCard, PartnerBanner, ProjectsCarousel, TechnologySection } from "@/components/site/Sections";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adreco Heat Pump — Smarter Heating, Lower Energy" },
      { name: "description", content: "Air source heat pumps for homes, hotels, hospitals and industry. Up to 80% energy efficient and reliable down to -25°C." },
      { property: "og:title", content: "Adreco Heat Pump — Smarter Heating, Lower Energy" },
      { property: "og:description", content: "High-performance air source heat pumps engineered for every Indian climate." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { add, setAssessmentOpen } = useStore();
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
        <img src={hero} alt="Adreco air source heat pump installed beside a modern mountain home" className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover object-[70%_center]" />
        <div className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div className="absolute inset-0 -z-10 blueprint opacity-60" />
        <div className="container-x py-24 md:py-36">
          <span className="eyebrow animate-fade-up">Next generation heat pump technology</span>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[1.02] md:text-7xl">
            <span className="block animate-fade-up" style={{ animationDelay: "60ms" }}>Smarter Heating.</span>
            <span className="block animate-fade-up text-accent" style={{ animationDelay: "160ms" }}>Lower Energy.</span>
            <span className="block animate-fade-up" style={{ animationDelay: "260ms" }}>Better Comfort.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy-foreground/85 animate-fade-up" style={{ animationDelay: "360ms" }}>
            High-performance air source heat pumps for residential, commercial and industrial applications — engineered for India’s every climate.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "440ms" }}>
            <Button asChild variant="cta" size="lg"><Link to="/shop">Explore Products <ArrowRight /></Link></Button>
            <Button variant="ghostLight" size="lg" onClick={() => setAssessmentOpen(true)}><CalendarCheck />Get a Project Consultation</Button>
          </div>
          <ul className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3 animate-fade-up" style={{ animationDelay: "540ms" }}>
            {[{ i: Leaf, t: "Up to 80% Energy Efficient" }, { i: Snowflake, t: "Reliable in Extreme Cold" }, { i: ShieldCheck, t: "Long Life & Low Maintenance" }].map(({ i: I, t }) => (
              <li key={t} className="flex items-center gap-3 rounded-xl border border-primary-foreground/15 bg-navy/40 p-3 text-sm font-semibold backdrop-blur">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-primary-foreground/30"><I className="h-4 w-4" /></span>{t}
              </li>
            ))}
          </ul>
        </div>
        <div className="h-1.5 bg-gradient-brand" />
      </section>

      {/* Stats */}
      <section className="border-b bg-surface">
        <div className="container-x grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {[{ n: 80, s: "%", l: "Max. energy efficiency*" }, { n: 30, s: "°C", l: "Operates down to minus" }, { n: 12, s: " yrs", l: "Equipment design life" }, { n: 5, s: "×", l: "Heat output per kW input" }].map((x) => (
            <div key={x.l}><p className="font-display text-3xl font-black text-navy md:text-4xl"><Counter to={x.n} suffix={x.s} /></p><p className="mt-1 text-sm text-muted-foreground">{x.l}</p></div>
          ))}
        </div>
      </section>

      {/* Product range */}
      <section className="container-x py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <Reveal>
            <SectionHeading eyebrow="Our heat pump range" title="Engineered for Every Need" intro="From homes to industries, our heat pumps deliver maximum efficiency and reliability — sized by engineers, not guesswork." />
            <Button asChild variant="cta" className="mt-6"><Link to="/shop">View All Products <ArrowRight /></Link></Button>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((c, i) => {
              const first = products.find((p) => p.type === c.type)!;
              return (
                <Reveal key={c.title} delay={i * 90}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                    <div className="aspect-square overflow-hidden"><img src={c.image} alt={c.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-bold text-navy">{c.title}</h3>
                      <p className="mt-2 text-sm font-semibold">{c.range}</p>
                      <p className="text-sm text-muted-foreground">{c.temp}</p>
                      <div className="mt-auto flex items-center justify-between gap-2 pt-5">
                        <Link to="/shop" search={{ type: c.type }} className="inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn More <ArrowRight className="h-4 w-4 text-accent transition group-hover:translate-x-1" /></Link>
                        <Button size="sm" variant="soft" onClick={() => add(first.slug)} aria-label={`Add ${c.title} to quote`}><Plus />Quote</Button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal><SectionHeading eyebrow="Solutions by application" title="Tailored Solutions for Every Sector" intro="Reliable, energy-efficient heating solutions for diverse applications." /></Reveal>
            <Button asChild variant="cta"><Link to="/applications">Explore Applications <ArrowRight /></Link></Button>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {solutions.filter((s) => s.featured).map((s, i) => <Reveal key={s.slug} delay={i * 70}><ApplicationCard s={s} /></Reveal>)}
          </div>
        </div>
      </section>

      <TechnologySection />

      {/* Smart tools */}
      <section id="tools" className="bg-surface py-20 md:py-28">
        <div className="container-x">
          <Reveal><SectionHeading eyebrow="Smart tools" title="Plan with Confidence" intro="Size your system, estimate savings and see your payback — in under a minute." /></Reveal>
          <div className="mt-10"><SmartTools /></div>
        </div>
      </section>

      {/* Projects */}
      <section className="container-x py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <Reveal>
            <SectionHeading eyebrow="Our projects" title="Real Installations. Real Savings." intro="Explore successful projects across India’s diverse climates." />
            <Button asChild variant="cta" className="mt-6"><Link to="/projects">View Project Gallery <ArrowRight /></Link></Button>
          </Reveal>
          <div className="min-w-0"><ProjectsCarousel /></div>
        </div>
      </section>

      <PartnerBanner />
      <p className="container-x pb-10 text-xs text-muted-foreground">*Efficiency and savings figures are indicative. Final results depend on site conditions and engineering assessment.</p>
    </>
  );
}
