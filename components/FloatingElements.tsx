import React, { useEffect, useState } from 'react';

const FloatingElements: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const elements = [
    { size: 300, delay: 0, speed: 20, blur: 2, opacity: 0.15, color: 'clay-300' },
    { size: 200, delay: 2, speed: 15, blur: 3, opacity: 0.1, color: 'clay-200' },
    { size: 250, delay: 4, speed: 25, blur: 2, opacity: 0.12, color: 'clay-400' },
    { size: 180, delay: 1, speed: 18, blur: 4, opacity: 0.08, color: 'clay-300' },
    { size: 220, delay: 3, speed: 22, blur: 3, opacity: 0.1, color: 'clay-200' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el, index) => {
        const scrollOffset = scrollPosition * (0.1 + index * 0.05);
        return (
          <div
            key={index}
            className="absolute rounded-full"
            style={{
              width: `${el.size}px`,
              height: `${el.size}px`,
              background: `radial-gradient(circle at 30% 30%, rgba(210, 158, 132, ${el.opacity * 1.5}), rgba(194, 128, 94, ${el.opacity}))`,
              filter: `blur(${el.blur}px)`,
              animation: `float${index} ${20 + el.speed}s ease-in-out infinite`,
              animationDelay: `${el.delay}s`,
              transform: `translate(${mousePosition.x * el.speed}px, ${mousePosition.y * el.speed - scrollOffset}px)`,
              transition: 'transform 0.3s ease-out',
              top: `${10 + index * 20}%`,
              left: `${5 + index * 18}%`,
              boxShadow: `0 0 ${el.size / 2}px rgba(194, 128, 94, ${el.opacity * 0.5})`,
            }}
          />
        );
      })}

      {/* Decorative mirror-like elements */}
      <div
        className="absolute w-32 h-32 rounded-full border-4 border-clay-200/20"
        style={{
          top: '15%',
          right: '10%',
          transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10 - scrollPosition * 0.15}px) rotate(${mousePosition.x * 20 + scrollPosition * 0.1}deg)`,
          transition: 'transform 0.4s ease-out',
          animation: 'spin 30s linear infinite',
          background: 'linear-gradient(135deg, rgba(245, 235, 230, 0.1), rgba(237, 217, 206, 0.05))',
          backdropFilter: 'blur(2px)',
        }}
      />

      <div
        className="absolute w-24 h-24 rounded-full border-3 border-clay-300/15"
        style={{
          bottom: '20%',
          left: '15%',
          transform: `translate(${mousePosition.x * 12}px, ${mousePosition.y * 12 - scrollPosition * 0.2}px) rotate(${mousePosition.x * -15 - scrollPosition * 0.08}deg)`,
          transition: 'transform 0.35s ease-out',
          animation: 'spin 25s linear infinite reverse',
          background: 'linear-gradient(225deg, rgba(224, 191, 173, 0.08), rgba(208, 158, 132, 0.04))',
          backdropFilter: 'blur(1px)',
        }}
      />

      <style>{`
        @keyframes float0 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -40px) scale(1.05); }
          50% { transform: translate(-20px, -60px) scale(0.95); }
          75% { transform: translate(-40px, -20px) scale(1.02); }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, 40px) scale(1.08); }
          66% { transform: translate(40px, -30px) scale(0.92); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          20% { transform: translate(25px, 50px) scale(0.98); }
          40% { transform: translate(-35px, 30px) scale(1.05); }
          60% { transform: translate(45px, -25px) scale(0.95); }
          80% { transform: translate(-15px, -45px) scale(1.02); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, -50px) scale(1.1); }
        }
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(40px, 30px) scale(0.9); }
          50% { transform: translate(-25px, 45px) scale(1.05); }
          75% { transform: translate(35px, -35px) scale(0.98); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FloatingElements;
