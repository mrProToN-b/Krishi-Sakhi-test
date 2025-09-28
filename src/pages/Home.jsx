import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import Icon from "../components/AppIcon";
import SimpleFloatingChatbot from "../components/ui/SimpleFloatingChatbot";

// Home/Landing Page component using functional component with hooks
const Home = () => {
  // useState hook for managing component state
  const [isLoading, setIsLoading] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  // Simple event handler for Get Started button
  const handleGetStarted = async () => {
    setIsLoading(true); // Set loading state using useState

    // Simulate loading delay (you would make real API call here)
    setTimeout(() => {
      setIsLoading(false);
      navigate("/auth"); // Navigate to auth page using useNavigate
    }, 1000);
  };

  // Simple event handler for Talk to AI button
  const handleTalkToAI = () => {
    setIsAIAssistantOpen(true); // Open floating chatbot
  };
  const handleTalkToAIF = () => {
    setIsAIAssistantOpen(true); // Open floating chatbot
  };

  const toggleAIAssistant = () => {
    setIsAIAssistantOpen(!isAIAssistantOpen);
  };

  // Feature cards data (would normally come from API)
  const featuresPreview = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-cloud-rain">
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
          <path d="M16 14v6"></path>
          <path d="M8 14v6"></path>
          <path d="M12 16v6"></path>
        </svg>
      ),
      title: "Weather Alerts",
      description:
        "Real-time weather updates and forecasts tailored for your farm location with severe weather warnings.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-bug">
          <path d="m8 2 1.88 1.88"></path>
          <path d="M14.12 3.88 16 2"></path>
          <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path>
          <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"></path>
          <path d="M12 20v-9"></path>
          <path d="M6.53 9C4.6 8.8 3 7.1 3 5"></path>
          <path d="M6 13H2"></path>
          <path d="M3 21c0-2.1 1.7-3.9 3.8-4"></path>
          <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"></path>
          <path d="M22 13h-4"></path>
          <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"></path>
        </svg>
      ),
      title: "Pest Detection",
      description:
        "AI-powered pest identification and treatment recommendations using image recognition technology.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-trending-up">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
          <polyline points="16 7 22 7 22 13"></polyline>
        </svg>
      ),
      title: "Market Prices",
      description:
        "Live commodity prices and market trends to help you make informed selling decisions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-white to-green-100">
      {/* Navigation Bar */}
      <Navbar />
      {/* Hero Section */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Animated Hero Title using Framer Motion */}
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }} // Start invisible and below
              animate={{ opacity: 1, y: 0 }} // Fade in and slide up
              transition={{ duration: 0.6 }} // Animation duration
            >
              Your AI-Powered{" "}
              <span className="text-green-600">Farming Companion</span>
            </motion.h1>

            {/* Animated Subtitle */}
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}>
              Personalized guidance, weather alerts, pest detection, and market
              prices – all in your language. Empowering farmers with AI
              technology.
            </motion.p>

            {/* Animated CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}>
              {/* Get Started Button with loading state */}
              <motion.button
                onClick={handleGetStarted}
                disabled={isLoading}
                className={`px-8 py-3 rounded-md font-semibold transition-all ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
                whileHover={{ scale: 1.05 }} // Slightly enlarge on hover
                whileTap={{ scale: 0.95 }} // Slightly shrink on click
              >
                {isLoading ? "Loading..." : "Get Started"}
              </motion.button>

              {/* Talk to AI Button */}
              <motion.button
                onClick={handleTalkToAI}
                className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-md font-semibold hover:bg-green-600 hover:text-white transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                Talk to AI
              </motion.button>
            </motion.div>

            {/* Background SVG Illustration */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}>
              <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-2xl p-24 pb-8 mx-auto max-w-7xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
                  Ready to Transform Your Farming?
                </h2>
                <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of farmers and businesses already using
                  AI-powered insights to increase yields, reduce costs, and make
                  smarter farming decisions.
                </p>

                <div className="">
                  <motion.div
                    className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}>
                    {/* Get Started Button with loading state */}
                    <motion.button
                      onClick={handleGetStarted}
                      disabled={isLoading}
                      className={`px-8 py-3 rounded-md font-semibold transition-all ${
                        isLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-white/100 hover:bg-white text-green-600"
                      }`}
                      whileHover={{ scale: 1.05 }} // Slightly enlarge on hover
                      whileTap={{ scale: 0.95 }} // Slightly shrink on click
                    >
                      {isLoading ? "Loading..." : "Get Started"}
                    </motion.button>

                    {/* Talk to AI Button */}
                    <motion.button
                      onClick={handleGetStarted}
                      className="px-8 py-3 border-2 border-white/80 text-white rounded-md font-semibold hover:bg-white hover:text-green-600 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}>
                      Talk to AI
                    </motion.button>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="pt-8 mt-4 font-normal text-xl flex flex-wrap justify-center items-center gap-12 text-white">
                  <div className="flex items-center space-x-1.5">
                    <Icon name="Check" size={18.5} />
                    <span className="text-xl">Free to start</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Icon name="Clock" size={18.5} />
                    <span className="text-xl">24/7 AI support</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Icon name="Languages" size={18.5} />
                    <span className="text-xl">Malayalam & English</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Icon name="Cloud" size={18.5} />
                    <span className="text-xl">No setup fees</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Preview Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Krishi Sakhi?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the powerful features that make farming easier and more
              profitable.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuresPreview?.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature?.icon}
                title={feature?.title}
                description={feature?.description}
                index={index} // For staggered animation
              />
            ))}
          </div>

          {/* Link to Full Features Page */}
          <div className="text-center mt-12">
            <Link
              to="/features"
              className="inline-flex items-center px-6 py-3 bg-white border-2 border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition-all">
              View All Features
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />

      {/* Simple Floating AI Assistant */}
      <SimpleFloatingChatbot
        isOpen={isAIAssistantOpen}
        onToggle={toggleAIAssistant}
      />
    </div>
  );
};

export default Home;
