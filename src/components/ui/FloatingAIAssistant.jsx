import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const FloatingAIAssistant = ({ isOpen = false, onToggle }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI farming assistant. How can I help you today?',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputMessage?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'assistant',
        content: getAIResponse(inputMessage),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (message) => {
    const responses = [
      'Based on current weather conditions, I recommend checking your irrigation schedule.',
      'For pest control, consider using organic neem oil spray during early morning hours.',
      'Your soil pH levels suggest adding organic compost for better nutrient absorption.',
      'Market prices for your crops are trending upward this week. Good time to sell!',
      'Weather forecast shows rain in 2 days. Adjust your planting schedule accordingly.',
    ];
    return responses?.[Math.floor(Math.random() * responses?.length)];
  };

  const quickActions = [
    { label: 'Weather Update', icon: 'Cloud' },
    { label: 'Crop Health', icon: 'Wheat' },
    { label: 'Market Prices', icon: 'TrendingUp' },
    { label: 'Pest Alert', icon: 'Bug' },
  ];

  const handleQuickAction = (action) => {
    setInputMessage(action?.label);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-strong hover:shadow-medium transition-all duration-300 flex items-center justify-center group lg:bottom-8 lg:right-8"
          aria-label="Open AI Assistant"
        >
          <Icon name="MessageCircle" size={24} />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
            <Icon name="Sparkles" size={12} color="white" />
          </div>
        </button>
      )}
      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:inset-auto lg:bottom-6 lg:right-6 lg:w-96 lg:h-[600px]">
          {/* Mobile Backdrop */}
          <div 
            className="lg:hidden absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onToggle}
          />
          
          {/* Chat Container */}
          <div className="absolute inset-x-4 top-4 bottom-4 lg:inset-0 bg-card rounded-lg lg:rounded-xl shadow-strong border border-border flex flex-col animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={16} color="white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm text-foreground">
                    AI Farm Assistant
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Always here to help
                  </p>
                </div>
              </div>
              <button
                onClick={onToggle}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
                aria-label="Close chat"
              >
                <Icon name="X" size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages?.map((message) => (
                <div
                  key={message?.id}
                  className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                      message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                    }`}
                  >
                    {message?.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground px-3 py-2 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {quickActions?.map((action) => (
                  <button
                    key={action?.label}
                    onClick={() => handleQuickAction(action)}
                    className="flex items-center space-x-1 px-2 py-1 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-md transition-colors duration-150"
                  >
                    <Icon name={action?.icon} size={12} />
                    <span>{action?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e?.target?.value)}
                  placeholder="Ask about farming, weather, crops..."
                  className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!inputMessage?.trim() || isTyping}
                  iconName="Send"
                  className="px-3"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAIAssistant;