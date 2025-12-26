import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Toast from '../components/Toast';
import { SERVICES, TESTIMONIALS, GALLERY_IMAGES, COMPANY_NAME, PHONE_NUMBER, EMAIL_ADDRESS, ADDRESS } from '../constants';
import { ServiceItem, SiteSettings, AboutData, TestimonialItem } from '../types';

// Define Data Types (Exported for use in pages)
export interface Inquiry { id: number; name: string; phone: string; email: string; type: string; date: string; city: string; status: string; message?: string; }
export interface Booking { id: number; client: string; event: string; date: string; guests: number; budget: string; status: string; }
export interface TeamMember { id: number; name: string; role: string; exp: string; photo: string; }
export interface FAQ { id: number; q: string; a: string; cat: string; }

interface AdminContextType {
  // Data
  inquiries: Inquiry[];
  bookings: Booking[];
  services: ServiceItem[];
  gallery: any[];
  testimonials: TestimonialItem[];
  team: TeamMember[];
  faqs: FAQ[];
  settings: SiteSettings;
  aboutData: AboutData;

  // Actions
  deleteInquiry: (id: number) => void;
  deleteInquiries: (ids: number[]) => void; // Bulk
  updateInquiryStatus: (id: number, status: string) => void;
  updateInquiry: (inquiry: Inquiry) => void; 
  
  addBooking: (booking: Booking) => void;
  updateBooking: (booking: Booking) => void;
  updateBookingStatus: (id: number, status: string) => void;
  
  addService: (service: ServiceItem) => void;
  updateService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;
  deleteServices: (ids: string[]) => void; // Bulk
  
  addGalleryImage: (img: any) => void;
  deleteGalleryImage: (id: number) => void;
  deleteGalleryImages: (ids: number[]) => void; // Bulk
  
  addTestimonial: (t: any) => void;
  updateTestimonialStatus: (id: number, status: 'Pending' | 'Approved' | 'Rejected') => void;
  deleteTestimonial: (id: number) => void;
  deleteTestimonials: (ids: number[]) => void; // Bulk
  
  addTeamMember: (m: any) => void;
  deleteTeamMember: (id: number) => void;
  deleteTeamMembers: (ids: number[]) => void; // Bulk
  
  addFAQ: (f: any) => void;
  deleteFAQ: (id: number) => void;
  deleteFAQs: (ids: number[]) => void; // Bulk
  
  updateSettings: (newSettings: SiteSettings) => void;
  updateAboutData: (newData: AboutData) => void;
  
