import { 
  CheckCircle2, 
  Shield, 
  Medal, 
  Lightbulb, 
  Leaf, 
  Wrench, 
  Award, 
  Droplet, 
  Flame, 
  Wind, 
  Bug, 
  Recycle, 
  Infinity, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Check, 
  X, 
  AlertTriangle, 
  ArrowRight, 
  Box, 
  Send,
  Menu,
  X as XIcon
} from 'lucide-react';

// Create wrapper components to match the styling from Font Awesome
export const IconCheck = (props: any) => <CheckCircle2 size={props.size || 20} {...props} />;
export const IconShield = (props: any) => <Shield size={props.size || 20} {...props} />;
export const IconMedal = (props: any) => <Medal size={props.size || 20} {...props} />;
export const IconLightbulb = (props: any) => <Lightbulb size={props.size || 20} {...props} />;
export const IconLeaf = (props: any) => <Leaf size={props.size || 20} {...props} />;
export const IconTool = (props: any) => <Wrench size={props.size || 20} {...props} />;
export const IconAward = (props: any) => <Award size={props.size || 20} {...props} />;
export const IconWater = (props: any) => <Droplet size={props.size || 20} {...props} />;
export const IconFire = (props: any) => <Flame size={props.size || 20} {...props} />;
export const IconWind = (props: any) => <Wind size={props.size || 20} {...props} />;
export const IconBug = (props: any) => <Bug size={props.size || 20} {...props} />;
export const IconRecycle = (props: any) => <Recycle size={props.size || 20} {...props} />;
export const IconInfinity = (props: any) => <Infinity size={props.size || 20} {...props} />;
export const IconMapPin = (props: any) => <MapPin size={props.size || 20} {...props} />;
export const IconPhone = (props: any) => <Phone size={props.size || 20} {...props} />;
export const IconMail = (props: any) => <Mail size={props.size || 20} {...props} />;
export const IconClock = (props: any) => <Clock size={props.size || 20} {...props} />;
export const IconFacebook = (props: any) => <Facebook size={props.size || 20} {...props} />;
export const IconInstagram = (props: any) => <Instagram size={props.size || 20} {...props} />;
export const IconTwitter = (props: any) => <Twitter size={props.size || 20} {...props} />;
export const IconLinkedin = (props: any) => <Linkedin size={props.size || 20} {...props} />;
export const IconArrowRight = (props: any) => <ArrowRight size={props.size || 20} {...props} />;
export const IconCube = (props: any) => <Box size={props.size || 20} {...props} />;
export const IconMenu = (props: any) => <Menu size={props.size || 20} {...props} />;
export const IconX = (props: any) => <XIcon size={props.size || 20} {...props} />;
export const IconSend = (props: any) => <Send size={props.size || 20} {...props} />;

// Icons for comparison table
export const IconSuccess = (props: any) => <Check className="text-teal-600" size={props.size || 20} {...props} />;
export const IconFail = (props: any) => <X className="text-red-500" size={props.size || 20} {...props} />;
export const IconWarning = (props: any) => <AlertTriangle className="text-yellow-500" size={props.size || 20} {...props} />;
