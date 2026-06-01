import { motion } from "framer-motion";
import { ScrollIcon } from "../components/Icons";
import backdrop from "../assets/back/backdrop.png";

const mitos = [
  { titulo: "A Caixa de Pandora", resumo: "Onde toda a esperança foi guardada." },
  { titulo: "O Labirinto de Minotauro", resumo: "O fio de Ariadne e a coragem de Teseu." },
  { titulo: "O Roubo do Fogo", resumo: "Prometeu desafiando a ira do Olimpo." },
  { titulo: "Os Doze Trabalhos", resumo: "A jornada de redenção de Hércules." }
];

export default function Mitos() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0d0d0d] flex flex-col pt-[clamp(52px,8vh,80px)] pb-[clamp(44px,7vh,72px)]">
      
      {/* ─── DYNAMIC ATMOSPHERIC BACKDROP ──────────────────────── */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <motion.img 
          src={backdrop} 
          alt="" 
          className="w-full h-full object-cover sepia-[.3] brightness-75"
          animate={{ rotate: [0, 0.5, -0.5, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
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
          background: `radial-gradient(ellipse 65% 65% at 50% 50%, rgba(217, 119, 6, 0.08) 0%, transparent 80%)`,
        }}
      />

      {/* ─── GIANT WATERMARK ────────────────────────────────────── */}
      <motion.span
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.03, scale: 1.05 }}
        transition={{ duration: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none text-white font-black leading-none uppercase font-sans text-[20vw] z-0"
        style={{ letterSpacing: "-8px" }}
      >
        CHRONOS
      </motion.span>

      {/* ─── MAIN CONTENT ───────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        
        {/* LEFT SIDEBAR — decorative */}
        <aside className="hidden md:flex flex-col items-center justify-center w-16 flex-shrink-0 py-8 border-r border-white/5">
          <div className="flex flex-col items-center gap-8">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
            <span
              className="text-[9px] tracking-[0.5em] text-amber-500/30 font-bold font-sans uppercase whitespace-nowrap"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Mythos et Legenda
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
          </div>
        </aside>

        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 overflow-y-auto custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-sans font-light mb-4 block">
              Registros Ancestrais
            </span>
            <h1 className="text-white text-5xl md:text-8xl font-bold italic tracking-tighter font-serif">
              Crônicas Épicas
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
            {mitos.map((mito, i) => (
              <motion.div
                key={mito.titulo}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                className="group relative bg-white/[0.02] border border-white/5 p-10 cursor-pointer flex gap-8 items-start rounded-sm backdrop-blur-md transition-all duration-300"
              >
                {/* Accent Border */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-amber-500/0 group-hover:bg-amber-500/50 transition-all duration-300" />
                
                <div className="text-amber-500/30 group-hover:text-amber-500 transition-colors shrink-0 mt-1 group-hover:scale-110 duration-500">
                  <ScrollIcon size={36} />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 italic font-serif tracking-tight">{mito.titulo}</h3>
                  <p className="text-white/40 text-sm italic leading-relaxed font-sans group-hover:text-white/60 transition-colors">
                    {mito.resumo}
                  </p>
                  
                  <motion.div 
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    className="h-px bg-amber-500/20 mt-6"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
