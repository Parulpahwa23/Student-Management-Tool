import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Calendar, BookOpen } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto fade-in">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-indigo-400"></div>
        <div className="px-8 flex justify-center -mt-16 mb-4">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
            <img 
              src={user.profilePic || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
              alt={user.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="px-8 pb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-500 mb-6 flex items-center justify-center space-x-2">
            <Mail size={16} />
            <span>{user.email}</span>
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-left mt-8 border-t border-gray-100 pt-8">
            <div className="bg-gray-50 p-4 rounded-xl flex items-start space-x-3">
              <div className="bg-indigo-100 text-primary p-2 rounded-lg">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Student Status</p>
                <p className="text-gray-800 font-semibold">Active</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl flex items-start space-x-3">
              <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Joined Date</p>
                <p className="text-gray-800 font-semibold">
                  {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
