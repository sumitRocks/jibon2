import { useState } from "react";
import { motion } from "motion/react";
import { JibonSetuLogo } from "./figma/JibonSetuLogo";

interface Props {
  onLoginSuccess: () => void;
}

export function LoginScreen({ onLoginSuccess }: Props) {
  const [credential, setCredential] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleArrowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!credential.trim()) {
      setErrorMsg("Please enter an Email or Phone number");
      return;
    }
    // Simple validation
    onLoginSuccess();
  };

  return (
    <div
      className="relative size-full flex flex-col items-center justify-start pt-16 overflow-hidden select-none"
      style={{
        background: "linear-gradient(to bottom, #F97235 0%, #FA8D45 45%, #FBF6F1 80%, #FFFFFF 100%)",
      }}
    >
      {/* Upper ambient ambulance background faint vector */}
      <div className="absolute inset-0 opacity-8 pointer-events-none flex items-center justify-center">
        <svg
          width="400"
          height="300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full opacity-30 mt-[-20dvh]"
        >
          <path d="M14 18H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h8" />
          <path d="M14 6h4a2 2 0 0 1 2 2v5.5a1.5 1.5 0 0 1-.5 1.1L17 17a1.5 1.5 0 0 1-1.1.5H14" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="16" cy="18" r="2" />
          <path d="M10 9v4M8 11h4" />
        </svg>
      </div>

      {/* Top Brand Block */}
      <div className="flex flex-col items-center text-center mt-6 z-10 px-6 shrink-0 mb-10 w-full">
        <JibonSetuLogo className="w-48 h-auto" />
      </div>

      {/* Lower Sheet / Form Container */}
      <div className="w-full flex-1 bg-white rounded-t-[40px] shadow-[0_-8px_30px_rgba(0,0,0,0.06)] px-8 pt-10 pb-8 z-20 flex flex-col items-center justify-between mt-auto">
        <div className="w-full flex flex-col items-center">
          {/* Core login wrapper */}
          <form onSubmit={handleArrowSubmit} className="w-full max-w-sm mb-7 flex flex-col items-center">
            
            {/* Main Credentials Input with Arrow Button on the right side */}
            <div className="w-full flex items-center gap-2.5 bg-slate-50 border border-slate-100 shadow-inner rounded-3xl p-2 focus-within:bg-white focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-100 transition-all duration-300">
              <input
                type="text"
                required
                placeholder="Enter Email ID / Phone No"
                value={credential}
                onChange={(e) => {
                  setCredential(e.target.value);
                  setErrorMsg("");
                }}
                className="flex-1 bg-transparent px-4 py-3.5 text-slate-800 text-[15px] font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-0"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
              {/* Direct Orange Arrow Submit Button */}
              <motion.button
                type="submit"
                whileTap={{ scale: 0.94 }}
                className="size-14 rounded-2xl bg-[#F67E49] flex items-center justify-center text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:shadow-orange-500/40 transition-all shrink-0"
                aria-label="Continue"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.button>
            </div>

            {errorMsg ? (
              <p className="text-red-500 font-medium text-xs mt-3 self-start pl-4 flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {errorMsg}
              </p>
            ) : (
              <div className="h-7" /> // Maintain spacing when no error
            )}
          </form>

          {/* Divider Section */}
          <div className="w-full max-w-sm flex items-center gap-4 mb-7">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">
              Or Continue Using
            </span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Social Authentication Login Rows */}
          <div className="w-full max-w-sm grid grid-cols-2 gap-4 mb-8">
            {/* Google Button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={onLoginSuccess}
              className="flex items-center justify-center gap-2.5 py-4 px-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-100 transition-colors"
            >
            {/* Google iconic G */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-[14px] font-bold text-slate-700 leading-none">Google</span>
          </motion.button>

          {/* Facebook Button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={onLoginSuccess}
            className="flex items-center justify-center gap-2.5 py-4 px-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-100 transition-colors"
          >
            {/* Facebook iconic logo */}
            <svg width="18" height="18" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
            </svg>
            <span className="text-[14px] font-bold text-slate-700 leading-none">Facebook</span>
          </motion.button>
        </div>

        {/* Quick Emergency Skip Access Without Logging In */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onLoginSuccess}
          className="w-full max-w-sm flex items-center justify-center gap-3 py-4 bg-orange-50 border border-orange-100 text-orange-600 rounded-2xl hover:bg-orange-100 transition-colors group mt-2"
        >
          {/* Flying diagonal arrow icon matching mockup */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
          <span className="text-[15px] font-extrabold tracking-wide">
            Emergency Access (No Login)
          </span>
        </motion.button>
        </div>

        {/* Small T&C disclaimer */}
        <p className="text-[11px] text-slate-400 font-medium text-center mt-6 leading-relaxed max-w-[280px]">
          By continuing, you agree to the JibonSetu terms of operations and local healthcare emergency privacy agreements.
        </p>
      </div>
    </div>
  );
}
