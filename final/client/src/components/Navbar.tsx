import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { navLinks } from '@/constants/data';
import { IconCube, IconMenu, IconX } from '@/lib/icons';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClickLink = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed w-full bg-white bg-opacity-95 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 shadow-md' : 'py-3 shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <span className="text-teal-600 text-3xl">
            <IconCube size={28} />
          </span>
          <h1 className="text-2xl font-['Montserrat'] font-bold tracking-tight">
            <span className="text-slate-800">M-Kite</span>
            <span className="text-teal-600"> Kitchen</span>
          </h1>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              className="font-medium text-slate-600 hover:text-teal-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <a 
            href="#contact" 
            className="hidden md:inline-flex px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-sm"
          >
            Get Started
          </a>
          <button 
            className="md:hidden text-slate-800 hover:text-teal-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <IconX size={24} /> : <IconMenu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white px-4 pb-4 border-t border-slate-100 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <nav className="flex flex-col space-y-3">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              className="py-2 font-medium text-slate-600 hover:text-teal-600 transition-colors"
              onClick={handleClickLink}
            >
              {link.label}
            </a>
          ))}
          <a 
            href="#contact" 
            className="py-2 font-medium text-teal-600 hover:text-teal-700 transition-colors"
            onClick={handleClickLink}
          >
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
