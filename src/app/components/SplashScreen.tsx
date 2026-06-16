import { useEffect } from "react";
import { motion } from "motion/react";

interface Props {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: Props) {
  // Automatically progress to onboarding after 3.2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="relative size-full flex flex-col items-center justify-between pb-8 pt-16 overflow-hidden select-none cursor-pointer"
      style={{
        background: "linear-gradient(to bottom, #F97235 0%, #FA8D45 45%, #FFF0E2 85%, #FFFFFF 100%)",
      }}
      onClick={onComplete}
    >
      {/* Background Ambience Graphics (Faded Ambulance) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <svg
          width="320"
          height="180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4/5 h-auto translate-y-[-10%]"
        >
          {/* Ambulance silhouette */}
          <path d="M14 18H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h8" />
          <path d="M14 6h4a2 2 0 0 1 2 2v5.5a1.5 1.5 0 0 1-.5 1.1L17 17a1.5 1.5 0 0 1-1.1.5H14" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="16" cy="18" r="2" />
          <path d="M10 9v4M8 11h4" /> {/* Cross */}
          <rect x="15" y="8" width="3" height="3" /> {/* Window */}
        </svg>
      </div>

      {/* Top Section - Logo & Title */}
      <div className="flex flex-col items-center text-center mt-4 z-10 px-6">
        {/* Heartbeat Pulse Logo */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative size-24 mb-3 flex items-center justify-center"
        >
          {/* Breathing ripple circles */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0, 0.15] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-white opacity-20"
          />
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0, 0.25] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute inset-0 rounded-full bg-white opacity-10"
          />

          {/* SVG Heart Rate Line overlaying a stylized logo */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="z-10 drop-shadow-md"
          >
            {/* Heartbeat + heart curve combination */}
            <path
              d="M 10 50 L 30 50 L 38 25 L 46 75 L 52 42 L 58 50 L 65 50 C 70 35, 80 35, 85 45 C 90 55, 75 75, 65 80 C 55 75, 40 55, 45 45"
              className="stroke-white"
              style={{
                strokeDasharray: 300,
                strokeDashoffset: 0,
              }}
            />
          </svg>
        </motion.div>

        {/* Brand Name (Bilingual / English & Bengali) */}
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-white text-5xl font-bold tracking-tight mb-2 drop-shadow-sm font-sans"
          style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
        >
          জীবন সেতু
        </motion.h1>

        {/* English App Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-white text-[12px] font-semibold uppercase tracking-[0.25em] mb-3 opacity-90"
        >
          Jibon Setu
        </motion.div>

        {/* Subtitle / Bengali Tagline */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-white/95 text-lg font-medium drop-shadow-sm px-4"
        >
          জরুরি সেবার নতুন সেতু
        </motion.p>
        
        {/* English Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="text-white/70 text-xs mt-1"
        >
          &ldquo;Every Second Matters&rdquo;
        </motion.p>
      </div>

      {/* Middle Section - Leaders / Key Stakeholders layout */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.9, type: "spring", stiffness: 45 }}
        className="w-full flex flex-col items-center mb-6 z-10 px-4"
      >
        {/* Row of circular profile avatars framing the government team respectfully */}
        <div className="flex items-end justify-center -space-x-4 mb-4">
          {/* Stakeholder Left */}
          <div className="flex flex-col items-center">
            <div className="relative size-16 rounded-full border-2 border-white/60 overflow-hidden shadow-md bg-[#FFEAD6]/80 flex items-center justify-center">
              {/* Fallback elegant illustration of an official / administrator */}
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#F97235" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className="text-[10px] text-gray-700 font-bold mt-1.5 opacity-80 uppercase tracking-wider">Minister</span>
          </div>

          {/* Chief Minister / Leader Center */}
          <div className="flex flex-col items-center z-10 scale-110">
            <div className="relative size-22 rounded-full border-4 border-white overflow-hidden shadow-lg bg-[#FFF2E6] flex items-center justify-center">
              {/* Fallback elegant illustration representing Smt. Mamata Banerjee (with custom visual sash/framing look) */}
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#F97235" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
                {/* Traditional white and blue border scarf */}
                <path d="M6 14s2 2 6 2 6-2 6-2" stroke="#0070F3" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="text-[10px] text-gray-900 font-extrabold mt-1.5 bg-white/80 px-2 py-0.5 rounded-full shadow-sm border border-orange-200 uppercase tracking-widest text-[#F97235]">Leader</span>
          </div>

          {/* Stakeholder Right */}
          <div className="flex flex-col items-center">
            <div className="relative size-16 rounded-full border-2 border-white/60 overflow-hidden shadow-md bg-[#FFEAD6]/80 flex items-center justify-center">
              {/* Fallback representative administrator */}
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#F97235" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className="text-[10px] text-gray-700 font-bold mt-1.5 opacity-80 uppercase tracking-wider">Secy.</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom Section - West Bengal National Emblem / Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="flex flex-col items-center text-center z-10 px-6"
      >
        {/* West Bengal Seal emblem vector */}
        <div className="size-10 mb-2 opacity-90">
          <svg viewBox="0 0 100 100" className="size-full fill-none stroke-[#F97235] stroke-width-[4]">
            {/* National emblem simplified shape of Lions & Biswa Bangla globe */}
            <circle cx="50" cy="50" r="42" stroke="#F97235" strokeWidth="4" />
            <circle cx="50" cy="50" r="32" stroke="#F97235" strokeWidth="1.5" strokeDasharray="4 2" />
            
            {/* Center symbolic globe */}
            <circle cx="50" cy="45" r="16" fill="#F97235" fillOpacity="0.1" stroke="#F97235" strokeWidth="2" />
            <path d="M35 45h30M50 29v32M37 38c5 4 21 4 26 0M37 52c5-4 21-4 26 0" stroke="#F97235" strokeWidth="1.5" />
            
            {/* Satymeva Jayate symbolic shape */}
            <path d="M42 76h16M45 81h10" stroke="#F97235" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        
        <p
          className="text-xs font-bold text-slate-800 tracking-wider uppercase mb-0.5"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Government of West Bengal
        </p>
        <p className="text-[9px] text-slate-500 font-medium tracking-tight">
          Department of Health & Family Welfare
        </p>

        {/* Skip note indicator at the dry bottom edge */}
        <div className="mt-4 text-[10px] text-orange-600/50 animate-pulse font-medium">
          Tap anywhere to skip
        </div>
      </motion.div>
    </div>
  );
}
