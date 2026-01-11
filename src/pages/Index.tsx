import WarperHeader from "@/components/WarperHeader";
import WarperFooter from "@/components/WarperFooter";
import FeatureCard from "@/components/FeatureCard";
import StatsCounter from "@/components/StatsCounter";
import { 
  MessageSquare, 
  Image, 
  Bot, 
  Sparkles, 
  Volume2, 
  FileText, 
  Wand2,
  ArrowRight,
  Zap,
  Shield,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      to: "/chat",
      icon: Bot,
      title: "AI Chat Agents",
      description: "Chat with 12 specialized AI agents for math, coding, finance, and more.",
      buttonText: "Open Chat",
      buttonIcon: MessageSquare,
      variant: "primary" as const,
    },
    {
      to: "/voice",
      icon: Volume2,
      title: "Voice Assistant",
      description: "Talk to AI with real-time voice. Choose male or female voice options.",
      buttonText: "Start Talking",
      buttonIcon: Volume2,
      variant: "warning" as const,
    },
    {
      to: "/image",
      icon: Image,
      title: "AI Image Studio",
      description: "Generate stunning AI images with HD, 4K, and Ultra Photoreal quality.",
      buttonText: "Open Studio",
      buttonIcon: Sparkles,
      variant: "accent" as const,
    },
    {
      to: "/tools",
      icon: Wand2,
      title: "PDF & Photo Tools",
      description: "View PDFs and enhance photos with AI. Professional quality results.",
      buttonText: "Open Tools",
      buttonIcon: FileText,
      variant: "secondary" as const,
    },
  ];

  const stats = [
    { label: "Active Users", value: "10K+", color: "primary" as const },
    { label: "Voice Chats", value: "100K+", color: "chart-3" as const },
    { label: "Images Generated", value: "500K+", color: "accent" as const },
    { label: "Tools Used", value: "50K+", color: "secondary" as const },
  ];

  const highlights = [
    { icon: Zap, title: "Lightning Fast", description: "Get instant responses from our optimized AI models" },
    { icon: Shield, title: "Private & Secure", description: "Your data is encrypted and never shared" },
    { icon: Clock, title: "24/7 Available", description: "Access your AI assistant anytime, anywhere" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <WarperHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <span className="text-foreground">Welcome to </span>
              <span className="text-primary glow-text">Warper AI</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
              Your intelligent assistant platform powered by multiple specialized agents. 
              Chat, create, and explore with cutting-edge AI technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Button size="lg" className="glow-box gap-2" asChild>
                <Link to="/chat">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/image">
                  Explore Features
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Powerful AI Tools at Your Fingertips
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Choose from our suite of AI-powered tools designed to boost your productivity
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={feature.to} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <FeatureCard {...feature} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="text-center p-6 rounded-xl bg-card/50 border border-border/50 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <StatsCounter stats={stats} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="p-8 md:p-12 rounded-2xl gradient-border bg-card">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Transform Your Workflow?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Join thousands of users already leveraging AI to boost their productivity.
              </p>
              <Button size="lg" className="glow-box" asChild>
                <Link to="/chat">
                  Start Using Warper AI
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <WarperFooter />
    </div>
  );
};

export default Index;
