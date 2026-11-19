import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setV(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={cn("reveal", v && "is-visible", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setV(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, v] as const;
}

export function Counter({ to, suffix = "", duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const [ref, v] = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!v) return;
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => { const p = Math.min(1, (t - t0) / duration); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [v, to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function SectionHeading({ eyebrow, title, intro, light, center }: { eyebrow: string; title: ReactNode; intro?: ReactNode; light?: boolean; center?: boolean }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className={cn("mt-3 text-3xl font-extrabold leading-tight md:text-4xl", light ? "text-navy-foreground" : "text-navy")}>{title}</h2>
      {intro && <p className={cn("mt-4 text-base leading-relaxed", light ? "text-navy-foreground/75" : "text-muted-foreground")}>{intro}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: ReactNode; intro?: ReactNode; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-navy text-navy-foreground">
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />}
      <div className="absolute inset-0 blueprint" />
      {image && <div className="absolute inset-0 bg-gradient-hero" />}
      <div className="container-x relative py-20 md:py-28">
        <span className="eyebrow animate-fade-up">{eyebrow}</span>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] md:text-6xl animate-fade-up" style={{ animationDelay: "80ms" }}>{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-navy-foreground/80 animate-fade-up" style={{ animationDelay: "160ms" }}>{intro}</p>}
      </div>
      <div className="h-1.5 bg-gradient-brand" />
    </section>
  );
}
