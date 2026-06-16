import { useState } from "react";
import { ChevronLeft, Search, Phone, Droplets } from "lucide-react";
import { BottomNav } from "./BottomNav";

const BLOOD_GROUPS = ["All", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const BLOOD_BANKS = [
  { id: 1, name: "State Blood Bank", nameBn: "রাজ্য ব্লাড ব্যাংক", distance: "1.2 km", phone: "033-2241-1234", available: { "A+": 45, "B+": 32, "O+": 56, "AB+": 12, "O-": 8, "A-": 6, "B-": 4, "AB-": 3 }, hours: "24/7", type: "Govt" },
  { id: 2, name: "Red Cross Blood Bank", nameBn: "রেড ক্রস ব্লাড ব্যাংক", distance: "2.0 km", phone: "033-2241-5678", available: { "A+": 28, "B+": 19, "O+": 35, "AB+": 7, "O-": 3, "A-": 2, "B-": 1, "AB-": 0 }, hours: "8AM–8PM", type: "NGO" },
  { id: 3, name: "SSKM Blood Bank", nameBn: "এসএসকেএম ব্লাড ব্যাংক", distance: "0.9 km", phone: "033-2223-9000", available: { "A+": 60, "B+": 42, "O+": 78, "AB+": 15, "O-": 12, "A-": 9, "B-": 6, "AB-": 4 }, hours: "24/7", type: "Govt" },
  { id: 4, name: "AMRI Blood Services", nameBn: "এএমআরআই ব্লাড সার্ভিসেস", distance: "3.1 km", phone: "033-6680-0000", available: { "A+": 20, "B+": 14, "O+": 25, "AB+": 5, "O-": 2, "A-": 0, "B-": 0, "AB-": 0 }, hours: "24/7", type: "Private" },
];

const BLOOD_COLORS: Record<string, string> = {
  "O+": "#ff3b30", "O-": "#c0392b", "A+": "#e67e22", "A-": "#d35400",
  "B+": "#8e44ad", "B-": "#6c3483", "AB+": "#2980b9", "AB-": "#1a5276",
};

type Screen = string;
interface Props { onBack: () => void; onNavigate: (s: Screen) => void; }

export function BloodBanksScreen({ onBack, onNavigate }: Props) {
  const [search, setSearch] = useState("");
  const [bloodFilter, setBloodFilter] = useState("All");

  const filtered = BLOOD_BANKS.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
    const matchBlood = bloodFilter === "All" || (b.available[bloodFilter as keyof typeof b.available] ?? 0) > 0;
    return matchSearch && matchBlood;
  });

  return (
    <div className="size-full flex flex-col bg-[#f8f8fa]">
      {/* Header */}
      <div className="shrink-0 bg-white pt-14 pb-4 px-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-1 -ml-1 text-gray-600"><ChevronLeft size={24} /></button>
          <div>
            <h1 className="text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#1a1a2e" }}>Blood Banks</h1>
            <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>ব্লাড ব্যাংক · Near Park Street</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100 mb-3">
          <Search size={16} className="text-gray-400" />
          <input className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400" placeholder="Search blood banks..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ fontFamily: "Inter, sans-serif" }} />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {BLOOD_GROUPS.map((g) => (
            <button key={g} onClick={() => setBloodFilter(g)}
              className="shrink-0 px-3 py-1.5 rounded-xl text-xs transition-all"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: bloodFilter === g ? 700 : 500, background: bloodFilter === g ? (BLOOD_COLORS[g] ?? "#f67e49") : "#f0f0f4", color: bloodFilter === g ? "white" : "#6b7280" }}>
              {g === "All" ? "All Groups" : g}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {/* Emergency donation CTA */}
        <div className="bg-red-50 rounded-3xl p-5 border border-red-100 flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-red-500 flex items-center justify-center text-white text-2xl">🩸</div>
          <div>
            <p className="text-sm text-red-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>Need Blood Urgently?</p>
            <p className="text-xs text-red-600 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>Call helpline: 1910 (24/7 Free)</p>
          </div>
        </div>

        {filtered.map((bank) => (
          <div key={bank.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#1a1a2e" }}>{bank.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-lg" style={{ fontFamily: "Inter, sans-serif", background: bank.type === "Govt" ? "#e8f5e9" : bank.type === "NGO" ? "#e3f2fd" : "#fff3e0", color: bank.type === "Govt" ? "#2e7d32" : bank.type === "NGO" ? "#1565c0" : "#e65100" }}>{bank.type}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{bank.nameBn}</p>
              </div>
              <div className="text-right">
                <p className="text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: "#f67e49" }}>{bank.distance}</p>
                <p className="text-xs text-green-600" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{bank.hours}</p>
              </div>
            </div>

            {/* Blood availability */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {Object.entries(bank.available).map(([type, qty]) => (
                <div key={type} className="rounded-xl p-2 text-center" style={{ background: (qty ?? 0) > 0 ? "#fff5f0" : "#f5f5f5" }}>
                  <div className="text-xs font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: (qty ?? 0) > 0 ? BLOOD_COLORS[type] ?? "#f67e49" : "#bbb" }}>{type}</div>
                  <div className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: (qty ?? 0) > 0 ? "#374151" : "#bbb", fontWeight: 600 }}>{(qty ?? 0) > 0 ? `${qty}u` : "—"}</div>
                </div>
              ))}
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-white text-sm"
              style={{ background: "#f67e49", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
              <Phone size={14} />
              {bank.phone}
            </button>
          </div>
        ))}
        <div className="h-4" />
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}
