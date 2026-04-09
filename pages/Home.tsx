import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PHONE_NUMBER } from '../constants';
import { supabase } from '../lib/supabase';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order');
      if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-12 sm:gap-16 md:gap-24 py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 sm:space-y-8 py-8 sm:py-12 reveal">
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 mx-auto mb-6 sm:mb-10 relative group reveal-image">
          {/* Subtle spinning glow behind logo */}
          <div className="absolute inset-0 bg-clay-400/20 rounded-full blur-3xl group-hover:bg-clay-500/30 transition-all duration-1000 animate-pulse"></div>
          <img
            src="./logo.jpg"
            alt="Lippan Works Studio Logo"
            className="w-full h-full object-cover rounded-full border-[4px] sm:border-[6px] border-white shadow-premium relative z-10 transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>

        <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto px-2">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-clay-900 reveal-heading leading-[1.1] tracking-tight">
            Artisanal Mud & <br className="hidden sm:block" />
            <span className="italic text-clay-500 font-normal">Mirror Murals</span>
          </h2>
          <p className="text-clay-600/80 max-w-xl mx-auto leading-relaxed text-base sm:text-lg md:text-xl font-light reveal px-4 sm:px-0">
            Preserving the ancient Soul of Kutch through contemporary, handcrafted masterpieces for your modern sanctuary.
          </p>
        </div>
      </section>

      {/* Categories / Portal Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 px-2 sm:px-0 reveal">
        {categories.length > 0 ? categories.map((cat, i) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/${cat.name}`)}
            className="group cursor-pointer relative h-[280px] sm:h-[380px] md:h-[480px] overflow-hidden rounded-[24px] sm:rounded-[40px] shadow-2xl transition-all duration-1000 transform hover:-translate-y-2"
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            {/* Background Image with Depth */}
            <div className="absolute inset-0 z-0">
              <img
                src={cat.hero_image}
                alt={cat.display_name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-clay-950/90 via-clay-950/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700"></div>
            </div>

            {/* Artistic Texture Overlay */}
            <div className="absolute inset-0 z-10 opacity-10 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E')]"></div>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-12 text-white z-20 space-y-2 sm:space-y-3">
              <p className="text-white/70 text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-bold mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">{cat.tagline}</p>
              <h3 className="font-serif text-3xl sm:text-5xl leading-tight transition-transform duration-700 group-hover:-translate-y-1">{cat.display_name}</h3>
            </div>

            {/* Hover Indicator */}
            <div className="absolute top-6 sm:top-12 right-6 sm:right-12 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-700 z-20">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white text-clay-900 flex items-center justify-center shadow-premium">
                <span className="text-xl sm:text-3xl font-light">→</span>
              </div>
            </div>
          </div>
        )) : (
          [...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-clay-100 rounded-[40px] h-[480px]"></div>
          ))
        )}
      </section>

      {/* Featured Custom Section */}
      <section className="relative py-16 sm:py-24 px-6 sm:px-8 bg-clay-100/40 rounded-[32px] sm:rounded-[64px] overflow-hidden reveal mx-2 sm:mx-4 md:mx-0">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-clay-200/30 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-clay-300/20 rounded-full blur-[80px] -ml-20 -mb-20"></div>

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6 sm:space-y-8">
          <h3 className="font-serif text-2xl sm:text-4xl text-clay-900 leading-snug tracking-tight">Seeking a bespoke masterpiece?</h3>
          <p className="text-clay-600/90 leading-relaxed text-base sm:text-xl font-light">
            From monumental architecture murals to personalized wedding gifts, we translate your vision into the timeless language of mud and mirrors.
          </p>
          <button
            onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}`, '_blank')}
            className="group relative inline-flex items-center gap-2 sm:gap-3 text-clay-900 font-bold py-2 transition-all text-sm sm:text-base"
          >
            <span>Inquire about custom orders</span>
            <span className="text-xl sm:text-2xl group-hover:translate-x-2 transition-transform">→</span>
            <div className="absolute bottom-0 left-0 w-full h-px bg-clay-900/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
        </div>
      </section>

      {/* Founder Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 md:gap-16 items-center py-8 sm:py-12 px-2 sm:px-4 reveal">
        <div className="md:col-span-5 relative group reveal-image">
          <div className="absolute -inset-4 sm:-inset-6 bg-clay-100/60 rounded-[32px] sm:rounded-[48px] rotate-3 -z-10 group-hover:rotate-0 transition-transform duration-1000"></div>
          <img
            src="./sakuntala.jpg"
            alt="Sandhya Meher - Founder"
            className="w-full h-[350px] sm:h-[450px] md:h-[600px] object-cover rounded-[24px] sm:rounded-[40px] shadow-premium border-[6px] sm:border-[12px] border-white"
          />
        </div>
        <div className="md:col-span-7 space-y-6 sm:space-y-10 px-2 sm:px-0">
          <div className="space-y-3 sm:space-y-4">
            <span className="inline-block px-3 sm:px-4 py-1.5 bg-clay-100 text-clay-600 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.4em] rounded-full">The Artisan</span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-clay-900 leading-[1.1] tracking-tight">Sandhya Meher</h2>
          </div>

          <div className="space-y-4 sm:space-y-8 text-clay-700/80 leading-relaxed text-base sm:text-lg font-light">
            <p>
              Founded by <strong className="text-clay-900 font-semibold border-b border-clay-200">Sandhya Meher</strong>, the studio is a living bridge between the rustic mud-houses of Kutch and the refined elegance of modern spaces.
            </p>
            <p>
              Growing up with the rhythms of pastoral life, Sandhya saw the walls of her community not just as shelter, but as stories of light. Each piece she handcrafts is a meticulous meditation, ensuring that the glint of every mirror carries the soul of her heritage.
            </p>
            <div className="pt-2 sm:pt-4">
              <p className="italic font-serif text-clay-500 text-xl sm:text-3xl leading-snug relative">
                <span className="absolute -left-4 sm:-left-8 -top-4 text-5xl sm:text-7xl text-clay-200 opacity-50 font-serif">"</span>
                My craft is a mirror to the past, reflecting a tradition that grows more vibrant with every sunset.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

