import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VaseIcon } from "../components/Icons";

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
    <main className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10" style={{ top: "clamp(52px, 8vh, 80px)", bottom: "clamp(44px, 7vh, 72px)" }}>
      <div className="relative flex flex-col items-center max-w-2xl text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -z-10 opacity-[0.05] text-amber-500"
        >
          <VaseIcon size={400} />
        </motion.div>

        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 italic tracking-tighter">O Oráculo de Delfos</h1>
        <p className="text-white/40 mb-12 italic">Aproxime-se, mortal, e descubra o que as Parcas teceram para o teu destino.</p>

        <AnimatePresence mode="wait">
          {profecia ? (
            <motion.div
              key="profecia"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-amber-500/10 border border-amber-500/20 p-8 mb-12 rounded-sm backdrop-blur-md"
            >
              <p className="text-amber-500 text-2xl italic font-bold">"{profecia}"</p>
            </motion.div>
          ) : loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-12"
            >
              <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            </motion.div>
          ) : (
            <div className="h-24 mb-12" />
          )}
        </AnimatePresence>

        <motion.button
          onClick={consultar}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-amber-600 text-black px-12 py-4 rounded-sm font-bold tracking-[0.3em] uppercase hover:bg-amber-500 transition-colors disabled:opacity-50 font-sans"
        >
          Pedir Profecia
        </motion.button>
      </div>
    </main>
  );
}
