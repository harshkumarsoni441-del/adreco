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
          <ul className="mt-8 grid max-w-xl gap-3 animate-fade-up sm:flex sm:gap-0 sm:divide-x sm:divide-primary-foreground/20 lg:mt-9" style={{ animationDelay: "460ms" }}>
            {[{ i: Leaf, t: "Up to 80% Energy Efficient" }, { i: Snowflake, t: "Reliable in Extreme Cold" }, { i: ShieldCheck, t: "Long Life & Low Maintenance" }].map(({ i: I, t }) => (
              <li key={t} className="flex items-center gap-3 py-1 text-xs font-semibold leading-tight sm:px-4 sm:text-sm sm:first:pl-0 lg:gap-2 lg:py-0">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-primary-foreground/40"><I className="h-4 w-4" /></span>
                <span className="sm:max-w-[7rem]">{t}</span>
              </li>
            ))}
          </ul>
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
