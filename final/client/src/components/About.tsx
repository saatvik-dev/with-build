import { IconArrowRight } from '@/lib/icons';

const About = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <span className="text-teal-600 font-medium">OUR JOURNEY</span>
            <h2 className="text-3xl md:text-4xl font-['Montserrat'] font-bold mt-2 mb-6">
              25+ Years of Industry Excellence
            </h2>
            
            <p className="text-slate-600 leading-relaxed mb-6">
              For over 25 years, we've been at the forefront of the plywood industry, understanding the challenges homeowners face with traditional kitchens. Most kitchens rely on plywood and MDF, which deteriorate within just 5 to 7 years.
            </p>
            
            <p className="text-slate-600 leading-relaxed mb-6">
              Behind the cabinets—where it's not visible to the human eye—moisture buildup leads to warping, foul odors, termite infestations, and hidden hardware damage. Cockroach infestations and unhygienic conditions make matters worse.
            </p>
            
            <p className="text-slate-600 leading-relaxed mb-8">
              For the past 15 years, we've studied these problems, determined to create a kitchen that lasts a lifetime—one that is waterproof, termite-proof, and maintenance-free. The result? M-Kite Aluminum Premium Modular Kitchen Cabinets—a game-changing innovation designed to eliminate all traditional kitchen drawbacks.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#features" className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-md text-center">
                Discover Our Innovation
              </a>
              <a href="#contact" className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors text-center">
                Contact Us
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="M-Kite Kitchen Team" 
                className="rounded-xl shadow-xl w-full h-auto"
              />
              
              <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
                <div className="flex items-center mb-3">
                  <div className="mr-4">
                    <div className="text-3xl font-['Montserrat'] font-bold text-teal-600">25+</div>
                    <div className="text-slate-600 text-sm">Years of Excellence</div>
                  </div>
                  <div>
                    <div className="text-3xl font-['Montserrat'] font-bold text-teal-600">5000+</div>
                    <div className="text-slate-600 text-sm">Kitchens Installed</div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm">Our commitment to innovation and quality has made us the leader in modern kitchen solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
