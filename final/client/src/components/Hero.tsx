import { Button } from '@/components/ui/button';
import { IconCheck, IconArrowRight } from '@/lib/icons';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center pt-16 relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute h-56 w-56 rounded-full bg-teal-300 top-20 left-10"></div>
        <div className="absolute h-64 w-64 rounded-full bg-teal-400 bottom-20 right-10"></div>
        <div className="absolute h-32 w-32 rounded-full bg-slate-300 top-40 right-40"></div>
        <div className="absolute h-20 w-20 rounded-full bg-slate-400 bottom-40 left-40"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Montserrat'] font-bold leading-tight mb-6">
              <span className="text-slate-800">Revolutionary </span>
              <span className="text-teal-600">Aluminum</span>
              <span className="text-slate-800"> Modular Kitchens</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              Introducing the world's most durable kitchen system. Waterproof, termite-proof, and maintenance-free with a lifetime performance guarantee.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="px-8 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-md text-center">
                Transform Your Kitchen
              </a>
              <a href="#features" className="px-8 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors text-center">
                Explore Features
              </a>
            </div>
            
            <div className="flex flex-wrap items-center mt-12 gap-x-6 gap-y-4">
              <div className="flex items-center">
                <IconCheck className="text-teal-600 mr-2" />
                <span className="text-slate-700">Lifetime Guarantee</span>
              </div>
              <div className="flex items-center">
                <IconCheck className="text-teal-600 mr-2" />
                <span className="text-slate-700">Eco-Friendly</span>
              </div>
              <div className="flex items-center">
                <IconCheck className="text-teal-600 mr-2" />
                <span className="text-slate-700">Zero Maintenance</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 -m-16 bg-teal-500 rounded-full filter blur-3xl opacity-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="M-Kite Aluminum Modular Kitchen" 
                className="relative z-10 rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-8 right-8 z-20 bg-white p-4 rounded-lg shadow-xl">
                <div className="flex items-center space-x-2">
                  <span className="text-teal-600"><IconCheck size={20} /></span>
                  <span className="font-['Montserrat'] font-bold">25+ Years of Excellence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
