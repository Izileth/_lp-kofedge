import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SubPageProps {
    title: string;
    description?: string;
}

export default function SubPage({ title, description = "Tactical operational data and system specifications for the XVS ecosystem." }: SubPageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                x: -50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
            gsap.from(lineRef.current, {
                scaleX: 0,
                transformOrigin: "left",
                duration: 1,
                delay: 0.3,
                ease: "power3.inOut"
            });
            gsap.from(".data-block", {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                delay: 0.5,
                ease: "power2.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, [title]);

    return (
        <div ref={containerRef} className="p-6 md:p-10 max-w-7xl mx-auto">
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-2 h-2 bg-red-600 animate-pulse" />
                    <span className="text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase">SYSTEM / SECURE_DATA</span>
                </div>
                <h1 ref={titleRef} className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">{title}</h1>
                <div ref={lineRef} className="h-[2px] bg-black w-full mb-6" />
                <p className="text-sm md:text-base text-gray-600 max-w-2xl font-medium leading-relaxed tracking-wide">
                    {description}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                <div className="lg:col-span-2 data-block border-[1.5px] border-black bg-white p-2">
                    {/* Tactical Image Placeholder */}
                    <div className="w-full aspect-video bg-zinc-100 border border-gray-200 flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute top-4 left-4 flex gap-2">
                            <div className="w-1.5 h-1.5 bg-red-600" />
                            <div className="w-1.5 h-1.5 bg-black" />
                        </div>
                        <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center">
                            <span className="text-[120px] font-black uppercase tracking-tighter">DATA_VISUAL</span>
                        </div>
                        <p className="text-[10px] text-gray-400 tracking-[0.4em] uppercase font-black text-center relative z-10">
                            [IMAGE_REFERENCE_ID: SUB_VIS_01]<br />
                            STATUS: WAITING_FOR_PAYLOAD<br />
                            ENCRYPTION: AES-256
                        </p>
                        <div className="absolute bottom-4 right-4 text-[8px] font-mono text-gray-300">
                            COORD: 35.6895° N, 139.6917° E
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="data-block border border-black/10 bg-white/50 p-4 backdrop-blur-sm">
                            <span className="text-[8px] font-black text-red-600 block mb-1 tracking-widest uppercase">Telemetry_{i}</span>
                            <div className="h-1 bg-gray-100 w-full mb-2">
                                <div className="h-full bg-black" style={{ width: `${30 + i * 20}%` }} />
                            </div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Signal strength: stable</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="data-block border border-black/10 bg-white/50 p-6 backdrop-blur-sm hover:bg-white hover:border-black transition-all group">
                        <span className="text-[9px] font-bold text-gray-400 block mb-4 tracking-widest">UNIT_0{i}</span>
                        <h3 className="font-black text-lg mb-2 uppercase group-hover:text-red-600 transition-colors">Parameter {i}</h3>
                        <div className="h-px bg-gray-200 w-full mb-4" />
                        <p className="text-[11px] text-gray-500 uppercase tracking-wider leading-tight">
                            Operational status: Nominal<br />
                            Data sync: Complete<br />
                            Access: Restricted
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-12 data-block border-[1.5px] border-black bg-black p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-black uppercase mb-2 italic">Ready for deployment?</h2>
                    <p className="text-[11px] text-gray-400 tracking-[0.2em] uppercase">Consult the technical manual for further instructions.</p>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xs font-black tracking-[0.25em] uppercase transition-all active:scale-95 whitespace-nowrap">
                    Download Report
                </button>
            </div>
        </div>
    );
}
