import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, login } = useAuth();

  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              URL Shortener
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-4">
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/topic"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Smart Topic Analytics
                  </Link>
                  <Link
                    to="/overall"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Overall Anlytics
                  </Link>
                  <button
                    onClick={logout}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Logout
                  </button>
                  {user?.profilePicture && (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                </div>
              </>
            ) : (
              // Login Button for Unauthenticated Users
              <button
                onClick={login}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Login with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
