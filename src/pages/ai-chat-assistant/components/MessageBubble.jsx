import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const MessageBubble = ({ message, isUser, isTyping = false }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isTyping) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-start mb-4"
      >
        <div className="flex items-start space-x-3 max-w-xs">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Bot" size={16} color="white" />
          </div>
          <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-start space-x-3 max-w-xs sm:max-w-sm lg:max-w-md ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {!isUser && (
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Bot" size={16} color="white" />
          </div>
        )}
        
        <div className="flex flex-col">
          <div
            className={`px-4 py-3 rounded-2xl ${
              isUser
                ? 'bg-primary text-primary-foreground rounded-tr-md'
                : 'bg-muted text-muted-foreground rounded-tl-md'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message?.content}
            </p>
            
            {message?.suggestions && (
              <div className="mt-3 space-y-2">
                {message?.suggestions?.map((suggestion, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-3 py-2 text-xs bg-background/20 hover:bg-background/30 rounded-lg transition-colors duration-150"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className={`flex items-center mt-1 space-x-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs text-muted-foreground">
              {formatTime(message?.timestamp)}
            </span>
            {isUser && message?.status && (
              <Icon 
                name={message?.status === 'read' ? 'CheckCheck' : 'Check'} 
                size={12} 
                className={message?.status === 'read' ? 'text-primary' : 'text-muted-foreground'}
              />
            )}
          </div>
        </div>
        
        {isUser && (
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="User" size={16} color="white" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;