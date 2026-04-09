import React, { useState, useEffect } from 'react';
import { Shape, Design, SizeOption } from '../types';
import { PHONE_NUMBER } from '../constants';
import { CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

const PhotoFrameFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedDesignCode, setSelectedDesignCode] = useState<string>('');
  const [designs, setDesigns] = useState<Design[]>([]);
  const [sizes, setSizes] = useState<SizeOption[]>([]);
  const [loading, setLoading] = useState(false);

  const shapes = [
    { id: Shape.CIRCLE, image: './photo-shape-circle.png' },
    { id: Shape.SQUARE, image: './photo-shape-square.png' },
    { id: Shape.RECTANGLE, image: './photo-shape-rectangle.png' },
  ];

  // Fetch sizes when shape is selected
  useEffect(() => {
    if (selectedShape) {
      const fetchSizes = async () => {
        const { data, error } = await supabase
          .from('shape_sizes')
          .select('size_label, size_value')
          .eq('shape', selectedShape)
          .eq('category', 'photo-frame');
        
        if (!error && data) {
          setSizes(data.map(d => ({ label: d.size_label, value: d.size_value })));
        }
      };
      fetchSizes();
    }
  }, [selectedShape]);

  // Fetch designs when shape and size are selected (or just shape)
  useEffect(() => {
    if (selectedShape) {
      const fetchDesigns = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select(`
            id, code, title, shape, base_price, image_url,
            product_pricing (size_value, price),
            categories!inner(name)
          `)
          .eq('is_active', true)
          .eq('shape', selectedShape)
          .eq('categories.name', 'photo-frame');

        if (!error && data) {
          const formatted = data.map((d: any) => ({
            id: d.id,
            code: d.code,
            title: d.title,
            price: d.base_price,
            image: d.image_url,
            shape: d.shape as Shape,
            category: 'photo-frame',
            pricing: d.product_pricing.reduce((acc: any, p: any) => {
              acc[p.size_value] = p.price;
              return acc;
            }, {})
          }));
          setDesigns(formatted);
        }
        setLoading(false);
      };
      fetchDesigns();
    }
  }, [selectedShape]);

  const handleOrder = () => {
    const design = designs.find(d => d.code === selectedDesignCode);
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
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h3 className="font-serif text-2xl sm:text-3xl text-clay-900">Choose Shape</h3>
        <p className="text-clay-500 text-sm font-light">The foundational silhouette of your memory.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
        {shapes.map(item => (
          <button
            key={item.id}
            onClick={() => { setSelectedShape(item.id); setStep(2); }}
            className={`relative h-48 sm:h-64 rounded-[24px] sm:rounded-[40px] overflow-hidden border-2 transition-all group shadow-sm hover:shadow-premium min-h-[180px] touch-manipulation
              ${selectedShape === item.id ? 'border-clay-900' : 'border-clay-100'}`}
          >
            <img src={item.image} alt={item.id} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-clay-900/60 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-white text-center">
              <span className="font-serif text-2xl sm:text-3xl uppercase tracking-widest">{item.id}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h3 className="font-serif text-2xl sm:text-3xl text-clay-900">Select Size</h3>
        <p className="text-clay-500 text-sm font-light">Available dimensions for {selectedShape}.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {sizes.map(size => (
          <button
            key={size.value}
            onClick={() => { setSelectedSize(size.value); setStep(3); }}
            className={`p-4 sm:p-8 rounded-xl sm:rounded-2xl border transition-all text-center font-bold tracking-[0.2em] uppercase text-[10px] sm:text-[11px] min-h-[60px] sm:min-h-[80px] touch-manipulation
              ${selectedSize === size.value ? 'bg-clay-900 text-white border-clay-900' : 'bg-white text-clay-600 border-clay-100 hover:border-clay-300'}`}
          >
            {size.label}
          </button>
        ))}
      </div>
      <button onClick={() => setStep(1)} className="text-clay-400 text-[10px] font-bold uppercase tracking-widest hover:text-clay-900 transition-colors py-2">← Back to shapes</button>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h3 className="font-serif text-2xl sm:text-3xl text-clay-900">Choose Design</h3>
        <p className="text-clay-500 text-sm font-light">Fine artisanal patterns for your frame.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-clay-100 rounded-[32px] h-[300px]"></div>
          ))
        ) : designs.length > 0 ? (
          designs.map(design => (
            <button
              key={design.code}
              onClick={() => setSelectedDesignCode(design.code)}
              className={`p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] border-2 text-left transition-all hover:shadow-premium flex flex-col gap-4 sm:gap-6 min-h-[280px] sm:min-h-[380px] touch-manipulation
                ${selectedDesignCode === design.code ? 'border-clay-900 bg-clay-900 text-white ring-4 ring-clay-100 shadow-2xl' : 'border-clay-100 bg-white hover:border-clay-200'}`}
            >
              <div className="aspect-square w-full rounded-[24px] sm:rounded-[32px] overflow-hidden">
                <img src={design.image} alt={design.title} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" loading="lazy" />
              </div>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="font-serif text-xl sm:text-2xl leading-none">{design.title}</h4>
                  <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest ${selectedDesignCode === design.code ? 'text-white/50' : 'text-clay-400'}`}>Code: {design.code}</p>
                </div>
                <span className={`font-serif text-lg sm:text-xl font-bold italic ${selectedDesignCode === design.code ? 'text-white' : 'text-clay-700'}`}>₹{design.pricing?.[selectedSize] ?? design.price}</span>
              </div>
            </button>
          ))
        ) : (
          <div className="col-span-full py-16 sm:py-24 text-center space-y-4 px-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-clay-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl sm:text-2xl italic font-serif text-clay-400">?</span>
            </div>
            <p className="text-clay-500 text-lg sm:text-xl font-light italic font-serif">
              Temporarily out of stock for this shape. New designs arriving soon.
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8 sm:pt-12 border-t border-clay-100">
        <button onClick={() => setStep(2)} className="text-clay-400 text-[10px] font-bold uppercase tracking-widest hover:text-clay-900 transition-colors py-2">← Back to sizes</button>

        {selectedDesignCode && (
          <button
            onClick={handleOrder}
            className="w-full sm:w-auto bg-clay-900 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-[11px] flex items-center justify-center gap-3 hover:shadow-premium transition-all hover:-translate-y-1 shadow-2xl min-h-[48px] touch-manipulation"
          >
            Confirm Order on WhatsApp
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-12 sm:mb-24 relative max-w-md sm:max-w-lg mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-clay-50 -z-10 rounded-full"></div>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 transition-all duration-700 z-10
              ${step >= s ? 'bg-clay-900 border-clay-900 text-white shadow-xl scale-110' : 'bg-white border-clay-100 text-clay-300'}`}
          >
            {step > s ? <CheckCircle2 size={20} className="sm:w-6 sm:h-6" /> : <span className="font-serif text-lg sm:text-xl font-bold">{s}</span>}
          </div>
        ))}
      </div>

      <div className="reveal">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>

      {step === 1 && (
        <div className="mt-16 sm:mt-24 py-12 sm:py-20 border-t border-clay-100/50 flex flex-col items-center text-center space-y-6 sm:space-y-8 px-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-clay-50 rounded-full flex items-center justify-center text-clay-400">
            <Sparkles size={20} className="sm:w-6 sm:h-6" />
          </div>
          <h4 className="font-serif text-2xl sm:text-3xl text-clay-900 italic">Looking for a custom silhouette?</h4>
          <p className="text-clay-600 font-light max-w-md mx-auto leading-relaxed text-base sm:text-lg">We create specialized shapes—from hexagonal to organic free-form—to frame your memories perfectly.</p>
          <button
            onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}`, '_blank')}
            className="group flex items-center gap-2 sm:gap-3 text-clay-900 font-bold uppercase text-[10px] sm:text-[11px] tracking-[0.3em] pb-1 border-b-2 border-clay-200 hover:border-clay-900 transition-all"
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

