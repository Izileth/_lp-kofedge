import { useState } from "react";

const slides = [
  {
    id: "01",
    brand: "COCA",
    brandRest: "COLA",
    description:
      "Coca-Cola, or Coke, is a carbonated soft drink manufactured by The Coca-Cola Company.",
    logo: "Coca-Cola",
  },
  {
    id: "02",
    brand: "COCA",
    brandRest: "COLA ZERO",
    description:
      "Coca-Cola Zero Sugar offers the same great taste with zero calories, perfect for those who want it all.",
    logo: "Coca-Cola",
  },
  {
    id: "03",
    brand: "DIET",
    brandRest: "COKE",
    description:
      "Diet Coke is a sugar-free soft drink produced and distributed by The Coca-Cola Company.",
    logo: "Coca-Cola",
  },
  {
    id: "04",
    brand: "COCA",
    brandRest: "COLA LIGHT",
    description:
      "Coca-Cola Light has a lighter taste and fewer calories, loved worldwide since 1982.",
    logo: "Coca-Cola",
  },
  {
    id: "05",
    brand: "CHERRY",
    brandRest: "COKE",
    description:
      "Cherry Coke blends the classic taste of Coca-Cola with a refreshing cherry flavor.",
    logo: "Coca-Cola",
  },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const total = slides.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const slide = slides[current];

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center p-4 font-sans">
      {/* Card */}
      <div className="relative w-full max-w-5xl bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl"
        style={{ minHeight: "520px" }}>

        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-5 z-20 relative">
          <span className="text-white font-extrabold text-2xl tracking-tight select-none">CL.</span>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 text-xs font-semibold text-gray-300 tracking-widest uppercase">
            {["Home", "Our Products", "Heritage", "About", "Contact"].map((item) => (
              <li key={item}
                className="hover:text-white cursor-pointer transition-colors duration-200">
                {item}
              </li>
            ))}
          </ul>

          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-4 text-gray-400">
            {/* Facebook */}
            <a href="#" aria-label="Facebook"
              className="hover:text-white transition-colors duration-200">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram"
              className="hover:text-white transition-colors duration-200">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* Twitter */}
            <a href="#" aria-label="Twitter"
              className="hover:text-white transition-colors duration-200">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu">
            <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[#1a1a1a] z-30 px-8 py-4 border-t border-white/10">
            <ul className="flex flex-col gap-4 text-xs font-semibold text-gray-300 tracking-widest uppercase">
              {["Home", "Our Products", "Heritage", "About", "Contact"].map((item) => (
                <li key={item}
                  className="hover:text-white cursor-pointer transition-colors py-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Thin red accent line */}
        <div className="absolute top-[56px] left-0 right-0 h-px bg-[#e5001a]/30 z-10" />

        {/* Main Content */}
        <div className="relative flex flex-col md:flex-row items-center px-6 md:px-12 pb-16 pt-4 gap-8 min-h-[420px]">

          {/* Left vertical dots / pagination */}
          <div className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-2 z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span className="text-white text-xs tracking-widest font-light">
                {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-2 h-2 bg-white"
                    : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Center: Product Image placeholder */}
          <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto md:ml-12">
            <div
              className="relative w-40 h-72 md:w-52 md:h-96 flex items-center justify-center rounded-md"
              style={{
                background:
                  "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 60%, #111 100%)",
                boxShadow: "0 0 60px 10px rgba(229,0,26,0.08)",
              }}
            >
              {/* Placeholder silhouette */}
              <div className="flex flex-col items-center gap-2 opacity-20">
                <svg width="40" height="80" viewBox="0 0 40 80" fill="white">
                  <rect x="12" y="0" width="16" height="6" rx="3" />
                  <rect x="8" y="6" width="24" height="10" rx="2" />
                  <rect x="4" y="16" width="32" height="50" rx="4" />
                  <rect x="10" y="66" width="20" height="14" rx="3" />
                </svg>
                <span className="text-white text-xs tracking-widest uppercase">
                  Add Image
                </span>
              </div>

              {/* Subtle red glow bottom */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-8 rounded-full blur-xl"
                style={{ background: "rgba(229,0,26,0.25)" }}
              />
            </div>
          </div>

          {/* Right: Coca-Cola logo + description */}
          <div className="flex-1 flex flex-col items-start justify-center z-10 max-w-xs md:max-w-sm">
            {/* Coca-Cola script logo */}
            <div className="mb-4 w-full">
              <svg
                viewBox="0 0 340 90"
                className="w-full max-w-[320px]"
                aria-label="Coca-Cola"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text
                  x="10"
                  y="76"
                  fontFamily="'Georgia', serif"
                  fontSize="82"
                  fill="#e5001a"
                  fontStyle="italic"
                  fontWeight="bold"
                  letterSpacing="-2"
                >
                  Coca‑Cola
                </text>
              </svg>
            </div>

            {/* Thin red separator line */}
            <div className="flex items-center gap-3 mb-4 w-full">
              <div className="bg-[#e5001a] px-2 py-0.5">
                <span className="text-white font-extrabold text-sm tracking-widest uppercase">
                  {slide.brand}
                </span>
              </div>
              <span className="text-white font-light text-sm tracking-[0.2em] uppercase">
                {slide.brandRest}
              </span>
              <div className="flex-1 h-px bg-white/20" />
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              {slide.description}
            </p>

            {/* Read More */}
            <a
              href="#"
              className="text-[#e5001a] text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-1 hover:text-red-400 transition-colors"
            >
              Read More
              <span className="tracking-normal">›››</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-8 py-4 z-10">
          <div className="text-gray-600 text-[10px] tracking-widest uppercase leading-tight">
            <div>© 2019</div>
            <div>All Right Are Reserved</div>
          </div>

          {/* Mobile pagination */}
          <div className="flex md:hidden items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? "w-2 h-2 bg-white" : "w-1.5 h-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-9 h-9 rounded bg-[#2a2a2a] border border-white/10 flex items-center justify-center text-white hover:bg-[#e5001a] hover:border-[#e5001a] transition-all duration-200"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"
                viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="w-9 h-9 rounded bg-[#2a2a2a] border border-white/10 flex items-center justify-center text-white hover:bg-[#e5001a] hover:border-[#e5001a] transition-all duration-200"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"
                viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Background ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 38% 55%, rgba(229,0,26,0.06) 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}