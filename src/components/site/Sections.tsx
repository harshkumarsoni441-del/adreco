import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowRight, BedDouble, Check, ChevronLeft, ChevronRight, Droplets, Factory, GraduationCap, Handshake, Home, Hospital, Phone, ThermometerSun, Utensils, Waves, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { caseStudies, solutions } from "@/data/content";
import { Reveal } from "./Reveal";
import { PerformanceChart } from "./PerformanceChart";
import cutaway from "@/assets/tech-cutaway.png";

export const ICONS: Record<string, typeof Home> = { BedDouble, Hospital, GraduationCap, Factory, Home, Waves, Droplets, ThermometerSun, Wind, Utensils };

export function ApplicationCard({ s }: { s: (typeof solutions)[number] }) {
  const I = ICONS[s.icon] ?? Home;
  return (
    <Link to="/applications/$slug" params={{ slug: s.slug }} className="group relative block aspect-[5/6] overflow-hidden rounded-lg">
      <img src={s.image} alt={s.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center p-3 text-center text-navy-foreground">
        <I className="h-6 w-6 transition group-hover:-translate-y-0.5 group-hover:text-accent" />
        <p className="mt-2 text-xs font-bold leading-tight sm:text-sm">{s.title}</p>
      </div>
    </Link>
  );
}

export function TechnologySection() {
  const benefits = ["High COP & Energy Efficiency", "Low Ambient Operation (up to -30°C)", "Inverter Technology", "Eco-Friendly Refrigerant"];
  return (
    <section className="relative overflow-hidden bg-gradient-navy py-10 text-navy-foreground md:py-12">
      <div className="absolute inset-0 blueprint" />
      <div className="container-x relative grid items-center gap-8 md:grid-cols-2 lg:grid-cols-[230px_1fr_1fr_1.2fr]">
        <Reveal>
          <span className="eyebrow">Our technology</span>
          <h2 className="mt-2 text-2xl font-extrabold leading-[1.15] md:text-[1.75rem]">Advanced Heat Pump Technology</h2>
          <p className="mt-3 text-sm text-navy-foreground/80">A smart and efficient way to heat, even in extreme conditions.</p>
          <Button asChild variant="cta" size="sm" className="mt-5 rounded-full px-5"><Link to="/technology">Learn More About Technology <ArrowRight /></Link></Button>
        </Reveal>
        <Reveal delay={80}><img src={cutaway} alt="Cutaway view of an Adreco heat pump showing compressor and copper refrigerant circuit" loading="lazy" className="mx-auto w-full max-w-xs rounded-xl" /></Reveal>
        <Reveal delay={140}>
          <ul className="space-y-4">
            {benefits.map((b) => <li key={b} className="flex items-start gap-3 text-sm"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent"><Check className="h-3 w-3" /></span>{b}</li>)}
          </ul>
        </Reveal>
        <Reveal delay={200} className="rounded-xl border border-primary-foreground/15 bg-navy/60 p-4">
          <p className="mb-2 text-sm font-bold">Performance in Cold Climate</p>
          <PerformanceChart />
        </Reveal>
      </div>
    </section>
  );
}

export function ProjectsCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * 300, behavior: "smooth" });
  const arrow = "absolute top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border bg-background text-navy shadow-card transition hover:border-accent hover:text-accent";
  return (
    <div className="relative px-5">
      <button onClick={() => scroll(-1)} aria-label="Previous projects" className={`${arrow} left-0`}><ChevronLeft className="h-4 w-4" /></button>
      <div ref={ref} className="flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none]">
        {caseStudies.map((c) => (
          <Link key={c.slug} to="/projects" hash={c.slug} className="group relative aspect-[16/9] w-[78%] shrink-0 snap-start overflow-hidden rounded-lg sm:w-[calc((100%-1.5rem)/3)]">
            <img src={c.image} alt={`${c.title}, ${c.city}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-3 text-navy-foreground">
              <p className="text-sm font-bold">{c.title}</p>
              <p className="text-xs text-navy-foreground/80">{c.city}</p>
            </div>
          </Link>
        ))}
      </div>
      <button onClick={() => scroll(1)} aria-label="Next projects" className={`${arrow} right-0`}><ChevronRight className="h-4 w-4" /></button>
    </div>
  );
}

export function PartnerBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-navy text-navy-foreground">
      <div className="absolute inset-0 blueprint" />
      <div className="container-x relative flex flex-col items-start justify-between gap-5 py-6 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-foreground/10"><Handshake className="h-6 w-6 text-accent" /></span>
          <div>
            <h2 className="text-xl font-extrabold md:text-2xl">Partner with Adreco Engineering</h2>
            <p className="text-sm text-navy-foreground/80">Let’s build a sustainable and energy-efficient future together.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="cta" className="rounded-full px-6"><Link to="/contact">Get in Touch <ArrowRight /></Link></Button>
          <a href="tel:+919916844503" className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-5 py-2.5 text-sm font-semibold transition hover:bg-primary-foreground/20"><Phone className="h-4 w-4" />+91 99168 44503</a>
        </div>
      </div>
    </section>
  );
}
