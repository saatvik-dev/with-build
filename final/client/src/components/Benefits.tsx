import { benefits } from '@/constants/data';
import { IconWater, IconFire, IconWind, IconBug, IconRecycle, IconArrowRight } from '@/lib/icons';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'water':
      return <IconWater />;
    case 'fire':
      return <IconFire />;
    case 'wind':
      return <IconWind />;
    case 'bug':
      return <IconBug />;
    case 'recycle':
      return <IconRecycle />;
    default:
      return <IconWater />;
  }
};

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <span className="text-teal-600 font-medium">LIFETIME PERFORMANCE</span>
            <h2 className="text-3xl md:text-4xl font-['Montserrat'] font-bold mt-2 mb-6">
              Revolutionary Materials for Extraordinary Kitchens
            </h2>
            
            <div className="space-y-6">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="flex items-start">
                  <div className="mt-1 bg-teal-100 rounded-full p-2 mr-4">
                    {getIcon(benefit.icon)}
                  </div>
                  <div>
                    <h3 className="font-['Montserrat'] font-bold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <a href="#contact" className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-md">
                Learn More About M-Kite
                <IconArrowRight className="ml-2" />
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-slate-900 rounded-xl opacity-5 transform rotate-3"></div>
              <div className="absolute inset-0 bg-teal-500 rounded-xl opacity-5 transform -rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1604709177225-055f99402ea3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="M-Kite Aluminum Kitchen Benefits" 
                className="relative rounded-xl shadow-xl w-full h-auto"
              />
              
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <IconWater className="text-teal-600" />
                  </div>
                  <h4 className="font-['Montserrat'] font-bold">Lifetime Performance</h4>
                </div>
                <p className="text-slate-600 text-sm">Our aluminum kitchens are designed to last a lifetime, eliminating all traditional kitchen drawbacks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
