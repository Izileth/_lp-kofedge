import { useState, useEffect, useRef, useCallback } from "react";

/* ─── types ─────────────────────────────────────────────────────── */
interface NavItem {
    label: string;
    sup: string;
    sub: string[];
}

/* ─── nav data ──────────────────────────────────────────────────── */
const NAV_ITEMS: NavItem[] = [
    {
        label: "INDEX",
        sup: "01",
        sub: ["Overview", "Specifications", "Performance Data", "Certifications"],
    },
    {
        label: "CATALOG",
        sup: "02",
        sub: ["All Models", "Tactical Series", "Night Series", "Accessories"],
    },
    {
        label: "COMPANY",
        sup: "03",
        sub: ["About XVS", "Research Lab", "Partners", "Press"],
    },
    {
        label: "CONTACTS",
        sup: "04",
        sub: ["Get in Touch", "Distributors", "Support", "HQ Location"],
    },
];

/* ─── hooks ─────────────────────────────────────────────────────── */
function useTypewriter(text: string, speed: number = 55, delay: number = 1200): string {
    const [out, setOut] = useState("");
    useEffect(() => {
        let i = 0;
        const t = setTimeout(() => {
            const iv = setInterval(() => {
                i++;
                setOut(text.slice(0, i));
                if (i >= text.length) clearInterval(iv);
            }, speed);
            return () => clearInterval(iv);
        }, delay);
        return () => clearTimeout(t);
    }, [text, speed, delay]);
    return out;
}

function useScrolled(threshold: number = 10): boolean {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > threshold);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, [threshold]);
    return scrolled;
}

/* ─── tiny icons ─────────────────────────────────────────────────── */
interface IconProps {
    size?: number;
    color?: string;
}

const TriIcon = ({ size = 14, color = "#fff" }: IconProps) => (
    <svg width={size} height={size * 0.86} viewBox="0 0 14 12" fill="none" aria-hidden="true">
        <polygon points="7,0 0,12 14,12" fill={color} />
    </svg>
);

const ChevronDown = ({ size = 10 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <polyline points="2,3 5,7 8,3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const BARS = [2, 3, 5, 4, 6, 7, 9, 8, 10, 7, 11, 9, 12, 10, 14, 11, 13, 15, 12, 14, 11, 13, 10, 9, 12, 14, 15, 13, 11, 10];

function Waveform() {
    return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 1, height: 28 }} aria-hidden="true">
            {BARS.map((h, i) => (
                <div key={i} style={{ width: 3, height: `${(h / 15) * 100}%`, background: "#dc2626", opacity: i % 4 === 0 ? 1 : 0.5, flexShrink: 0 }} />
            ))}
        </div>
    );
}

