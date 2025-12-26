import React, { useState } from 'react';
import { Search, Download, Trash2, CheckCircle, Edit2, Save, X, CheckSquare, Square, MinusSquare } from 'lucide-react';
import { useAdmin, Inquiry } from '../../context/AdminContext';

const AdminInquiries: React.FC = () => {
  const { inquiries, deleteInquiry, deleteInquiries, updateInquiryStatus, updateInquiry, notify } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInquiry, setCurrentInquiry] = useState<Inquiry | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filteredInquiries = inquiries.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'New' ? 'Contacted' : 'Converted';
    updateInquiryStatus(id, newStatus);
  };

  const handleDelete = (id: number) => {
    if(window.confirm('Are you sure you want to delete this inquiry?')) {
        deleteInquiry(id);
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(sid => sid !== id));
        }
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} selected inquiries?`)) {
        deleteInquiries(selectedIds);
        setSelectedIds([]);
    }
  };

  const toggleSelectAll = () => {
      if (selectedIds.length === filteredInquiries.length && filteredInquiries.length > 0) {
          setSelectedIds([]);
      } else {
          setSelectedIds(filteredInquiries.map(i => i.id));
      }
  };

  const toggleSelect = (id: number) => {
      if (selectedIds.includes(id)) {
          setSelectedIds(prev => prev.filter(sid => sid !== id));
      } else {
          setSelectedIds(prev => [...prev, id]);
      }
  };

  const openEditModal = (inquiry: Inquiry) => {
    setCurrentInquiry({ ...inquiry });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (currentInquiry) {
        updateInquiry(currentInquiry);
        setIsModalOpen(false);
        setCurrentInquiry(null);
    }
  };

  const handleExport = () => {
    if (filteredInquiries.length === 0) {
      notify("No data to export.", "error");
      return;
    }

    // Convert data to CSV
    const headers = Object.keys(filteredInquiries[0]).join(',');
    const rows = filteredInquiries.map(obj => 
      Object.values(obj).map(val => {
        const str = (val === null || val === undefined) ? '' : String(val);
        // Escape quotes and wrap in quotes to handle commas/newlines
        return `"${str.replace(/"/g, '""')}"`;
      }).join(',')
    );
    const csvContent = [headers, ...rows].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `inquiries_list_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    notify("Inquiries exported successfully!", "success");
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Inquiries & Leads</h1>
        <div className="flex space-x-3 w-full md:w-auto">
          {selectedIds.length > 0 && (
              <button 
                onClick={handleBulkDelete}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors animate-fade-in shadow-sm"
              >
                  <Trash2 size={18} className="mr-2" /> Delete ({selectedIds.length})
              </button>
          )}
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-gold-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700" 
            onClick={handleExport}
          >
            <Download size={18} className="mr-2" /> Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left w-12">
                    <button onClick={toggleSelectAll} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        {filteredInquiries.length > 0 && selectedIds.length === filteredInquiries.length ? (
                            <CheckSquare size={20} />
                        ) : selectedIds.length > 0 ? (
                            <MinusSquare size={20} />
                        ) : (
                            <Square size={20} />
                        )}
                    </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No inquiries found.</td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id} className={`hover:bg-gray-50 transition-colors ${selectedIds.includes(inq.id) ? 'bg-blue-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <button onClick={() => toggleSelect(inq.id)} className={`focus:outline-none ${selectedIds.includes(inq.id) ? 'text-gold-600' : 'text-gray-300 hover:text-gray-500'}`}>
                            {selectedIds.includes(inq.id) ? <CheckSquare size={20} /> : <Square size={20} />}
                        </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{inq.name}</div>
                      <div className="text-sm text-gray-500">{inq.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{inq.phone}</div>
                      <div className="text-sm text-gray-500">{inq.city}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 mb-1">
                        {inq.type}
                      </span>
                      <div className="text-sm text-gray-500">{inq.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => handleStatusChange(inq.id, inq.status)}
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer hover:opacity-80 ${
                        inq.status === 'New' ? 'bg-blue-100 text-blue-800' :
                        inq.status === 'Converted' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {inq.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                         onClick={() => openEditModal(inq)}
                         className="text-gray-400 hover:text-blue-600 mx-1" 
                         title="Edit"
                      >
                         <Edit2 size={18} />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-green-600 mx-1" 
                        title="Mark as Next Status"
                        onClick={() => handleStatusChange(inq.id, inq.status)}
                      >
                          <CheckCircle size={18} />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-red-600 mx-1" 
                        title="Delete"
                        onClick={() => handleDelete(inq.id)}
                      >
                          <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

       {/* Edit Modal */}
       {isModalOpen && currentInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
            <div className="bg-royal-900 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Edit Inquiry Details</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500"
                      value={currentInquiry.name}
                      onChange={(e) => setCurrentInquiry({...currentInquiry, name: e.target.value})}
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500"
                      value={currentInquiry.phone}
                      onChange={(e) => setCurrentInquiry({...currentInquiry, phone: e.target.value})}
                    />
                  </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500"
                  value={currentInquiry.email}
                  onChange={(e) => setCurrentInquiry({...currentInquiry, email: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                    <select
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500"
                        value={currentInquiry.type}
                        onChange={(e) => setCurrentInquiry({...currentInquiry, type: e.target.value})}
                    >
                        <option value="Wedding">Wedding</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Other">Other</option>
                    </select>
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                    <input 
                      type="date" 
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500"
                      value={currentInquiry.date}
                      onChange={(e) => setCurrentInquiry({...currentInquiry, date: e.target.value})}
                    />
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500"
                      value={currentInquiry.city}
                      onChange={(e) => setCurrentInquiry({...currentInquiry, city: e.target.value})}
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500"
                        value={currentInquiry.status}
                        onChange={(e) => setCurrentInquiry({...currentInquiry, status: e.target.value})}
                    >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                        <option value="Lost">Lost</option>
                    </select>
                  </div>
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message / Notes</label>
                  <textarea 
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500"
                    value={currentInquiry.message || ''}
                    onChange={(e) => setCurrentInquiry({...currentInquiry, message: e.target.value})}
                    placeholder="User message or admin notes..."
                  ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-2">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2 bg-gold-600 text-white rounded font-bold hover:bg-gold-700 flex items-center"
                >
                  <Save size={18} className="mr-2" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;