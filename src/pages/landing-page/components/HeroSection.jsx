import React from 'react';
import { motion } from 'framer-motion';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = ({ onOpenAuth }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
              Smart Farming with{' '}
              <span className="text-primary">AI-Powered</span>
              <br />
              Agricultural Guidance
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Join thousands of farmers and agricultural businesses using Krishi Sakhi for weather alerts,
              pest detection, market insights, and personalized farming recommendations powered by artificial intelligence.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="default"
                size="lg"
                onClick={() => onOpenAuth('farmer')}
                iconName="Sprout"
                iconPosition="left"
                className="px-8 py-4 text-lg shadow-medium hover:shadow-strong"
              >
                I'm a Farmer
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => onOpenAuth('business')}
                iconName="Building2"
                iconPosition="left"
                className="px-8 py-4 text-lg border-2 hover:bg-primary hover:text-primary-foreground"
              >
                I'm a Business Owner
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground"
          >
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} />
              <span className="text-sm font-medium">10,000+ Active Farmers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={20} />
              <span className="text-sm font-medium">Available in Kerala</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} />
              <span className="text-sm font-medium">Government Certified</span>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-10 hidden lg:block"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Wheat" size={32} className="text-primary" />
        </div>
      </motion.div>
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/4 right-10 hidden lg:block"
      >
        <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center">
          <Icon name="CloudRain" size={36} className="text-secondary" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;