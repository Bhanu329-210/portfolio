import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import Background from './components/canvas/Background';
import DownloadResume from './components/ui/DownloadResume';
import ResumePage from './pages/ResumePage';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    
    // Pre-fetch the resume for instant viewing
    fetch('/bhanu_fullStackdev.pdf')
      .then(res => res.blob())
      .then(blob => {
        window.resumeUrl = URL.createObjectURL(blob);
      })
      .catch(err => console.error('Error pre-fetching resume:', err));

    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.6,
      smoothTouch: true,
      touchMultiplier: 1.5,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative text-white font-sans antialiased overflow-x-hidden">
      {currentPath === '/resume' ? (
        <ResumePage />
      ) : (
        <>
          {/* 3D Background */}
          <Background />

          <main className="relative z-10 flex flex-col gap-0">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>

          <div className="relative z-10">
            <Footer />
          </div>
          
          <DownloadResume />
        </>
      )}
    </div>
  );
}

export default App;
