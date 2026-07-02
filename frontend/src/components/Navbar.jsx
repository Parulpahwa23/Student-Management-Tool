import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CheckSquare, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
          <CheckSquare size={28} />
          <span>TaskMaster</span>
        </Link>
        
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-primary transition">
                <UserIcon size={18} />
                <span className="font-medium">{user.name}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md transition text-sm font-medium"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link to="/login" className="text-gray-600 hover:text-primary font-medium px-3 py-2">Login</Link>
              <Link to="/signup" className="bg-primary hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition font-medium shadow-sm">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
