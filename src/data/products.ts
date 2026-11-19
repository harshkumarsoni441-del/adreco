/**
 * Demo product catalogue — mock data only.
 * Replace with an API/database source later via src/services/api.ts.
 * Values are indicative and based on Adreco brochure ranges; final parameters depend on site assessment.
 */
import residential from "@/assets/p-residential.jpg";
import commercial from "@/assets/p-commercial.jpg";
import industrial from "@/assets/p-industrial.jpg";
import water from "@/assets/p-water.jpg";
import pool from "@/assets/p-pool.jpg";
import cutaway from "@/assets/tech-cutaway.png";

export type ProductType =
  | "Domestic"
  | "Commercial"
  | "EVI"
  | "Swimming Pool"
  | "High Temperature"
  | "Dryer"
  | "Water Heater";

export type Application =
  | "Residential"
  | "Hotels"
  | "Hospitals"
  | "Education"
  | "Industrial"
  | "Pools"
  | "Food Processing";

export interface Product {
  slug: string;
  name: string;
  model: string;
  type: ProductType;
  applications: Application[];
  capacityKw: [number, number];
  ambient: [number, number];
  maxWaterTemp: number;
  cop: number;
  coldClimate: boolean;
  refrigerant: string;
  compressor: string;
  noiseDb: number;
  inputKw: number;
  flowM3h: number;
  dimensions: string;
  weightKg: number;
  priceFrom?: number; // demo only, residential
  newness: number; // higher = newer
  image: string;
  gallery: string[];
  tagline: string;
  highlight: string;
  features: string[];
  bestFor: string;
}

const g = (main: string) => [main, cutaway, main];

