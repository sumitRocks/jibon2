import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Phone, MessageSquare, Share2, X, ChevronLeft } from "lucide-react";

type Screen = string;

interface Props {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

const STATUS_STEPS = [
  { id: 0, label: "Request Received", labelBn: "অনুরোধ গৃহীত হয়েছে", done: true },
  { id: 1, label: "Ambulance Assigned", labelBn: "অ্যাম্বুলেন্স নিযুক্ত", done: true },
  { id: 2, label: "En Route", labelBn: "পথে আছে", done: false, active: true },
  { id: 3, label: "Patient Picked Up", labelBn: "রোগী নেওয়া হচ্ছে", done: false },
  { id: 4, label: "Arrived at Hospital", labelBn: "হাসপাতালে পৌঁছেছে", done: false },
  { id: 5, label: "Case Closed", labelBn: "কেস বন্ধ", done: false },
];

export function SOSScreen({ onBack }: Props) {
  const [showCancel, setShowCancel] = useState(false);

  return (
    <div className="size-full flex flex-col bg-[#F3F4F6] relative overflow-hidden select-none">
      
      {/* MAP BACKGROUND HEADER - occupy top part */}
      <div className="relative w-full h-[280px] bg-[#E5ECEF] shrink-0 overflow-hidden border-b border-slate-200">
        
        {/* Street lines vectors representing Park Street location */}
        <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
          {/* Main roadways */}
          <line x1="-10" y1="80" x2="400" y2="80" stroke="white" strokeWidth="18" />
          <line x1="-10" y1="80" x2="400" y2="80" stroke="#CBD5E1" strokeWidth="1" />
          
          <line x1="120" y1="-20" x2="120" y2="300" stroke="white" strokeWidth="20" />
          <line x1="120" y1="-20" x2="120" y2="300" stroke="#CBD5E1" strokeWidth="1" />
          
          <line x1="260" y1="-20" x2="260" y2="300" stroke="white" strokeWidth="16" />
          <line x1="260" y1="-20" x2="260" y2="300" stroke="#CBD5E1" strokeWidth="1" />
          
          <line x1="-10" y1="210" x2="400" y2="210" stroke="white" strokeWidth="14" />
          
          {/* Slanted minor roads */}
          <line x1="-50" y1="20" x2="180" y2="140" stroke="white" strokeWidth="8" />
          <line x1="200" y1="120" x2="420" y2="280" stroke="white" strokeWidth="10" />

          {/* Park Street Label Text */}
          <text x="14" y="150" fill="#94A3B8" fontSize="10" fontWeight="bold" fontFamily="monospace" transform="rotate(35 14 150)">Jeevanandan Salai</text>
          <text x="210" y="30" fill="#94A3B8" fontSize="10" fontWeight="bold" fontFamily="monospace">93rd Street</text>
          <text x="135" y="88" fill="#475569" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Park Street</text>
          <text x="132" y="112" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">Nirmala Girls HSS</text>
          <text x="274" y="130" fill="#94A3B8" fontSize="9" fontWeight="bold" fontFamily="sans-serif" transform="rotate(90 274 130)">Jawaharlal Nehru Road</text>
          <text x="290" y="55" fill="#94A3B8" fontSize="9" fontWeight="bold" fontFamily="sans-serif">3rd Ave</text>
        </svg>

        {/* Ambient Compass Sector Sweep under User Dot */}
        <div className="absolute bottom-[28%] right-[22%] size-32 bg-sky-400/10 rounded-full flex items-center justify-center animate-pulse pointer-events-none">
          <div className="size-24 bg-sky-400/10 rounded-full" />
        </div>

        {/* Route Connecting Curve Line from Ambulance to You */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 100 70 Q 180 80, 290 140"
            fill="none"
            stroke="#FF7643"
            strokeWidth="4"
            strokeLinecap="round"
            className="stroke-[#FF7643]"
          />
        </svg>

        {/* Ambulance Marker with customized popover badge */}
        <div className="absolute top-[32%] left-[18%] flex flex-col items-center">
          {/* Little speech popup badge */}
          <div className="bg-white text-slate-800 text-[10px] font-extrabold px-2.5 py-1.5 rounded-lg shadow-md border border-slate-100 flex items-center gap-1.5 mb-1.5 relative select-none">
            <span>Ambulance</span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-white" />
          </div>
          {/* Marker circle with radar ripples */}
          <div className="relative flex items-center justify-center">
            {/* Pulsing ambulance red glow rings */}
            <span className="absolute size-14 rounded-full bg-red-500/20 animate-ping opacity-75" />
            <span className="absolute size-9 rounded-full bg-red-400/40 animate-pulse" />
            
            <div className="size-10 rounded-full bg-[#EF4444] border-2 border-white flex items-center justify-center shadow-lg relative z-10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 18H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h8" />
                <path d="M14 6h4a2 2 0 0 1 2 2v5.5a1.5 1.5 0 0 1-.5 1.1L17 17a1.5 1.5 0 0 1-1.1.5H14" />
                <circle cx="7" cy="18" r="2" />
                <circle cx="16" cy="18" r="2" />
                <path d="M10 9v4M8 11h4" />
              </svg>
            </div>
          </div>
        </div>

        {/* User 'You' Location Marker */}
        <div className="absolute bottom-[28%] right-[22%] flex flex-col items-center">
          {/* Badge saying 'You' */}
          <div className="bg-white text-slate-850 text-[10px] font-extrabold px-2.5 py-1.5 rounded-lg shadow-md border border-slate-100 flex items-center justify-center mb-1.5 relative select-none">
            <span>You</span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-white" />
          </div>
          
          <div className="size-10 rounded-full bg-[#3B82F6] border-2 border-white flex items-center justify-center shadow-lg relative z-10">
            {/* Blue locator pointer compass tip layout */}
            <svg width="18" height="18" viewBox="0 0 20 20" fill="white">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </div>
        </div>

        {/* OVERLAY: Navigation Back Pill / Top Left */}
        <div className="absolute top-12 left-4 z-20">
          <button
            onClick={onBack}
            className="bg-black/90 hover:bg-black text-white pl-3.5 pr-5 py-2.5 rounded-full flex items-center gap-1 font-bold text-[14px] shadow-lg border border-white/15 transition-all"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <ChevronLeft size={18} strokeWidth={3} className="text-white" />
            <span>Back</span>
          </button>
        </div>

        {/* OVERLAY: SOS Activated Status Info / Top Right */}
        <div className="absolute top-11 right-4 z-20 flex flex-col items-end text-right">
          <p className="text-slate-900 font-extrabold text-[12px] uppercase tracking-wider bg-white/75 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm">
            Emergency Response
          </p>
          <div className="flex items-center gap-1.5 mt-1 bg-white/90 px-3.5 py-2 rounded-2xl backdrop-blur-sm shadow-md border border-red-100">
            {/* Waves Signal Signal SVG */}
            <span className="flex items-center text-red-500 font-bold text-lg select-none mr-0.5 leading-none animate-pulse">
              <svg width="18" height="14" viewBox="0 0 20 16" fill="currentColor" stroke="none">
                <path d="M11 12.5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0z" />
                <path d="M13.4 9a5.5 5.5 0 0 0-9.8 0l1.4 1.1a4 4 0 0 1 7 0L13.4 9z" />
                <path d="M16 5.5a8.5 8.5 0 0 0-15 0l1.4 1.1a7 7 0 0 1 12.2 0L16 5.5z" />
              </svg>
            </span>
            <span className="text-[#FF3B30] text-[20px] font-black tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
              SOS Activated
            </span>
          </div>
        </div>

      </div>

      {/* CORE INFO SHEET - Giant white card overlay sliding up */}
      <div className="flex-1 bg-white rounded-t-[36px] -mt-6 relative z-10 shadow-[0_-12px_40px_rgba(0,0,0,0.06)] flex flex-col overflow-hidden">
        
        {/* Scrollable Container inside sheet */}
        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-24 space-y-6">
          
          {/* ESTIMATED ARRIVAL HERO BLOCK */}
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              {/* ETA Display */}
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-slate-400 uppercase tracking-widest">
                  Estimated Arrival
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-5xl font-black text-slate-900 tracking-tighter font-sans">
                    4
                  </span>
                  <span className="text-lg font-bold text-slate-500">
                    min
                  </span>
                </div>
              </div>

              {/* Distance Pill Box on Right */}
              <div className="bg-black text-white hover:bg-slate-900 transition-colors rounded-[24px] px-6 py-4 flex flex-col items-center justify-center min-w-[125px] shadow-md select-none text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Distance
                </span>
                <span className="text-[20px] font-black tracking-tight text-white mt-1">
                  2.3 km
                </span>
              </div>
            </div>

            {/* Custom filled progress streak directly below row */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden flex">
              <div className="h-full bg-[#FF7643] rounded-full w-[38%]" />
              <div className="h-full bg-slate-100 flex-1" />
            </div>
          </div>

          {/* QUICK TELEPHONY AND CHAT INTERACTION BUTTONS */}
          <div className="flex items-center gap-3 w-full">
            {/* CALL AMBULANCE BUTTON */}
            <a
              href="tel:108"
              className="flex-1 flex items-center justify-center gap-2 bg-[#FF7643] hover:bg-[#E55F2A] active:scale-95 text-white rounded-[20px] py-4 shadow-md font-extrabold text-[15px] transition-all"
              style={{ boxShadow: "0 8px 18px -4px #FF7643cc" }}
            >
              <Phone size={18} strokeWidth={2.8} />
              <span>Call Ambulance</span>
            </a>

            {/* MESSAGE CHAT ACTION BUTTON */}
            <button
              onClick={() => {}}
              className="size-14 rounded-[20px] bg-[#F1F3F5] hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center transition-all shrink-0"
              title="Chat"
            >
              <MessageSquare size={20} strokeWidth={2.5} />
            </button>

            {/* CANCEL CLOSE BUTTON */}
            <button
              onClick={() => setShowCancel(true)}
              className="size-14 rounded-[20px] bg-[#FFEBEF] hover:bg-red-100 active:scale-95 text-[#FF3B30] flex items-center justify-center transition-all shrink-0"
              title="Cancel Emergency"
            >
              <X size={20} strokeWidth={3} />
            </button>

            {/* LOG SHARING BUTTON */}
            <button
              onClick={() => {}}
              className="size-14 rounded-[20px] bg-[#F1F3F5] hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center transition-all shrink-0"
              title="Share Location"
            >
              <Share2 size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* ASSIGNED AMBULANCE LIST PANEL */}
          <div className="w-full">
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              Assigned Ambulance
            </p>
            
            <div className="space-y-3.5 bg-slate-50/50 p-4 rounded-3xl border border-slate-100">
              {[
                { label: "Vehicle No.", value: "WB 23 AB 4521" },
                { label: "Driver", value: "Rahul Mondal" },
                { label: "EMT", value: "Dr. Priya Chatterjee" },
                { label: "Type", value: "ALS Ambulance" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center text-[15px]">
                  <span className="text-slate-500 font-medium">{item.label}</span>
                  <span className="text-slate-900 font-extrabold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* STATUS TIMELINE VERTICAL PATH */}
          <div className="w-full">
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              Status Timeline
            </p>

            <div className="pl-1.5 space-y-4">
              {STATUS_STEPS.map((s, idx) => {
                const isFinished = s.done;
                const isActive = s.active;
                
                return (
                  <div key={s.id} className="flex items-start gap-4">
                    
                    {/* Visual Node Dot Indicator & Thread connector */}
                    <div className="flex flex-col items-center shrink-0 mt-1">
                      {isFinished ? (
                        /* Complete step - glowing Orange Ring outline */
                        <div className="size-5 rounded-full border-4 border-[#FF7643] bg-white flex items-center justify-center" />
                      ) : isActive ? (
                        /* Pulse target Active stage - Solid Red circle */
                        <div className="size-5 rounded-full border-4 border-red-500 bg-white flex items-center justify-center">
                          <div className="size-2 rounded-full bg-red-500" />
                        </div>
                      ) : (
                        /* Inactive faded node */
                        <div className="size-5 rounded-full bg-slate-200 border-4 border-white" />
                      )}

                      {/* Connectors */}
                      {idx < STATUS_STEPS.length - 1 && (
                        <div
                          className="w-0.5 h-10 mt-1"
                          style={{
                            backgroundColor: isFinished ? "#FF7643" : "#E2E8F0",
                          }}
                        />
                      )}
                    </div>

                    {/* Metadata text label */}
                    <div className="flex-1">
                      <p
                        className="text-[15px] font-black leading-tight"
                        style={{
                          color: isFinished || isActive ? "#0F172A" : "#94A3B8",
                        }}
                      >
                        {s.label}
                      </p>
                      
                      <p
                        className="text-xs font-semibold mt-0.5"
                        style={{
                          color: isFinished || isActive ? "#64748B" : "#CBD5E1",
                        }}
                      >
                        {s.labelBn}
                      </p>

                      {/* Running In Progress sub label */}
                      {isActive && (
                        <div className="flex items-center gap-1.5 mt-1.5 bg-red-50 text-red-600 px-2.5 py-1 rounded-full w-max text-[11px] font-extrabold select-none animate-pulse">
                          <span className="size-1.5 rounded-full bg-red-500" />
                          <span>In Progress</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAMILY NOTIFIED GREEN BANNER */}
          <div className="bg-[#EBFBF2] text-[#00A13E] rounded-3xl p-4 flex items-center gap-4.5 border border-[#CCF4DB]">
            <div className="size-11 rounded-full bg-[#00B34A] flex items-center justify-center text-white text-xl shrink-0 shadow-sm">
              ✓
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-extrabold" style={{ color: "#065F2F" }}>
                Family Notified
              </p>
              <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                3 contacts received live tracking link
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* CANCEL MODAL DOCK SHEET */}
      {showCancel && (
        <div className="absolute inset-0 bg-black/60 flex items-end z-50 transition-all duration-300" onClick={() => setShowCancel(false)}>
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="bg-white w-full rounded-t-[32px] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Visual drag accent handle */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-5" />

            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
              Cancel Emergency?
            </h3>
            <p className="text-[15px] text-slate-500 font-medium leading-relaxed mb-6">
              Are you sure you want to cancel? The emergency response units have already been dispatched.
            </p>
            
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => setShowCancel(false)}
                className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 rounded-2xl text-slate-800 font-extrabold transition-all"
              >
                Keep Active
              </button>
              <button
                onClick={onBack}
                className="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-extrabold shadow-md transition-all"
                style={{ boxShadow: "0 6px 14px -3px #EF4444c0" }}
              >
                Cancel Request
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}

