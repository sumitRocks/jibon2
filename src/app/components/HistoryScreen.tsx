import { ChevronLeft, ChevronRight, Clock, MapPin, Truck } from "lucide-react";
import { BottomNav } from "./BottomNav";

type Screen = string;
interface Props { onBack: () => void; onNavigate: (s: Screen) => void; }

const HISTORY = [
  { id: 1, date: "June 10, 2026", dateBn: "১০ জুন ২০২৬", type: "Road Accident", typeBn: "সড়ক দুর্ঘটনা", hospital: "SSKM Hospital", responseTime: "6 min", outcome: "Treated & Discharged", status: "closed", ambulance: "WB 23 AB 4521", emt: "Dr. Priya Chatterjee", icon: "🚗" },
  { id: 2, date: "March 3, 2026", dateBn: "৩ মার্চ ২০২৬", type: "Chest Pain", typeBn: "বুকে ব্যথা", hospital: "Apollo Gleneagles", responseTime: "9 min", outcome: "Admitted – 2 days", status: "closed", ambulance: "WB 23 CD 7890", emt: "Dr. Rahul Sen", icon: "❤️" },
  { id: 3, date: "November 18, 2025", dateBn: "১৮ নভেম্বর ২০২৫", type: "Fall Injury", typeBn: "পড়ে আঘাত", hospital: "Park Clinic", responseTime: "11 min", outcome: "Treated & Discharged", status: "closed", ambulance: "WB 23 EF 1122", emt: "Nurse Ananya Das", icon: "🤕" },
];

const STATUS_COLOR: Record<string, { bg: string; text: string }> = {
  closed: { bg: "#f0fdf4", text: "#16a34a" },
  active: { bg: "#fef3c7", text: "#d97706" },
};

export function HistoryScreen({ onBack, onNavigate }: Props) {
  return (
    <div className="size-full flex flex-col bg-[#f8f8fa]">
      {/* Header */}
      <div className="shrink-0 bg-white pt-14 pb-4 px-5 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 -ml-1 text-gray-600"><ChevronLeft size={24} /></button>
          <div>
            <h1 className="text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#1a1a2e" }}>Emergency History</h1>
            <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>জরুরি ইতিহাস · {HISTORY.length} past emergencies</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-4 mt-4 grid grid-cols-3 gap-3">
        {[
          { label: "Total", value: HISTORY.length, icon: "📋", color: "#f67e49" },
          { label: "Avg Response", value: "8.7m", icon: "⚡", color: "#10b981" },
          { label: "Year 2026", value: 2, icon: "📅", color: "#8b5cf6" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-3 text-center shadow-sm border border-gray-100">
            <div className="text-xl">{s.icon}</div>
            <p className="text-lg mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: s.color }}>{s.value}</p>
            <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {HISTORY.map((h) => {
          const sc = STATUS_COLOR[h.status] ?? STATUS_COLOR.closed;
          return (
            <div key={h.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="size-12 rounded-2xl flex items-center justify-center text-2xl bg-gray-50">{h.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#1a1a2e" }}>{h.type}</p>
                    <span className="text-xs px-2 py-0.5 rounded-lg" style={{ background: sc.bg, color: sc.text, fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Closed</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{h.typeBn}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {[
                  { icon: <Clock size={13} />, text: `${h.date} · Response: ${h.responseTime}` },
                  { icon: <MapPin size={13} />, text: h.hospital },
                  { icon: <Truck size={13} />, text: `${h.ambulance} · ${h.emt}` },
                ].map((row, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="text-gray-400">{row.icon}</span>
                    <span style={{ fontFamily: "Inter, sans-serif" }}>{row.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="px-3 py-1.5 rounded-xl bg-gray-50 text-xs text-gray-600" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
                  {h.outcome}
                </div>
                <button className="flex items-center gap-1 text-xs text-[#f67e49]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                  View Report <ChevronRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
        <div className="h-4" />
      </div>

      <BottomNav active="history" onNavigate={onNavigate} />
    </div>
  );
}
