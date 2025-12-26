import React, { useState, useRef } from 'react';
import { Plus, Edit2, Trash, Check, X, Save, Image as ImageIcon, CheckSquare, Square, Trash2, Upload } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { ServiceItem } from '../../types';

const AdminServices: React.FC = () => {
  const { services, addService, updateService, deleteService, deleteServices } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<ServiceItem> | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emptyService: Partial<ServiceItem> = {
    id: '',
    title: '',
    shortDescription: '',
    fullDescription: '',
    features: [],
    iconName: 'Award',
    image: '',
    category: 'General'
  };

  const openCreateModal = () => {
    setCurrentService({ ...emptyService });
    setIsModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setCurrentService({ ...service });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
        deleteService(id);
        setSelectedIds(prev => prev.filter(sid => sid !== id));
    }
  };

  const handleSelectedDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Are you sure you want to delete the ${selectedIds.length} selected service(s)?`)) {
        deleteServices(selectedIds);
        setSelectedIds([]);
    }
  };

  const toggleSelect = (id: string) => {
      if (selectedIds.includes(id)) {
          setSelectedIds(prev => prev.filter(sid => sid !== id));
      } else {
          setSelectedIds(prev => [...prev, id]);
      }
  };

  const handleSave = () => {
    if (!currentService || !currentService.title) {
        alert("Service Title is required!");
        return;
    }

    const serviceToSave = {
        ...currentService,
        features: Array.isArray(currentService.features) ? currentService.features : [],
        // If ID exists, keep it, else generate one
        id: currentService.id || `svc_${Date.now()}`
    } as ServiceItem;

    if (currentService.id) {
        updateService(serviceToSave);
    } else {
        addService(serviceToSave);
    }

    setIsModalOpen(false);
    setCurrentService(null);
  };

  const handleFeatureChange = (text: string) => {
      if (currentService) {
          setCurrentService({
              ...currentService,
              features: text.split(',').map(f => f.trim()).filter(f => f !== '')
          });
      }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Limit file size to 2MB to prevent LocalStorage issues
      if (file.size > 2 * 1024 * 1024) {
        alert("File size too large. Please upload an image smaller than 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (currentService) {
          setCurrentService({ ...currentService, image: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Services Manager</h1>
           <p className="text-sm text-gray-500">Manage your service offerings</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto items-center">
            {/* Selected Count Indicator */}
            {selectedIds.length > 0 && (
                <span className="text-sm text-gray-600 font-medium hidden md:block">
                    {selectedIds.length} Selected
                </span>
            )}

            {/* Delete Selected Button */}
            {selectedIds.length > 0 && (
              <button 
                onClick={handleSelectedDelete}
                className="bg-red-600 text-white px-4 py-2 rounded flex items-center hover:bg-red-700 shadow-sm animate-fade-in transition-all"
              >
                <Trash2 size={18} className="mr-2" /> Delete Selected
              </button>
            )}

            <button 
              onClick={openCreateModal}
              className="bg-royal-900 text-white px-4 py-2 rounded flex items-center hover:bg-royal-800 ml-auto md:ml-0"
            >
              <Plus size={18} className="mr-2" /> Add New
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {services.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">No services found. Add one to get started.</p>
            </div>
        ) : (
            services.map((service) => (
            <div 
                key={service.id} 
                className={`bg-white rounded-lg shadow-sm border p-6 flex flex-col md:flex-row gap-6 transition-all ${
                    selectedIds.includes(service.id) ? 'border-gold-500 ring-1 ring-gold-500 bg-gold-50/10' : 'border-gray-200'
                }`}
            >
                {/* Mobile Selection Header */}
                <div className="md:hidden flex justify-between items-center mb-2 w-full">
                     <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select to delete</span>
                     <button onClick={() => toggleSelect(service.id)} className="text-gray-500 p-1">
                        {selectedIds.includes(service.id) ? <CheckSquare size={24} className="text-gold-600" /> : <Square size={24} />}
                     </button>
                </div>

                <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden relative group cursor-pointer" onClick={() => toggleSelect(service.id)}>
                {service.image ? (
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <ImageIcon size={32} />
                    </div>
                )}
                {/* Desktop Overlay Checkbox */}
                <div className={`absolute top-2 left-2 bg-white rounded shadow-sm p-1 hidden md:block ${selectedIds.includes(service.id) ? 'text-gold-600' : 'text-gray-400'}`}>
                    {selectedIds.includes(service.id) ? <CheckSquare size={20} /> : <Square size={20} />}
                </div>
                </div>
                
                <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 cursor-pointer hover:text-gold-600" onClick={() => openEditModal(service)}>{service.title}</h3>
                        <span className="text-xs bg-gold-100 text-gold-800 px-2 py-0.5 rounded-full">{service.category || 'General'}</span>
                    </div>
                    <div className="flex space-x-2">
                    <button 
                        type="button"
                        onClick={() => openEditModal(service)}
                        className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50" 
                        title="Edit"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button 
                        type="button"
                        className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50" 
                        title="Delete"
                        onClick={() => handleDelete(service.id)}
                        >
                        <Trash size={18} />
                    </button>
                    </div>
                </div>
                <p className="text-gray-500 text-sm mt-2 mb-2 italic">{service.shortDescription}</p>
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">{service.fullDescription}</p>
                
                <div className="flex flex-wrap gap-2">
                    {service.features.map((f: string, i: number) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center">
                        <Check size={12} className="mr-1 text-green-500" /> {f}
                    </span>
                    ))}
                </div>
                </div>
            </div>
            ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && currentService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-royal-900 text-white p-4 flex justify-between items-center flex-shrink-0">
              <h3 className="font-bold text-lg">{currentService.id ? 'Edit Service' : 'Add New Service'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500"
                      value={currentService.title}
                      onChange={(e) => setCurrentService({...currentService, title: e.target.value})}
                      placeholder="e.g. Wedding Planning"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500"
                        value={currentService.category}
                        onChange={(e) => setCurrentService({...currentService, category: e.target.value})}
                    >
                        <option value="General">General</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Decoration">Decoration</option>
                        <option value="Party">Party</option>
                        <option value="Catering">Catering</option>
                    </select>
                  </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500"
                    value={currentService.shortDescription}
                    onChange={(e) => setCurrentService({...currentService, shortDescription: e.target.value})}
                    placeholder="One line summary..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description (Long)</label>
                <textarea 
                    rows={4}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500"
                    value={currentService.fullDescription}
                    onChange={(e) => setCurrentService({...currentService, fullDescription: e.target.value})}
                    placeholder="Detailed explanation of the service..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Image</label>
                
                {/* File Upload Input */}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*"
                />

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:ring-gold-500 text-sm"
                            value={currentService.image}
                            onChange={(e) => setCurrentService({...currentService, image: e.target.value})}
                            placeholder="Paste URL or upload image ->"
                        />
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-gold-100 text-gold-700 px-3 py-2 rounded hover:bg-gold-200 border border-gold-300 flex items-center whitespace-nowrap"
                        >
                            <Upload size={16} className="mr-2" /> Upload
                        </button>
                    </div>
                    
                    <p className="text-xs text-gray-500">Max file size: 2MB. Image will be saved locally.</p>
                </div>

                {currentService.image && (
                    <div className="mt-2 h-40 w-full bg-gray-100 rounded overflow-hidden relative border border-gray-200">
                        <img src={currentService.image} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                            onClick={() => setCurrentService({...currentService, image: ''})}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 shadow-sm"
                            title="Remove Image"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features (Comma Separated)</label>
                <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500"
                    defaultValue={currentService.features?.join(', ')}
                    onBlur={(e) => handleFeatureChange(e.target.value)}
                    placeholder="Venue Selection, Decor, Catering..."
                />
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0 bg-gray-50">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2 bg-gold-600 text-white rounded font-bold hover:bg-gold-700 flex items-center"
                >
                  <Save size={18} className="mr-2" /> Save Service
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;