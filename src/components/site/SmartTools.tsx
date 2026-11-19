import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Calculator, Gauge, Home, Info, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { FUELS, inr, payback, savings, sizeKw, type Fuel } from "@/lib/calc";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

const TOOLS = [
  { id: "wizard", title: "Heat Pump Selection Calculator", desc: "Get the right capacity for your building", icon: Home },
  { id: "savings", title: "Energy Savings Calculator", desc: "Estimate savings & carbon reduction", icon: PiggyBank },
  { id: "roi", title: "ROI Calculator", desc: "Know your payback period", icon: Gauge },
] as const;
type ToolId = (typeof TOOLS)[number]["id"];

function Field({ label, value, unit, min, max, step = 1, onChange }: { label: string; value: number; unit: string; min: number; max: number; step?: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm"><Label>{label}</Label><span className="font-bold text-navy">{value.toLocaleString("en-IN")} {unit}</span></div>
      <Slider className="mt-3" value={[value]} min={min} max={max} step={step} onValueChange={([v]) => v !== undefined && onChange(v)} aria-label={label} />
    </div>
  );
}

function Seg<T extends string>({ value, options, onChange, label }: { value: T; options: { v: T; l: string }[]; onChange: (v: T) => void; label: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button key={o.v} role="radio" aria-checked={value === o.v} onClick={() => onChange(o.v)}
            className={cn("rounded-full border px-3 py-1.5 text-sm font-medium transition", value === o.v ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary")}>{o.l}</button>
        ))}
      </div>
    </div>
  );
}

function Bars({ a, b }: { a: number; b: number }) {
  const max = Math.max(a, b, 1);
  return (
    <div className="mt-4 space-y-3">
      {[{ l: "Current system", v: a, c: "bg-muted-foreground/40" }, { l: "Adreco heat pump", v: b, c: "bg-accent" }].map((r) => (
        <div key={r.l}>
          <div className="flex justify-between text-xs"><span>{r.l}</span><span className="font-bold">{inr(r.v)}/yr</span></div>
          <div className="mt-1 h-3 overflow-hidden rounded-full bg-background/60"><div className={cn("h-full rounded-full transition-all duration-700", r.c)} style={{ width: `${(r.v / max) * 100}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

function Wizard() {
  const [type, setType] = useState<"home" | "hotel" | "hostel" | "hospital">("hotel");
  const [units, setUnits] = useState(40);
  const [climate, setClimate] = useState<"cold" | "moderate">("moderate");
  const [temp, setTemp] = useState(55);
  const perUnit = { home: 60, hotel: 120, hostel: 45, hospital: 150 }[type];
  const litres = units * perUnit;
  const kw = sizeKw(litres, temp, climate === "cold");
  const rec = products.filter((p) => (climate === "cold" ? p.coldClimate : true) && p.capacityKw[1] >= Math.min(kw, 60) && p.type !== "Swimming Pool" && p.type !== "Dryer").sort((a, b) => a.capacityKw[1] - b.capacityKw[1])[0] ?? products[4]!;
  const qty = Math.max(1, Math.ceil(kw / rec.capacityKw[1]));
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <Seg label="Building type" value={type} onChange={setType} options={[{ v: "home", l: "Home" }, { v: "hotel", l: "Hotel" }, { v: "hostel", l: "Hostel" }, { v: "hospital", l: "Hospital" }]} />
        <Field label={type === "home" ? "Occupants" : type === "hospital" ? "Beds" : type === "hotel" ? "Rooms" : "Students"} value={units} unit="" min={1} max={500} onChange={setUnits} />
        <Seg label="Climate" value={climate} onChange={setClimate} options={[{ v: "moderate", l: "Moderate / hot" }, { v: "cold", l: "Cold / mountain" }]} />
        <Field label="Target water temperature" value={temp} unit="°C" min={40} max={60} onChange={setTemp} />
      </div>
      <Result>
        <p className="text-sm text-navy-foreground/70">Estimated demand</p>
        <p className="text-3xl font-extrabold">{litres.toLocaleString("en-IN")} L/day</p>
        <p className="mt-4 text-sm text-navy-foreground/70">Recommended heating capacity</p>
        <p className="text-4xl font-extrabold text-accent">{kw.toFixed(1)} kW</p>
        <div className="mt-5 flex items-center gap-3 rounded-xl bg-primary-foreground/10 p-3">
          <img src={rec.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
          <div className="min-w-0 flex-1"><p className="truncate font-bold">{qty} × {rec.name}</p><p className="text-xs text-navy-foreground/70">{rec.model} · {rec.capacityKw[1]} kW each</p></div>
        </div>
        <Button asChild variant="cta" className="mt-5 w-full"><Link to="/products/$slug" params={{ slug: rec.slug }}>View recommended product</Link></Button>
      </Result>
    </div>
  );
}

function Savings({ onRoi }: { onRoi: (s: number) => void }) {
  const [litres, setLitres] = useState(1000);
  const [fuel, setFuel] = useState<Fuel>("diesel");
  const [fuelRate, setFuelRate] = useState<number>(FUELS.diesel.defaultRate);
  const [elec, setElec] = useState(8);
  const [cop, setCop] = useState(4);
  const r = useMemo(() => savings({ litres, inlet: 15, target: 55, fuel, fuelRate, elecRate: elec, cop }), [litres, fuel, fuelRate, elec, cop]);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <Field label="Hot water per day" value={litres} unit="L" min={100} max={20000} step={100} onChange={setLitres} />
        <Seg label="Current system" value={fuel} onChange={(f) => { setFuel(f); setFuelRate(FUELS[f].defaultRate); }} options={(Object.keys(FUELS) as Fuel[]).map((k) => ({ v: k, l: FUELS[k].label }))} />
        <Field label={`Fuel cost (per ${FUELS[fuel].unit})`} value={fuelRate} unit="₹" min={1} max={150} onChange={setFuelRate} />
        <Field label="Electricity tariff" value={elec} unit="₹/kWh" min={3} max={15} step={0.5} onChange={setElec} />
        <Field label="Assumed seasonal COP" value={cop} unit="" min={2.5} max={5} step={0.1} onChange={setCop} />
      </div>
      <Result>
        <p className="text-sm text-navy-foreground/70">Estimated annual savings</p>
        <p className="text-4xl font-extrabold text-accent">{inr(Math.max(0, r.annualSaving))}</p>
        <p className="mt-1 text-sm">≈ {Math.max(0, r.pct).toFixed(0)}% lower water-heating cost · {Math.max(0, r.co2Tonnes).toFixed(1)} t CO₂/yr avoided</p>
        <Bars a={r.annualCurrent} b={r.annualHp} />
        <Button variant="cta" className="mt-6 w-full" onClick={() => onRoi(Math.max(0, r.annualSaving))}><Calculator />Calculate payback</Button>
      </Result>
    </div>
  );
}

function Roi({ initialSaving }: { initialSaving: number }) {
  const [cost, setCost] = useState(450000);
  const [save, setSave] = useState(Math.round(initialSaving) || 180000);
  const [maint, setMaint] = useState(8000);
  const yrs = payback(cost, save, maint);
  const life = 12;
  const pts = Array.from({ length: life + 1 }, (_, y) => y * (save - maint) - cost);
  const min = Math.min(...pts), max = Math.max(...pts, 1);
  const W = 400, H = 160;
  const px = (i: number) => (i / life) * W, py = (v: number) => H - ((v - min) / (max - min || 1)) * H;
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <Field label="System cost (installed)" value={cost} unit="₹" min={50000} max={5000000} step={10000} onChange={setCost} />
        <Field label="Annual energy savings" value={save} unit="₹" min={10000} max={3000000} step={5000} onChange={setSave} />
        <Field label="Annual maintenance" value={maint} unit="₹" min={0} max={100000} step={1000} onChange={setMaint} />
      </div>
      <Result>
        <p className="text-sm text-navy-foreground/70">Estimated payback</p>
        <p className="text-4xl font-extrabold text-accent">{Number.isFinite(yrs) ? `${yrs.toFixed(1)} years` : "—"}</p>
        <p className="mt-1 text-sm">12-year net benefit: <b>{inr(pts[life] ?? 0)}</b></p>
        <svg viewBox={`0 0 ${W} ${H}`} className="mt-5 w-full" role="img" aria-label="Cumulative savings chart">
          <line x1="0" x2={W} y1={py(0)} y2={py(0)} className="stroke-primary-foreground/30" strokeDasharray="4 4" />
          <path d={pts.map((v, i) => `${i ? "L" : "M"}${px(i)},${py(v)}`).join(" ")} fill="none" strokeWidth="3" className="stroke-accent" />
        </svg>
        <p className="text-xs text-navy-foreground/60">Cumulative net position over 12-year design life</p>
      </Result>
    </div>
  );
}

function Result({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-navy p-6 text-navy-foreground">
      <div className="absolute inset-0 blueprint" />
      <div className="relative">{children}
        <p className="mt-4 flex gap-1.5 text-[11px] text-navy-foreground/60"><Info className="h-3.5 w-3.5 shrink-0" />Estimate only. Final results depend on site conditions and engineering assessment.</p>
      </div>
    </div>
  );
}

export function SmartTools({ initial = null }: { initial?: ToolId | null }) {
  const [tool, setTool] = useState<ToolId | null>(initial);
  const [roiSeed, setRoiSeed] = useState(0);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {TOOLS.map((t) => (
          <button key={t.id} onClick={() => setTool(tool === t.id ? null : t.id)} aria-pressed={tool === t.id} aria-controls="tool-panel"
            className={cn("group flex items-start gap-4 rounded-xl border bg-background p-5 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-lift", tool === t.id ? "border-accent" : "border-border")}>
            <t.icon className={cn("h-9 w-9 shrink-0 transition", tool === t.id ? "text-accent" : "text-primary")} strokeWidth={1.75} />
            <span className="min-w-0"><span className="block font-bold leading-snug text-navy">{t.title}</span><span className="mt-1 block text-sm text-foreground/70">{t.desc}</span>
              <span className="mt-3 inline-flex items-center gap-1 border-b border-accent text-sm font-semibold text-accent">{tool === t.id ? "Close" : "Calculate Now"} <ArrowRight className="h-3.5 w-3.5" /></span></span>
          </button>
        ))}
      </div>
      {tool && (
        <div id="tool-panel" className="mt-5 rounded-xl border bg-background p-5 shadow-card animate-fade-up md:p-7">
          {tool === "wizard" && <Wizard />}
          {tool === "savings" && <Savings onRoi={(s) => { setRoiSeed(s); setTool("roi"); }} />}
          {tool === "roi" && <Roi key={roiSeed} initialSaving={roiSeed} />}
        </div>
      )}
    </div>
  );
}

export function SmartToolsSection() {
  return (
    <section id="tools" className="border-b bg-surface py-10 md:py-12">
      <div className="container-x grid items-start gap-8 lg:grid-cols-[250px_minmax(0,1fr)] xl:gap-10">
        <div>
          <span className="eyebrow">Smart tools</span>
          <h2 className="mt-2 text-2xl font-extrabold leading-[1.15] text-navy md:text-[1.75rem]">Plan with Confidence</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/75">Use our online tools to find the right heat pump for your project.</p>
          <a href="#tool-cards" className="mt-5 inline-flex h-9 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground transition hover:brightness-105">Try Our Calculators <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div id="tool-cards" className="min-w-0"><SmartTools /></div>
      </div>
    </section>
  );
}
