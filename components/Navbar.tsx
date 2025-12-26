import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { useAdmin } from '../context/AdminContext';

const Navbar: React.FC = () => {
  const { settings } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-royal-900/90 py-4 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex flex-col">
          <span className={`font-serif text-2xl font-bold ${isScrolled ? 'text-maroon-900' : 'text-gold-500'}`}>
            {settings.companyName}
          </span>
          <span className={`text-xs tracking-widest uppercase ${isScrolled ? 'text-gray-600' : 'text-gray-300'}`}>
            Making Moments Memorable
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium uppercase tracking-wide hover:text-gold-500 transition-colors ${
                location.pathname === link.path
                  ? 'text-gold-500'
                  : isScrolled
                  ? 'text-gray-800'
                  : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href={`tel:${settings.phone}`}
            className="flex items-center px-4 py-2 bg-gold-600 text-white rounded hover:bg-gold-500 transition-colors"
          >
            <Phone size={16} className="mr-2" />
            <span>Call Now</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gold-500 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg">
          <div className="flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-6 py-3 border-b border-gray-100 hover:bg-gray-50 hover:text-gold-600 ${
                   location.pathname === link.path ? 'text-gold-600 font-semibold' : 'text-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
               href={`tel:${settings.phone}`}
               className="px-6 py-3 text-gold-600 font-semibold flex items-center"
            >
               <Phone size={18} className="mr-2" />
               {settings.phone}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;