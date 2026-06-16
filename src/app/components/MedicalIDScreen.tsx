import { useState } from "react";
import { ChevronLeft, Edit3, Share2, Heart } from "lucide-react";
import { BottomNav } from "./BottomNav";

type Screen = string;
interface Props { onBack: () => void; onNavigate: (s: Screen) => void; }

const QR_CELLS = Array.from({ length: 21 }, (_, r) =>
  Array.from({ length: 21 }, (_, c) => {
    if ((r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7)) return "corner";
    return Math.random() > 0.55 ? "filled" : "empty";
  })
);

export function MedicalIDScreen({ onBack, onNavigate }: Props) {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Arjun Sharma",
    nameBn: "অর্জুন শর্মা",
    age: "28",
    gender: "Male",
    bloodGroup: "B+",
    weight: "72 kg",
    height: "175 cm",
    conditions: "Mild Asthma",
    allergies: "Penicillin, Peanuts",
    medications: "Salbutamol inhaler (as needed)",
    insurance: "ESIC – WB001234",
    organDonor: true,
  });

  const BLOOD_COLORS: Record<string, string> = {
    "B+": "#8e44ad", "A+": "#e67e22", "O+": "#ff3b30", "AB+": "#2980b9",
    "B-": "#6c3483", "A-": "#d35400", "O-": "#c0392b", "AB-": "#1a5276",
  };

  return (
    <div className="size-full flex flex-col bg-[#f8f8fa]">
      {/* Header */}
      <div className="shrink-0 pt-14 pb-4 px-5" style={{ background: "linear-gradient(135deg, #f67e49 0%, #ff3b30 100%)" }}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="text-white/80 p-1 -ml-1"><ChevronLeft size={24} /></button>
          <div className="flex-1">
            <h1 className="text-white text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>Medical ID</h1>
            <p className="text-white/70 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>মেডিকেল পরিচয়পত্র</p>
          </div>
          <button onClick={() => setEditing(!editing)} className="size-9 rounded-2xl bg-white/20 flex items-center justify-center text-white">
            <Edit3 size={16} />
          </button>
          <button className="size-9 rounded-2xl bg-white/20 flex items-center justify-center text-white">
            <Share2 size={16} />
          </button>
        </div>

        {/* Profile card */}
        <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-4 flex items-center gap-4">
          <div className="size-16 rounded-2xl bg-white/25 flex items-center justify-center text-3xl">👤</div>
          <div>
            <p className="text-white text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>{profile.name}</p>
            <p className="text-white/70 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{profile.nameBn}</p>
            <div className="flex gap-2 mt-1">
              <span className="text-xs bg-white/25 text-white px-2 py-0.5 rounded-lg" style={{ fontFamily: "Inter, sans-serif" }}>{profile.age} yrs</span>
              <span className="text-xs bg-white/25 text-white px-2 py-0.5 rounded-lg" style={{ fontFamily: "Inter, sans-serif" }}>{profile.gender}</span>
            </div>
          </div>
          <div className="ml-auto size-14 rounded-2xl flex items-center justify-center text-white text-2xl"
            style={{ background: BLOOD_COLORS[profile.bloodGroup] ?? "#f67e49", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}>
            {profile.bloodGroup}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Weight", value: profile.weight, icon: "⚖️" },
            { label: "Height", value: profile.height, icon: "📏" },
            { label: "Organ Donor", value: profile.organDonor ? "Yes" : "No", icon: "❤️" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-3 text-center shadow-sm border border-gray-100">
              <div className="text-xl">{s.icon}</div>
              <p className="text-sm mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#1a1a2e" }}>{s.value}</p>
              <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Medical info */}
        {[
          { label: "Medical Conditions", labelBn: "চিকিৎসা অবস্থা", value: profile.conditions, icon: "🩺", key: "conditions" as const },
          { label: "Allergies", labelBn: "অ্যালার্জি", value: profile.allergies, icon: "⚠️", key: "allergies" as const },
          { label: "Current Medications", labelBn: "বর্তমান ওষুধ", value: profile.medications, icon: "💊", key: "medications" as const },
          { label: "Insurance", labelBn: "বীমা", value: profile.insurance, icon: "🛡️", key: "insurance" as const },
        ].map((item) => (
          <div key={item.key} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, color: "#1a1a2e" }}>{item.label}</p>
                <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>{item.labelBn}</p>
              </div>
            </div>
            {editing ? (
              <input
                className="w-full bg-gray-50 rounded-xl px-3 py-2 text-sm outline-none border border-orange-200"
                value={item.value}
                onChange={(e) => setProfile((p) => ({ ...p, [item.key]: e.target.value }))}
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            ) : (
              <p className="text-sm text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>{item.value || "—"}</p>
            )}
          </div>
        ))}

        {/* QR Code */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#1a1a2e" }}>QR Code — Hospital Access</p>
          <p className="text-xs text-gray-400 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>Scan to access full medical profile instantly</p>
          <div className="flex justify-center">
            <div className="p-4 bg-white border-2 border-gray-100 rounded-2xl inline-block">
              <svg width={126} height={126} viewBox="0 0 21 21">
                {QR_CELLS.map((row, r) =>
                  row.map((cell, c) => {
                    const inCorner =
                      (r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7);
                    if (inCorner) {
                      const isOuter =
                        r === 0 || r === 6 || c === 0 || c === 6 ||
                        r === 14 || r === 20 || c === 14 || c === 20;
                      const isInner =
                        (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
                        (r >= 2 && r <= 4 && c >= 16 && c <= 18) ||
                        (r >= 16 && r <= 18 && c >= 2 && c <= 4);
                      if (isOuter || isInner)
                        return <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="#1a1a2e" />;
                      return null;
                    }
                    if (cell === "filled")
                      return <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="#1a1a2e" />;
                    return null;
                  })
                )}
              </svg>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-3" style={{ fontFamily: "Inter, sans-serif" }}>ID: WB-EMR-2024-ARJUN-001</p>
        </div>

        {/* Organ donor */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-5 border border-red-100 flex items-center gap-4">
          <Heart size={32} className="text-red-500 fill-red-500 shrink-0" />
          <div>
            <p className="text-sm text-red-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>Registered Organ Donor</p>
            <p className="text-xs text-red-600 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>নিবন্ধিত অঙ্গ দাতা · Pledge ID: WB-OD-001234</p>
          </div>
        </div>

        {editing && (
          <button
            onClick={() => setEditing(false)}
            className="w-full py-4 text-white rounded-3xl"
            style={{ background: "#f67e49", fontFamily: "Inter, sans-serif", fontWeight: 700 }}
          >
            Save Changes
          </button>
        )}
        <div className="h-4" />
      </div>

      <BottomNav active="medicalid" onNavigate={onNavigate} />
    </div>
  );
}
