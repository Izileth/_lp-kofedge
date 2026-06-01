import { motion } from "framer-motion";
import { TempleIcon, FireIcon, WavesIcon } from "../components/Icons";
import backdrop from "../assets/back/backdrop.png";

const reinos = [
  {
    nome: "Monte Olimpo",
    desc: "A morada reluzente dos deuses, esculpida em mármore e nuvens.",
    icon: TempleIcon,
    color: "#eab308"
  },
  {
    nome: "Abismo de Tártaro",
    desc: "As profundezas onde titãs e almas sombrias aguardam o julgamento.",
    icon: FireIcon,
    color: "#ef4444"
  },
  {
    nome: "Oceanos de Tétis",
    desc: "Vastidão azul governada por correntes indomáveis e criaturas ancestrais.",
    icon: WavesIcon,
    color: "#0ea5e9"
  }
];

export default function Reinos() {
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
          className="w-full h-full object-cover grayscale opacity-50"
          animate={{ scale: [1, 1.05, 1] }}
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
          background: `radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 80%)`,
        }}
      />

      {/* ─── GIANT WATERMARK ────────────────────────────────────── */}
      <motion.span
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none text-white font-black leading-none uppercase font-sans text-[25vw] z-0"
        style={{ letterSpacing: "-10px" }}
      >
        MUNDI
      </motion.span>

      {/* ─── MAIN CONTENT ───────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        
        {/* LEFT SIDEBAR — decorative */}
        <aside className="hidden md:flex flex-col items-center justify-center w-16 flex-shrink-0 py-8 border-r border-white/5">
          <div className="flex flex-col items-center gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <span className="text-[10px] text-white/10 font-sans font-bold">0{i}</span>
                <div className="w-px h-8 bg-white/5" />
              </div>
            ))}
          </div>
        </aside>

        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 overflow-y-auto custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-sans font-light mb-4 block">
              Geografia Divina
            </span>
            <h1 className="text-white text-5xl md:text-7xl font-bold italic tracking-tighter font-serif">
              Os Três Reinos
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {reinos.map((reino, i) => {
              const Icon = reino.icon;
              return (
                <motion.div
                  key={reino.nome}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="relative bg-white/[0.02] border border-white/5 p-10 rounded-sm backdrop-blur-xl flex flex-col items-center text-center group cursor-pointer overflow-hidden"
                >
                  {/* Card Glow */}
                  <div 
                    className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ background: reino.color }}
                  />

                  <div className="mb-8 relative z-10">
                    <div className="p-5 rounded-full bg-white/[0.03] group-hover:scale-110 transition-transform duration-500 border border-white/5">
                      <Icon size={48} color={reino.color} />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-4 font-serif tracking-tight" style={{ color: reino.color }}>
                    {reino.nome}
                  </h2>
                  
                  <p className="text-white/40 font-light italic text-sm leading-relaxed font-sans px-2">
                    {reino.desc}
                  </p>

                  <div 
                    className="mt-8 w-8 h-px group-hover:w-16 transition-all duration-500"
                    style={{ background: reino.color }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
