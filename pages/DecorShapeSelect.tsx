import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle, Square, RectangleHorizontal } from 'lucide-react';
import { Shape } from '../types';

const DecorShapeSelect: React.FC = () => {
  const navigate = useNavigate();

  const shapes = [
    {
      id: Shape.CIRCLE,
      icon: <Circle size={28} className="sm:w-8 sm:h-8" />,
      label: 'Circular',
      desc: 'SYMMETRIC FLOW',
      image: './decor-shape-circle.png'
    },
    {
      id: Shape.SQUARE,
      icon: <Square size={28} className="sm:w-8 sm:h-8" />,
      label: 'Square',
      desc: 'BALANCED HERITAGE',
      image: './decor-shape-square.png'
    },
    {
      id: Shape.RECTANGLE,
      icon: <RectangleHorizontal size={28} className="sm:w-8 sm:h-8" />,
      label: 'Rectangular',
      desc: 'MODERN PERSPECTIVE',
      image: './decor-shape-rectangle.png'
    },
  ];

  return (
    <div className="flex flex-col gap-10 sm:gap-16 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center space-y-4 sm:space-y-6 reveal">
        <span className="inline-block px-3 sm:px-4 py-1.5 bg-clay-100 text-clay-600 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.4em] rounded-full">Explore Silhouettes</span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-clay-900 reveal-heading leading-tight tracking-tight">Select your <span className="italic text-clay-500 font-normal">Shape</span></h2>
        <p className="text-clay-600/80 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg font-light reveal px-2 sm:px-0">
          Choose the geometry that best resonates with your sanctuary's walls.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 reveal">
        {shapes.map((shape, i) => (
          <button
            key={shape.id}
            onClick={() => navigate(`/decor/${shape.id.toLowerCase()}`)}
            className="group relative h-[320px] sm:h-[450px] md:h-[550px] bg-white rounded-[32px] sm:rounded-[56px] shadow-2xl transition-all duration-1000 transform hover:-translate-y-2 overflow-hidden reveal-image"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            {/* Background Image Motif */}
            <div className="absolute inset-0 z-0">
              <img
                src={shape.image}
                className="w-full h-full object-cover opacity-100 grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                alt={shape.label}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-clay-950 via-clay-950/10 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700"></div>
            </div>

            {/* Artistic Texture Overlay */}
            <div className="absolute inset-0 z-10 opacity-10 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E')]"></div>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-12 text-white z-20 space-y-3 sm:space-y-4 text-left">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full shadow-sm group-hover:bg-white group-hover:text-clay-900 transition-all duration-700 group-hover:scale-110 border border-white/20">
                {shape.icon}
              </div>
              <div className="space-y-1">
                <p className="text-white/60 text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">{shape.desc}</p>
                <h3 className="font-serif text-3xl sm:text-4xl leading-tight transition-transform duration-700 group-hover:-translate-y-1">{shape.label}</h3>
              </div>
            </div>

            <div className="absolute top-6 sm:top-12 right-6 sm:right-12 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-700 z-20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-clay-900 flex items-center justify-center shadow-premium">
                <span className="text-xl sm:text-2xl font-light">→</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 sm:mt-12 text-center reveal px-4 sm:px-0">
        <p className="text-clay-400 text-sm italic font-serif">"Shapes are the language of nature, refined by the hands of an artisan."</p>
      </div>
    </div>
  );
};

export default DecorShapeSelect;
