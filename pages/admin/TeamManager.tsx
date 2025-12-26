import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckSquare, Square } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AdminTeam: React.FC = () => {
  const { team, addTeamMember, deleteTeamMember, deleteTeamMembers } = useAdmin();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleAdd = () => {
      addTeamMember({
          name: "New Member",
          role: "Event Planner",
          exp: "2 Years",
          photo: "https://randomuser.me/api/portraits/lego/1.jpg"
      });
  };

  const handleDelete = (id: number) => {
      if(window.confirm("Remove this team member?")) {
          deleteTeamMember(id);
          setSelectedIds(prev => prev.filter(sid => sid !== id));
      }
  };

  const handleSelectedDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} team members?`)) {
        deleteTeamMembers(selectedIds);
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
        <h1 className="text-2xl font-bold text-gray-800">Team Manager</h1>
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
              className="bg-royal-900 text-white px-4 py-2 rounded flex items-center hover:bg-royal-800"
            >
              <Plus size={18} className="mr-2" /> Add Team Member
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.length === 0 ? (
            <p className="col-span-3 text-center text-gray-500 py-10">No team members found.</p>
        ) : (
            team.map((member) => (
            <div 
                key={member.id} 
                className={`bg-white rounded-lg shadow-sm border p-6 flex items-start space-x-4 transition-all cursor-pointer ${
                    selectedIds.includes(member.id) ? 'border-gold-500 ring-1 ring-gold-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => toggleSelect(member.id)}
            >
                {/* Checkbox */}
                <div onClick={(e) => { e.stopPropagation(); toggleSelect(member.id); }} className="text-gray-400 hover:text-gold-600 cursor-pointer pt-1">
                    {selectedIds.includes(member.id) ? <CheckSquare size={20} className="text-gold-600" /> : <Square size={20} />}
                </div>

                <img src={member.photo} alt={member.name} className="w-16 h-16 rounded-full object-cover border border-gray-200" />
                <div className="flex-1">
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-gold-600 text-sm font-medium mb-1">{member.role}</p>
                <p className="text-gray-500 text-xs">{member.exp} Experience</p>
                </div>
                <div className="flex flex-col space-y-2">
                <button 
                    onClick={(e) => { e.stopPropagation(); }} 
                    className="text-gray-400 hover:text-blue-600"
                    title="Edit (Mock)"
                >
                    <Edit2 size={16} />
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(member.id); }}
                    className="text-gray-400 hover:text-red-600"
                    title="Delete"
                >
                    <Trash2 size={16} />
                </button>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
};

export default AdminTeam;