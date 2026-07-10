import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import logo from '../assets/LOGO.png';

const navItems = [
  { id: 1, text: 'Home',     href: '/#home' },
  { id: 2, text: 'About',    href: '/#about' },
  { id: 3, text: 'Skills',   href: '/#skills' },
  { id: 4, text: 'Projects', href: '/#projects' },
  { id: 5, text: 'Contact',  href: '/#contact' },
];

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const observerRef = useRef(null);
  const lastScrollY = useRef(0);
  const location = useLocation();

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
    if (location.pathname !== '/') return; // Only spy on home page

    const ids = navItems.map((i) => i.href.replace('/#', ''));
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
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-transform duration-500 ease-in-out ${
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
        <Link
          to="/#home"
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
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-1 md:flex" role="navigation" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = location.pathname === '/' && activeSection === item.href.replace('/#', '');
            return (
              <li key={item.id}>
                <Link
                  to={item.href}
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
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side: Blog Button + Hamburger */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Distinct Blog Button */}
          <Link
            to="/blog"
            className="hidden md:inline-flex items-center justify-center rounded-full px-5 py-2 text-[13px] font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_var(--accent-glow)]"
            style={{ background: 'var(--accent-grad)' }}
          >
            Blog
          </Link>

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
          <li className="py-3" style={{ borderBottom: '1px solid var(--divider)' }}>
            <Link
              to="/blog"
              onClick={() => setNav(false)}
              className="flex items-center justify-center w-full gap-2 py-3 rounded-full text-[14px] font-bold uppercase tracking-wider transition-all duration-300 text-white shadow-md hover:shadow-lg"
              style={{ background: 'var(--accent-grad)' }}
            >
              Blog
            </Link>
          </li>
          {navItems.map((item) => {
            const isActive = location.pathname === '/' && activeSection === item.href.replace('/#', '');
            return (
              <li key={item.id} style={{ borderBottom: '1px solid var(--divider)' }} className="last:border-0">
                <Link
                  to={item.href}
                  onClick={() => setNav(false)}
                  className="flex items-center gap-2 py-4 text-[15px] font-medium transition-colors duration-200"
                  style={{ color: isActive ? 'var(--accent-1)' : 'var(--nav-text)' }}
                >
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-1)' }} />
                  )}
                  {item.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;