import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../AppIcon";
import Button from "./Button";
import { main } from "../../utils/gemini.js";

const EnhancedFloatingChatbot = ({ isOpen = false, onToggle }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isRecording, setIsRecording] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 400, height: 600 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);
  const windowRef = useRef(null);
  const resizeHandleRef = useRef(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === "ml" ? "ml-IN" : "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = () => {
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    if ("speechSynthesis" in window) {
      synthesisRef.current = window.speechSynthesis;
    }

    // Load saved language preference
    const savedLanguage = localStorage.getItem("krishiSakhiLanguage");
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ml")) {
      setLanguage(savedLanguage);
    }
  }, [language]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem("krishiSakhiLanguage", language);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isOpen]);

  const speakText = (text) => {
    if (synthesisRef.current && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "ml" ? "ml-IN" : "en-US";
      utterance.rate = 0.9;
      utterance.pitch = 1;
      synthesisRef.current.speak(utterance);
    }
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputMessage?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Use Gemini AI for response
      const aiResponse = await main(inputMessage);

      const aiMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Text-to-speech for AI response
      speakText(aiResponse);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content:
          language === "ml"
            ? "ക്ഷമിക്കണം, ഒരു പ്രശ്നം ഉണ്ടായിരുന്നു. പിന്നീട് വീണ്ടും ശ്രമിക്കുക."
            : "Sorry, there was an issue. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.lang = language === "ml" ? "ml-IN" : "en-US";
        recognitionRef.current.start();
        setIsRecording(true);
      }
    }
  };

  const handleLanguageToggle = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMouseDown = (e) => {
    if (e.target === windowRef.current || e.target.closest(".chat-header")) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResizeStart = (e) => {
    e.preventDefault();
    setIsResizing(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = windowSize.width;
    const startHeight = windowSize.height;

    const handleResizeMove = (e) => {
      const newWidth = Math.max(300, startWidth + (e.clientX - startX));
      const newHeight = Math.max(400, startHeight + (e.clientY - startY));
      setWindowSize({ width: newWidth, height: newHeight });
    };

    const handleResizeEnd = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleResizeMove);
      document.removeEventListener("mouseup", handleResizeEnd);
    };

    document.addEventListener("mousemove", handleResizeMove);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const quickActions = [
    {
      label: language === "ml" ? "കാലാവസ്ഥ" : "Weather",
      icon: "Cloud",
      query:
        language === "ml"
          ? "ഇന്നത്തെ കാലാവസ്ഥ എങ്ങനെയുണ്ട്?"
          : "What is today's weather?",
    },
    {
      label: language === "ml" ? "വിപണി വില" : "Market Price",
      icon: "TrendingUp",
      query:
        language === "ml"
          ? "നെല്ലിന്റെ വില എത്രയാണ്?"
          : "What is the price of rice?",
    },
    {
      label: language === "ml" ? "കീട നിയന്ത്രണം" : "Pest Control",
      icon: "Bug",
      query:
        language === "ml"
          ? "കീടങ്ങളെ എങ്ങനെ ഒഴിവാക്കാം?"
          : "How to control pests?",
    },
    {
      label: language === "ml" ? "വളം" : "Fertilizer",
      icon: "Wheat",
      query:
        language === "ml"
          ? "വളം എപ്പോൾ പ്രയോഗിക്കണം?"
          : "When to apply fertilizer?",
    },
  ];

  const handleQuickAction = (action) => {
    setInputMessage(action.query);
  };

  const placeholderText = {
    en: "Ask about farming, weather, crops...",
    ml: "കൃഷി, കാലാവസ്ഥ, വിളകൾ എന്നിവയെക്കുറിച്ച് ചോദിക്കുക...",
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group lg:bottom-8 lg:right-8"
          aria-label="Open AI Assistant">
          <Icon name="MessageCircle" size={24} />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
            <Icon name="Sparkles" size={12} color="white" />
          </div>
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:inset-auto">
          {/* Mobile Backdrop */}
          <div
            className="lg:hidden absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onToggle}
          />

          {/* Chat Container */}
          <motion.div
            ref={windowRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: position.x,
              y: position.y,
            }}
            className={`absolute lg:relative ${
              isMinimized ? "h-16" : ""
            } bg-white rounded-lg lg:rounded-xl shadow-xl border border-gray-200 flex flex-col`}
            style={{
              width: isMinimized ? "300px" : `${windowSize.width}px`,
              height: isMinimized ? "64px" : `${windowSize.height}px`,
              left: window.innerWidth <= 1024 ? "16px" : "auto",
              right: window.innerWidth <= 1024 ? "16px" : "24px",
              bottom: window.innerWidth <= 1024 ? "16px" : "24px",
              top: window.innerWidth <= 1024 ? "16px" : "auto",
              cursor: isDragging ? "grabbing" : "default",
            }}
            onMouseDown={handleMouseDown}>
            {/* Header */}
            <div className="chat-header flex items-center justify-between p-4 border-b border-gray-200 cursor-move">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={16} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">
                    {language === "ml" ? "AI കൃഷി സഹായി" : "AI Farm Assistant"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {language === "ml"
                      ? "എപ്പോഴും സഹായിക്കാൻ തയ്യാറാണ്"
                      : "Always here to help"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {/* Language Toggle */}
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => handleLanguageToggle("en")}
                    className={`px-2 py-1 text-xs font-medium rounded-md transition-colors duration-150 ${
                      language === "en"
                        ? "bg-green-600 text-white"
                        : "text-gray-500 hover:text-gray-700"
                    }`}>
                    EN
                  </button>
                  <button
                    onClick={() => handleLanguageToggle("ml")}
                    className={`px-2 py-1 text-xs font-medium rounded-md transition-colors duration-150 ${
                      language === "ml"
                        ? "bg-green-600 text-white"
                        : "text-gray-500 hover:text-gray-700"
                    }`}>
                    ML
                  </button>
                </div>

                {/* Minimize Button */}
                <button
                  onClick={handleMinimize}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  aria-label={isMinimized ? "Maximize" : "Minimize"}>
                  <Icon
                    name={isMinimized ? "Maximize" : "Minimize"}
                    size={16}
                  />
                </button>

                {/* Close Button */}
                <button
                  onClick={onToggle}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  aria-label="Close chat">
                  <Icon name="X" size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages?.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="Bot" size={32} className="text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {language === "ml"
                          ? "ഹലോ! ഞാൻ നിങ്ങളുടെ AI കൃഷി സഹായി ആണ്"
                          : "Hello! I'm your AI farming assistant"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === "ml"
                          ? "നിങ്ങളുടെ കൃഷി ചോദ്യങ്ങൾക്ക് ഞാൻ ഉത്തരം നൽകാം"
                          : "I can help you with all your farming questions"}
                      </p>
                    </div>
                  )}

                  {messages?.map((message) => (
                    <div
                      key={message?.id}
                      className={`flex ${
                        message?.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}>
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                          message?.type === "user"
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                        {message?.content}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                          <div
                            className="w-2 h-2 bg-current rounded-full animate-pulse"
                            style={{ animationDelay: "0.2s" }}></div>
                          <div
                            className="w-2 h-2 bg-current rounded-full animate-pulse"
                            style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                {messages?.length === 0 && (
                  <div className="px-4 py-2 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {quickActions?.map((action) => (
                        <button
                          key={action?.label}
                          onClick={() => handleQuickAction(action)}
                          className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-md transition-colors duration-150">
                          <Icon name={action?.icon} size={12} />
                          <span>{action?.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <div className="flex-1 flex items-center space-x-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e?.target?.value)}
                        placeholder={placeholderText?.[language]}
                        className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        disabled={isTyping}
                      />

                      {/* Voice Input Button */}
                      <button
                        type="button"
                        onClick={handleVoiceToggle}
                        className={`p-2 rounded-md transition-colors duration-150 ${
                          isRecording
                            ? "text-red-600 bg-red-100 hover:bg-red-200"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        }`}
                        title={
                          language === "ml"
                            ? "വോയ്‌സ് റെക്കോർഡിംഗ്"
                            : "Voice recording"
                        }>
                        <Icon name={isRecording ? "MicOff" : "Mic"} size={16} />
                      </button>
                    </div>

                    <Button
                      type="submit"
                      size="sm"
                      disabled={!inputMessage?.trim() || isTyping}
                      iconName="Send"
                      className="px-3"
                    />
                  </div>
                </form>
              </>
            )}

            {/* Resize Handle */}
            {!isMinimized && (
              <div
                ref={resizeHandleRef}
                className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                onMouseDown={handleResizeStart}
                style={{
                  background:
                    "linear-gradient(-45deg, transparent 0%, transparent 30%, #ccc 30%, #ccc 50%, transparent 50%)",
                }}
              />
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default EnhancedFloatingChatbot;
