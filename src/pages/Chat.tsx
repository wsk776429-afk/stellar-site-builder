import WarperHeader from "@/components/WarperHeader";
import WarperFooter from "@/components/WarperFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { 
  Send, 
  Bot, 
  User, 
  Calculator, 
  Code, 
  DollarSign, 
  BookOpen, 
  Briefcase, 
  Heart,
  Palette,
  Music,
  Utensils,
  Plane,
  Dumbbell
} from "lucide-react";

const agents = [
  { id: "general", name: "General AI", icon: Bot, description: "General purpose assistant" },
  { id: "math", name: "Math Expert", icon: Calculator, description: "Mathematical calculations" },
  { id: "code", name: "Code Helper", icon: Code, description: "Programming assistance" },
  { id: "finance", name: "Finance Advisor", icon: DollarSign, description: "Financial guidance" },
  { id: "tutor", name: "Study Tutor", icon: BookOpen, description: "Educational support" },
  { id: "career", name: "Career Coach", icon: Briefcase, description: "Career guidance" },
  { id: "health", name: "Health Guide", icon: Heart, description: "Wellness tips" },
  { id: "creative", name: "Creative Writer", icon: Palette, description: "Creative content" },
  { id: "music", name: "Music Expert", icon: Music, description: "Music recommendations" },
  { id: "chef", name: "Chef AI", icon: Utensils, description: "Cooking recipes" },
  { id: "travel", name: "Travel Planner", icon: Plane, description: "Travel suggestions" },
  { id: "fitness", name: "Fitness Coach", icon: Dumbbell, description: "Workout plans" },
];

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: "1", 
      role: "assistant", 
      content: "Hello! I'm your General AI assistant. How can I help you today?" 
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Thanks for your message! As the ${selectedAgent.name}, I'm here to help with ${selectedAgent.description.toLowerCase()}. This is a demo response - connect to a real AI backend for actual responses.`
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <WarperHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto h-[calc(100vh-200px)] flex gap-6">
          {/* Agent Sidebar */}
          <div className="hidden md:block w-72 bg-card rounded-xl border border-border p-4 overflow-y-auto">
            <h3 className="font-semibold text-lg mb-4">AI Agents</h3>
            <div className="space-y-2">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => {
                    setSelectedAgent(agent);
                    setMessages([{
                      id: "1",
                      role: "assistant",
                      content: `Hello! I'm your ${agent.name}. I specialize in ${agent.description.toLowerCase()}. How can I assist you?`
                    }]);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    selectedAgent.id === agent.id
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-muted border border-transparent"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedAgent.id === agent.id ? "bg-primary/20" : "bg-muted"
                  }`}>
                    <agent.icon className={`w-5 h-5 ${
                      selectedAgent.id === agent.id ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-medium ${
                      selectedAgent.id === agent.id ? "text-primary" : "text-foreground"
                    }`}>
                      {agent.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{agent.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-card rounded-xl border border-border">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <selectedAgent.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{selectedAgent.name}</h3>
                <p className="text-xs text-muted-foreground">{selectedAgent.description}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    message.role === "user" ? "bg-secondary/20" : "bg-primary/20"
                  }`}>
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-secondary" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div className={`max-w-[70%] p-3 rounded-xl ${
                    message.role === "user"
                      ? "bg-secondary/10 text-foreground"
                      : "bg-muted text-foreground"
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button onClick={handleSend} className="glow-box">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WarperFooter />
    </div>
  );
};

export default Chat;
