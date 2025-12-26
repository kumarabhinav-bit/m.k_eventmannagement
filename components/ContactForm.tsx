import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: 'Wedding',
    date: '',
    city: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry! We will contact you shortly.");
    setFormData({
      name: '',
      phone: '',
      type: 'Wedding',
      date: '',
      city: '',
      message: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-xl border-t-4 border-gold-500">
      <h3 className="font-serif text-2xl font-bold text-gray-800 mb-6 text-center">Get A Free Quote</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none"
            placeholder="Your Mobile No."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none"
          >
            <option value="Wedding">Wedding</option>
            <option value="Birthday">Birthday Party</option>
            <option value="Corporate">Corporate Event</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">City/Venue Location</label>
        <input
          type="text"
          name="city"
          required
          value={formData.city}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none"
          placeholder="e.g. Mumbai, Delhi"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none"
          placeholder="Tell us more about your requirements..."
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-gold-600 text-white font-bold py-3 rounded hover:bg-gold-700 transition-colors uppercase tracking-wider"
      >
        Submit Inquiry
      </button>
    </form>
  );
};

export default ContactForm;