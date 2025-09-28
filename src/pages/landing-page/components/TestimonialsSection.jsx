import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ravi Kumar",
      role: "Rice Farmer",
      location: "Kottayam, Kerala",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `Krishi Sakhi has transformed my farming. The weather alerts helped me save my entire rice crop last monsoon. The AI assistant answers all my questions in Malayalam, making it so easy to use.`,
      rating: 5
    },
    {
      id: 2,
      name: "Priya Nair",
      role: "Vegetable Farmer",
      location: "Thrissur, Kerala",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `The pest detection feature is amazing! I just take a photo and get instant treatment recommendations. My vegetable yield has increased by 30% since using this platform.`,
      rating: 5
    },
    {
      id: 3,
      name: "Suresh Menon",
      role: "Agricultural Business Owner",
      location: "Ernakulam, Kerala",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `As a fertilizer supplier, Krishi Sakhi has connected me with hundreds of farmers. The platform makes it easy to manage orders and provide quality products to the farming community.`,
      rating: 5
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-card">
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
            What Our Community Says
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from farmers and business owners who have transformed their agricultural practices with Krishi Sakhi.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {testimonials?.map((testimonial) => (
            <motion.div
              key={testimonial?.id}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="group"
            >
              <div className="bg-muted/30 rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-border h-full">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial?.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={testimonial?.avatar}
                      alt={testimonial?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-semibold text-foreground">
                      {testimonial?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial?.role}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Icon name="MapPin" size={12} className="mr-1" />
                      {testimonial?.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
            <Icon name="Shield" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              Trusted by 10,000+ farmers across Kerala
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;