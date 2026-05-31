import { useState, useEffect } from "react";

const slides = [
  {
    id: "01",
    brand: "COCA",
    brandRest: "COLA",
    description:
      "Coca-Cola, or Coke, is a carbonated soft drink manufactured by The Coca-Cola Company.",
  },
  {
    id: "02",
    brand: "COCA",
    brandRest: "COLA ZERO",
    description:
      "Coca-Cola Zero Sugar offers the same iconic taste with zero calories, for those who want it all.",
  },
  {
    id: "03",
    brand: "DIET",
    brandRest: "COKE",
    description:
      "Diet Coke is a sugar-free soft drink produced and distributed by The Coca-Cola Company.",
  },
  {
    id: "04",
    brand: "COCA",
    brandRest: "COLA LIGHT",
    description:
      "Coca-Cola Light delivers a lighter taste with fewer calories, loved worldwide since 1982.",
  },
  {
    id: "05",
    brand: "CHERRY",
    brandRest: "COKE",
    description:
      "Cherry Coke blends the classic Coca-Cola taste with a bold, refreshing cherry flavor.",
  },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const total = slides.length;

  const goTo = (index: number) => {
    if (animating || index === current) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 400);
  };

  const prev = () => goTo((current - 1 + total) % total);
  const next = () => goTo((current + 1) % total);
  const slide = slides[current];

  // close mobile menu on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div
      className="relative w-screen overflow-hidden bg-[#191919] font-sans"
      style={{ height: "100dvh", minHeight: 500 }}
    >
      {/* ─── AMBIENT BACKGROUND GLOW ─────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 38% 58%, rgba(229,0,26,0.09) 0%, transparent 65%)",
        }}
      />

      {/* ─── NAVBAR ──────────────────────────────────────────── */}
      <header className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16"
        style={{ height: "clamp(52px, 8vh, 80px)" }}>

        <span className="text-white font-black text-2xl tracking-tight select-none">CL.</span>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          {["Home", "Our Products", "Heritage", "About", "Contact"].map((item) => (
            <a key={item} href="#"
              className="text-[11px] font-semibold text-gray-400 tracking-[0.18em] uppercase hover:text-white transition-colors duration-200">
              {item}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div className="hidden md:flex items-center gap-5 text-gray-500">
          {[
            { label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", filled: true },
            { label: "Instagram", filled: false },
            { label: "Twitter", path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z", filled: true },
          ].map(({ label, path }) => (
            <a key={label} href="#" aria-label={label} className="hover:text-white transition-colors">
              {label === "Instagram" ? (
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              ) : (
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d={path} />
                </svg>
              )}
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 z-50"
          onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </header>

      {/* Mobile drawer */}
      <div className={`md:hidden absolute left-0 right-0 z-30 bg-[#191919]/97 backdrop-blur border-b border-white/10 transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-72 py-6" : "max-h-0"}`}
        style={{ top: "clamp(52px, 8vh, 80px)" }}>
        <nav className="flex flex-col gap-5 px-8">
          {["Home", "Our Products", "Heritage", "About", "Contact"].map((item) => (
            <a key={item} href="#"
              className="text-xs font-semibold text-gray-400 tracking-[0.18em] uppercase hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Red separator line */}
      <div
        aria-hidden
        className="absolute left-0 right-0 z-20 h-px bg-gradient-to-r from-transparent via-[#e5001a]/35 to-transparent"
        style={{ top: "clamp(52px, 8vh, 80px)" }}
      />

      {/* ─── HERO BODY ───────────────────────────────────────── */}
      <main
        className="absolute left-0 right-0 bottom-0 flex flex-col md:flex-row"
        style={{
          top: "clamp(52px, 8vh, 80px)",
          bottom: "clamp(44px, 7vh, 72px)",
        }}
      >
        {/* Left sidebar — pagination dots (desktop) */}
        <aside className="hidden md:flex flex-col items-center justify-center gap-[10px] flex-shrink-0 z-20"
          style={{ width: "clamp(56px, 7vw, 96px)" }}>
          <div className="flex items-center gap-[7px] mb-3">
            <div className="w-4 h-4 rounded-full border border-white/35 flex items-center justify-center flex-shrink-0">
              <div className="w-[6px] h-[6px] rounded-full bg-white" />
            </div>
            <span className="text-white/70 text-[10px] tracking-[0.2em] font-light whitespace-nowrap">
              {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-2 h-2 bg-white" : "w-[6px] h-[6px] bg-white/20 hover:bg-white/45"}`}
            />
          ))}
        </aside>

        {/* Center — product image column */}
        <div className="relative flex items-end justify-center flex-shrink-0
          w-full h-[38vw] max-h-[260px]
          md:w-auto md:h-full md:max-h-none"
          style={{ width: undefined }}>

          {/* On desktop, override width */}
          <style>{`
            @media (min-width: 768px) {
              .bottle-col { width: clamp(200px, 26vw, 360px); }
            }
          `}</style>

          <div className="bottle-col w-full h-full relative flex items-end justify-center">
            {/* Ghost watermark */}
            <div aria-hidden
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <span className="text-white/[0.035] font-black leading-none"
                style={{ fontSize: "clamp(72px, 16vw, 220px)" }}>
                COKE
              </span>
            </div>

            {/* Red glow below bottle */}
            <div aria-hidden
              className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full blur-3xl pointer-events-none"
              style={{
                width: "clamp(100px, 18vw, 260px)",
                height: "clamp(30px, 5vh, 80px)",
                background: "rgba(229,0,26,0.22)",
              }}
            />

            {/* ── BOTTLE PLACEHOLDER ──
                Replace this <div> with your <img> tag:
                <img src="/bottle.png" alt="Coca-Cola Zero" className="..." style={{ height: "clamp(160px, 48vh, 500px)", width: "auto", objectFit: "contain" }} />
            */}
            <div
              className="relative flex flex-col items-center justify-end"
              style={{ height: "clamp(150px, 48vh, 500px)", width: "clamp(54px, 9vw, 130px)" }}
            >
              <svg viewBox="0 0 80 200" fill="none"
                className="w-full h-full opacity-[0.15] drop-shadow-2xl" aria-label="Bottle placeholder">
                <rect x="28" y="0" width="24" height="12" rx="5" fill="white" />
                <rect x="20" y="12" width="40" height="18" rx="4" fill="white" />
                <rect x="8" y="30" width="64" height="138" rx="10" fill="white" />
                <rect x="18" y="168" width="44" height="32" rx="6" fill="white" />
              </svg>
              <span className="absolute bottom-4 text-white/20 text-[9px] tracking-widest uppercase whitespace-nowrap">
                Add image
              </span>
            </div>
          </div>
        </div>

        {/* Right — text content */}
        <div className="flex-1 flex flex-col justify-center z-10 overflow-hidden"
          style={{ padding: "0 clamp(16px, 4vw, 64px)" }}>

          {/* Coca-Cola script SVG */}
          <div className="mb-3 md:mb-5 overflow-hidden">
            <svg
              viewBox="0 0 520 115"
              className={`transition-opacity duration-400 ${animating ? "opacity-0" : "opacity-100"}`}
              style={{ width: "clamp(180px, 38vw, 480px)", height: "auto" }}
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Coca-Cola"
            >
              <text x="8" y="98"
                fontFamily="Georgia, 'Times New Roman', serif"
                fontSize="106"
                fill="#e5001a"
                fontStyle="italic"
                fontWeight="bold"
                letterSpacing="-3">
                Coca‑Cola
              </text>
            </svg>
          </div>

          {/* Badge row */}
          <div className={`flex items-center gap-3 mb-3 md:mb-5 transition-opacity duration-400 ${animating ? "opacity-0" : "opacity-100"}`}>
            <div className="bg-[#e5001a] px-[10px] py-[3px] flex-shrink-0">
              <span className="text-white font-black text-xs tracking-[0.22em] uppercase">
                {slide.brand}
              </span>
            </div>
            <span className="text-white/85 font-light text-xs tracking-[0.28em] uppercase whitespace-nowrap">
              {slide.brandRest}
            </span>
            <div className="h-px bg-white/15 flex-1 min-w-[16px]" />
          </div>

          {/* Description */}
          <p className={`text-gray-400 leading-relaxed mb-4 md:mb-6 transition-opacity duration-400 ${animating ? "opacity-0" : "opacity-100"}`}
            style={{ fontSize: "clamp(12px, 1.4vw, 15px)", maxWidth: "clamp(240px, 30vw, 380px)" }}>
            {slide.description}
          </p>

          {/* Read more */}
          <a href="#"
            className="inline-flex items-center gap-1 text-[#e5001a] font-bold tracking-[0.22em] uppercase hover:text-red-400 transition-colors w-fit"
            style={{ fontSize: "clamp(10px, 1vw, 12px)" }}>
            Read More
            <span className="ml-1 text-base leading-none">›››</span>
          </a>
        </div>
      </main>

      {/* ─── FOOTER BAR ──────────────────────────────────────── */}
      <footer
        className="absolute bottom-0 left-0 right-0 z-40 flex items-center justify-between"
        style={{
          height: "clamp(44px, 7vh, 72px)",
          padding: "0 clamp(20px, 4vw, 64px)",
        }}>

        <p className="text-[10px] text-gray-600 tracking-widest uppercase leading-snug">
          © 2019 &nbsp;·&nbsp; All Rights Reserved
        </p>

        {/* Mobile pagination dots */}
        <div className="flex md:hidden items-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-2 h-2 bg-white" : "w-[6px] h-[6px] bg-white/20"}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          {[
            { fn: prev, points: "15 18 9 12 15 6", label: "Previous" },
            { fn: next, points: "9 18 15 12 9 6", label: "Next" },
          ].map(({ fn, points, label }) => (
            <button key={label} onClick={fn} aria-label={label}
              className="w-9 h-9 rounded border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-[#e5001a] hover:border-[#e5001a] active:scale-95 transition-all duration-200">
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points={points} />
              </svg>
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}