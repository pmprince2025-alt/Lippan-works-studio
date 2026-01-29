import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';
import FloatingElements from './FloatingElements';

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
    <div className="min-h-screen flex flex-col bg-clay-50 relative">
      {/* Floating 3D Elements */}
      <FloatingElements />

      {/* Header */}
      <header className="bg-white border-b border-clay-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!isHome && (
              <Link to="/" className="text-clay-800 hover:text-clay-600 transition-colors mr-1">
                <ArrowLeft size={24} />
              </Link>
            )}
            <Link to="/" className="flex items-center gap-3 group reveal">
              <img
                src="./logo.jpg"
                alt="Lippan Works"
                className="w-12 h-12 rounded-full object-cover border border-clay-200 shadow-sm bg-clay-100 group-hover:scale-105 transition-transform reveal-image"
              />
              <div className="flex flex-col">
                <h1 className="font-serif text-xl font-bold text-clay-900 leading-tight reveal-heading">Lippan Works</h1>
                <span className="text-xs text-clay-600 uppercase tracking-widest reveal" style={{ transitionDelay: '0.3s' }}>Studio</span>
              </div>
            </Link>
          </div>
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-clay-600 hover:text-clay-900 font-medium transition-colors">Home</Link>
            <Link to="/decor" className="text-clay-600 hover:text-clay-900 font-medium transition-colors">Decor</Link>
            <Link to="/photo-frame" className="text-clay-600 hover:text-clay-900 font-medium transition-colors">Photo Frame</Link>
            <Link to="/name-plate" className="text-clay-600 hover:text-clay-900 font-medium transition-colors">Name Plate</Link>
            <Link to="/about" className="text-clay-600 hover:text-clay-900 font-medium transition-colors">About</Link>
          </nav>

          {/* Mobile Menu Button (Simple implementation) */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/about" className="text-clay-600 font-medium text-sm">About</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-32 relative z-10">
        {children}
      </main>

      {/* Responsive Footer CTA */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none flex justify-center md:pb-6">
        <div className="w-full md:w-auto md:min-w-[400px] pointer-events-auto bg-clay-900 text-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-2xl md:rounded-2xl transition-all">
          <div className="flex flex-col gap-2">
            <p className="text-center text-clay-200 text-xs tracking-wider uppercase font-sans mb-1">
              Handcrafted Mud Mirror Art
            </p>
            <button
              onClick={openWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </button>
            <p className="text-center text-clay-400 text-[10px] mt-2 italic">
              © 2026 Lippan Works Studio • Made with love by Sandhya
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;