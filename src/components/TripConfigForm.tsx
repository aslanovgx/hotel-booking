// src/components/TripConfigForm.tsx
import type { ChangeEvent } from "react";
import { useBooking } from "../context/BookingContext";
import { countries, boardTypes } from "../lib/data";

export default function TripConfigForm() {
  const { state, dispatch } = useBooking();
  const { config } = state;

  const handleDaysChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    dispatch({ type: "SET_DAYS_COUNT", payload: isNaN(value) ? 0 : value });
  };

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <h2 className="text-xl font-semibold">Step 1 – Trip configuration</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Citizenship */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Citizenship</label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Azerbaijan, Turkey, etc."
            value={config.citizenship}
            onChange={(e) =>
              dispatch({
                type: "SET_CITIZENSHIP",
                payload: e.target.value,
              })
            }
          />
        </div>

        {/* Start date */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Start date</label>
          <input
            type="date"
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={config.startDate}
            onChange={(e) =>
              dispatch({
                type: "SET_START_DATE",
                payload: e.target.value,
              })
            }
          />
        </div>

        {/* Number of days */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Number of days</label>
          <input
            type="number"
            min={1}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={config.daysCount || ""}
            onChange={handleDaysChange}
          />
          <p className="text-xs text-slate-500">
            Each day will appear as a row in the daily configuration table.
          </p>
        </div>

        {/* Destination country */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Destination country</label>
          <select
            className="border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={config.destination}
            onChange={(e) =>
              dispatch({
                type: "SET_DESTINATION",
                payload: e.target.value as any,
              })
            }
          >
            <option value="">Select a country</option>
            {countries.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Board type radios */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Board type</span>
        <div className="flex flex-wrap gap-3">
          {boardTypes.map((b) => (
            <label
              key={b.code}
              className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-sm cursor-pointer ${
                config.boardType === b.code
                  ? "border-sky-500 bg-sky-50"
                  : "border-slate-200"
              }`}
            >
              <input
                type="radio"
                name="boardType"
                value={b.code}
                checked={config.boardType === b.code}
                onChange={() =>
                  dispatch({ type: "SET_BOARD_TYPE", payload: b.code })
                }
              />
              <div>
                <div className="font-medium">{b.name}</div>
                <div className="text-xs text-slate-500">{b.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
