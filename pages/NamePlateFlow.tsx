import React, { useState, useEffect } from 'react';
import { Shape, Design, SizeOption } from '../types';
import { PHONE_NUMBER } from '../constants';
import { ChevronRight, Type, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const NamePlateFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedDesignCode, setSelectedDesignCode] = useState<string>('');
  const [designs, setDesigns] = useState<Design[]>([]);
  const [sizes, setSizes] = useState<SizeOption[]>([]);
  const [loading, setLoading] = useState(false);

  const shapes = [
    { id: Shape.RECTANGLE, image: './name-shape-rectangle.png', label: 'Classic Rectangular' },
    { id: Shape.CIRCLE, image: './name-shape-circle.png', label: 'Modern Circular' },
    { id: Shape.SQUARE, image: './name-shape-square.png', label: 'Artisanal Square' },
  ];

  // Fetch sizes when shape is selected
  useEffect(() => {
    if (selectedShape) {
      const fetchSizes = async () => {
        const { data, error } = await supabase
          .from('shape_sizes')
          .select('size_label, size_value')
          .eq('shape', selectedShape)
          .eq('category', 'name-plate');
        
        if (!error && data) {
          setSizes(data.map(d => ({ label: d.size_label, value: d.size_value })));
        }
      };
      fetchSizes();
    }
  }, [selectedShape]);

  // Fetch designs when shape is selected
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
          .eq('categories.name', 'name-plate');

        if (!error && data) {
          const formatted = data.map((d: any) => ({
            id: d.id,
            code: d.code,
            title: d.title,
            price: d.base_price,
            image: d.image_url,
            shape: d.shape as Shape,
            category: 'name-plate',
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

    const message = `Hi, I would like to order a *Name Plate*:

Shape: ${selectedShape}
Size: ${selectedSize}
Design Ref: ${selectedDesignCode} (${designTitle})

I will provide the Name and Language details here.`;

    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const renderStep1 = () => (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1 text-center sm:text-left">
        <h3 className="font-serif text-2xl sm:text-3xl text-clay-900">Select Shape</h3>
        <p className="text-clay-500 text-sm font-light">The silhouette of your entrance.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
        {shapes.map(item => (
          <button
            key={item.id}
            onClick={() => { setSelectedShape(item.id); setStep(2); }}
            className={`relative h-[280px] sm:h-[350px] rounded-[32px] sm:rounded-[48px] overflow-hidden border-2 transition-all group shadow-sm hover:shadow-premium min-h-[250px] touch-manipulation
              ${selectedShape === item.id ? 'border-clay-900' : 'border-clay-100'}`}
          >
            <img src={item.image} alt={item.id} className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-clay-900/80 via-clay-900/20 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 text-white text-center">
              <span className="font-serif text-2xl sm:text-3xl uppercase tracking-widest">{item.id}</span>
              <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.3em] opacity-60 mt-2 sm:mt-3">{item.label}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-clay-100 pb-4 sm:pb-6 gap-4">
        <div className="space-y-1">
          <h3 className="font-serif text-2xl sm:text-3xl text-clay-900">Define Size</h3>
          <p className="text-clay-500 text-sm font-light">Standard dimensions for {selectedShape}.</p>
        </div>
        <button onClick={() => setStep(1)} className="text-clay-400 text-[10px] font-bold uppercase tracking-widest hover:text-clay-900 transition-all border-b border-transparent hover:border-clay-900 pb-1">← Change Shape</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {sizes.map(size => (
          <button
            key={size.value}
            onClick={() => { setSelectedSize(size.value); setStep(3); }}
            className={`p-6 sm:p-10 rounded-[24px] sm:rounded-[32px] border-2 transition-all flex justify-between items-center group min-h-[72px] sm:min-h-[96px] touch-manipulation
              ${selectedSize === size.value ? 'border-clay-900 bg-clay-900 text-white shadow-xl translate-y-[-2px]' : 'border-clay-50 bg-white hover:border-clay-200 shadow-sm'}`}
          >
            <span className="font-bold text-lg sm:text-xl tracking-widest uppercase">{size.label}</span>
            <ChevronRight className={selectedSize === size.value ? 'text-white' : 'text-clay-200'} size={24} />
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-clay-100 pb-4 sm:pb-6 gap-4">
        <div className="space-y-1">
          <h3 className="font-serif text-2xl sm:text-3xl text-clay-900">Artisan Style</h3>
          <p className="text-clay-500 text-sm font-light">Traditional patterns for your name plate.</p>
        </div>
        <button onClick={() => setStep(2)} className="text-clay-400 text-[10px] font-bold uppercase tracking-widest hover:text-clay-900 transition-all border-b border-transparent hover:border-clay-900 pb-1">← Change Size</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-clay-100 rounded-[32px] h-[350px]"></div>
          ))
        ) : designs.map(design => (
          <div
            key={design.id}
            onClick={() => { setSelectedDesignCode(design.code); setStep(4); }}
            className={`group rounded-[32px] sm:rounded-[48px] overflow-hidden cursor-pointer relative transition-all border-2 shadow-sm hover:shadow-premium min-h-[300px] sm:min-h-[400px] touch-manipulation
              ${selectedDesignCode === design.code ? 'border-clay-900 ring-4 ring-clay-100 shadow-2xl' : 'border-clay-50 bg-white hover:border-clay-200'}`}
          >
            <div className="aspect-square overflow-hidden bg-clay-50">
              <img src={design.image} alt={design.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" loading="lazy" />
            </div>
            <div className="p-6 sm:p-8 text-center bg-white">
              <p className="text-[10px] sm:text-[11px] font-bold text-clay-900 tracking-[0.4em] uppercase mb-2">{design.code}</p>
              <p className="text-clay-400 italic font-serif text-base sm:text-lg">Featured pattern</p>
            </div>
            {selectedDesignCode === design.code && (
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-clay-900 text-white p-2 sm:p-3 rounded-full shadow-2xl animate-in zoom-in-50 duration-300">
                <CheckCircle2 size={20} className="sm:w-6 sm:h-6" />
              </div>
            )}
          </div>
        ))}
      </div>

      {designs.length === 0 && !loading && (
        <div className="text-center py-16 sm:py-24 space-y-8 sm:space-y-10 border-4 border-dashed border-clay-50 rounded-[32px] sm:rounded-[64px] bg-clay-50/20 px-4">
          <div className="space-y-3">
            <p className="text-clay-500 italic font-serif text-xl sm:text-2xl">A unique silhouette invites unique art.</p>
            <p className="text-clay-400 text-sm font-light max-w-sm mx-auto">We specialize in custom creations tailored specifically to your architectural vision.</p>
          </div>
          <button
            onClick={() => setStep(4)}
            className="px-8 sm:px-12 py-4 sm:py-5 bg-clay-900 text-white rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-[11px] hover:shadow-premium transition-all hover:scale-105 min-h-[48px] touch-manipulation"
          >
            Design a custom piece
          </button>
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-2xl mx-auto px-4 sm:px-0">
      <div className="text-center space-y-3 sm:space-y-4">
        <h3 className="font-serif text-3xl sm:text-4xl text-clay-900">The Artisan's Brief</h3>
        <p className="text-clay-500 text-sm font-light">Finalizing your bespoke name plate.</p>
      </div>

      <div className="bg-white p-8 sm:p-16 rounded-[32px] sm:rounded-[64px] border border-clay-100 shadow-premium text-center space-y-8 sm:space-y-12">
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-clay-50 rounded-full flex items-center justify-center mx-auto text-clay-800 border border-clay-100">
          <Type size={24} className="sm:w-8 sm:h-8" />
        </div>

        <div className="space-y-4">
          <h4 className="font-serif text-3xl sm:text-4xl text-clay-900 leading-none">{selectedShape}</h4>
          <p className="text-clay-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.4em]">{selectedSize}</p>
          {selectedDesignCode && (
            <div className="pt-4 sm:pt-6 border-t border-clay-50 mt-4 sm:mt-6 group">
              <span className="text-[9px] sm:text-[10px] text-clay-300 uppercase font-bold tracking-widest block mb-2">Selected Pattern</span>
              <p className="text-clay-900 font-bold tracking-[0.3em] font-serif text-lg sm:text-xl">{selectedDesignCode}</p>
            </div>
          )}
        </div>

        <div className="bg-clay-50/50 p-6 sm:p-10 rounded-[24px] sm:rounded-[40px] text-left text-sm text-clay-600 leading-relaxed italic border-l-4 border-clay-900 relative">
          <span className="absolute -top-3 sm:-top-4 left-4 bg-clay-900 text-white px-3 sm:px-4 py-1 rounded-full text-[8px] sm:text-[9px] uppercase font-bold tracking-widest">A Personal Note</span>
          Once we connect on WhatsApp, we will collaborate on the exact typography, language, and mud placement to ensure your entrance reflects your home's identity perfectly.
        </div>

        <button
          onClick={handleOrder}
          className="w-full bg-clay-900 text-white py-5 sm:py-7 rounded-[24px] sm:rounded-[32px] font-bold uppercase tracking-[0.3em] text-[10px] sm:text-[11px] hover:shadow-premium transition-all hover:-translate-y-1 shadow-2xl flex items-center justify-center gap-3 sm:gap-4 group min-h-[56px] touch-manipulation"
        >
          Send Brief via WhatsApp
          <ChevronRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <button onClick={() => setStep(3)} className="w-full text-clay-400 text-[10px] font-bold uppercase tracking-widest hover:text-clay-900 transition-all py-2">← Back to Styles</button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Progress Track */}
      <div className="flex gap-2 sm:gap-4 mb-12 sm:mb-24 max-w-sm sm:max-w-lg mx-auto reveal px-2">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={`h-2 sm:h-4 flex-1 rounded-full transition-all duration-1000 ${i <= step ? 'bg-clay-900' : 'bg-clay-50'}`}
            style={{ width: i === step ? '45%' : '15%' }}
          />
        ))}
      </div>

      <div className="reveal">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
    </div>
  );
};

export default NamePlateFlow;

