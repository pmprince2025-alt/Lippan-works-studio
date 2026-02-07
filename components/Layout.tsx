import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';
import FloatingElements from './FloatingElements';
import AIChatAssistant from './AIChatAssistant';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const openWhatsApp = () => {
    const url = `https://wa.me/${PHONE_NUMBER}?text=Hi Lippan Works Studio, I have a query about your art.`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-clay-50 relative selection:bg-clay-200 selection:text-clay-900 font-sans">
      {/* Floating 3D Elements */}
      <FloatingElements />
      <AIChatAssistant />

      {/* Header */}
      <header className="glass sticky top-0 z-[100] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {!isHome && (
              <Link to="/" className="text-clay-800 hover:text-clay-600 transition-colors">
                <ArrowLeft size={20} />
              </Link>
            )}
            <Link to="/" className="flex items-center gap-4 group">
              <img
                src="./logo.jpg"
                alt="Lippan Works"
                className="w-10 h-10 rounded-full object-cover border border-clay-200 shadow-sm transition-transform duration-500 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <h1 className="font-serif text-lg font-bold text-clay-900 tracking-tight leading-none uppercase">Lippan Works</h1>
                <span className="text-[10px] text-clay-500 uppercase tracking-[0.3em] mt-1 font-bold">Studio</span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {['Home', 'Decor', 'Photo Frame', 'Name Plate', 'About'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                className="text-[11px] uppercase tracking-[0.2em] font-bold text-clay-600 hover:text-clay-900 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-clay-900 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <Link to="/about" className="text-xs font-bold uppercase tracking-widest text-clay-900">About</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative z-10 w-full">
        {children}
      </main>

      {/* Footer CTA */}
      <footer className="py-20 px-6 border-t border-clay-100 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
          <div className="text-center space-y-4">
            <h4 className="font-serif text-3xl text-clay-900">Lippan Works Studio</h4>
            <p className="text-clay-500 text-sm tracking-[0.3em] uppercase font-bold">Handcrafted with Heart by Sandhya Meher</p>
          </div>

          <button
            onClick={openWhatsApp}
            className="group flex items-center gap-4 bg-clay-900 text-white px-12 py-5 rounded-full hover:bg-clay-800 transition-all hover:shadow-premium hover:-translate-y-1"
          >
            <MessageCircle size={20} />
            <span className="font-bold text-sm uppercase tracking-widest">Connect on WhatsApp</span>
          </button>

          <div className="pt-12 w-full border-t border-clay-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-clay-400 font-bold uppercase tracking-[0.3em] text-center md:text-left">
            <p>© 2026 Lippan Works Studio • Crafting Light & Tradition</p>
            <div className="flex gap-8">
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