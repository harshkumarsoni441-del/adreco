import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { getProduct } from "@/data/products";

interface Item { slug: string; qty: number }
interface Store {
  items: Item[];
  count: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  compare: string[];
  toggleCompare: (slug: string) => void;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  advisorOpen: boolean;
  setAdvisorOpen: (v: boolean) => void;
  assessmentOpen: boolean;
  setAssessmentOpen: (v: boolean) => void;
}

const Ctx = createContext<Store | null>(null);
const KEY = "adreco-quote-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advisorOpen, setAdvisorOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        setItems(d.items ?? []);
        setCompare(d.compare ?? []);
      }
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify({ items, compare }));
  }, [items, compare, ready]);

  const add = (slug: string, qty = 1) => {
    setItems((prev) => {
      const ex = prev.find((i) => i.slug === slug);
      return ex ? prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i)) : [...prev, { slug, qty }];
    });
    const p = getProduct(slug);
    toast.success("Added to quote", { description: p?.name, action: { label: "View", onClick: () => setDrawerOpen(true) } });
  };
  const setQty = (slug: string, qty: number) =>
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i)));
  const remove = (slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug));
  const clear = () => setItems([]);
  const toggleCompare = (slug: string) =>
    setCompare((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) {
        toast.error("You can compare up to 3 products");
        return prev;
      }
      toast("Added to comparison");
      return [...prev, slug];
    });

  return (
    <Ctx.Provider
      value={{
        items, count: items.reduce((a, i) => a + i.qty, 0), add, setQty, remove, clear,
        compare, toggleCompare, drawerOpen, setDrawerOpen, advisorOpen, setAdvisorOpen, assessmentOpen, setAssessmentOpen,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore must be used within StoreProvider");
  return c;
}
