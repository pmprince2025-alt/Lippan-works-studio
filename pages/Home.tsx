import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Image, UserSquare } from 'lucide-react';
import Button from '../components/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-10 py-4 max-w-5xl mx-auto">
      <section className="text-center space-y-4 py-8 md:py-12 reveal">
        {/* Increased logo size to make text inside readable */}
        <div className="w-40 h-40 md:w-56 md:h-56 mx-auto mb-6 relative group">
          <div className="absolute inset-0 bg-clay-400 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <img
            src="./logo.jpg"
            alt="Lippan Works Studio Logo"
            className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl relative z-10 bg-clay-50 reveal-image"
          />
        </div>

        <h2 className="font-serif text-3xl md:text-5xl text-clay-900 reveal-heading">Welcome to Lippan Works</h2>
        <p className="text-clay-600 max-w-md mx-auto leading-relaxed text-lg reveal">
          Discover the traditional art of Mud & Mirror work from Kutch, handcrafted for your modern home.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
        <Button
          onClick={() => navigate('/decor')}
          className="h-24 md:h-40 text-lg md:text-xl justify-between md:flex-col md:justify-center px-8 bg-gradient-to-r from-clay-800 to-clay-700 hover:from-clay-900 hover:to-clay-800"
          fullWidth
        >
          <div className="flex md:flex-col items-center gap-4 md:gap-6">
            <div className="p-2 bg-white/10 rounded-full">
              <Sparkles size={24} className="md:w-8 md:h-8" />
            </div>
            <span>Basic Home Decor</span>
          </div>
          <span className="text-white/60 md:hidden">→</span>
        </Button>

        <Button
          onClick={() => navigate('/photo-frame')}
          className="h-24 md:h-40 text-lg md:text-xl justify-between md:flex-col md:justify-center px-8 bg-gradient-to-r from-clay-700 to-clay-600 hover:from-clay-800 hover:to-clay-700"
          fullWidth
        >
          <div className="flex md:flex-col items-center gap-4 md:gap-6">
            <div className="p-2 bg-white/10 rounded-full">
              <Image size={24} className="md:w-8 md:h-8" />
            </div>
            <span>Photo Frame</span>
          </div>
          <span className="text-white/60 md:hidden">→</span>
        </Button>

        <Button
          onClick={() => navigate('/name-plate')}
          className="h-24 md:h-40 text-lg md:text-xl justify-between md:flex-col md:justify-center px-8 bg-gradient-to-r from-clay-600 to-clay-500 hover:from-clay-700 hover:to-clay-600"
          fullWidth
        >
          <div className="flex md:flex-col items-center gap-4 md:gap-6">
            <div className="p-2 bg-white/10 rounded-full">
              <UserSquare size={24} className="md:w-8 md:h-8" />
            </div>
            <span>Name Plate</span>
          </div>
          <span className="text-white/60 md:hidden">→</span>
        </Button>
      </div>

      <div className="mt-8 p-8 bg-white/50 backdrop-blur rounded-2xl border border-clay-100 text-center shadow-sm max-w-2xl mx-auto reveal">
        <h3 className="font-serif text-xl text-clay-800 mb-2 reveal-heading">Custom Orders?</h3>
        <p className="text-clay-600 reveal">
          We accept custom designs and bulk orders for weddings and events. Chat with us for details.
        </p>
      </div>

      {/* About Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16 border-t border-clay-100 mt-12 reveal">
        <div className="relative group reveal-image order-last md:order-first">
          <div className="absolute inset-0 bg-clay-200 rounded-2xl rotate-3 group-hover:rotate-1 transition-transform"></div>
          <img
            src="./sakuntala.jpg"
            alt="Sandhya Meher - Founder of Lippan Works Studio"
            className="relative z-10 w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-lg border-2 border-white"
          />
        </div>
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 bg-clay-100 text-clay-700 text-xs font-bold uppercase tracking-widest rounded-full reveal">
            The Visionary
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-clay-900 reveal-heading leading-tight">Meet Sandhya Meher</h2>
          <div className="space-y-5 text-clay-700 leading-relaxed text-lg reveal">
            <p>
              Lippan Works Studio was founded by <strong className="text-clay-900 border-b-2 border-clay-200/50">Sandhya Meher</strong>, an artisan dedicated to the timeless beauty of Kutch.
            </p>
            <p>
              With every stroke of mud and every glint of mirror, she brings to life a tradition that spans generations. Her work is a bridge between the rustic mud-houses of the desert and the refined elegance of modern interiors.
            </p>
            <p>
              Handcrafted in every sense, her creations are more than decor—they are reflections of a heritage she carries with pride and shares with the world.
            </p>
            <p className="italic font-serif text-clay-500 text-xl border-l-4 border-clay-200 pl-4 mt-6">
              "Every mirror reflects a tradition, every design tells a story."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;