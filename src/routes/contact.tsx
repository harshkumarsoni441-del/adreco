import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarCheck, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/site/Reveal";
import { useStore } from "@/lib/store";
import { submitContact } from "@/services/api";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact Adreco Engineering — Talk to a Heat Pump Expert" },
    { name: "description", content: "Contact Adreco Engineering in Chandigarh for heat pump quotes, dealer enquiries and site assessments." },
    { property: "og:title", content: "Contact Adreco Engineering" },
    { property: "og:description", content: "Talk to a heat pump expert." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Contact,
});

function Contact() {
  const { setAssessmentOpen } = useStore();
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s talk about your project" intro="Engineers, not call centres. Expect a response within one business day." />
      <section className="container-x grid gap-10 py-14 lg:grid-cols-[1fr_380px]">
        <div className="rounded-2xl bg-surface p-6 md:p-8">
          {sent ? (
            <div className="py-10 text-center"><CheckCircle2 className="mx-auto h-14 w-14 text-success" /><h2 className="mt-4 text-2xl font-bold text-navy">Message received</h2><p className="mt-2 text-muted-foreground">We’ll be in touch shortly. (Demo — nothing was sent.)</p><Button variant="soft" className="mt-6" onClick={() => setSent(false)}>Send another</Button></div>
          ) : (
            <form className="grid gap-5" onSubmit={async (e) => {
              e.preventDefault(); const fd = Object.fromEntries(new FormData(e.currentTarget)) as { [k: string]: string } as any;
              if (!fd.name || !/^\S+@\S+\.\S+$/.test(fd.email)) { toast.error("Name and a valid email are required"); return; }
              setBusy(true); await submitContact(fd); setBusy(false); setSent(true);
            }}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-1.5"><Label htmlFor="c-name">Name *</Label><Input id="c-name" name="name" className="bg-background" /></div>
                <div className="grid gap-1.5"><Label htmlFor="c-email">Email *</Label><Input id="c-email" name="email" type="email" className="bg-background" /></div>
                <div className="grid gap-1.5"><Label htmlFor="c-phone">Phone</Label><Input id="c-phone" name="phone" type="tel" className="bg-background" /></div>
                <div className="grid gap-1.5"><Label htmlFor="c-subject">Subject</Label><Input id="c-subject" name="subject" placeholder="Quote, dealer enquiry, service…" className="bg-background" /></div>
              </div>
              <div className="grid gap-1.5"><Label htmlFor="c-msg">Message</Label><Textarea id="c-msg" name="message" rows={5} className="bg-background" /></div>
              <Button variant="cta" size="lg" disabled={busy}>{busy ? "Sending…" : "Send Message"}</Button>
            </form>
          )}
        </div>
        <aside className="space-y-5">
          <div className="rounded-2xl bg-gradient-navy p-6 text-navy-foreground">
            <h2 className="text-lg font-bold">Adreco Engineering Pvt. Ltd.</h2>
            <ul className="mt-4 space-y-3 text-sm text-navy-foreground/85">
              <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-accent" />Plot #10, Chandigarh Industrial Area, Phase‑2, Chandigarh 160002</li>
              <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-accent" />+91 99168 44503 · 0172 3104716</li>
              <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-accent" />info@adreco.in</li>
            </ul>
            <Button variant="cta" className="mt-6 w-full" onClick={() => setAssessmentOpen(true)}><CalendarCheck />Book a Site Assessment</Button>
          </div>
          <div className="grid aspect-[4/3] place-items-center rounded-2xl bg-surface blueprint text-center">
            <div><MapPin className="mx-auto h-8 w-8 text-accent" /><p className="mt-2 font-semibold text-navy">Map placeholder</p><p className="text-xs text-muted-foreground">Chandigarh Industrial Area</p></div>
          </div>
        </aside>
      </section>
    </>
  );
}
