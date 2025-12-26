import { ServiceItem, TestimonialItem, GalleryItem, FeatureItem, NavLink } from './types';

export const COMPANY_NAME = "M.K Event Management";
export const PHONE_NUMBER = "+91 98399 87117";
export const WHATSAPP_NUMBER = "919839987117"; // No symbols for API link
export const EMAIL_ADDRESS = "info@mkevents.com";
export const ADDRESS = "123, Royal Plaza, Main Street, City Center, India";

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Contact', path: '/contact' },
];

export const FEATURES: FeatureItem[] = [
  { title: "5+ Years Experience", description: "Trusted by hundreds of clients.", iconName: "Award" },
  { title: "Professional Team", description: "Dedicated experts for every detail.", iconName: "Users" },
  { title: "Budget-Friendly", description: "Premium services at best prices.", iconName: "Wallet" },
  { title: "Custom Themes", description: "Unique designs for your vision.", iconName: "Palette" },
  { title: "On-Time Execution", description: "Punctuality is our promise.", iconName: "Clock" },
  { title: "100% Satisfaction", description: "We prioritize your happiness.", iconName: "Heart" },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'wedding',
    title: "Wedding Planning",
    shortDescription: "Complete wedding management from venue to vidai.",
    fullDescription: "We turn your dream wedding into reality. Our comprehensive wedding planning services cover everything from venue selection to guest management, ensuring a seamless and royal experience.",
    features: ["Venue Selection", "Decor & Theme", "Guest Management", "Photography"],
    iconName: "HeartHandshake"
  },
  {
    id: 'birthday',
    title: "Birthday Parties",
    shortDescription: "Magical themes for kids and adults alike.",
    fullDescription: "Celebrate your special day with joy and style. Whether it's a first birthday or a 50th jubilee, we create magical atmospheres with balloons, themes, and entertainment.",
    features: ["Theme Decor", "Cake & Catering", "Entertainment", "Return Gifts"],
    iconName: "Cake"
  },
  {
    id: 'corporate',
    title: "Corporate Events",
    shortDescription: "Professional setups for conferences and meets.",
    fullDescription: "Elevate your business image with our professional corporate event services. We handle seminars, conferences, product launches, and annual parties with precision.",
    features: ["Audio/Visual Setup", "Branding", "Corporate Catering", "Logistics"],
    iconName: "Briefcase"
  },
  {
    id: 'decor',
    title: "Decoration Services",
    shortDescription: "Floral, Balloon, and Stage decorations.",
    fullDescription: "Our core expertise lies in transforming spaces. From elegant floral arrangements to grand stage setups, we make every corner photogenic.",
    features: ["Flower Decor", "Stage Lighting", "Entrance Arches", "Table Centerpieces"],
    iconName: "Gem"
  },
  {
    id: 'catering',
    title: "Catering Management",
    shortDescription: "Delicious menus for all palates.",
    fullDescription: "Food is the soul of any event. We partner with top chefs to provide hygienic, tasty, and diverse menu options for your guests.",
    features: ["Buffet Setup", "Live Stations", "Waitstaff", "Custom Menus"],
    iconName: "Utensils"
  },
  {
    id: 'sound',
    title: "DJ & Sound System",
    shortDescription: "High-quality audio and lighting setup.",
    fullDescription: "Get the party started with our premium sound systems and professional DJs. We ensure crystal clear audio and dazzling dance floor lighting.",
    features: ["Pro Sound System", "DJ Services", "Dance Floor", "Mood Lighting"],
    iconName: "Music"
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Bride",
    location: "Mumbai",
    rating: 5,
    text: "M.K Event Management made my wedding absolutely fairylike! The decoration was exactly what I wanted. Highly recommended!",
    image: "https://picsum.photos/100/100?random=1"
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Corporate Client",
    location: "Delhi",
    rating: 5,
    text: "Professional and on time. They managed our annual tech conference perfectly. The sound and stage setup was premium.",
    image: "https://picsum.photos/100/100?random=2"
  },
  {
    id: 3,
    name: "Anita Desai",
    role: "Mother",
    location: "Pune",
    rating: 4,
    text: "Organized my son's 5th birthday. The jungle theme was a hit among kids! Great balloon work.",
    image: "https://picsum.photos/100/100?random=3"
  }
];

export const GALLERY_IMAGES: GalleryItem[] = [
  { id: 1, category: 'wedding', imageUrl: 'https://picsum.photos/800/600?random=10', title: 'Royal Wedding Stage' },
  { id: 2, category: 'birthday', imageUrl: 'https://picsum.photos/800/600?random=11', title: 'Kids Theme Party' },
  { id: 3, category: 'corporate', imageUrl: 'https://picsum.photos/800/600?random=12', title: 'Conference Hall' },
  { id: 4, category: 'wedding', imageUrl: 'https://picsum.photos/800/600?random=13', title: 'Floral Mandap' },
  { id: 5, category: 'birthday', imageUrl: 'https://picsum.photos/800/600?random=14', title: 'Balloon Arch' },
  { id: 6, category: 'corporate', imageUrl: 'https://picsum.photos/800/600?random=15', title: 'Award Ceremony' },
  { id: 7, category: 'wedding', imageUrl: 'https://picsum.photos/800/600?random=16', title: 'Reception Entry' },
  { id: 8, category: 'other', imageUrl: 'https://picsum.photos/800/600?random=17', title: 'Baby Shower' },
  { id: 9, category: 'other', imageUrl: 'https://picsum.photos/800/600?random=18', title: 'Anniversary Dinner' },
];