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
    <div className="relative w-full h-full">
      {/* ─── ATMOSPHERIC OVERLAY ─────────────────────────── */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <motion.img 
          src={backdrop} 
          alt="" 
          className="w-full h-full object-cover"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <main className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10" style={{ top: "clamp(52px, 8vh, 80px)", bottom: "clamp(44px, 7vh, 72px)" }}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-5xl md:text-7xl font-bold mb-12 italic tracking-tighter"
        >
          Os Três Reinos
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {reinos.map((reino, i) => {
            const Icon = reino.icon;
            return (
              <motion.div
                key={reino.nome}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-md flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="mb-6 group-hover:scale-125 transition-transform duration-500">
                  <Icon size={64} color={reino.color} />
                </div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: reino.color }}>{reino.nome}</h2>
                <p className="text-white/60 font-light italic text-sm">{reino.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
