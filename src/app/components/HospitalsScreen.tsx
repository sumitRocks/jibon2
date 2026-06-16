import { useState, useMemo } from "react";
import { ChevronLeft, Search, MapPin, Clock, Bed, Phone, Star, Info, Navigation, ArrowRight, Eye, CheckCircle } from "lucide-react";
import { BottomNav } from "./BottomNav";

interface Hospital {
  id: number;
  name: string;
  nameBn: string;
  distance: string;
  eta: string;
  emergency: boolean;
  icu: string;
  beds: string;
  bedsCount: number;
  wait: string;
  type: string[];
  rating: number;
  address: string;
  pinX: string; // Coordinate percentages for custom map representation
  pinY: string;
  description: string;
  phone: string;
}

const FILTERS = ["All", "Trauma", "Cardiac", "Stroke", "Children", "Maternity", "Govt", "Private"];

const HOSPITALS: Hospital[] = [
  {
    id: 1,
    name: "SSKM Hospital (PG Hospital)",
    nameBn: "এসএসকেএম হাসপাতাল",
    distance: "1.2 km",
    eta: "4 min",
    emergency: true,
    icu: "ICU Open",
    beds: "24 beds available",
    bedsCount: 24,
    wait: "~15 min",
    type: ["Govt", "Trauma", "Cardiac", "Stroke"],
    rating: 4.7,
    address: "244, A.J.C. Bose Road, Kolkata",
    pinX: "32%",
    pinY: "38%",
    description: "IPGME&R and SSKM Hospital is a premier national research hospital and the largest state-run medical facility in West Bengal, providing specialized trauma and cardiac treatment protocols 24/7.",
    phone: "+91 33 2204 1100",
  },
  {
    id: 2,
    name: "Medical College Kolkata",
    nameBn: "মেডিকেল কলেজ হাসপাতাল",
    distance: "2.6 km",
    eta: "7 min",
    emergency: true,
    icu: "ICU Open",
    beds: "12 beds available",
    bedsCount: 12,
    wait: "~25 min",
    type: ["Govt", "Trauma", "Children", "Maternity"],
    rating: 4.5,
    address: "88, College Street, Kolkata",
    pinX: "82%",
    pinY: "26%",
    description: "Kolkata Medical College is Asia's oldest operating medical institution. It supports critical disaster recovery, emergency quarantine beds, pediatric ICU care, and maternal services.",
    phone: "+91 33 2241 3555",
  },
  {
    id: 3,
    name: "Fortis Hospital Anandapur",
    nameBn: "ফোর্টিস হাসপাতাল",
    distance: "3.2 km",
    eta: "14 min",
    emergency: true,
    icu: "ICU Full",
    beds: "31 beds available",
    bedsCount: 31,
    wait: "~12 min",
    type: ["Private", "Trauma", "Cardiac"],
    rating: 4.6,
    address: "730, Anandapur, Kolkata",
    pinX: "18%",
    pinY: "68%",
    description: "Fortis Healthcare is a highly advanced multi-specialty tertiary care hospital with leading surgical wings, certified stroke response teams, and modern diagnostics.",
    phone: "+91 33 6628 4444",
  },
  {
    id: 4,
    name: "Apollo Multispecialty Kolkata",
    nameBn: "অ্যাপোলো হাসপাতাল",
    distance: "4.1 km",
    eta: "18 min",
    emergency: true,
    icu: "ICU Open",
    beds: "18 beds available",
    bedsCount: 18,
    wait: "~10 min",
    type: ["Private", "Cardiac", "Stroke"],
    rating: 4.8,
    address: "58, Canal Circular Rd, Kolkata",
    pinX: "84%",
    pinY: "58%",
    description: "Renowned private entity featuring quick cardiac catherization lab responses, neuro-navigation systems, and air-ambulance integration.",
    phone: "+91 33 2320 3040",
  },
];

type Screen = string;

interface Props {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export function HospitalsScreen({ onBack, onNavigate }: Props) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "map">("map");
  
  // Selected state for active hospital in map view
  const [selectedHospitalId, setSelectedHospitalId] = useState<number>(1);
  const [showDirectionsMode, setShowDirectionsMode] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState<Hospital | null>(null);

