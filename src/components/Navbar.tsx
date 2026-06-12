import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";

/* ─── types ─────────────────────────────────────────────────────── */
interface NavSubItem {
    label: string;
    path: string;
}

interface NavItem {
    label: string;
    sup: string;
    sub: NavSubItem[];
    path: string;
}

/* ─── nav data ──────────────────────────────────────────────────── */
const NAV_ITEMS: NavItem[] = [
    {
        label: "INDEX",
        sup: "01",
        sub: [
            { label: "Overview", path: "/overview" },
            { label: "Specifications", path: "/specifications" },
            { label: "Performance Data", path: "/performance" },
            { label: "Certifications", path: "/certifications" }
        ],
        path: "/",
    },
    {
        label: "CATALOG",
        sup: "02",
        sub: [
            { label: "All Models", path: "/catalog/all" },
            { label: "Tactical Series", path: "/catalog/tactical" },
            { label: "Night Series", path: "/catalog/night" },
            { label: "Accessories", path: "/catalog/accessories" }
        ],
        path: "/catalog",
    },
    {
        label: "COMPANY",
        sup: "03",
        sub: [
            { label: "About XVS", path: "/company/about" },
            { label: "Research Lab", path: "/company/lab" },
            { label: "Partners", path: "/company/partners" },
            { label: "Press", path: "/company/press" }
        ],
        path: "/company",
    },
    {
        label: "CONTACTS",
        sup: "04",
        sub: [
            { label: "Get in Touch", path: "/contacts/touch" },
            { label: "Distributors", path: "/contacts/distributors" },
            { label: "Support", path: "/contacts/support" },
            { label: "HQ Location", path: "/contacts/hq" }
        ],
        path: "/contacts",
    },
];

/* ─── icons ─────────────────────────────────────────────────────── */
export const TriIcon = ({ size = 14, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size * 0.86} viewBox="0 0 14 12" fill="none" aria-hidden="true">
        <polygon points="7,0 0,12 14,12" fill={color} />
    </svg>
);

const ChevronDown = ({ size = 10 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <polyline points="2,3 5,7 8,3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* ─── components ────────────────────────────────────────────────── */
function DesktopDropdown({ item, isOpen, onEnter, onLeave }: { item: NavItem; isOpen: boolean; onEnter: () => void; onLeave: () => void }) {
    return (
        <li className="relative list-none" onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <Link
                to={item.path}
                className={`flex items-center gap-0.5 font-sans text-[10px] font-bold tracking-[0.22em] uppercase px-2.5 py-1.5 transition-colors hover:text-red-600 ${isOpen ? 'text-red-600' : 'text-black'}`}
                aria-expanded={isOpen}
            >
                {item.label}<sup className="text-[7px] text-gray-400 ml-0.5 align-super font-normal">{item.sup}</sup>
                <span className={`ml-1 flex items-center transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown />
                </span>
            </Link>
            <div
                className={`absolute top-full left-0 min-w-[176px] bg-white border-[1.5px] border-black flex flex-col transition-all duration-200 z-[300] ${isOpen ? "opacity-100 translate-y-2 pointer-events-auto" : "opacity-0 translate-y-0 pointer-events-none"}`}
                role="menu"
            >
                {item.sub.map(s => (
                    <Link key={s.path} to={s.path} className="text-[10px] font-bold tracking-[0.18em] uppercase no-underline text-black px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-black hover:text-white transition-colors" role="menuitem">{s.label}</Link>
                ))}
            </div>
        </li>
    );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [expanded, setExpanded] = useState<number | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            gsap.to(panelRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
            document.body.style.overflow = "hidden";
        } else {
            gsap.to(panelRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
            document.body.style.overflow = "";
        }
        return () => {
            if (!open) {
                setExpanded(null);
            }
        };
    }, [open]);

    return (
        <>
            <div
                ref={overlayRef}
                className={`fixed inset-0 z-[298] bg-black/55 pointer-events-none opacity-0 ${open ? 'pointer-events-auto' : ''}`}
                onClick={onClose}
                aria-hidden="true"
            />
            <div
                ref={panelRef}
                className="fixed top-0 right-0 bottom-0 z-[299] w-[min(340px,92vw)] bg-white border-l-[1.5px] border-black flex flex-col translate-x-full overflow-y-auto"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
            >
                <div className="flex items-center justify-between px-5 h-[52px] border-b-[1.5px] border-black flex-shrink-0">
                    <div className="flex items-center gap-1.5">
                        <TriIcon size={14} color="#000" />
                        <span className="font-black text-[13px] tracking-[0.18em]">XVS</span>
                    </div>
                    <button className="w-9 h-9 border border-gray-200 flex items-center justify-center hover:bg-black group transition-colors" onClick={onClose} aria-label="Close menu">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:stroke-white stroke-black transition-colors">
                            <line x1="2" y1="2" x2="14" y2="14" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="14" y1="2" x2="2" y2="14" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <nav className="flex-1 flex flex-col" aria-label="Mobile navigation">
                    {NAV_ITEMS.map((item, idx) => (
                        <div key={item.label} className="border-b border-gray-100">
                            <button
                                className={`w-full flex items-center gap-2.5 p-4 font-sans text-[13px] font-black tracking-[0.22em] uppercase transition-colors hover:bg-gray-50 hover:text-red-600 ${expanded === idx ? "text-red-600" : "text-black"}`}
                                onClick={() => setExpanded(expanded === idx ? null : idx)}
                                aria-expanded={expanded === idx}
                            >
                                <span className="text-[8px] text-gray-400 font-bold tracking-[0.1em] w-[18px]">{item.sup}</span>
                                <span>{item.label}</span>
                                <span className={`ml-auto transition-transform duration-300 ${expanded === idx ? "rotate-180" : ""}`}>
                                    <ChevronDown size={12} />
                                </span>
                            </button>
                            <div
                                className="overflow-hidden bg-gray-50 transition-all duration-300 border-t border-gray-100"
                                style={{ maxHeight: expanded === idx ? `${item.sub.length * 52}px` : 0, opacity: expanded === idx ? 1 : 0 }}
                            >
                                {item.sub.map(s => (
                                    <Link key={s.path} to={s.path} className="block px-12 py-3 text-[10px] font-bold tracking-[0.18em] uppercase text-gray-600 border-b border-gray-100 last:border-0 hover:text-red-600 hover:bg-white transition-colors" onClick={onClose}>{s.label}</Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="flex-shrink-0 flex items-center justify-between p-5 border-t-[1.5px] border-black bg-gray-50">
                    <div className="flex items-center gap-2">
                        <div className="w-[7px] h-[7px] rounded-full bg-green-600 animate-pulse" />
                        <span className="text-[9px] font-bold tracking-[0.2em] text-gray-500 uppercase">System active</span>
                    </div>
                    <span className="text-[10px] font-black tracking-[0.18em]">X139</span>
                    <button className="text-[10px] font-bold tracking-[0.16em] px-2.5 py-1 border border-black hover:bg-black hover:text-white transition-colors">A+C ↓</button>
                </div>
            </div>
        </>
    );
}

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeNav, setActiveNav] = useState<number | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setMenuOpen(false);
        }, 0);
        return () => window.clearTimeout(timer);
    }, [location]);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-[200] border-b-[1.5px] border-black bg-white/97 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-xl" : ""}`}>
                <div className="max-w-[1440px] mx-auto flex items-center h-[52px] px-6">
                    <Link to="/" className="flex items-center gap-[7px] font-black text-[13px] tracking-[0.2em] no-underline text-black pr-6 border-r border-gray-200">
                        <TriIcon size={14} color="#000" />
                        XVS
                    </Link>

                    <ul className="hidden md:flex items-center pl-6 gap-1 flex-1 list-none m-0 p-0">
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

                    <div className="ml-auto flex items-center gap-[10px] pl-6 border-l border-gray-200">
                        <span className="hidden md:block font-black text-[12px] tracking-[0.22em]">X139</span>
                        <button className="hidden md:block text-[10px] font-bold tracking-[0.16em] px-2.5 py-1 border border-black hover:bg-black hover:text-white transition-colors">A+C ↓</button>
                        <button
                            className="flex flex-col items-center justify-center gap-[5px] w-[38px] h-[38px] border-[1.5px] border-black md:hidden group hover:bg-black transition-colors"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                        >
                            <span className={`block w-[17px] h-[1.5px] bg-black group-hover:bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
                            <span className={`block w-[17px] h-[1.5px] bg-black group-hover:bg-white transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
                            <span className={`block w-[17px] h-[1.5px] bg-black group-hover:bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
                        </button>
                    </div>
                </div>
            </nav>
            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
}
