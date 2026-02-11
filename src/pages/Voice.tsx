import WarperHeader from "@/components/WarperHeader";
import WarperFooter from "@/components/WarperFooter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Mic, MicOff, Volume2, User, Bot, Settings, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/GlassCard";

const Voice = () => {
  const [isListening, setIsListening] = useState(false);
  const [voiceGender, setVoiceGender] = useState<"male" | "female">("female");
  const [conversation, setConversation] = useState<Array<{ role: "user" | "ai"; text: string }>>([
    { role: "ai", text: "Hello! I'm your voice assistant. Press the microphone button to start talking." }
  ]);

  const toggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
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
    <div className="min-h-screen bg-background flex flex-col overflow-hidden relative">
      {/* 3D Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-500/20 via-accent/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary/20 via-primary/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl"
        />
      </div>

      <WarperHeader />

      <main className="flex-1 container mx-auto px-4 py-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 via-accent/10 to-primary/20 border border-pink-500/30 mb-4"
            >
              <Zap className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-medium text-pink-400">Real-Time Voice AI</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="text-foreground">Voice </span>
              <span className="bg-gradient-to-r from-pink-400 via-accent to-primary bg-clip-text text-transparent">Assistant</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Talk naturally with AI using real-time voice recognition
            </p>
          </motion.div>

          {/* Voice Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-4 mb-8"
          >
            <GlassCard glowColor="pink" hover3D={false} className="p-1 inline-flex gap-2">
              <button
                onClick={() => setVoiceGender("female")}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  voiceGender === "female"
                    ? "bg-gradient-to-r from-pink-500 to-accent text-primary-foreground shadow-lg shadow-pink-500/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User className="w-4 h-4" />
                Female Voice
              </button>
              <button
                onClick={() => setVoiceGender("male")}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  voiceGender === "male"
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User className="w-4 h-4" />
                Male Voice
              </button>
            </GlassCard>
          </motion.div>

          {/* Microphone Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="flex justify-center mb-8"
          >
            <motion.button
              onClick={toggleListening}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-36 h-36 rounded-full flex items-center justify-center transition-all duration-300 ${
                isListening
                  ? "bg-destructive/20 border-2 border-destructive shadow-[0_0_60px_rgba(239,68,68,0.4)]"
                  : "bg-gradient-to-br from-pink-500/20 to-accent/20 border-2 border-pink-400/50 hover:shadow-[0_0_60px_rgba(240,171,252,0.4)]"
              }`}
            >
              {isListening && (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-destructive/20"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    className="absolute inset-0 rounded-full bg-destructive/30"
                  />
                </>
              )}
              {!isListening && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400/20 to-accent/20"
                />
              )}
              {isListening ? (
                <MicOff className="w-14 h-14 text-destructive relative z-10" />
              ) : (
                <Mic className="w-14 h-14 text-pink-400 relative z-10 drop-shadow-lg" />
              )}
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-muted-foreground mb-8 text-lg"
          >
            {isListening ? (
              <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                🎙️ Listening... Tap to stop
              </motion.span>
            ) : (
              "Tap to start speaking"
            )}
          </motion.p>

          {/* Conversation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard glowColor="pink" hover3D={false} className="p-5 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                <AnimatePresence>
                  {conversation.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex gap-3 ${item.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          item.role === "user"
                            ? "bg-gradient-to-br from-secondary/30 to-purple-400/20"
                            : "bg-gradient-to-br from-pink-400/30 to-accent/20"
                        }`}
                      >
                        {item.role === "user" ? (
                          <User className="w-5 h-5 text-secondary" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-pink-400" />
                        )}
                      </motion.div>
                      <div className={`max-w-[70%] p-3.5 rounded-2xl backdrop-blur-sm ${
                        item.role === "user"
                          ? "bg-gradient-to-br from-secondary/15 to-purple-400/10 border border-secondary/20"
                          : "bg-gradient-to-br from-card/60 to-card/40 border border-white/10"
                      }`}>
                        <p className="text-sm leading-relaxed">{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </GlassCard>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <GlassCard glowColor="accent" hover3D={false} className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold">Tips</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Speak clearly and at a normal pace
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Wait for the AI to finish before speaking
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Ask questions naturally as you would in conversation
                </li>
              </ul>
            </GlassCard>
          </motion.div>
        </div>
      </main>

      <WarperFooter />
    </div>
  );
};

export default Voice;
