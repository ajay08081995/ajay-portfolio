import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleSectionVisible = useCallback((section: string) => {
    setActiveSection(section);
  }, []);

  // Prevent scroll during loading
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loaded]);

  return (
    <div className="cursor-none noise-overlay">
      {/* Loading screen */}
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Custom cursor - desktop only */}
      <CustomCursor />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Page sections */}
      <main>
        <Hero onSectionVisible={handleSectionVisible} />
        <About onSectionVisible={handleSectionVisible} />
        <Skills onSectionVisible={handleSectionVisible} />
        <Projects onSectionVisible={handleSectionVisible} />
        <Experience onSectionVisible={handleSectionVisible} />
        <Services onSectionVisible={handleSectionVisible} />
        <Contact onSectionVisible={handleSectionVisible} />
      </main>

      <Footer />
    </div>
  );
}
