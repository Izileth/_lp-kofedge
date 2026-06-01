import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { FC } from "react";
import {
  RunicAnsuz,
  RunicOthala,
  RunicAlgiz,
  RunicGebo,
  RunicUruz,
} from "../components/Icons";
import type { IconProps } from "../components/Icons";

// Import Backdrops
import back1 from "../assets/back/backdrop.png";
import back2 from "../assets/back/backdrop2.png";
import back3 from "../assets/back/backdrop3.png";
import back4 from "../assets/back/backdrop4.png";

interface SlideData {
  id: string;
  brand: string;
  brandRest: string;
  description: string;
  color: string;
  icon: FC<IconProps>;
  bgGlow: string;
  backdrop: string;
}

const slides: SlideData[] = [
  {
    id: "01",
    brand: "ZEUS",
    brandRest: "REI DOS DEUSES",
    description:
      "Soberano do Monte Olimpo e senhor dos céus. Seu raio forjado pelos ciclopes mantém a ordem divina sobre mortais e imortais.",
    color: "#eab308",
    icon: RunicAnsuz,
    bgGlow: "rgba(234, 179, 8, 0.12)",
    backdrop: back1,
  },
  {
    id: "02",
    brand: "POSEIDON",
    brandRest: "SENHOR DOS MARES",
    description:
      "Aquele que abala a terra e governa as profundezas abissais. Com seu tridente, comanda tempestades e acalma os oceanos.",
    color: "#0ea5e9",
    icon: RunicAlgiz,
    bgGlow: "rgba(14, 165, 233, 0.12)",
    backdrop: back2,
  },
  {
    id: "03",
    brand: "HADES",
    brandRest: "REI DO SUBMUNDO",
    description:
      "Guardião das almas e mestre das riquezas ocultas da terra. Seu reino é eterno, silencioso e rico em segredos milenares.",
    color: "#a855f7",
    icon: RunicOthala,
    bgGlow: "rgba(168, 85, 247, 0.12)",
    backdrop: back3,
  },
  {
    id: "04",
    brand: "ARES",
    brandRest: "DEUS DA GUERRA",
    description:
      "A fúria indomável do campo de batalha. Onde quer que o bronze colida, Ares está presente, alimentando a sede de glória dos reis.",
    color: "#ef4444",
    icon: RunicGebo,
    bgGlow: "rgba(239, 68, 68, 0.12)",
    backdrop: back4,
  },
  {
    id: "05",
    brand: "MIDAS",
    brandRest: "REI DO OURO",
    description:
      "O monarca cujo toque transformava o efêmero em eterno. Uma lição milenar sobre ambição, riqueza e o preço do poder divino.",
    color: "#f59e0b",
    icon: RunicUruz,
    bgGlow: "rgba(245, 158, 11, 0.15)",
    backdrop: back1,
  },
];

export default function Panteao() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const total = slides.length;

  const goTo = (index: number) => {
    if (animating || index === current) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 700);
  };

  const prev = () => goTo((current - 1 + total) % total);
  const next = () => goTo((current + 1) % total);

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0d0d0d] flex flex-col pt-[clamp(52px,8vh,80px)] pb-[clamp(44px,7vh,72px)]">

      {/* ─── DYNAMIC ATMOSPHERIC BACKDROP ──────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`back-${current}`}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.18, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <motion.img
            src={slide.backdrop}
            alt=""
            className="w-full h-full object-cover"
            animate={{ scale: [1, 1.04, 1], rotate: [0, 0.3, -0.3, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ─── AMBIENT BACKGROUND GLOW ────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`glow-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(ellipse 65% 65% at 38% 55%, ${slide.bgGlow} 0%, transparent 75%)`,
          }}
        />
      </AnimatePresence>

      {/* ─── MAIN CONTENT ───────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 overflow-hidden">

        {/* LEFT SIDEBAR — dots + counter */}
        <aside className="hidden md:flex flex-col items-center justify-center gap-0 w-16 flex-shrink-0 py-8">
          {/* Counter */}
          <span
            className="text-[10px] tracking-[0.18em] text-white/30 font-light font-sans mb-5"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>

          {/* Dots */}
          <div className="flex flex-col items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className="rounded-full transition-all duration-300 border-none cursor-pointer p-0"
                style={{
                  width: i === current ? 8 : 6,
                  height: i === current ? 8 : 6,
                  background:
                    i === current ? "#ffffff" : "rgba(255,255,255,0.12)",
                  boxShadow:
                    i === current
                      ? "0 0 8px rgba(255,255,255,0.5)"
                      : "none",
                }}
              />
            ))}
          </div>
        </aside>

        {/* LEFT PANEL — icon / relic */}
        <div className="flex-[1.1] flex items-center justify-center relative overflow-hidden">

          {/* Giant watermark brand name */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`wm-${current}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 0.045, scale: 1.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              aria-hidden
              className="absolute select-none pointer-events-none text-white font-black leading-none uppercase font-sans"
              style={{ fontSize: "clamp(100px, 18vw, 260px)", letterSpacing: "-4px" }}
            >
              {slide.brand}
            </motion.span>
          </AnimatePresence>

          {/* Icon */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`icon-${current}`}
              initial={{ y: 30, opacity: 0, scale: 0.82 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
              className="relative z-10"
              style={{
                filter: `drop-shadow(0 0 55px ${slide.color}55)`,
              }}
            >
              <Icon size={200} color={slide.color} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* VERTICAL DIVIDER */}
        <div
          className="hidden md:block w-px self-stretch my-10 flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />

        {/* RIGHT PANEL — text content */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-10 py-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col"
            >
              {/* Subtitle / epithet */}
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-sans font-light mb-3">
                {slide.brandRest}
              </span>

              {/* Title row: colored badge + name + horizontal line */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-[13px] font-bold uppercase tracking-wide px-2.5 py-1 font-sans flex-shrink-0"
                  style={{
                    background: slide.color,
                    color: "#0d0d0d",
                  }}
                >
                  {slide.brand}
                </span>
                <span
                  className="font-bold italic text-white uppercase leading-none font-sans"
                  style={{ fontSize: "clamp(22px, 3vw, 34px)", letterSpacing: "2px" }}
                >
                  {slide.brand}
                </span>
                <div
                  className="flex-1 h-px ml-1"
                  style={{ background: "rgba(255,255,255,0.14)" }}
                />
              </div>

              {/* Description */}
              <p
                className="text-white/55 leading-relaxed font-light italic font-sans mb-7"
                style={{ fontSize: "clamp(13px, 1.1vw, 16px)", maxWidth: 360 }}
              >
                {slide.description}
              </p>

              {/* CTA button */}
              <motion.button
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 bg-transparent border-none cursor-pointer p-0 w-fit group mb-12"
              >
                <span
                  className="text-[11px] font-bold tracking-[0.25em] uppercase font-sans"
                  style={{ color: slide.color }}
                >
                  Consultar Oráculo
                </span>
                <span
                  className="text-sm transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: slide.color }}
                >
                  ›››
                </span>
              </motion.button>

              {/* Navigation Controls — Relocated here to avoid layout overlap */}
              <div className="flex gap-3">
                {[
                  { fn: prev, icon: "‹", label: "Anterior" },
                  { fn: next, icon: "›", label: "Próximo" },
                ].map(({ fn, icon, label }) => (
                  <motion.button
                    key={icon}
                    onClick={fn}
                    aria-label={label}
                    whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-all cursor-pointer font-sans text-xl"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.01)",
                      borderRadius: 4,
                    }}
                  >
                    {icon}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
  }