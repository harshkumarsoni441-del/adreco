/** Demo content: sectors, case studies, resources. Replace with CMS/API data later. */
import hotel from "@/assets/s-hotel.jpg";
import hospital from "@/assets/s-hospital.jpg";
import school from "@/assets/s-school.jpg";
import industry from "@/assets/s-industry.jpg";
import home from "@/assets/s-residential.jpg";
import pool from "@/assets/s-pool.jpg";
import hero from "@/assets/hero.jpg";
import type { Application } from "./products";

export interface Solution {
  slug: string;
  title: string;
  short: string;
  image: string;
  icon: string;
  challenge: string;
  solutions: string[];
  benefits: { value: string; label: string }[];
  productApps: Application[];
  process: string[];
  caseSlug: string;
  featured?: boolean;
}

export const solutions: Solution[] = [
  { slug: "hotels", title: "Hotels & Resorts", short: "24/7 guest hot water and pool heating.", image: hotel, icon: "BedDouble", featured: true,
    challenge: "Hotels need consistent hot water at peak morning demand while diesel and LPG boilers drive up operating cost and emissions.",
    solutions: ["Commercial heat pumps with SS 304 storage", "Pool heat pumps for leisure areas", "Return-line pumping for instant hot water"],
    benefits: [{ value: "up to 70%", label: "lower water-heating cost*" }, { value: "24/7", label: "automatic operation" }, { value: "0", label: "combustion on site" }],
    productApps: ["Hotels", "Pools"], process: ["Ambient air", "Heat pump", "Storage tank", "Return-line pump", "Guest rooms"], caseSlug: "hotel-pune" },
  { slug: "hospitals", title: "Hospitals", short: "Hygienic, redundant hot water for critical care.", image: hospital, icon: "Hospital", featured: true,
    challenge: "Hospitals require uninterrupted hot water at safe temperatures with redundancy and low maintenance.",
    solutions: ["Dual-compressor commercial units", "High-temperature units for laundry and CSSD", "Cascade control with N+1 redundancy"],
    benefits: [{ value: "N+1", label: "redundancy design" }, { value: "60°C", label: "hygienic hot water" }, { value: "12 yr", label: "design life" }],
    productApps: ["Hospitals"], process: ["Ambient air", "Cascade heat pumps", "Buffer tank", "Hydro-pneumatic system", "Wards & CSSD"], caseSlug: "school-bengaluru" },
  { slug: "education", title: "Schools & Universities", short: "Hostel hot water and campus heating.", image: school, icon: "GraduationCap", featured: true,
    challenge: "Campus hostels see sharp morning peaks and tight budgets, with electric geysers creating high bills.",
    solutions: ["Centralised commercial heat pumps", "Insulated storage sized to peak", "Timer-based scheduling"],
    benefits: [{ value: "up to 65%", label: "lower bills vs geysers*" }, { value: "1", label: "central plant to maintain" }, { value: "Low", label: "noise operation" }],
    productApps: ["Education"], process: ["Ambient air", "Heat pump", "Storage", "Distribution", "Hostel blocks"], caseSlug: "school-bengaluru" },
  { slug: "industries", title: "Industries", short: "Process water up to 80°C.", image: industry, icon: "Factory", featured: true,
    challenge: "Process industries rely on boilers for 50–80°C water — an inefficient use of fuel for low-grade heat.",
    solutions: ["High temperature heat pumps", "Heat recovery integration", "Modbus/BMS connectivity"],
    benefits: [{ value: "80°C", label: "process water" }, { value: "3×+", label: "heat per kW input*" }, { value: "BMS", label: "ready controls" }],
    productApps: ["Industrial", "Food Processing"], process: ["Ambient / waste heat", "HT heat pump", "Process tank", "Production line"], caseSlug: "plant-ludhiana" },
  { slug: "residential", title: "Residential Villas & Apartments", short: "Quiet comfort for modern homes.", image: home, icon: "Home", featured: true,
    challenge: "Homes need comfortable hot water and winter heating without high electricity bills or bulky equipment.",
    solutions: ["Domestic & inverter heat pumps", "Heat pump water heaters", "Radiator / underfloor heating"],
    benefits: [{ value: "up to 75%", label: "savings vs electric geyser*" }, { value: "45 dB", label: "quiet operation" }, { value: "-25°C", label: "cold-climate ready" }],
    productApps: ["Residential"], process: ["Ambient air", "Domestic heat pump", "Storage", "Bathrooms & radiators"], caseSlug: "resort-ladakh" },
  { slug: "swimming-pools", title: "Swimming Pools", short: "Year-round pool comfort.", image: pool, icon: "Waves", featured: true,
    challenge: "Unheated pools sit idle for months; gas heaters are costly and corrosive water damages standard exchangers.",
    solutions: ["Titanium exchanger pool heat pumps", "Inverter pool models", "Heating and cooling modes"],
    benefits: [{ value: "5.0+", label: "COP at rated conditions" }, { value: "12 mo", label: "usable season" }, { value: "Ti", label: "corrosion-proof exchanger" }],
    productApps: ["Pools"], process: ["Ambient air", "Pool heat pump", "Filter loop", "Pool"], caseSlug: "resort-ladakh" },
  { slug: "hot-water-generation", title: "Hot Water Generation", short: "Efficient bulk hot water.", image: hero, icon: "Droplets",
    challenge: "Bulk hot water with electric or fuel boilers is expensive and carbon-intensive.",
    solutions: ["Commercial and domestic heat pumps", "MS / SS 304 storage tanks", "Return-line pumping"],
    benefits: [{ value: "up to 80%", label: "energy efficient*" }, { value: "60°C", label: "outlet water" }, { value: "Auto", label: "operation" }],
    productApps: ["Residential", "Hotels", "Hospitals", "Education"], process: ["Air", "Heat pump", "Storage", "Use points"], caseSlug: "hotel-pune" },
  { slug: "space-heating-cooling", title: "Space Heating and Cooling", short: "Radiators, FCUs and underfloor.", image: home, icon: "ThermometerSun",
    challenge: "Cold regions need safe, clean space heating without wood, kerosene or diesel.",
    solutions: ["EVI heat pumps", "Radiators and FCUs", "Heating + cooling + hot water units"],
    benefits: [{ value: "-25°C", label: "operation" }, { value: "3-in-1", label: "heat, cool, hot water" }, { value: "0", label: "fire hazard" }],
    productApps: ["Residential", "Hotels", "Education"], process: ["Air", "EVI heat pump", "Buffer", "Radiators / FCU"], caseSlug: "resort-ladakh" },
  { slug: "industrial-drying", title: "Industrial Drying", short: "Controlled hot-air drying.", image: industry, icon: "Wind",
    challenge: "Open-air and fuel drying is slow, inconsistent and weather-dependent.",
    solutions: ["Dryer heat pumps", "Insulated drying rooms", "Automated recipes"],
    benefits: [{ value: "80°C", label: "hot air" }, { value: "Auto", label: "cycles" }, { value: "Closed", label: "loop hygiene" }],
    productApps: ["Industrial", "Food Processing"], process: ["Air", "Dryer heat pump", "Drying chamber", "Dehumidify & recirculate"], caseSlug: "plant-ludhiana" },
  { slug: "food-processing", title: "Food Processing", short: "Hygienic process heat.", image: industry, icon: "Utensils",
    challenge: "Food plants need hot water for CIP and processing at steady temperatures.",
    solutions: ["High temperature heat pumps", "Dryer heat pumps", "Heat recovery"],
    benefits: [{ value: "80°C", label: "CIP water" }, { value: "Steady", label: "temperature" }, { value: "Low", label: "emissions" }],
    productApps: ["Food Processing", "Industrial"], process: ["Air / waste heat", "HT heat pump", "CIP tank", "Lines"], caseSlug: "plant-ludhiana" },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);

export interface CaseStudy {
  slug: string; title: string; city: string; sector: string; image: string;
  product: string; challenge: string; outcome: string;
}
export const caseStudies: CaseStudy[] = [
  { slug: "hotel-pune", title: "5-Star Hotel", city: "Pune", sector: "Hospitality", image: hotel, product: "2 × ARC/CHP/40 · 80 kW",
    challenge: "Diesel boiler for 180 rooms with high fuel spend.", outcome: "Estimated 62% reduction in water-heating cost (demo figure)." },
  { slug: "school-bengaluru", title: "Modern School", city: "Bengaluru", sector: "Education", image: school, product: "ARC/CHP/40 · 40 kW",
    challenge: "Hostel geysers overloading the electrical supply.", outcome: "Single central plant; peak load reduced (demo figure)." },
  { slug: "plant-ludhiana", title: "Food Processing Plant", city: "Ludhiana", sector: "Industrial", image: industry, product: "ARC/HT/60 · 60 kW",
    challenge: "LPG used for 75°C CIP water.", outcome: "Fuel-free process water with BMS integration (demo figure)." },
  { slug: "resort-ladakh", title: "Mountain Resort", city: "Ladakh", sector: "Hospitality", image: pool, product: "ARC/EVI/25 · 50 kW",
    challenge: "Winters of -20°C; kerosene heating.", outcome: "Reliable heating and hot water through winter (demo figure)." },
];

