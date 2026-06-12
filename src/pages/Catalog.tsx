import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { gsap } from "gsap";

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
                            <div key={i} className="catalog-item border-[1.5px] border-black bg-white p-6 aspect-video flex flex-col justify-between hover:shadow-2xl transition-shadow cursor-pointer group">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-bold text-gray-400">MODEL X-{i}00</span>
                                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black uppercase leading-tight group-hover:text-red-600 transition-colors">Tactical Series {i}</h2>
                                    <p className="text-[9px] text-gray-400 mt-2 tracking-widest uppercase italic">Optimized for rapid response</p>
                                </div>
                                <button className="self-start mt-4 text-[11px] font-black border-b-[2px] border-black hover:text-red-600 hover:border-red-600 transition-all uppercase tracking-widest">
                                    VIEW SPECS
                                </button>
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
