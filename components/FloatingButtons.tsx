import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const FloatingButtons: React.FC = () => {
  const { settings } = useAdmin();
  
  // Extract digits for WhatsApp link
  const whatsappNumber = settings.phone.replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hi, I am interested in your event services.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 text-white"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

      {/* Call Button (Mobile primary, desktop visible too) */}
      <a
        href={`tel:${settings.phone}`}
        className="flex items-center justify-center w-14 h-14 bg-gold-600 rounded-full shadow-lg hover:bg-gold-500 transition-all hover:scale-110 text-white animate-bounce-slow"
        aria-label="Call Now"
      >
        <Phone size={24} />
      </a>
    </div>
  );
};

export default FloatingButtons;