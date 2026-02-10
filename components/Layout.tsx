import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, ArrowLeft, Menu, X } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';
import FloatingElements from './FloatingElements';
import AIChatAssistant from './AIChatAssistant';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openWhatsApp = () => {
    const url = `https://wa.me/${PHONE_NUMBER}?text=Hi Lippan Works Studio, I have a query about your art.`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-clay-50 relative selection:bg-clay-200 selection:text-clay-900 font-sans">
      {/* Floating 3D Elements - hidden on mobile for performance */}
      <FloatingElements />
      <AIChatAssistant />

      {/* Header */}
      <header className="glass sticky top-0 z-[100] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isHome && (
              <Link to="/" className="text-clay-800 hover:text-clay-600 transition-colors p-2 -ml-2">
                <ArrowLeft size={24} className="sm:w-5 sm:h-5" />
              </Link>
            )}
            <Link to="/" className="flex items-center gap-3 sm:gap-4 group">
              <img
                src="./logo.jpg"
                alt="Lippan Works"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-clay-200 shadow-sm transition-transform duration-500 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <h1 className="font-serif text-base sm:text-lg font-bold text-clay-900 tracking-tight leading-none uppercase">Lippan Works</h1>
                <span className="text-[9px] sm:text-[10px] text-clay-500 uppercase tracking-[0.3em] mt-0.5 sm:mt-1 font-bold">Studio</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {['Home', 'Decor', 'Photo Frame', 'Name Plate', 'About'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                className="text-xs lg:text-[11px] uppercase tracking-[0.2em] font-bold text-clay-600 hover:text-clay-900 transition-colors relative group py-2"
              >
                {item}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-clay-900 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-clay-900 focus:outline-none p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 sm:top-20 left-0 w-full bg-white/95 backdrop-blur-md border-b border-clay-100 shadow-xl flex flex-col p-4 sm:p-6 space-y-1">
            {['Home', 'Decor', 'Photo Frame', 'Name Plate', 'About'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-serif font-medium text-clay-800 hover:text-clay-900 hover:bg-clay-50 rounded-xl px-4 py-3.5 transition-all flex justify-between items-center group min-h-[48px]"
              >
                {item}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-clay-600">→</span>
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow relative z-10 w-full">
        {children}
      </main>

      {/* Footer CTA */}
      <footer className="py-12 sm:py-20 px-4 sm:px-6 border-t border-clay-100 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 sm:gap-10">
          <div className="text-center space-y-3 sm:space-y-4">
            <h4 className="font-serif text-2xl sm:text-3xl text-clay-900">Lippan Works Studio</h4>
            <p className="text-clay-500 text-xs sm:text-sm tracking-[0.3em] uppercase font-bold">Handcrafted with Heart by Sandhya Meher</p>
          </div>

          <button
            onClick={openWhatsApp}
            className="group flex items-center gap-3 sm:gap-4 bg-clay-900 text-white px-6 sm:px-12 py-4 sm:py-5 rounded-full hover:bg-clay-800 transition-all hover:shadow-premium hover:-translate-y-1 min-h-[48px] touch-manipulation"
          >
            <MessageCircle size={20} />
            <span className="font-bold text-xs sm:text-sm uppercase tracking-widest">Connect on WhatsApp</span>
          </button>

          <div className="pt-8 sm:pt-12 w-full border-t border-clay-100 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] text-clay-400 font-bold uppercase tracking-[0.3em] text-center md:text-left">
            <p>© 2026 Lippan Works Studio • Crafting Light & Tradition</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-8">
              <span>Handmade in Kutch</span>
              <span>Global Inquiries Welcome</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;