export type ResourceCat = "Brochures" | "Technical documents" | "Installation guides" | "Case studies" | "Blog";
export const resources: { title: string; cat: ResourceCat; desc: string; gated: boolean; meta: string }[] = [
  { title: "Adreco Heat Pump Brochure 2026", cat: "Brochures", desc: "Full product range, features and specifications.", gated: false, meta: "PDF · 6 MB" },
  { title: "Commercial Heat Pump Datasheet", cat: "Technical documents", desc: "Capacity, COP and dimensions for CHP series.", gated: true, meta: "PDF · 1.2 MB" },
  { title: "EVI Cold Climate Datasheet", cat: "Technical documents", desc: "Performance curves from -25°C to 43°C.", gated: true, meta: "PDF · 1.4 MB" },
  { title: "Pool Heat Pump Installation Guide", cat: "Installation guides", desc: "Plumbing, bypass and electrical guidance.", gated: true, meta: "PDF · 2 MB" },
  { title: "Domestic Unit Installation Guide", cat: "Installation guides", desc: "Placement, clearances and commissioning.", gated: false, meta: "PDF · 1.8 MB" },
  { title: "Hotel Case Study — Pune", cat: "Case studies", desc: "Replacing diesel boilers in a 180-room hotel.", gated: false, meta: "Read · 4 min" },
  { title: "Heat Pumps in Ladakh Winters", cat: "Case studies", desc: "Cold-climate performance at -20°C.", gated: false, meta: "Read · 5 min" },
  { title: "How a Heat Pump Delivers 4–5× Energy", cat: "Blog", desc: "The thermodynamics behind COP, explained simply.", gated: false, meta: "Read · 6 min" },
  { title: "Sizing Hot Water for Hotels", cat: "Blog", desc: "Litres per room, peak factors and storage.", gated: false, meta: "Read · 7 min" },
];

export const faqs = [
  { q: "Can an Adreco heat pump work at -7°C or colder?", a: "Yes. Commercial models operate down to -7°C, while EVI and domestic models are designed for ambient temperatures as low as -25°C with fast auto defrost." },
  { q: "How much energy can I save?", a: "Heat pumps typically deliver 3–5 kW of heat per kW of electricity. Savings of 60–80% versus electric or fuel heating are common, but final results depend on site conditions and an engineering assessment." },
  { q: "What maintenance is required?", a: "Routine maintenance is minimal: periodic coil cleaning, water filter checks and an annual service visit." },
  { q: "What is the equipment life?", a: "Adreco heat pumps are designed for an equipment life of up to 12 years with proper maintenance." },
  { q: "Which refrigerant do you use?", a: "R410A, an environment-friendly refrigerant suited to cold climatic conditions. Some high-temperature models use cascade refrigerants." },
];
