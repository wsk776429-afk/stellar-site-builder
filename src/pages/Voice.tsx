import WarperHeader from "@/components/WarperHeader";
import WarperFooter from "@/components/WarperFooter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Mic, MicOff, Volume2, User, Bot, Settings } from "lucide-react";

const Voice = () => {
  const [isListening, setIsListening] = useState(false);
  const [voiceGender, setVoiceGender] = useState<"male" | "female">("female");
  const [conversation, setConversation] = useState<Array<{ role: "user" | "ai"; text: string }>>([
    { role: "ai", text: "Hello! I'm your voice assistant. Press the microphone button to start talking." }
  ]);

  const toggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate voice interaction
      setTimeout(() => {
        setConversation((prev) => [...prev, { role: "user", text: "Hello, can you help me?" }]);
        setTimeout(() => {
          setConversation((prev) => [...prev, { 
            role: "ai", 
            text: "Of course! I'm here to help. What would you like to know?" 
          }]);
          setIsListening(false);
        }, 1500);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <WarperHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-foreground">Voice </span>
              <span className="text-chart-3 glow-text">Assistant</span>
            </h1>
            <p className="text-muted-foreground">
              Talk naturally with AI using real-time voice recognition
            </p>
          </div>

          {/* Voice Settings */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={voiceGender === "female" ? "default" : "outline"}
              onClick={() => setVoiceGender("female")}
              className="gap-2"
            >
              <User className="w-4 h-4" />
              Female Voice
            </Button>
            <Button
              variant={voiceGender === "male" ? "default" : "outline"}
              onClick={() => setVoiceGender("male")}
              className="gap-2"
            >
              <User className="w-4 h-4" />
              Male Voice
            </Button>
          </div>

          {/* Microphone Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={toggleListening}
              className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                isListening
                  ? "bg-destructive/20 border-2 border-destructive"
                  : "bg-chart-3/20 border-2 border-chart-3 hover:bg-chart-3/30"
              }`}
            >
              {isListening && (
                <>
                  <div className="absolute inset-0 rounded-full bg-destructive/20 animate-ping" />
                  <div className="absolute inset-4 rounded-full bg-destructive/30 animate-pulse" />
                </>
              )}
              {isListening ? (
                <MicOff className="w-12 h-12 text-destructive relative z-10" />
              ) : (
                <Mic className="w-12 h-12 text-chart-3 relative z-10" />
              )}
            </button>
          </div>

          <p className="text-center text-muted-foreground mb-8">
            {isListening ? "Listening... Tap to stop" : "Tap to start speaking"}
          </p>

          {/* Conversation */}
          <div className="bg-card rounded-xl border border-border p-4 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {conversation.map((item, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${item.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    item.role === "user" ? "bg-secondary/20" : "bg-chart-3/20"
                  }`}>
                    {item.role === "user" ? (
                      <User className="w-5 h-5 text-secondary" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-chart-3" />
                    )}
                  </div>
                  <div className={`max-w-[70%] p-3 rounded-xl ${
                    item.role === "user"
                      ? "bg-secondary/10"
                      : "bg-muted"
                  }`}>
                    <p className="text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Tips</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Speak clearly and at a normal pace</li>
              <li>• Wait for the AI to finish before speaking</li>
              <li>• Ask questions naturally as you would in conversation</li>
            </ul>
          </div>
        </div>
      </main>

      <WarperFooter />
    </div>
  );
};

export default Voice;