function Barcode() {
    const s = Array.from({ length: 52 }, (_, i) => ({ w: i % 7 === 0 ? 5 : i % 3 === 0 ? 3 : 2, op: i % 5 === 0 ? 0.3 : 1 }));
    return (
        <div style={{ display: "flex", alignItems: "stretch", height: 36, overflow: "hidden" }} aria-hidden="true">
            {s.map((b, i) => <div key={i} style={{ width: b.w, background: "#000", opacity: b.op, flexShrink: 0 }} />)}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   DESKTOP DROPDOWN
═══════════════════════════════════════════════════════════════════ */
interface DesktopDropdownProps {
    item: NavItem;
    isOpen: boolean;
    onEnter: () => void;
    onLeave: () => void;
}

function DesktopDropdown({ item, isOpen, onEnter, onLeave }: DesktopDropdownProps) {
    return (
        <li
            style={{ position: "relative", listStyle: "none" }}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            <button
                className="hz-nav-link"
                aria-expanded={isOpen}
                aria-haspopup="true"
                type="button"
            >
                {item.label}<sup>{item.sup}</sup>
                <span style={{ marginLeft: 3, display: "inline-flex", alignItems: "center", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "none" }}>
                    <ChevronDown />
                </span>
            </button>
            <div
                className="hz-dropdown"
                style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                    pointerEvents: isOpen ? "all" : "none",
                }}
                role="menu"
            >
                {item.sub.map(s => (
                    <a key={s} href="#" className="hz-dropdown-item" role="menuitem">{s}</a>
                ))}
            </div>
        </li>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════════════════════════════════ */
interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
}

function MobileMenu({ open, onClose }: MobileMenuProps) {
    const [expanded, setExpanded] = useState<number | null>(null);
    const firstLinkRef = useRef<HTMLButtonElement>(null);

    // Focus first item when menu opens
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => firstLinkRef.current?.focus(), 100);
            return () => clearTimeout(timer);
        } else {
        // Avoid synchronous setState inside effect to prevent cascading renders
        const t = setTimeout(() => setExpanded(null), 0);
        return () => clearTimeout(t);
        }
    }, [open]);

    // Close on Escape
    useEffect(() => {
        if (!open) return;
        const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", fn);
        return () => document.removeEventListener("keydown", fn);
    }, [open, onClose]);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`hz-overlay${open ? " hz-overlay--open" : ""}`}
                onClick={onClose}
                aria-hidden="true"
            />
            {/* Panel */}
            <div
                className={`hz-mobile-panel${open ? " hz-mobile-panel--open" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
            >
                {/* Panel header */}
                <div className="hz-mobile-header">
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <TriIcon size={14} color="#000" />
                        <span style={{ fontWeight: 900, fontSize: 13, letterSpacing: "0.18em" }}>XVS</span>
                    </div>
                    <button className="hz-close-btn" onClick={onClose} aria-label="Close menu" type="button">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <line x1="2" y1="2" x2="14" y2="14" stroke="#000" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="14" y1="2" x2="2" y2="14" stroke="#000" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Nav items */}
                <nav className="hz-mobile-nav" aria-label="Mobile navigation">
                    {NAV_ITEMS.map((item, idx) => (
                        <div key={item.label} className="hz-mobile-item">
                            <button
                                ref={idx === 0 ? firstLinkRef : null}
                                className={`hz-mobile-link${expanded === idx ? " hz-mobile-link--active" : ""}`}
                                onClick={() => setExpanded(expanded === idx ? null : idx)}
                                aria-expanded={expanded === idx}
                                type="button"
                            >
                                <span className="hz-mobile-link-sup">{item.sup}</span>
                                <span>{item.label}</span>
                                <span style={{ marginLeft: "auto", transition: "transform 0.25s", transform: expanded === idx ? "rotate(180deg)" : "none" }}>
                                    <ChevronDown size={12} />
                                </span>
                            </button>

                            {/* Submenu */}
                            <div
                                className="hz-mobile-sub"
                                style={{
                                    maxHeight: expanded === idx ? `${item.sub.length * 52}px` : 0,
                                    opacity: expanded === idx ? 1 : 0,
                                }}
                            >
                                {item.sub.map(s => (
                                    <a key={s} href="#" className="hz-mobile-sub-link" onClick={onClose}>{s}</a>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Panel footer */}
                <div className="hz-mobile-footer">
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="hz-status-dot" />
                        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", color: "#666", textTransform: "uppercase" }}>System active</span>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.18em", color: "#000" }}>X139</span>
                    <button className="hz-badge-sm" type="button">A+C ↓</button>
                </div>
            </div>
        </>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════════════ */
export default function HorizonS() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeNav, setActiveNav] = useState<number | null>(null);
    const scrolled = useScrolled(12);
    const serial = useTypewriter("S/N 48-1508F");
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,700;0,900;1,900&family=Noto+Serif+SC:wght@900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #d6d3cc; font-family: 'Barlow Condensed', ui-monospace, monospace; }

        /* ══ NAV ══════════════════════════════════════════════ */
        .hz-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          border-bottom: 1.5px solid #000;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(8px);
          transition: box-shadow 0.25s;
        }
        .hz-nav.scrolled {
          box-shadow: 0 2px 24px rgba(0,0,0,0.12);
        }
        .hz-nav-inner {
          max-width: 1440px; margin: 0 auto;
          display: flex; align-items: center;
          padding: 0 24px; height: 52px; gap: 0;
        }
        .hz-logo {
          display: flex; align-items: center; gap: 7px;
          font-weight: 900; font-size: 13px; letter-spacing: 0.2em;
          text-decoration: none; color: #000; flex-shrink: 0;
          padding-right: 24px; border-right: 1px solid #e0e0e0;
        }
        .hz-nav-links-wrap {
          display: flex; align-items: center;
          padding-left: 24px; gap: 4px; flex: 1;
        }
        .hz-nav-link {
          display: flex; align-items: center; gap: 2px;
          font-family: 'Barlow Condensed', monospace;
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: #000;
          background: none; border: none; cursor: pointer;
          padding: 6px 10px;
          transition: color 0.15s, background 0.15s;
          white-space: nowrap;
        }
        .hz-nav-link sup { font-size: 7px; color: #aaa; margin-left: 1px; vertical-align: super; }
        .hz-nav-link:hover, .hz-nav-link[aria-expanded="true"] { color: #dc2626; }
        .hz-nav-right {
          margin-left: auto; display: flex; align-items: center; gap: 10px;
          padding-left: 24px; border-left: 1px solid #e0e0e0;
        }
        .hz-x139 { font-size: 12px; font-weight: 900; letter-spacing: 0.22em; }
        .hz-badge {
          font-family: 'Barlow Condensed', monospace;
          font-size: 10px; font-weight: 700; letter-spacing: 0.16em;
          padding: 4px 10px; border: 1px solid #000; background: transparent;
          color: #000; cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .hz-badge:hover { background: #000; color: #fff; }
        .hz-badge-sm {
          font-family: 'Barlow Condensed', monospace;
          font-size: 10px; font-weight: 700; letter-spacing: 0.16em;
          padding: 4px 10px; border: 1px solid #000; background: transparent;
          color: #000; cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .hz-badge-sm:hover { background: #000; color: #fff; }
        .hz-hamburger {
          display: none; flex-direction: column; align-items: center;
          justify-content: center; gap: 5px;
          width: 38px; height: 38px; border: 1.5px solid #000;
          background: none; cursor: pointer;
          transition: background 0.15s;
        }
        .hz-hamburger:hover { background: #000; }
        .hz-hamburger:hover .hz-bar { background: #fff; }
        .hz-bar { display: block; width: 17px; height: 1.5px; background: #000; transition: background 0.15s, transform 0.22s, opacity 0.22s; transform-origin: center; }

        /* desktop dropdown */
        .hz-dropdown {
          position: absolute; top: calc(100% + 10px); left: 0;
          min-width: 176px;
          background: #fff; border: 1.5px solid #000;
          display: flex; flex-direction: column;
          transition: opacity 0.18s, transform 0.18s;
          z-index: 300;
        }
        .hz-dropdown-item {
          font-size: 10px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; text-decoration: none; color: #000;
          padding: 11px 16px; border-bottom: 1px solid #f0f0f0;
          transition: background 0.12s, color 0.12s;
        }
        .hz-dropdown-item:last-child { border-bottom: none; }
        .hz-dropdown-item:hover { background: #000; color: #fff; }

        /* ══ MOBILE OVERLAY ═══════════════════════════════════ */
        .hz-overlay {
          position: fixed; inset: 0; z-index: 298;
          background: rgba(0,0,0,0.55);
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s;
        }
        .hz-overlay--open { opacity: 1; pointer-events: all; }

        /* ══ MOBILE PANEL ════════════════════════════════════ */
        .hz-mobile-panel {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 299;
          width: min(340px, 92vw);
          background: #fff; border-left: 1.5px solid #000;
          display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
          overflow-y: auto;
        }
        .hz-mobile-panel--open { transform: translateX(0); }

        .hz-mobile-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 20px; height: 52px;
          border-bottom: 1.5px solid #000; flex-shrink: 0;
        }
        .hz-close-btn {
          width: 36px; height: 36px; border: 1px solid #ddd;
          background: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, border-color 0.15s;
        }
        .hz-close-btn:hover { background: #000; border-color: #000; }
        .hz-close-btn:hover svg line { stroke: #fff; }

        .hz-mobile-nav { flex: 1; display: flex; flex-direction: column; }

        .hz-mobile-item { border-bottom: 1px solid #f0f0f0; }

        .hz-mobile-link {
          width: 100%; display: flex; align-items: center; gap: 10px;
          padding: 16px 20px;
          font-family: 'Barlow Condensed', monospace;
          font-size: 13px; font-weight: 900; letter-spacing: 0.22em;
          text-transform: uppercase; color: #000;
          background: none; border: none; cursor: pointer; text-align: left;
          transition: color 0.15s, background 0.15s;
        }
        .hz-mobile-link:hover { background: #f8f8f8; color: #dc2626; }
        .hz-mobile-link--active { color: #dc2626; }
        .hz-mobile-link-sup {
          font-size: 8px; color: #aaa; font-weight: 700;
          letter-spacing: 0.1em; flex-shrink: 0; width: 18px;
        }

        .hz-mobile-sub {
          overflow: hidden; transition: max-height 0.28s ease, opacity 0.2s;
          background: #fafafa; border-top: 1px solid #f0f0f0;
        }
        .hz-mobile-sub-link {
          display: block; padding: 13px 20px 13px 48px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; text-decoration: none; color: #555;
          border-bottom: 1px solid #f0f0f0;
          transition: color 0.12s, background 0.12s;
        }
        .hz-mobile-sub-link:last-child { border-bottom: none; }
        .hz-mobile-sub-link:hover { color: #dc2626; background: #fff; }

        .hz-mobile-footer {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; border-top: 1.5px solid #000;
          background: #fafafa;
        }

        /* ══ HERO ════════════════════════════════════════════ */
        .hz-root { min-height: 100svh; display: flex; flex-direction: column; background: #d6d3cc; }

        .hz-hero {
          flex: 1; padding-top: 52px;
          display: flex; flex-direction: column;
          min-height: 100svh;
        }
        .hz-hero-frame {
          flex: 1; margin: 10px; border: 1.5px solid #000;
          background: #fff; display: flex; flex-direction: column;
          overflow: hidden;
        }

        /* title strip */
        .hz-title-strip {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 22px 12px; border-bottom: 1.5px solid #000;
          flex-shrink: 0;
        }
        .hz-title-icon {
          width: 32px; height: 32px; background: #dc2626;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .hz-h1 {
          font-size: clamp(22px, 3.5vw, 38px);
          font-weight: 900; letter-spacing: 0.04em; text-transform: uppercase; line-height: 1;
        }
        .hz-h1 em { font-style: italic; }
        .hz-night-label {
          margin-left: auto; font-size: 8px; font-weight: 700;
          letter-spacing: 0.28em; color: #aaa; text-transform: uppercase;
          writing-mode: vertical-rl;
        }

        /* band */
        .hz-band {
          position: relative; flex: 1; background: #000; overflow: hidden;
          min-height: clamp(160px, 32vw, 380px);
        }
        .hz-band-text {
          position: absolute; inset: 0; display: flex; align-items: center;
          padding-left: 4px;
          font-size: clamp(100px, 24vw, 280px);
          font-weight: 900; letter-spacing: -0.04em; line-height: 1;
          color: #fff; white-space: nowrap; user-select: none; pointer-events: none;
        }
        .hz-kanji-wrap {
          position: absolute; inset: 0; display: flex; align-items: center;
          justify-content: center; pointer-events: none; z-index: 10;
        }
        .hz-kanji {
          font-family: 'Noto Serif SC', serif; font-weight: 900;
          font-size: clamp(56px, 13vw, 130px);
          color: #dc2626; letter-spacing: 0.1em; line-height: 1;
          opacity: 0.93;
        }
        .hz-img-slot {
          position: absolute; right: 0; top: -12%; bottom: -12%;
          width: clamp(200px, 44%, 480px); z-index: 20;
          display: flex; align-items: center; justify-content: flex-end;
          pointer-events: none;
        }
        .hz-img-slot img { height: 124%; width: auto; object-fit: contain; }
        .hz-placeholder {
          width: 100%; height: 100%; border: 1px dashed rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
        }
        .hz-placeholder p {
          font-size: 9px; color: rgba(255,255,255,0.18);
          letter-spacing: 0.18em; text-transform: uppercase; text-align: center; line-height: 2;
        }

        /* info row */
        .hz-info-row {
          display: flex; align-items: flex-start; gap: 24px;
          padding: 18px 22px; border-top: 1.5px solid #000;
          flex-wrap: wrap; flex-shrink: 0;
        }
        .hz-mod { flex: 1; min-width: 180px; }
        .hz-mod-title {
          font-size: clamp(14px, 2.2vw, 22px); font-weight: 900;
          letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 6px;
        }
        .hz-mod-body {
          font-size: 10px; color: #666; letter-spacing: 0.12em;
          text-transform: uppercase; line-height: 1.75;
        }
        .hz-warn-row {
          display: flex; align-items: center; gap: 5px; margin-top: 8px;
        }
        .hz-warn-row span { font-size: 9px; color: #dc2626; letter-spacing: 0.1em; text-transform: uppercase; }
        .hz-cta-row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 18px; }
        .hz-btn-primary {
          background: #dc2626; color: #fff; border: none;
          padding: 12px 30px; cursor: pointer;
          font-family: 'Barlow Condensed', monospace;
          font-size: 11px; font-weight: 900; letter-spacing: 0.22em; text-transform: uppercase;
          transition: background 0.15s, transform 0.1s;
        }
        .hz-btn-primary:hover { background: #b91c1c; }
        .hz-btn-primary:active { transform: scale(0.97); }
        .hz-btn-secondary {
          background: transparent; color: #000; border: 1.5px solid #000;
          padding: 12px 30px; cursor: pointer;
          font-family: 'Barlow Condensed', monospace;
          font-size: 11px; font-weight: 900; letter-spacing: 0.22em; text-transform: uppercase;
          transition: background 0.15s, color 0.15s, transform 0.1s;
        }
        .hz-btn-secondary:hover { background: #000; color: #fff; }
        .hz-btn-secondary:active { transform: scale(0.97); }

        .hz-serial-block {
          display: flex; align-items: center; gap: 10px;
          margin-left: auto; flex-shrink: 0; align-self: center;
        }
        .hz-serial {
          font-size: clamp(13px, 2vw, 19px); font-weight: 900;
          letter-spacing: 0.18em; font-family: ui-monospace, monospace;
          min-width: 148px; color: #000;
        }
        .hz-serial-btn {
          width: 30px; height: 30px; border: 1.5px solid #000;
          background: none; display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 10px; font-weight: 900;
          transition: background 0.15s, color 0.15s;
        }
        .hz-serial-btn:hover { background: #000; color: #fff; }

        /* status bar */
        .hz-status-bar {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 22px; border-top: 1.5px solid #000;
          background: #fafafa; flex-wrap: wrap; flex-shrink: 0;
        }
        .hz-status-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #16a34a; flex-shrink: 0;
          animation: pulse 2.2s ease-in-out infinite;
        }
        .hz-status-label { font-size: 9px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #777; }
        .hz-vdiv { width: 1px; height: 22px; background: #ddd; flex-shrink: 0; }
        .hz-barcode-wrap { flex: 1; overflow: hidden; min-width: 100px; }

        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes blink  { 0%,100%{opacity:1} 49%{opacity:1} 50%{opacity:0} 99%{opacity:0} }
        .hz-cursor { animation: blink 1s step-end infinite; }

        /* ══ RESPONSIVE ══════════════════════════════════════ */
        @media (max-width: 700px) {
          .hz-nav-links-wrap, .hz-x139, .hz-badge { display: none; }
          .hz-hamburger { display: flex; }
          .hz-night-label, .hz-vdiv { display: none; }
          .hz-info-row { flex-direction: column; gap: 16px; }
          .hz-serial-block { margin-left: 0; }
          .hz-hero-frame { margin: 6px; }
          .hz-title-strip { padding: 12px 14px 10px; }
          .hz-info-row { padding: 14px; }
          .hz-status-bar { padding: 10px 14px; }
          .hz-band-text { font-size: clamp(72px, 28vw, 140px); }
        }
        @media (min-width: 701px) { .hz-hamburger { display: none !important; } }
        @media (max-width: 1000px) { .hz-night-label { display: none; } }

        button:focus-visible, a:focus-visible { outline: 2px solid #dc2626; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .hz-status-dot { animation: none; }
          .hz-cursor { animation: none; opacity: 1; }
          .hz-mobile-panel { transition: none; }
          .hz-overlay { transition: none; }
        }
      `}</style>

            <div className="hz-root">

                {/* ══════════════════ NAVBAR ══════════════════ */}
                <nav className={`hz-nav${scrolled ? " scrolled" : ""}`} role="navigation" aria-label="Main navigation">
                    <div className="hz-nav-inner">

                        {/* Logo */}
                        <a href="#" className="hz-logo" aria-label="XVS — home">
                            <TriIcon size={14} color="#000" />
                            XVS
                        </a>

                        {/* Desktop nav links */}
                        <ul className="hz-nav-links-wrap" role="list" style={{ padding: 0, margin: 0 }}>
                            {NAV_ITEMS.map((item, idx) => (
                                <DesktopDropdown
                                    key={item.label}
                                    item={item}
                                    isOpen={activeNav === idx}
                                    onEnter={() => setActiveNav(idx)}
                                    onLeave={() => setActiveNav(null)}
                                />
                            ))}
                        </ul>

                        {/* Right cluster */}
                        <div className="hz-nav-right">
                            <span className="hz-x139">X139</span>
                            <button className="hz-badge" type="button" aria-label="Language / display settings">A+C ↓</button>
                            <button
                                className="hz-hamburger"
                                type="button"
                                onClick={() => setMenuOpen(o => !o)}
                                aria-label={menuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={menuOpen}
                                aria-controls="mobile-menu"
                            >
                                <span className="hz-bar" style={{ transform: menuOpen ? "rotate(45deg) translate(0,6.5px)" : "none" }} />
                                <span className="hz-bar" style={{ opacity: menuOpen ? 0 : 1 }} />
                                <span className="hz-bar" style={{ transform: menuOpen ? "rotate(-45deg) translate(0,-6.5px)" : "none" }} />
                            </button>
                        </div>
                    </div>
                </nav>

                {/* ══════════════════ MOBILE MENU ══════════════════ */}
                <MobileMenu open={menuOpen} onClose={closeMenu} />

                {/* ══════════════════ HERO ══════════════════════ */}
                <section className="hz-hero" aria-label="Horizon-S product hero" id="hero">
                    <div className="hz-hero-frame">

                        {/* Title strip */}
                        <div className="hz-title-strip">
                            <div className="hz-title-icon" aria-hidden="true">
                                <TriIcon size={14} color="#fff" />
                            </div>
                            <h1 className="hz-h1">HORIZON-<em>s</em></h1>
                            <span className="hz-night-label" aria-label="Night Performance series">NIGHT PERFORMANCE</span>
                        </div>

                        {/* Big band */}
                        <div className="hz-band" role="img" aria-label="Horizon-S tactical product">
                            <div className="hz-band-text" aria-hidden="true">NEUTRAL</div>
                            <div className="hz-kanji-wrap">
                                <span className="hz-kanji" aria-label="Kanji: unrivaled">天&nbsp;&nbsp;双</span>
                            </div>
                            {/* ── ADD YOUR IMAGE: replace <div className="hz-placeholder"> with <img src="mask.png" alt="Horizon-S mask" /> ── */}
                            <div className="hz-img-slot">
                                <div className="hz-placeholder">
                                    <p>ADD<br />PRODUCT<br />IMAGE<br />HERE</p>
                                </div>
                            </div>
                        </div>

                        {/* Info row */}
                        <div className="hz-info-row">
                            <div className="hz-mod">
                                <p className="hz-mod-title">MODIFICATION</p>
                                <p className="hz-mod-body">
                                    YOU CAN GET A SKIN BURN WHEN HANDLING<br />LEAD-ACID BATTERIES.
                                </p>
                                <div className="hz-warn-row">
                                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                        <polygon points="8,1 15,14 1,14" stroke="#dc2626" strokeWidth="1.5" fill="none" />
                                        <line x1="8" y1="6" x2="8" y2="10" stroke="#dc2626" strokeWidth="1.5" />
                                        <circle cx="8" cy="12" r="0.8" fill="#dc2626" />
                                    </svg>
                                    <span>Handle with protective gear at all times</span>
                                </div>
                                <div className="hz-cta-row">
                                    <button className="hz-btn-primary" type="button">EXPLORE MODEL</button>
                                    <button className="hz-btn-secondary" type="button">VIEW CATALOG</button>
                                </div>
                            </div>

                            <div className="hz-serial-block">
                                <span className="hz-serial" aria-live="polite" aria-label="Serial number">
                                    {serial}
                                    {serial.length < 12 && <span className="hz-cursor" aria-hidden="true">_</span>}
                                </span>
                                <button className="hz-serial-btn" type="button" aria-label="Open serial detail">▶</button>
                            </div>
                        </div>

                        {/* Status bar */}
                        <div className="hz-status-bar">
                            <div className="hz-status-dot" aria-hidden="true" />
                            <span className="hz-status-label">SYSTEM ACTIVE</span>
                            <div className="hz-vdiv" aria-hidden="true" />
                            <Waveform />
                            <div className="hz-vdiv" aria-hidden="true" />
                            <div className="hz-barcode-wrap"><Barcode /></div>
                        </div>

                    </div>
                </section>
            </div>
        </>
    );
}
