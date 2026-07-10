import React, { useState, useEffect } from 'react';
import { Terminal, ChevronDown, ChevronUp } from 'lucide-react';

const ScrollIndicator = () => {
  const [direction, setDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        if (currentScrollY > lastScrollY) {
          setDirection('down');
        } else {
          setDirection('up');
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleClick = () => {
    if (direction === 'down') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 flex h-12 w-12 flex-col items-center justify-center rounded-full transition-all duration-500 hover:scale-105 hover:shadow-[0_8px_25px_rgba(99,102,241,0.25)] ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
      }`}
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
      aria-label="Scroll Indicator"
    >
      {direction === 'up' ? (
        <ChevronUp size={22} strokeWidth={2.5} className="text-[var(--accent-1)]" />
      ) : (
        <ChevronDown size={22} strokeWidth={2.5} className="text-[var(--accent-1)]" />
      )}
    </button>
  );
};

export default ScrollIndicator;
