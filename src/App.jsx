import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Accolades from './components/Accolades';
import Testimonials from './components/Testimonials';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Accolades />
      <Testimonials />
      
      <footer className="footer">
        <div className="container">
          <p className="footer-text">© {new Date().getFullYear()} Jayasuriya. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;