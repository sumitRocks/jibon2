import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  onComplete: () => void;
}

interface Slide {
  title: string;
  subtitle: string;
  accent: string;
  badgeBg: string;
  icon: React.ReactNode;
}

export function OnboardingScreen({ onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides: Slide[] = [
    {
      title: "Emergency Help When You Need It Most",
      subtitle: "Connect with the nearest ambulance and trauma center in under 10 seconds with our one-tap SOS.",
      accent: "#FF6F43",
      badgeBg: "#FFF1EB",
      icon: (
        <svg viewBox="0 0 100 100" className="size-full">
          {/* Outer ripples */}
          <circle cx="50" cy="50" r="45" fill="#FFF1EB" />
          <circle cx="50" cy="50" r="38" fill="#FFE2D5" />
          <circle cx="50" cy="50" r="30" fill="#FFC9B4" />
          
          {/* Centered Orange Pin Circle */}
          <circle cx="50" cy="50" r="22" fill="#FF6F43" className="shadow-lg" />
          
          {/* Slanted Parallelogram Diamond Needle from mockup */}
          <path
            d="M 50 36 L 63 46 L 50 64 L 37 54 Z"
            fill="white"
            stroke="#FF6F43"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Live Ambulance & EMT Tracking",
      subtitle: "Watch your assigned emergency medical vehicle navigate right to your door with real-time ETA countdowns.",
      accent: "#4F9DFF",
      badgeBg: "#EEF6FF",
      icon: (
        <svg viewBox="0 0 100 100" className="size-full">
          {/* Outer radar sweep rings */}
          <circle cx="50" cy="50" r="45" fill="#EEF6FF" />
          <circle cx="50" cy="50" r="36" fill="#D3E7FF" />
          {/* Compass grid lines */}
          <line x1="50" y1="12" x2="50" y2="88" stroke="#4F9DFF" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="12" y1="50" x2="88" y2="50" stroke="#4F9DFF" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Radar center beacon */}
          <circle cx="50" cy="50" r="22" fill="#4F9DFF" />
          
          {/* Directional radar swept path triangle */}
          <path d="M50 50 L68 25 A 31 31 0 0 0 32 25 Z" fill="white" fillOpacity="0.4" />
          
          {/* Little green blips */}
          <circle cx="68" cy="35" r="4" fill="#34C759" />
          <circle cx="35" cy="65" r="3" fill="#34C759" />
        </svg>
      ),
    },
    {
      title: "Complete Emergency Ecosystem",
      subtitle: "We unify citizens, blood banks, hospitals, family contacts, and control centers for rapid digital healthcare delivery.",
      accent: "#FF4B6E",
      badgeBg: "#FFF0F2",
      icon: (
        <svg viewBox="0 0 100 100" className="size-full">
          {/* Constellation web backgrounds */}
          <circle cx="50" cy="50" r="45" fill="#FFF0F2" />
          
          {/* Connecting Nodes */}
          <path d="M25 50 L50 25 L75 50 L50 75 Z" stroke="#FF4B6E" strokeWidth="2" strokeDasharray="2 2" fill="none" />
          <line x1="50" y1="25" x2="50" y2="75" stroke="#FF4B6E" strokeWidth="1.5" />
          <line x1="25" y1="50" x2="75" y2="50" stroke="#FF4B6E" strokeWidth="1.5" />
          
          {/* Outer circle child nodes */}
          <circle cx="50" cy="25" r="9" fill="#FF4B6E" /> {/* Hospital cross */}
          <path d="M47 25h6M50 22h1M50 27h1" stroke="white" strokeWidth="1.5" />
          
          <circle cx="25" cy="50" r="9" fill="#00C7BE" /> {/* User avatar */}
          <circle cx="25" cy="47" r="3" fill="white" />
          <path d="M20 54a5 5 0 0 1 10 0" stroke="white" strokeWidth="1" />

          <circle cx="75" cy="50" r="9" fill="#FF9500" /> {/* Blood Bank drop */}
          <path d="M75 45c-3 4-4 6-4 8a4 4 0 0 0 8 0c0-2-1-4-4-8z" fill="white" />

          <circle cx="50" cy="75" r="9" fill="#30B0C7" /> {/* Emergency Shield */}
          <path d="M47 71 L53 71 L53 75 L50 79 L47 75 Z" fill="white" />

          {/* Core centerpiece Hub */}
          <circle cx="50" cy="50" r="16" fill="#FF4B6E" />
          <path d="M45 50 L48 44 L52 56 L55 50 L58 50" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative size-full flex flex-col items-center justify-between pb-8 pt-16 bg-white overflow-hidden select-none px-6">
      {/* Top Bar with back/skip details */}
      <div className="absolute top-12 left-0 right-0 px-6 flex justify-between items-center z-20">
        {currentIndex > 0 ? (
          <button
            onClick={handlePrev}
            className="text-slate-400 hover:text-slate-700 text-sm font-semibold transition-colors flex items-center gap-1 py-1"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={onComplete}
          className="text-orange-500 hover:text-orange-600 text-sm font-semibold transition-all py-1 px-3 bg-orange-50 rounded-full"
        >
          Skip
        </button>
      </div>

      {/* Main Illustration Area with AnimatePresence for sliding effect */}
      <div className="flex-1 w-full flex flex-col items-center justify-center mt-6">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -80, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full flex flex-col items-center"
          >
            {/* Round vector illustration container */}
            <div className="size-60 md:size-64 mb-10 flex items-center justify-center relative">
              {/* Outer decorative ambient dots */}
              <div
                className="absolute inset-0 rounded-full animate-spin"
                style={{
                  border: `1.5px dashed ${currentSlide.accent}`,
                  opacity: 0.15,
                  animationDuration: "40s",
                }}
              />
              <div className="size-48 z-10 transition-transform duration-300 hover:scale-105">
                {currentSlide.icon}
              </div>
            </div>

            {/* Typography Content */}
            <div className="text-center w-full max-w-sm px-2">
              <h2
                className="text-[26px] font-black text-slate-900 tracking-tight leading-snug mb-3 font-sans"
                style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
              >
                {currentSlide.title}
              </h2>
              <p className="text-sm font-medium text-slate-500 leading-relaxed px-1">
                {currentSlide.subtitle}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls / indicators */}
      <div className="w-full flex flex-col items-center max-w-sm">
        {/* Pagination Dots */}
        <div className="flex items-center gap-2.5 mb-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="transition-all duration-300"
              style={{
                width: idx === currentIndex ? 24 : 8,
                height: 8,
                borderRadius: 99,
                backgroundColor: idx === currentIndex ? currentSlide.accent : "#E2E8F0",
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Primary Action Button */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleNext}
          className="w-full py-4 text-white font-bold rounded-2xl shadow-lg transition-all"
          style={{
            backgroundColor: currentSlide.accent,
            boxShadow: `0 8px 24px -6px ${currentSlide.accent}aa`,
          }}
        >
          {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
        </motion.button>

        {/* Subtle Skip Label under next */}
        <button
          onClick={onComplete}
          className="text-slate-400 font-semibold text-xs mt-3.5 tracking-wide hover:text-slate-600 transition-colors uppercase"
        >
          Skip onboarding
        </button>
      </div>
    </div>
  );
}
