import React from 'react';
import { Download, Database, FileSpreadsheet } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AdminExport: React.FC = () => {
  const { inquiries, bookings, testimonials, services, gallery, team, faqs, notify } = useAdmin();

  // Helper to convert array of objects to CSV string
  const convertToCSV = (objArray: any[]) => {
    if (!objArray || objArray.length === 0) return '';
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    
    let str = '';
    const headers = Object.keys(array[0]).join(',');
    str += headers + '\r\n';

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (const index in array[i]) {
            if (line !== '') line += ',';
            
            // Get value and handle nulls
            let cell = array[i][index];
            if (cell === null || cell === undefined) cell = '';
            
            // Ensure strings are handled safely for CSV (escape quotes)
            cell = cell.toString().replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) cell = `"${cell}"`;
            
            line += cell;
        }
        str += line + '\r\n';
    }
    return str;
  };

  // Generic download function for CSV
  const handleDownloadCSV = (data: any[], fileName: string) => {
    if (data.length === 0) {
        notify(`No data available to export for ${fileName}.`, "error");
        return;
    }

    try {
        const csvData = convertToCSV(data);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileName}_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        notify(`${fileName} exported successfully!`, "success");
    } catch (error) {
        console.error("Export failed", error);
        notify("Failed to export data.", "error");
    }
  };

  // Full System Backup (JSON)
  const handleSystemBackup = () => {
      const backupData = {
          meta: {
              timestamp: new Date().toISOString(),
              version: "1.0"
          },
          data: {
              inquiries,
              bookings,
              testimonials,
              services,
              gallery,
              team,
              faqs
          }
      };

      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mk_event_backup_${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      notify("Full system backup downloaded!", "success");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Export & Backup</h1>
        <p className="text-sm text-gray-500">Download system data reports and create backups.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Export Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <FileSpreadsheet className="mr-2 text-green-600" size={20} /> Export Data
          </h2>
          <p className="text-sm text-gray-500 mb-6">Download detailed reports in CSV format.</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded border border-gray-100">
               <div>
                 <h4 className="font-medium text-gray-900">Inquiries / Leads</h4>
                 <p className="text-xs text-gray-500">{inquiries.length} records available</p>
               </div>
               <button 
                 onClick={() => handleDownloadCSV(inquiries, 'inquiries')}
                 className="px-3 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 flex items-center transition-colors"
               >
                 <Download size={16} className="mr-2" /> CSV
               </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded border border-gray-100">
               <div>
                 <h4 className="font-medium text-gray-900">Booking Requests</h4>
                 <p className="text-xs text-gray-500">{bookings.length} records available</p>
               </div>
               <button 
                 onClick={() => handleDownloadCSV(bookings, 'bookings')}
                 className="px-3 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 flex items-center transition-colors"
               >
                 <Download size={16} className="mr-2" /> CSV
               </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded border border-gray-100">
               <div>
                 <h4 className="font-medium text-gray-900">Testimonials</h4>
                 <p className="text-xs text-gray-500">{testimonials.length} records available</p>
               </div>
               <button 
                 onClick={() => handleDownloadCSV(testimonials, 'testimonials')}
                 className="px-3 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 flex items-center transition-colors"
               >
                 <Download size={16} className="mr-2" /> CSV
               </button>
            </div>
          </div>
        </div>

        {/* Backup Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Database className="mr-2 text-blue-600" size={20} /> System Backup
          </h2>
          <p className="text-sm text-gray-500 mb-6">Create a full backup of your website configuration and content.</p>

          <div className="bg-blue-50 border border-blue-100 p-4 rounded mb-6">
             <h4 className="text-blue-800 font-bold text-sm mb-1">Backup Information</h4>
             <p className="text-blue-600 text-xs">Includes all settings, content, and user data.</p>
          </div>

          <button 
            onClick={handleSystemBackup}
            className="w-full py-3 bg-royal-900 text-white rounded font-bold hover:bg-royal-800 flex justify-center items-center transition-colors"
          >
            <Download size={18} className="mr-2" /> Download Full Backup (JSON)
          </button>
          
          <div className="mt-4 pt-4 border-t text-center">
             <button 
                onClick={() => {
                    if(window.confirm("This is a simulation. In a real app, this would clear your database.")) {
                        notify("Reset functionality is disabled in demo mode.", "error");
                    }
                }}
                className="text-red-500 text-sm hover:underline"
             >
                Reset All Data
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminExport;