import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = ({ onGetStarted }) => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-secondary rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-accent rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border-2 border-primary rounded-full"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
          >
            <Icon name="Sparkles" size={16} />
            <span>AI-Powered Agricultural Platform</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="font-heading font-bold text-4xl lg:text-6xl text-foreground leading-tight">
              Discover Powerful
              <span className="text-primary block">Farming Features</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore comprehensive agricultural tools designed to transform your farming experience with AI-driven insights, real-time monitoring, and smart decision-making capabilities.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="default"
              size="lg"
              onClick={onGetStarted}
              iconName="Rocket"
              iconPosition="left"
              className="px-8"
            >
              Get Started Today
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Play"
              iconPosition="left"
              className="px-8"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="font-heading font-bold text-3xl text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Active Farmers</div>
            </div>
            <div className="text-center">
              <div className="font-heading font-bold text-3xl text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Smart Features</div>
            </div>
            <div className="text-center">
              <div className="font-heading font-bold text-3xl text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">AI Support</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;