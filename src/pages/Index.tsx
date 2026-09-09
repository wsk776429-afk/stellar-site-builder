 import { motion, useScroll, useTransform } from "framer-motion";
 import { useRef, useState } from "react";
 import WarperOrbScene from "@/components/3d/WarperOrbScene";

 import WarperHeader from "@/components/WarperHeader";
 import WarperFooter from "@/components/WarperFooter";
 import HeroScene from "@/components/3d/HeroScene";
 import GlassCard from "@/components/GlassCard";
 import FloatingIcon from "@/components/FloatingIcon";
 import NeonButton from "@/components/NeonButton";
 import ParallaxSection from "@/components/ParallaxSection";
 import WarperLogo from "@/components/WarperLogo";
 import BrandBackdrop from "@/components/BrandBackdrop";

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
   Clock,
   Star,
   Heart,
   Rocket
 } from "lucide-react";
 import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
 
 const Index = () => {
   const containerRef = useRef<HTMLDivElement>(null);
   const [pokes, setPokes] = useState(0);

   const { scrollYProgress } = useScroll({
     target: containerRef,
     offset: ["start start", "end end"],
   });
 
   const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
 
   const features = [
     {
       to: "/chat",
       icon: Bot,
       title: "AI Chat Agents",
       description: "Chat with 12 specialized AI agents for math, coding, finance, and more.",
       buttonText: "Open Chat",
       buttonIcon: MessageSquare,
       glowColor: "primary" as const,
     },
     {
       to: "/voice",
       icon: Volume2,
       title: "Voice Assistant",
       description: "Talk to AI with real-time voice. Choose male or female voice options.",
       buttonText: "Start Talking",
       buttonIcon: Volume2,
       glowColor: "pink" as const,
     },
     {
       to: "/image",
       icon: Image,
       title: "AI Image Studio",
       description: "Generate stunning AI images with HD, 4K, and Ultra Photoreal quality.",
       buttonText: "Open Studio",
       buttonIcon: Sparkles,
       glowColor: "accent" as const,
     },
     {
       to: "/tools",
       icon: Wand2,
       title: "PDF & Photo Tools",
       description: "View PDFs and enhance photos with AI. Professional quality results.",
       buttonText: "Open Tools",
       buttonIcon: FileText,
       glowColor: "secondary" as const,
     },
   ];
 
   const heroPills = [
     { to: "/chat", icon: MessageSquare, label: "Chat" },
     { to: "/image", icon: Image, label: "Image Studio" },
     { to: "/tools", icon: FileText, label: "Photo & PDF Tools" },
     { to: "/voice", icon: Volume2, label: "Voice" },
   ];
 

   const stats = [
     { label: "Active Users", value: "10K+", color: "primary" as const },
     { label: "Voice Chats", value: "100K+", color: "pink" as const },
     { label: "Images Generated", value: "500K+", color: "accent" as const },
     { label: "Tools Used", value: "50K+", color: "secondary" as const },
   ];
 
   const highlights = [
     { icon: Zap, title: "Lightning Fast", description: "Get instant responses from our optimized AI models", color: "primary" as const },
     { icon: Shield, title: "Private & Secure", description: "Your data is encrypted and never shared", color: "secondary" as const },
     { icon: Clock, title: "24/7 Available", description: "Access your AI assistant anytime, anywhere", color: "accent" as const },
   ];
 
   return (
     <div ref={containerRef} className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <SEO
        title="Warper AI — Smart AI Tools for Chat, Images & PDFs"
        description="Warper AI brings AI chat agents, an image studio, photo editing, PDF tools, and voice-to-text together in one fast, free workspace."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Warper AI",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          url: "https://searcherin.lovable.app/",
          description:
            "AI chat agents, image generation, photo editing, PDF tools, and voice to text in one web app.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
       <WarperHeader />
 
       <main className="flex-1 relative">
         {/* 3D Hero Scene Background */}
         <motion.div 
           className="fixed inset-0 pointer-events-none opacity-25"
           style={{ y: backgroundY }}
         >
           <HeroScene />
         </motion.div>

         {/* Gradient overlays for depth */}
         <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-background/30 via-transparent to-background/80" />

        {/* Hero Section — interactive 3D orb */}
        <section className="relative overflow-hidden border-b border-white/5">
          <BrandBackdrop />

          {/* Interactive 3D centerpiece */}
          <div className="absolute inset-0 z-0">
            <WarperOrbScene onPoke={() => setPokes((p) => p + 1)} />
          </div>

          <div className="relative container mx-auto px-4 py-24 md:py-36 min-h-[88vh] flex items-center">
            <div className="max-w-5xl mx-auto text-center relative z-10 w-full pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
              {/* Sparkle cluster */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="flex items-center justify-center gap-1 mb-6"
              >
                <Sparkles className="w-10 h-10 text-primary drop-shadow-[0_0_25px_hsl(var(--primary)/0.9)]" />
                <Sparkles className="w-4 h-4 text-accent -mt-6" />
              </motion.div>


               {/* Logo + wordmark */}
               <motion.div
                 initial={{ opacity: 0, y: 24 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.1 }}
                 className="flex items-center justify-center gap-4 md:gap-6"
               >
                 <WarperLogo className="w-16 h-16 md:w-28 md:h-28 drop-shadow-[0_0_35px_hsl(var(--secondary)/0.6)]" />
                 <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground">
                   Warper AI
                 </h1>
               </motion.div>

               {/* Tagline */}
               <motion.p
                 initial={{ opacity: 0, y: 16 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.3 }}
                 className="mt-4 text-2xl md:text-4xl font-semibold tracking-tight text-foreground/90"
               >
                 Smart AI Tools
               </motion.p>

               {/* Feature pill row */}
               <motion.div
                 initial={{ opacity: 0, y: 16 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.45 }}
                 className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-sm md:text-base"
               >
                 {heroPills.map((pill, index) => (
                   <div key={pill.label} className="flex items-center gap-3">
                     <Link
                       to={pill.to}
                       className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10
                                  bg-card/40 backdrop-blur-md text-foreground/90
                                  hover:border-primary/50 hover:text-foreground transition-colors"
                     >
                       <pill.icon className="w-4 h-4 text-accent" />
                       <span className="font-medium">{pill.label}</span>
                     </Link>
                     {index < heroPills.length - 1 && (
                       <span className="hidden md:inline text-primary/60">•</span>
                     )}
                   </div>
                 ))}
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.6 }}
                 className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
               >
                 <Link to="/chat">
                   <NeonButton variant="primary" size="lg">
                     Get Started Free
                     <ArrowRight className="w-5 h-5" />
                   </NeonButton>
                 </Link>
                 <Link to="/image">
                   <NeonButton variant="secondary" size="lg">
                     Explore Features
                   </NeonButton>
                 </Link>
               </motion.div>

               {/* Playful orb hint / poke counter */}
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.8, delay: 0.9 }}
                 className="mt-8 flex justify-center"
               >
                 <span className="px-4 py-2 rounded-full border border-white/10 bg-card/30 backdrop-blur-md text-xs md:text-sm text-muted-foreground">
                   {pokes === 0
                     ? "Move your mouse — then tap the glowing orb ✨"
                     : `Orb poked ${pokes} time${pokes === 1 ? "" : "s"} — it likes you 💫`}
                 </span>
               </motion.div>

             </div>
           </div>
         </section>

 
         {/* Feature Cards - Floating in 3D space */}
         <section className="relative container mx-auto px-4 py-20">
           <ParallaxSection speed={0.2}>
             <div className="max-w-6xl mx-auto">
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-center mb-16"
               >
                 <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                   Powerful AI Tools at Your Fingertips
                 </h2>
                 <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                   Choose from our suite of AI-powered tools designed to boost your productivity
                 </p>
               </motion.div>
 
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
                 {features.map((feature, index) => (
                   <Link key={feature.to} to={feature.to} className="block">
                     <GlassCard 
                       glowColor={feature.glowColor} 
                       delay={index * 0.1}
                       className="h-full p-6"
                     >
                       <motion.div
                         whileHover={{ scale: 1.1, rotate: 5 }}
                         className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5
                                   bg-gradient-to-br ${
                                     feature.glowColor === 'primary' ? 'from-primary/30 to-cyan-400/20' :
                                     feature.glowColor === 'secondary' ? 'from-secondary/30 to-purple-400/20' :
                                     feature.glowColor === 'accent' ? 'from-accent/30 to-pink-400/20' :
                                     'from-pink-400/30 to-rose-400/20'
                                   }
                                   shadow-lg`}
                       >
                         <feature.icon className={`w-8 h-8 ${
                           feature.glowColor === 'primary' ? 'text-primary' :
                           feature.glowColor === 'secondary' ? 'text-secondary' :
                           feature.glowColor === 'accent' ? 'text-accent' :
                           'text-pink-400'
                         } drop-shadow-lg`} />
                       </motion.div>
                       <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                       <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{feature.description}</p>
                       <div className={`inline-flex items-center gap-2 text-sm font-medium ${
                         feature.glowColor === 'primary' ? 'text-primary' :
                         feature.glowColor === 'secondary' ? 'text-secondary' :
                         feature.glowColor === 'accent' ? 'text-accent' :
                         'text-pink-400'
                       }`}>
                         <feature.buttonIcon className="w-4 h-4" />
                         {feature.buttonText}
                         <ArrowRight className="w-4 h-4" />
                       </div>
                     </GlassCard>
                   </Link>
                 ))}
               </div>
             </div>
           </ParallaxSection>
         </section>
 
         {/* Highlights Section */}
         <section className="relative container mx-auto px-4 py-20">
           <ParallaxSection speed={0.15} direction="down">
             <div className="max-w-5xl mx-auto">
               <div className="grid md:grid-cols-3 gap-8">
                 {highlights.map((item, index) => (
                   <GlassCard
                     key={item.title}
                     glowColor={item.color}
                     delay={index * 0.15}
                     className="p-8 text-center"
                   >
                     <motion.div
                       whileHover={{ scale: 1.1, rotateY: 180 }}
                       transition={{ type: "spring", stiffness: 300 }}
                       className={`w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center
                                 bg-gradient-to-br ${
                                   item.color === 'primary' ? 'from-primary/30 to-cyan-400/20' :
                                   item.color === 'secondary' ? 'from-secondary/30 to-purple-400/20' :
                                   'from-accent/30 to-pink-400/20'
                                 }`}
                     >
                       <item.icon className={`w-8 h-8 ${
                         item.color === 'primary' ? 'text-primary' :
                         item.color === 'secondary' ? 'text-secondary' :
                         'text-accent'
                       }`} />
                     </motion.div>
                     <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                     <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                   </GlassCard>
                 ))}
               </div>
             </div>
           </ParallaxSection>
         </section>
 
         {/* Stats Section with 3D counter cards */}
         <section className="relative container mx-auto px-4 py-20">
           <ParallaxSection speed={0.1}>
             <div className="max-w-5xl mx-auto">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {stats.map((stat, index) => (
                   <GlassCard
                     key={stat.label}
                     glowColor={stat.color}
                     delay={index * 0.1}
                     className="p-6 text-center"
                   >
                     <motion.p
                       initial={{ scale: 0.5 }}
                       whileInView={{ scale: 1 }}
                       viewport={{ once: true }}
                       className={`text-3xl md:text-4xl font-bold mb-2 ${
                         stat.color === 'primary' ? 'text-primary' :
                         stat.color === 'secondary' ? 'text-secondary' :
                         stat.color === 'accent' ? 'text-accent' :
                         'text-pink-400'
                       } drop-shadow-lg`}
                     >
                       {stat.value}
                     </motion.p>
                     <p className="text-sm text-muted-foreground">{stat.label}</p>
                   </GlassCard>
                 ))}
               </div>
             </div>
           </ParallaxSection>
         </section>
 
         {/* CTA Section */}
         <section className="relative container mx-auto px-4 py-24">
           <ParallaxSection speed={0.2}>
             <div className="max-w-4xl mx-auto">
               <GlassCard 
                 glowColor="primary" 
                 className="p-10 md:p-16 text-center relative overflow-hidden"
                 hover3D={false}
               >
                 {/* Animated background elements */}
                 <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
                 />
                 <motion.div
                   animate={{ rotate: -360 }}
                   transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                   className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl"
                 />
                 
                 <motion.h2 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                 >
                   Ready to Transform Your Workflow?
                 </motion.h2>
                 <motion.p 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.1 }}
                   className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg"
                 >
                   Join thousands of users already leveraging AI to boost their productivity.
                 </motion.p>
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.2 }}
                 >
                   <Link to="/chat">
                     <NeonButton variant="primary" size="lg">
                       Start Using Warper AI
                       <Sparkles className="w-5 h-5" />
                     </NeonButton>
                   </Link>
                 </motion.div>
               </GlassCard>
             </div>
           </ParallaxSection>
         </section>
       </main>
 
       <WarperFooter />
     </div>
   );
 };
 
 export default Index;
