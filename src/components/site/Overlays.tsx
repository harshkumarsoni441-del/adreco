import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, GitCompare, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/lib/store";
import { getProduct } from "@/data/products";
import { submitContact } from "@/services/api";

export function QuoteDrawer() {
  const { items, drawerOpen, setDrawerOpen, setQty, remove } = useStore();
  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-navy">Your Quote Cart</SheetTitle>
          <SheetDescription>Add products and request a tailored quotation.</SheetDescription>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary"><ShoppingBag className="h-7 w-7 text-primary" /></div>
            <p className="mt-4 font-semibold text-navy">Your quote cart is empty</p>
            <p className="mt-1 text-sm text-muted-foreground">Browse products and tap “Add to Quote”.</p>
            <Button asChild variant="navy" className="mt-6"><Link to="/shop" onClick={() => setDrawerOpen(false)}>Browse products</Link></Button>
          </div>
        ) : (
          <>
            <ul className="-mx-2 flex-1 space-y-3 overflow-y-auto px-2 py-2">
              {items.map((i) => {
                const p = getProduct(i.slug); if (!p) return null;
                return (
                  <li key={i.slug} className="flex gap-3 rounded-xl bg-surface p-3">
                    <img src={p.image} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-navy">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.model} · {p.capacityKw[1]} kW</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button aria-label="Decrease" onClick={() => setQty(i.slug, i.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full bg-background"><Minus className="h-3 w-3" /></button>
                        <span className="w-6 text-center text-sm font-bold">{i.qty}</span>
                        <button aria-label="Increase" onClick={() => setQty(i.slug, i.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full bg-background"><Plus className="h-3 w-3" /></button>
                      </div>
                    </div>
                    <button aria-label="Remove" onClick={() => remove(i.slug)} className="self-start text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </li>
                );
              })}
            </ul>
            <div className="border-t pt-4">
              <p className="mb-3 text-xs text-muted-foreground">Final pricing depends on site conditions and engineering assessment.</p>
              <Button asChild variant="cta" size="lg" className="w-full"><Link to="/quote" onClick={() => setDrawerOpen(false)}>Request Quote</Link></Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function CompareBar() {
  const { compare, toggleCompare } = useStore();
  if (compare.length === 0) return null;
  return (
    <div className="fixed bottom-20 left-1/2 z-30 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 animate-fade-up rounded-2xl bg-navy p-3 text-navy-foreground shadow-lift md:bottom-6">
      <div className="flex items-center gap-3">
        <GitCompare className="h-5 w-5 shrink-0 text-accent" />
        <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto">
          {compare.map((s) => { const p = getProduct(s); return p && (
            <span key={s} className="flex shrink-0 items-center gap-1 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold">
              {p.model}<button aria-label={`Remove ${p.model}`} onClick={() => toggleCompare(s)}><X className="h-3 w-3" /></button>
            </span>); })}
        </div>
        <Button asChild variant="cta" size="sm"><Link to="/compare">Compare ({compare.length})</Link></Button>
      </div>
    </div>
  );
}

export function MobileQuoteBar() {
  const { count, setDrawerOpen } = useStore();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t bg-background/95 p-3 backdrop-blur md:hidden">
      <Button variant="soft" className="flex-1" onClick={() => setDrawerOpen(true)}><ShoppingBag />Cart ({count})</Button>
      <Button asChild variant="cta" className="flex-1"><Link to="/quote">Get Quote</Link></Button>
    </div>
  );
}

export function AssessmentDialog() {
  const { assessmentOpen, setAssessmentOpen } = useStore();
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  return (
    <Dialog open={assessmentOpen} onOpenChange={(v) => { setAssessmentOpen(v); if (!v) setDone(false); }}>
      <DialogContent className="sm:max-w-lg">
        {done ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
            <h3 className="mt-4 text-xl font-bold text-navy">Site assessment requested</h3>
            <p className="mt-2 text-sm text-muted-foreground">An Adreco engineer will call you to schedule a visit. (Demo — nothing was sent.)</p>
            <Button variant="navy" className="mt-6" onClick={() => setAssessmentOpen(false)}>Done</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-navy">Book a Site Assessment</DialogTitle>
              <DialogDescription>Our engineers assess climate, load and site conditions before sizing.</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4" onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              if (!fd.get("name") || !fd.get("phone")) return toast.error("Name and phone are required");
              setBusy(true); await submitContact(Object.fromEntries(fd) as Record<string, string>); setBusy(false); setDone(true);
            }}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5"><Label htmlFor="sa-name">Name *</Label><Input id="sa-name" name="name" /></div>
                <div className="grid gap-1.5"><Label htmlFor="sa-phone">Phone *</Label><Input id="sa-phone" name="phone" type="tel" /></div>
                <div className="grid gap-1.5"><Label htmlFor="sa-city">City</Label><Input id="sa-city" name="city" /></div>
                <div className="grid gap-1.5"><Label htmlFor="sa-date">Preferred date</Label><Input id="sa-date" name="date" type="date" /></div>
              </div>
              <div className="grid gap-1.5"><Label htmlFor="sa-msg">Site details</Label><Textarea id="sa-msg" name="message" placeholder="Building type, hot water needs, current system…" /></div>
              <Button variant="cta" size="lg" disabled={busy}>{busy ? "Booking…" : "Book Assessment"}</Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
