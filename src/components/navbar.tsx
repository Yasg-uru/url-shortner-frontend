import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import { Menu, X, User, LogOut, BarChart2, LayoutDashboard, LogIn } from "lucide-react";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = () => {
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-black to-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              URL Shortener
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center text-gray-300 hover:text-blue-500 transition duration-300"
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </Link>
                <Link
                  to="/topic"
                  className="flex items-center text-gray-300 hover:text-blue-500 transition duration-300"
                >
                  <BarChart2 className="h-5 w-5 mr-2" />
                  Smart Topic Analytics
                </Link>
                <Link
                  to="/overall"
                  className="flex items-center text-gray-300 hover:text-blue-500 transition duration-300"
                >
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  Overall Analytics
                </Link>
                <div className="relative group">
                  {user?.profilePicture && (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-10 h-10 rounded-full cursor-pointer"
                    />
                  )}
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={logout}
                      className="w-full flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Login Button for Unauthenticated Users
              <button
                onClick={handleNavigate}
                className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Login with Google
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-blue-500 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-800 rounded-lg mt-2 p-4 space-y-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center text-gray-300 hover:text-blue-500 transition duration-300"
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </Link>
                <Link
                  to="/topic"
                  className="flex items-center text-gray-300 hover:text-blue-500 transition duration-300"
                >
                  <BarChart2 className="h-5 w-5 mr-2" />
                  Smart Topic Analytics
                </Link>
                <Link
                  to="/overall"
                  className="flex items-center text-gray-300 hover:text-blue-500 transition duration-300"
                >
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  Overall Analytics
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center text-gray-300 hover:text-blue-500 transition duration-300"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleNavigate}
                className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Login with Google
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;