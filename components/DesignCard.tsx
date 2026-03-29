import React from 'react';
import { Design } from '../types';
import { PHONE_NUMBER } from '../constants';

interface DesignCardProps {
  design: Design;
  selectedSize: string;
}

const DesignCard: React.FC<DesignCardProps> = ({ design, selectedSize }) => {
  const displayPrice = design.pricing?.[selectedSize] ?? design.price;

  const handleOrder = () => {
    const message = `Hi, I would like to order:
    
Type: Basic Decor
Code: *${design.code}*
Design: ${design.title}
Shape: ${design.shape}
Size: ${selectedSize}
Price: ₹${displayPrice}

Please confirm availability.`;

    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="group bg-white rounded-[16px] sm:rounded-[24px] overflow-hidden shadow-sm hover:shadow-premium border border-clay-100 transition-all duration-500 flex flex-col h-full">
      <div className="aspect-[4/3] w-full overflow-hidden bg-clay-50 relative">
        <img
          src={design.image}
          alt={design.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold text-clay-900 border border-clay-100 tracking-widest uppercase">
          {design.code}
        </div>
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-lg sm:text-xl text-clay-900 leading-tight">{design.title}</h3>
          <span className="font-serif text-base sm:text-lg font-bold text-clay-800 italic">₹{displayPrice}</span>
        </div>
        <p className="text-clay-500 text-[10px] sm:text-[10px] uppercase tracking-[0.2em] font-bold mb-3 sm:mb-4">Format: {selectedSize}</p>

        <button
          onClick={handleOrder}
          className="mt-auto w-full py-3 sm:py-3.5 bg-clay-50 group-hover:bg-clay-900 group-hover:text-white text-clay-900 font-bold text-[10px] sm:text-[10px] uppercase tracking-widest rounded-xl sm:rounded-2xl transition-all border border-clay-100 group-hover:border-clay-900 min-h-[44px] touch-manipulation"
        >
          Enquire & Order
        </button>
      </div>
    </div>
  );
};

export default DesignCard;
