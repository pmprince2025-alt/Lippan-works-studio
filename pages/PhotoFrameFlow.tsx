import React, { useState } from 'react';
import { Shape } from '../types';
import { SIZES_CIRCLE, SIZES_SQUARE, SIZES_RECTANGLE, DESIGNS, PHONE_NUMBER } from '../constants';
import { CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

const PhotoFrameFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedDesignCode, setSelectedDesignCode] = useState<string>('');

  const shapes = [
    { id: Shape.CIRCLE, image: './photo-shape-circle.png' },
    { id: Shape.SQUARE, image: './photo-shape-square.png' },
    { id: Shape.RECTANGLE, image: './photo-shape-rectangle.png' },
  ];

  const getSizes = () => {
    switch (selectedShape) {
      case Shape.CIRCLE: return SIZES_CIRCLE;
      case Shape.SQUARE: return SIZES_SQUARE;
      case Shape.RECTANGLE: return SIZES_RECTANGLE;
      default: return [];
    }
  };

  const designsForShape = selectedShape
    ? DESIGNS.filter(d => d.shape === selectedShape && d.category === 'photo-frame')
    : [];

  const handleOrder = () => {
    const design = designsForShape.find(d => d.code === selectedDesignCode);
    const designTitle = design ? design.title : 'Custom/Not Selected';

    const message = `Hi, I would like to order a *Photo Frame*:

Shape: ${selectedShape}
Size: ${selectedSize}
Design Ref: ${selectedDesignCode} (${designTitle})
Price: ₹${design?.pricing?.[selectedSize] ?? design?.price ?? 'N/A'}

I will share the photo here for the frame.`;

    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const renderStep1 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h3 className="font-serif text-3xl text-clay-900">Choose Shape</h3>
        <p className="text-clay-500 text-sm font-light">The foundational silhouette of your memory.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {shapes.map(item => (
          <button
            key={item.id}
            onClick={() => { setSelectedShape(item.id); setStep(2); }}
            className={`relative h-64 rounded-[40px] overflow-hidden border-2 transition-all group shadow-sm hover:shadow-premium
              ${selectedShape === item.id ? 'border-clay-900' : 'border-clay-100'}`}
          >
            <img src={item.image} alt={item.id} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-clay-900/60 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
              <span className="font-serif text-3xl uppercase tracking-widest">{item.id}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h3 className="font-serif text-3xl text-clay-900">Select Size</h3>
        <p className="text-clay-500 text-sm font-light">Available dimensions for {selectedShape}.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {getSizes().map(size => (
          <button
            key={size.value}
            onClick={() => { setSelectedSize(size.value); setStep(3); }}
            className={`p-8 rounded-2xl border transition-all text-center font-bold tracking-[0.2em] uppercase text-[11px]
              ${selectedSize === size.value ? 'bg-clay-900 text-white border-clay-900' : 'bg-white text-clay-600 border-clay-100 hover:border-clay-300'}`}
          >
            {size.label}
          </button>
        ))}
      </div>
      <button onClick={() => setStep(1)} className="text-clay-400 text-[10px] font-bold uppercase tracking-widest hover:text-clay-900 transition-colors">← Back to shapes</button>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h3 className="font-serif text-3xl text-clay-900">Choose Design</h3>
        <p className="text-clay-500 text-sm font-light">Fine artisanal patterns for your frame.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {designsForShape.length > 0 ? (
          designsForShape.map(design => (
            <button
              key={design.code}
              onClick={() => setSelectedDesignCode(design.code)}
              className={`p-10 rounded-[48px] border-2 text-left transition-all hover:shadow-premium flex flex-col gap-6
                ${selectedDesignCode === design.code ? 'border-clay-900 bg-clay-900 text-white ring-4 ring-clay-100 shadow-2xl' : 'border-clay-100 bg-white hover:border-clay-200'}`}
            >
              <div className="aspect-square w-full rounded-[32px] overflow-hidden">
                <img src={design.image} alt={design.title} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" />
              </div>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl leading-none">{design.title}</h4>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${selectedDesignCode === design.code ? 'text-white/50' : 'text-clay-400'}`}>Code: {design.code}</p>
                </div>
                <span className={`font-serif text-xl font-bold italic ${selectedDesignCode === design.code ? 'text-white' : 'text-clay-700'}`}>₹{design.pricing?.[selectedSize] ?? design.price}</span>
              </div>
            </button>
          ))
        ) : (
          <div className="col-span-full py-24 text-center space-y-4">
            <div className="w-16 h-16 bg-clay-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl italic font-serif text-clay-400">?</span>
            </div>
            <p className="text-clay-500 text-xl font-light italic font-serif">
              Temporarily out of stock for this shape. New designs arriving soon.
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center pt-12 border-t border-clay-100">
        <button onClick={() => setStep(2)} className="text-clay-400 text-[10px] font-bold uppercase tracking-widest hover:text-clay-900 transition-colors">← Back to sizes</button>

        {selectedDesignCode && (
          <button
            onClick={handleOrder}
            className="bg-clay-900 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] flex items-center gap-4 hover:shadow-premium transition-all hover:-translate-y-1 shadow-2xl"
          >
            Confirm Order on WhatsApp
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-24 relative max-w-lg mx-auto md:mx-0">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-clay-50 -z-10 rounded-full"></div>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-700 z-10
              ${step >= s ? 'bg-clay-900 border-clay-900 text-white shadow-xl scale-110' : 'bg-white border-clay-100 text-clay-300'}`}
          >
            {step > s ? <CheckCircle2 size={24} /> : <span className="font-serif text-xl font-bold">{s}</span>}
          </div>
        ))}
      </div>

      <div className="reveal">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>

      {step === 1 && (
        <div className="mt-24 py-20 border-t border-clay-100/50 flex flex-col items-center text-center space-y-8">
          <div className="w-16 h-16 bg-clay-50 rounded-full flex items-center justify-center text-clay-400">
            <Sparkles size={24} />
          </div>
          <h4 className="font-serif text-3xl text-clay-900 italic">Looking for a custom silhouette?</h4>
          <p className="text-clay-600 font-light max-w-md mx-auto leading-relaxed text-lg">We create specialized shapes—from hexagonal to organic free-form—to frame your memories perfectly.</p>
          <button
            onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}`, '_blank')}
            className="group flex items-center gap-3 text-clay-900 font-bold uppercase text-[11px] tracking-[0.3em] pb-1 border-b-2 border-clay-200 hover:border-clay-900 transition-all"
          >
            Inquire about custom orders
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoFrameFlow;