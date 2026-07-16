import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeHero from './components/HomeHero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Partners from './components/Partners';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Contact from './components/Contact';
import ScrollIndicator from './components/ScrollIndicator';
import './App.css';
import { trackPageView } from './utils/analytics';

// Take manual control of scroll restoration so the browser doesn't try to guess
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Component to handle scroll restoration and analytics on route change
const RouteHandler = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
    // If there is a hash, scroll to it, otherwise scroll to top
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // For the home page and main blog list, always start at the top on load/refresh.
      // We skip this for individual blog posts so they can manage their own scroll restoration
      // after the async article content actually finishes loading in the DOM.
      if (!location.pathname.startsWith('/blog/')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [location]);

  return null;
};

const Home = () => (
  <>
    <HomeHero />
    <About />
    <Skills />
    <Projects />
    <Partners />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <RouteHandler />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <Contact />
      </main>
      <ScrollIndicator />
    </BrowserRouter>
  );
}

export default App;