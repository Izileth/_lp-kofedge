import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { gsap } from "gsap";

export default function Contacts() {
    const location = useLocation();
    const isBase = location.pathname === "/contacts";
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isBase) {
            const ctx = gsap.context(() => {
                gsap.from(".contact-field", {
                    opacity: 0,
                    y: 20,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: "power2.out"
                });
                gsap.from(".contact-submit", {
                    scale: 0.95,
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.5,
                    ease: "elastic.out(1, 0.5)"
                });
            }, containerRef);
            return () => ctx.revert();
        }
    }, [isBase]);

    return (
        <section ref={containerRef} className="min-h-full">
            {isBase ? (
                <div className="p-6 md:p-10 max-w-3xl">
                    <div className="mb-10">
                        <span className="text-[10px] font-black tracking-[0.4em] text-red-600 uppercase mb-2 block">XVS_COMMS / CONNECT</span>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Contacts</h1>
                    </div>
                    
                    <div className="border-[1.5px] border-black bg-white p-8 md:p-10">
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="contact-field grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[11px] font-black uppercase mb-3 tracking-widest text-gray-400">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full border-b-[2px] border-black p-2 font-sans text-sm focus:outline-none focus:border-red-600 transition-colors bg-transparent" 
                                        placeholder="REQUIRED_FIELD"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black uppercase mb-3 tracking-widest text-gray-400">Serial Number</label>
                                    <input 
                                        type="text" 
                                        className="w-full border-b-[2px] border-black p-2 font-sans text-sm focus:outline-none focus:border-red-600 transition-colors bg-transparent" 
                                        placeholder="S/N 00-0000X" 
                                    />
                                </div>
                            </div>
                            
                            <div className="contact-field">
                                <label className="block text-[11px] font-black uppercase mb-3 tracking-widest text-gray-400">Communication Payload</label>
                                <textarea 
                                    className="w-full border-[1.5px] border-black p-4 font-sans h-40 focus:outline-none focus:border-red-600 transition-colors bg-gray-50/50 resize-none text-sm" 
                                    placeholder="ENTER_MESSAGE_HERE..."
                                />
                            </div>
                            
                            <div className="contact-field flex items-center gap-3">
                                <input type="checkbox" id="secure" className="w-4 h-4 accent-red-600" />
                                <label htmlFor="secure" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 cursor-pointer">Encrypt transmission using XVS-AES256</label>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="contact-submit w-full bg-black text-white p-5 font-black uppercase tracking-[0.3em] text-xs hover:bg-red-600 transition-colors flex items-center justify-center gap-4"
                            >
                                Dispatch Message
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <Outlet />
            )}
        </section>
    );
}
