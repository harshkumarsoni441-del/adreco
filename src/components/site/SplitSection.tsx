import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** Shared home-page band: compact heading column on the left, content on the right (matches the reference layout). */
export function SplitSection({ eyebrow, title, intro, cta, to, onCta, tone = "light", children, id }: {
  eyebrow: string; title: ReactNode; intro: string; cta: string; to?: string; onCta?: () => void;
  tone?: "light" | "white" | "dark"; children: ReactNode; id?: string;
}) {
  const dark = tone === "dark";
  return (
    <section id={id} className={cn("relative overflow-hidden border-b py-9 md:py-12 xl:py-14", tone === "light" && "bg-surface", tone === "white" && "bg-background", dark && "border-transparent bg-gradient-navy text-navy-foreground")}>
      {dark && <div className="absolute inset-0 blueprint" />}
      <div className="container-x relative grid items-center gap-6 md:gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-12">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className={cn("mt-2 text-2xl font-extrabold leading-[1.15] md:text-[1.75rem]", dark ? "text-navy-foreground" : "text-navy")}>{title}</h2>
          <p className={cn("mt-3 text-sm leading-relaxed", dark ? "text-navy-foreground/80" : "text-foreground/75")}>{intro}</p>
          {to ? (
            <Button asChild variant="cta" size="sm" className="mt-5 rounded-full px-5"><Link to={to}>{cta} <ArrowRight /></Link></Button>
          ) : (
            <Button variant="cta" size="sm" className="mt-5 rounded-full px-5" onClick={onCta}>{cta} <ArrowRight /></Button>
          )}
        </Reveal>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
