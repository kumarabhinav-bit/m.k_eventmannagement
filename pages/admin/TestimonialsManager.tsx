import React, { useState } from 'react';
import { Plus, Check, X, Trash2, Star, CheckSquare, Square, MinusSquare } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AdminTestimonials: React.FC = () => {
  const { testimonials, deleteTestimonial, deleteTestimonials, updateTestimonialStatus, addTestimonial } = useAdmin();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleAddMock = () => {
      addTestimonial({
          name: "New Client",
          role: "Customer",
          location: "India",
          rating: 5,
          text: "Excellent service provided by the team!",
          image: `https://picsum.photos/100/100?random=${Date.now()}`
      });
  };

  const handleDelete = (id: number) => {
      if(window.confirm("Delete this testimonial?")) {
          deleteTestimonial(id);
          setSelectedIds(prev => prev.filter(sid => sid !== id));
      }
  };

  const handleSelectedDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} selected reviews?`)) {
        deleteTestimonials(selectedIds);
        setSelectedIds([]);
    }
  };

  const toggleSelectAll = () => {
      if (selectedIds.length === testimonials.length && testimonials.length > 0) {
          setSelectedIds([]);
      } else {
          setSelectedIds(testimonials.map(t => t.id));
      }
  };

  const toggleSelect = (id: number) => {
      if (selectedIds.includes(id)) {
          setSelectedIds(prev => prev.filter(sid => sid !== id));
      } else {
          setSelectedIds(prev => [...prev, id]);
      }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Testimonials Manager</h1>
        <div className="flex gap-3">
            {selectedIds.length > 0 && (
              <button 
                onClick={handleSelectedDelete}
                className="bg-red-600 text-white px-4 py-2 rounded flex items-center hover:bg-red-700 shadow-sm animate-fade-in"
              >
                <Trash2 size={18} className="mr-2" /> Delete ({selectedIds.length})
              </button>
            )}
            <button 
              onClick={handleAddMock}
              className="bg-royal-900 text-white px-4 py-2 rounded flex items-center hover:bg-royal-800"
            >
              <Plus size={18} className="mr-2" /> Add Review Manually
            </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left w-12">
                <button onClick={toggleSelectAll} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    {testimonials.length > 0 && selectedIds.length === testimonials.length ? (
                        <CheckSquare size={20} />
                    ) : selectedIds.length > 0 ? (
                        <MinusSquare size={20} />
                    ) : (
                        <Square size={20} />
                    )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testimonials.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-6 text-gray-500">No testimonials found.</td></tr>
            ) : (
                testimonials.map((t) => (
                <tr key={t.id} className={`${t.status === 'Pending' ? 'bg-yellow-50' : ''} ${selectedIds.includes(t.id) ? 'bg-blue-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <button onClick={() => toggleSelect(t.id)} className={`focus:outline-none ${selectedIds.includes(t.id) ? 'text-gold-600' : 'text-gray-300 hover:text-gray-500'}`}>
                            {selectedIds.includes(t.id) ? <CheckSquare size={20} /> : <Square size={20} />}
                        </button>
                    </td>
                    <td className="px-6 py-4">
                    <div className="flex items-center">
                        {t.image ? (
                        <img className="h-10 w-10 rounded-full mr-3 object-cover" src={t.image} alt="" />
                        ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center font-bold text-gray-500">
                            {t.name.charAt(0)}
                        </div>
                        )}
                        <div>
                        <div className="text-sm font-medium text-gray-900">{t.name}</div>
                        <div className="text-sm text-gray-500">{t.role} • {t.location}</div>
                        </div>
                    </div>
                    </td>
                    <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{t.text}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-yellow-400">
                        <span className="mr-1 text-gray-900 font-bold">{t.rating}</span> <Star size={14} fill="currentColor" />
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        t.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                        t.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                        {t.status}
                    </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {t.status !== 'Approved' && (
                        <button onClick={() => updateTestimonialStatus(t.id, 'Approved')} className="text-gray-400 hover:text-green-600 mx-1" title="Approve"><Check size={18} /></button>
                    )}
                    {t.status !== 'Rejected' && (
                        <button onClick={() => updateTestimonialStatus(t.id, 'Rejected')} className="text-gray-400 hover:text-red-600 mx-1" title="Reject"><X size={18} /></button>
                    )}
                    <button onClick={() => handleDelete(t.id)} className="text-gray-400 hover:text-red-800 mx-1" title="Delete"><Trash2 size={18} /></button>
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTestimonials;