import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TriIcon } from "../components/Navbar";
import heroImage from "@src/assets/drops/background.png";
import { gsap } from "gsap";

/* ─── hooks ─────────────────────────────────────────────────────── */
function useTypewriter(text: string, speed: number = 55, delay: number = 1.2): string {
    const [out, setOut] = useState("");
    useEffect(() => {
        const obj = { count: 0 };
        const duration = (text.length * speed) / 1000;
        const tween = gsap.to(obj, {
            count: text.length,
            duration: duration,
            delay: delay,
            ease: "none",
            onUpdate: () => {
                setOut(text.slice(0, Math.floor(obj.count)));
            }
        });
        return () => {
            tween.kill();
        };
    }, [text, speed, delay]);
    return out;
}

/* ─── tiny components ───────────────────────────────────────────── */
const BARS = [2, 3, 5, 4, 6, 7, 9, 8, 10, 7, 11, 9, 12, 10, 14, 11, 13, 15, 12, 14, 11, 13, 10, 9, 12, 14, 15, 13, 11, 10];

function Waveform() {
    return (
        <div className="flex items-end gap-[1px] h-7" aria-hidden="true">
            {BARS.map((h, i) => (
                <div key={i} className="w-[3px] bg-red-600 flex-shrink-0 transition-opacity" style={{ height: `${(h / 15) * 100}%`, opacity: i % 4 === 0 ? 1 : 0.5 }} />
            ))}
        </div>
    );
}

function Barcode() {
    const s = Array.from({ length: 52 }, (_, i) => ({ w: i % 7 === 0 ? 5 : i % 3 === 0 ? 3 : 2, op: i % 5 === 0 ? 0.3 : 1 }));
    return (
        <div className="flex items-stretch h-9 overflow-hidden" aria-hidden="true">
            {s.map((b, i) => <div key={i} className="bg-black flex-shrink-0" style={{ width: b.w, opacity: b.op }} />)}
        </div>
    );
}

