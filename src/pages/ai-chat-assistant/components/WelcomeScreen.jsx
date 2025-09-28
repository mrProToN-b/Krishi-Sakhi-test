import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WelcomeScreen = ({ language, onQuickStart }) => {
  const welcomeContent = {
    en: {
      title: 'Welcome to AI Farm Assistant',
      subtitle: 'Your intelligent companion for modern farming',
      description: 'Get personalized advice on crops, weather, pest control, and market insights. Ask me anything about farming!',
      features: [
        { icon: 'Cloud', title: 'Weather Insights', desc: 'Real-time weather updates and forecasts' },
        { icon: 'Bug', title: 'Pest Detection', desc: 'Identify and treat crop diseases' },
        { icon: 'TrendingUp', title: 'Market Prices', desc: 'Current market rates for your crops' },
        { icon: 'Lightbulb', title: 'Smart Tips', desc: 'Personalized farming recommendations' }
      ],
      quickStart: 'Start Conversation',
      sampleQuestions: 'Try asking:',
      questions: [
        "What\'s the weather forecast for this week?",
        "How do I treat tomato blight?",
        "What are the current rice prices?",
        "When should I plant my next crop?"
      ]
    },
    ml: {
      title: 'AI കൃഷി സഹായിയിലേക്ക് സ്വാഗതം',
      subtitle: 'ആധുനിക കൃഷിക്കുള്ള നിങ്ങളുടെ ബുദ്ധിമാനായ സഹായി',
      description: 'വിളകൾ, കാലാവസ്ഥ, കീട നിയന്ത്രണം, വിപണി വിവരങ്ങൾ എന്നിവയെക്കുറിച്ച് വ്യക്തിഗത ഉപദേശം നേടുക. കൃഷിയെക്കുറിച്ച് എന്തും ചോദിക്കുക!',
      features: [
        { icon: 'Cloud', title: 'കാലാവസ്ഥ വിവരങ്ങൾ', desc: 'തത്സമയ കാലാവസ്ഥ അപ്‌ഡേറ്റുകളും പ്രവചനങ്ങളും' },
        { icon: 'Bug', title: 'കീട കണ്ടെത്തൽ', desc: 'വിള രോഗങ്ങൾ തിരിച്ചറിയുകയും ചികിത്സിക്കുകയും ചെയ്യുക' },
        { icon: 'TrendingUp', title: 'വിപണി വിലകൾ', desc: 'നിങ്ങളുടെ വിളകളുടെ നിലവിലെ വിപണി നിരക്കുകൾ' },
        { icon: 'Lightbulb', title: 'സ്മാർട്ട് നുറുങ്ങുകൾ', desc: 'വ്യക്തിഗത കൃഷി ശുപാർശകൾ' }
      ],
      quickStart: 'സംഭാഷണം ആരംഭിക്കുക',
      sampleQuestions: 'ചോദിച്ച് നോക്കുക:',
      questions: [
        "ഈ ആഴ്ചയുടെ കാലാവസ്ഥ പ്രവചനം എന്താണ്?",
        "തക്കാളി ബ്ലൈറ്റ് എങ്ങനെ ചികിത്സിക്കാം?",
        "നിലവിലെ നെല്ലിന്റെ വില എന്താണ്?",
        "എന്റെ അടുത്ത വിള എപ്പോൾ നടണം?"
      ]
    }
  };

  const content = welcomeContent?.[language] || welcomeContent?.en;

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* AI Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-medium"
        >
          <Icon name="Bot" size={32} color="white" />
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-3">
            {content?.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            {content?.subtitle}
          </p>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {content?.description}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {content?.features?.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-card border border-border rounded-xl shadow-soft hover:shadow-medium transition-all duration-200"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name={feature?.icon} size={20} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-sm text-foreground mb-1">
                {feature?.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {feature?.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Sample Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h3 className="font-heading font-semibold text-foreground mb-4">
            {content?.sampleQuestions}
          </h3>
          <div className="grid gap-2 max-w-md mx-auto">
            {content?.questions?.map((question, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onQuickStart(question)}
                className="p-3 bg-muted hover:bg-muted/80 border border-border rounded-lg text-left text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                <Icon name="MessageCircle" size={14} className="inline mr-2" />
                {question}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Quick Start Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onQuickStart('')}
          className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 flex items-center space-x-2 mx-auto"
        >
          <Icon name="MessageSquarePlus" size={20} />
          <span>{content?.quickStart}</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;