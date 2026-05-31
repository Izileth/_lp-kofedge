import { motion } from "framer-motion";
import { SkullIcon } from "../components/Icons";
import backdrop from "../assets/back/backdrop.png";

const linhagens = [
  { pai: "Cronos", filho: "Zeus", titulo: "O Senhor do Destino" },
  { pai: "Cronos", filho: "Poseidon", titulo: "O Abastado" },
  { pai: "Cronos", filho: "Hades", titulo: "O Invisível" },
  { pai: "Zeus", filho: "Ares", titulo: "O Sanguinário" },
  { pai: "Zeus", filho: "Atena", titulo: "A Sábia" }
];

export default function Linhagens() {
  return (
    <div className="relative w-full h-full">
      {/* ─── ATMOSPHERIC OVERLAY ─────────────────────────── */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <motion.img 
          src={backdrop} 
          alt="" 
          className="w-full h-full object-cover grayscale brightness-50"
          animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <main className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10 overflow-y-auto" style={{ top: "clamp(52px, 8vh, 80px)", bottom: "clamp(44px, 7vh, 72px)" }}>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-4xl md:text-6xl font-bold mb-16 italic tracking-tighter"
        >
          Árvore do Sangue Real
        </motion.h1>

        <div className="relative flex flex-col items-center gap-12 w-full max-w-4xl">
          <div className="absolute top-0 bottom-0 w-px bg-white/10 left-1/2 -translate-x-1/2 hidden md:block" />
          
          {linhagens.map((lin, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex items-center gap-8 w-full ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                <span className="text-white/30 text-xs font-sans uppercase tracking-[0.3em]">{lin.pai}</span>
                <h3 className="text-white text-xl md:text-2xl font-bold italic">{lin.filho}</h3>
                <p className="text-amber-500/80 text-sm font-light uppercase tracking-widest">{lin.titulo}</p>
              </div>
              <div className="z-10 text-white/40 bg-[#0d0d0d] p-2">
                <SkullIcon size={20} />
              </div>
              <div className="flex-1" />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
