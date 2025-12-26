
export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  iconName: string; // Mapping to Lucide icons
  image?: string;
  category?: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string; // e.g., "Bride", "Corporate Client"
  location: string;
  rating: number;
  text: string;
  image?: string;
  status?: 'Pending' | 'Approved' | 'Rejected';
}

export interface GalleryItem {
  id: number;
  category: 'wedding' | 'birthday' | 'corporate' | 'other';
  imageUrl: string;
  title: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  iconName: string;
}

export interface NavLink {
  name: string;
  path: string;
}

export interface SiteSettings {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  mapEmbed: string;
  metaTitle: string;
  metaDesc: string;
  keywords: string;
  heroHeadline: string;
  heroSubHeadline: string;
  heroBtn1: string;
  heroBtn2: string;
}

export interface AboutData {
  headline: string;
  intro: string;
  vision: string;
  mission: string;
  yearsExp: string;
  eventsCount: string;
  teamCount: string;
  imageUrl: string;
}