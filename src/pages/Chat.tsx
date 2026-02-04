import WarperHeader from "@/components/WarperHeader";
import WarperFooter from "@/components/WarperFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
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
  Dumbbell,
  Loader2,
  Plus,
  MessageSquare,
  Trash2
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

interface Conversation {
  id: string;
  agent_id: string;
  title: string | null;
  created_at: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const Chat = () => {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversations when user logs in
  useEffect(() => {
    if (user) {
      loadConversations();
    } else {
      setConversations([]);
      setCurrentConversationId(null);
      setMessages([{
        id: "welcome",
        role: "assistant",
        content: "Hello! I'm your General AI assistant. Sign in to save your chat history!"
      }]);
    }
  }, [user]);

  const loadConversations = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error loading conversations:", error);
      return;
    }

    setConversations(data || []);
  };

  const loadMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error loading messages:", error);
      return;
    }

    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      const agent = agents.find(a => a.id === conversation.agent_id) || agents[0];
      setSelectedAgent(agent);
    }

    setMessages(data?.map(m => ({
      id: m.id,
      role: m.role as "user" | "assistant",
      content: m.content
    })) || []);
    setCurrentConversationId(conversationId);
    setShowHistory(false);
  };

  const createNewConversation = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your conversations.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    const { data, error } = await supabase
      .from("conversations")
      .insert({
        user_id: user.id,
        agent_id: selectedAgent.id,
        title: "New conversation"
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating conversation:", error);
      toast({
        title: "Error",
        description: "Failed to create conversation",
        variant: "destructive",
      });
      return null;
    }

    setConversations(prev => [data, ...prev]);
    setCurrentConversationId(data.id);
    setMessages([]);
    return data.id;
  };

  const deleteConversation = async (conversationId: string) => {
    const { error } = await supabase
      .from("conversations")
      .delete()
      .eq("id", conversationId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete conversation",
        variant: "destructive",
      });
      return;
    }

    setConversations(prev => prev.filter(c => c.id !== conversationId));
    if (currentConversationId === conversationId) {
      setCurrentConversationId(null);
      setMessages([]);
    }
    toast({
      title: "Deleted",
      description: "Conversation deleted successfully",
    });
  };

  const saveMessage = async (conversationId: string, role: "user" | "assistant", content: string) => {
    if (!user) return;

    await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        role,
        content
      });

    // Update conversation title if it's the first user message
    if (role === "user") {
      const title = content.slice(0, 50) + (content.length > 50 ? "..." : "");
      await supabase
        .from("conversations")
        .update({ title, updated_at: new Date().toISOString() })
        .eq("id", conversationId);
      
      setConversations(prev => prev.map(c => 
        c.id === conversationId ? { ...c, title } : c
      ));
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    let convId = currentConversationId;
    
    // Create new conversation if needed
    if (!convId && user) {
      convId = await createNewConversation();
      if (!convId) return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Save user message
    if (convId) {
      await saveMessage(convId, "user", input);
    }

    // Prepare messages for API
    const apiMessages = messages.map(m => ({
      role: m.role,
      content: m.content
    }));
    apiMessages.push({ role: "user", content: input });

    let assistantContent = "";

    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: apiMessages,
          agentId: selectedAgent.id 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      const assistantId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => 
                prev.map(m => 
                  m.id === assistantId 
                    ? { ...m, content: assistantContent }
                    : m
                )
              );
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => 
                prev.map(m => 
                  m.id === assistantId 
                    ? { ...m, content: assistantContent }
                    : m
                )
              );
            }
          } catch { /* ignore */ }
        }
      }

      // Save assistant message
      if (convId && assistantContent) {
        await saveMessage(convId, "assistant", assistantContent);
      }

    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
      setMessages(prev => prev.filter(m => m.role !== "assistant" || m.content !== ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgentChange = (agent: typeof agents[0]) => {
    setSelectedAgent(agent);
    setCurrentConversationId(null);
    setMessages([{
      id: "welcome",
      role: "assistant",
      content: `Hello! I'm your ${agent.name}. I specialize in ${agent.description.toLowerCase()}. How can I assist you?`
    }]);
  };

  const startNewChat = () => {
    setCurrentConversationId(null);
    setMessages([{
      id: "welcome",
      role: "assistant",
      content: `Hello! I'm your ${selectedAgent.name}. How can I assist you?`
    }]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <WarperHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto h-[calc(100vh-200px)] flex gap-6">
          {/* Sidebar */}
          <div className="hidden md:flex flex-col w-72 bg-card rounded-xl border border-border overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-border">
              <button
                onClick={() => setShowHistory(false)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  !showHistory ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Agents
              </button>
              <button
                onClick={() => setShowHistory(true)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  showHistory ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                History
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {showHistory ? (
                <div className="space-y-2">
                  <Button
                    onClick={startNewChat}
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    New Chat
                  </Button>
                  
                  {!user ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Sign in to view history</p>
                    </div>
                  ) : conversations.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No conversations yet</p>
                    </div>
                  ) : (
                    conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={`group flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all ${
                          currentConversationId === conv.id
                            ? "bg-primary/10 border border-primary/30"
                            : "hover:bg-muted border border-transparent"
                        }`}
                        onClick={() => loadMessages(conv.id)}
                      >
                        <MessageSquare className="w-4 h-4 shrink-0 text-muted-foreground" />
                        <span className="flex-1 text-sm truncate">
                          {conv.title || "New conversation"}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteConversation(conv.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/20 rounded transition-all"
                        >
                          <Trash2 className="w-3 h-3 text-destructive" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {agents.map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => handleAgentChange(agent)}
                      disabled={isLoading}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all disabled:opacity-50 ${
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
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-card rounded-xl border border-border">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <selectedAgent.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{selectedAgent.name}</h3>
                <p className="text-xs text-muted-foreground">{selectedAgent.description}</p>
              </div>
              {user && (
                <Button variant="ghost" size="sm" onClick={startNewChat}>
                  <Plus className="w-4 h-4 mr-1" />
                  New
                </Button>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Start a conversation with {selectedAgent.name}</p>
                  </div>
                </div>
              )}
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
                    {message.role === "assistant" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{message.content || "..."}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button onClick={handleSend} className="glow-box" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
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
