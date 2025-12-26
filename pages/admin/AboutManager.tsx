import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AboutData } from '../../types';

const AdminAbout: React.FC = () => {
  const { aboutData, updateAboutData } = useAdmin();
  const [formData, setFormData] = useState<AboutData>(aboutData);

  useEffect(() => {
    setFormData(aboutData);
  }, [aboutData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    updateAboutData(formData);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">About Us Content</h1>
        <p className="text-sm text-gray-500">Edit your company history and vision</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
          <input 
            type="text" 
            name="headline"
            value={formData.headline} 
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500 focus:border-gold-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Main Introduction</label>
          <textarea 
            rows={4}
            name="intro"
            value={formData.intro}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500 focus:border-gold-500"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Our Vision</label>
            <textarea 
              rows={3}
              name="vision"
              value={formData.vision}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500 focus:border-gold-500"
            ></textarea>
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Our Mission</label>
            <textarea 
              rows={3}
              name="mission"
              value={formData.mission}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500 focus:border-gold-500"
            ></textarea>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
            <input type="text" name="yearsExp" value={formData.yearsExp} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Events</label>
            <input type="text" name="eventsCount" value={formData.eventsCount} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Members</label>
            <input type="text" name="teamCount" value={formData.teamCount} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">About Image URL</label>
            <input 
              type="text" 
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <div className="mt-2 h-40 w-40 bg-gray-100 rounded overflow-hidden">
                <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
           <button 
             onClick={handleUpdate}
             className="bg-gold-600 text-white px-6 py-2 rounded font-bold hover:bg-gold-700 flex items-center"
            >
              <Save size={18} className="mr-2" /> Update Content
           </button>
        </div>

      </div>
    </div>
  );
};

export default AdminAbout;