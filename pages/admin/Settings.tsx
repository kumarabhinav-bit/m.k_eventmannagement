import React, { useState, useEffect } from 'react';
import { Save, Globe, Phone, FileText, User, Bell } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { SiteSettings } from '../../types';

const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useAdmin();
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState<SiteSettings>(settings);

  // Sync with context if it changes
  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
      updateSettings(formData);
  };

  const tabs = [
    { id: 'contact', label: 'Contact Info', icon: <Phone size={18} /> },
    { id: 'seo', label: 'SEO & Meta', icon: <Globe size={18} /> },
    { id: 'hero', label: 'Hero Banner', icon: <FileText size={18} /> },
    { id: 'users', label: 'Admin Users', icon: <User size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-500">Manage website configuration and administration</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors border-l-4 ${
                  activeTab === tab.id
                    ? 'border-gold-500 bg-gold-50 text-gold-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-gold-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-gold-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-gold-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-gold-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Embed Code</label>
                <textarea rows={3} name="mapEmbed" value={formData.mapEmbed} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded font-mono text-xs focus:ring-gold-500 focus:outline-none"></textarea>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">SEO Configuration</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Global Meta Title</label>
                <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-gold-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Global Meta Description</label>
                <textarea rows={3} name="metaDesc" value={formData.metaDesc} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-gold-500 focus:outline-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (Comma separated)</label>
                <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-gold-500 focus:outline-none" />
              </div>
            </div>
          )}
          
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Home Page Banner</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main Headline</label>
                <input type="text" name="heroHeadline" value={formData.heroHeadline} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-gold-500 focus:outline-none" />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sub Headline</label>
                <input type="text" name="heroSubHeadline" value={formData.heroSubHeadline} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-gold-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button 1 Text</label>
                  <input type="text" name="heroBtn1" value={formData.heroBtn1} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-gold-500 focus:outline-none" />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button 2 Text</label>
                  <input type="text" name="heroBtn2" value={formData.heroBtn2} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-gold-500 focus:outline-none" />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
             <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Email Alerts for New Inquiries</span>
                  <input type="checkbox" defaultChecked className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Email Alerts for New Bookings</span>
                  <input type="checkbox" defaultChecked className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Weekly Performance Report</span>
                  <input type="checkbox" className="toggle" />
                </div>
              </div>
             </div>
          )}

          <div className="mt-8 pt-4 border-t flex justify-end">
            <button 
              onClick={handleSave}
              className="bg-gold-600 text-white px-6 py-2 rounded font-bold hover:bg-gold-700 flex items-center"
            >
              <Save size={18} className="mr-2" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;