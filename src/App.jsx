import Navbar from './components/Navbar';
import HomeHero from './components/HomeHero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Partners from './components/Partners';
import Contact from './components/Contact';
import ScrollIndicator from './components/ScrollIndicator';
import './App.css';

import React, { useEffect } from 'react';
import { trackPageView } from './utils/analytics';

function App() {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);
  return (
    <>
      <Navbar />
      <main>
        <HomeHero />
        <About />
        <Skills />
        <Projects />
        <Partners />
        <Contact />
      </main>
      <ScrollIndicator />
    </>
  );
}

export default App;