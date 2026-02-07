import React from 'react';
import { DESIGNS, PHONE_NUMBER } from '../constants';

const About: React.FC = () => {
    return (
        <div className="flex flex-col gap-24 py-12 max-w-6xl mx-auto px-4 md:px-0">
            {/* Introduction */}
            <section className="text-center space-y-8 py-12 reveal">
                <span className="inline-block px-4 py-1.5 bg-clay-100 text-clay-600 text-[10px] font-bold uppercase tracking-[0.4em] rounded-full">Our Story</span>
                <h2 className="font-serif text-4xl md:text-7xl text-clay-900 reveal-heading leading-tight tracking-tight">The Soul of <br /><span className="italic text-clay-500 font-normal">Mud & Mirror</span></h2>
                <p className="text-clay-600/80 max-w-2xl mx-auto leading-relaxed text-xl font-light reveal">
                    Lippan Works Studio is dedicated to preserving the ancient Kutchi tradition of Lippan Kaam—a symphony of earthy mud and reflective light.
                </p>
            </section>

            {/* Philosophy Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center reveal">
                <div className="space-y-10 order-2 md:order-1">
                    <div className="space-y-4">
                        <h3 className="font-serif text-4xl text-clay-900 leading-snug">Ancient Heritage, <br />Bespoke Luxury</h3>
                        <p className="text-clay-700/80 leading-relaxed text-lg font-light">
                            Historically used to decorate the walls of mud-houses (Bhunga) in the Kutch desert, Lippan art is more than just decoration—it is a functional masterpiece. The mirrors reflect light, cooling the interiors during the day and illuminating them at night.
                        </p>
                    </div>
                    <div className="space-y-4 pt-4 border-l-2 border-clay-100 pl-8">
                        <h4 className="font-serif text-xl text-clay-800 italic">"We bring the walls of Kutch into your modern workspace and sanctuary."</h4>
                    </div>
                </div>
                <div className="relative group reveal-image order-1 md:order-2">
                    <div className="absolute -inset-4 bg-clay-100 rounded-[40px] -rotate-2 -z-10 group-hover:rotate-0 transition-transform duration-1000"></div>
                    <img
                        src="./sakuntala.jpg"
                        alt="Handcrafting Lippan Art"
                        className="w-full h-[500px] object-cover rounded-[32px] shadow-premium border-8 border-white"
                    />
                </div>
            </section>

            {/* Process / Materials */}
            <section className="bg-clay-900 text-white p-12 md:p-24 rounded-[64px] relative overflow-hidden reveal">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] -mr-32 -mt-32"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
                    <div className="space-y-4">
                        <span className="text-clay-400 text-4xl block font-serif">01</span>
                        <h4 className="font-serif text-2xl">The Base</h4>
                        <p className="text-white/60 font-light leading-relaxed">We use high-grade MDF boards to ensure durability for modern interiors while maintaining a lightweight profile.</p>
                    </div>
                    <div className="space-y-4">
                        <span className="text-clay-400 text-4xl block font-serif">02</span>
                        <h4 className="font-serif text-2xl">The Clay</h4>
                        <p className="text-white/60 font-light leading-relaxed">Meticulously sculpted using specialized mold-it clay to mimic the traditional mud-straw texture with precision.</p>
                    </div>
                    <div className="space-y-4">
                        <span className="text-clay-400 text-4xl block font-serif">03</span>
                        <h4 className="font-serif text-2xl">The Reflection</h4>
                        <p className="text-white/60 font-light leading-relaxed">Geometric mirrors (Abhla) are hand-placed one by one, creating a dance of reflections unique to every piece.</p>
                    </div>
                </div>
            </section>

            {/* Catalog Preview */}
            <section className="space-y-12 reveal">
                <div className="text-center space-y-4">
                    <h3 className="font-serif text-4xl text-clay-900">Featured Murals</h3>
                    <p className="text-clay-500 uppercase tracking-[0.2em] text-[11px] font-bold">Standard Offerings & Custom Pricing</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {DESIGNS.map((d, i) => (
                        <div key={d.code} className="group border border-clay-100 p-8 rounded-[32px] hover:shadow-premium transition-all duration-500 reveal-image" style={{ transitionDelay: `${i * 0.1}s` }}>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h4 className="font-serif text-xl text-clay-900">{d.title}</h4>
                                    <p className="text-clay-400 text-[10px] uppercase font-bold tracking-widest mt-1">Design Code: {d.code}</p>
                                </div>
                                <span className="text-clay-600 font-serif font-bold italic">₹{d.price}</span>
                            </div>
                            <p className="text-clay-600/70 text-sm leading-relaxed mb-6 font-light">Available for custom sizing and color palettes to match your interior theme.</p>
                            <button
                                onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}`, '_blank')}
                                className="w-full py-4 text-[10px] uppercase tracking-widest font-bold border border-clay-200 rounded-full group-hover:bg-clay-900 group-hover:text-white group-hover:border-clay-900 transition-all"
                            >
                                Inquire via WhatsApp
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Founder Quote Final */}
            <section className="text-center py-20 px-8 border-y border-clay-100/50 reveal">
                <div className="max-w-3xl mx-auto space-y-10">
                    <p className="font-serif text-3xl md:text-5xl text-clay-800 leading-tight italic">
                        "We don't just sell art; we provide a piece of history that breathes life into spaces."
                    </p>
                    <div className="space-y-2">
                        <h5 className="font-serif text-2xl text-clay-900">Sandhya Meher</h5>
                        <p className="text-clay-400 text-xs uppercase tracking-[0.4em] font-bold">Founder & Lead Artisan</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
