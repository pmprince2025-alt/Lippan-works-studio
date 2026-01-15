import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Shape, Design } from '../types';
import { DESIGNS, SIZES_CIRCLE, SIZES_SQUARE, SIZES_RECTANGLE } from '../constants';
import DesignCard from '../components/DesignCard';

const DecorGallery: React.FC = () => {
  const { shape } = useParams<{ shape: string }>();

  // Normalize shape string to Enum
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-clay-100">
        <h2 className="font-serif text-2xl text-clay-900 capitalize">{shape} Collection</h2>

        {/* Size Filter */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-clay-600 mr-2">Size:</span>
          {sizes.map((size) => (
            <button
              key={size.value}
              onClick={() => setSelectedSize(size.value)}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${selectedSize === size.value
                ? 'bg-clay-800 text-white border-clay-800 shadow-md'
                : 'bg-white text-clay-600 border-clay-200 hover:border-clay-400 hover:bg-clay-50'
                }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDesigns.length > 0 ? (
          filteredDesigns.map((design) => (
            <DesignCard
              key={design.id}
              design={design}
              selectedSize={selectedSize}
            />
          ))
        ) : (
          <div className="col-span-full py-16 text-center">
            <p className="text-clay-500 text-lg">
              {shape === 'rectangle'
                ? "sorry we dont have rectangle collection right soon   new stock comming soon"
                : "No designs found for this category."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecorGallery;