import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { main } from 'utils/gemini.js';

// Chat/AI Assistant page using functional component with hooks
const Chat = () => {
  // useState hooks for managing chat state - controlled components
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useRef hook for auto-scrolling chat
  const messagesEndRef = useRef(null);



  // Initial welcome message
  const welcomeMessage = {
    id: 1,
    text: "ഹലോ! ഞാൻ കൃഷി സഖിയുടെ AI അസിസ്റ്റന്റ് ആണ്. നിങ്ങളുടെ കൃഷി ചോദ്യങ്ങൾക്ക് ഞാൻ ഉത്തരം നൽകാം. കാലാവസ്ഥ, വിത്തുകൾ, വളങ്ങൾ, കീടങ്ങൾ, അല്ലെങ്കിൽ വിപണി വിലകൾ എന്നിവയെക്കുറിച്ച് നിങ്ങൾക്ക് എന്നോട് ചോദിക്കാം.",
    sender: 'ai',
    timestamp: new Date()
  };

  // useEffect hook to initialize chat with welcome message
  useEffect(() => {
    setMessages([welcomeMessage]);
  }, []); // Empty dependency array - runs once on mount

  // useEffect hook to scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); // Runs when messages array changes

  // Controlled component event handler for input
  const handleInputChange = (e) => {
    setInputMessage(e?.target?.value);
  };

  // Form submit handler with async/await pattern
  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!inputMessage?.trim()) return;

    //gemini response
    const responseText = await main(inputMessage);

    console.log(responseText);
    

    // Create user message
    const userMessage = {
      id: messages?.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    // Add user message to chat using useState
    setMessages(prev => [...prev, userMessage]);
    setInputMessage(''); // Clear input field
    setIsTyping(true); // Show typing indicator
    setIsLoading(true);

    try {
      // Simulate API call to AI service with async/await
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate AI response based on user input
      let aiResponse = '';
      const userInput = inputMessage?.toLowerCase();

      if (userInput?.includes('weather') || userInput?.includes('കാലാവസ്ഥ')) {
        aiResponse = 'ഇന്ന് കാലാവസ്ഥ നല്ലതാണ്. താപനില 28°C ആണ്, നേരിയ മഴ പ്രതീക്ഷിക്കുന്നു. കൃഷിക്ക് അനുകൂലമായ സാഹചര്യങ്ങളാണ്.';
      } else if (userInput?.includes('pest') || userInput?.includes('കീടബാധ')) {
        aiResponse = 'कीट-पतंगों से बचने के लिए नीम का तेल या जैविक कीटनाशक का इस्तेमाल करें। नियमित निरीक्षण जरूरी है।';
      } else if (userInput?.includes('price') || userInput?.includes('വില') || userInput?.includes('बाज़ार')) {
        aiResponse = 'ഇന്ന് നെല്ല് ക്വിന്റലിന് ₹2,100 നും ഗോതമ്പ് ക്വിന്റലിന് ₹1,850 നും വിൽക്കുന്നു. പ്രാദേശിക വിപണിയിൽ മികച്ച വില ലഭ്യമായേക്കാം.';
      } else {
        aiResponse = responseText;
        // aiResponse = 'मैं आपकी मदद करने की कोशिश कर रहा हूँ। कृपया अपना सवाल और स्पष्ट रूप से पूछें। आप मौसम, कीट-पतंगे, बाज़ार की कीमतों या खेती की तकनीकों के बारे में पूछ सकते हैं।';
      }

      // Create AI response message
      const aiMessage = {
        id: messages?.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      // Add AI response using useState
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      // Handle API errors
      const errorMessage = {
        id: messages?.length + 2,
        text: 'ക്ഷമിക്കണം, ഒരു സാങ്കേതിക പ്രശ്‌നം ഉണ്ടായിരുന്നു. പിന്നീട് വീണ്ടും ശ്രമിക്കുക.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  // Simple event handler for quick reply buttons
  const handleQuickReply = (message) => {
    setInputMessage(message);
    // Auto-submit the quick reply
    setTimeout(() => {
      const event = { preventDefault: () => { } };
      handleSubmit(event);
    }, 100);
  };

  // Quick reply suggestions
  const quickReplies = [
    'ഇന്നത്തെ കാലാവസ്ഥ എങ്ങനെയുണ്ട്?',
    'നെല്ലിന്റെ വില എത്രയാണ്?',
    'കീടങ്ങളെ എങ്ങനെ ഒഴിവാക്കാം?',
    'വളം എപ്പോൾ പ്രയോഗിക്കണം?'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Chat Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AI Chat Assistant 🤖
            </h1>
            <p className="text-gray-600">
              Ask me anything about farming in Malayalam or English
            </p>
          </motion.div>

          {/* Chat Container */}
          <motion.div
            className="bg-white rounded-lg shadow-medium border border-gray-200 h-96 flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                {messages?.map((message) => (
                  <motion.div
                    key={message?.id}
                    className={`flex ${message?.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message?.sender === 'user' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-900'
                      }`}>
                      <p className="text-sm">{message?.text}</p>
                      <p className={`text-xs mt-1 ${message?.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                        }`}>
                        {message?.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Scroll target */}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={handleInputChange}
                  placeholder="നിങ്ങളുടെ ചോദ്യം ഇവിടെ എഴുതുക..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || !inputMessage?.trim()}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${isLoading || !inputMessage?.trim()
                      ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  whileHover={{ scale: isLoading ? 1 : 1.05 }}
                  whileTap={{ scale: isLoading ? 1 : 0.95 }}
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </motion.button>

                {/* Mic Button (placeholder) */}
                <motion.button
                  type="button"
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => alert('Voice feature coming soon!')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-audio-lines-icon lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Quick Reply Buttons */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Questions:</h3>
            <div className="flex flex-wrap gap-2">
              {quickReplies?.map((reply, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:border-green-300 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {reply}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;