  notify: (message: string, type?: 'success' | 'error') => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Toast State
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Helper for localStorage persistence
  const usePersist = <T,>(key: string, initialValue: T) => {
    const [state, setState] = useState<T>(() => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(`Error loading ${key} from localStorage`, error);
        return initialValue;
      }
    });

    useEffect(() => {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.error(`Error saving ${key} to localStorage`, error);
      }
    }, [key, state]);

    return [state, setState] as const;
  };

  // Data States with Persistence
  const [inquiries, setInquiries] = usePersist<Inquiry[]>('mk_inquiries', [
    { id: 1, name: "Amit Patel", phone: "+91 9876543210", email: "amit@test.com", type: "Wedding", date: "2024-12-25", city: "Mumbai", status: "New", message: "Looking for full wedding planning." },
    { id: 2, name: "Sneha Roy", phone: "+91 9123456789", email: "sneha@test.com", type: "Birthday", date: "2024-11-15", city: "Pune", status: "Contacted", message: "Daughter's 1st birthday." },
    { id: 3, name: "John Doe", phone: "+91 9988776655", email: "john@corp.com", type: "Corporate", date: "2024-10-30", city: "Delhi", status: "Converted", message: "Annual tech meet." },
  ]);

  const [bookings, setBookings] = usePersist<Booking[]>('mk_bookings', [
    { id: 101, client: "Rajesh Kumar", event: "Wedding Reception", date: "2024-12-10", guests: 500, budget: "5L - 8L", status: "Quoted" },
    { id: 102, client: "Tech Solutions Inc", event: "Annual Gala", date: "2024-11-25", guests: 200, budget: "2L - 3L", status: "Confirmed" },
  ]);

  const [services, setServices] = usePersist<ServiceItem[]>('mk_services', SERVICES);
  const [gallery, setGallery] = usePersist<any[]>('mk_gallery', GALLERY_IMAGES);
  
  const [testimonials, setTestimonials] = usePersist<TestimonialItem[]>('mk_testimonials', 
    TESTIMONIALS.map(t => ({...t, status: 'Approved'}))
  );
  
  const [team, setTeam] = usePersist<TeamMember[]>('mk_team', [
    { id: 1, name: "Raj Malhotra", role: "Founder & Lead Planner", exp: "10 Years", photo: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: 2, name: "Simran Kaur", role: "Creative Director", exp: "8 Years", photo: "https://randomuser.me/api/portraits/women/2.jpg" },
  ]);

  const [faqs, setFaqs] = usePersist<FAQ[]>('mk_faqs', [
    { id: 1, q: "Do you travel outside the city?", a: "Yes, we handle destination weddings...", cat: "General" },
    { id: 2, q: "What is your booking policy?", a: "We require a 30% advance payment...", cat: "Booking" },
  ]);

  // Settings State
  const [settings, setSettings] = usePersist<SiteSettings>('mk_settings', {
    companyName: COMPANY_NAME,
    phone: PHONE_NUMBER,
    email: EMAIL_ADDRESS,
    address: ADDRESS,
    mapEmbed: '<iframe src="..."></iframe>',
    metaTitle: "M.K Event Management | Best Wedding Planner",
    metaDesc: "Premier event planning services for weddings, corporate events, and parties.",
    keywords: "wedding planner, event management, decoration, party planner",
    heroHeadline: COMPANY_NAME,
    heroSubHeadline: "Making Your Moments Memorable",
    heroBtn1: "Get Free Quote",
    heroBtn2: "WhatsApp Now"
  });

  // About Page State
  const [aboutData, setAboutData] = usePersist<AboutData>('mk_about', {
    headline: `About ${COMPANY_NAME}`,
    intro: "Founded with a passion for celebration and an eye for detail, M.K Event Management has grown to become one of the most trusted event management companies in the region.",
    vision: "To be the leading event management company known for innovation...",
    mission: "To create timeless memories for our clients by transforming ordinary spaces...",
    yearsExp: "5",
    eventsCount: "200",
    teamCount: "15",
    imageUrl: "https://picsum.photos/800/800?random=about"
  });

  // Helper for Toast
  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg: message, type });
  };

  // Actions
  const deleteInquiry = (id: number) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
    notify("Inquiry deleted successfully!");
  };

  const deleteInquiries = (ids: number[]) => {
    setInquiries(prev => prev.filter(i => !ids.includes(i.id)));
    notify(`${ids.length} inquiries deleted successfully!`);
  };

  const updateInquiryStatus = (id: number, status: string) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    notify(`Status updated to ${status}`);
  };

  const updateInquiry = (updatedInquiry: Inquiry) => {
    setInquiries(prev => prev.map(i => i.id === updatedInquiry.id ? updatedInquiry : i));
    notify("Inquiry details updated successfully!", "success");
  };

  const addBooking = (booking: Booking) => {
    const newBooking = { ...booking, id: booking.id || Date.now() };
    setBookings(prev => [...prev, newBooking]);
    notify("New booking created!");
  };

  const updateBooking = (updatedBooking: Booking) => {
    setBookings(prev => prev.map(b => b.id === updatedBooking.id ? updatedBooking : b));
    notify("Booking details updated successfully!", "success");
  };

  const updateBookingStatus = (id: number, status: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    notify(`Booking marked as ${status}`);
  };

  const addService = (service: ServiceItem) => {
    setServices(prev => [...prev, { ...service, id: service.id || `svc_${Date.now()}` }]);
    notify("Service added successfully!");
  };

  const updateService = (updatedService: ServiceItem) => {
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
    notify("Service updated successfully!", "success");
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => String(s.id) !== String(id)));
    notify("Service removed successfully!");
  };

  const deleteServices = (ids: string[]) => {
    setServices(prev => prev.filter(s => !ids.includes(s.id)));
    notify(`${ids.length} services deleted successfully!`);
  };

  const addGalleryImage = (img: any) => {
    setGallery(prev => [{ ...img, id: Date.now() }, ...prev]);
    notify("Image uploaded successfully!");
  };

  const deleteGalleryImage = (id: number) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    notify("Image deleted successfully!");
  };

  const deleteGalleryImages = (ids: number[]) => {
    setGallery(prev => prev.filter(g => !ids.includes(g.id)));
    notify(`${ids.length} images deleted successfully!`);
  };

  const addTestimonial = (t: any) => {
    setTestimonials(prev => [...prev, { ...t, id: Date.now(), status: 'Pending' }]);
    notify("Testimonial added! Status: Pending");
  };

  const updateTestimonialStatus = (id: number, status: 'Pending' | 'Approved' | 'Rejected') => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    notify(`Testimonial ${status}`);
  };

  const deleteTestimonial = (id: number) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    notify("Testimonial deleted!");
  };

  const deleteTestimonials = (ids: number[]) => {
    setTestimonials(prev => prev.filter(t => !ids.includes(t.id)));
    notify(`${ids.length} testimonials deleted successfully!`);
  };

  const addTeamMember = (m: any) => {
    setTeam(prev => [...prev, { ...m, id: Date.now() }]);
    notify("Team member added!");
  };

  const deleteTeamMember = (id: number) => {
    setTeam(prev => prev.filter(t => t.id !== id));
    notify("Team member removed!");
  };

  const deleteTeamMembers = (ids: number[]) => {
    setTeam(prev => prev.filter(t => !ids.includes(t.id)));
    notify(`${ids.length} team members removed!`);
  };

  const addFAQ = (f: any) => {
    setFaqs(prev => [...prev, { ...f, id: Date.now() }]);
    notify("FAQ added successfully!");
  };

  const deleteFAQ = (id: number) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    notify("FAQ deleted successfully!");
  };

  const deleteFAQs = (ids: number[]) => {
    setFaqs(prev => prev.filter(f => !ids.includes(f.id)));
    notify(`${ids.length} FAQs deleted successfully!`);
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    notify("Site settings saved successfully!");
  };

  const updateAboutData = (newData: AboutData) => {
    setAboutData(newData);
    notify("About page content updated!");
  };

  return (
    <AdminContext.Provider value={{
      inquiries, bookings, services, gallery, testimonials, team, faqs, settings, aboutData,
      deleteInquiry, deleteInquiries, updateInquiryStatus, updateInquiry, 
      addBooking, updateBooking, updateBookingStatus,
      addService, updateService, deleteService, deleteServices,
      addGalleryImage, deleteGalleryImage, deleteGalleryImages,
      addTestimonial, updateTestimonialStatus, deleteTestimonial, deleteTestimonials,
      addTeamMember, deleteTeamMember, deleteTeamMembers,
      addFAQ, deleteFAQ, deleteFAQs,
      updateSettings, updateAboutData, notify
    }}>
      {children}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};