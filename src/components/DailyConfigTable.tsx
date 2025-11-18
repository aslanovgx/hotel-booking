// src/components/DailyConfigTable.tsx
import { useBooking } from "../context/BookingContext";
import { hotelsByCountry, mealsByCountry } from "../lib/data";

export default function DailyConfigTable() {
  const { state, dispatch } = useBooking();
  const { config, days } = state;
  const { destination, boardType, daysCount } = config;

  // Əgər ölkə və ya gün sayı seçilməyibsə – məlumat mesajı
  if (!daysCount) {
    return (
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-slate-800 tracking-tight">
          Step 2 – Daily configuration
        </h2>
        <p className="text-sm text-slate-600">
          Please select the number of days in Step 1. A row will be generated
          for each day.
        </p>
      </section>
    );
  }

  if (!destination) {
    return (
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-2">
          Step 2 – Daily configuration
        </h2>
        <p className="text-sm text-slate-600">
          Please select a destination country in Step 1 to configure hotels and
          meals.
        </p>
      </section>
    );
  }

  const hotels = hotelsByCountry[destination];
  const meals = mealsByCountry[destination];

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Step 2 – Daily configuration</h2>
        <span className="text-xs text-slate-500">
          Board type: <strong>{boardType}</strong>
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="border-b border-slate-200 px-3 py-2 w-24">
                Day
              </th>
              <th className="border-b border-slate-200 px-3 py-2">
                Hotel
              </th>
              <th className="border-b border-slate-200 px-3 py-2">
                Lunch
              </th>
              <th className="border-b border-slate-200 px-3 py-2">
                Dinner
              </th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => {
              const lunchDisabled =
                boardType === "NB" ||
                (boardType === "HB" && day.dinnerId !== null);

              const dinnerDisabled =
                boardType === "NB" ||
                (boardType === "HB" && day.lunchId !== null);

              return (
                <tr key={day.dayIndex} className="odd:bg-white even:bg-slate-50">
                  {/* Day number */}
                  <td className="border-b border-slate-200 px-3 py-2">
                    Day {day.dayIndex + 1}
                  </td>

                  {/* Hotel select */}
                  <td className="border-b border-slate-200 px-3 py-2">
                    <select
                      className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                      value={day.hotelId ?? ""}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_DAY_HOTEL",
                          payload: {
                            dayIndex: day.dayIndex,
                            hotelId: e.target.value
                              ? Number(e.target.value)
                              : null,
                          },
                        })
                      }
                    >
                      <option value="">Select hotel</option>
                      {hotels.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.name} (${h.price})
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Lunch select */}
                  <td className="border-b border-slate-200 px-3 py-2">
                    <select
                      className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:bg-slate-100 disabled:text-slate-400"
                      value={day.lunchId ?? ""}
                      disabled={lunchDisabled || !meals}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_DAY_MEAL",
                          payload: {
                            dayIndex: day.dayIndex,
                            mealType: "lunch",
                            mealId: e.target.value
                              ? Number(e.target.value)
                              : null,
                          },
                        })
                      }
                    >
                      <option value="">
                        {boardType === "NB"
                          ? "No meals for NB"
                          : "Select lunch"}
                      </option>
                      {meals?.lunch.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} (${m.price})
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Dinner select */}
                  <td className="border-b border-slate-200 px-3 py-2">
                    <select
                      className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:bg-slate-100 disabled:text-slate-400"
                      value={day.dinnerId ?? ""}
                      disabled={dinnerDisabled || !meals}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_DAY_MEAL",
                          payload: {
                            dayIndex: day.dayIndex,
                            mealType: "dinner",
                            mealId: e.target.value
                              ? Number(e.target.value)
                              : null,
                          },
                        })
                      }
                    >
                      <option value="">
                        {boardType === "NB"
                          ? "No meals for NB"
                          : "Select dinner"}
                      </option>
                      {meals?.dinner.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} (${m.price})
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">
        • FB: both lunch and dinner can be selected. <br />
        • HB: only lunch or dinner can be selected per day. <br />
        • NB: meal selection is disabled.
      </p>
    </section>
  );
}
