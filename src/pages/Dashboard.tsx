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
    <div className="min-h-screen bg-background flex flex-col">
      <WarperHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-foreground">Your </span>
              <span className="text-primary glow-text">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">
              Track your usage, saved content, and conversation history
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="card-3d group">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Image className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{usageStats.imagesGenerated}</p>
                    <p className="text-sm text-muted-foreground">Images</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-3d group">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{usageStats.chatMessages}</p>
                    <p className="text-sm text-muted-foreground">Messages</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-3d group">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mic className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{usageStats.voiceMinutes}m</p>
                    <p className="text-sm text-muted-foreground">Voice</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-3d group">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-chart-3/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-chart-3" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{usageStats.toolsUsed}</p>
                    <p className="text-sm text-muted-foreground">Tools</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Credits & Storage */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="card-3d">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Credits Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Used: {usageStats.totalCredits - usageStats.creditsRemaining}</span>
                    <span className="text-primary font-medium">{usageStats.creditsRemaining} remaining</span>
                  </div>
                  <Progress value={(usageStats.creditsRemaining / usageStats.totalCredits) * 100} className="h-3" />
                  <Button className="w-full glow-box" size="sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-secondary" />
                  Storage Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Used: {usageStats.storageUsed}%</span>
                    <span className="text-secondary font-medium">{100 - usageStats.storageUsed}% available</span>
                  </div>
                  <Progress value={usageStats.storageUsed} className="h-3" />
                  <div className="flex gap-2">
                    <div className="flex-1 text-center p-2 bg-muted rounded-lg">
                      <p className="text-lg font-bold">{savedImages.length}</p>
                      <p className="text-xs text-muted-foreground">Images</p>
                    </div>
                    <div className="flex-1 text-center p-2 bg-muted rounded-lg">
                      <p className="text-lg font-bold">{conversations.length}</p>
                      <p className="text-xs text-muted-foreground">Chats</p>
                    </div>
                    <div className="flex-1 text-center p-2 bg-muted rounded-lg">
                      <p className="text-lg font-bold">3</p>
                      <p className="text-xs text-muted-foreground">Files</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for Content */}
          <Tabs defaultValue="images" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="images" className="gap-2">
                <Image className="w-4 h-4" />
                Saved Images
              </TabsTrigger>
              <TabsTrigger value="conversations" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Conversations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="images">
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Your Saved Images</span>
                    <span className="text-sm font-normal text-muted-foreground">{savedImages.length} images</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {savedImages.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No saved images yet</p>
                      <p className="text-sm">Generate your first image in the Image Studio!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {savedImages.map((image) => (
                        <div key={image.id} className="group relative rounded-xl overflow-hidden aspect-square bg-muted card-3d">
                          <img
                            src={image.url}
                            alt={image.prompt}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
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
                                    className="h-7 w-7"
                                    onClick={() => handleDownloadImage(image.url, image.prompt)}
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                  </Button>
                                  <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-7 w-7 text-destructive hover:text-destructive"
                                    onClick={() => handleDeleteImage(image.id)}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conversations">
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Conversation History</span>
                    <span className="text-sm font-normal text-muted-foreground">{conversations.length} conversations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {conversations.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No conversations yet</p>
                      <p className="text-sm">Start chatting with our AI agents!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {conversations.map((conv) => (
                        <div 
                          key={conv.id} 
                          className="group flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer card-3d-subtle"
                        >
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                            <FileText className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm">{conv.agent}</h4>
                              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
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
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteConversation(conv.id);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <WarperFooter />
    </div>
  );
};

export default Dashboard;
