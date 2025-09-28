import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, onLanguageToggle, language, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      inputRef?.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // Voice recording functionality will be implemented later
  };

  const handleImageUpload = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file && file?.type?.startsWith('image/')) {
      // Image upload functionality for pest identification
      console.log('Image selected:', file?.name);
    }
  };

  const placeholderText = {
    en: "Type your farming question...",
    ml: "നിങ്ങളുടെ കൃഷി ചോദ്യം ടൈപ്പ് ചെയ്യുക..."
  };

  return (
    <div className="border-t border-border bg-card">
      {/* Language Toggle */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Languages" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {language === 'ml' ? 'ഭാഷ' : 'Language'}:
          </span>
        </div>
        
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => onLanguageToggle('en')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-150 ${
              language === 'en' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            English
          </button>
          <button
            onClick={() => onLanguageToggle('ml')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-150 ${
              language === 'ml' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            മലയാളം
          </button>
        </div>
      </div>
      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-end space-x-3">
          {/* Additional Actions */}
          <div className="flex flex-col space-y-2">
            <button
              type="button"
              onClick={handleImageUpload}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-150"
              title={language === 'ml' ? 'ചിത്രം അപ്‌ലോഡ് ചെയ്യുക' : 'Upload image'}
            >
              <Icon name="ImagePlus" size={20} />
            </button>
            
            <motion.button
              type="button"
              onClick={handleVoiceToggle}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg transition-colors duration-150 ${
                isRecording
                  ? 'text-error bg-error/10 hover:bg-error/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={language === 'ml' ? 'വോയ്‌സ് റെക്കോർഡിംഗ്' : 'Voice recording'}
            >
              <Icon name={isRecording ? 'MicOff' : 'Mic'} size={20} />
            </motion.button>
          </div>

          {/* Text Input */}
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholderText?.[language]}
              disabled={disabled}
              rows={1}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm placeholder-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                minHeight: '48px',
                maxHeight: '120px',
                overflowY: message?.length > 100 ? 'auto' : 'hidden'
              }}
            />
          </div>

          {/* Send Button */}
          <Button
            type="submit"
            variant="default"
            size="icon"
            disabled={!message?.trim() || disabled}
            className="h-12 w-12 rounded-xl"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>

        {/* Character Counter */}
        {message?.length > 200 && (
          <div className="flex justify-end mt-2">
            <span className={`text-xs ${message?.length > 500 ? 'text-warning' : 'text-muted-foreground'}`}>
              {message?.length}/500
            </span>
          </div>
        )}
      </form>
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ChatInput;