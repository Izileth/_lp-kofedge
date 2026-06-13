import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TriIcon } from "./Navbar";

const BOOT_MESSAGES = [
  "INITIALIZING NEUTRAL SYSTEM...",
  "CALIBRATING TACTICAL INTERFACE...",
  "LOADING ASSETS [IMAGE_BUFFER_01]...",
  "ESTABLISHING SECURE CONNECTION...",
  "S/N 48-1508F CONNECTED",
  "SYSTEM ACTIVE"
];

const BARS = [2, 3, 5, 4, 6, 7, 9, 8, 10, 7, 11, 9, 12, 10, 14, 11, 13, 15, 12, 14];

function WaveformProgress() {
    return (
        <div className="flex items-end gap-[2px] h-4" aria-hidden="true">
            {BARS.map((h, i) => (
                <div 
                  key={i} 
                  className="w-[2px] bg-red-600/30 flex-shrink-0" 
                  style={{ height: `${(h / 15) * 100}%` }} 
                >
                  <div className="w-full h-full bg-red-600 animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.05}s` }} />
                </div>
            ))}
        </div>
    );
}

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: onComplete
        });
      }
    });

    // Initial state
    gsap.set(contentRef.current, { opacity: 0, y: 10 });

    // Logo and content reveal
    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    });

    tl.fromTo(logoRef.current, 
      { scale: 0.9, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" },
      "-=0.8"
    );

    // Message sequence
    BOOT_MESSAGES.forEach((_, i) => {
      tl.add(() => setCurrentMessage(i), `+=${0.3 + Math.random() * 0.3}`);
    });

    // Progress bar
    tl.fromTo(progressRef.current, 
      { width: "0%" }, 
      { width: "100%", duration: 2.5, ease: "power1.inOut" },
      "0.5"
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[1000] bg-[#1a1a1a] flex flex-col items-center justify-center p-6 overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />
      </div>

      <div ref={contentRef} className="flex flex-col items-center gap-12 max-w-md w-full relative z-10">
        <div ref={logoRef} className="flex flex-col items-center gap-5">
          <div className="w-20 h-20 bg-red-600 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.2)]">
            <TriIcon size={40} color="#fff" />
          </div>
          <div className="text-center">
            <h1 className="text-white text-5xl font-black tracking-[0.25em] uppercase leading-none">
              HORIZON-<em className="italic font-serif">s</em>
            </h1>
            <p className="text-zinc-500 text-[9px] font-bold tracking-[0.4em] uppercase mt-2">
              Tactical Performance Interface
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-end mb-1">
            <div className="flex flex-col gap-1">
              <span className="text-red-600 text-[10px] font-black tracking-widest uppercase">
                {BOOT_MESSAGES[currentMessage]}
              </span>
              <WaveformProgress />
            </div>
            <span className="text-zinc-500 text-[10px] font-mono mb-1">
              {Math.round((currentMessage + 1) / BOOT_MESSAGES.length * 100)}%
            </span>
          </div>

          <div className="h-[3px] w-full bg-zinc-800/50 relative overflow-hidden">
            <div 
              ref={progressRef}
              className="absolute top-0 left-0 h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.6)]"
            />
          </div>
          
          <div className="flex justify-between items-center text-zinc-600 text-[8px] font-bold tracking-[0.2em] uppercase">
            <span>Auth: NEUTRAL_CORE_v1.4</span>
            <span>Loc: SEC_SERVER_01</span>
          </div>
        </div>
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-zinc-800" />
      <div className="absolute top-10 right-10 w-12 h-12 border-t-2 border-r-2 border-zinc-800" />
      <div className="absolute bottom-10 left-10 w-12 h-12 border-b-2 border-l-2 border-zinc-800" />
      <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-zinc-800" />

      <div className="absolute bottom-12 text-center">
        <p className="text-[8px] text-zinc-700 font-bold tracking-[0.3em] uppercase">
          XVS TACTICAL GLOBAL // 2026 EDITION
        </p>
      </div>
    </div>
  );
}
