import React from 'react';
import { Users, Calendar, Image, MessageSquare, TrendingUp, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

const Dashboard: React.FC = () => {
  const { inquiries, bookings, services, gallery } = useAdmin();

  // Real-time Stats
  const stats = [
    { 
      title: 'Total Inquiries', 
      value: inquiries.length.toString(), 
      change: `+${inquiries.filter(i => i.status === 'New').length} New`, 
      icon: <MessageSquare size={24} />, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Active Bookings', 
      value: bookings.filter(b => b.status === 'Confirmed' || b.status === 'Quoted').length.toString(), 
      change: 'Active', 
      icon: <Calendar size={24} />, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Total Services', 
      value: services.length.toString(), 
      change: 'Live', 
      icon: <Users size={24} />, 
      color: 'bg-purple-500' 
    },
    { 
      title: 'Gallery Images', 
      value: gallery.length.toString(), 
      change: 'Assets', 
      icon: <Image size={24} />, 
      color: 'bg-orange-500' 
    },
  ];

  const recentInquiries = inquiries.slice(0, 5); // Show last 5

  return (
    <div>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Admin</p>
        </div>
        <div className="flex space-x-2">
           <Link to="/admin/bookings" className="bg-gold-500 text-white px-4 py-2 rounded shadow hover:bg-gold-600 text-sm font-medium flex items-center">
             <Plus size={16} className="mr-1" /> New Booking
           </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} text-white p-3 rounded-lg shadow-md`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-700`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area (Mock) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Inquiry Growth</h3>
            <div className="bg-gray-100 p-1 rounded flex text-xs">
              <button className="px-3 py-1 bg-white shadow rounded">Monthly</button>
              <button className="px-3 py-1 text-gray-500">Yearly</button>
            </div>
          </div>
          {/* CSS-only simple bar chart */}
          <div className="h-64 flex items-end justify-between space-x-2 px-4">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
              <div key={i} className="w-full flex flex-col items-center group">
                <div 
                  className="w-full bg-blue-100 group-hover:bg-gold-400 rounded-t transition-all relative" 
                  style={{ height: `${h}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    {h}
                  </div>
                </div>
                <span className="text-xs text-gray-400 mt-2">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Recent Leads</h3>
            <Link to="/admin/inquiries" className="text-gold-600 text-sm hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {recentInquiries.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">No recent inquiries.</p>
            ) : (
                recentInquiries.map((inq) => (
                  <div key={inq.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm mr-3">
                        {inq.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{inq.name}</h4>
                        <p className="text-xs text-gray-500">{inq.type} • {inq.date}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      inq.status === 'New' ? 'bg-blue-100 text-blue-700' :
                      inq.status === 'Converted' ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                ))
            )}
          </div>
          <button className="w-full mt-6 py-2 border border-gray-200 text-gray-600 rounded hover:bg-gray-50 text-sm font-medium">
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;