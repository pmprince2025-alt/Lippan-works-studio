import React from 'react';
import { Design } from '../types';
import Button from './Button';
import { PHONE_NUMBER } from '../constants';

interface DesignCardProps {
  design: Design;
  selectedSize: string;
}

const DesignCard: React.FC<DesignCardProps> = ({ design, selectedSize }) => {
  // Get the price for the selected size, or fall back to the default price
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
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-clay-100 hover:shadow-md transition-shadow">
      <div className="aspect-square w-full overflow-hidden bg-clay-50 relative group">
        <img
          src={design.image}
          alt={design.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-clay-800">
          {design.code}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg text-clay-900 mb-1">{design.title}</h3>
        <p className="text-clay-600 text-sm mb-4">Size: {selectedSize}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-clay-800">₹{displayPrice}</span>
          <Button onClick={handleOrder} size="sm" className="px-4 py-2 text-sm">
            Select & Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignCard;