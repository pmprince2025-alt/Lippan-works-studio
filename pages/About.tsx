import React from 'react';
import { DESIGNS, PHONE_NUMBER } from '../constants';

const About: React.FC = () => {
    return (
        <div className="flex flex-col gap-12 sm:gap-24 py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Introduction */}
            <section className="text-center space-y-6 sm:space-y-8 py-8 sm:py-12 reveal">
                <span className="inline-block px-3 sm:px-4 py-1.5 bg-clay-100 text-clay-600 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.4em] rounded-full">Our Story</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-clay-900 reveal-heading leading-tight tracking-tight">The Soul of <br className="hidden sm:block" /><span className="italic text-clay-500 font-normal">Mud & Mirror</span></h2>
                <p className="text-clay-600/80 max-w-2xl mx-auto leading-relaxed text-base sm:text-xl font-light reveal px-2 sm:px-0">
                    Lippan Works Studio is dedicated to preserving the ancient Kutchi tradition of Lippan Kaam—a symphony of earthy mud and reflective light.
                </p>
            </section>

            {/* Philosophy Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-20 items-center reveal">
                <div className="space-y-6 sm:space-y-10 order-2 md:order-1 px-2 sm:px-0">
                    <div className="space-y-3 sm:space-y-4">
                        <h3 className="font-serif text-2xl sm:text-4xl text-clay-900 leading-snug">Ancient Heritage, <br />Bespoke Luxury</h3>
                        <p className="text-clay-700/80 leading-relaxed text-base sm:text-lg font-light">
                            Historically used to decorate the walls of mud-houses (Bhunga) in the Kutch desert, Lippan art is more than just decoration—it is a functional masterpiece. The mirrors reflect light, cooling the interiors during the day and illuminating them at night.
                        </p>
                    </div>
                    <div className="space-y-4 pt-4 border-l-2 border-clay-100 pl-6 sm:pl-8">
                        <h4 className="font-serif text-lg sm:text-xl text-clay-800 italic">"We bring the walls of Kutch into your modern workspace and sanctuary."</h4>
                    </div>
                </div>
                <div className="relative group reveal-image order-1 md:order-2">
                    <div className="absolute -inset-3 sm:-inset-4 bg-clay-100 rounded-[24px] sm:rounded-[40px] -rotate-2 -z-10 group-hover:rotate-0 transition-transform duration-1000"></div>
                    <img
                        src="./sakuntala.jpg"
                        alt="Handcrafting Lippan Art"
                        className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-[24px] sm:rounded-[32px] shadow-premium border-4 sm:border-8 border-white"
                    />
                </div>
            </section>

            {/* Process / Materials */}
            <section className="bg-clay-900 text-white p-6 sm:p-12 md:p-24 rounded-[32px] sm:rounded-[64px] relative overflow-hidden reveal">
                <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-[80px] sm:blur-[120px] -mr-20 sm:-mr-32 -mt-20 sm:-mt-32"></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16 relative z-10">
                    <div className="space-y-3 sm:space-y-4">
                        <span className="text-clay-400 text-3xl sm:text-4xl block font-serif">01</span>
                        <h4 className="font-serif text-xl sm:text-2xl">The Base</h4>
                        <p className="text-white/60 font-light leading-relaxed text-sm sm:text-base">We use high-grade MDF boards to ensure durability for modern interiors while maintaining a lightweight profile.</p>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                        <span className="text-clay-400 text-3xl sm:text-4xl block font-serif">02</span>
                        <h4 className="font-serif text-xl sm:text-2xl">The Clay</h4>
                        <p className="text-white/60 font-light leading-relaxed text-sm sm:text-base">Meticulously sculpted using specialized mold-it clay to mimic the traditional mud-straw texture with precision.</p>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                        <span className="text-clay-400 text-3xl sm:text-4xl block font-serif">03</span>
                        <h4 className="font-serif text-xl sm:text-2xl">The Reflection</h4>
                        <p className="text-white/60 font-light leading-relaxed text-sm sm:text-base">Geometric mirrors (Abhla) are hand-placed one by one, creating a dance of reflections unique to every piece.</p>
                    </div>
                </div>
            </section>

            {/* Catalog Preview */}
            <section className="space-y-8 sm:space-y-12 reveal">
                <div className="text-center space-y-3 sm:space-y-4">
                    <h3 className="font-serif text-3xl sm:text-4xl text-clay-900">Featured Murals</h3>
                    <p className="text-clay-500 uppercase tracking-[0.2em] text-[10px] sm:text-[11px] font-bold">Standard Offerings & Custom Pricing</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                    {DESIGNS.map((d, i) => (
                        <div key={d.code} className="group border border-clay-100 p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] hover:shadow-premium transition-all duration-500 reveal-image" style={{ transitionDelay: `${i * 0.1}s` }}>
                            <div className="flex justify-between items-start mb-4 sm:mb-6">
                                <div>
                                    <h4 className="font-serif text-lg sm:text-xl text-clay-900">{d.title}</h4>
                                    <p className="text-clay-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest mt-1">Design Code: {d.code}</p>
                                </div>
                                <span className="text-clay-600 font-serif font-bold italic">₹{d.price}</span>
                            </div>
                            <p className="text-clay-600/70 text-sm leading-relaxed mb-4 sm:mb-6 font-light">Available for custom sizing and color palettes to match your interior theme.</p>
                            <button
                                onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}`, '_blank')}
                                className="w-full py-3.5 sm:py-4 text-[10px] uppercase tracking-widest font-bold border border-clay-200 rounded-full group-hover:bg-clay-900 group-hover:text-white group-hover:border-clay-900 transition-all min-h-[44px] touch-manipulation"
                            >
                                Inquire via WhatsApp
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Founder Quote Final */}
            <section className="text-center py-12 sm:py-20 px-4 sm:px-8 border-y border-clay-100/50 reveal">
                <div className="max-w-3xl mx-auto space-y-6 sm:space-y-10">
                    <p className="font-serif text-xl sm:text-3xl md:text-5xl text-clay-800 leading-tight italic">
                        "We don't just sell art; we provide a piece of history that breathes life into spaces."
                    </p>
                    <div className="space-y-2">
                        <h5 className="font-serif text-xl sm:text-2xl text-clay-900">Sandhya Meher</h5>
                        <p className="text-clay-400 text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold">Founder & Lead Artisan</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
