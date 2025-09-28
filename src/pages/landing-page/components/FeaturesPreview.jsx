import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturesPreview = () => {
  const features = [
    {
      id: 1,
      title: "Weather Alerts",
      description: "Real-time weather updates and forecasts tailored for your farm location with severe weather warnings.",
      icon: "CloudRain",
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Pest Detection",
      description: "AI-powered pest identification and treatment recommendations using image recognition technology.",
      icon: "Bug",
      color: "bg-red-500",
      gradient: "from-red-500 to-red-600"
    },
    {
      id: 3,
      title: "AI Chatbot",
      description: "24/7 multilingual farming assistant providing instant answers to your agricultural questions.",
      icon: "MessageCircle",
      color: "bg-primary",
      gradient: "from-primary to-secondary"
    },
    {
      id: 4,
      title: "Market Prices",
      description: "Live commodity prices and market trends to help you make informed selling decisions.",
      icon: "TrendingUp",
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 5,
      title: "Farm Activity Tracking",
      description: "Digital logbook to track planting, harvesting, fertilization, and other farm activities.",
      icon: "Calendar",
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 6,
      title: "Storage Booking",
      description: "Find and book nearby storage facilities for your harvest with competitive pricing.",
      icon: "Warehouse",
      color: "bg-orange-500",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Powerful Features for Modern Farming
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how our AI-powered platform transforms traditional farming with smart technology 
            and data-driven insights.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {features?.map((feature) => (
            <motion.div
              key={feature?.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="group"
            >
              <div className="bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-border h-full">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature?.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={feature?.icon} size={24} color="white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature?.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>

                {/* Hover Effect Arrow */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Icon name="ArrowRight" size={16} className="text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link to="/features-overview">
            <Button
              variant="outline"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
              className="px-8 py-3 hover:bg-primary hover:text-primary-foreground border-2"
            >
              Explore All Features
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesPreview;