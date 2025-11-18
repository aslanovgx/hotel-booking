// src/lib/pricing.ts
import { hotelsByCountry, mealsByCountry, boardTypes } from "./data";
import type { BookingState } from "../context/BookingContext";

export interface DayPricing {
  dayIndex: number;
  hotelLabel: string;
  hotelPrice: number;
  lunchLabel: string;
  lunchPrice: number;
  dinnerLabel: string;
  dinnerPrice: number;
  totalForDay: number;
}

export interface PricingResult {
  days: DayPricing[];
  grandTotal: number;
}

/**
 * Bütün günlər üzrə qiymətləri hesablayır:
 * Total = Σ (hotel + selected meals)
 */
export function computePricing(state: BookingState): PricingResult {
  const { config, days } = state;
  const { destination } = config;

  if (!destination || !days.length) {
    return { days: [], grandTotal: 0 };
  }

  const hotels = hotelsByCountry[destination];
  const meals = mealsByCountry[destination];

  const resultDays: DayPricing[] = days.map((d) => {
    // Hotel
    const hotel = hotels.find((h) => h.id === d.hotelId);
    const hotelPrice = hotel?.price ?? 0;
    const hotelLabel = hotel ? `${hotel.name} ($${hotel.price})` : "—";

    // Lunch
    const lunch = d.lunchId
      ? meals.lunch.find((m) => m.id === d.lunchId)
      : undefined;
    const lunchPrice = lunch?.price ?? 0;
    const lunchLabel = lunch ? `${lunch.name} ($${lunch.price})` : "—";

    // Dinner
    const dinner = d.dinnerId
      ? meals.dinner.find((m) => m.id === d.dinnerId)
      : undefined;
    const dinnerPrice = dinner?.price ?? 0;
    const dinnerLabel = dinner ? `${dinner.name} ($${dinner.price})` : "—";

    const totalForDay = hotelPrice + lunchPrice + dinnerPrice;

    return {
      dayIndex: d.dayIndex,
      hotelLabel,
      hotelPrice,
      lunchLabel,
      lunchPrice,
      dinnerLabel,
      dinnerPrice,
      totalForDay,
    };
  });

  const grandTotal = resultDays.reduce(
    (sum, d) => sum + d.totalForDay,
    0
  );

  return { days: resultDays, grandTotal };
}

/**
 * Board type kodundan (FB/HB/NB) user-friendly ad + description qaytarır
 */
export function getBoardTypeMeta(code: string) {
  const b = boardTypes.find((x) => x.code === code);
  if (!b) return { name: code, description: "" };
  return {
    name: b.name,
    description: b.description,
  };
}
