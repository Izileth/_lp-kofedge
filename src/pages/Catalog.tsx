import { useEffect, useRef } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { gsap } from "gsap";
import img1 from "@src/assets/drops/background.png";
import img2 from "@src/assets/drops/background2.png";
import img3 from "@src/assets/drops/background3.png";
import img4 from "@src/assets/drops/background4.png";

const IMGS = [img1, img2, img3, img4, img1, img2];

export default function Catalog() {
    const location = useLocation();
    const isBase = location.pathname === "/catalog";
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isBase) {
            const ctx = gsap.context(() => {
                gsap.from(".catalog-item", {
                    y: 30,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power3.out"
                });
            }, containerRef);
            return () => ctx.revert();
        }
    }, [isBase]);

    return (
        <section ref={containerRef} className="min-h-full">
            {isBase ? (
                <div className="p-6 md:p-10">
                    <div className="mb-10">
                        <span className="text-[10px] font-black tracking-[0.4em] text-red-600 uppercase mb-2 block">XVS_CORE / ASSETS</span>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Catalog</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="catalog-item border-[1.5px] border-black bg-white p-6 aspect-video flex flex-col justify-between hover:shadow-2xl transition-shadow cursor-pointer group relative overflow-hidden">
                                {/* Image Placeholder Background */}
                                <div className="absolute inset-0 z-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
                                    <span className="text-[40px] font-black uppercase -rotate-12 whitespace-nowrap">PREVIEW_NOT_FOUND</span>
                                </div>
                                
                                <div className="relative z-10 flex justify-between items-start">
                                    <span className="text-[10px] font-bold text-gray-400">MODEL X-{i}00</span>
                                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                                </div>

                                <div className="relative z-10 my-4 flex-1 flex items-center justify-center border border-dashed border-gray-200 bg-gray-50/50 overflow-hidden">
                                     <img src={IMGS[i-1]} alt={`Tactical Series ${i}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="relative z-10">
                                    <h2 className="text-2xl font-black uppercase leading-tight group-hover:text-red-600 transition-colors">Tactical Series {i}</h2>
                                    <p className="text-[9px] text-gray-400 mt-2 tracking-widest uppercase italic">Optimized for rapid response</p>
                                </div>
                                <Link to="/specifications" className="relative z-10 self-start mt-4 text-[11px] font-black border-b-[2px] border-black hover:text-red-600 hover:border-red-600 transition-all uppercase tracking-widest no-underline">
                                    VIEW SPECS
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <Outlet />
            )}
        </section>
    );
}
