/**
 * Mock service layer. Every function mirrors a future backend endpoint.
 * Swap the bodies for real fetch/server-function calls when a backend is added.
 */
import { products, type Product } from "@/data/products";

const wait = (ms = 700) => new Promise((r) => setTimeout(r, ms));

export interface QuoteRequest {
  name: string; company?: string; phone: string; email: string; city: string;
  projectType: string; message?: string; callTime?: string;
  items: { slug: string; qty: number }[];
}

export async function submitQuote(req: QuoteRequest) {
  await wait();
  return { ok: true, reference: `ADR-${Date.now().toString().slice(-6)}`, received: req };
}

export async function submitContact(_data: Record<string, string>) {
  await wait();
  return { ok: true };
}

export async function subscribeNewsletter(_email: string) {
  await wait(400);
  return { ok: true };
}

export async function listProducts(): Promise<Product[]> {
  return products;
}

/** AI advisor — currently rule-based on the client. Replace with an AI endpoint later. */
export interface AdvisorInput {
  property: string; climate: string; demand: number; temp: number; source: string; budget: string;
}
export interface AdvisorResult {
  category: string; capacity: string; products: Product[]; benefits: string[];
}
export async function getRecommendation(i: AdvisorInput): Promise<AdvisorResult> {
  await wait(900);
  const cold = i.climate === "Cold / Himalayan";
  let type: Product["type"] = "Commercial";
  if (i.property === "Swimming pool") type = "Swimming Pool";
  else if (i.property === "Industry / factory") type = i.temp > 60 ? "High Temperature" : "Commercial";
  else if (i.property === "Home / villa") type = cold ? "Domestic" : "Water Heater";
  else if (cold) type = "EVI";
  // litres/day -> kW: heat litres by ΔT over ~8h
  const dT = Math.max(20, i.temp - 15);
  const kw = Math.max(3, Math.round(((i.demand * 4.186 * dT) / 3600 / 8) * (cold ? 1.3 : 1)));
  const lo = Math.max(2, Math.round(kw * 0.85)), hi = Math.round(kw * 1.2);
  const matches = products.filter((p) => p.type === type);
  return {
    category: `${type} Heat Pump`,
    capacity: `${lo} – ${hi} kW`,
    products: matches.length ? matches : products.slice(0, 2),
    benefits: [
      `Estimated ${i.source === "Diesel / LPG" ? "65–75%" : "55–70%"} lower heating cost vs ${i.source.toLowerCase()}`,
      cold ? "Cold-climate operation with fast auto defrost" : "Stable output across Indian summers and monsoons",
      `Outlet water up to ${Math.min(type === "High Temperature" ? 80 : 60, Math.max(i.temp, 40))}°C`,
    ],
  };
}
