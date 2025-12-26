import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  CalendarCheck, 
  Briefcase, 
  Image, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User,
  Star,
  Info,
  Users,
  HelpCircle,
  Database,
  ExternalLink
} from 'lucide-react';
import { COMPANY_NAME } from '../constants';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Inquiries', path: '/admin/inquiries', icon: <MessageSquare size={20} /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <CalendarCheck size={20} /> },
    { name: 'Services', path: '/admin/services', icon: <Briefcase size={20} /> },
    { name: 'Gallery', path: '/admin/gallery', icon: <Image size={20} /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <Star size={20} /> },
    { name: 'About Content', path: '/admin/about', icon: <Info size={20} /> },
    { name: 'Team', path: '/admin/team', icon: <Users size={20} /> },
    { name: 'FAQ', path: '/admin/faq', icon: <HelpCircle size={20} /> },
    { name: 'Data Export', path: '/admin/export', icon: <Database size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-royal-900 text-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 overflow-hidden flex flex-col`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-700 flex justify-between items-center flex-shrink-0">
            <div>
              <h2 className="font-serif text-xl font-bold text-gold-500">M.K Admin</h2>
              <p className="text-xs text-gray-400">Control Panel</p>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors group ${
                  location.pathname === item.path
                    ? 'bg-gold-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-gray-700">
                <Link 
                    to="/" 
                    className="flex items-center px-4 py-3 rounded-lg text-gold-400 hover:bg-gray-800 hover:text-gold-300 transition-colors"
                >
                     <span className="mr-3"><ExternalLink size={20} /></span>
                     <span className="font-medium">View Live Site</span>
                </Link>
            </div>
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-gray-700 bg-gray-900 flex-shrink-0">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-royal-900 font-bold">
                MK
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 bg-red-600/20 text-red-400 rounded hover:bg-red-600 hover:text-white transition-colors text-sm"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden h-screen">
        {/* Top Header Mobile */}
        <header className="bg-white shadow-sm lg:hidden flex items-center justify-between p-4 flex-shrink-0">
          <span className="font-serif font-bold text-royal-900">{COMPANY_NAME}</span>
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600">
            <Menu size={24} />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;