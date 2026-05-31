import { motion, AnimatePresence } from "framer-motion";
import { useState} from "react";
import type{ FC } from "react";
import { 
  RunicAnsuz, 
 
  RunicOthala, 

  RunicAlgiz,
  RunicGebo,
  RunicUruz
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
    description: "Soberano do Monte Olimpo e senhor dos céus. Seu raio forjado pelos ciclopes mantém a ordem divina sobre mortais e imortais.",
    color: "#eab308",
    icon: RunicAnsuz,
    bgGlow: "rgba(234, 179, 8, 0.15)",
    backdrop: back1
  },
  {
    id: "02",
    brand: "POSEIDON",
    brandRest: "SENHOR DOS MARES",
    description: "Aquele que abala a terra e governa as profundezas abissais. Com seu tridente, comanda tempestades e acalma os oceanos.",
    color: "#0ea5e9",
    icon: RunicAlgiz,
    bgGlow: "rgba(14, 165, 233, 0.15)",
    backdrop: back2
  },
  {
    id: "03",
    brand: "HADES",
    brandRest: "REI DO SUBMUNDO",
    description: "Guardião das almas e mestre das riquezas ocultas da terra. Seu reino é eterno, silencioso e rico em segredos milenares.",
    color: "#a855f7",
    icon: RunicOthala,
    bgGlow: "rgba(168, 85, 247, 0.15)",
    backdrop: back3
  },
  {
    id: "04",
    brand: "ARES",
    brandRest: "DEUS DA GUERRA",
    description: "A fúria indomável do campo de batalha. Onde quer que o bronze colida, Ares está presente, alimentando a sede de glória dos reis.",
    color: "#ef4444",
    icon: RunicGebo,
    bgGlow: "rgba(239, 68, 68, 0.15)",
    backdrop: back4
  },
  {
    id: "05",
    brand: "MIDAS",
    brandRest: "REI DO OURO",
    description: "O monarca cujo toque transformava o efêmero em eterno. Uma lição milenar sobre ambição, riqueza e o preço do poder divino.",
    color: "#f59e0b",
    icon: RunicUruz,
    bgGlow: "rgba(245, 158, 11, 0.2)",
    backdrop: back1
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
    setTimeout(() => setAnimating(false), 800);
  };

  const prev = () => goTo((current - 1 + total) % total);
  const next = () => goTo((current + 1) % total);
  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0d0d0d]">
      {/* ─── DYNAMIC ATMOSPHERIC BACKDROP ─────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`back-${current}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.2, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <motion.img 
            src={slide.backdrop} 
            alt="" 
            className="w-full h-full object-cover"
            animate={{ scale: [1, 1.05, 1], rotate: [0, 0.3, -0.3, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

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
            background: `radial-gradient(ellipse 60% 70% at 50% 50%, ${slide.bgGlow} 0%, transparent 80%)`,
          }}
        />
      </AnimatePresence>

      <main
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
        style={{
          top: "clamp(52px, 8vh, 80px)",
          bottom: "clamp(44px, 7vh, 72px)",
          padding: "0 20px"
        }}
      >
        <aside className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[10px] z-20">
          <div className="flex flex-col items-center gap-[7px]">
            <span className="text-white/40 text-[10px] tracking-[0.2em] font-light whitespace-nowrap font-sans rotate-90 mb-8">
              {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            {slides.map((_, i) => (
              <button 
                key={i} 
                onClick={() => goTo(i)} 
                aria-label={`Slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${i === current ? "w-2 h-2 bg-white scale-125" : "w-[6px] h-[6px] bg-white/10 hover:bg-white/30"}`}
              />
            ))}
          </div>
        </aside>

        <div className="relative flex flex-col items-center justify-center w-full max-w-4xl">
          <div className="relative mb-4 md:mb-8">
            <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <motion.span 
                key={`watermark-${current}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.04, scale: 1.2 }}
                transition={{ duration: 1 }}
                className="text-white font-black leading-none font-sans uppercase"
                style={{ fontSize: "clamp(120px, 25vw, 400px)" }}>
                {slide.brand}
              </motion.span>
            </div>

            <motion.div
              key={`relic-${current}`}
              initial={{ y: 30, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative z-10 flex items-center justify-center"
            >
              <div className="filter drop-shadow-[0_0_60px_rgba(255,255,255,0.2)]">
                <Icon size={220} color={slide.color} />
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col items-center max-w-2xl z-10">
            <motion.h2
              key={`title-${current}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-bold italic text-white leading-none tracking-tighter mb-4 uppercase"
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

      <div className="absolute bottom-0 right-0 p-8 hidden md:block z-20">
        <div className="flex gap-4">
          {[
            { fn: prev, icon: "«" },
            { fn: next, icon: "»" },
          ].map(({ fn, icon }) => (
            <button 
              key={icon} 
              onClick={fn}
              className="w-12 h-12 border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all rounded-sm backdrop-blur-sm"
            >
              <span className="text-2xl">{icon}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
