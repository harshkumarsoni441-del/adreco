import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getProduct } from "@/data/products";
import { useStore } from "@/lib/store";
import { submitQuote } from "@/services/api";
import { PageHero } from "@/components/site/Reveal";

export const Route = createFileRoute("/quote")({
  head: () => ({ meta: [
    { title: "Request a Quote — Adreco Heat Pump" },
    { name: "description", content: "Request a tailored quotation for Adreco heat pumps for your home, hotel, hospital or industry." },
    { property: "og:title", content: "Request a Quote — Adreco Heat Pump" },
    { property: "og:description", content: "Get a tailored heat pump quotation from Adreco engineers." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Quote,
});

const PROJECTS = ["Residential", "Hotel / resort", "Hospital", "Education", "Industrial", "Swimming pool", "Other"];

function Quote() {
  const { items, setQty, remove, clear } = useStore();
  const [errors, setErrors] = useState<{ [k: string]: string | undefined; projectType?: string }>({});
  const [busy, setBusy] = useState(false);
  const [projectType, setProjectType] = useState("");
  const [callTime, setCallTime] = useState("");
  const [ref, setRef] = useState<string | null>(null);

  if (ref) return (
    <section className="container-x py-24 text-center">
      <div className="mx-auto max-w-lg animate-fade-up rounded-3xl bg-surface p-10 shadow-card">
        <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
        <h1 className="mt-5 text-3xl font-extrabold text-navy">Your quote request has been prepared.</h1>
        <p className="mt-3 text-muted-foreground">Reference <b className="text-navy">{ref}</b>. An Adreco engineer will contact you within one business day. (Demo — no data was sent.)</p>
        <div className="mt-8 flex justify-center gap-3"><Button asChild variant="cta"><Link to="/shop">Continue browsing</Link></Button><Button asChild variant="soft"><Link to="/">Home</Link></Button></div>
      </div>
    </section>
  );

  return (
    <>
      <PageHero eyebrow="B2B quotation" title="Request a Quote" intro="Tell us about your project. We’ll size the system and send a detailed techno-commercial offer." />
      <section className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_400px]">
        <form noValidate className="grid gap-5 rounded-2xl bg-surface p-6 md:p-8" onSubmit={async (e) => {
          e.preventDefault();
          const fd = Object.fromEntries(new FormData(e.currentTarget)) as { [k: string]: string } as any;
          const er: { [k: string]: string } & { name?: string; phone?: string; email?: string; city?: string; projectType?: string } = {};
          if (!fd.name?.trim()) er.name = "Please enter your name";
          if (!/^[+\d\s-]{8,}$/.test(fd.phone ?? "")) er.phone = "Enter a valid phone number";
          if (!/^\S+@\S+\.\S+$/.test(fd.email ?? "")) er.email = "Enter a valid email";
          if (!fd.city?.trim()) er.city = "Please enter your city";
          if (!projectType) er.projectType = "Select a project type";
          setErrors(er);
          if (Object.keys(er).length) { toast.error("Please fix the highlighted fields"); return; }
          setBusy(true);
          const r = await submitQuote({ name: fd.name, company: fd.company, phone: fd.phone, email: fd.email, city: fd.city, projectType, message: fd.message, callTime, items });
          setBusy(false); clear(); setRef(r.reference); window.scrollTo({ top: 0 });
        }}>
          <div className="grid gap-5 sm:grid-cols-2">
            {[["name", "Name *", "text"], ["company", "Company", "text"], ["phone", "Phone *", "tel"], ["email", "Email *", "email"], ["city", "City *", "text"]].map(([n, l, t]) => (
              <div key={n} className="grid gap-1.5">
                <Label htmlFor={`q-${n}`}>{l}</Label>
                <Input id={`q-${n}`} name={n} type={t} aria-invalid={!!errors[n!]} className="bg-background" />
                {errors[n!] && <p className="text-xs text-destructive">{errors[n!]}</p>}
              </div>
            ))}
            <div className="grid gap-1.5">
              <Label>Project type *</Label>
              <Select value={projectType} onValueChange={setProjectType}><SelectTrigger className="bg-background" aria-label="Project type"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>{PROJECTS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent></Select>
              {errors.projectType && <p className="text-xs text-destructive">{errors.projectType}</p>}
            </div>
            <div className="grid gap-1.5 sm:col-span-2">
              <Label>Preferred call time</Label>
              <div className="flex flex-wrap gap-2">{["Morning", "Afternoon", "Evening"].map((t) => (
                <button type="button" key={t} onClick={() => setCallTime(t)} aria-pressed={callTime === t} className={`rounded-full border px-4 py-2 text-sm ${callTime === t ? "border-primary bg-primary text-primary-foreground" : "bg-background"}`}>{t}</button>))}</div>
            </div>
          </div>
          <div className="grid gap-1.5"><Label htmlFor="q-message">Message</Label><Textarea id="q-message" name="message" rows={4} className="bg-background" placeholder="Daily hot water demand, building size, current system…" /></div>
          <Button variant="cta" size="lg" disabled={busy}>{busy ? "Preparing request…" : "Submit Quote Request"}</Button>
        </form>
        <aside>
          <div className="sticky top-24 rounded-2xl border p-6">
            <h2 className="text-lg font-bold text-navy">Selected products</h2>
            {items.length === 0 ? <p className="mt-3 text-sm text-muted-foreground">No products added — that’s fine, our engineers can recommend one. <Link to="/shop" className="font-semibold text-primary underline">Browse products</Link></p> : (
              <ul className="mt-4 space-y-3">{items.map((i) => { const p = getProduct(i.slug); return p && (
                <li key={i.slug} className="flex items-center gap-3">
                  <img src={p.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-navy">{p.name}</p><p className="text-xs text-muted-foreground">{p.model}</p></div>
                  <div className="flex items-center gap-1"><button type="button" aria-label="Decrease" onClick={() => setQty(i.slug, i.qty - 1)}><Minus className="h-3.5 w-3.5" /></button><span className="w-5 text-center text-sm font-bold">{i.qty}</span><button type="button" aria-label="Increase" onClick={() => setQty(i.slug, i.qty + 1)}><Plus className="h-3.5 w-3.5" /></button></div>
                  <button type="button" aria-label="Remove" onClick={() => remove(i.slug)}><Trash2 className="h-4 w-4 text-muted-foreground" /></button>
                </li>); })}</ul>
            )}
          </div>
        </aside>
      </section>
    </>
  );
}
