import React, { useState } from 'react';
import { MoreVertical, Calendar, User, DollarSign, X, Save, Plus } from 'lucide-react';
import { useAdmin, Booking } from '../../context/AdminContext';

const AdminBookings: React.FC = () => {
  const { bookings, addBooking, updateBooking, updateBookingStatus } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  // Initialize empty booking for creation
  const emptyBooking: Booking = {
    id: 0,
    client: '',
    event: '',
    date: new Date().toISOString().split('T')[0],
    guests: 0,
    budget: '',
    status: 'Quoted'
  };

  const openCreateModal = () => {
    setCurrentBooking({ ...emptyBooking });
    setIsModalOpen(true);
  };

  const openEditModal = (booking: Booking) => {
    setCurrentBooking({ ...booking });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!currentBooking) return;

    // Validation
    if (!currentBooking.client || !currentBooking.event) {
        alert("Please fill in required fields");
        return;
    }

    if (currentBooking.id === 0) {
        // Create
        addBooking(currentBooking);
    } else {
        // Update
        updateBooking(currentBooking);
    }
    setIsModalOpen(false);
    setCurrentBooking(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Booking Requests</h1>
        <button 
          onClick={openCreateModal}
          className="bg-gold-500 text-white px-4 py-2 rounded shadow hover:bg-gold-600 flex items-center"
        >
          <Plus size={18} className="mr-2" /> Create Booking
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <button 
                  onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                  className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide cursor-pointer ${
                  booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                  booking.status === 'Completed' ? 'bg-gray-100 text-gray-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {booking.status}
                </button>
              </div>
              <button onClick={() => openEditModal(booking)} className="text-gray-400 hover:text-gold-600">
                <MoreVertical size={20} />
              </button>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-1">{booking.event}</h3>
            
            <div className="space-y-3 mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <User size={16} className="mr-3 text-gold-500" />
                <span className="font-medium">{booking.client}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={16} className="mr-3 text-gold-500" />
                {booking.date}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <User size={16} className="mr-3 text-gold-500" />
                {booking.guests} Guests
              </div>
               <div className="flex items-center text-sm text-gray-600">
                <DollarSign size={16} className="mr-3 text-gold-500" />
                {booking.budget}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-royal-900 text-white text-sm rounded hover:bg-royal-800">
                View Details
              </button>
              <button 
                onClick={() => openEditModal(booking)}
                className="px-3 py-2 border border-gray-200 text-gray-600 rounded hover:bg-gray-50 text-sm"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && currentBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
            <div className="bg-royal-900 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">{currentBooking.id === 0 ? 'Create New Booking' : 'Edit Booking Details'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500 focus:border-gold-500"
                  value={currentBooking.client}
                  onChange={(e) => setCurrentBooking({...currentBooking, client: e.target.value})}
                  placeholder="e.g. Rahul Verma"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name / Type</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500 focus:border-gold-500"
                  value={currentBooking.event}
                  onChange={(e) => setCurrentBooking({...currentBooking, event: e.target.value})}
                  placeholder="e.g. Wedding Reception"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500 focus:border-gold-500"
                    value={currentBooking.date}
                    onChange={(e) => setCurrentBooking({...currentBooking, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500 focus:border-gold-500"
                    value={currentBooking.status}
                    onChange={(e) => setCurrentBooking({...currentBooking, status: e.target.value})}
                  >
                    <option value="Quoted">Quoted</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No. of Guests</label>
                  <input 
                    type="number" 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500 focus:border-gold-500"
                    value={currentBooking.guests}
                    onChange={(e) => setCurrentBooking({...currentBooking, guests: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-gold-500 focus:border-gold-500"
                    value={currentBooking.budget}
                    onChange={(e) => setCurrentBooking({...currentBooking, budget: e.target.value})}
                    placeholder="e.g. 5L - 8L"
                  />
                </div>
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

export default AdminBookings;