import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeatureCard = ({ 
  title, 
  description, 
  benefits, 
  icon, 
  iconColor = "var(--color-primary)", 
  index = 0,
  onLearnMore 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 20px 40px rgba(45, 80, 22, 0.15)" 
      }}
      className="bg-card rounded-xl p-6 border border-border shadow-soft hover:shadow-strong transition-all duration-300 group"
    >
      {/* Icon */}
      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon name={icon} size={32} color={iconColor} />
      </div>
      {/* Content */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Benefits */}
        {benefits && benefits?.length > 0 && (
          <ul className="space-y-2">
            {benefits?.map((benefit, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Icon name="Check" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA Button */}
        <div className="pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLearnMore?.(title)}
            iconName="ArrowRight"
            iconPosition="right"
            className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
          >
            Learn More
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;