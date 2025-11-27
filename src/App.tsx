// src/App.tsx
import TripConfigForm from "./components/TripConfigForm";
import DailyConfigTable from "./components/DailyConfigTable";
import SummarySection from "./components/SummarySection";
import { useBooking } from "./context/BookingContext";

function App() {
  const { state } = useBooking();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <header>
          <h1 className="text-2xl font-bold">
            Hotel Booking System
          </h1>
          <p className="text-sm text-slate-600">
            Step 1: Trip configuration · Step 2: Daily configuration · Step 3:
            Summary & price
          </p>
        </header>

        <TripConfigForm />
        <DailyConfigTable />
        <SummarySection />

        {/* Debug – istəsən saxla, istəsən sonra silərsən */}
        <section className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs">
          <div className="font-semibold mb-1">Debug: Full booking state</div>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </section>
      </div>
    </div>
  );
}

export default App;
