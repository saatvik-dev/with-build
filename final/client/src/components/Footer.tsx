import { IconCube, IconMapPin, IconPhone, IconMail, IconClock, IconSend } from '@/lib/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { quickLinks, socialLinks, footerLinks } from '@/constants/data';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const getSocialIcon = (iconName: string) => {
  switch (iconName) {
    case 'facebook':
      return <IconFacebook />;
    case 'twitter':
      return <IconTwitter />;
    case 'instagram':
      return <IconInstagram />;
    case 'linkedin':
      return <IconLinkedin />;
    default:
      return null;
  }
};

import { IconFacebook, IconTwitter, IconInstagram, IconLinkedin } from '@/lib/icons';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        toast({
          title: "Success!",
          description: "You've been subscribed to our newsletter.",
        });
        setEmail('');
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-teal-400 text-3xl"><IconCube size={28} /></span>
              <h1 className="text-2xl font-['Montserrat'] font-bold tracking-tight">
                <span className="text-white">M-Kite</span>
                <span className="text-teal-400">Kitchen</span>
              </h1>
            </div>
            
            <p className="text-slate-300 mb-6">
              Revolutionizing modular kitchens with aluminum innovation. Built to last a lifetime with zero maintenance.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-teal-800 hover:text-white transition-colors"
                  aria-label={`Follow us on ${link.icon}`}
                >
                  {getSocialIcon(link.icon)}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-['Montserrat'] font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-slate-300 hover:text-teal-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-['Montserrat'] font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <IconMapPin className="text-teal-400 mt-1 mr-3" />
                <span className="text-slate-300">123 Innovation Street, Design District, Mumbai, India - 400001</span>
              </li>
              <li className="flex items-center">
                <IconPhone className="text-teal-400 mr-3" />
                <span className="text-slate-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <IconMail className="text-teal-400 mr-3" />
                <span className="text-slate-300">info@mkitekitchen.com</span>
              </li>
              <li className="flex items-center">
                <IconClock className="text-teal-400 mr-3" />
                <span className="text-slate-300">Mon-Sat: 10:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-['Montserrat'] font-bold mb-6">Newsletter</h3>
            <p className="text-slate-300 mb-4">Subscribe to get the latest updates on our products and offers.</p>
            
            <form className="mb-4" onSubmit={handleSubscribe}>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-2 rounded-l-lg border-none outline-none text-slate-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
                <Button 
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 rounded-r-lg transition-colors"
                  disabled={isSubmitting}
                >
                  <IconSend size={18} />
                </Button>
              </div>
            </form>
            
            <p className="text-slate-400 text-sm">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} M-Kite Kitchen. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              {footerLinks.map((link, index) => (
                <a key={index} href={link.href} className="text-slate-400 hover:text-teal-400 text-sm transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