  // Active hospital selector
  const activeHospital = useMemo(() => {
    return HOSPITALS.find((h) => h.id === selectedHospitalId) || HOSPITALS[0];
  }, [selectedHospitalId]);

  // Filtration logic for list mode
  const filteredHospitals = useMemo(() => {
    return HOSPITALS.filter((h) => {
      const matchesFilter = filter === "All" || h.type.includes(filter);
      const matchesSearch =
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.nameBn.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div className="size-full flex flex-col bg-white relative overflow-hidden select-none">
      
      {/* 1. Header (Dynamic depending on map or list view) */}
      {view === "list" && (
        <div className="shrink-0 bg-white pt-12 pb-4 px-5 border-b border-gray-100 shadow-sm z-30">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Lufga', 'Plus Jakarta Sans', sans-serif" }}>
                Nearest Hospitals
              </h1>
              <p className="text-xs text-gray-400 font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                নিকটতম হাসপাতাল · Park Street, Kolkata
              </p>
            </div>

            {/* Micro Tab Map/List Selector */}
            <div className="ml-auto pointer-events-auto select-none">
              <div className="bg-[#2e2e2e] p-1 rounded-full flex items-center justify-between w-28 border border-neutral-700 shadow-md">
                <button
                  className="font-semibold text-[10px] h-6 px-3.5 rounded-full flex items-center justify-center transition-all text-zinc-400 hover:text-white"
                  onClick={() => setView("map")}
                >
                  Map
                </button>
                <button
                  className="font-semibold text-[10px] h-6 px-3.5 rounded-full flex items-center justify-center transition-all bg-white text-black shadow-sm"
                  onClick={() => setView("list")}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Search box styled to fit theme */}
          <div className="flex items-center gap-2.5 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100 shadow-inner focus-within:border-orange-200 focus-within:bg-white transition-all">
            <Search size={16} className="text-gray-400" />
            <input
              className="flex-1 bg-transparent outline-none text-sm text-gray-750 placeholder-gray-400"
              placeholder="Search critical care hospitals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>

          {/* Filters List Chips */}
          <div className="flex gap-2 mt-3.5 overflow-x-auto pb-1 scrollbar-none">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="shrink-0 px-3.5 py-2 rounded-xl text-xs transition-all active:scale-95"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: filter === f ? 700 : 500,
                  background: filter === f ? "#F67E49" : "#F3F4F6",
                  color: filter === f ? "white" : "#4B5563",
                  border: filter === f ? "1px solid #F67E49" : "1px solid transparent",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Visual Content Area */}
      <div className="flex-1 relative w-full overflow-hidden">
        
        {view === "map" ? (
          // ================= MAP VIEW =================
          <div className="size-full bg-[#eae6df] relative overflow-hidden">
            
            {/* Custom High-Fidelity Road Network & Park Vector Map */}
            <svg className="absolute inset-0 size-full z-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Park & Greens area polygons matching elite aesthetic map */}
              <rect x="0" y="0" width="120" height="150" rx="20" fill="#deebdd" fillOpacity="0.8" />
              <rect x="30%" y="15%" width="22%" height="14%" rx="18" fill="#d2e5d1" fillOpacity="0.7" />
              <rect x="75%" y="68%" width="30%" height="22%" rx="30" fill="#deebdd" fillOpacity="0.9" />
              <circle cx="90%" cy="15%" r="60" fill="#deebdd" fillOpacity="0.8" />

              {/* Street grid sidewalks backing */}
              {/* Jawaharlal Nehru Road (Main diagonal) */}
              <line x1="-50" y1="90%" x2="110%" y2="-50" stroke="#dfdbd3" strokeWidth="54" strokeLinecap="round" />
              {/* Park Street (Horizontal middle) */}
              <line x1="-10%" y1="46%" x2="110%" y2="46%" stroke="#dfdbd3" strokeWidth="48" strokeLinecap="round" />
              {/* 86th Street (Vertical) */}
              <line x1="48%" y1="-10%" x2="48%" y2="110%" stroke="#dfdbd3" strokeWidth="44" strokeLinecap="round" />
              {/* Balasubramaniam Salai */}
              <line x1="15%" y1="-10%" x2="15%" y2="110%" stroke="#dfdbd3" strokeWidth="40" strokeLinecap="round" />
              {/* 16th Avenue */}
              <line x1="-10%" y1="84%" x2="110%" y2="84%" stroke="#dfdbd3" strokeWidth="42" strokeLinecap="round" />
              {/* 88th Street */}
              <line x1="-10%" y1="12%" x2="110%" y2="12%" stroke="#dfdbd3" strokeWidth="40" strokeLinecap="round" />

              {/* Core Road Layers */}
              <line x1="-50" y1="90%" x2="110%" y2="-50" stroke="#fcfbfa" strokeWidth="46" strokeLinecap="round" id="road-nehru" />
              <line x1="-10%" y1="46%" x2="110%" y2="46%" stroke="#fcfbfa" strokeWidth="40" strokeLinecap="round" id="road-park" />
              <line x1="48%" y1="-10%" x2="48%" y2="110%" stroke="#fcfbfa" strokeWidth="36" strokeLinecap="round" id="road-86th" />
              <line x1="15%" y1="-10%" x2="15%" y2="110%" stroke="#fcfbfa" strokeWidth="32" strokeLinecap="round" id="road-balasubramaniam" />
              <line x1="-10%" y1="84%" x2="110%" y2="84%" stroke="#fcfbfa" strokeWidth="34" strokeLinecap="round" id="road-16th" />
              <line x1="-10%" y1="12%" x2="110%" y2="12%" stroke="#fcfbfa" strokeWidth="32" strokeLinecap="round" id="road-88th" />

              {/* Road center dashed decoration lines */}
              <line x1="-10%" y1="46%" x2="110%" y2="46%" stroke="#eddcc3" strokeWidth="1.5" strokeDasharray="8,9" />
              <line x1="48%" y1="-10%" x2="48%" y2="110%" stroke="#eddcc3" strokeWidth="1.2" strokeDasharray="8,9" />
              <line x1="15%" y1="-10%" x2="15%" y2="110%" stroke="#eddcc3" strokeWidth="1.2" strokeDasharray="8,9" />

              {/* Simulative Active Dynamic Routing Navigation Path overlay when requested */}
              {showDirectionsMode && (
                <>
                  {/* Dynamic path from User (50%, 46%) toward SSKM Hospital (32%, 38%) or others along the vector layout */}
                  {selectedHospitalId === 1 && (
                    <path
                      d="M 196 395 L 126 395 L 126 330"
                      fill="none"
                      stroke="#4285F4"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.9"
                      className="animate-pulse"
                    />
                  )}
                  {selectedHospitalId === 2 && (
                    <path
                      d="M 196 395 L 322 395 L 322 225"
                      fill="none"
                      stroke="#4285F4"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.9"
                      className="animate-pulse"
                    />
                  )}
                  {selectedHospitalId === 3 && (
                    <path
                      d="M 196 395 L 70 395 L 70 585"
                      fill="none"
                      stroke="#4285F4"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.9"
                      className="animate-pulse"
                    />
                  )}
                  {selectedHospitalId === 4 && (
                    <path
                      d="M 196 395 L 330 395 L 330 500"
                      fill="none"
                      stroke="#4285F4"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.9"
                      className="animate-pulse"
                    />
                  )}
                </>
              )}
            </svg>

            {/* Typography Street Names (Decorative rotated text like real maps) */}
            <div className="absolute text-[8px] font-bold text-gray-400 uppercase tracking-widest pointer-events-none select-none select-none" style={{ left: "18%", top: "43%", transform: "rotate(0deg)", fontFamily: "monospace" }}>
              Park Street
            </div>
            <div className="absolute text-[8px] font-bold text-gray-400 uppercase tracking-widest pointer-events-none select-none" style={{ left: "50%", top: "25%", transform: "rotate(90deg)", fontFamily: "monospace" }}>
              86th Street
            </div>
            <div className="absolute text-[8px] font-bold text-gray-400 uppercase tracking-widest pointer-events-none select-none" style={{ left: "7%", top: "22%", transform: "rotate(90deg)", fontFamily: "monospace" }}>
              Balasubramaniam Salai
            </div>
            <div className="absolute text-[7px] font-bold text-gray-400 uppercase tracking-widest pointer-events-none select-none" style={{ left: "83%", top: "42%", transform: "rotate(-40deg)", fontFamily: "monospace" }}>
              Jawaharlal Nehru Road
            </div>
            <div className="absolute text-[8px] font-bold text-gray-400 uppercase tracking-widest pointer-events-none select-none" style={{ left: "54%", top: "86%", transform: "rotate(0deg)", fontFamily: "monospace" }}>
              16th Avenue
            </div>

            {/* Float Labels for Parks/Gardens */}
            <div className="absolute bg-[#deebdd]/40 text-[#4c674b] text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider pointer-events-none select-none" style={{ left: "45%", top: "18%" }}>
              Nirmala Girls Ground
            </div>

            {/* ================= FLOATING ACTION HEADER PILLS ================= */}
            <div className="absolute top-12 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
              
              {/* Location selector Pill */}
              <div className="flex items-center gap-2 pointer-events-auto">
                <div className="bg-black/95 hover:bg-black border border-neutral-800 text-white font-semibold text-xs py-2.5 px-4 rounded-full flex items-center gap-2 select-none shadow-lg active:scale-95 transition-all cursor-pointer">
                  <MapPin size={13} className="text-red-500 fill-red-500" />
                  <span style={{ fontFamily: "Inter, sans-serif" }}>Park Street, Kolkata</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="opacity-70">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Switch View Pills */}
              <div className="bg-[#1f1f2e] p-1 rounded-full flex items-center justify-between w-28 border border-neutral-800 shadow-xl pointer-events-auto">
                <button
                  className="font-semibold text-[10px] h-7 px-3.5 rounded-full flex items-center justify-center transition-all bg-white text-black shadow-md font-bold"
                  onClick={() => setView("map")}
                >
                  Map
                </button>
                <button
                  className="font-semibold text-[10px] h-7 px-3.5 rounded-full flex items-center justify-center transition-all text-zinc-400 hover:text-white"
                  onClick={() => setView("list")}
                >
                  List
                </button>
              </div>

            </div>

            {/* ================= MAP MARKERS (YOU & HOSPITALS) ================= */}

            {/* CURRENT LOCATION INDICATOR (Glowing & Pulsating Blue) */}
            {/* Placed at relative (50%, 46%) representing center intersection */}
            <div
              className="absolute z-10 select-none cursor-pointer"
              style={{ left: "50%", top: "46%", transform: "translate(-50%, -50%)" }}
            >
              {/* Ripple Ring 1 */}
              <div className="absolute inset-[-14px] bg-blue-500/10 rounded-full animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
              {/* Ripple Ring 2 */}
              <div className="absolute inset-[-28px] bg-blue-500/5 rounded-full animate-pulse pointer-events-none" style={{ animationDuration: "2s" }} />
              
              {/* Outer bright outline pointer */}
              <div className="bg-white border-[3px] border-blue-500 size-[32px] rounded-full shadow-[0_4px_12px_rgba(59,130,246,0.36)] flex items-center justify-center relative active:scale-90 transition-all">
                {/* Arrowhead direction inside */}
                <div className="bg-blue-500 text-white p-1 rounded-full flex items-center justify-center size-[22px] transform rotate-[-45deg] shadow-inner">
                  <Navigation size={10} className="fill-white stroke-white" />
                </div>
              </div>
            </div>

            {/* INDIVIDUAL HOSPITAL PINS DROPPED */}
            {HOSPITALS.map((h) => {
              const isSelected = selectedHospitalId === h.id;
              return (
                <div
                  key={h.id}
                  onClick={() => {
                    setSelectedHospitalId(h.id);
                    setShowDirectionsMode(false); // Reset dynamic directions on tap
                  }}
                  className={`absolute z-20 cursor-pointer flex flex-col items-center transition-all duration-300 ${
                    isSelected ? "scale-110" : "hover:scale-105 opacity-85 hover:opacity-100"
                  }`}
                  style={{ left: h.pinX, top: h.pinY, transform: "translate(-50%, -50%)" }}
                >
                  
                  {/* Selected glowing ring */}
                  {isSelected && (
                    <div className="absolute inset-[-12px] rounded-full border-[1.5px] border-[#F67E49] animate-pulse" />
                  )}

                  {/* Distinct Red Pin Container */}
                  <div
                    className={`size-11 rounded-full flex items-center justify-center border-4 relative transition-all shadow-[0_4px_16px_rgba(246,126,73,0.3)] ${
                      isSelected
                        ? "bg-[#FE290F] border-white scale-105"
                        : "bg-[#f67e49] border-white"
                    }`}
                  >
                    {/* SVG hospital building icon inside white line */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="9" width="18" height="12" rx="2" />
                      <line x1="12" y1="13" x2="12" y2="17" />
                      <line x1="10" y1="15" x2="14" y2="15" />
                      <path d="M14 9V5a2 2 0 0 0-2-2H9" />
                    </svg>
                  </div>

                  {/* Micro Name Float Banner under Pin */}
                  <div className={`mt-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold shadow transition-all ${
                    isSelected
                      ? "bg-black text-white"
                      : "bg-white/90 text-gray-700"
                  }`} style={{ fontFamily: "Inter, sans-serif" }}>
                    {h.id === 1 ? "SSKM (PG)" : h.id === 2 ? "Medical College" : h.id === 3 ? "Fortis" : "Apollo"}
                  </div>

                </div>
              );
            })}

            {/* ================= SLIDING INTERACTIVE MEDICAL PANEL (DRAWER) ================= */}
            <div className="absolute bottom-5 left-4 right-4 bg-white rounded-[32px] shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-slate-100/80 p-5 flex flex-col z-30 transition-all duration-300">
              
              {/* Heartbeat design icon + Title and parameters */}
              <div className="flex gap-4 items-start">
                
                {/* Heartbeat pulse icon box */}
                <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl size-14 shrink-0 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-1.5 rounded-xl bg-blue-50/50 flex items-center justify-center">
                    {/* Pulsing visual line */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2B7FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                      <path d="M22 12h-2.5l-2-6-3 12-3-15-3 11-1.5-4H2" />
                    </svg>
                  </div>
                </div>

                {/* Info titles */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-[#1D293D] leading-snug truncate" style={{ fontFamily: "Inter, sans-serif" }}>
                    {activeHospital.name}
                  </h3>

                  {/* Subtitle Parameter Row */}
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500 font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-[#90A1B9]" />
                      <span className="text-[#62748E]">{activeHospital.eta}</span>
                    </div>
                    <span className="text-[#CAD5E2] font-normal">•</span>
                    <span className="text-[#314158] font-bold">{activeHospital.distance}</span>
                    <span className="text-[#CAD5E2] font-normal">•</span>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-[#FFB900] fill-[#FFB900]" />
                      <span className="text-[#314158] font-bold">{activeHospital.rating}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Status Badges Tags section */}
              <div className="flex flex-wrap gap-2 mt-4">
                
                {/* ICU Status tag */}
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  activeHospital.icu.includes("Open") 
                    ? "bg-[#f0fdf4] text-[#008236] border border-[#dcfce7]" 
                    : "bg-red-50 text-red-600 border border-red-100"
                }`}>
                  {activeHospital.icu}
                </span>

                {/* Sector tag */}
                <span className="bg-[#eff6ff] text-[#1447e6] border border-[#dbeafe] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {activeHospital.type.includes("Govt") ? "Govt" : "Private"}
                </span>

                {/* Available beds count tag */}
                <div className="bg-[#ecfdf5] text-[#007a55] border border-[#d0fae5] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  {/* Bed vector */}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 4v16" />
                    <path d="M2 11h20" />
                    <path d="M2 17h20" />
                    <path d="M22 4v16" />
                    <rect x="6" y="4" width="12" height="13" rx="2" />
                  </svg>
                  <span>{activeHospital.bedsCount} Beds available</span>
                </div>

              </div>

              {/* Thin divisor line */}
              <div className="h-[1px] bg-slate-150/40 my-4" />

              {/* Action controllers row */}
              <div className="flex items-center gap-3">
                
                {/* View Details clickable */}
                <button
                  onClick={() => setShowDetailsModal(activeHospital)}
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-colors text-[#62748E] font-bold text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <Info size={16} />
                  <span>Details</span>
                </button>

                {/* Dynamic Route Simulator / Get Directions button */}
                <button
                  onClick={() => {
                    setShowDirectionsMode(true);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl border-2 font-bold text-sm active:scale-95 transition-all text-center ${
                    showDirectionsMode
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-white border-[#f67e49]/20 text-[#f67e49] hover:bg-orange-50/20"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {showDirectionsMode ? (
                    <>
                      <CheckCircle size={16} />
                      <span>Route Active ({activeHospital.eta})</span>
                    </>
                  ) : (
                    <>
                      <Navigation size={16} className="fill-[#f67e49] stroke-[#f67e49]" />
                      <span>Get Directions</span>
                    </>
                  )}
                </button>

              </div>

            </div>

          </div>
        ) : (
          // ================= LIST VIEW (ENHANCED PREMIUM CARDS) =================
          <div className="size-full overflow-y-auto px-4 py-4 space-y-3.5 bg-[#f8f9fb]">
            {filteredHospitals.map((h) => (
              <div
                key={h.id}
                className="bg-white rounded-[28px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-gray-100 hover:border-orange-100 transition-all flex flex-col relative"
              >
                {/* Upper parameters */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-slate-800" style={{ fontFamily: "Inter, sans-serif" }}>
                        {h.name}
                      </h3>
                      {h.emergency && (
                        <span className="text-[10px] bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>
                          Emergency 24/7
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                      {h.nameBn}
                    </p>
                    <div className="flex items-start gap-1 mt-2 text-xs text-gray-500 font-medium">
                      <MapPin size={12} className="text-gray-400 shrink-0 mt-0.5" />
                      <p style={{ fontFamily: "Inter, sans-serif" }} className="leading-relaxed">{h.address}</p>
                    </div>
                  </div>

                  {/* Distance parameter layout */}
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-[#F67E49]" style={{ fontFamily: "Inter, sans-serif" }}>
                      {h.distance}
                    </span>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                      {h.eta} away
                    </p>
                  </div>
                </div>

                {/* Dynamic Category badging */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {h.type.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] bg-gray-100 text-slate-600 px-2.5 py-1 rounded-lg font-semibold"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Hospital specs status row */}
                <div className="flex gap-4 py-2 px-3 bg-gray-50 rounded-2xl mb-4 text-xs font-semibold text-slate-600 items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Bed size={13} className="text-slate-400" />
                    <span style={{ fontFamily: "Inter, sans-serif" }}>{h.beds}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">ICU:</span>
                    <span className="font-bold text-slate-750">{h.icu}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-slate-400" />
                    <span style={{ fontFamily: "Inter, sans-serif" }}>Queue {h.wait}</span>
                  </div>
                </div>

                {/* List Action controllers */}
                <div className="flex gap-2.5">
                  <a
                    href={`tel:${h.phone}`}
                    className="flex-1 h-12 flex items-center justify-center gap-2 rounded-2xl bg-[#f67e49] text-white text-xs font-bold shadow-md shadow-orange-500/10 active:scale-95 transition-all"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <Phone size={13} />
                    Call Hospital
                  </a>
                  <button
                    onClick={() => {
                      setView("map");
                      setSelectedHospitalId(h.id);
                      setShowDirectionsMode(true);
                    }}
                    className="flex-1 h-12 flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 text-slate-700 text-xs font-bold active:scale-95 transition-all hover:bg-slate-50"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <Navigation size={13} className="fill-slate-500 stroke-slate-500" />
                    Get Directions
                  </button>
                </div>

              </div>
            ))}

            {filteredHospitals.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <Search size={32} className="text-zinc-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-500" style={{ fontFamily: "Inter, sans-serif" }}>
                  No hospitals matching filter
                </p>
                <button
                  onClick={() => {
                    setFilter("All");
                    setSearch("");
                  }}
                  className="text-xs text-orange-500 font-bold mt-1"
                >
                  Clear search and filters
                </button>
              </div>
            )}

            <div className="h-6" />
          </div>
        )}

      </div>

      {/* ================= HIGH-POLISHED DETAIL INFO DIALOG ================= */}
      {showDetailsModal && (
        <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end pointer-events-auto">
          {/* Animated Modal Slide panel */}
          <div className="bg-white rounded-t-[36px] w-[393px] mx-auto p-6 flex flex-col max-h-[85%] shadow-2xl relative border-t border-slate-100">
            {/* Grab handle */}
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />

            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-[10px] bg-blue-100 text-[#1447e6] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  {showDetailsModal.type.includes("Govt") ? "Government Hospital" : "Super Specialty Private"}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2" style={{ fontFamily: "Inter, sans-serif" }}>
                  {showDetailsModal.name}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5 font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                  {showDetailsModal.nameBn}
                </p>
              </div>
              <div className="bg-orange-50 px-3 py-1.5 rounded-2xl flex items-center gap-1 mt-1 font-black text-xs text-[#F67E49]">
                <Star size={13} className="text-amber-500 fill-amber-500" />
                <span>{showDetailsModal.rating}</span>
              </div>
            </div>

            <div className="overflow-y-auto space-y-4 my-3 text-slate-700 leading-relaxed pr-1 pb-4 scrollbar-none" style={{ maxHeight: "360px" }}>
              
              {/* Description box */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">About Facility</p>
                <p className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl" style={{ fontFamily: "Inter, sans-serif" }}>
                  {showDetailsModal.description}
                </p>
              </div>

              {/* Specs parameters lists */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#f0fdf4] border border-[#dcfce7] rounded-2xl text-xs">
                  <p className="font-bold text-gray-500 text-[10px] uppercase tracking-wider">Bed availability</p>
                  <p className="font-black text-[#008236] mt-1 text-sm">{showDetailsModal.beds}</p>
                </div>
                <div className="p-3 bg-[#eff6ff] border border-[#dbeafe] rounded-2xl text-xs">
                  <p className="font-bold text-gray-500 text-[10px] uppercase tracking-wider">ICU Standard</p>
                  <p className="font-black text-[#1447e6] mt-1 text-sm">{showDetailsModal.icu}</p>
                </div>
                <div className="p-3 bg-orange-50/50 border border-orange-100 rounded-2xl text-xs">
                  <p className="font-bold text-gray-500 text-[10px] uppercase tracking-wider">Wait Time Estimate</p>
                  <p className="font-black text-[#F67E49] mt-1 text-sm">{showDetailsModal.wait}</p>
                </div>
                <div className="p-3 bg-red-50/50 border border-red-100 rounded-2xl text-xs">
                  <p className="font-bold text-gray-500 text-[10px] uppercase tracking-wider">Emergency Response</p>
                  <p className="font-black text-[#FE290F] mt-1 text-sm">Active 24/7</p>
                </div>
              </div>

              {/* Exact Address */}
              <div className="text-xs text-slate-700 font-medium">
                <p className="font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-1">Located at</p>
                <div className="flex items-center gap-2 p-1.5 rounded-xl border border-gray-100 bg-white shadow-sm">
                  <MapPin size={14} className="text-[#f67e49]" />
                  <span style={{ fontFamily: "Inter, sans-serif" }}>{showDetailsModal.address}</span>
                </div>
              </div>

              {/* Specialized protocol tags list */}
              <div>
                <p className="font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-1.5">Primary Clinical Specialties</p>
                <div className="flex flex-wrap gap-1.5">
                  {showDetailsModal.type.map((spec) => (
                    <span key={spec} className="px-3 py-1 bg-[#1f1f2e] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 pt-3 border-t border-gray-100 mt-2">
              <a
                href={`tel:${showDetailsModal.phone}`}
                className="flex-1 h-12 flex items-center justify-center gap-2 bg-[#f67e49] hover:bg-orange-600 rounded-2xl text-white font-bold text-xs shadow-md shadow-orange-500/10 active:scale-95 transition-all text-center"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <Phone size={14} />
                <span>Call {showDetailsModal.phone}</span>
              </a>
              <button
                onClick={() => setShowDetailsModal(null)}
                className="px-6 h-12 bg-neutral-900 text-white font-bold rounded-2xl text-xs hover:bg-black active:scale-95 transition-all"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 3. Global Interactive System bottom navigation and spacer bar overlay */}
      <BottomNav active="map" onNavigate={onNavigate} />
    </div>
  );
}
