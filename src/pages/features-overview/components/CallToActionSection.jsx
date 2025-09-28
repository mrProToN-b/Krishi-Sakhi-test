import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallToActionSection = ({ onGetStarted, onContactUs }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-10 left-1/4 w-20 h-20 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 border border-white/20 rounded-full"></div>
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Icon */}
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Sprout" size={40} color="white" />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-white">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of farmers who are already using Krishi Sakhi to increase their yields, reduce costs, and make smarter farming decisions with AI-powered insights.
            </p>
          </div>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-3 text-white">
              <Icon name="CheckCircle" size={20} />
              <span className="font-medium">Free to Start</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <Icon name="CheckCircle" size={20} />
              <span className="font-medium">24/7 AI Support</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <Icon name="CheckCircle" size={20} />
              <span className="font-medium">Multilingual Interface</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button
              variant="secondary"
              size="lg"
              onClick={onGetStarted}
              iconName="UserPlus"
              iconPosition="left"
              className="px-8 bg-white text-primary hover:bg-white/90"
            >
              Start Your Journey
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={onContactUs}
              iconName="MessageSquare"
              iconPosition="left"
              className="px-8 text-white border-white/20 hover:bg-white/10"
            >
              Contact Support
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 text-white/80"
          >
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span className="text-sm">Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} />
              <span className="text-sm">Government Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span className="text-sm">10,000+ Happy Farmers</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToActionSection;