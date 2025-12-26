import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { useAdmin } from '../context/AdminContext';
import { CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  const { aboutData, settings } = useAdmin();

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={aboutData.imageUrl || "https://picsum.photos/800/800?random=about"} 
              alt="Team at work" 
              className="rounded-lg shadow-2xl w-full object-cover h-[500px]"
            />
          </motion.div>
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionHeading title={aboutData.headline} subtitle="Our Story" center={false} />
            <p className="text-gray-600 mb-6 leading-relaxed text-lg whitespace-pre-line">
              {aboutData.intro}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Creative Designers', 'Expert Planners', '24/7 Support', 'Vendor Network'].map((item) => (
                <div key={item} className="flex items-center">
                  <CheckCircle className="text-gold-500 mr-2" size={20} />
                  <span className="font-semibold text-gray-800">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4 border-t pt-8">
                <div className="text-center">
                    <span className="block text-3xl font-bold text-gold-600">{aboutData.yearsExp}+</span>
                    <span className="text-xs text-gray-500 uppercase">Years Exp.</span>
                </div>
                <div className="text-center border-l border-gray-200">
                    <span className="block text-3xl font-bold text-gold-600">{aboutData.eventsCount}+</span>
                    <span className="text-xs text-gray-500 uppercase">Events</span>
                </div>
                <div className="text-center border-l border-gray-200">
                    <span className="block text-3xl font-bold text-gold-600">{aboutData.teamCount}+</span>
                    <span className="text-xs text-gray-500 uppercase">Team Members</span>
                </div>
            </div>

          </motion.div>
        </div>

        {/* Vision/Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-12 text-center h-full">
                <h3 className="font-serif text-3xl font-bold text-royal-900 mb-6">Our Vision</h3>
                <p className="text-gray-600 mx-auto text-lg leading-relaxed">
                    "{aboutData.vision}"
                </p>
            </div>
            <div className="bg-gold-50 rounded-xl p-12 text-center h-full">
                <h3 className="font-serif text-3xl font-bold text-royal-900 mb-6">Our Mission</h3>
                <p className="text-gray-600 mx-auto text-lg leading-relaxed">
                    "{aboutData.mission}"
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;