import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import logo from '../assets/LOGO.png';

const navItems = [
  { id: 1, text: 'Home',     href: '#home' },
  { id: 2, text: 'About',    href: '#about' },
  { id: 3, text: 'Skills',   href: '#skills' },
  { id: 4, text: 'Projects', href: '#projects' },
  { id: 5, text: 'Contact',  href: '#contact' },
];

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const observerRef = useRef(null);
  const lastScrollY = useRef(0);

  const handleNav = () => setNav((prev) => !prev);

  /* ── Scroll shadow & hide/show ─────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 12);
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > 60 && currentScrollY > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section spy ───────────────── */
  useEffect(() => {
    const ids = navItems.map((i) => i.href.replace('#', ''));
    const targets = ids.map((id) => document.getElementById(id)).filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    targets.forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-transform duration-500 ease-in-out ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled
          ? 'border-b shadow-sm'
          : 'border-b border-transparent'
      }`}
      style={{
        backgroundColor: scrolled ? 'var(--nav-bg)' : 'var(--nav-bg-clear)',
        borderColor: scrolled ? 'var(--nav-border)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(12px)',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(12px)',
        transitionProperty: 'transform, background-color, border-color, backdrop-filter',
      }}
    >
      <nav className="mx-auto flex h-20 md:h-28 w-full max-w-7xl items-center justify-between px-6 md:px-10 lg:px-14">
        
        {/* Logo */}
        <a
          href="#home"
          id="nav-logo"
          className="shrink-0 transition-all duration-300 hover:opacity-80 hover:scale-[1.02]"
          aria-label="Jayasuriya — go to home"
        >
          <img
            src={logo}
            alt="JS logo"
            className="h-[4.5rem] w-auto md:h-24 object-contain object-left"
            style={{ filter: 'invert(1) contrast(1.2)', mixBlendMode: 'screen' }}
          />
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-1 md:flex" role="navigation" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`relative inline-block rounded-lg px-4 py-2 text-[15px] font-medium transition-all duration-300
                    after:absolute after:bottom-0.5 after:left-4 after:right-4 after:h-[1.5px] after:rounded-full
                    after:transition-all after:duration-300
                    ${isActive
                      ? 'text-[var(--accent-1)] after:bg-[var(--accent-1)] after:opacity-100 after:scale-x-100'
                      : 'after:opacity-0 after:scale-x-0 hover:after:opacity-100 hover:after:scale-x-100'
                    }`}
                  style={{
                    color: isActive ? 'var(--accent-1)' : 'var(--nav-text)',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--nav-text-hover)'; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--nav-text)'; }}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right side: Toggle + Hamburger */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger */}
          <button
            type="button"
            id="nav-mobile-toggle"
            onClick={handleNav}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 md:hidden"
            style={{
              border: '1px solid var(--card-border)',
              color: 'var(--nav-text)',
            }}
            aria-label={nav ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={nav}
            aria-controls="mobile-menu"
          >
            {nav ? <AiOutlineClose size={18} /> : <AiOutlineMenu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t backdrop-blur-xl transition-all duration-500 ease-in-out md:hidden ${
          nav ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          borderColor: 'var(--divider)',
          backgroundColor: 'var(--mobile-bg)',
        }}
        aria-hidden={!nav}
      >
        <ul className="flex flex-col px-6 py-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <li key={item.id} style={{ borderBottom: '1px solid var(--divider)' }} className="last:border-0">
                <a
                  href={item.href}
                  onClick={() => setNav(false)}
                  className="flex items-center gap-2 py-4 text-[15px] font-medium transition-colors duration-200"
                  style={{ color: isActive ? 'var(--accent-1)' : 'var(--nav-text)' }}
                >
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-1)' }} />
                  )}
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;