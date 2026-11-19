import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowRight, BedDouble, Check, ChevronLeft, ChevronRight, Droplets, Factory, GraduationCap, Home, Hospital, Phone, ThermometerSun, Utensils, Waves, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { caseStudies, solutions } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";
import { PerformanceChart } from "./PerformanceChart";
import cutaway from "@/assets/tech-cutaway.png";

export const ICONS: Record<string, typeof Home> = { BedDouble, Hospital, GraduationCap, Factory, Home, Waves, Droplets, ThermometerSun, Wind, Utensils };

export function ApplicationCard({ s }: { s: (typeof solutions)[number] }) {
  const I = ICONS[s.icon] ?? Home;
  return (
    <Link to="/applications/$slug" params={{ slug: s.slug }} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-card">
      <img src={s.image} alt={s.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-navy-foreground">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-accent transition group-hover:scale-110"><I className="h-5 w-5" /></span>
        <p className="mt-3 font-bold leading-tight">{s.title}</p>
        <p className="mt-1 max-h-0 overflow-hidden text-xs text-navy-foreground/80 transition-all duration-300 group-hover:max-h-10">{s.short}</p>
      </div>
    </Link>
  );
}

export function TechnologySection() {
  const benefits = ["High COP and energy efficiency", "Intelligent PCB-based controls", "Inverter technology", "Eco-friendly R410A refrigerant", "Precision electronic expansion valve", "Tube-in-shell high-efficiency heat exchanger"];
  return (
    <section className="relative overflow-hidden bg-gradient-navy py-20 text-navy-foreground md:py-28">
      <div className="absolute inset-0 blueprint" />
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary-glow/30 blur-3xl float-slow" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <SectionHeading light eyebrow="Our Technology" title="Advanced Heat Pump Technology" intro="Extracts free heat from air as cold as -30°C and multiplies it — up to 5 kW of thermal energy for every 1 kW of electricity." />
          <img src={cutaway} alt="Cutaway view of an Adreco heat pump showing compressor and copper refrigerant circuit" loading="lazy" className="mt-8 w-full max-w-lg rounded-2xl float-slow" />
        </Reveal>
        <Reveal delay={150} className="space-y-8">
          <ul className="grid gap-3 sm:grid-cols-2">
            {benefits.map((b) => <li key={b} className="flex items-start gap-3 rounded-xl bg-primary-foreground/5 p-3 text-sm"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent"><Check className="h-3.5 w-3.5" /></span>{b}</li>)}
          </ul>
          <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5 backdrop-blur">
            <p className="mb-3 font-bold">Performance in Cold Climate</p>
            <PerformanceChart />
          </div>
          <Button asChild variant="cta" size="lg"><Link to="/technology">Explore Our Technology <ArrowRight /></Link></Button>
        </Reveal>
      </div>
    </section>
  );
}

export function ProjectsCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * 340, behavior: "smooth" });
  return (
    <div className="relative">
      <div ref={ref} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none]">
        {caseStudies.map((c) => (
          <article key={c.slug} className="group w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl bg-background shadow-card md:w-[360px]">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={c.image} alt={`${c.title}, ${c.city}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{c.sector}</span>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-navy">{c.title}, {c.city}</h3>
              <p className="mt-1 text-xs font-semibold text-primary">{c.product}</p>
              <p className="mt-3 text-sm"><b className="text-navy">Challenge:</b> <span className="text-muted-foreground">{c.challenge}</span></p>
              <p className="mt-1 text-sm"><b className="text-navy">Outcome:</b> <span className="text-muted-foreground">{c.outcome}</span></p>
              <Link to="/projects" hash={c.slug} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">View Case Study <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => scroll(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border bg-background hover:border-accent hover:text-accent"><ChevronLeft /></button>
        <button onClick={() => scroll(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full border bg-background hover:border-accent hover:text-accent"><ChevronRight /></button>
      </div>
    </div>
  );
}

export function PartnerBanner() {
  return (
    <section className="container-x py-16">
      <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-navy p-8 text-navy-foreground md:p-12">
        <div className="absolute inset-0 blueprint" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">Partner with Adreco Engineering</h2>
            <p className="mt-2 text-navy-foreground/75">Let’s build a sustainable and energy-efficient future together.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="cta" size="lg"><Link to="/contact">Get in Touch <ArrowRight /></Link></Button>
            <a href="tel:+919916844503" className="flex items-center gap-2 rounded-full border border-primary-foreground/20 px-5 py-3 font-semibold hover:border-accent"><Phone className="h-4 w-4" />+91 99168 44503</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
