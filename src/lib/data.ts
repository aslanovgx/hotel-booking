// src/lib/data.ts

// 1) Ölkə adlarını literal type kimi saxlayırıq
export type CountryName = "Turkey" | "UAE" | "Italy";

// 2) Country model
export interface Country {
  id: number;
  name: CountryName;
}

// 3) Hotel model
export interface Hotel {
  id: number;
  name: string;
  price: number;
}

// 4) Board type kodları
export type BoardTypeCode = "FB" | "HB" | "NB";

// 5) Board type model
export interface BoardType {
  code: BoardTypeCode;
  name: string;
  description: string;
}

// 6) Meal model
export interface Meal {
  id: number;
  name: string;
  price: number;
}




// === Real data-lar ===

// Countries
export const countries: Country[] = [
  { id: 1, name: "Turkey" },
  { id: 2, name: "UAE" },
  { id: 3, name: "Italy" },
];

// Hotels by country
export const hotelsByCountry: Record<CountryName, Hotel[]> = {
  Turkey: [
    { id: 101, name: "Hilton Istanbul", price: 120 },
    { id: 102, name: "Titanic Antalya", price: 90 },
  ],
  UAE: [
    { id: 201, name: "Dubai Marina Hotel", price: 200 },
    { id: 202, name: "Palm Jumeirah Resort", price: 300 },
  ],
  Italy: [
    { id: 301, name: "Rome Center Hotel", price: 150 },
  ],
};

// Board types
export const boardTypes: BoardType[] = [
  {
    code: "FB",
    name: "Full Board",
    description: "Breakfast, lunch and dinner included",
  },
  {
    code: "HB",
    name: "Half Board",
    description: "Breakfast and one main meal included",
  },
  {
    code: "NB",
    name: "No Board",
    description: "No meals included",
  },
];

// Meals by country
export const mealsByCountry: Record<
  CountryName,
  {
    lunch: Meal[];
    dinner: Meal[];
  }
> = {
  Turkey: {
    dinner: [
      { id: 1, name: "Turkish Kebab", price: 15 },
      { id: 2, name: "Istanbul Fish Plate", price: 18 },
      { id: 3, name: "Traditional Meat Stew", price: 20 },
    ],
    lunch: [
      { id: 4, name: "Chicken Pilaf", price: 10 },
      { id: 5, name: "Lentil Soup Set", price: 8 },
      { id: 6, name: "Veggie Plate", price: 9 },
    ],
  },
  UAE: {
    dinner: [
      { id: 7, name: "Arabic Mixed Grill", price: 25 },
      { id: 8, name: "Dubai Seafood Dinner", price: 30 },
    ],
    lunch: [
      { id: 9, name: "Shawarma Plate", price: 12 },
      { id: 10, name: "Hummus & Falafel Set", price: 11 },
    ],
  },
  Italy: {
    dinner: [
      { id: 11, name: "Pasta Carbonara", price: 20 },
      { id: 12, name: "Italian Seafood Dinner", price: 28 },
    ],
    lunch: [
      { id: 13, name: "Pizza Margherita", price: 12 },
      { id: 14, name: "Lasagna Lunch Set", price: 14 },
    ],
  },
};
