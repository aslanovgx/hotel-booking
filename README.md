# 🏨 Hotel Booking System – Frontend Technical Task

This project is a fully functional **hotel booking application** built as part of a Frontend Developer technical assessment.  
It follows all requirements from the provided task document and includes clean architecture, state management, business logic, and responsive UI.

---

## 🌐 Live Demo
👉 _(https://hotel-booking-two-flame.vercel.app)_

---

## 🚀 Tech Stack

- **React.js (TypeScript)**
- **Context API + useReducer** (state management)
- **Tailwind CSS** (responsive & modern UI)
- **Vite** (bundler & dev server)

---

## 🎯 Features

### ✅ Step 1 — Trip Configuration
Users can configure:
- Citizenship  
- Start date  
- Number of days  
- Destination country  
- Board type (FB / HB / NB)

### ✅ Step 2 — Daily Configuration
For each day:
- Select hotel  
- Select lunch & dinner (depending on board type rules)

### 🍽 Board Type Rules
| Board Type | Lunch | Dinner |
|------------|--------|--------|
| **FB** (Full Board) | ✔ Selectable | ✔ Selectable |
| **HB** (Half Board) | ✔ Only lunch **OR** dinner | ✔ Only one allowed |
| **NB** (No Board) | ❌ Disabled | ❌ Disabled |

Rules are implemented both in **UI** (disabled inputs) and **Reducer** (business logic).

### ✅ Step 3 — Summary & Pricing
App displays:
- Trip configuration summary  
- Daily selections  
- Cost breakdown per day  
- **Grand total** for the whole trip  

Formula:
Total = Σ (hotel price + selected meals) for each day

---

## 🧩 Project Architecture

src/
├── components/
│ ├── TripConfigForm.tsx # Step 1 form
│ ├── DailyConfigTable.tsx # Step 2 table (per-day selections)
│ └── SummarySection.tsx # Step 3 summary + pricing
│
├── context/
│ └── BookingContext.tsx # Global state (Context + useReducer)
│
├── lib/
│ ├── data.ts # Countries, hotels, meals, board types
│ └── pricing.ts # All pricing logic
│
├── App.tsx
└── main.tsx

---

## 🧠 Why Context + Reducer?

I chose **Context API + useReducer** because:
- The project requires global shared state  
- Reducer keeps **business logic centralized**, preventing UI components from becoming complicated  
- It satisfies the "Redux or Context API" requirement  
- Lighter and cleaner than Redux for this use case  

Reducer contains:
- Day resizing logic  
- Board type rules (FB/HB/NB)  
- Meal exclusivity rule for HB  
- Safety guard for NB (meals disabled)  

---

## 📊 Pricing Logic

Located in: `src/lib/pricing.ts`

- Computes **hotel + meals** for each day  
- Generates a full breakdown array  
- Calculates `grandTotal`  
- Safe against missing selections  

Example output:
```json
{
  "days": [
    {
      "dayIndex": 0,
      "hotelLabel": "Hilton Istanbul ($120)",
      "lunchLabel": "Chicken Pilaf ($10)",
      "dinnerLabel": "Turkish Kebab ($15)",
      "totalForDay": 145
    }
  ],
  "grandTotal": 145
}