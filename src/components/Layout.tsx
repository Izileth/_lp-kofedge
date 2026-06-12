import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import Navbar from "./Navbar";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Page transition animation
        const ctx = gsap.context(() => {
            gsap.fromTo(mainRef.current, 
                { opacity: 0, y: 10 }, 
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );
        }, mainRef);

        return () => ctx.revert();
    }, [location.pathname]);

    return (
        <div className="min-h-svh flex flex-col bg-[#d6d3cc] font-sans">
            <Navbar />
            <main ref={mainRef} className="flex-1 pt-[52px]">
                {children}
            </main>
        </div>
    );
}
