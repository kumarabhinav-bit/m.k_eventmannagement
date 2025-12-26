import React from 'react';
import SectionHeading from '../components/SectionHeading';
import { useAdmin } from '../context/AdminContext';

const Testimonials: React.FC = () => {
  const { testimonials } = useAdmin();
  
  // Show only approved reviews
  const approvedTestimonials = testimonials.filter(t => t.status === 'Approved');

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="What Clients Say" subtitle="Reviews" />
        
        {approvedTestimonials.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
                <p>No reviews yet.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approvedTestimonials.map((t) => (
                <div key={t.id} className="bg-white border border-gray-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
                <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xl ${i < t.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                    ))}
                </div>
                <p className="text-gray-600 mb-6 italic flex-grow leading-relaxed">"{t.text}"</p>
                <div className="flex items-center border-t border-gray-100 pt-6">
                    {t.image && (
                    <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-gold-200" />
                    )}
                    <div>
                    <h4 className="font-bold text-gray-900 font-serif">{t.name}</h4>
                    <p className="text-xs text-gold-600 uppercase tracking-wide font-semibold">{t.role}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>
        )}

         {/* Call to action */}
         <div className="mt-16 bg-royal-900 text-white p-8 rounded-xl shadow-lg flex flex-col justify-center items-center text-center max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl font-bold mb-4">Your Feedback Matters</h3>
            <p className="text-gray-300 mb-6">Have you planned an event with us? We'd love to hear your story.</p>
            <button className="bg-gold-500 px-6 py-2 rounded text-white font-bold hover:bg-gold-600 transition-colors">
            Write a Review
            </button>
         </div>
      </div>
    </div>
  );
};

export default Testimonials;