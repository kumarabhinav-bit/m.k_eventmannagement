import React from 'react';
import SectionHeading from '../components/SectionHeading';
import { useAdmin } from '../context/AdminContext';
import { Check } from 'lucide-react';

const Services: React.FC = () => {
  const { services } = useAdmin();

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="All Services" subtitle="We Make It Happen" />
        
        {services.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
                <p className="text-xl">No services available at the moment.</p>
            </div>
        ) : (
            <div className="space-y-20">
            {services.map((service, index) => (
                <div 
                key={service.id} 
                className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                <div className="w-full lg:w-1/2">
                    <img 
                    src={service.image || `https://picsum.photos/800/600?random=${index + 50}`} 
                    alt={service.title} 
                    className="rounded-lg shadow-xl w-full object-cover h-80 lg:h-[400px]"
                    />
                </div>
                <div className="w-full lg:w-1/2">
                    <h3 className="font-serif text-3xl font-bold text-royal-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {service.fullDescription}
                    </p>
                    <div className="bg-gold-50 p-6 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-4 uppercase text-sm tracking-wide">What We Provide:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-700">
                            <span className="w-6 h-6 rounded-full bg-gold-200 flex items-center justify-center mr-3 text-gold-700 text-xs">
                            <Check size={14} />
                            </span>
                            {feature}
                        </li>
                        ))}
                    </ul>
                    </div>
                </div>
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Services;