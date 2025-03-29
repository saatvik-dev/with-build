import { galleryItems } from '@/constants/data';
import { IconArrowRight } from '@/lib/icons';

const Gallery = () => {
  return (
    <section id="gallery" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-medium">INSPIRING DESIGNS</span>
          <h2 className="text-3xl md:text-4xl font-['Montserrat'] font-bold mt-2 mb-4">Gallery of Premium Kitchens</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Explore our innovative aluminum kitchen designs that combine elegance, functionality and unparalleled durability.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div 
              key={item.id}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img 
                src={item.image}
                alt={item.title} 
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-['Montserrat'] font-bold text-xl mb-2">{item.title}</h3>
                <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="#contact" className="inline-flex items-center px-6 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-md">
            Request Your Custom Design
            <IconArrowRight className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
