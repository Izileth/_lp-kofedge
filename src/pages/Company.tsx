import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { gsap } from "gsap";

export default function Company() {
    const location = useLocation();
    const isBase = location.pathname === "/company";
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isBase) {
            const ctx = gsap.context(() => {
                gsap.from(".company-card", {
                    x: -30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                });
                gsap.from(".stat-item", {
                    scale: 0.8,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 0.6,
                    delay: 0.4,
                    ease: "back.out(1.7)"
                });
            }, containerRef);
            return () => ctx.revert();
        }
    }, [isBase]);

    return (
        <section ref={containerRef} className="min-h-full">
            {isBase ? (
                <div className="p-6 md:p-10 max-w-5xl">
                    <div className="mb-10">
                        <span className="text-[10px] font-black tracking-[0.4em] text-red-600 uppercase mb-2 block">XVS_CORP / IDENTITY</span>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Company</h1>
                    </div>
                    
                    <div className="company-card border-[1.5px] border-black bg-white p-8 md:p-12 space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 -mr-16 -mt-16 rotate-45 border-b border-black" />
                        
                        <p className="text-xl md:text-2xl leading-relaxed font-medium italic">
                            "XVS is at the forefront of tactical equipment research and development. Our mission is to provide high-performance solutions for extreme environments."
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 border-y-[1.5px] border-black">
                            <div className="stat-item">
                                <span className="text-[11px] font-black uppercase text-red-600 tracking-widest block mb-2">Established</span>
                                <p className="text-4xl font-black tracking-tighter">2048.09.12</p>
                                <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest italic">Industrial Era 4.0</p>
                            </div>
                            <div className="stat-item">
                                <span className="text-[11px] font-black uppercase text-red-600 tracking-widest block mb-2">HQ_Location</span>
                                <p className="text-4xl font-black tracking-tighter">NEO_TOKYO</p>
                                <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest italic">Sector 7-G / Distributed</p>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            {/* Image Placeholder */}
                            <div className="w-full h-48 md:h-64 border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center mb-6 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center -rotate-6">
                                    <span className="text-8xl font-black">XVS_ARCHIVE</span>
                                </div>
                                <p className="text-[10px] text-gray-400 tracking-[0.3em] uppercase font-bold relative z-10">
                                    [IMG_REF: HQ_ESTABLISHMENT_01]<br />ARCHIVAL_PHOTOGRAPHY_PENDING
                                </p>
                            </div>

                            <p className="text-gray-600 leading-loose uppercase text-[12px] font-bold tracking-wider">
                                With over 20 years of experience in the field, we continue to push the boundaries of what's possible in tactical gear. Our engineering team specializes in neural-linked hardware and adaptive camouflage systems.
                            </p>
                            <div className="flex gap-4">
                                <div className="h-2 w-12 bg-black" />
                                <div className="h-2 w-6 bg-red-600" />
                                <div className="h-2 w-2 bg-gray-200" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Outlet />
            )}
        </section>
    );
}
