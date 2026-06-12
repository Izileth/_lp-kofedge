export default function Contacts() {
    return (
        <section className="p-10 max-w-2xl">
            <h1 className="text-4xl font-black uppercase tracking-widest mb-6">Contacts</h1>
            <div className="border-[1.5px] border-black bg-white p-8">
                <form className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase mb-2">Full Name</label>
                        <input type="text" className="w-full border-[1.5px] border-black p-3 font-sans focus:outline-none focus:ring-1 focus:ring-red-600" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase mb-2">Serial Number</label>
                        <input type="text" className="w-full border-[1.5px] border-black p-3 font-sans focus:outline-none focus:ring-1 focus:ring-red-600" placeholder="S/N 00-0000X" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase mb-2">Message</label>
                        <textarea className="w-full border-[1.5px] border-black p-3 font-sans h-32 focus:outline-none focus:ring-1 focus:ring-red-600" />
                    </div>
                    <button type="submit" className="w-full bg-black text-white p-4 font-black uppercase tracking-widest hover:bg-red-600 transition-colors">Dispatch Message</button>
                </form>
            </div>
        </section>
    );
}
