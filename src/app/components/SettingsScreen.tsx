import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BottomNav } from "./BottomNav";
import imgProfile from "../../imports/Mock02/8ec55a7e65b48fc7bd20d99f729831ca45aebf3b.png";

type Screen = string;
interface Props { onBack: () => void; onNavigate: (s: Screen) => void; }

const SETTINGS = [
  { section: "Profile", items: [
    { icon: "👤", label: "Personal Information", labelBn: "ব্যক্তিগত তথ্য", screen: "medicalid" },
    { icon: "🆘", label: "Emergency Contacts", labelBn: "জরুরি যোগাযোগ", screen: "contacts" },
    { icon: "🩺", label: "Medical ID", labelBn: "মেডিকেল আইডি", screen: "medicalid" },
  ]},
  { section: "Preferences", items: [
    { icon: "🌐", label: "Language / ভাষা", labelBn: "", toggle: true, key: "language" },
    { icon: "🔔", label: "Notifications", labelBn: "বিজ্ঞপ্তি", toggle: true, key: "notifications" },
    { icon: "♿", label: "Accessibility", labelBn: "অ্যাক্সেসযোগ্যতা", toggle: true, key: "accessibility" },
  ]},
  { section: "App", items: [
    { icon: "✨", label: "View Welcome Flow", labelBn: "স্বাগতম স্ক্রীন দেখুন", screen: "splash" },
    { icon: "🔒", label: "Data Privacy", labelBn: "ডেটা গোপনীয়তা" },
    { icon: "❓", label: "Help Center", labelBn: "সহায়তা কেন্দ্র" },
    { icon: "⭐", label: "Rate JibonSetu", labelBn: "অ্যাপটি রেট করুন" },
    { icon: "ℹ️", label: "About", labelBn: "সম্পর্কে", note: "v2.1.0" },
  ]},
];

export function SettingsScreen({ onBack, onNavigate }: Props) {
  const [toggles, setToggles] = useState<Record<string, boolean>>({ language: false, notifications: true, accessibility: false });

  const Toggle = ({ val, onChange }: { val: boolean; onChange: (e?: React.MouseEvent) => void }) => (
    <button
      onClick={onChange}
      className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors"
      style={{ background: val ? "#f67e49" : "#d1d5db" }}
    >
      <span
        className="inline-block size-5 rounded-full bg-white shadow transition-transform"
        style={{ transform: val ? "translateX(24px)" : "translateX(2px)" }}
      />
    </button>
  );

  return (
    <div className="size-full flex flex-col bg-[#f8f8fa]">
      {/* Header */}
      <div className="shrink-0 bg-white pt-14 pb-4 px-5 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 -ml-1 text-gray-600"><ChevronLeft size={24} /></button>
          <h1 className="text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#1a1a2e" }}>Settings</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="size-16 rounded-2xl overflow-hidden border-2 border-orange-100">
            <img src={imgProfile} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#1a1a2e" }}>Arjun Sharma</p>
            <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>অর্জুন শর্মা</p>
            <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>+91 98300 12345 · B+</p>
          </div>
          <div className="size-8 rounded-xl bg-orange-50 flex items-center justify-center">
            <ChevronRight size={16} className="text-orange-400" />
          </div>
        </div>

        {/* Language banner */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-orange-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
              {toggles.language ? "বাংলা ভাষা সক্রিয়" : "Language: English"}
            </p>
            <p className="text-xs text-orange-500 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
              {toggles.language ? "Switch to English" : "বাংলায় পরিবর্তন করুন"}
            </p>
          </div>
          <Toggle val={toggles.language} onChange={() => setToggles((t) => ({ ...t, language: !t.language }))} />
        </div>

        {SETTINGS.map((section) => (
          <div key={section.section}>
            <p className="text-xs text-gray-400 mb-2 px-1 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>{section.section}</p>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              {section.items.map((item, idx) => (
                <div
                  key={item.label}
                  onClick={() => {
                    if (item.screen) {
                      onNavigate(item.screen);
                    } else if (item.toggle !== undefined) {
                      const key = item.key ?? "dummy";
                      setToggles((t) => ({ ...t, [key]: !t[key] }));
                    }
                  }}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors cursor-pointer select-none"
                  style={{ borderBottom: idx < section.items.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
                >
                  <span className="text-xl w-7 text-center">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#1a1a2e" }}>{item.label}</p>
                    {item.labelBn && <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>{item.labelBn}</p>}
                  </div>
                  {item.toggle !== undefined ? (
                    <Toggle
                      val={toggles[item.key ?? ""] ?? false}
                      onChange={(e) => {
                        e?.stopPropagation();
                        const key = item.key ?? "dummy";
                        setToggles((t) => ({ ...t, [key]: !t[key] }));
                      }}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      {item.note && <span className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>{item.note}</span>}
                      <ChevronRight size={16} className="text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button 
          onClick={() => onNavigate("login")}
          className="w-full py-4 bg-white rounded-3xl border border-red-100 text-red-500 shadow-sm transition-colors hover:bg-red-50"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
        >
          Sign Out
        </button>

        {/* Tagline */}
        <div className="text-center py-2">
          <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>JibonSetu · জীবনসেতু</p>
          <p className="text-xs text-gray-300 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>Every Second Matters · প্রতিটি মুহূর্ত জীবন বাঁচাতে পারে</p>
        </div>
        <div className="h-4" />
      </div>

      <BottomNav active="settings" onNavigate={onNavigate} />
    </div>
  );
}
