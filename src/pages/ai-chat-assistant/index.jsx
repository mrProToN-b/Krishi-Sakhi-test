import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import QuickReplies from './components/QuickReplies';
import ChatInput from './components/ChatInput';
import WelcomeScreen from './components/WelcomeScreen';

const AIChatAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('krishiSakhiLanguage');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ml')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('krishiSakhiLanguage', language);
  }, [language]);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Mock AI responses based on language
  const getAIResponse = (userMessage) => {
    const responses = {
      en: {
        weather: [
          `Based on current meteorological data, expect partly cloudy skies with temperatures ranging from 24°C to 32°C this week.\n\nRainfall probability is 40% on Wednesday and Thursday. Consider adjusting your irrigation schedule accordingly.`,
          `Weather forecast shows favorable conditions for farming:\n• Monday-Tuesday: Clear skies, ideal for field work\n• Wednesday-Friday: Light showers expected\n• Weekend: Sunny conditions return\n\nPerfect time for planting if you haven't already!`
        ],
        pest: [
          `For effective pest control, I recommend:\n\n1. **Organic Neem Oil Spray**: Mix 2 tablespoons per liter of water\n2. **Application Time**: Early morning or late evening\n3. **Frequency**: Every 7-10 days\n4. **Prevention**: Maintain proper plant spacing for air circulation\n\nWould you like specific advice for any particular pest?`,
          `Common pest management strategies:\n\n• **Biological Control**: Introduce beneficial insects like ladybugs\n• **Crop Rotation**: Breaks pest life cycles naturally\n• **Companion Planting**: Marigolds deter many harmful insects\n• **Regular Monitoring**: Check plants weekly for early detection`
        ],
        market: [
          `Current market prices (per quintal):\n\n🌾 **Rice**: ₹2,100-2,300\n🍅 **Tomato**: ₹800-1,200\n🥔 **Potato**: ₹1,500-1,800\n🌶️ **Chili**: ₹4,500-5,200\n\nPrices are trending upward due to seasonal demand. Good time to sell if you have stock ready!`,
          `Market analysis for this week:\n\n📈 **Rising**: Vegetables due to festival season\n📉 **Stable**: Grains and pulses\n💡 **Tip**: Consider direct selling to consumers for better margins\n\nWould you like specific price information for your crops?`
        ],
        soil: [
          `To improve soil health:\n\n1. **Add Organic Matter**: Compost, farmyard manure\n2. **Test pH Levels**: Ideal range is 6.0-7.5 for most crops\n3. **Crop Rotation**: Legumes help fix nitrogen naturally\n4. **Avoid Over-tilling**: Preserves soil structure\n5. **Cover Crops**: Protect soil during off-season\n\nRegular soil testing every 6 months is recommended.`,
          `Soil health indicators to monitor:\n\n✅ **Good Signs**: Dark color, earthworms present, good drainage\n❌ **Warning Signs**: Compaction, poor water retention, yellowing plants\n\n**Quick Test**: Squeeze moist soil - it should crumble, not form a hard ball.\n\nWould you like guidance on soil testing procedures?`
        ],
        irrigation: [
          `Smart irrigation practices:\n\n💧 **Drip Irrigation**: Saves 30-50% water\n⏰ **Best Timing**: Early morning (5-8 AM) or evening (6-8 PM)\n📏 **Depth Check**: Water should reach 6-8 inches deep\n🌱 **Mulching**: Reduces water evaporation by 70%\n\nMonitor soil moisture at root level, not just surface!`,
          `Water management tips:\n\n• **Rainwater Harvesting**: Collect and store for dry periods\n• **Soil Moisture Sensors**: Prevent over/under watering\n• **Scheduling**: Deep, less frequent watering is better\n• **Plant Selection**: Choose drought-resistant varieties when possible`
        ],
        general: [
          `I'm here to help with all your farming needs! You can ask me about:\n\n🌤️ Weather forecasts and alerts\n🐛 Pest and disease management\n💰 Market prices and trends\n🌱 Crop selection and planning\n💧 Irrigation and water management\n🧪 Soil health and fertilizers\n\nWhat would you like to know more about?`,
          `As your AI farming assistant, I can provide guidance on:\n\n• **Seasonal Planning**: When to plant, harvest, and prepare fields\n• **Problem Solving**: Identify issues with photos and symptoms\n• **Best Practices**: Modern techniques for better yields\n• **Market Intelligence**: Timing your sales for maximum profit\n\nFeel free to ask anything about farming!`
        ]
      },
      ml: {
        weather: [
          `നിലവിലെ കാലാവസ്ഥാ വിവരങ്ങൾ അനുസരിച്ച്, ഈ ആഴ്ച 24°C മുതൽ 32°C വരെ താപനിലയിൽ ഭാഗികമായി മേഘാവൃതമായ ആകാശം പ്രതീക്ഷിക്കാം.\n\nബുധനാഴ്ചയും വ്യാഴാഴ്ചയും മഴയ്ക്കുള്ള സാധ്യത 40% ആണ്. അതനുസരിച്ച് നിങ്ങളുടെ ജലസേചന ഷെഡ്യൂൾ ക്രമീകരിക്കാൻ പരിഗണിക്കുക.`,
          `കാലാവസ്ഥാ പ്രവചനം കൃഷിക്ക് അനുകൂലമായ സാഹചര്യങ്ങൾ കാണിക്കുന്നു:\n• തിങ്കൾ-ചൊവ്വ: തെളിഞ്ഞ ആകാശം, വയൽ ജോലികൾക്ക് അനുയോജ്യം\n• ബുധൻ-വെള്ളി: നേരിയ മഴ പ്രതീക്ഷിക്കാം\n• വാരാന്ത്യം: വെയിൽ തിരിച്ചുവരും\n\nഇതുവരെ നടാത്തിയിട്ടില്ലെങ്കിൽ നടാനുള്ള മികച്ച സമയം!`
        ],
        pest: [
          `ഫലപ്രദമായ കീട നിയന്ത്രണത്തിനായി ഞാൻ ശുപാർശ ചെയ്യുന്നു:\n\n1. **ഓർഗാനിക് വേപ്പെണ്ണ സ്പ്രേ**: ഒരു ലിറ്റർ വെള്ളത്തിൽ 2 ടേബിൾസ്പൂൺ കലർത്തുക\n2. **പ്രയോഗ സമയം**: അതിരാവിലെ (5-8 AM) അല്ലെങ്കിൽ വൈകുന്നേരം (6-8 PM)\n3. **ആവൃത്തി**: 7-10 ദിവസത്തിലൊരിക്കൽ\n4. **പ്രതിരോധം**: വായു സഞ്ചാരത്തിനായി ശരിയായ ചെടി അകലം പാലിക്കുക\n\nഏതെങ്കിലും പ്രത്യേക കീടത്തിന് പ്രത്യേക ഉപദേശം വേണോ?`,
          `സാധാരണ കീട പരിപാലന തന്ത്രങ്ങൾ:\n\n• **ജൈവിക നിയന്ത്രണം**: ലേഡിബഗ്സ് പോലുള്ള ഗുണകരമായ പ്രാണികളെ അവതരിപ്പിക്കുക\n• **വിള ഭ്രമണം**: കീടങ്ങളുടെ ജീവിത ചക്രം സ്വാഭാവികമായി തകർക്കുന്നു\n• **കൂട്ടുകൃഷി**: ചെമ്പരത്തി പല ദോഷകരമായ പ്രാണികളെയും അകറ്റുന്നു\n• **പതിവ് നിരീക്ഷണം**: നേരത്തെ കണ്ടെത്താൻ ആഴ്ചതോറും ചെടികൾ പരിശോധിക്കുക`
        ],
        market: [
          `നിലവിലെ വിപണി വിലകൾ (ക്വിന്റലിന്):\n\n🌾 **നെല്ല്**: ₹2,100-2,300\n🍅 **തക്കാളി**: ₹800-1,200\n🥔 **ഉരുളക്കിഴങ്ങ്**: ₹1,500-1,800\n🌶️ **മുളക്**: ₹4,500-5,200\n\nകാലാനുസൃത ഡിമാൻഡ് കാരണം വിലകൾ ഉയരുന്ന പ്രവണത കാണിക്കുന്നു. സ്റ്റോക്ക് തയ്യാറാണെങ്കിൽ വിൽക്കാനുള്ള നല്ല സമയം!`,
          `ഈ ആഴ്ചയുടെ വിപണി വിശകലനം:\n\n📈 **ഉയരുന്നു**: ഉത്സവ കാലത്തെ പച്ചക്കറികൾ\n📉 **സ്ഥിരം**: ധാന്യങ്ങളും പയറുവർഗ്ഗങ്ങളും\n💡 **നുറുങ്ങ്**: മികച്ച മാർജിനുകൾക്കായി ഉപഭോക്താക്കൾക്ക് നേരിട്ട് വിൽക്കാൻ പരിഗണിക്കുക\n\nനിങ്ങളുടെ വിളകൾക്കുള്ള പ്രത്യേക വില വിവരങ്ങൾ വേണോ?`
        ],
        soil: [
          `മണ്ണിന്റെ ആരോഗ്യം മെച്ചപ്പെടുത്താൻ:\n\n1. **ജൈവവസ്തുക്കൾ ചേർക്കുക**: കമ്പോസ്റ്റ്, ഫാം യാർഡ് വളം\n2. **pH ലെവൽ പരിശോധിക്കുക**: മിക്ക വിളകൾക്കും അനുയോജ്യമായ പരിധി 6.0-7.5 ആണ്\n3. **വിള ഭ്രമണം**: പയറുവർഗ്ഗങ്ങൾ സ്വാഭാവികമായി നൈട്രജൻ ഉറപ്പിക്കാൻ സഹായിക്കുന്നു\n4. **അമിത ഉഴവ് ഒഴിവാക്കുക**: മണ്ണിന്റെ ഘടന സംരക്ഷിക്കുന്നു\n5. **കവർ വിളകൾ**: ഓഫ് സീസണിൽ മണ്ണിനെ സംരക്ഷിക്കുന്നു\n\n6 മാസത്തിലൊരിക്കൽ പതിവ് മണ്ണ് പരിശോധന ശുപാർശ ചെയ്യുന്നു.`,
          `നിരീക്ഷിക്കേണ്ട മണ്ണിന്റെ ആരോഗ്യ സൂചകങ്ങൾ:\n\n✅ **നല്ല അടയാളങ്ങൾ**: ഇരുണ്ട നിറം, മണ്ണിരകളുടെ സാന്നിധ്യം, നല്ല ഡ്രെയിനേജ്\n❌ **മുന്നറിയിപ്പ് അടയാളങ്ങൾ**: കംപാക്ഷൻ, മോശം ജല നിലനിർത്തൽ, ചെടികൾ മഞ്ഞയാകൽ\n\n**ദ്രുത പരിശോധന**: നനഞ്ഞ മണ്ണ് ഞെക്കുക - അത് പൊടിഞ്ഞുപോകണം, കഠിനമായ പന്ത് ഉണ്ടാക്കരുത്.\n\nമണ്ണ് പരിശോധന നടപടിക്രമങ്ങളെക്കുറിച്ചുള്ള മാർഗ്ഗനിർദ്ദേശം വേണോ?`
        ],
        irrigation: [
          `സ്മാർട്ട് ജലസേചന രീതികൾ:\n\n💧 **ഡ്രിപ്പ് ഇറിഗേഷൻ**: 30-50% വെള്ളം ലാഭിക്കുന്നു\n⏰ **മികച്ച സമയം**: അതിരാവിലെ (5-8 AM) അല്ലെങ്കിൽ വൈകുന്നേരം (6-8 PM)\n📏 **ആഴം പരിശോധന**: വെള്ളം 6-8 ഇഞ്ച് ആഴത്തിൽ എത്തണം\n🌱 **മൾച്ചിംഗ്**: ജല ബാഷ്പീകരണം 70% കുറയ്ക്കുന്നു\n\nഉപരിതലത്തിൽ മാത്രമല്ല, റൂട്ട് ലെവലിൽ മണ്ണിന്റെ ഈർപ്പം നിരീക്ഷിക്കുക!`,
          `ജല പരിപാലന നുറുങ്ങുകൾ:\n\n• **മഴവെള്ള സംഭരണം**: വരണ്ട കാലങ്ങൾക്കായി ശേഖരിച്ച് സംഭരിക്കുക\n• **മണ്ണിന്റെ ഈർപ്പം സെൻസറുകൾ**: അമിത/കുറവ് നനയ്ക്കൽ തടയുന്നു\n• **ഷെഡ്യൂളിംഗ്**: ആഴത്തിലുള്ള, കുറവ് ആവൃത്തിയിലുള്ള നനയ്ക്കൽ മികച്ചതാണ്\n• **ചെടി തിരഞ്ഞെടുപ്പ്**: സാധ്യമാകുമ്പോൾ വരൾച്ച പ്രതിരോധശേഷിയുള്ള ഇനങ്ങൾ തിരഞ്ഞെടുക്കുക`
        ],
        general: [
          `നിങ്ങളുടെ എല്ലാ കൃഷി ആവശ്യങ്ങളിലും സഹായിക്കാൻ ഞാൻ ഇവിടെയുണ്ട്! നിങ്ങൾക്ക് എന്നോട് ചോദിക്കാം:\n\n🌤️ കാലാവസ്ഥാ പ്രവചനങ്ങളും മുന്നറിയിപ്പുകളും\n🐛 കീട-രോഗ പരിപാലനം\n💰 വിപണി വിലകളും ട്രെൻഡുകളും\n🌱 വിള തിരഞ്ഞെടുപ്പും ആസൂത്രണവും\n💧 ജലസേചനവും ജല പരിപാലനവും\n🧪 മണ്ണിന്റെ ആരോഗ്യവും വളങ്ങളും\n\nഏതിനെക്കുറിച്ചാണ് കൂടുതൽ അറിയാൻ ആഗ്രഹിക്കുന്നത്?`,
          `നിങ്ങളുടെ AI കൃഷി സഹായി എന്ന നിലയിൽ, എനിക്ക് മാർഗ്ഗനിർദ്ദേശം നൽകാൻ കഴിയും:\n\n• **സീസണൽ പ്ലാനിംഗ്**: എപ്പോൾ നടാം, വിളവെടുക്കാം, വയൽ തയ്യാറാക്കാം\n• **പ്രശ്ന പരിഹാരം**: ഫോട്ടോകളും ലക്ഷണങ്ങളും ഉപയോഗിച്ച് പ്രശ്നങ്ങൾ തിരിച്ചറിയുക\n• **മികച്ച രീതികൾ**: മികച്ച വിളവിനുള്ള ആധുനിക സാങ്കേതിക വിദ്യകൾ\n• **മാർക്കറ്റ് ഇന്റലിജൻസ്**: പരമാവധി ലാഭത്തിനായി നിങ്ങളുടെ വിൽപ്പന സമയം നിശ്ചയിക്കുക\n\nകൃഷിയെക്കുറിച്ച് എന്തും ചോദിക്കാൻ മടിക്കരുത്!`
        ]
      }
    }; // Add comma after responses object

    const currentResponses = responses?.[language] || responses?.en;
    const message = userMessage?.toLowerCase();

    // Determine response category based on keywords
    if (message?.includes('weather') || message?.includes('കാലാവസ്ഥ') || message?.includes('rain') || message?.includes('മഴ')) {
      return currentResponses?.weather?.[Math.floor(Math.random() * currentResponses?.weather?.length)];
    } else if (message?.includes('pest') || message?.includes('കീട') || message?.includes('disease') || message?.includes('രോഗ') || message?.includes('bug')) {
      return currentResponses?.pest?.[Math.floor(Math.random() * currentResponses?.pest?.length)];
    } else if (message?.includes('price') || message?.includes('വില') || message?.includes('market') || message?.includes('വിപണി') || message?.includes('sell')) {
      return currentResponses?.market?.[Math.floor(Math.random() * currentResponses?.market?.length)];
    } else if (message?.includes('soil') || message?.includes('മണ്ണ') || message?.includes('fertilizer') || message?.includes('വളം')) {
      return currentResponses?.soil?.[Math.floor(Math.random() * currentResponses?.soil?.length)];
    } else if (message?.includes('water') || message?.includes('വെള്ളം') || message?.includes('irrigation') || message?.includes('ജലസേചന')) {
      return currentResponses?.irrigation?.[Math.floor(Math.random() * currentResponses?.irrigation?.length)];
    } else {
      return currentResponses?.general?.[Math.floor(Math.random() * currentResponses?.general?.length)];
    }
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText?.trim()) return;

    // Hide welcome screen
    setShowWelcome(false);

    // Add user message
    const userMessage = {
      id: Date.now(),
      content: messageText,
      timestamp: new Date(),
      isUser: true,
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        content: getAIResponse(messageText),
        timestamp: new Date(),
        isUser: false
      };

      setMessages(prev => {
        // Mark user message as read
        const updatedMessages = prev?.map(msg => 
          msg?.id === userMessage?.id ? { ...msg, status: 'read' } : msg
        );
        return [...updatedMessages, aiResponse];
      });
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickReply = (query) => {
    handleSendMessage(query);
  };

  const handleLanguageToggle = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleClearChat = () => {
    setMessages([]);
    setShowWelcome(true);
  };

  const handleQuickStart = (question) => {
    if (question) {
      handleSendMessage(question);
    } else {
      setShowWelcome(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:pl-64">
      {/* Chat Header */}
      <ChatHeader
        language={language}
        onClearChat={handleClearChat}
        messageCount={messages?.length}
      />
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {showWelcome ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1"
            >
              <WelcomeScreen
                language={language}
                onQuickStart={handleQuickStart}
              />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              {/* Messages Area */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
                style={{ paddingBottom: '120px' }}
              >
                {messages?.map((message) => (
                  <MessageBubble
                    key={message?.id}
                    message={message}
                    isUser={message?.isUser}
                  />
                ))}
                
                {isTyping && (
                  <MessageBubble 
                    isTyping={true} 
                    message={{}} 
                    isUser={false} 
                  />
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages?.length === 0 && !isTyping && (
                <QuickReplies
                  onQuickReply={handleQuickReply}
                  language={language}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Input - Always visible when not on welcome screen */}
        {!showWelcome && (
          <div className="border-t border-border bg-card">
            <ChatInput
              onSendMessage={handleSendMessage}
              onLanguageToggle={handleLanguageToggle}
              language={language}
              disabled={isTyping}
            />
          </div>
        )}
      </div>
      {/* Mobile Bottom Padding */}
      <div className="lg:hidden h-16"></div>
    </div>
  );
};

export default AIChatAssistant;