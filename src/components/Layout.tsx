import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { TempleIcon, LightningIcon, VaseIcon } from "./Icons";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Close menu on route change if the menu is open
  useEffect(() => {
    if (!menuOpen) return;

    const timeoutId = window.setTimeout(() => {
      setMenuOpen(false);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [location, menuOpen]);

  const navItems = [
    { label: "Panteão", path: "/" },
    { label: "Reinos", path: "/reinos" },
    { label: "Linhagens", path: "/linhagens" },
    { label: "Mitos", path: "/mitos" },
    { label: "Oráculo", path: "/oraculo" },
  ];

  return (
    <div className="relative w-screen overflow-hidden bg-[#0d0d0d] font-serif" style={{ height: "100dvh", minHeight: 500 }}>
      {/* ─── NAVBAR ──────────────────────────────────────────── */}
      <header className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16"
        style={{ height: "clamp(52px, 8vh, 80px)" }}>

        <Link to="/" className="text-white font-black text-2xl tracking-tighter select-none font-sans no-underline">OLYMPUS.</Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}
              className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 no-underline ${location.pathname === item.path ? "text-white" : "text-gray-500 hover:text-white"}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5 text-gray-600">
          <TempleIcon size={18} />
          <LightningIcon size={18} />
          <VaseIcon size={18} />
        </div>

        <button className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 z-50"
          onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </header>

      {/* Mobile drawer */}
      <div className={`md:hidden absolute left-0 right-0 z-30 bg-[#0d0d0d]/98 backdrop-blur border-b border-white/5 transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-72 py-6" : "max-h-0"}`}
        style={{ top: "clamp(52px, 8vh, 80px)" }}>
        <nav className="flex flex-col gap-5 px-8">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}
              className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors no-underline ${location.pathname === item.path ? "text-white" : "text-gray-500 hover:text-white"}`}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div
        aria-hidden
        className="absolute left-0 right-0 z-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={{ top: "clamp(52px, 8vh, 80px)" }}
      />

      {/* Main Content Area */}
      {children}

      <footer
        className="absolute bottom-0 left-0 right-0 z-40 flex items-center justify-between"
        style={{
          height: "clamp(44px, 7vh, 72px)",
          padding: "0 clamp(20px, 4vw, 64px)",
        }}>

        <p className="text-[9px] text-gray-700 tracking-[0.4em] uppercase font-sans">
          ERA DOS MITOS &nbsp;·&nbsp; MMXXVI
        </p>

        <div className="flex gap-4 items-center">
          <span className="text-[10px] text-white/20 tracking-widest uppercase hidden sm:block">Assembleia de Deuses</span>
          <div className="h-px w-8 bg-white/10" />
          <TempleIcon size={16} color="rgba(255,255,255,0.2)" />
        </div>
      </footer>
    </div>
  );
}
