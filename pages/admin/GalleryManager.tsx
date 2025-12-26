import React, { useState, useRef } from 'react';
import { Upload, Trash2, CheckSquare, Square, X, Save, Image as ImageIcon, Plus } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AdminGallery: React.FC = () => {
  const { gallery, addGalleryImage, deleteGalleryImage, deleteGalleryImages } = useAdmin();
  const [filter, setFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    category: 'wedding',
    imageUrl: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredGallery = gallery.filter(img => filter === 'all' || img.category === filter);

  const openModal = () => {
    setNewItem({ title: '', category: 'wedding', imageUrl: '' });
    setIsModalOpen(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
          alert("File is too large! Please upload an image smaller than 2MB.");
          return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem(prev => ({
            ...prev,
            imageUrl: reader.result as string,
            title: prev.title || file.name.split('.')[0]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
      if (!newItem.imageUrl) {
          alert("Please upload an image.");
          return;
      }
      if (!newItem.title) {
          alert("Please enter a title.");
          return;
      }

      addGalleryImage({
          category: newItem.category,
          imageUrl: newItem.imageUrl,
          title: newItem.title
      });

      setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if(window.confirm('Remove this image?')) {
        deleteGalleryImage(id);
        setSelectedIds(prev => prev.filter(sid => sid !== id));
    }
  };

  const handleSelectedDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} selected images?`)) {
        deleteGalleryImages(selectedIds);
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gallery Manager</h1>
          <p className="text-sm text-gray-500">Manage your portfolio images</p>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
           {selectedIds.length > 0 && (
              <button 
                onClick={handleSelectedDelete}
                className="bg-red-600 text-white px-4 py-2 rounded flex items-center hover:bg-red-700 shadow-sm animate-fade-in"
              >
                <Trash2 size={18} className="mr-2" /> Delete ({selectedIds.length})
              </button>
           )}
           <select 
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday</option>
              <option value="corporate">Corporate</option>
           </select>
           <button 
             onClick={openModal}
             className="bg-gold-500 text-white px-4 py-2 rounded flex items-center hover:bg-gold-600 shadow-sm"
            >
             <Upload size={18} className="mr-2" /> Upload New
           </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredGallery.map((img) => (
          <div 
            key={img.id} 
            className={`group relative bg-white rounded-lg shadow-sm border overflow-hidden cursor-pointer transition-all ${
                selectedIds.includes(img.id) ? 'border-gold-500 ring-2 ring-gold-500' : 'border-gray-200'
            }`}
            onClick={() => toggleSelect(img.id)}
          >
            <div className="aspect-square relative">
              <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
              
              {/* Checkbox Overlay */}
              <div className={`absolute top-2 left-2 p-1 rounded bg-white shadow-sm z-10 ${selectedIds.includes(img.id) ? 'text-gold-600' : 'text-gray-400 opacity-70 group-hover:opacity-100'}`}>
                  {selectedIds.includes(img.id) ? <CheckSquare size={20} /> : <Square size={20} />}
              </div>

              {/* Action Buttons Overlay (prevent bubbling to select) */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDelete(img.id); }}
                  className="p-2 bg-white text-gray-800 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded uppercase">
                {img.category}
              </span>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-gray-800 truncate">{img.title}</p>
            </div>
          </div>
        ))}
        
        {/* Dropzone Placeholder - Opens Modal */}
        <div 
          onClick={openModal}
          className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center aspect-square text-gray-400 hover:bg-gray-50 hover:border-gold-400 hover:text-gold-500 cursor-pointer transition-colors"
        >
          <Upload size={32} className="mb-2" />
          <span className="text-sm font-medium">Upload New</span>
        </div>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-royal-900 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Upload Gallery Image</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Image Preview / Upload Area */}
              <div 
                className="w-full h-48 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer hover:border-gold-500 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {newItem.imageUrl ? (
                    <img src={newItem.imageUrl} alt="Preview" className="w-full h-full object-contain" />
                ) : (
                    <>
                        <ImageIcon size={32} className="text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Click to Select Image</span>
                    </>
                )}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Title</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500 focus:outline-none"
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  placeholder="e.g. Wedding Stage Decor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500 focus:outline-none"
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                >
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday</option>
                    <option value="corporate">Corporate</option>
                    <option value="other">Other</option>
                </select>
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
                  <Save size={18} className="mr-2" /> Save Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;