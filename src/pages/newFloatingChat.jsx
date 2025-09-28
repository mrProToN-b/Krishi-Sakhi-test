import React, { useState, useEffect, useRef } from "react";
import { main } from "../../utils/gemini.js";

const SimpleFloatingChatbot = ({ isOpen = false, onToggle }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const inputRef = useRef(null);

  // Check browser support on component mount
  useEffect(() => {
    const checkBrowserSupport = () => {
      const hasSpeechRecognition =
        "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
      const hasSpeechSynthesis = "speechSynthesis" in window;

      console.log("Browser support check:");
      console.log("- Speech Recognition:", hasSpeechRecognition);
      console.log("- Speech Synthesis:", hasSpeechSynthesis);

      if (!hasSpeechRecognition) {
        console.warn("Speech recognition not supported in this browser");
      }
      if (!hasSpeechSynthesis) {
        console.warn("Speech synthesis not supported in this browser");
      }
    };

    checkBrowserSupport();
  }, []);

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem("krishiSakhiLanguage");
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ml")) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference
  useEffect(() => {
    localStorage.setItem("krishiSakhiLanguage", language);
  }, [language]);

  // Text-to-speech function
  const speakText = (text) => {
    if ("speechSynthesis" in window && text) {
      // Stop any current speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "ml" ? "ml-IN" : "en-US";
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  // Stop speech function
  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Speech-to-text function
  const startVoiceInput = () => {
    // If already recording, stop recording
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    // Stop any current speech first
    stopSpeaking();

    // Check if we're on HTTPS or localhost
    const isSecureContext =
      window.isSecureContext ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (!isSecureContext) {
      alert(
        language === "ml"
          ? "വോയ്‌സ് തിരിച്ചറിയലിന് HTTPS ആവശ്യമാണ്. ദയവായി HTTPS ഉപയോഗിക്കുക."
          : "Voice recognition requires HTTPS. Please use HTTPS."
      );
      return;
    }

    // Check network connectivity
    if (!navigator.onLine) {
      alert(
        language === "ml"
          ? "ഇന്റർനെറ്റ് കണക്ഷൻ ഇല്ല. ദയവായി ഇന്റർനെറ്റ് കണക്ഷൻ പരിശോധിക്കുക."
          : "No internet connection. Please check your internet connection."
      );
      return;
    }

    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === "ml" ? "ml-IN" : "en-US";
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        console.log("Speech recognition started");
        setIsRecording(true);
      };

      // Add timeout to prevent hanging
      const timeout = setTimeout(() => {
        if (isRecording) {
          recognition.stop();
          setIsRecording(false);
          alert(
            language === "ml"
              ? "വോയ്‌സ് തിരിച്ചറിയൽ സമയം കഴിഞ്ഞു. വീണ്ടും ശ്രമിക്കുക."
              : "Voice recognition timed out. Please try again."
          );
        }
      }, 10000); // 10 second timeout

      recognition.onresult = (event) => {
        console.log("Speech recognition result:", event);
        clearTimeout(timeout);
        if (event.results && event.results.length > 0) {
          const transcript = event.results[0][0].transcript;
          console.log("Transcript:", transcript);
          setInputMessage(transcript);
          // Focus the input and place the cursor at the end so user can press Enter
          requestAnimationFrame(() => {
            if (inputRef.current) {
              inputRef.current.focus();
              try {
                inputRef.current.setSelectionRange(
                  transcript.length,
                  transcript.length
                );
              } catch (_) {
                // Ignore if not supported
              }
            }
          });
        }
        setIsRecording(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        clearTimeout(timeout);
        setIsRecording(false);

        // Show user-friendly error messages
        let errorMessage = "";
        switch (event.error) {
          case "no-speech":
            errorMessage =
              language === "ml"
                ? "വോയ്‌സ് കേൾക്കാൻ കഴിഞ്ഞില്ല. വീണ്ടും ശ്രമിക്കുക."
                : "No speech detected. Please try again.";
            break;
          case "audio-capture":
            errorMessage =
              language === "ml"
                ? "മൈക്രോഫോൺ ലഭ്യമല്ല."
                : "Microphone not available.";
            break;
          case "not-allowed":
            errorMessage =
              language === "ml"
                ? "മൈക്രോഫോൺ അനുമതി നൽകുക."
                : "Please allow microphone access.";
            break;
          case "network":
            if (retryCount < 2) {
              setRetryCount((prev) => prev + 1);
              setTimeout(() => {
                console.log("Retrying speech recognition...");
                startVoiceInput();
              }, 2000);
              return;
            } else {
              errorMessage =
                language === "ml"
                  ? "നെറ്റ്‌വർക്ക് പിശക്. ഇന്റർനെറ്റ് കണക്ഷൻ പരിശോധിക്കുക."
                  : "Network error. Please check your internet connection.";
              setRetryCount(0);
            }
            break;
          case "service-not-allowed":
            errorMessage =
              language === "ml"
                ? "വോയ്‌സ് സേവനം അനുവദിച്ചിട്ടില്ല."
                : "Voice service not allowed.";
            break;
          default:
            errorMessage =
              language === "ml"
                ? `വോയ്‌സ് തിരിച്ചറിയൽ പിശക്: ${event.error}`
                : `Voice recognition error: ${event.error}`;
        }
        alert(errorMessage);
      };

      recognition.onend = () => {
        console.log("Speech recognition ended");
        clearTimeout(timeout);
        setIsRecording(false);
      };

      try {
        recognition.start();
        console.log("Starting speech recognition...");
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
        setIsRecording(false);
        alert(
          language === "ml"
            ? "വോയ്‌സ് തിരിച്ചറിയൽ ആരംഭിക്കാൻ കഴിഞ്ഞില്ല"
            : "Failed to start voice recognition"
        );
      }
    } else {
      alert(
        language === "ml"
          ? "ഈ ബ്രൗസറിൽ വോയ്‌സ് റെക്കോഗ്നിഷൻ പിന്തുണയ്ക്കുന്നില്ല. ദയവായി ടെക്സ്റ്റ് ടൈപ്പ് ചെയ്യുക."
          : "Voice recognition is not supported in this browser. Please type your message."
      );
    }
  };

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === "en" ? "ml" : "en"));
  };

  const handleClearChat = () => {
    setMessages([]);
    setInputMessage("");
    stopSpeaking();
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

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
      // Get AI response from Gemini
      const aiResponse = await main(inputMessage);

      const aiMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Auto text-to-speech for AI response (only if not recording)
      if (!isRecording) {
        speakText(aiResponse);
      }
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content:
          language === "ml"
            ? "ക്ഷമിക്കണം, ഒരു പ്രശ്നം ഉണ്ടായിരുന്നു. പിന്നീട് വീണ്ടും ശ്രമിക്കുക."
            : "Sorry, I'm having trouble connecting to the AI service. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "56px",
            height: "56px",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
          }}
          aria-label="Open AI Assistant">
          💬
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "400px",
            height: "600px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            border: "1px solid #e5e7eb",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
          }}>
          {/* Header */}
          <div
            style={{
              padding: "16px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#111827",
                }}>
                {language === "ml" ? "AI കൃഷി സഹായി" : "AI Farm Assistant"}
              </h3>
              <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>
                {language === "ml"
                  ? "എപ്പോഴും സഹായിക്കാൻ തയ്യാറാണ്"
                  : "Always here to help"}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* Clear Chat Button */}
              {messages.length > 0 && (
                <button
                  onClick={handleClearChat}
                  style={{
                    background: "none",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "12px",
                    color: "#374151",
                    padding: "4px 8px",
                    fontWeight: "500",
                  }}
                  title={language === "ml" ? "ചാറ്റ് മായ്ക്കുക" : "Clear chat"}>
                  🗑️
                </button>
              )}

              {/* Language Toggle Button */}
              <button
                onClick={handleLanguageToggle}
                style={{
                  background: "none",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  color: "#374151",
                  padding: "4px 8px",
                  fontWeight: "500",
                }}>
                {language === "en" ? "മലയാളം" : "English"}
              </button>

              <button
                onClick={onToggle}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "#6b7280",
                }}>
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}>
            {messages.length === 0 && (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "#dcfce7",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    fontSize: "32px",
                  }}>
                  🤖
                </div>
                <h3 style={{ margin: "0 0 8px", color: "#111827" }}>
                  {language === "ml"
                    ? "ഹലോ! ഞാൻ നിങ്ങളുടെ AI കൃഷി സഹായി ആണ്"
                    : "Hello! I'm your AI farming assistant"}
                </h3>
                <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
                  {language === "ml"
                    ? "നിങ്ങളുടെ കൃഷി ചോദ്യങ്ങൾക്ക് ഞാൻ ഉത്തരം നൽകാം"
                    : "I can help you with all your farming questions"}
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  justifyContent:
                    message.type === "user" ? "flex-end" : "flex-start",
                }}>
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    backgroundColor:
                      message.type === "user" ? "#16a34a" : "#f3f4f6",
                    color: message.type === "user" ? "white" : "#374151",
                    position: "relative",
                  }}>
                  {message.content}

                  {/* Text-to-Speech Button for AI messages */}
                  {message.type === "assistant" && (
                    <button
                      onClick={() =>
                        isSpeaking ? stopSpeaking() : speakText(message.content)
                      }
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        background: isSpeaking ? "#ef4444" : "#16a34a",
                        border: "none",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        color: "white",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                      title={
                        isSpeaking
                          ? language === "ml"
                            ? "വോയ്‌സ് നിർത്തുക"
                            : "Stop voice"
                          : language === "ml"
                          ? "വോയ്‌സ് കേൾക്കുക"
                          : "Listen to voice"
                      }>
                      {isSpeaking ? "⏹️" : "🔊"}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}>
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#6b7280",
                      borderRadius: "50%",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#6b7280",
                      borderRadius: "50%",
                      animation: "pulse 1.5s ease-in-out infinite 0.2s",
                    }}
                  />
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#6b7280",
                      borderRadius: "50%",
                      animation: "pulse 1.5s ease-in-out infinite 0.4s",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Voice Recording Indicator */}
            {isRecording && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}>
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    backgroundColor: retryCount > 0 ? "#fef3cd" : "#fef2f2",
                    color: retryCount > 0 ? "#d97706" : "#ef4444",
                    border:
                      retryCount > 0
                        ? "1px solid #fde68a"
                        : "1px solid #fecaca",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: retryCount > 0 ? "#d97706" : "#ef4444",
                      borderRadius: "50%",
                      animation: "pulse 1s ease-in-out infinite",
                    }}
                  />
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: retryCount > 0 ? "#d97706" : "#ef4444",
                      borderRadius: "50%",
                      animation: "pulse 1s ease-in-out infinite 0.2s",
                    }}
                  />
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: retryCount > 0 ? "#d97706" : "#ef4444",
                      borderRadius: "50%",
                      animation: "pulse 1s ease-in-out infinite 0.4s",
                    }}
                  />
                  <span style={{ marginLeft: "8px" }}>
                    {retryCount > 0
                      ? language === "ml"
                        ? "വീണ്ടും ശ്രമിക്കുന്നു..."
                        : "Retrying..."
                      : language === "ml"
                      ? "വോയ്‌സ് റെക്കോർഡിംഗ്..."
                      : "Listening..."}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            style={{
              padding: "16px",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              gap: "8px",
            }}>
            <div style={{ display: "flex", gap: "8px", flex: 1 }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                ref={inputRef}
                placeholder={
                  language === "ml"
                    ? "കൃഷി, കാലാവസ്ഥ, വിളകൾ എന്നിവയെക്കുറിച്ച് ചോദിക്കുക..."
                    : "Ask about farming, weather, crops..."
                }
                disabled={isTyping}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  opacity: isTyping ? 0.6 : 1,
                  cursor: isTyping ? "not-allowed" : "text",
                }}
              />

              {/* Voice Input Button */}
              <button
                type="button"
                onClick={startVoiceInput}
                disabled={isTyping || isRecording}
                style={{
                  padding: "8px",
                  backgroundColor: isRecording ? "#ef4444" : "#6b7280",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: isTyping ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: isTyping ? 0.6 : 1,
                }}
                title={
                  isRecording
                    ? language === "ml"
                      ? "റെക്കോർഡിംഗ് നിർത്തുക"
                      : "Stop recording"
                    : language === "ml"
                    ? "വോയ്‌സ് റെക്കോർഡിംഗ്"
                    : "Voice recording"
                }>
                {isRecording ? "⏹️" : "🎤"}
              </button>
            </div>

            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              style={{
                padding: "8px 16px",
                backgroundColor:
                  isTyping || !inputMessage.trim() ? "#9ca3af" : "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor:
                  isTyping || !inputMessage.trim() ? "not-allowed" : "pointer",
                fontSize: "14px",
              }}>
              {isTyping ? "..." : language === "ml" ? "അയയ്ക്കുക" : "Send"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SimpleFloatingChatbot;
