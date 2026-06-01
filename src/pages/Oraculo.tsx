import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VaseIcon } from "../components/Icons";
import backdrop from "../assets/back/backdrop.png";

const profecias = [
  "O ouro que buscas é apenas o reflexo do teu próprio ego.",
  "O raio de Zeus cairá sobre os orgulhosos antes do amanhecer.",
  "As águas de Poseidon guardam segredos que a terra jamais revelará.",
  "O submundo de Hades não aceita oferendas feitas de medo.",
  "A vitória em Ares custará mais do que a derrota em Atena."
];

export default function Oraculo() {
  const [profecia, setProfecia] = useState("");
  const [loading, setLoading] = useState(false);

  const consultar = () => {
    setLoading(true);
    setProfecia("");
    setTimeout(() => {
      const random = profecias[Math.floor(Math.random() * profecias.length)];
      setProfecia(random);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0d0d0d] flex flex-col pt-[clamp(52px,8vh,80px)] pb-[clamp(44px,7vh,72px)]">
      
      {/* ─── DYNAMIC ATMOSPHERIC BACKDROP ──────────────────────── */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <motion.img 
          src={backdrop} 
          alt="" 
          className="w-full h-full object-cover hue-rotate-15 contrast-125"
          animate={{ scale: [1.05, 1, 1.05], opacity: [0.15, 0.2, 0.15] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ─── AMBIENT BACKGROUND GLOW ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 80%)`,
        }}
      />

      {/* ─── MAIN CONTENT ───────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        
        {/* LEFT SIDEBAR — decorative */}
        <aside className="hidden md:flex flex-col items-center justify-center w-16 flex-shrink-0 py-8 border-r border-white/5">
          <span
            className="text-[10px] tracking-[0.4em] text-white/20 font-light font-sans uppercase whitespace-nowrap"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Fatum et Fortuna
          </span>
        </aside>

        {/* LEFT PANEL — Visual / Watermark */}
        <div className="hidden lg:flex flex-[1] items-center justify-center relative overflow-hidden">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.03, scale: 1.1 }}
            transition={{ duration: 2 }}
            aria-hidden
            className="absolute select-none pointer-events-none text-white font-black leading-none uppercase font-sans text-[20vw]"
            style={{ letterSpacing: "-8px" }}
          >
            FATUM
          </motion.span>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="relative z-10 text-amber-500/20"
          >
            <VaseIcon size={320} />
          </motion.div>
        </div>

        {/* RIGHT PANEL — Interaction */}
        <div className="flex-[1.2] flex flex-col justify-center px-8 md:px-16 py-8 relative">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500/50 font-sans font-bold mb-3 block">
              Destino Revelado
            </span>

            <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 italic tracking-tighter font-serif">
              O Oráculo de Delfos
            </h1>
            
            <p className="text-white/40 mb-10 italic font-sans leading-relaxed max-w-sm">
              Aproxime-se, mortal, e descubra o que as Parcas teceram para o teu destino nas tapeçarias do tempo.
            </p>

            <div className="min-h-[160px] flex items-start">
              <AnimatePresence mode="wait">
                {profecia ? (
                  <motion.div
                    key="profecia"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-amber-500/5 border-l-2 border-amber-500/30 p-8 rounded-sm backdrop-blur-sm"
                  >
                    <p className="text-amber-500 text-xl md:text-2xl italic font-bold leading-tight font-serif">
                      "{profecia}"
                    </p>
                  </motion.div>
                ) : loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-4 text-amber-500/40"
                  >
                    <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] tracking-[0.3em] uppercase font-sans font-bold">Consultando as Estrelas...</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={consultar}
              disabled={loading}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 flex items-center gap-6 bg-amber-500 text-[#0d0d0d] px-10 py-4 rounded-sm font-black tracking-[0.3em] uppercase hover:bg-amber-400 transition-all disabled:opacity-30 font-sans text-xs group"
            >
              Pedir Profecia
              <span className="group-hover:translate-x-2 transition-transform duration-300">›››</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
