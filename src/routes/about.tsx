import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Handshake, MapPin, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Reveal, SectionHeading } from "@/components/site/Reveal";
import { useStore } from "@/lib/store";
import residential from "@/assets/p-residential.jpg";
import heroImg from "@/assets/s-pool.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Adreco Engineering — Heat Pump Specialists Since 2018" },
    { name: "description", content: "Adreco is an Indian heat pump company bridging the gap between quality heat pumps, practical system design, service and budget." },
    { property: "og:title", content: "About Adreco Engineering" },
    { property: "og:description", content: "Engineering-driven, sustainable heat pump solutions since 2018." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: About,
});

function About() {
  const { setAssessmentOpen } = useStore();
  return (
    <>
      <PageHero eyebrow="About us" title="Engineering-driven. Built for India." intro="Developing sustainable heating, ventilation and cooling technology since 2018." image={heroImg} />
      <section className="container-x grid items-center gap-12 py-16 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow="Our story" title="Bridging quality, design and budget" />
          <div className="mt-5 space-y-4 text-muted-foreground">
            <p>Adreco™ is a heat pump company driven by research and development, designing energy-efficient heat pumps for hot water generation, pool heating and space heating.</p>
            <p>We studied India’s diverse geography to design systems that perform anywhere — from the bone-chilling mountains of Ladakh to the hot and humid south and the wettest Northeast.</p>
            <p>Too many heat pumps fail because they’re poorly sized for climate and site. Adreco bridges the gap between top-quality equipment, practical system design, dependable service and a pocket-friendly budget.</p>
          </div>
        </Reveal>
        <Reveal delay={100}><img src={residential} alt="Adreco heat pump unit" className="w-full rounded-3xl shadow-lift" /></Reveal>
      </section>
      <section className="bg-surface py-16">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[{ i: Compass, t: "Vision", d: "Top-quality solutions and services at reasonable cost, accessible to the remotest locations of our country." },
            { i: Target, t: "Mission", d: "Consistent product innovation based on R&D, customer feedback and hands-on experience." }].map((x) => (
            <Reveal key={x.t} className="rounded-2xl bg-gradient-navy p-8 text-navy-foreground"><x.i className="h-9 w-9 text-accent" /><h3 className="mt-4 text-2xl font-extrabold">{x.t}</h3><p className="mt-2 text-navy-foreground/80">{x.d}</p></Reveal>))}
        </div>
      </section>
      <section className="container-x grid gap-10 py-16 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Service coverage" title="Across India" intro="Headquartered in Chandigarh with installation and service partners nationwide." />
          <div className="mt-6 flex flex-wrap gap-2">{["Ladakh", "J&K", "Himachal", "Punjab", "Delhi NCR", "Uttarakhand", "Maharashtra", "Karnataka", "Northeast", "Gujarat"].map((r) => <span key={r} className="flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-sm font-semibold text-navy"><MapPin className="h-3.5 w-3.5 text-accent" />{r}</span>)}</div>
        </div>
        <div className="rounded-3xl bg-surface p-8">
          <Handshake className="h-9 w-9 text-accent" />
          <h3 className="mt-3 text-2xl font-extrabold text-navy">Become a dealer or partner</h3>
          <p className="mt-2 text-muted-foreground">Join our authorised dealer network and bring efficient heating to your region.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Button asChild variant="cta"><Link to="/contact">Dealer enquiry</Link></Button><Button variant="soft" onClick={() => setAssessmentOpen(true)}>Book a Site Assessment</Button></div>
        </div>
      </section>
    </>
  );
}
