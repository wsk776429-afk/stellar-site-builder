import WarperHeader from "@/components/WarperHeader";
import WarperFooter from "@/components/WarperFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Image, 
  MessageSquare, 
  Mic, 
  Zap, 
  TrendingUp, 
  Download, 
  Trash2, 
  Clock,
  BarChart3,
  Sparkles,
  FileText
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";

const mockSavedImages = [
  { id: 1, url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=256&h=256&fit=crop", prompt: "Futuristic city at night", date: "2024-01-15" },
  { id: 2, url: "https://images.unsplash.com/photo-1686191128892-3b37add4ad1d?w=256&h=256&fit=crop", prompt: "Robot playing with puppy", date: "2024-01-14" },
  { id: 3, url: "https://images.unsplash.com/photo-1684779847639-fbcc5a57dfe9?w=256&h=256&fit=crop", prompt: "Magical forest scene", date: "2024-01-13" },
  { id: 4, url: "https://images.unsplash.com/photo-1699116548123-95406d7cfbfe?w=256&h=256&fit=crop", prompt: "Space astronaut portrait", date: "2024-01-12" },
  { id: 5, url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=256&h=256&fit=crop", prompt: "Abstract digital art", date: "2024-01-11" },
  { id: 6, url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=256&h=256&fit=crop", prompt: "Vintage cafe scene", date: "2024-01-10" },
];

const mockConversations = [
  { id: 1, agent: "Code Assistant", preview: "Help me build a React component...", date: "2024-01-15", messages: 12 },
  { id: 2, agent: "Creative Writer", preview: "Write a story about a space explorer...", date: "2024-01-14", messages: 8 },
  { id: 3, agent: "Data Analyst", preview: "Analyze this sales data...", date: "2024-01-13", messages: 15 },
  { id: 4, agent: "Language Tutor", preview: "Teach me Spanish greetings...", date: "2024-01-12", messages: 20 },
  { id: 5, agent: "Fitness Coach", preview: "Create a workout plan...", date: "2024-01-11", messages: 6 },
];

const usageStats = {
  imagesGenerated: 47,
  chatMessages: 234,
  voiceMinutes: 12,
  toolsUsed: 18,
  storageUsed: 65,
  creditsRemaining: 450,
  totalCredits: 1000,
};

const statCards = [
  { label: "Images", value: usageStats.imagesGenerated, icon: Image, gradient: "from-primary/30 to-cyan-400/20", textColor: "text-primary" },
  { label: "Messages", value: usageStats.chatMessages, icon: MessageSquare, gradient: "from-secondary/30 to-purple-400/20", textColor: "text-secondary" },
  { label: "Voice", value: `${usageStats.voiceMinutes}m`, icon: Mic, gradient: "from-accent/30 to-pink-400/20", textColor: "text-accent" },
  { label: "Tools", value: usageStats.toolsUsed, icon: Zap, gradient: "from-pink-400/30 to-rose-400/20", textColor: "text-pink-400" },
];

const Dashboard = () => {
  const [savedImages, setSavedImages] = useState(mockSavedImages);
  const [conversations, setConversations] = useState(mockConversations);

  const handleDeleteImage = (id: number) => {
    setSavedImages(savedImages.filter(img => img.id !== id));
  };

  const handleDeleteConversation = (id: number) => {
    setConversations(conversations.filter(conv => conv.id !== id));
  };

  const handleDownloadImage = (url: string, prompt: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${prompt.slice(0, 20)}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden relative">
      {/* 3D Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.15, 1] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute -top-60 -right-60 w-[500px] h-[500px] bg-gradient-to-br from-primary/15 via-secondary/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1.15, 1, 1.15] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-60 -left-60 w-[500px] h-[500px] bg-gradient-to-tr from-accent/15 via-pink-400/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-radial from-secondary/5 to-transparent rounded-full blur-3xl"
        />
      </div>

      <WarperHeader />

      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20 border border-primary/30 mb-4"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Analytics & Content</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="text-foreground">Your </span>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Track your usage, saved content, and conversation history
            </p>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, index) => (
              <GlassCard
                key={stat.label}
                glowColor={index === 0 ? "primary" : index === 1 ? "secondary" : index === 2 ? "accent" : "pink"}
                delay={index * 0.1}
                className="p-5"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.textColor} drop-shadow-lg`} />
                  </motion.div>
                  <div>
                    <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Credits & Storage */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <GlassCard glowColor="primary" className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Credits Usage</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Used: {usageStats.totalCredits - usageStats.creditsRemaining}</span>
                  <span className="text-primary font-medium">{usageStats.creditsRemaining} remaining</span>
                </div>
                <Progress value={(usageStats.creditsRemaining / usageStats.totalCredits) * 100} className="h-3" />
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/30" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
              </div>
            </GlassCard>

            <GlassCard glowColor="secondary" className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-secondary" />
                <h3 className="text-lg font-semibold">Storage Usage</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Used: {usageStats.storageUsed}%</span>
                  <span className="text-secondary font-medium">{100 - usageStats.storageUsed}% available</span>
                </div>
                <Progress value={usageStats.storageUsed} className="h-3" />
                <div className="flex gap-2">
                  {[
                    { label: "Images", value: savedImages.length },
                    { label: "Chats", value: conversations.length },
                    { label: "Files", value: 3 },
                  ].map((item) => (
                    <div key={item.label} className="flex-1 text-center p-2 bg-gradient-to-br from-card/60 to-card/40 rounded-xl border border-white/10">
                      <p className="text-lg font-bold">{item.value}</p>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Tabs for Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Tabs defaultValue="images" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-card/50 backdrop-blur-xl border border-white/10">
                <TabsTrigger value="images" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/10">
                  <Image className="w-4 h-4" />
                  Saved Images
                </TabsTrigger>
                <TabsTrigger value="conversations" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary/20 data-[state=active]:to-accent/10">
                  <MessageSquare className="w-4 h-4" />
                  Conversations
                </TabsTrigger>
              </TabsList>

              <TabsContent value="images">
                <GlassCard glowColor="primary" hover3D={false} className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg">Your Saved Images</h3>
                    <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">{savedImages.length} images</span>
                  </div>
                  {savedImages.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No saved images yet</p>
                      <p className="text-sm">Generate your first image in the Image Studio!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {savedImages.map((image, index) => (
                        <motion.div
                          key={image.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.03, y: -5 }}
                          className="group relative rounded-2xl overflow-hidden aspect-square bg-muted border border-white/10"
                        >
                          <img
                            src={image.url}
                            alt={image.prompt}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <p className="text-xs text-foreground font-medium truncate mb-1">{image.prompt}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {image.date}
                                </span>
                                <div className="flex gap-1">
                                  <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-7 w-7 hover:bg-primary/20"
                                    onClick={() => handleDownloadImage(image.url, image.prompt)}
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                  </Button>
                                  <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/20"
                                    onClick={() => handleDeleteImage(image.id)}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </TabsContent>

              <TabsContent value="conversations">
                <GlassCard glowColor="secondary" hover3D={false} className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg">Conversation History</h3>
                    <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">{conversations.length} conversations</span>
                  </div>
                  {conversations.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No conversations yet</p>
                      <p className="text-sm">Start chatting with our AI agents!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {conversations.map((conv, index) => (
                        <motion.div
                          key={conv.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 5, scale: 1.01 }}
                          className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-card/60 to-card/40 border border-white/10 hover:border-secondary/30 hover:shadow-lg hover:shadow-secondary/10 transition-all cursor-pointer"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/30 to-accent/20 flex items-center justify-center flex-shrink-0"
                          >
                            <FileText className="w-6 h-6 text-secondary" />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm">{conv.agent}</h4>
                              <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                                {conv.messages} messages
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{conv.preview}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground hidden sm:block">{conv.date}</span>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/20"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteConversation(conv.id);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <WarperFooter />
    </div>
  );
};

export default Dashboard;
