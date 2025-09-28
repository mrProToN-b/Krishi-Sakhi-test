import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const QuickReplies = ({ onQuickReply, language }) => {
  const quickReplies = {
    en: [
      { text: "Weather forecast", icon: "Cloud", query: "What\'s the weather forecast for my area?" },
      { text: "Crop diseases", icon: "Bug", query: "How do I identify and treat crop diseases?" },
      { text: "Market prices", icon: "TrendingUp", query: "What are the current market prices for my crops?" },
      { text: "Soil health", icon: "Layers", query: "How can I improve my soil health?" },
      { text: "Irrigation tips", icon: "Droplets", query: "What are the best irrigation practices?" },
      { text: "Fertilizer guide", icon: "Beaker", query: "Which fertilizers should I use for my crops?" }
    ],
    ml: [
      { text: "കാലാവസ്ഥ പ്രവചനം", icon: "Cloud", query: "എന്റെ പ്രദേശത്തിന്റെ കാലാവസ്ഥ പ്രവചനം എന്താണ്?" },
      { text: "വിള രോഗങ്ങൾ", icon: "Bug", query: "വിള രോഗങ്ങൾ എങ്ങനെ തിരിച്ചറിയാനും ചികിത്സിക്കാനും കഴിയും?" },
      { text: "വിപണി വില", icon: "TrendingUp", query: "എന്റെ വിളകളുടെ നിലവിലെ വിപണി വില എന്താണ്?" },
      { text: "മണ്ണിന്റെ ആരോഗ്യം", icon: "Layers", query: "എന്റെ മണ്ണിന്റെ ആരോഗ്യം എങ്ങനെ മെച്ചപ്പെടുത്താം?" },
      { text: "ജലസേചന നുറുങ്ങുകൾ", icon: "Droplets", query: "മികച്ച ജലസേചന രീതികൾ എന്തൊക്കെയാണ്?" },
      { text: "വളം ഗൈഡ്", icon: "Beaker", query: "എന്റെ വിളകൾക്ക് ഏത് വളങ്ങൾ ഉപയോഗിക്കണം?" }
    ]
  };

  const currentReplies = quickReplies?.[language] || quickReplies?.en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 py-3 border-t border-border bg-muted/30"
    >
      <div className="flex items-center mb-3">
        <Icon name="Zap" size={16} className="text-primary mr-2" />
        <span className="text-sm font-medium text-foreground">
          {language === 'ml' ? 'ദ്രുത മറുപടികൾ' : 'Quick Replies'}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {currentReplies?.map((reply, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onQuickReply(reply?.query)}
            className="flex items-center space-x-2 px-3 py-2 bg-background hover:bg-muted border border-border rounded-lg text-left transition-colors duration-150 group"
          >
            <Icon 
              name={reply?.icon} 
              size={14} 
              className="text-primary group-hover:text-primary/80 flex-shrink-0" 
            />
            <span className="text-xs text-foreground truncate">
              {reply?.text}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickReplies;