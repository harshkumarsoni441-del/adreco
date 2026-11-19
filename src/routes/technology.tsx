import { createFileRoute } from "@tanstack/react-router";
import { Cpu, Gauge, Leaf, ShieldCheck, Snowflake, Wrench } from "lucide-react";
import { PageHero, Reveal, SectionHeading } from "@/components/site/Reveal";
import { PerformanceChart } from "@/components/site/PerformanceChart";
import { SmartTools } from "@/components/site/SmartTools";
import { PartnerBanner } from "@/components/site/Sections";
import cutaway from "@/assets/tech-cutaway.png";

export const Route = createFileRoute("/technology")({
  head: () => ({ meta: [
    { title: "Heat Pump Technology — How Adreco Works" },
    { name: "description", content: "How air source heat pumps deliver up to 5 kW of heat per 1 kW of electricity, with EVI, inverter and smart controls." },
    { property: "og:title", content: "Heat Pump Technology — Adreco" },
    { property: "og:description", content: "The engineering behind Adreco heat pumps." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Tech,
});

const steps = [
  { t: "Evaporate", d: "Refrigerant absorbs free heat from ambient air — even at -30°C." },
  { t: "Compress", d: "A heavy-duty scroll/EVI compressor raises gas temperature and pressure." },
  { t: "Condense", d: "A high-efficiency heat exchanger transfers heat to water." },
  { t: "Expand", d: "An electronic expansion valve precisely meters refrigerant back to the evaporator." },
];
const feats = [
  { i: Gauge, t: "High COP", d: "Up to 5 kW thermal per 1 kW electrical at rated conditions." },
  { i: Snowflake, t: "Cold-climate EVI", d: "Enhanced vapour injection and fast auto defrost." },
  { i: Cpu, t: "Intelligent controls", d: "PCB-based controls with error codes and one-time setup." },
  { i: Leaf, t: "Eco refrigerant", d: "R410A designed for cold climatic conditions." },
  { i: ShieldCheck, t: "Built-in protection", d: "Flow switch, high pressure and power-fluctuation protection." },
  { i: Wrench, t: "Low maintenance", d: "Negligible routine maintenance, up to 12-year life." },
];

function Tech() {
  return (
    <>
      <PageHero eyebrow="Our technology" title="The magic behind the heat pump" intro="Like a chilled bottle warming in a room, heat flows naturally — a heat pump simply moves it, efficiently, where you need it." />
      <section className="container-x grid items-center gap-12 py-16 lg:grid-cols-2">
        <Reveal><img src={cutaway} alt="Heat pump cutaway" className="w-full rounded-3xl" /></Reveal>
        <Reveal delay={100}>
          <SectionHeading eyebrow="Working principle" title="Four steps. Continuous heat." />
          <ol className="mt-6 space-y-4">{steps.map((s, i) => (
            <li key={s.t} className="flex gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-navy font-bold text-accent">{i + 1}</span><div><p className="font-bold text-navy">{s.t}</p><p className="text-sm text-muted-foreground">{s.d}</p></div></li>))}</ol>
        </Reveal>
      </section>
      <section className="bg-surface py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Advantages" title="Engineered for reliability" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{feats.map((f, i) => (
            <Reveal key={f.t} delay={i * 60} className="rounded-2xl bg-background p-6 shadow-card"><f.i className="h-8 w-8 text-accent" /><p className="mt-3 font-bold text-navy">{f.t}</p><p className="mt-1 text-sm text-muted-foreground">{f.d}</p></Reveal>))}</div>
        </div>
      </section>
      <section className="container-x grid gap-10 py-16 lg:grid-cols-2">
        <div><SectionHeading eyebrow="Cold climate" title="Performance when it matters" intro="EVI models retain significantly more output in sub-zero temperatures than standard air source heat pumps. Curves are indicative." /></div>
        <div className="rounded-2xl bg-surface p-6"><PerformanceChart light={false} /></div>
      </section>
      <section className="bg-surface py-16"><div className="container-x"><SectionHeading eyebrow="Smart tools" title="Plan with Confidence" /><div className="mt-8"><SmartTools /></div></div></section>
      <PartnerBanner />
    </>
  );
}
