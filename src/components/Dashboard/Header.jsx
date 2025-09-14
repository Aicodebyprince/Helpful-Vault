import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, LogOut } from 'lucide-react';

const Header = () => {
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    // A simple browser confirm is used here. For a more professional feel,
    // consider replacing this with a custom modal component.
    if (window.confirm('Are you sure you want to logout?')) {
      await signOut();
    }
  };

  // Function to get the user's first name from Supabase metadata.
  // It falls back to parsing the email if the first name isn't set.
  const getFirstName = () => {
    if (user?.user_metadata?.firstName) {
      return user.user_metadata.firstName;
    }
    if (user?.email) {
      const namePart = user.email.split('@')[0];
      return namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }
    return 'User';
  };

  // Function to get the user's initials.
  const getUserInitials = () => {
    if (user?.user_metadata?.firstName) {
      return user.user_metadata.firstName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };
  
  const firstName = getFirstName();
  const userInitials = getUserInitials();

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side: Brand Logo and Name */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-2 shadow-md">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">
                Helpful Vault
              </span>
            </div>
          </div>
          
          {/* Right Side: User Info and Logout Button */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* User Info: Hidden on extra-small screens */}
            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-right">
                <div className="font-semibold text-slate-800 text-sm">
                  {firstName}
                </div>
                <div className="text-xs text-slate-500 truncate max-w-[150px]">
                  {user?.email}
                </div>
              </div>
            </div>

            {/* User Avatar */}
            <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <span className="text-white text-sm font-bold">
                {userInitials}
              </span>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleSignOut}
              className="text-slate-500 hover:text-slate-800 p-2 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Log out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
