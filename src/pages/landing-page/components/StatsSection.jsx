import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      number: "10,000+",
      label: "Active Farmers",
      description: "Farmers using our platform daily",
      icon: "Users",
      color: "text-primary"
    },
    {
      id: 2,
      number: "500+",
      label: "Business Partners",
      description: "Agricultural service providers",
      icon: "Building2",
      color: "text-secondary"
    },
    {
      id: 3,
      number: "95%",
      label: "Accuracy Rate",
      description: "AI prediction accuracy",
      icon: "Target",
      color: "text-success"
    },
    {
      id: 4,
      number: "24/7",
      label: "Support Available",
      description: "Round-the-clock assistance",
      icon: "Clock",
      color: "text-accent"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-primary/5">
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
            Trusted by Farmers Across Kerala
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join the growing community of farmers and businesses revolutionizing agriculture with technology.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats?.map((stat) => (
            <motion.div
              key={stat?.id}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="text-center group"
            >
              <div className="bg-card rounded-xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-border">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name={stat?.icon} size={28} className={stat?.color} />
                </div>

                {/* Number */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl font-heading font-bold text-foreground mb-2"
                >
                  {stat?.number}
                </motion.div>

                {/* Label */}
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  {stat?.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {stat?.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;