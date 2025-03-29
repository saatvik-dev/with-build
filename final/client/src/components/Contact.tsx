import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { contactInfo, kitchenSizes, socialLinks } from '@/constants/data';
import { useToast } from '@/hooks/use-toast';
import { IconMapPin, IconPhone, IconMail, IconFacebook, IconTwitter, IconInstagram, IconLinkedin } from '@/lib/icons';

const getContactIcon = (iconName: string) => {
  switch (iconName) {
    case 'location':
      return <IconMapPin className="text-teal-600" />;
    case 'phone':
      return <IconPhone className="text-teal-600" />;
    case 'email':
      return <IconMail className="text-teal-600" />;
    default:
      return null;
  }
};

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

const formSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your name' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  kitchenSize: z.string().optional(),
  message: z.string().optional(),
  agreeToTerms: z.boolean().refine(value => value === true, {
    message: 'You must agree to receive communications'
  })
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      kitchenSize: '',
      message: '',
      agreeToTerms: false
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your inquiry has been submitted. We'll contact you shortly.",
        });
        form.reset();
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/2">
            <span className="text-teal-600 font-medium">GET IN TOUCH</span>
            <h2 className="text-3xl md:text-4xl font-['Montserrat'] font-bold mt-2 mb-6">Transform Your Kitchen Today</h2>
            
            <p className="text-slate-600 leading-relaxed mb-8">
              Ready to experience the revolutionary M-Kite Aluminum Kitchen? Fill out the form and our design experts will help you create the kitchen of your dreams—built to last a lifetime.
            </p>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map(info => (
                <div key={info.id} className="flex items-start">
                  <div className="mt-1 bg-teal-100 rounded-full p-2 mr-4">
                    {getContactIcon(info.icon)}
                  </div>
                  <div>
                    <h3 className="font-['Montserrat'] font-bold text-lg mb-1">{info.title}</h3>
                    <p className="text-slate-600">{info.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-teal-100 hover:text-teal-600 transition-colors"
                  aria-label={`Follow us on ${link.icon}`}
                >
                  {getSocialIcon(link.icon)}
                </a>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="bg-slate-50 rounded-xl p-8 shadow-md">
              <h3 className="font-['Montserrat'] font-bold text-2xl mb-6">Request Information</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Full Name*</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your Name" 
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Email Address*</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your@email.com" 
                              type="email"
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Phone Number*</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+91 XXXXX XXXXX" 
                              type="tel"
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="kitchenSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Kitchen Size</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full px-4 py-3 rounded-lg border border-slate-200">
                                <SelectValue placeholder="Select Size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {kitchenSizes.map(size => (
                                <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your requirements..." 
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1 rounded border-slate-300 text-teal-600 focus:ring-teal-400" 
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-slate-600">
                            I agree to receive communications from M-Kite Kitchen to discuss my inquiry.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
