import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Reusable Navbar component
const Navbar = () => {
  const navigate = useNavigate();

  // Simple logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/');
  };

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-white shadow-soft border-b border-gray-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* <div className="">
              <span className="text-white font-bold text-xl">🌱</span>
            </div> */}
            <span className="font-bold text-xl text-gray-900">Krishi Sakhi</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Features
            </Link>
            {/* <Link
              to="/chat"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              AI Chat
            </Link> */}
            <Link
              to="/contact"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Contact
            </Link>

            {/* Conditional rendering */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {/* Dashboard link */}
                <Link
                  to={userRole === 'farmer' ? '/dashboard/farmer' : '/dashboard/business'}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Dashboard
                </Link>
                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Login/Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
