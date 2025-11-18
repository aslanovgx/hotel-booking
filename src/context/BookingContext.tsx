// src/context/BookingContext.tsx
import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { BoardTypeCode, CountryName } from "../lib/data";

// Hər gün üçün seçilənlər
export interface DaySelection {
  dayIndex: number;            // 0-based
  hotelId: number | null;
  lunchId: number | null;
  dinnerId: number | null;
}

// Ümumi konfigurasiya (formun yuxarı hissəsi)
export interface TripConfig {
  citizenship: string;
  startDate: string;           // "2025-11-20" kimi
  daysCount: number;
  destination: CountryName | "";
  boardType: BoardTypeCode;
}

// Bütün booking state-i
export interface BookingState {
  config: TripConfig;
  days: DaySelection[];
}

// === ACTION-lar ===
type Action =
  | { type: "SET_CITIZENSHIP"; payload: string }
  | { type: "SET_START_DATE"; payload: string }
  | { type: "SET_DAYS_COUNT"; payload: number }
  | { type: "SET_DESTINATION"; payload: CountryName | "" }
  | { type: "SET_BOARD_TYPE"; payload: BoardTypeCode }
  | {
      type: "SET_DAY_HOTEL";
      payload: { dayIndex: number; hotelId: number | null };
    }
  | {
      type: "SET_DAY_MEAL";
      payload: {
        dayIndex: number;
        mealType: "lunch" | "dinner";
        mealId: number | null;
      };
    };

// İlkin state
const initialState: BookingState = {
  config: {
    citizenship: "",
    startDate: "",
    daysCount: 0,
    destination: "",
    boardType: "FB",
  },
  days: [],
};

// days massivini gün sayına görə tənzimləyən helper
function resizeDays(days: DaySelection[], daysCount: number): DaySelection[] {
  const next = [...days];

  // artırmaq lazımdırsa
  while (next.length < daysCount) {
    next.push({
      dayIndex: next.length,
      hotelId: null,
      lunchId: null,
      dinnerId: null,
    });
  }

  // azaltmaq lazımdırsa
  return next.slice(0, daysCount);
}


function bookingReducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case "SET_CITIZENSHIP":
      return {
        ...state,
        config: { ...state.config, citizenship: action.payload },
      };

    case "SET_START_DATE":
      return {
        ...state,
        config: { ...state.config, startDate: action.payload },
      };

    case "SET_DAYS_COUNT": {
      const daysCount = Math.max(0, action.payload || 0);
      return {
        ...state,
        config: { ...state.config, daysCount },
        days: resizeDays(state.days, daysCount),
      };
    }

    case "SET_DESTINATION":
      return {
        ...state,
        config: { ...state.config, destination: action.payload },
        // İstəsən burada hotel/lunch/dinner-i də reset edə bilərsən
      };

    case "SET_BOARD_TYPE": {
      const boardType = action.payload;
      let days = state.days;

      // NB olanda bütün yeməkləri təmizləyirik
      if (boardType === "NB") {
        days = state.days.map((d) => ({
          ...d,
          lunchId: null,
          dinnerId: null,
        }));
      }

      return {
        ...state,
        config: { ...state.config, boardType },
        days,
      };
    }

    case "SET_DAY_HOTEL": {
      const { dayIndex, hotelId } = action.payload;
      const days = state.days.map((d) =>
        d.dayIndex === dayIndex ? { ...d, hotelId } : d
      );
      return { ...state, days };
    }

    case "SET_DAY_MEAL": {
      const { dayIndex, mealType, mealId } = action.payload;

      // NB-də ümumiyyətlə yemək seçməyə icazə vermirik
      if (state.config.boardType === "NB") return state;

      const days = state.days.map((d) => {
        if (d.dayIndex !== dayIndex) return d;

        // HB → yalnız biri seçilə bilər (OR qaydası)
        if (state.config.boardType === "HB") {
          if (mealType === "lunch") {
            return {
              ...d,
              lunchId: mealId,
              dinnerId: null,
            };
          } else {
            return {
              ...d,
              dinnerId: mealId,
              lunchId: null,
            };
          }
        }

        // FB → hər ikisi seçilə bilər
        if (mealType === "lunch") {
          return { ...d, lunchId: mealId };
        } else {
          return { ...d, dinnerId: mealId };
        }
      });

      return { ...state, days };
    }

    default:
      return state;
  }
}


// === Context & Provider ===

interface BookingContextValue {
  state: BookingState;
  dispatch: React.Dispatch<Action>;
}

const BookingContext = createContext<BookingContextValue | undefined>(
  undefined
);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

// Custom hook
export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}
