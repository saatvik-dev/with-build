import { warrantyItems } from '@/constants/data';
import { IconInfinity, IconArrowRight } from '@/lib/icons';

const Warranty = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-teal-900 to-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-teal-300 font-medium">UNMATCHED CONFIDENCE</span>
          <h2 className="text-3xl md:text-4xl font-['Montserrat'] font-bold mt-2 mb-4">Our Industry-Leading Guarantee</h2>
          <p className="text-slate-100 max-w-2xl mx-auto">We stand behind the quality of our products with warranties that far exceed industry standards.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {warrantyItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 text-center hover:bg-opacity-15 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto bg-teal-600 bg-opacity-30 rounded-full flex items-center justify-center mb-6">
                {item.icon === 'infinity' ? (
                  <IconInfinity className="text-2xl text-teal-100" />
                ) : (
                  <span className="font-['Montserrat'] font-bold text-2xl text-teal-100">{item.year}</span>
                )}
              </div>
              <h3 className="font-['Montserrat'] font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-slate-100 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="#contact" className="inline-flex items-center px-8 py-4 bg-white text-teal-800 rounded-lg font-bold hover:bg-teal-100 transition-colors shadow-lg">
            Get Your Lifetime Kitchen Today
            <IconArrowRight className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Warranty;
