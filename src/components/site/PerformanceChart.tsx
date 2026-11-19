import { useInView } from "./Reveal";

/** Indicative heating output (% of rated) across ambient temperatures. */
const data = [
  { t: -20, evi: 62, std: 38 }, { t: -15, evi: 70, std: 48 }, { t: -10, evi: 77, std: 58 },
  { t: -5, evi: 84, std: 68 }, { t: 0, evi: 90, std: 78 }, { t: 5, evi: 96, std: 88 }, { t: 10, evi: 100, std: 96 },
];

export function PerformanceChart({ light = true }: { light?: boolean }) {
  const [ref, v] = useInView<HTMLDivElement>();
  const W = 420, H = 220, P = 32;
  const x = (t: number) => P + ((t + 20) / 30) * (W - P * 2);
  const y = (val: number) => H - P - (val / 100) * (H - P * 2);
  const path = (k: "evi" | "std") => data.map((d, i) => `${i ? "L" : "M"}${x(d.t)},${y(d[k])}`).join(" ");
  const txt = light ? "fill-navy-foreground/60" : "fill-muted-foreground";
  return (
    <div ref={ref} className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Heating output vs ambient temperature chart">
        {[0, 25, 50, 75, 100].map((g) => (
          <g key={g}>
            <line x1={P} x2={W - P} y1={y(g)} y2={y(g)} className={light ? "stroke-primary-foreground/10" : "stroke-border"} />
            <text x={P - 6} y={y(g) + 4} textAnchor="end" className={`${txt} text-[10px]`}>{g}</text>
          </g>
        ))}
        {data.map((d) => <text key={d.t} x={x(d.t)} y={H - 10} textAnchor="middle" className={`${txt} text-[10px]`}>{d.t}°C</text>)}
        {v && <>
          <path d={path("std")} fill="none" strokeWidth="2.5" strokeDasharray="5 5" className="stroke-primary-glow" />
          <path d={path("evi")} fill="none" strokeWidth="3.5" strokeLinecap="round" className="draw-line stroke-accent" />
          {data.map((d) => <circle key={d.t} cx={x(d.t)} cy={y(d.evi)} r="4" className="fill-accent animate-fade-up" />)}
        </>}
      </svg>
      <div className={`mt-2 flex gap-5 text-xs ${light ? "text-navy-foreground/70" : "text-muted-foreground"}`}>
        <span className="flex items-center gap-2"><span className="h-1 w-5 rounded bg-accent" />Adreco EVI</span>
        <span className="flex items-center gap-2"><span className="h-1 w-5 rounded bg-primary-glow" />Standard ASHP</span>
        <span className="ml-auto">% of rated output · indicative</span>
      </div>
    </div>
  );
}
