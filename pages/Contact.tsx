import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ContactForm from '../components/ContactForm';
import { useAdmin } from '../context/AdminContext';

const Contact: React.FC = () => {
  const { settings } = useAdmin();

  return (
    <div className="pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeading title="Get In Touch" subtitle="Contact Us" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="bg-gold-100 p-3 rounded-full text-gold-600 mr-4">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                <a href={`tel:${settings.phone}`} className="text-gray-600 hover:text-gold-600 block">{settings.phone}</a>
                <p className="text-xs text-gray-400 mt-1">Mon-Sun 9am - 9pm</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="bg-gold-100 p-3 rounded-full text-gold-600 mr-4">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                <a href={`mailto:${settings.email}`} className="text-gray-600 hover:text-gold-600 block">{settings.email}</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="bg-gold-100 p-3 rounded-full text-gold-600 mr-4">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Office Address</h4>
                <p className="text-gray-600">{settings.address}</p>
              </div>
            </div>

             <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="bg-gold-100 p-3 rounded-full text-gold-600 mr-4">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Working Hours</h4>
                <p className="text-gray-600">Open 7 Days a Week</p>
                <p className="text-gray-600">09:00 AM - 09:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>

        {/* Map Placeholder or Embed */}
        <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-inner relative">
            {settings.mapEmbed && settings.mapEmbed.includes('<iframe') ? (
                <div dangerouslySetInnerHTML={{ __html: settings.mapEmbed }} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full" />
            ) : (
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.812467269176!2d72.82583331490104!3d19.07609098708785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1625567891234!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy"
                    title="Office Location"
                ></iframe>
            )}
        </div>
      </div>
    </div>
  );
};

export default Contact;