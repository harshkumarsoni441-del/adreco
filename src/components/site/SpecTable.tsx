import type { Product } from "@/data/products";

export const specRows: { label: string; get: (p: Product) => string; best?: (ps: Product[]) => string | undefined }[] = [
  { label: "Model", get: (p) => p.model },
  { label: "Type", get: (p) => p.type },
  { label: "Heating capacity", get: (p) => `${p.capacityKw[0]} – ${p.capacityKw[1]} kW`, best: (ps) => ps.reduce((a, b) => (b.capacityKw[1] > a.capacityKw[1] ? b : a)).slug },
  { label: "Input power", get: (p) => `${p.inputKw} kW`, best: (ps) => ps.reduce((a, b) => (b.inputKw < a.inputKw ? b : a)).slug },
  { label: "COP (rated)", get: (p) => `${p.cop}`, best: (ps) => ps.reduce((a, b) => (b.cop > a.cop ? b : a)).slug },
  { label: "Max water outlet", get: (p) => `${p.maxWaterTemp}°C`, best: (ps) => ps.reduce((a, b) => (b.maxWaterTemp > a.maxWaterTemp ? b : a)).slug },
  { label: "Ambient working range", get: (p) => `${p.ambient[0]}°C to ${p.ambient[1]}°C`, best: (ps) => ps.reduce((a, b) => (b.ambient[0] < a.ambient[0] ? b : a)).slug },
  { label: "Refrigerant", get: (p) => p.refrigerant },
  { label: "Compressor", get: (p) => p.compressor },
  { label: "Noise level", get: (p) => `${p.noiseDb} dB(A)`, best: (ps) => ps.reduce((a, b) => (b.noiseDb < a.noiseDb ? b : a)).slug },
  { label: "Water circulation", get: (p) => (p.flowM3h ? `${p.flowM3h} m³/h` : "Air (dryer)") },
  { label: "Dimensions (L×W×H)", get: (p) => p.dimensions },
  { label: "Weight", get: (p) => `${p.weightKg} kg` },
];

export function SpecTable({ p }: { p: Product }) {
  return (
    <div className="overflow-x-auto rounded-2xl border">
      <table className="w-full min-w-[480px] text-sm">
        <tbody>
          {specRows.map((r, i) => (
            <tr key={r.label} className={i % 2 ? "bg-background" : "bg-surface"}>
              <th scope="row" className="w-1/2 px-4 py-3 text-left font-semibold text-muted-foreground">{r.label}</th>
              <td className="px-4 py-3 font-semibold text-navy">{r.get(p)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t bg-surface px-4 py-2 text-[11px] text-muted-foreground">Specifications are subject to change. For final parameters refer to the machine nameplate.</p>
    </div>
  );
}
