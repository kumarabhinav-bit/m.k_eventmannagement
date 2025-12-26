import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Users, Wallet, Palette, Clock, Heart, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ContactForm from '../components/ContactForm';
import { FEATURES } from '../constants';
import { useAdmin } from '../context/AdminContext';

const Home: React.FC = () => {
  // Use data from Admin Context
  const { services, gallery, testimonials, settings } = useAdmin();

  const iconMap: Record<string, React.ReactNode> = {
    Award: <Award size={32} />,
    Users: <Users size={32} />,
    Wallet: <Wallet size={32} />,
    Palette: <Palette size={32} />,
    Clock: <Clock size={32} />,
    Heart: <Heart size={32} />,
  };

  // Safe slicing for preview sections
  const previewGallery = gallery.slice(0, 6);
  const previewServices = services.slice(0, 3);
  const previewTestimonials = testimonials.filter(t => t.status === 'Approved').slice(0, 3);

  // Derive WhatsApp number from settings phone
  const whatsappNumber = settings.phone.replace(/[^0-9]/g, '');

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://picsum.photos/1920/1080?grayscale&blur=2")' }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {settings.heroHeadline} <br />
            <span className="text-gold-500 text-3xl md:text-5xl">{settings.heroSubHeadline}</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-10 tracking-wide font-light">
            Weddings • Birthdays • Corporate Events • Decorations
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact"
              className="bg-gold-500 text-white px-8 py-4 rounded font-bold text-lg hover:bg-gold-600 transition-colors uppercase tracking-widest"
            >
              {settings.heroBtn1 || "Get Free Quote"}
            </Link>
            <a 
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded font-bold text-lg hover:bg-white hover:text-black transition-colors uppercase tracking-widest"
            >
              {settings.heroBtn2 || "WhatsApp Now"}
            </a>
          </div>
        </motion.div>
      </section>

      {/* 2. Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading title="Why Choose Us" subtitle="Excellence in Every Detail" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="p-8 border border-gray-100 rounded-xl shadow-lg bg-white hover:border-gold-200 transition-all text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-50 text-gold-600 rounded-full mb-6 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                  {iconMap[feature.iconName] || <Award size={32} />}
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading title="Our Premium Services" subtitle="What We Offer" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {previewServices.map((service) => (
              <div key={service.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                   <img 
                    src={service.image || `https://picsum.photos/600/400?random=${service.id}`} 
                    alt={service.title} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-white font-serif text-xl font-bold">{service.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">{service.shortDescription}</p>
                  <Link to="/services" className="text-gold-600 font-semibold hover:text-gold-800 flex items-center text-sm">
                    Read More <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
              <Link to="/services" className="text-gray-900 font-bold border-b-2 border-gold-500 hover:text-gold-600 transition-colors">
                  View All Services
              </Link>
          </div>
        </div>
      </section>

      {/* 4. Portfolio Preview */}
      <section className="py-20 bg-royal-900 text-white">
        <div className="container mx-auto px-4">
          <SectionHeading title="Our Latest Work" subtitle="Gallery" center light />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {previewGallery.map((img) => (
              <div key={img.id} className="relative group overflow-hidden rounded-lg aspect-[4/3]">
                <img 
                  src={img.imageUrl} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-serif text-xl">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link 
              to="/gallery" 
              className="inline-block px-8 py-3 border border-gold-500 text-gold-500 rounded hover:bg-gold-500 hover:text-white transition-colors font-semibold"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading title="Client Love" subtitle="Testimonials" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {previewTestimonials.length > 0 ? previewTestimonials.map((t) => (
              <div key={t.id} className="bg-gray-50 p-8 rounded-xl relative">
                <div className="text-gold-400 text-6xl font-serif absolute top-4 right-6 opacity-20">"</div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xl ${i < t.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic line-clamp-4">{t.text}</p>
                <div className="flex items-center">
                  {t.image && (
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                  )}
                  <div>
                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">{t.role} • {t.location}</span>
                  </div>
                </div>
              </div>
            )) : (
                <div className="col-span-3 text-center text-gray-500">No testimonials yet.</div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Lead Form Section */}
      <section className="py-20 bg-gray-100 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading title="Let's Plan Your Next Event" subtitle="Contact Us" center={false} />
              <p className="text-gray-600 mb-8 text-lg">
                Ready to create memories? Fill out the form or contact us directly. Our team is eager to assist you with customized packages.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center p-4 bg-white rounded shadow-sm">
                  <div className="w-12 h-12 bg-gold-100 flex items-center justify-center rounded-full text-gold-600 mr-4">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">Dedicated Planner</h5>
                    <p className="text-sm text-gray-500">One point of contact for everything.</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded shadow-sm">
                  <div className="w-12 h-12 bg-gold-100 flex items-center justify-center rounded-full text-gold-600 mr-4">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">Transparent Pricing</h5>
                    <p className="text-sm text-gray-500">No hidden charges, ever.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;