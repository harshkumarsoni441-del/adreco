import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Leaf, ShieldCheck, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/products";
import { solutions } from "@/data/content";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/site/Reveal";
import { SplitSection } from "@/components/site/SplitSection";
import { SmartToolsSection } from "@/components/site/SmartTools";
import { ApplicationCard, PartnerBanner, ProjectsCarousel, TechnologySection } from "@/components/site/Sections";
import hero from "@/assets/hero-house.jpg";

const HERO_PROOF = [
  { i: Leaf, t: "Up to 80% Energy Efficient", d: "High COP — up to 5 kW heat from 1 kW electricity at rated conditions." },
  { i: Snowflake, t: "Reliable in Extreme Cold", d: "Enhanced vapour injection and fast auto defrost for deep-winter operation." },
  { i: ShieldCheck, t: "Long Life & Low Maintenance", d: "Negligible routine maintenance, up to 12-year life." },
];

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
  const { setAssessmentOpen } = useStore();
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
        <img src={hero} alt="Adreco air source heat pump installed beside a modern villa in the mountains" fetchPriority="high"
          className="absolute inset-0 -z-10 hidden h-full w-full object-cover object-[65%_center] lg:block" />
        <img src={hero} alt="" aria-hidden
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[90%_center] lg:hidden" />
        <div className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div className="container-x py-14 md:py-20 lg:py-[clamp(4rem,7vw,7rem)]">
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-accent animate-fade-up md:text-sm">Next generation heat pump technology</p>
          <h1 className="mt-3 max-w-2xl text-[clamp(2.1rem,8vw,3.75rem)] font-black leading-[1.08] lg:text-[clamp(2.1rem,7.5vw,4rem)]">
            <span className="block animate-fade-up">Smarter Heating.</span>
            <span className="block animate-fade-up text-accent" style={{ animationDelay: "100ms" }}>Lower Energy.</span>
            <span className="block animate-fade-up" style={{ animationDelay: "200ms" }}>Better Comfort.</span>
          </h1>
          <p className="mt-4 max-w-md text-base font-medium text-navy-foreground/90 animate-fade-up md:text-lg" style={{ animationDelay: "300ms" }}>
            High-performance air source heat pumps for residential, commercial and industrial applications.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "380ms" }}>
            <Button asChild variant="cta" className="rounded-full px-6 lg:h-11"><Link to="/shop">Explore Our Products <ArrowRight /></Link></Button>
            <Button variant="ghostLight" className="rounded-full px-6 lg:h-11" onClick={() => setAssessmentOpen(true)}><CalendarCheck />Get a Project Consultation</Button>
          </div>
        </div>
      </section>

      <section aria-label="Key advantages" className="border-b bg-background py-7 md:py-9">
        <div className="container-x grid gap-x-8 gap-y-5 sm:grid-cols-3 sm:gap-y-0">
          {HERO_PROOF.map(({ i: I, t, d }, i) => (
            <Reveal key={t} delay={i * 90} className="flex items-center gap-3.5 sm:border-l sm:border-border sm:px-6 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/12 text-accent ring-1 ring-accent/25"><I className="h-5 w-5" /></span>
              <span className="min-w-0">
                <span className="block text-sm font-extrabold leading-tight text-navy md:text-[0.95rem]">{t}</span>
                <span className="mt-1 block text-xs leading-snug text-foreground/70 md:text-[0.8rem]">{d}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <SplitSection tone="white" eyebrow="Our heat pump range" title={<>Engineered for<br className="hidden lg:block" /> Every Need</>} intro="From homes to industries, our advanced heat pump solutions deliver maximum efficiency and reliability." cta="View All Products" to="/shop">
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <Link to="/shop" search={{ type: c.type }} className="group flex h-full flex-col overflow-hidden rounded-xl border bg-surface transition hover:-translate-y-1 hover:shadow-lift">
                <div className="aspect-[4/3] overflow-hidden bg-background"><img src={c.image} alt={c.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-bold text-navy">{c.title}</h3>
                  <p className="mt-1 text-sm text-foreground/80">{c.range}</p>
                  <p className="text-sm text-foreground/80">{c.temp}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-bold text-primary">Learn More <ArrowRight className="h-3.5 w-3.5 text-accent transition group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </SplitSection>

      <SplitSection eyebrow="Solutions by application" title="Tailored Solutions for Every Sector" intro="Reliable, energy-efficient heating solutions for diverse applications." cta="Explore Applications" to="/applications">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {solutions.filter((s) => s.featured).slice(0, 5).map((s, i) => <Reveal key={s.slug} delay={i * 60}><ApplicationCard s={s} /></Reveal>)}
        </div>
      </SplitSection>

      <TechnologySection />

      <SmartToolsSection />

      <SplitSection tone="white" eyebrow="Our projects" title={<>Real Installations.<br className="hidden lg:block" /> Real Savings.</>} intro="Explore our successful projects across India’s diverse climates." cta="View Project Gallery" to="/projects">
        <ProjectsCarousel />
      </SplitSection>

      <PartnerBanner />
    </>
  );
}
