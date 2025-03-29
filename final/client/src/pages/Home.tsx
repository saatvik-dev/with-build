import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Benefits from '@/components/Benefits';
import Gallery from '@/components/Gallery';
import Comparison from '@/components/Comparison';
import Testimonials from '@/components/Testimonials';
import Warranty from '@/components/Warranty';
import Contact from '@/components/Contact';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-sans text-slate-800 bg-slate-50 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Benefits />
        <Gallery />
        <Comparison />
        <Testimonials />
        <Warranty />
        <Contact />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
