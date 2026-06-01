import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import Panteao from "./pages/Panteao";
import Reinos from "./pages/Reinos";
import Linhagens from "./pages/Linhagens";
import Mitos from "./pages/Mitos";
import Oraculo from "./pages/Oraculo";
import SplashScreen from "./components/SplashScreen";
import './index.css';


export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <SplashScreen key="splash" />}
      </AnimatePresence>

      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Panteao />} />
            <Route path="/reinos" element={<Reinos />} />
            <Route path="/linhagens" element={<Linhagens />} />
            <Route path="/mitos" element={<Mitos />} />
            <Route path="/oraculo" element={<Oraculo />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}
