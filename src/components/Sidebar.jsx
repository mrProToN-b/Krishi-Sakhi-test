import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from './AppIcon';

// Reusable Sidebar component for dashboard navigation
const Sidebar = ({ menuItems, userRole }) => {
  const location = useLocation(); // useLocation hook to get current path
  
  return (
    <motion.div 
      className="w-64 bg-white shadow-medium h-screen fixed left-0 top-16 border-r border-gray-200"
      initial={{ x: -250 }}     // Framer Motion: start off-screen left
      animate={{ x: 0 }}        // Framer Motion: slide into view
      transition={{ duration: 0.3 }} // Animation duration
    >
      <div className="p-6">
        {/* User Role Badge */}
        <div className="mb-6">
          <div className="bg-green-50 px-3 py-2 rounded-lg">
            <p className="text-green-800 font-medium capitalize">
              {userRole} Dashboard
            </p>
          </div>
        </div>
        
        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems?.map((item, index) => {
            // Check if current path matches menu item path
            const isActive = location?.pathname === item?.path;
            
            return (
              <motion.div
                key={item?.path}
                whileHover={{ x: 5 }} // Slide right on hover
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item?.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-800 border-l-4 border-green-600' :'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{item?.icon}</span>
                  <span className="font-medium">{item?.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;