export default function HorizonS({ isReady = true }: { isReady?: boolean }) {
    const serial = useTypewriter("S/N 48-1508F");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isReady) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // 1. Animate title strip contents
            tl.from(".hero-title-el", {
                y: -20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6
            });

            // 2. Animate big band elements
            tl.from(".hero-bg-text", {
                x: -50,
                opacity: 0,
                duration: 1.2
            }, "-=0.3");

            tl.from(".hero-kanji", {
                scale: 0.7,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.7)"
            }, "-=1.0");

            tl.from(".hero-render-img", {
                x: 100,
                opacity: 0,
                duration: 1.2
            }, "-=1.0");

            // 3. Info row elements
            tl.from(".hero-info-item", {
                y: 25,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8
            }, "-=0.8");

            // 4. Status bar elements
            tl.from(".hero-status-item", {
                opacity: 0,
                stagger: 0.1,
                duration: 0.5
            }, "-=0.6");

        }, containerRef);
        return () => ctx.revert();
    }, [isReady]);

    return (
        <section className="flex flex-col min-h-[calc(100svh-52px)] p-[6px] md:p-[10px]" aria-label="Horizon-S product hero">
            <div ref={containerRef} className="flex-1 border-[1.5px] border-black bg-white flex flex-col overflow-hidden">

                {/* Title strip */}
                <div className="flex items-center gap-3 px-[14px] md:px-[22px] py-[12px] md:py-[14px] border-b-[1.5px] border-black flex-shrink-0">
                    <div className="hero-title-el w-8 h-8 bg-red-600 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <TriIcon size={14} color="#fff" />
                    </div>
                    <h1 className="hero-title-el text-[clamp(22px,3.5vw,38px)] font-black tracking-wider uppercase leading-none">
                        HORIZON-<em className="italic font-serif">s</em>
                    </h1>
                    <span className="hero-title-el hidden md:block ml-auto text-[8px] font-bold tracking-[0.28em] text-gray-400 uppercase [writing-mode:vertical-rl]" aria-label="Night Performance series">
                        NIGHT PERFORMANCE
                    </span>
                </div>

                {/* Big band */}
                <div className="relative flex-1 bg-black overflow-hidden min-h-[clamp(160px,32vw,380px)]" role="img" aria-label="Horizon-S tactical product">
                    <div className="hero-bg-text absolute inset-0 flex items-center pl-1 text-[clamp(100px,24vw,280px)] font-black tracking-tighter leading-none text-white whitespace-nowrap select-none pointer-events-none opacity-100" aria-hidden="true">
                        NEUTRAL
                    </div>
                    <div className="hero-kanji absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <span className="font-serif font-black text-[clamp(56px,13vw,130px)] text-red-600 tracking-widest leading-none opacity-95" aria-label="Kanji: unrivaled">
                            天&nbsp;&nbsp;双
                        </span>
                    </div>
                    <div className="absolute inset-0 z-0 opacity-40">
                        <img src={heroImage} alt="" className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="hero-render-img absolute right-0 top-[-12%] bottom-[-12%] w-[clamp(200px,44%,480px)] z-20 flex items-center justify-end pointer-events-none">
                        <div className="w-full h-full border border-white/10 border-dashed flex items-center justify-center bg-zinc-900/80 overflow-hidden">
                            <img src={heroImage} alt="Horizon-S Tactical Render" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {/* Info row */}
                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 p-[14px] md:p-[22px] border-t-[1.5px] border-black flex-shrink-0">
                    <div className="hero-info-item flex-1 min-w-[180px]">
                        <p className="text-[clamp(14px,2.2vw,22px)] font-black tracking-[0.2em] uppercase mb-1.5">MODIFICATION</p>
                        <p className="text-[10px] text-gray-500 tracking-widest uppercase leading-relaxed">
                            YOU CAN GET A SKIN BURN WHEN HANDLING<br />LEAD-ACID BATTERIES.
                        </p>
                        <div className="flex items-center gap-1.5 mt-2">
                            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <polygon points="8,1 15,14 1,14" stroke="#dc2626" strokeWidth="1.5" fill="none" />
                                <line x1="8" y1="6" x2="8" y2="10" stroke="#dc2626" strokeWidth="1.5" />
                                <circle cx="8" cy="12" r="0.8" fill="#dc2626" />
                            </svg>
                            <span className="text-[9px] text-red-600 tracking-widest uppercase">Handle with protective gear at all times</span>
                        </div>
                        <div className="flex flex-wrap gap-2.5 mt-[18px]">
                            <Link to="/overview" className="bg-red-600 text-white border-none px-[30px] py-3 cursor-pointer font-sans text-[11px] font-black tracking-[0.22em] uppercase hover:bg-red-700 active:scale-95 transition-all no-underline inline-block">EXPLORE MODEL</Link>
                            <Link to="/catalog" className="bg-transparent text-black border-[1.5px] border-black px-[30px] py-3 cursor-pointer font-sans text-[11px] font-black tracking-[0.22em] uppercase hover:bg-black hover:text-white active:scale-95 transition-all no-underline inline-block">VIEW CATALOG</Link>
                        </div>
                    </div>

                    <div className="hero-info-item flex items-center gap-2.5 self-center md:ml-auto flex-shrink-0">
                        <span className="text-[clamp(13px,2vw,19px)] font-black tracking-[0.18em] font-mono min-w-[148px] text-black" aria-live="polite">
                            {serial}
                            {serial.length < 12 && <span className="animate-[pulse_1s_step-end_infinite]" aria-hidden="true">_</span>}
                        </span>
                        <button className="w-[30px] h-[30px] border-[1.5px] border-black flex items-center justify-center cursor-pointer text-[10px] font-black hover:bg-black hover:text-white transition-colors" aria-label="Open serial detail">▶</button>
                    </div>
                </div>

                {/* Status bar */}
                <div className="flex items-center gap-3 px-[14px] md:px-[22px] py-2.5 border-t-[1.5px] border-black bg-gray-50 flex-wrap flex-shrink-0">
                    <div className="hero-status-item w-[7px] h-[7px] rounded-full bg-green-600 animate-pulse flex-shrink-0" aria-hidden="true" />
                    <span className="hero-status-item text-[9px] font-bold tracking-[0.22em] uppercase text-gray-500">SYSTEM ACTIVE</span>
                    <div className="hero-status-item hidden md:block w-px h-[22px] bg-gray-200 flex-shrink-0" aria-hidden="true" />
                    <div className="hero-status-item"><Waveform /></div>
                    <div className="hero-status-item hidden md:block w-px h-[22px] bg-gray-200 flex-shrink-0" aria-hidden="true" />
                    <div className="hero-status-item flex-1 overflow-hidden min-w-[100px]"><Barcode /></div>
                </div>

            </div>
        </section>
    );
}
