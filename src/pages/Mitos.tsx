import { motion } from "framer-motion";
import { ScrollIcon } from "../components/Icons";

const mitos = [
  { titulo: "A Caixa de Pandora", resumo: "Onde toda a esperança foi guardada." },
  { titulo: "O Labirinto de Minotauro", resumo: "O fio de Ariadne e a coragem de Teseu." },
  { titulo: "O Roubo do Fogo", resumo: "Prometeu desafiando a ira do Olimpo." },
  { titulo: "Os Doze Trabalhos", resumo: "A jornada de redenção de Hércules." }
];

export default function Mitos() {
  return (
    <main className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10" style={{ top: "clamp(52px, 8vh, 80px)", bottom: "clamp(44px, 7vh, 72px)" }}>
      <motion.h1 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-white text-5xl md:text-8xl font-bold mb-12 italic tracking-tighter"
      >
        Crônicas Épicas
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {mitos.map((mito, i) => (
          <motion.div
            key={mito.titulo}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="group relative bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all cursor-pointer flex gap-6 items-start rounded-sm"
          >
            <div className="text-amber-500/50 group-hover:text-amber-500 transition-colors shrink-0 mt-1">
              <ScrollIcon size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2 italic">{mito.titulo}</h3>
              <p className="text-white/40 text-sm italic leading-relaxed">{mito.resumo}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
