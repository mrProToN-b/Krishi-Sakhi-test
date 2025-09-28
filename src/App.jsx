import React, { useState } from "react";
import Routes from "./Routes";
import SimpleFloatingChatbot from "./components/ui/SimpleFloatingChatbot";

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <>
      <Routes />
      <SimpleFloatingChatbot
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
      />
    </>
  );
}

export default App;
