export default function Company() {
    return (
        <section className="p-10 max-w-4xl">
            <h1 className="text-4xl font-black uppercase tracking-widest mb-6">Company</h1>
            <div className="border-[1.5px] border-black bg-white p-8 space-y-6">
                <p className="text-lg leading-relaxed">
                    XVS is at the forefront of tactical equipment research and development. Our mission is to provide high-performance solutions for extreme environments.
                </p>
                <div className="grid grid-cols-2 gap-8 py-6 border-y border-gray-100">
                    <div>
                        <span className="text-[10px] font-black uppercase text-red-600">Established</span>
                        <p className="text-2xl font-black">2048</p>
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase text-red-600">Location</span>
                        <p className="text-2xl font-black">Neo Tokyo</p>
                    </div>
                </div>
                <p className="text-gray-600">
                    With over 20 years of experience in the field, we continue to push the boundaries of what's possible in tactical gear.
                </p>
            </div>
        </section>
    );
}
