import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Image, UserSquare } from 'lucide-react';
import Button from '../components/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-10 py-4 max-w-5xl mx-auto">
      <section className="text-center space-y-4 py-8 md:py-12">
        {/* Increased logo size to make text inside readable */}
        <div className="w-40 h-40 md:w-56 md:h-56 mx-auto mb-6 relative group">
          <div className="absolute inset-0 bg-clay-400 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <img
            src="./logo.jpg"
            alt="Lippan Works Studio Logo"
            className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl relative z-10 bg-clay-50"
          />
        </div>

        <h2 className="font-serif text-3xl md:text-5xl text-clay-900">Welcome to Lippan Works</h2>
        <p className="text-clay-600 max-w-md mx-auto leading-relaxed text-lg">
          Discover the traditional art of Mud & Mirror work from Kutch, handcrafted for your modern home.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <div className="mt-8 p-8 bg-white/50 backdrop-blur rounded-2xl border border-clay-100 text-center shadow-sm max-w-2xl mx-auto">
        <h3 className="font-serif text-xl text-clay-800 mb-2">Custom Orders?</h3>
        <p className="text-clay-600">
          We accept custom designs and bulk orders for weddings and events. Chat with us for details.
        </p>
      </div>
    </div>
  );
};

export default Home;