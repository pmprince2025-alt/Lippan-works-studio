import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Shape, Design } from '../types';
import { DESIGNS, SIZES_CIRCLE, SIZES_SQUARE, SIZES_RECTANGLE } from '../constants';
import DesignCard from '../components/DesignCard';

const DecorGallery: React.FC = () => {
  const { shape } = useParams<{ shape: string }>();

  let currentShape: Shape;
  let sizes;

  if (shape === 'circle') {
    currentShape = Shape.CIRCLE;
    sizes = SIZES_CIRCLE;
  } else if (shape === 'square') {
    currentShape = Shape.SQUARE;
    sizes = SIZES_SQUARE;
  } else if (shape === 'rectangle') {
    currentShape = Shape.RECTANGLE;
    sizes = SIZES_RECTANGLE;
  } else {
    return <Navigate to="/decor" />;
  }

  const [selectedSize, setSelectedSize] = useState<string>(sizes[0].value);

  const filteredDesigns: Design[] = DESIGNS.filter(d => d.shape === currentShape && (!d.category || d.category === 'decor'));

  return (
    <div className="flex flex-col gap-12 py-12 max-w-7xl mx-auto px-4">
      {/* Gallery Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-clay-100 pb-12 reveal">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 bg-clay-100 text-clay-600 text-[10px] font-bold uppercase tracking-[0.4em] rounded-full">Gallery</span>
          <h2 className="font-serif text-4xl md:text-6xl text-clay-900 reveal-heading leading-tight tracking-tight capitalize">{shape}'s <span className="italic text-clay-500 font-normal">Legacy</span></h2>
        </div>

        {/* Size Filter Pills */}
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-[10px] font-bold text-clay-400 uppercase tracking-widest mr-2">Dimensions:</span>
          {sizes.map((size) => (
            <button
              key={size.value}
              onClick={() => setSelectedSize(size.value)}
              className={`px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all ${selectedSize === size.value
                ? 'bg-clay-900 text-white border-clay-900 shadow-premium'
                : 'bg-white text-clay-600 border-clay-100 hover:border-clay-300'
                }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 reveal">
        {filteredDesigns.length > 0 ? (
          filteredDesigns.map((design, i) => (
            <div key={design.id} className="reveal-image" style={{ transitionDelay: `${i * 0.1}s` }}>
              <DesignCard
                design={design}
                selectedSize={selectedSize}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 text-center space-y-4">
            <div className="w-16 h-16 bg-clay-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl italic font-serif text-clay-400">?</span>
            </div>
            <p className="text-clay-500 text-xl font-light italic font-serif">
              {shape === 'rectangle'
                ? "Bespoke rectangular murals are currently in creation. New stock arriving soon."
                : "No designs found for this category."}
            </p>
            <button
              onClick={() => window.location.href = '/decor'}
              className="text-clay-900 font-bold border-b border-clay-200 hover:border-clay-900 transition-all text-xs uppercase tracking-widest"
            >
              ← Return to Collections
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecorGallery;