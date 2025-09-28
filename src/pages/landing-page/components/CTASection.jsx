import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = ({ onOpenAuth }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of farmers and businesses already using AI-powered insights to increase yields, 
            reduce costs, and make smarter farming decisions.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onOpenAuth('farmer')}
              iconName="Sprout"
              iconPosition="left"
              className="px-8 py-4 text-lg bg-white text-primary hover:bg-white/90 shadow-medium"
            >
              Start as Farmer
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
              className="px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-primary"
            >
              Join as Business
            </Button>
          </motion.div>
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-6 text-white/80"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={16} />
            <span className="text-sm">Free to start</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={16} />
            <span className="text-sm">24/7 AI support</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={16} />
            <span className="text-sm">Malayalam & English</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={16} />
            <span className="text-sm">No setup fees</span>
          </div>
        </motion.div>
      </div>
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 3, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-10 hidden lg:block"
      >
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Icon name="Wheat" size={24} color="white" />
        </div>
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -3, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/4 right-10 hidden lg:block"
      >
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <Icon name="Tractor" size={28} color="white" />
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;