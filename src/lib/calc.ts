/** Estimation formulas for the Smart Tools. All results are indicative. */
export const KWH_PER_LITRE_DEG = 4.186 / 3600; // kWh to heat 1 L by 1°C

export const FUELS = {
  electric: { label: "Electric geyser", efficiency: 0.95, unit: "kWh", defaultRate: 8 },
  diesel: { label: "Diesel boiler", efficiency: 0.8, unit: "litre", kwhPerUnit: 10, defaultRate: 92 },
  lpg: { label: "LPG boiler", efficiency: 0.85, unit: "kg", kwhPerUnit: 12.8, defaultRate: 75 },
} as const;
export type Fuel = keyof typeof FUELS;

export function dailyHeatKwh(litres: number, inlet: number, target: number) {
  return Math.max(0, litres * (target - inlet) * KWH_PER_LITRE_DEG);
}

export function savings(opts: { litres: number; inlet: number; target: number; fuel: Fuel; fuelRate: number; elecRate: number; cop: number }) {
  const heat = dailyHeatKwh(opts.litres, opts.inlet, opts.target);
  const f = FUELS[opts.fuel];
  const currentDaily = "kwhPerUnit" in f ? (heat / f.efficiency / f.kwhPerUnit) * opts.fuelRate : (heat / f.efficiency) * opts.fuelRate;
  const hpDaily = (heat / opts.cop) * opts.elecRate;
  const annualCurrent = currentDaily * 365;
  const annualHp = hpDaily * 365;
  return {
    heat,
    annualCurrent,
    annualHp,
    annualSaving: annualCurrent - annualHp,
    pct: annualCurrent > 0 ? ((annualCurrent - annualHp) / annualCurrent) * 100 : 0,
    co2Tonnes: ((heat / f.efficiency) - heat / opts.cop) * 365 * 0.00071,
  };
}

export function payback(systemCost: number, annualSaving: number, maintenance = 0) {
  const net = annualSaving - maintenance;
  return net > 0 ? systemCost / net : Infinity;
}

export function sizeKw(litres: number, target: number, cold: boolean, hours = 8) {
  return (dailyHeatKwh(litres, 15, target) / hours) * (cold ? 1.3 : 1);
}

export const inr = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Math.round(n));
