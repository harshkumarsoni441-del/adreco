import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { subscribeNewsletter } from "@/services/api";

export function Footer() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const cols = [
    { h: "Products", l: [["Domestic Heat Pumps", "/shop"], ["Commercial Heat Pumps", "/shop"], ["EVI Heat Pumps", "/shop"], ["Pool Heat Pumps", "/shop"], ["Compare", "/compare"]] },
    { h: "Company", l: [["About Us", "/about"], ["Projects", "/projects"], ["Technology", "/technology"], ["Contact", "/contact"]] },
    { h: "Resources", l: [["Brochures", "/resources"], ["Technical Docs", "/resources"], ["Installation Guides", "/resources"], ["FAQ", "/resources"]] },
  ] as const;
  return (
    <footer className="relative overflow-hidden bg-navy text-navy-foreground">
      <div className="h-1.5 bg-gradient-brand" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm text-navy-foreground/70">Engineering today. A greener tomorrow. Practical heat pump system design for every climate in India — from Ladakh to the Northeast.</p>
          <div className="mt-6 flex gap-2">
            {[Linkedin, Youtube, Instagram, Facebook].map((I, i) => (
              <a key={i} href="#" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/15 transition hover:border-accent hover:text-accent"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <h3 className="text-sm font-bold uppercase tracking-widest">{c.h}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/70">
              {c.l.map(([t, to]) => <li key={t}><Link to={to} className="hover:text-accent">{t}</Link></li>)}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/70">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />Plot #10, Industrial Area Phase‑2, Chandigarh 160002</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0" />+91 99168 44503</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0" />info@adreco.in</li>
          </ul>
          <form className="mt-6 flex gap-2" onSubmit={async (e) => {
            e.preventDefault();
            if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Enter a valid email");
            setBusy(true); await subscribeNewsletter(email); setBusy(false); setEmail("");
            toast.success("Subscribed to Adreco insights");
          }}>
            <label htmlFor="nl" className="sr-only">Email</label>
            <input id="nl" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email"
              className="h-10 min-w-0 flex-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-4 text-sm placeholder:text-navy-foreground/50 focus:border-accent focus:outline-none" />
            <Button variant="cta" disabled={busy}>{busy ? "…" : "Join"}</Button>
          </form>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-navy-foreground/60 md:flex-row">
          <span>© 2026 Adreco Engineering Pvt. Ltd. All rights reserved.</span>
          <div className="flex gap-5"><a href="#" className="hover:text-accent">Privacy Policy</a><a href="#" className="hover:text-accent">Terms & Conditions</a></div>
        </div>
      </div>
    </footer>
  );
}
