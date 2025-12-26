import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { COMPANY_NAME } from '../../constants';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    if (email === 'admin@mkevents.com' && password === 'admin123') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin');
    } else {
      alert('Invalid credentials. (Try: admin@mkevents.com / admin123)');
    }
  };

  return (
    <div className="min-h-screen bg-royal-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-royal-900 mb-2">{COMPANY_NAME}</h1>
          <p className="text-gray-500 text-sm uppercase tracking-widest">Admin Control Panel</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="admin@mkevents.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center bg-gold-600 text-white font-bold py-3 rounded hover:bg-gold-700 transition-colors"
          >
            <Lock size={18} className="mr-2" />
            Login
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Protected System. Authorized Personnel Only.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;