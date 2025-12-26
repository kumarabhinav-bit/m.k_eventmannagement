import React, { useState } from 'react';
import { Plus, Edit, Trash, HelpCircle, CheckSquare, Square, Trash2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AdminFAQ: React.FC = () => {
  const { faqs, addFAQ, deleteFAQ, deleteFAQs } = useAdmin();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleAdd = () => {
      addFAQ({
          q: "New Question?",
          a: "Answer here.",
          cat: "General"
      });
  };

  const handleDelete = (id: number) => {
      if(window.confirm("Delete FAQ?")) {
          deleteFAQ(id);
          setSelectedIds(prev => prev.filter(sid => sid !== id));
      }
  };

  const handleSelectedDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} FAQs?`)) {
        deleteFAQs(selectedIds);
        setSelectedIds([]);
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
        <h1 className="text-2xl font-bold text-gray-800">FAQ Manager</h1>
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
            onClick={handleAdd}
            className="bg-gold-500 text-white px-4 py-2 rounded flex items-center hover:bg-gold-600 shadow-sm"
            >
            <Plus size={18} className="mr-2" /> Add Question
            </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-100">
        {faqs.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No FAQs available.</p>
        ) : (
            faqs.map((faq) => (
            <div 
                key={faq.id} 
                className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${selectedIds.includes(faq.id) ? 'bg-blue-50' : ''}`}
                onClick={() => toggleSelect(faq.id)}
            >
                <div className="flex justify-between items-start">
                <div className="flex items-start">
                    <div className="mt-1 mr-4 text-gray-400 hover:text-gold-600" onClick={(e) => { e.stopPropagation(); toggleSelect(faq.id); }}>
                        {selectedIds.includes(faq.id) ? <CheckSquare size={22} className="text-gold-600" /> : <Square size={22} />}
                    </div>
                    <div className="mt-1 mr-4 text-gold-500 hidden md:block">
                        <HelpCircle size={20} />
                    </div>
                    <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{faq.q}</h3>
                    <p className="text-gray-600">{faq.a}</p>
                    <span className="inline-block mt-3 text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                        {faq.cat}
                    </span>
                    </div>
                </div>
                <div className="flex space-x-2 ml-4">
                    <button 
                        onClick={(e) => e.stopPropagation()} 
                        className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"
                        title="Edit (Mock)"
                    >
                        <Edit size={18} />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(faq.id); }}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
                        title="Delete"
                    >
                        <Trash size={18} />
                    </button>
                </div>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
};

export default AdminFAQ;