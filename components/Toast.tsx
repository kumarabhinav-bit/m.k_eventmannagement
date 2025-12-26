import React, { useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-[100] flex items-center px-6 py-4 rounded-lg shadow-2xl text-white transform transition-all duration-500 ease-in-out animate-bounce-slow ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`}>
      {type === 'success' ? <CheckCircle className="mr-3" size={24} /> : <XCircle className="mr-3" size={24} />}
      <div>
        <h4 className="font-bold text-lg">{type === 'success' ? 'Success' : 'Error'}</h4>
        <p className="text-sm opacity-90">{message}</p>
      </div>
    </div>
  );
};

export default Toast;