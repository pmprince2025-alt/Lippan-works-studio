import React, { useState } from 'react';
import { Shape } from '../types';
import { SIZES_CIRCLE, SIZES_SQUARE, SIZES_RECTANGLE, DESIGNS, PHONE_NUMBER } from '../constants';
import Button from '../components/Button';
import { CheckCircle2, ChevronRight, Image as ImageIcon } from 'lucide-react';

const PhotoFrameFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedDesignCode, setSelectedDesignCode] = useState<string>('');

  const shapes = [Shape.CIRCLE, Shape.SQUARE, Shape.RECTANGLE];

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

I will share the photo here for the frame.`;

    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className="font-serif text-xl text-clay-900">Step 1: Choose Shape</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {shapes.map(shape => (
          <button
            key={shape}
            onClick={() => { setSelectedShape(shape); setStep(2); }}
            className="p-6 border border-clay-200 rounded-xl bg-white hover:bg-clay-50 hover:border-clay-400 hover:shadow-md transition-all flex justify-between items-center group"
          >
            <span className="text-lg font-medium text-clay-800">{shape}</span>
            <ChevronRight className="text-clay-400 group-hover:text-clay-600" />
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h3 className="font-serif text-xl text-clay-900">Step 2: Choose Size</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getSizes().map(size => (
          <button
            key={size.value}
            onClick={() => { setSelectedSize(size.value); setStep(3); }}
            className="p-6 border border-clay-200 rounded-xl bg-white hover:bg-clay-50 hover:border-clay-400 hover:shadow-md transition-all flex justify-between items-center group"
          >
            <span className="text-lg font-medium text-clay-800">{size.label}</span>
            <ChevronRight className="text-clay-400 group-hover:text-clay-600" />
          </button>
        ))}
      </div>
      <button onClick={() => setStep(1)} className="text-sm text-clay-600 hover:text-clay-900 underline mt-2">Back to Shapes</button>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-serif text-xl text-clay-900">Step 3: Pick Design Style</h3>
        <button onClick={() => setStep(2)} className="text-sm text-clay-600 hover:text-clay-900 underline">Back</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {designsForShape.map(design => (
          <div
            key={design.id}
            onClick={() => setSelectedDesignCode(design.code)}
            className={`border rounded-lg overflow-hidden cursor-pointer relative transition-all hover:shadow-lg ${selectedDesignCode === design.code ? 'ring-2 ring-clay-800 border-transparent shadow-md' : 'border-clay-200 bg-white'}`}
          >
            <div className="aspect-square bg-clay-50">
              <img src={design.image} alt={design.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-3 bg-white text-center">
              <p className="text-sm font-bold text-clay-800">{design.code}</p>
              <p className="text-xs text-clay-500 font-medium">₹{design.price}</p>
            </div>
            {selectedDesignCode === design.code && (
              <div className="absolute top-2 right-2 bg-white rounded-full text-green-600 shadow-sm">
                <CheckCircle2 size={24} />
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedDesignCode && (
        <div className="bg-clay-50 p-6 rounded-xl border border-clay-200 mt-8 max-w-xl mx-auto shadow-sm">
          <h4 className="font-bold text-lg text-clay-900 mb-2 flex items-center gap-2">
            <ImageIcon size={20} />
            Photo Upload
          </h4>
          <p className="text-base text-clay-600 mb-6">
            You can share your photo directly on WhatsApp after placing the order request.
          </p>
          <Button onClick={handleOrder} fullWidth className="md:w-auto md:min-w-[200px] mx-auto">
            Place Order on WhatsApp
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-serif text-3xl text-clay-900 mb-8 text-center md:text-left">Create Photo Frame</h2>

      {/* Progress Bar */}
      <div className="flex gap-2 mb-10 max-w-lg mx-auto md:mx-0">
        {[1, 2, 3].map(i => (
          <div key={i} className={`h-2 flex-1 rounded-full transition-colors ${i <= step ? 'bg-clay-800' : 'bg-clay-200'}`} />
        ))}
      </div>

      <div className="bg-white/50 backdrop-blur rounded-2xl md:p-8 md:border md:border-clay-100 md:shadow-sm">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default PhotoFrameFlow;