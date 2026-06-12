export default function Catalog() {
    return (
        <section className="p-10">
            <h1 className="text-4xl font-black uppercase tracking-widest mb-6">Catalog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="border-[1.5px] border-black bg-white p-6 aspect-video flex flex-col justify-between">
                        <span className="text-[10px] font-bold text-gray-400">MODEL X-{i}00</span>
                        <h2 className="text-xl font-black uppercase">Tactical Series {i}</h2>
                        <button className="self-start mt-4 text-[10px] font-black border-b-[1.5px] border-black hover:text-red-600 hover:border-red-600 transition-colors">VIEW SPECS</button>
                    </div>
                ))}
            </div>
        </section>
    );
}
