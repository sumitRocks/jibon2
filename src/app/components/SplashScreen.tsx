import { useEffect } from "react";

interface Props {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: Props) {
  // Automatically progress to onboarding after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="relative size-full flex flex-col items-center justify-center overflow-hidden cursor-pointer"
      onClick={onComplete}
    >
      <img
        src="https://drive.google.com/uc?export=view&id=1Vl4t5SW49ygrl3q2ZY00SACaovj2IImW"
        alt="Splash Screen"
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

