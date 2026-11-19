import { describe, expect, it } from "vitest";
import { dailyHeatKwh, payback, savings, sizeKw } from "./calc";

describe("estimation formulas", () => {
  it("heats 1000 L by 40°C with ~46.5 kWh", () => {
    expect(dailyHeatKwh(1000, 15, 55)).toBeCloseTo(46.51, 1);
  });
  it("a COP 4 heat pump saves ~76% vs a 95% efficient electric geyser at equal tariff", () => {
    const r = savings({ litres: 500, inlet: 15, target: 55, fuel: "electric", fuelRate: 8, elecRate: 8, cop: 4 });
    expect(r.pct).toBeCloseTo(76.25, 1);
  });
  it("payback = cost / (saving − maintenance)", () => {
    expect(payback(300000, 110000, 10000)).toBe(3);
    expect(payback(100, 0)).toBe(Infinity);
  });
  it("cold climate adds 30% to sizing", () => {
    expect(sizeKw(1000, 55, true) / sizeKw(1000, 55, false)).toBeCloseTo(1.3);
  });
});
