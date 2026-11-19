import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Logo } from "./Logo";

const cols = [
  { h: "Products", l: [["Air Source Heat Pumps", "/shop"], ["Heat Pump Water Heaters", "/shop"], ["Commercial Solutions", "/shop"], ["Compare Products", "/compare"]] },
  { h: "Company", l: [["About Us", "/about"], ["Projects", "/projects"], ["Technology", "/technology"]] },
  { h: "Resources", l: [["Brochures", "/resources"], ["Technical Docs", "/resources"], ["FAQ", "/resources"]] },
] as const;

const social = [
  { I: Linkedin, l: "LinkedIn", href: "https://www.linkedin.com/" },
  { I: Youtube, l: "YouTube", href: "https://www.youtube.com/" },
  { I: Instagram, l: "Instagram", href: "https://www.instagram.com/" },
  { I: Facebook, l: "Facebook", href: "https://www.facebook.com/" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-navy-foreground">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-7 py-9 sm:grid-cols-3 lg:grid-cols-[1.3fr_1fr_0.8fr_0.8fr_1.2fr_0.8fr] lg:gap-6 lg:py-10">
        <div className="col-span-2 border-b border-primary-foreground/10 pb-6 sm:col-span-3 lg:col-span-1 lg:border-0 lg:pb-0">
          <Logo light />
          <p className="mt-4 text-sm text-navy-foreground/80">Engineering Today. A Greener Tomorrow.</p>
        </div>
        {cols.map((c) => (
          <div key={c.h} className="lg:border-l lg:border-primary-foreground/10 lg:pl-6">
            <h3 className="text-sm font-bold">{c.h}</h3>
            <ul className="mt-3 space-y-2 text-sm text-navy-foreground/75">
              {c.l.map(([t, to]) => <li key={t}><Link to={to} className="transition hover:text-accent">{t}</Link></li>)}
            </ul>
          </div>
        ))}
        <div className="lg:order-last lg:border-l lg:border-primary-foreground/10 lg:pl-6">
          <h3 className="text-sm font-bold">Follow Us</h3>
          <div className="mt-3 flex gap-2">
            {social.map(({ I, l, href }) => (
              <a key={l} href={href} target="_blank" rel="noopener noreferrer" aria-label={l} className="grid h-8 w-8 place-items-center rounded-md bg-primary-foreground/10 transition hover:bg-accent"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div className="col-span-2 sm:col-span-2 lg:col-span-1 lg:border-l lg:border-primary-foreground/10 lg:pl-6">
          <h3 className="text-sm font-bold">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-navy-foreground/75">
            <li><a href="mailto:info@adreco.in" className="flex gap-2 hover:text-accent"><Mail className="h-4 w-4 shrink-0" />info@adreco.in</a></li>
            <li><a href="tel:+919916844503" className="flex gap-2 hover:text-accent"><Phone className="h-4 w-4 shrink-0" />+91 99168 44503</a></li>
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />Industrial Area Phase‑2, Chandigarh</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 pb-20 pt-4 text-xs text-navy-foreground/70 md:flex-row md:pb-4">
          <span className="text-center">© 2026 Adreco Engineering Pvt. Ltd. All Rights Reserved.</span>
          <div className="flex gap-4"><Link to="/contact" className="hover:text-accent">Privacy Policy</Link><span aria-hidden>|</span><Link to="/contact" className="hover:text-accent">Terms &amp; Conditions</Link></div>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-24 -right-24 hidden h-40 w-40 rounded-full border-[10px] border-accent/80 xl:block" aria-hidden />
    </footer>
  );
}
