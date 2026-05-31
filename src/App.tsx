import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: "01",
    brand: "ZEUS",
    brandRest: "REI DOS DEUSES",
    description:
      "Soberano do Monte Olimpo e senhor dos céus. Seu raio forjado pelos ciclopes mantém a ordem divina sobre mortais e imortais.",
    color: "#eab308", // Gold
    icon: "⚡",
    bgGlow: "rgba(234, 179, 8, 0.15)",
  },
  {
    id: "02",
    brand: "POSEIDON",
    brandRest: "SENHOR DOS MARES",
    description:
      "Aquele que abala a terra e governa as profundezas abissais. Com seu tridente, comanda tempestades e acalma os oceanos.",
    color: "#0ea5e9", // Blue
    icon: "🔱",
    bgGlow: "rgba(14, 165, 233, 0.15)",
  },
  {
    id: "03",
    brand: "HADES",
    brandRest: "REI DO SUBMUNDO",
    description:
      "Guardião das almas e mestre das riquezas ocultas da terra. Seu reino é eterno, silencioso e rico em segredos milenares.",
    color: "#a855f7", // Purple
    icon: "💀",
    bgGlow: "rgba(168, 85, 247, 0.15)",
  },
  {
    id: "04",
    brand: "ARES",
    brandRest: "DEUS DA GUERRA",
    description:
      "A fúria indomável do campo de batalha. Onde quer que o bronze colida, Ares está presente, alimentando a sede de glória dos reis.",
    color: "#ef4444", // Red
    icon: "⚔️",
    bgGlow: "rgba(239, 68, 68, 0.15)",
  },
  {
    id: "05",
    brand: "MIDAS",
    brandRest: "REI DO OURO",
    description:
      "O monarca cujo toque transformava o efêmero em eterno. Uma lição milenar sobre ambição, riqueza e o preço do poder divino.",
    color: "#f59e0b", // Amber
    icon: "👑",
    bgGlow: "rgba(245, 158, 11, 0.2)",
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
    setTimeout(() => setAnimating(false), 500);
  };

  const prev = () => goTo((current - 1 + total) % total);
  const next = () => goTo((current + 1) % total);
  const slide = slides[current];

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div
      className="relative w-screen overflow-hidden bg-[#0d0d0d] font-serif"
      style={{ height: "100dvh", minHeight: 500 }}
    >
      {/* ─── AMBIENT BACKGROUND GLOW ─────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`glow-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(ellipse 60% 70% at 38% 58%, ${slide.bgGlow} 0%, transparent 65%)`,
          }}
        />
      </AnimatePresence>

      {/* ─── NAVBAR ──────────────────────────────────────────── */}
      <header className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16"
        style={{ height: "clamp(52px, 8vh, 80px)" }}>

        <span className="text-white font-black text-2xl tracking-tighter select-none font-sans">OLYMPUS.</span>

        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          {["Panteão", "Reinos", "Linhagens", "Mitos", "Oráculo"].map((item) => (
            <a key={item} href="#"
              className="text-[11px] font-bold text-gray-500 tracking-[0.2em] uppercase hover:text-white transition-colors duration-300">
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5 text-gray-600">
          <span className="text-sm">🏛️</span>
          <span className="text-sm">⚡</span>
          <span className="text-sm">🏺</span>
        </div>

        <button className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 z-50"
          onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </header>

      {/* Mobile drawer */}
      <div className={`md:hidden absolute left-0 right-0 z-30 bg-[#0d0d0d]/98 backdrop-blur border-b border-white/5 transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-72 py-6" : "max-h-0"}`}
        style={{ top: "clamp(52px, 8vh, 80px)" }}>
        <nav className="flex flex-col gap-5 px-8">
          {["Panteão", "Reinos", "Linhagens", "Mitos", "Oráculo"].map((item) => (
            <a key={item} href="#"
              className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </nav>
      </div>

      <div
        aria-hidden
        className="absolute left-0 right-0 z-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={{ top: "clamp(52px, 8vh, 80px)" }}
      />

      {/* ─── HERO BODY ───────────────────────────────────────── */}
      <main
        className="absolute left-0 right-0 bottom-0 flex flex-col items-center justify-center text-center"
        style={{
          top: "clamp(52px, 8vh, 80px)",
          bottom: "clamp(44px, 7vh, 72px)",
          padding: "0 20px"
        }}
      >
        {/* Pagination dots (absolute to not interfere with centering) */}
        <aside className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[10px] z-20">
          <div className="flex flex-col items-center gap-[7px]">
            <span className="text-white/40 text-[10px] tracking-[0.2em] font-light whitespace-nowrap font-sans rotate-90 mb-8">
              {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Divindade ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${i === current ? "w-2 h-2 bg-white scale-125" : "w-[6px] h-[6px] bg-white/10 hover:bg-white/30"}`}
              />
            ))}
          </div>
        </aside>

        <div className="relative flex flex-col items-center justify-center w-full max-w-4xl">
          {/* Relic/Icon */}
          <div className="relative mb-4 md:mb-8">
            <div aria-hidden
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <motion.span 
                key={`watermark-${current}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.03, scale: 1.1 }}
                transition={{ duration: 1 }}
                className="text-white font-black leading-none font-sans"
                style={{ fontSize: "clamp(120px, 25vw, 350px)" }}>
                {slide.brand}
              </motion.span>
            </div>

            <motion.div
              key={`relic-${current}`}
              initial={{ y: 30, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative z-10"
              style={{ fontSize: "clamp(120px, 25vh, 220px)" }}
            >
              <span className="filter drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                {slide.icon}
              </span>
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-center max-w-2xl z-10">
            <motion.h2
              key={`title-${current}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-bold italic text-white leading-none tracking-tighter mb-4"
              style={{ fontSize: "clamp(56px, 8vw, 110px)", color: slide.color }}
            >
              {slide.brand}
            </motion.h2>

            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              className="bg-white/5 border border-white/10 px-[16px] py-[6px] backdrop-blur-sm mb-6"
            >
              <span className="text-white/80 font-bold text-[11px] tracking-[0.4em] uppercase font-sans">
                {slide.brandRest}
              </span>
            </motion.div>

            <motion.p 
              key={`desc-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="text-white leading-relaxed mb-10 font-light italic text-balance"
              style={{ fontSize: "clamp(16px, 1.3vw, 20px)" }}>
              {slide.description}
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-sm text-white font-bold tracking-[0.3em] uppercase group font-sans backdrop-blur-md hover:bg-white/10 transition-all"
              style={{ fontSize: "clamp(10px, 1vw, 12px)" }}>
              <span style={{ color: slide.color }}>Consultar Oráculo</span>
              <span className="text-xl transition-transform group-hover:translate-x-1">🡒</span>
            </motion.button>
          </div>
        </div>
      </main>

      <footer
        className="absolute bottom-0 left-0 right-0 z-40 flex items-center justify-between"
        style={{
          height: "clamp(44px, 7vh, 72px)",
          padding: "0 clamp(20px, 4vw, 64px)",
        }}>

        <p className="text-[9px] text-gray-700 tracking-[0.4em] uppercase font-sans">
          ERA DOS MITOS &nbsp;·&nbsp; MMXXVI
        </p>

        <div className="flex md:hidden items-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-2 h-2 bg-white" : "w-[6px] h-[6px] bg-white/10"}`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          {[
            { fn: prev, label: "Anterior", icon: "«" },
            { fn: next, label: "Próximo", icon: "»" },
          ].map(({ fn, label, icon }) => (
            <button key={label} onClick={fn} aria-label={label}
              className="w-10 h-10 border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 active:scale-90 transition-all duration-300 rounded-sm">
              <span className="text-xl leading-none">{icon}</span>
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}