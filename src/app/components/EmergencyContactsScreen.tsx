import { useState } from "react";
import { ChevronLeft, Plus, Phone, Trash2, Edit3, User } from "lucide-react";
import { BottomNav } from "./BottomNav";

const INITIAL_CONTACTS = [
  { id: 1, name: "Sunita Sharma", nameBn: "সুনিতা শর্মা", relation: "Mother", phone: "+91 98301 12345", priority: 1, notified: true },
  { id: 2, name: "Raj Sharma", nameBn: "রাজ শর্মা", relation: "Father", phone: "+91 98302 67890", priority: 2, notified: true },
  { id: 3, name: "Dr. Amitabh Roy", nameBn: "ডাঃ অমিতাভ রায়", relation: "Doctor", phone: "+91 98303 11111", priority: 3, notified: false },
  { id: 4, name: "Priya Sharma", nameBn: "প্রিয়া শর্মা", relation: "Sister", phone: "+91 98304 22222", priority: 4, notified: true },
];

const RELATION_COLORS: Record<string, { bg: string; text: string }> = {
  Mother: { bg: "#fce4ec", text: "#c2185b" },
  Father: { bg: "#e3f2fd", text: "#1565c0" },
  Doctor: { bg: "#e8f5e9", text: "#2e7d32" },
  Sister: { bg: "#f3e5f5", text: "#7b1fa2" },
  Brother: { bg: "#e8eaf6", text: "#283593" },
  Friend: { bg: "#fff3e0", text: "#e65100" },
  Caregiver: { bg: "#e0f2f1", text: "#004d40" },
};

type Screen = string;
interface Props { onBack: () => void; onNavigate: (s: Screen) => void; }

export function EmergencyContactsScreen({ onBack, onNavigate }: Props) {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", relation: "Friend", phone: "" });

  const addContact = () => {
    if (!form.name || !form.phone) return;
    setContacts((c) => [...c, { id: Date.now(), name: form.name, nameBn: "", relation: form.relation, phone: form.phone, priority: c.length + 1, notified: true }]);
    setForm({ name: "", relation: "Friend", phone: "" });
    setShowAdd(false);
  };

  const remove = (id: number) => setContacts((c) => c.filter((x) => x.id !== id));

  return (
    <div className="size-full flex flex-col bg-[#f8f8fa]">
      {/* Header */}
      <div className="shrink-0 bg-white pt-14 pb-4 px-5 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 -ml-1 text-gray-600"><ChevronLeft size={24} /></button>
          <div className="flex-1">
            <h1 className="text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#1a1a2e" }}>Emergency Contacts</h1>
            <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>জরুরি যোগাযোগ · Notified during SOS</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="size-10 rounded-2xl flex items-center justify-center text-white"
            style={{ background: "#f67e49" }}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* SOS notification info */}
      <div className="mx-4 mt-4 bg-orange-50 rounded-2xl p-4 border border-orange-100 flex items-start gap-3">
        <div className="shrink-0 size-9 rounded-xl bg-orange-500 flex items-center justify-center text-white text-base">📣</div>
        <div>
          <p className="text-sm text-orange-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>SOS Auto-Notify</p>
          <p className="text-xs text-orange-600 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
            When SOS is triggered, all marked contacts receive your live location, ambulance details, and hospital destination.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {contacts.map((c, idx) => {
          const colors = RELATION_COLORS[c.relation] ?? { bg: "#f5f5f5", text: "#666" };
          return (
            <div key={c.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: colors.bg }}>
                  <User size={20} color={colors.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs rounded-lg px-2 py-0.5" style={{ background: colors.bg, color: colors.text, fontFamily: "Inter, sans-serif", fontWeight: 600 }}>#{idx + 1} Priority</span>
                    <span className="text-xs rounded-lg px-2 py-0.5" style={{ background: colors.bg, color: colors.text, fontFamily: "Inter, sans-serif" }}>{c.relation}</span>
                  </div>
                  <p className="text-base mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#1a1a2e" }}>{c.name}</p>
                  <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>{c.phone}</p>
                </div>
                <div className="flex items-center gap-1">
                  {c.notified && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>✓</span>}
                  <button onClick={() => remove(c.id)} className="size-8 flex items-center justify-center rounded-xl bg-red-50 text-red-400">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-xs"
                  style={{ background: "#f67e49", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                  <Phone size={13} />
                  Call Now
                </button>
                <button className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-xs flex items-center gap-1.5"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                  <Edit3 size={13} />
                  Edit
                </button>
                <div className="px-3 py-2.5 rounded-xl flex items-center gap-1.5"
                  style={{ background: c.notified ? "#f0fdf4" : "#f9fafb" }}>
                  <div className="size-2 rounded-full" style={{ background: c.notified ? "#22c55e" : "#d1d5db" }} />
                  <span className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: c.notified ? "#16a34a" : "#9ca3af", fontWeight: 600 }}>
                    {c.notified ? "Notified" : "Off"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div className="h-4" />
      </div>

      {/* Add modal */}
      {showAdd && (
        <div className="absolute inset-0 bg-black/50 flex items-end z-50" onClick={() => setShowAdd(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>Add Emergency Contact</h3>
            <input
              className="w-full bg-gray-50 rounded-2xl px-4 py-3 text-sm outline-none border border-gray-100"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            <select
              className="w-full bg-gray-50 rounded-2xl px-4 py-3 text-sm outline-none border border-gray-100"
              value={form.relation}
              onChange={(e) => setForm((f) => ({ ...f, relation: e.target.value }))}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {["Mother", "Father", "Sister", "Brother", "Friend", "Doctor", "Caregiver"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <input
              className="w-full bg-gray-50 rounded-2xl px-4 py-3 text-sm outline-none border border-gray-100"
              placeholder="Phone number (+91 ...)"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            <div className="flex gap-3 pt-1">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-3 bg-gray-100 rounded-2xl text-gray-700" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Cancel</button>
              <button onClick={addContact} className="flex-1 py-3 text-white rounded-2xl" style={{ background: "#f67e49", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Add Contact</button>
            </div>
          </div>
        </div>
      )}

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}
