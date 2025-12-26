import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { useAdmin } from '../context/AdminContext';
import { X } from 'lucide-react';

const Gallery: React.FC = () => {
  const { gallery } = useAdmin();
  const [filter, setFilter] = useState<'all' | 'wedding' | 'birthday' | 'corporate'>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = filter === 'all' 
    ? gallery 
    : gallery.filter(img => img.category === filter);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'birthday', label: 'Birthdays' },
    { id: 'corporate', label: 'Corporate' },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeading title="Our Portfolio" subtitle="Glimpses of Perfection" />
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === cat.id 
                  ? 'bg-gold-500 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredImages.length === 0 ? (
                <div className="col-span-3 text-center text-gray-400 py-10">No images found for this category.</div>
            ) : (
                filteredImages.map((img) => (
                <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    key={img.id}
                    className="cursor-pointer group relative overflow-hidden rounded-lg shadow-md aspect-square bg-gray-200"
                    onClick={() => setSelectedImage(img.imageUrl)}
                >
                    <img 
                    src={img.imageUrl} 
                    alt={img.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <h3 className="text-white text-center font-serif text-xl">{img.title}</h3>
                    </div>
                </motion.div>
                ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-4 right-4 text-white hover:text-gold-500">
            <X size={40} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full view" 
            className="max-h-[90vh] max-w-full rounded shadow-2xl" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;