import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import Footer from '../components/Footer';

// Features page using functional component with hooks
const Features = () => {
  // useState hook for managing features data and loading state
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook for loading features data when component mounts
  useEffect(() => {
    // Simulate API call to fetch features data
    const loadFeatures = async () => {
      setIsLoading(true); // Set loading to true

      // Simulate API delay
      setTimeout(() => {
        // Set features data using useState
        setFeatures([
          {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloudy-icon lucide-cloudy"><path d="M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /><path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5" /></svg>,
            title: 'Weather Alerts',
            description: 'Real-time weather updates, rainfall predictions, and severe weather warnings for your specific location.'
          },
          {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bug-off-icon lucide-bug-off"><path d="M12 20v-8" /><path d="M14.12 3.88 16 2" /><path d="M15 7.13V6a3 3 0 0 0-5.14-2.1L8 2" /><path d="M18 12.34V11a4 4 0 0 0-4-4h-1.3" /><path d="m2 2 20 20" /><path d="M21 5a4 4 0 0 1-3.55 3.97" /><path d="M22 13h-3.34" /><path d="M3 21a4 4 0 0 1 3.81-4" /><path d="M6 13H2" /><path d="M7.7 7.7A4 4 0 0 0 6 11v3a6 6 0 0 0 11.13 3.13" /></svg>,
            title: 'Pest Detection',
            description: 'AI-powered image recognition to identify pests and diseases with treatment recommendations.'
          },
          {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-icon lucide-bot"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>,
            title: 'AI Chatbot',
            description: 'Get instant answers to farming questions in your local language with our smart assistant.'
          },
          {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand-coins-icon lucide-hand-coins"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" /><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /><path d="m2 16 6 6" /><circle cx="16" cy="9" r="2.9" /><circle cx="6" cy="5" r="3" /></svg>,
            title: 'Market Prices',
            description: 'Live market rates for crops, vegetables, and agricultural products in your area.'
          },
          {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-column-increasing-icon lucide-chart-column-increasing"><path d="M13 17V9" /><path d="M18 17V5" /><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M8 17v-3" /></svg>,
            title: 'Farm Activity Tracking',
            description: 'Track planting, harvesting, irrigation, and other farm activities with smart reminders.'
          },
          {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building2-icon lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></svg>,
            title: 'Storage Booking',
            description: 'Find and book nearby storage facilities for your harvest with transparent pricing.'
          }
        ]);
        setIsLoading(false); // Set loading to false when data is loaded
      }, 1000);
    };

    loadFeatures(); // Call the function
  }, []); // Empty dependency array means this runs once when component mounts

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading features...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}

      {/* Features Content */}
      <main className="pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for{' '}
              <span className="text-green-600">Modern Farming</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our AI-powered platform helps farmers make better decisions,
              increase productivity, and improve crop yields.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features?.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature?.icon}
                title={feature?.title}
                description={feature?.description}
                index={index} // For staggered animation in FeatureCard component
              />
            ))}
          </div>

          {/* Call-to-Action Section */}
          <motion.div
            className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-soft border border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who are already using Krishi Sakhi to improve
              their agricultural practices and increase their profits.
            </p>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.a
                href="/auth"
                className="px-8 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free
              </motion.a>
              <motion.a
                href="/chat"
                className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-md font-semibold hover:bg-green-600 hover:text-white transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try AI Assistant
              </motion.a>
            </div>
          </motion.div>
        </div>
      </main>
      {/* Footer */}
    </div>
  );
};

export default Features;