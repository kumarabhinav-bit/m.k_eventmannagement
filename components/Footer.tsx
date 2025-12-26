import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Lock } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { useAdmin } from '../context/AdminContext';

const Footer: React.FC = () => {
  const { settings } = useAdmin();

  return (
    <footer className="bg-royal-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-gold-500 mb-4">{settings.companyName}</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              We are a premier event management company dedicated to making your special moments unforgettable. From weddings to corporate galas, we handle it all with precision and style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gold-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-gold-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-gold-500 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-xl font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-300 hover:text-gold-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-serif text-xl font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-gold-500 mr-3 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-300">{settings.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-gold-500 mr-3 flex-shrink-0" size={18} />
                <a href={`tel:${settings.phone}`} className="text-gray-300 hover:text-white">{settings.phone}</a>
              </li>
              <li className="flex items-center">
                <Mail className="text-gold-500 mr-3 flex-shrink-0" size={18} />
                <a href={`mailto:${settings.email}`} className="text-gray-300 hover:text-white">{settings.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="bg-maroon-900 p-8 rounded-lg text-center md:flex md:justify-between md:items-center mb-12">
          <h3 className="font-serif text-2xl text-white mb-4 md:mb-0">
            Plan Your Event With {settings.companyName} Today!
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`tel:${settings.phone}`}
              className="bg-white text-maroon-900 px-6 py-3 rounded font-bold hover:bg-gray-100 transition-colors"
            >
              Call Now
            </a>
            <Link 
              to="/contact"
              className="bg-gold-500 text-white px-6 py-3 rounded font-bold hover:bg-gold-600 transition-colors"
            >
              Get Free Quote
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {settings.companyName}. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0">
             <Link to="/admin/login" className="flex items-center hover:text-white transition-colors">
               <Lock size={14} className="mr-1" /> Admin Login
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;