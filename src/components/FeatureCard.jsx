import React from 'react';
import { motion } from 'framer-motion';

// Reusable FeatureCard component for beginners
const FeatureCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-soft border border-gray-200 hover:shadow-medium transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}        // Framer Motion: start invisible and below
      animate={{ opacity: 1, y: 0 }}         // Framer Motion: animate to visible and in place
      transition={{ delay: index * 0.1 }}    // Framer Motion: stagger animation based on index
      whileHover={{ 
        scale: 1.05,                          // Framer Motion: scale up on hover
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)" // Enhanced shadow on hover
      }}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <span className="text-2xl">{icon}</span>
      </div>
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;