import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';

const FeaturesGrid = ({ onFeatureSelect }) => {
  const features = [
    {
      title: "Weather Alerts",
      description: "Get real-time weather updates, forecasts, and severe weather warnings tailored to your farm location. Never be caught off guard by sudden weather changes.",
      benefits: [
        "7-day detailed weather forecasts",
        "Severe weather warnings and alerts",
        "Rainfall predictions and irrigation planning",
        "Temperature monitoring for crop protection"
      ],
      icon: "Cloud",
      iconColor: "var(--color-primary)"
    },
    {
      title: "Pest Detection",
      description: "AI-powered pest and disease identification using image recognition technology. Get instant diagnosis and treatment recommendations.",
      benefits: [
        "Instant pest identification from photos",
        "Disease diagnosis with 95% accuracy",
        "Organic and chemical treatment options",
        "Prevention strategies and timing"
      ],
      icon: "Bug",
      iconColor: "var(--color-error)"
    },
    {
      title: "AI Chatbot Assistant",
      description: "24/7 multilingual AI assistant providing personalized farming advice, answering questions, and guiding you through agricultural challenges.",
      benefits: [
        "Malayalam and English language support",
        "Instant answers to farming questions",
        "Personalized crop recommendations",
        "Voice input and output capabilities"
      ],
      icon: "MessageCircle",
      iconColor: "var(--color-accent)"
    },
    {
      title: "Market Prices",
      description: "Access real-time market prices for crops, compare rates across different markets, and get price trend analysis to maximize your profits.",
      benefits: [
        "Real-time crop price updates",
        "Market comparison across regions",
        "Price trend analysis and predictions",
        "Best selling time recommendations"
      ],
      icon: "TrendingUp",
      iconColor: "var(--color-success)"
    },
    {
      title: "Farm Activity Tracking",
      description: "Comprehensive farm management system to track planting, harvesting, fertilizer application, and other crucial farming activities.",
      benefits: [
        "Digital farm diary and records",
        "Activity scheduling and reminders",
        "Resource usage tracking",
        "Yield and profit analysis"
      ],
      icon: "Calendar",
      iconColor: "var(--color-secondary)"
    },
    {
      title: "Storage Booking",
      description: "Find and book storage facilities for your harvest, connect with storage providers, and manage your post-harvest logistics efficiently.",
      benefits: [
        "Find nearby storage facilities",
        "Compare storage rates and facilities",
        "Online booking and payment",
        "Storage condition monitoring"
      ],
      icon: "Warehouse",
      iconColor: "var(--color-warning)"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">
            Comprehensive Farming Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how our advanced features can revolutionize your farming practices and boost your agricultural success.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature, index) => (
            <FeatureCard
              key={feature?.title}
              title={feature?.title}
              description={feature?.description}
              benefits={feature?.benefits}
              icon={feature?.icon}
              iconColor={feature?.iconColor}
              index={index}
              onLearnMore={onFeatureSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;