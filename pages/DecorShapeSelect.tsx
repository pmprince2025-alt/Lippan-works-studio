import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle, Square, RectangleHorizontal } from 'lucide-react';
import { Shape } from '../types';

const DecorShapeSelect: React.FC = () => {
  const navigate = useNavigate();

  const shapes = [
    { id: Shape.CIRCLE, icon: <Circle size={40} className="md:w-16 md:h-16" />, label: 'Circle' },
    { id: Shape.SQUARE, icon: <Square size={40} className="md:w-16 md:h-16" />, label: 'Square' },
    { id: Shape.RECTANGLE, icon: <RectangleHorizontal size={40} className="md:w-16 md:h-16" />, label: 'Rectangle' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-3 mb-8">
        <h2 className="font-serif text-3xl md:text-4xl text-clay-900">Select Shape</h2>
        <p className="text-clay-600 text-base md:text-lg">Choose a shape to view available designs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {shapes.map((shape) => (
          <button
            key={shape.id}
            onClick={() => navigate(`/decor/${shape.id.toLowerCase()}`)}
            className="flex md:flex-col items-center gap-6 p-6 md:p-10 bg-white border border-clay-200 rounded-xl shadow-sm hover:shadow-xl hover:border-clay-400 hover:-translate-y-1 transition-all duration-300 group text-left md:text-center"
          >
            <div className="text-clay-400 group-hover:text-clay-600 transition-colors bg-clay-50 p-4 md:p-6 rounded-full group-hover:bg-clay-100">
              {shape.icon}
            </div>
            <div className="flex-grow">
              <h3 className="font-serif text-xl md:text-2xl text-clay-800 mb-1">{shape.label}</h3>
              <p className="text-xs text-clay-500 uppercase tracking-wide md:mt-2 opacity-60 group-hover:opacity-100 transition-opacity">View Collection →</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DecorShapeSelect;