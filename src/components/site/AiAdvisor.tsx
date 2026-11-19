import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { getRecommendation, type AdvisorInput, type AdvisorResult } from "@/services/api";
import { cn } from "@/lib/utils";

type Key = keyof AdvisorInput;
const STEPS: { key: Key; q: string; options?: string[]; numeric?: { placeholder: string; unit: string } }[] = [
  { key: "property", q: "What type of property or industry is this for?", options: ["Home / villa", "Hotel / resort", "Hospital", "School / hostel", "Industry / factory", "Swimming pool"] },
  { key: "climate", q: "Which climate best describes the site?", options: ["Cold / Himalayan", "Moderate", "Hot & humid", "Wet / Northeast"] },
  { key: "demand", q: "Roughly how much hot water is needed daily?", numeric: { placeholder: "e.g. 500", unit: "litres/day" } },
  { key: "temp", q: "Desired water temperature?", options: ["45", "55", "60", "75"] },
  { key: "source", q: "What heats your water today?", options: ["Electric geyser", "Diesel / LPG", "Solar + electric", "New project"] },
  { key: "budget", q: "Indicative budget range?", options: ["Under ₹2 L", "₹2–10 L", "₹10–50 L", "₹50 L+"] },
];
const SUGGESTED = ["Which heat pump is right for my hotel?", "Can it work in -7°C?", "Estimate savings for my home", "I need 500 litres of hot water daily"];

interface Msg { from: "bot" | "user"; text: string }

export function AiAdvisor() {
  const { advisorOpen, setAdvisorOpen, add, setAssessmentOpen } = useStore();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [step, setStep] = useState(-1);
  const [ans, setAns] = useState<Partial<AdvisorInput>>({});
  const [num, setNum] = useState("");
  const [typing, setTyping] = useState(false);
  const [result, setResult] = useState<AdvisorResult | null>(null);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing, result]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setAdvisorOpen(false);
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [setAdvisorOpen]);

  const bot = (text: string) => new Promise<void>((r) => { setTyping(true); setTimeout(() => { setTyping(false); setMsgs((m) => [...m, { from: "bot", text }]); r(); }, 550); });

  const start = async (prompt?: string) => {
    setResult(null); setAns({});
    setMsgs(prompt ? [{ from: "user", text: prompt }] : []);
    const pre: Partial<AdvisorInput> = {};
    if (prompt?.includes("hotel")) pre.property = "Hotel / resort";
    if (prompt?.includes("-7")) pre.climate = "Cold / Himalayan";
    if (prompt?.includes("home")) pre.property = "Home / villa";
    if (prompt?.includes("500")) pre.demand = 500;
    if (prompt?.includes("-7")) await bot("Yes — Adreco commercial units operate down to -7°C and EVI models down to -25°C. Let's size one for you.");
    else await bot("Happy to help. I'll ask a few quick questions to suggest the right heat pump.");
    setAns(pre);
    next(-1, pre);
  };

  const next = async (cur: number, a: Partial<AdvisorInput>) => {
    let n = cur + 1;
    while (n < STEPS.length && a[STEPS[n].key] !== undefined) n++;
    if (n >= STEPS.length) {
      setStep(STEPS.length); setTyping(true);
      const r = await getRecommendation(a as AdvisorInput);
      setTyping(false); setResult(r); return;
    }
    setStep(n); await bot(STEPS[n].q);
  };

  const answer = (val: string) => {
    const s = STEPS[step];
    const v = s.key === "demand" || s.key === "temp" ? Number(val) : val;
    if (s.key === "demand" && (!v || Number(v) <= 0)) return;
    const a = { ...ans, [s.key]: v };
    setAns(a); setNum("");
    setMsgs((m) => [...m, { from: "user", text: s.numeric ? `${val} ${s.numeric.unit}` : s.key === "temp" ? `${val}°C` : val }]);
    next(step, a);
  };

  const cur = step >= 0 && step < STEPS.length ? STEPS[step] : null;

  return (
    <>
      <button onClick={() => { setAdvisorOpen(true); if (!msgs.length) setStep(-1); }}
        className="fixed bottom-20 right-4 z-30 flex items-center gap-2 rounded-full bg-gradient-navy px-4 py-3 font-semibold text-navy-foreground shadow-lift transition hover:-translate-y-0.5 md:bottom-6 md:right-6"
        aria-label="Ask Adreco AI">
        <span className="relative grid h-7 w-7 place-items-center rounded-full bg-accent"><Sparkles className="h-4 w-4" /><span className="absolute inset-0 animate-ping rounded-full bg-accent/40" /></span>
        <span className="hidden sm:inline">Ask Adreco AI</span>
      </button>

      {advisorOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-navy/40 backdrop-blur-sm sm:p-6" onClick={() => setAdvisorOpen(false)}>
          <div role="dialog" aria-modal="true" aria-label="Ask Adreco AI" onClick={(e) => e.stopPropagation()}
            className="flex h-[88vh] w-full flex-col overflow-hidden rounded-t-3xl bg-background shadow-lift animate-fade-up sm:h-[640px] sm:max-w-md sm:rounded-3xl">
            <div className="flex items-center gap-3 bg-gradient-navy p-4 text-navy-foreground">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent"><Bot className="h-5 w-5" /></span>
              <div className="min-w-0 flex-1"><p className="font-bold">Ask Adreco AI</p><p className="text-xs text-navy-foreground/70">Heat pump advisor · indicative</p></div>
              <button onClick={() => setAdvisorOpen(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full hover:bg-primary-foreground/10"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto bg-surface p-4">
              {step === -1 && msgs.length === 0 && (
                <div>
                  <p className="rounded-2xl rounded-tl-sm bg-background p-3 text-sm shadow-card">Hi! I can recommend a heat pump category and size for your project. Try a question:</p>
                  <div className="mt-3 grid gap-2">
                    {SUGGESTED.map((s) => <button key={s} onClick={() => start(s)} className="rounded-xl border border-primary/20 bg-background px-3 py-2 text-left text-sm font-medium text-primary transition hover:border-accent hover:text-accent">{s}</button>)}
                    <button onClick={() => start()} className="text-sm font-semibold text-muted-foreground underline">Start guided recommendation</button>
                  </div>
                </div>
              )}
              {msgs.map((m, i) => (
                <div key={i} className={cn("flex", m.from === "user" && "justify-end")}>
                  <p className={cn("max-w-[85%] rounded-2xl p-3 text-sm animate-fade-up", m.from === "bot" ? "rounded-tl-sm bg-background shadow-card" : "rounded-tr-sm bg-primary text-primary-foreground")}>{m.text}</p>
                </div>
              ))}
              {typing && <div className="flex w-16 gap-1 rounded-2xl bg-background p-3 shadow-card">{[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-primary/50" style={{ animationDelay: `${d * 120}ms` }} />)}</div>}
              {result && (
                <div className="animate-fade-up rounded-2xl border-2 border-accent/40 bg-background p-4 shadow-card">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">Recommendation</p>
                  <p className="mt-1 text-lg font-bold text-navy">{result.category}</p>
                  <p className="text-sm text-muted-foreground">Approx. capacity <b className="text-foreground">{result.capacity}</b></p>
                  <ul className="mt-3 space-y-1 text-sm">{result.benefits.map((b) => <li key={b}>• {b}</li>)}</ul>
                  <div className="mt-3 space-y-2">
                    {result.products.slice(0, 2).map((p) => (
                      <div key={p.slug} className="flex items-center gap-2 rounded-xl bg-surface p-2">
                        <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                        <Link to="/products/$slug" params={{ slug: p.slug }} onClick={() => setAdvisorOpen(false)} className="min-w-0 flex-1 truncate text-sm font-semibold text-navy hover:text-accent">{p.name}</Link>
                        <Button size="sm" variant="soft" onClick={() => add(p.slug)}>Add</Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="cta" className="mt-4 w-full" onClick={() => { setAdvisorOpen(false); setAssessmentOpen(true); }}>Request Expert Review</Button>
                  <p className="mt-3 text-[11px] text-muted-foreground">AI recommendation is indicative; final sizing requires an engineering assessment.</p>
                  <button onClick={() => start()} className="mt-2 text-xs font-semibold text-primary underline">Start over</button>
                </div>
              )}
              <div ref={end} />
            </div>
            <div className="border-t bg-background p-3">
              {cur?.options && !typing && (
                <div className="flex flex-wrap gap-2">
                  {cur.options.map((o) => <button key={o} onClick={() => answer(o)} className="rounded-full border border-primary/25 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground">{cur.key === "temp" ? `${o}°C` : o}</button>)}
                </div>
              )}
              {cur?.numeric && !typing && (
                <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); answer(num); }}>
                  <label htmlFor="adv-num" className="sr-only">{cur.q}</label>
                  <input id="adv-num" autoFocus type="number" min={1} value={num} onChange={(e) => setNum(e.target.value)} placeholder={cur.numeric.placeholder}
                    className="h-11 flex-1 rounded-full border bg-surface px-4 text-sm focus:border-accent focus:outline-none" />
                  <Button variant="cta" size="icon" className="h-11 w-11" aria-label="Send"><Send /></Button>
                </form>
              )}
              {!cur && <p className="text-center text-[11px] text-muted-foreground">Indicative guidance only · ready to connect to a live AI service</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
