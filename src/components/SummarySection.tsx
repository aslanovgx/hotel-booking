// src/components/SummarySection.tsx
import { useBooking } from "../context/BookingContext";
import { computePricing, getBoardTypeMeta } from "../lib/pricing";

export default function SummarySection() {
  const { state } = useBooking();
  const { config } = state;
  const { days, grandTotal } = computePricing(state);
  const boardMeta = getBoardTypeMeta(config.boardType);

  const hasData = config.daysCount > 0 && config.destination && days.length > 0;

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <h2 className="text-lg font-semibold">Step 3 – Summary & Price</h2>

      {/* 1) Configuration summary */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-700">
          1. Configuration summary
        </h3>
        <div className="grid gap-2 text-sm md:grid-cols-2">
          <SummaryRow label="Citizenship" value={config.citizenship || "—"} />
          <SummaryRow
            label="Start date"
            value={config.startDate || "—"}
          />
          <SummaryRow
            label="Number of days"
            value={config.daysCount ? String(config.daysCount) : "—"}
          />
          <SummaryRow
            label="Destination country"
            value={config.destination || "—"}
          />
          <SummaryRow
            label="Board type"
            value={`${boardMeta.name} (${config.boardType})`}
            helper={boardMeta.description}
          />
        </div>
      </div>

      {/* 2) Daily selections */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-700">
          2. Daily selections
        </h3>
        {!hasData ? (
          <p className="text-xs text-slate-500">
            Configure at least one day with a destination, hotel and optionally
            meals to see the daily breakdown.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="border-b border-slate-200 px-3 py-2 w-20">
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
                  <th className="border-b border-slate-200 px-3 py-2 text-right">
                    Total / day
                  </th>
                </tr>
              </thead>
              <tbody>
                {days.map((d) => (
                  <tr
                    key={d.dayIndex}
                    className="odd:bg-white even:bg-slate-50"
                  >
                    <td className="border-b border-slate-200 px-3 py-2">
                      Day {d.dayIndex + 1}
                    </td>
                    <td className="border-b border-slate-200 px-3 py-2">
                      {d.hotelLabel}
                    </td>
                    <td className="border-b border-slate-200 px-3 py-2">
                      {d.lunchLabel}
                    </td>
                    <td className="border-b border-slate-200 px-3 py-2">
                      {d.dinnerLabel}
                    </td>
                    <td className="border-b border-slate-200 px-3 py-2 text-right">
                      ${d.totalForDay.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 3) Total price */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-700">
          3. Total price
        </h3>
        {grandTotal === 0 ? (
          <p className="text-xs text-slate-500">
            Once you select hotels and meals, the total price will be calculated
            here.
          </p>
        ) : (
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm text-slate-600">
              Grand total for the entire trip:
            </span>
            <span className="text-2xl font-bold text-emerald-600">
              ${grandTotal.toFixed(2)}
            </span>
          </div>
        )}

        <p className="text-[11px] text-slate-400">
          Formula: Total = Σ (hotel price + selected meal prices) for each day.
        </p>
      </div>
    </section>
  );
}

interface SummaryRowProps {
  label: string;
  value: string;
  helper?: string;
}

function SummaryRow({ label, value, helper }: SummaryRowProps) {
  return (
    <div className="flex flex-col">
      <span className="text-[11px] uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <span className="text-sm font-medium text-slate-800">{value}</span>
      {helper && (
        <span className="text-[11px] text-slate-500">{helper}</span>
      )}
    </div>
  );
}
