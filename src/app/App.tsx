import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SplashScreen } from "./components/SplashScreen";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { LoginScreen } from "./components/LoginScreen";
import { HomeScreen } from "./components/HomeScreen";
import { SOSScreen } from "./components/SOSScreen";
import { HospitalsScreen } from "./components/HospitalsScreen";
import { BloodBanksScreen } from "./components/BloodBanksScreen";
import { EmergencyContactsScreen } from "./components/EmergencyContactsScreen";
import { MedicalIDScreen } from "./components/MedicalIDScreen";
import { HistoryScreen } from "./components/HistoryScreen";
import { AIAssistantScreen } from "./components/AIAssistantScreen";
import { SettingsScreen } from "./components/SettingsScreen";

type Screen =
  | "splash"
  | "onboarding"
  | "login"
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

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");

  const nav = (s: Screen) => setScreen(s);
  const back = () => setScreen("home");

  // Determines if the phone status bar elements should be white (on dark/orange backgrounds) or dark (on light/white backgrounds)
  const isWhiteStatusText = ["home", "sos", "medicalid", "assistant", "splash", "login"].includes(screen);
  const statusColor = isWhiteStatusText ? "white" : "#1a1a2e";

  return (
    <div className="size-full flex items-center justify-center" style={{ background: "#1a1a2e", minHeight: "100dvh" }}>
      {/* Phone frame */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "min(390px, 100vw)",
          height: "min(844px, 100dvh)",
          borderRadius: "min(44px, 0px)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
          background: "#f4f4f4",
        }}
      >
        {/* Status bar */}
        <div
          className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6"
          style={{ height: 44, background: "transparent", pointerEvents: "none" }}
        >
          <span className="text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif", color: statusColor }}>9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <rect x="0" y="4" width="3" height="6" rx="0.5" fill={statusColor} />
              <rect x="4.5" y="2.5" width="3" height="7.5" rx="0.5" fill={statusColor} />
              <rect x="9" y="1" width="3" height="9" rx="0.5" fill={statusColor} />
              <rect x="13.5" y="0" width="2" height="10" rx="0.5" fill={statusColor} opacity="0.4" />
            </svg>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
              <path d="M7.5 2.2C9.7 2.2 11.7 3.1 13.1 4.6L14.5 3.2C12.7 1.2 10.2 0 7.5 0S2.3 1.2.5 3.2l1.4 1.4C3.3 3.1 5.3 2.2 7.5 2.2Z" fill={statusColor} />
              <path d="M7.5 5.5C8.9 5.5 10.2 6.1 11.1 7L12.5 5.6C11.2 4.3 9.4 3.5 7.5 3.5S3.8 4.3 2.5 5.6l1.4 1.4C4.8 6.1 6.1 5.5 7.5 5.5Z" fill={statusColor} />
              <circle cx="7.5" cy="9.5" r="1.5" fill={statusColor} />
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={statusColor} strokeOpacity="0.35" />
              <rect x="2" y="2" width="16" height="8" rx="2" fill={statusColor} />
              <path d="M23 4v4a2 2 0 0 0 0-4Z" fill={statusColor} opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Screens */}
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            className="absolute inset-0"
            initial={{ opacity: 0, x: screen === "splash" ? 0 : screen === "home" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: screen === "home" ? 20 : -20 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            {screen === "splash" && <SplashScreen onComplete={() => nav("onboarding")} />}
            {screen === "onboarding" && <OnboardingScreen onComplete={() => nav("login")} />}
            {screen === "login" && <LoginScreen onLoginSuccess={() => nav("home")} />}
            {screen === "home" && <HomeScreen onNavigate={nav} />}
            {screen === "sos" && <SOSScreen onBack={back} onNavigate={nav} />}
            {screen === "hospitals" && <HospitalsScreen onBack={back} onNavigate={nav} />}
            {screen === "map" && <HospitalsScreen onBack={back} onNavigate={nav} />}
            {screen === "bloodbanks" && <BloodBanksScreen onBack={back} onNavigate={nav} />}
            {screen === "contacts" && <EmergencyContactsScreen onBack={back} onNavigate={nav} />}
            {screen === "medicalid" && <MedicalIDScreen onBack={back} onNavigate={nav} />}
            {screen === "history" && <HistoryScreen onBack={back} onNavigate={nav} />}
            {screen === "assistant" && <AIAssistantScreen onBack={back} onNavigate={nav} />}
            {screen === "settings" && <SettingsScreen onBack={back} onNavigate={nav} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
