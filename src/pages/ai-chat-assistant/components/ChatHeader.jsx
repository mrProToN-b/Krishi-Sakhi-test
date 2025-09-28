import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ language, onClearChat, messageCount }) => {
  const headerText = {
    en: {
      title: 'AI Farm Assistant',
      subtitle: 'Your intelligent farming companion',
      online: 'Online',
      clear: 'Clear Chat'
    },
    ml: {
      title: 'AI കൃഷി സഹായി',
      subtitle: 'നിങ്ങളുടെ ബുദ്ധിമാനായ കൃഷി സഹായി',
      online: 'ഓൺലൈൻ',
      clear: 'ചാറ്റ് ക്ലിയർ ചെയ്യുക'
    }
  };

  const currentText = headerText?.[language] || headerText?.en;

  return (
    <div className="bg-card border-b border-border shadow-soft">
      <div className="flex items-center justify-between p-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Back Button - Mobile */}
          <Link
            to="/farmer-dashboard"
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
          >
            <Icon name="ArrowLeft" size={20} />
          </Link>

          {/* AI Avatar & Info */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Icon name="Bot" size={20} color="white" />
              </div>
              {/* Online Indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-card rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse-gentle"></div>
              </div>
            </div>
            
            <div>
              <h1 className="font-heading font-semibold text-lg text-foreground">
                {currentText?.title}
              </h1>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-muted-foreground">
                  {currentText?.online}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Message Count */}
          {messageCount > 0 && (
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-muted rounded-full">
              <Icon name="MessageSquare" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {messageCount}
              </span>
            </div>
          )}

          {/* Clear Chat Button */}
          {messageCount > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearChat}
              iconName="Trash2"
              className="text-muted-foreground hover:text-destructive"
            >
              <span className="hidden sm:inline ml-2">
                {currentText?.clear}
              </span>
            </Button>
          )}

          {/* Menu Button - Mobile */}
          <button className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150">
            <Icon name="MoreVertical" size={20} />
          </button>
        </div>
      </div>
      {/* Subtitle - Desktop */}
      <div className="hidden lg:block px-4 pb-3">
        <p className="text-sm text-muted-foreground">
          {currentText?.subtitle}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;