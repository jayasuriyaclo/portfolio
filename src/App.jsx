import Navbar from './components/Navbar';
import HomeHero from './components/HomeHero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Partners from './components/Partners';
import Contact from './components/Contact';
import ScrollIndicator from './components/ScrollIndicator';
import './App.css';

function App() {
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