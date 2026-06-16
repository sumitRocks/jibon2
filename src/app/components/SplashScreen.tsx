import { useEffect, useState } from "react";

interface Props {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: Props) {
  const [imgError, setImgError] = useState(false);

  // Automatically progress to onboarding after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="relative size-full flex flex-col items-center justify-center overflow-hidden cursor-pointer bg-[#F97235]"
      onClick={onComplete}
    >
      {!imgError && (
        <img
          src="https://drive.google.com/thumbnail?id=1Vl4t5SW49ygrl3q2ZY00SACaovj2IImW&sz=w1080"
          alt="Splash Screen"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
        />
      )}

      {/* Fallback if the Google Drive image gets blocked */}
      {imgError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gradient-to-b from-[#F97235] to-[#E85F24]">
          <div className="text-5xl font-black mb-2" style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
            জীবন সেতু
          </div>
          <div className="text-xs uppercase tracking-[0.3em] font-bold opacity-80 mb-6">
            Jibon Setu
          </div>
          <div className="font-medium opacity-90 text-sm">
            জরুরি সেবার নতুন সেতু
          </div>

          <div className="absolute bottom-8 text-center w-full px-6 flex flex-col items-center">
            <div className="size-10 mb-2 opacity-90">
              <svg viewBox="0 0 100 100" className="size-full fill-none stroke-white stroke-width-[4]">
                <circle cx="50" cy="50" r="42" stroke="white" strokeWidth="4" />
                <circle cx="50" cy="50" r="32" stroke="white" strokeWidth="1.5" strokeDasharray="4 2" />
                <circle cx="50" cy="45" r="16" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="2" />
                <path d="M35 45h30M50 29v32M37 38c5 4 21 4 26 0M37 52c5-4 21-4 26 0" stroke="white" strokeWidth="1.5" />
                <path d="M42 76h16M45 81h10" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-[10px] font-bold text-white tracking-widest uppercase mb-0.5">Government of West Bengal</p>
          </div>
        </div>
      )}
    </div>
  );
}