export const products: Product[] = [
  {
    slug: "adreco-domestic-dhp-3",
    name: "Domestic Heat Pump",
    model: "ARC/DHP/03",
    type: "Domestic",
    applications: ["Residential"],
    capacityKw: [3, 3.6],
    ambient: [-25, 45],
    maxWaterTemp: 60,
    cop: 4.2,
    coldClimate: true,
    refrigerant: "R410A",
    compressor: "Panasonic Rotary",
    noiseDb: 48,
    inputKw: 0.78,
    flowM3h: 0.6,
    dimensions: "800 × 320 × 560 mm",
    weightKg: 52,
    priceFrom: 89000,
    newness: 7,
    image: residential,
    gallery: g(residential),
    tagline: "Quiet, compact hot water for homes up to 4 bathrooms.",
    highlight: "Built-in circulation pump",
    features: ["Built-in circulation pump", "Tube-in-shell exchanger avoids scaling", "Auto defrost", "Inverter option"],
    bestFor: "Best for homes & villas",
  },
  {
    slug: "adreco-domestic-inverter-6",
    name: "Inverter Domestic Heat Pump",
    model: "ARC/DHP/06-INV",
    type: "Domestic",
    applications: ["Residential"],
    capacityKw: [5, 7.2],
    ambient: [-25, 45],
    maxWaterTemp: 60,
    cop: 4.6,
    coldClimate: true,
    refrigerant: "R410A",
    compressor: "Panasonic DC Inverter",
    noiseDb: 45,
    inputKw: 1.4,
    flowM3h: 1.2,
    dimensions: "960 × 360 × 700 mm",
    weightKg: 68,
    priceFrom: 145000,
    newness: 10,
    image: residential,
    gallery: g(residential),
    tagline: "Variable-speed efficiency for large villas and apartments.",
    highlight: "DC inverter, COP up to 4.6",
    features: ["DC inverter compressor", "Wi‑Fi ready controller", "Ultra-low noise", "Auto defrost"],
    bestFor: "Best for premium villas",
  },
  {
    slug: "adreco-water-heater-300",
    name: "Heat Pump Water Heater 300L",
    model: "ARC/HPWH/300",
    type: "Water Heater",
    applications: ["Residential", "Hotels"],
    capacityKw: [2.5, 3.5],
    ambient: [-10, 43],
    maxWaterTemp: 60,
    cop: 3.8,
    coldClimate: false,
    refrigerant: "R410A",
    compressor: "GREE Rotary",
    noiseDb: 46,
    inputKw: 0.85,
    flowM3h: 0.5,
    dimensions: "Ø600 × 1850 mm + outdoor unit",
    weightKg: 95,
    priceFrom: 119000,
    newness: 6,
    image: water,
    gallery: g(water),
    tagline: "Integrated 200–500 L storage with split outdoor unit.",
    highlight: "200–500 L tank options",
    features: ["SS 304 storage tank", "Split installation", "Smart timer", "Legionella cycle"],
    bestFor: "Best for families & boutique stays",
  },
  {
    slug: "adreco-commercial-chp-12",
    name: "Commercial Heat Pump",
    model: "ARC/CHP/12",
    type: "Commercial",
    applications: ["Hotels", "Hospitals", "Education"],
    capacityKw: [12, 14],
    ambient: [-7, 43],
    maxWaterTemp: 60,
    cop: 4.1,
    coldClimate: false,
    refrigerant: "R410A",
    compressor: "Copeland Scroll",
    noiseDb: 58,
    inputKw: 3.1,
    flowM3h: 2.4,
    dimensions: "1080 × 450 × 1100 mm",
    weightKg: 145,
    newness: 5,
    image: commercial,
    gallery: g(commercial),
    tagline: "Reliable central hot water for hostels, clinics and mid-size hotels.",
    highlight: "Hot & cold water capable",
    features: ["Copeland / Panasonic / GREE scroll", "Electronic expansion valve", "Tube-in-shell exchanger", "Auto defrost"],
    bestFor: "Best for hotel hot water",
  },
  {
    slug: "adreco-commercial-chp-40",
    name: "Commercial Heat Pump 40",
    model: "ARC/CHP/40",
    type: "Commercial",
    applications: ["Hotels", "Hospitals", "Education"],
    capacityKw: [38, 42],
    ambient: [-7, 43],
    maxWaterTemp: 60,
    cop: 4.0,
    coldClimate: false,
    refrigerant: "R410A",
    compressor: "Copeland Scroll ×2",
    noiseDb: 64,
    inputKw: 9.8,
    flowM3h: 7.2,
    dimensions: "1705 × 1005 × 1230 mm",
    weightKg: 370,
    newness: 8,
    image: commercial,
    gallery: g(commercial),
    tagline: "Twin-compressor capacity for large hotels and hospitals.",
    highlight: "Dual compressor redundancy",
    features: ["Dual scroll compressors", "Cascade control up to 16 units", "Error-code diagnostics", "High pressure protection"],
    bestFor: "Best for hospitals",
  },
  {
    slug: "adreco-evi-25",
    name: "EVI Cold Climate Heat Pump",
    model: "ARC/EVI/25",
    type: "EVI",
    applications: ["Residential", "Hotels", "Education"],
    capacityKw: [22, 26],
    ambient: [-25, 43],
    maxWaterTemp: 60,
    cop: 3.9,
    coldClimate: true,
    refrigerant: "R410A",
    compressor: "Copeland EVI Scroll",
    noiseDb: 60,
    inputKw: 6.2,
    flowM3h: 4.3,
    dimensions: "1530 × 790 × 1100 mm",
    weightKg: 260,
    newness: 9,
    image: industrial,
    gallery: g(industrial),
    tagline: "Enhanced vapour injection for Himalayan winters down to -25°C.",
    highlight: "Works down to -25°C",
    features: ["EVI compressor (Copeland / Danfoss)", "Fast auto defrost", "Space heating + hot water", "Anti-freeze protection"],
    bestFor: "Best for cold climate",
  },
  {
    slug: "adreco-pool-sp-22",
    name: "Swimming Pool Heat Pump",
    model: "ARC/PW/SP/22",
    type: "Swimming Pool",
    applications: ["Pools", "Hotels", "Residential"],
    capacityKw: [20, 22],
    ambient: [-15, 45],
    maxWaterTemp: 40,
    cop: 5.2,
    coldClimate: true,
    refrigerant: "R410A",
    compressor: "Panasonic Scroll",
    noiseDb: 56,
    inputKw: 4.2,
    flowM3h: 8,
    dimensions: "740 × 805 × 1165 mm",
    weightKg: 145,
    newness: 7,
    image: pool,
    gallery: g(pool),
    tagline: "Titanium exchanger built for chlorinated pool water.",
    highlight: "Titanium-in-PVC exchanger",
    features: ["Titanium tube heat exchanger", "Heating or cooling", "Inverter models", "Auto defrost"],
    bestFor: "Best for pool heating",
  },
  {
    slug: "adreco-pool-sp-44",
    name: "Pool Heat Pump 44",
    model: "ARC/PW/SP/44",
    type: "Swimming Pool",
    applications: ["Pools", "Hotels"],
    capacityKw: [42, 46],
    ambient: [-15, 45],
    maxWaterTemp: 40,
    cop: 5.0,
    coldClimate: true,
    refrigerant: "R410A",
    compressor: "Panasonic Scroll ×2",
    noiseDb: 62,
    inputKw: 8.8,
    flowM3h: 16,
    dimensions: "1500 × 750 × 1075 mm",
    weightKg: 300,
    newness: 4,
    image: pool,
    gallery: g(pool),
    tagline: "Large resort and Olympic-size pool heating.",
    highlight: "For 200–400 m² pools",
    features: ["Twin circuits", "Titanium exchanger", "Remote monitoring ready", "Low-noise fans"],
    bestFor: "Best for resort pools",
  },
  {
    slug: "adreco-high-temp-ht-60",
    name: "High Temperature Heat Pump",
    model: "ARC/HT/60",
    type: "High Temperature",
    applications: ["Industrial", "Food Processing", "Hospitals"],
    capacityKw: [55, 65],
    ambient: [-7, 45],
    maxWaterTemp: 80,
    cop: 3.2,
    coldClimate: false,
    refrigerant: "R134a / R410A cascade",
    compressor: "Copeland Scroll",
    noiseDb: 66,
    inputKw: 18.5,
    flowM3h: 10.5,
    dimensions: "2005 × 1050 × 1400 mm",
    weightKg: 470,
    newness: 9,
    image: industrial,
    gallery: g(industrial),
    tagline: "80°C process water for pharma, textile and food lines.",
    highlight: "Up to 80°C outlet",
    features: ["80°C hot water", "Process-integration ready", "Modbus controls", "Heavy-duty frame"],
    bestFor: "Best for industrial process heat",
  },
  {
    slug: "adreco-dryer-hpd-30",
    name: "Dryer Heat Pump",
    model: "ARC/HPD/30",
    type: "Dryer",
    applications: ["Industrial", "Food Processing"],
    capacityKw: [28, 32],
    ambient: [-7, 45],
    maxWaterTemp: 80,
    cop: 3.5,
    coldClimate: false,
    refrigerant: "R134a",
    compressor: "Copeland Scroll",
    noiseDb: 63,
    inputKw: 8.6,
    flowM3h: 0,
    dimensions: "1800 × 1000 × 1500 mm",
    weightKg: 420,
    newness: 10,
    image: industrial,
    gallery: g(industrial),
    tagline: "Automated hot-air drying up to 80°C for agri and food produce.",
    highlight: "Hot air up to 80°C",
    features: ["Automated drying cycles", "Insulated drying rooms on request", "Dehumidification", "Recipe controls"],
    bestFor: "Best for drying",
  },
];

export const productTypes: ProductType[] = ["Domestic", "Water Heater", "Commercial", "EVI", "Swimming Pool", "High Temperature", "Dryer"];
export const applicationsList: Application[] = ["Residential", "Hotels", "Hospitals", "Education", "Industrial", "Pools", "Food Processing"];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const categories = [
  { title: "Residential Heat Pumps", range: "3 – 16 kW", temp: "-25°C to 45°C", image: residential, type: "Domestic" as ProductType },
  { title: "Commercial Heat Pumps", range: "12 – 200 kW", temp: "-7°C to 43°C", image: commercial, type: "Commercial" as ProductType },
  { title: "Industrial Heat Pumps", range: "50 – 1000 kW", temp: "Up to 80°C outlet", image: industrial, type: "High Temperature" as ProductType },
  { title: "Heat Pump Water Heaters", range: "200 – 500 L", temp: "-10°C to 43°C", image: water, type: "Water Heater" as ProductType },
];
