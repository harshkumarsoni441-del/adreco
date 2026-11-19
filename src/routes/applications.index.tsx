import { createFileRoute } from "@tanstack/react-router";
import { solutions } from "@/data/content";
import { PageHero, Reveal } from "@/components/site/Reveal";
import { ApplicationCard } from "@/components/site/Sections";
import hotel from "@/assets/s-hotel.jpg";

export const Route = createFileRoute("/applications/")({
  head: () => ({ meta: [
    { title: "Heat Pump Applications & Solutions — Adreco" },
    { name: "description", content: "Heat pump solutions for hotels, hospitals, schools, industries, homes, pools, drying and food processing." },
    { property: "og:title", content: "Heat Pump Applications — Adreco" },
    { property: "og:description", content: "Tailored heat pump solutions for every sector." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => (
    <>
      <PageHero eyebrow="Solutions by application" title="Tailored Solutions for Every Sector" intro="Practical system design for hot water, space heating, pool heating and industrial drying." image={hotel} />
      <section className="container-x grid grid-cols-2 gap-5 py-14 md:grid-cols-3 lg:grid-cols-5">
        {solutions.map((s, i) => <Reveal key={s.slug} delay={i * 50}><ApplicationCard s={s} /></Reveal>)}
      </section>
    </>
  ),
});
