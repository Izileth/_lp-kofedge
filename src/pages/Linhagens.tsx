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
    <div className="relative w-full h-full overflow-hidden bg-[#0d0d0d] flex flex-col pt-[clamp(52px,8vh,80px)] pb-[clamp(44px,7vh,72px)]">
      
      {/* ─── DYNAMIC ATMOSPHERIC BACKDROP ──────────────────────── */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <motion.img 
          src={backdrop} 
          alt="" 
          className="w-full h-full object-cover grayscale brightness-50"
          animate={{ x: [-10, 10, -10], scale: [1.1, 1.05, 1.1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
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
          background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(239, 68, 68, 0.08) 0%, transparent 80%)`,
        }}
      />

      {/* ─── GIANT WATERMARK ────────────────────────────────────── */}
      <motion.span
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.025, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none text-white font-black leading-none uppercase font-sans text-[22vw] z-0"
        style={{ letterSpacing: "-10px" }}
      >
        SANGUIS
      </motion.span>

      {/* ─── MAIN CONTENT ───────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        
        {/* LEFT SIDEBAR — decorative */}
        <aside className="hidden md:flex flex-col items-center justify-center w-16 flex-shrink-0 py-8 border-r border-white/5">
          <span
            className="text-[10px] tracking-[0.4em] text-white/20 font-light font-sans uppercase whitespace-nowrap"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Lineae Sanguinis
          </span>
        </aside>

        <div className="flex-1 flex flex-col items-center py-16 px-8 overflow-y-auto custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-red-500/50 font-sans font-bold mb-4 block">
              Herança Imortal
            </span>
            <h1 className="text-white text-5xl md:text-7xl font-bold italic tracking-tighter font-serif">
              Árvore do Sangue
            </h1>
          </motion.div>

          <div className="relative flex flex-col items-center gap-16 w-full max-w-4xl pb-20">
            {/* Timeline Line */}
            <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-white/5 via-white/10 to-white/5 left-1/2 -translate-x-1/2 hidden md:block" />
            
            {linhagens.map((lin, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex items-center gap-12 w-full ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-col text-center md:text-left`}
              >
                <div className={`flex-1 flex flex-col ${i % 2 === 0 ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
                  <span className="text-white/20 text-[9px] font-sans uppercase tracking-[0.4em] mb-2">{lin.pai}</span>
                  <h3 className="text-white text-2xl md:text-4xl font-bold italic font-serif leading-none mb-3 group-hover:text-red-500 transition-colors">
                    {lin.filho}
                  </h3>
                  <p className="text-amber-500/60 text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
                    {lin.titulo}
                  </p>
                </div>

                <div className="relative z-10 shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#0d0d0d] border border-white/10 flex items-center justify-center text-white/30 hover:text-red-500/70 transition-colors duration-500 hover:border-red-500/30 hover:scale-110">
                    <SkullIcon size={18} />
                  </div>
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
