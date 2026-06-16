import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../imports/Mock02/svg-1oxw9z5kap";
import imgProfile from "../../imports/Mock02/8ec55a7e65b48fc7bd20d99f729831ca45aebf3b.png";
import { BottomNav } from "./BottomNav";

type Screen =
  | "home"
  | "sos"
  | "hospitals"
  | "bloodbanks"
  | "contacts"
  | "medicalid"
  | "history"
  | "assistant"
  | "settings"
  | "map";

interface Props {
  onNavigate: (screen: Screen) => void;
}

export function HomeScreen({ onNavigate }: Props) {
  const [holding, setHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Extremely Urgent SOS Ready",
      text: "Automatic beacon routing is active at Park Street, Kolkata.",
      time: "Just now",
      unread: true,
      type: "sos",
    },
    {
      id: 2,
      title: "Weather warning: Red Alert",
      text: "Temperatures expected to spike to 40°C in West Bengal. Keep hydrated and find shade.",
      time: "1 hour ago",
      unread: true,
      type: "alert",
    },
    {
      id: 3,
      title: "Ambulance Station response active",
      text: "108 ambulance teams are current status: high standby near medical quarters.",
      time: "3 hours ago",
      unread: false,
      type: "info",
    },
  ]);

  const hasUnread = notifications.some((n) => n.unread);
  const holdTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startHold = () => {
    setHolding(true);
    setHoldProgress(0);
    const start = Date.now();
    holdTimer.current = setInterval(() => {
      const p = Math.min((Date.now() - start) / 3000, 1);
      setHoldProgress(p);
      if (p >= 1) {
        clearInterval(holdTimer.current!);
        setHolding(false);
        setHoldProgress(0);
        onNavigate("sos");
      }
    }, 30);
    holdTimeout.current = setTimeout(() => {
      onNavigate("sos");
    }, 3100);
  };

  const cancelHold = () => {
    setHolding(false);
    setHoldProgress(0);
    if (holdTimer.current) clearInterval(holdTimer.current);
    if (holdTimeout.current) clearTimeout(holdTimeout.current);
  };

  return (
    <div
      className="relative size-full flex flex-col items-center justify-between pt-[60px]"
      style={{
        background:
          "linear-gradient(to top, #f4f4f4 0%, white 57.281%, #f67e49 88.125%)",
      }}
    >
      {/* App Bar */}
      <div className="relative w-full shrink-0">
        <div className="flex items-start justify-between px-6">
          {/* Location */}
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d={svgPaths.p34cef800} fill="white" />
            </svg>
            <div className="flex flex-col">
              <span
                className="text-white/80 tracking-tight"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 11 }}
              >
                Current Location
              </span>
              <span
                className="text-white tracking-tight"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600 }}
              >
                Park Street, Kolkata
              </span>
            </div>
          </div>
          {/* Notification System Bell Button */}
          <button
            className="bg-white rounded-full size-11 flex items-center justify-center shadow-md relative group hover:bg-orange-50 transition-colors pointer-events-auto"
            onClick={() => setShowNotifications(true)}
            title="Notification Alerts"
            id="notification-hotkey"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a1a2e"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#1a1a2e] transition-transform group-hover:rotate-12"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 size-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* SOS Button area */}
      <div className="relative flex items-center justify-center" style={{ height: 235, width: 174 }}>
        {/* Outer glow rings */}
        <div
          className="absolute rounded-full"
          style={{
            width: 330,
            height: 332,
            left: -78,
            top: -49,
            background: "rgba(255,248,248,0.1)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 252,
            height: 252,
            left: -39,
            top: -9,
            background: "rgba(255,248,248,0.1)",
          }}
        />

        {/* Hold progress ring */}
        <AnimatePresence>
          {holding && (
            <svg
              className="absolute"
              width={210}
              height={210}
              style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
              viewBox="0 0 210 210"
            >
              <circle
                cx={105}
                cy={105}
                r={95}
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={4}
              />
              <circle
                cx={105}
                cy={105}
                r={95}
                fill="none"
                stroke="white"
                strokeWidth={4}
                strokeDasharray={2 * Math.PI * 95}
                strokeDashoffset={2 * Math.PI * 95 * (1 - holdProgress)}
                strokeLinecap="round"
                transform="rotate(-90 105 105)"
              />
            </svg>
          )}
        </AnimatePresence>

        {/* SOS circle */}
        <motion.button
          className="relative rounded-full flex items-center justify-center select-none"
          style={{
            width: 178,
            height: 178,
            background: "red",
            boxShadow:
              "inset 0px 3.8px 91px 0px #fb8d33, 0px 0px 32px 0px #ff8383, 0 8px 40px rgba(255,0,0,0.5)",
            border: "2px solid rgba(255,255,255,0.5)",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onMouseDown={startHold}
          onMouseUp={cancelHold}
          onMouseLeave={cancelHold}
          onTouchStart={startHold}
          onTouchEnd={cancelHold}
        >
          <div className="flex flex-col items-center">
            <span
              className="text-white tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 40, fontWeight: 700, lineHeight: 1 }}
            >
              SOS
            </span>
            <span
              className="text-white/90 tracking-wide"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 600, marginTop: 4 }}
            >
              {holding
                ? `HOLD ${Math.round(holdProgress * 3)}s...`
                : "HOLD TO CALL"}
            </span>
          </div>
        </motion.button>
      </div>

      {/* Quick Actions Grid */}
      <div className="relative w-full shrink-0">
        <div className="flex flex-col gap-2 px-3">
          {/* Row 1 */}
          <div className="flex gap-[17px]">
            {/* Call 108 */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("hospitals")}
              className="bg-white flex-1 h-40 rounded-[32px] flex flex-col items-start justify-between p-6 relative overflow-hidden shadow-sm"
              style={{ border: "1.2px solid rgba(217,217,217,0.33)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clipPath="url(#amb)">
                  <path d={svgPaths.p3cc61f80} fill="#FF383C" />
                </g>
                <defs>
                  <clipPath id="amb">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="text-left">
                <p
                  className="leading-tight"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 19, color: "red", fontWeight: 500 }}
                >
                  Call 108
                </p>
                <p
                  className="leading-tight"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 19, color: "red", fontWeight: 500 }}
                >
                  (Ambulance)
                </p>
              </div>
            </motion.button>

            {/* Nearest Hospitals */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("hospitals")}
              className="bg-white flex-1 h-40 rounded-[32px] flex flex-col items-start justify-between p-6 relative shadow-sm"
              style={{ border: "1.2px solid rgba(217,217,217,0.33)" }}
            >
              <svg width="22" height="18" viewBox="0 0 21.75 18" fill="none">
                <path d={svgPaths.p14723c80} fill="black" />
              </svg>
              <p
                className="text-left"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 19, color: "#1a1a2e", fontWeight: 500, lineHeight: 1.2 }}
              >
                Nearest{"\n"}Hospitals
              </p>
            </motion.button>
          </div>

          {/* Row 2 */}
          <div className="flex gap-[17px]">
            {/* Blood Banks */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("bloodbanks")}
              className="bg-white flex-1 h-40 rounded-[32px] flex flex-col items-start justify-between p-6 relative shadow-sm"
              style={{ border: "1.2px solid rgba(217,217,217,0.33)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d={svgPaths.p2966e080} fill="black" />
              </svg>
              <p
                style={{ fontFamily: "Inter, sans-serif", fontSize: 19, color: "#1a1a2e", fontWeight: 500 }}
              >
                Blood Banks
              </p>
            </motion.button>

            {/* Emergency Contacts */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("contacts")}
              className="bg-white flex-1 h-40 rounded-[32px] flex flex-col items-start justify-between p-6 relative shadow-sm"
              style={{ border: "1.2px solid rgba(217,217,217,0.33)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d={svgPaths.pf166c00} fill="black" />
              </svg>
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 19, color: "#1a1a2e", fontWeight: 500, lineHeight: 1.2 }}>
                  Emergency
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 19, color: "#1a1a2e", fontWeight: 500, lineHeight: 1.2 }}>
                  Contacts
                </p>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav active="home" onNavigate={onNavigate} profileImg={imgProfile} />

      {/* Notifications Drawer Overlay */}
      <AnimatePresence>
        {showNotifications && (
          <div className="absolute inset-0 bg-black/40 z-50 flex flex-col justify-end pointer-events-auto">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white rounded-t-[36px] w-full p-6 flex flex-col max-h-[80%] shadow-2xl relative"
            >
              {/* Drawer drag handle */}
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "Inter, sans-serif" }}>
                  Alerts & Updates
                </h3>
                <button
                  onClick={() => {
                    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
                  }}
                  className="text-xs font-semibold text-orange-500 hover:text-orange-600 active:scale-95 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Mark all read
                </button>
              </div>

              {/* Notification List Container */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 pb-6 scrollbar-none" style={{ maxHeight: "360px" }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 rounded-2xl border transition-colors ${
                      n.unread ? "bg-orange-50/50 border-orange-100" : "bg-gray-50/50 border-gray-100"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {n.type === "sos" && <span className="text-red-500 font-bold text-[11px] tracking-wider uppercase">🚨 SOS ALERT</span>}
                        {n.type === "alert" && <span className="text-amber-500 font-bold text-[11px] tracking-wider uppercase">⚠️ WEATHER ALERT</span>}
                        {n.type === "info" && <span className="text-blue-500 font-bold text-[11px] tracking-wider uppercase">🏥 HEALTH UPDATE</span>}
                        {n.unread && <span className="size-2 bg-orange-500 rounded-full animate-ping" />}
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{n.time}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                      {n.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                      {n.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowNotifications(false)}
                className="w-full py-4 bg-[#1a1a2e] text-white rounded-2xl font-semibold text-center hover:bg-opacity-95 active:scale-98 transition-all shadow-md mt-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Close Panel
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

