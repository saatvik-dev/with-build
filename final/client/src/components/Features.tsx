import { features } from '@/constants/data';
import { 
  IconShield, 
  IconMedal, 
  IconLightbulb, 
  IconLeaf, 
  IconTool, 
  IconAward 
} from '@/lib/icons';

const getIcon = (iconName: string, size = 24) => {
  switch (iconName) {
    case 'shield':
      return <IconShield size={size} />;
    case 'medal':
      return <IconMedal size={size} />;
    case 'lightbulb':
      return <IconLightbulb size={size} />;
    case 'leaf':
      return <IconLeaf size={size} />;
    case 'tool':
      return <IconTool size={size} />;
    case 'award':
      return <IconAward size={size} />;
    default:
      return <IconShield size={size} />;
  }
};

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-medium">REVOLUTIONARY DESIGN</span>
          <h2 className="text-3xl md:text-4xl font-['Montserrat'] font-bold mt-2 mb-4">Why Choose M-Kite Kitchen?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Discover the perfect blend of innovation, elegance, and efficiency that makes M-Kite the ultimate choice for modern kitchens.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="bg-slate-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 group border border-slate-100"
            >
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-teal-100 transition-colors duration-300">
                <span className="text-2xl text-teal-600">
                  {getIcon(feature.icon)}
                </span>
              </div>
              <h3 className="font-['Montserrat'] font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
