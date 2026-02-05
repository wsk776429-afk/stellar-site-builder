 import { motion, useScroll, useTransform } from "framer-motion";
 import { useRef } from "react";
 import WarperHeader from "@/components/WarperHeader";
 import WarperFooter from "@/components/WarperFooter";
 import HeroScene from "@/components/3d/HeroScene";
 import GlassCard from "@/components/GlassCard";
 import FloatingIcon from "@/components/FloatingIcon";
 import NeonButton from "@/components/NeonButton";
 import ParallaxSection from "@/components/ParallaxSection";
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
 
 const Index = () => {
   const containerRef = useRef<HTMLDivElement>(null);
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
       <WarperHeader />
 
       <main className="flex-1 relative">
         {/* 3D Hero Scene Background */}
         <motion.div 
           className="fixed inset-0 pointer-events-none"
           style={{ y: backgroundY }}
         >
           <HeroScene />
         </motion.div>
 
         {/* Gradient overlays for depth */}
         <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-background/30 via-transparent to-background/80" />
         <div className="fixed inset-0 pointer-events-none bg-gradient-radial from-transparent via-background/20 to-background/60" />
 
         {/* Hero Section */}
         <section className="relative container mx-auto px-4 py-20 md:py-32 min-h-[90vh] flex items-center">
           <div className="max-w-5xl mx-auto text-center relative z-10">
             {/* Floating decorative icons */}
             <div className="absolute -top-10 left-0 md:left-10 hidden md:block">
               <FloatingIcon icon={Star} color="primary" delay={0} floatIntensity={15} />
             </div>
             <div className="absolute top-20 right-0 md:right-10 hidden md:block">
               <FloatingIcon icon={Heart} color="accent" delay={0.5} floatIntensity={12} />
             </div>
             <div className="absolute bottom-0 left-1/4 hidden md:block">
               <FloatingIcon icon={Rocket} color="secondary" delay={1} floatIntensity={18} />
             </div>
 
             {/* Badge */}
             <motion.div
               initial={{ opacity: 0, y: 20, scale: 0.9 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               transition={{ duration: 0.6 }}
               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full 
                          bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20 
                          border border-primary/30 backdrop-blur-xl mb-8
                          shadow-[0_0_30px_rgba(74,222,205,0.2)]"
             >
               <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               >
                 <Sparkles className="w-4 h-4 text-primary" />
               </motion.div>
               <span className="text-sm font-medium bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                 Powered by Advanced AI
               </span>
             </motion.div>
             
             {/* Main heading with 3D text effect */}
             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
             >
               <span className="text-foreground">Welcome to </span>
               <br />
               <motion.span 
                 className="inline-block bg-gradient-to-r from-primary via-cyan-400 to-secondary bg-clip-text text-transparent
                            drop-shadow-[0_0_30px_rgba(74,222,205,0.5)]"
                 animate={{ 
                   textShadow: [
                     "0 0 20px rgba(74,222,205,0.5)",
                     "0 0 40px rgba(74,222,205,0.8)",
                     "0 0 20px rgba(74,222,205,0.5)",
                   ]
                 }}
                 transition={{ duration: 2, repeat: Infinity }}
               >
                 Warper AI
               </motion.span>
             </motion.h1>
             
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
             >
               Your intelligent assistant platform powered by multiple specialized agents. 
               <span className="text-primary"> Chat, create, and explore</span> with cutting-edge AI technology.
             </motion.p>
 
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.6 }}
               className="flex flex-col sm:flex-row gap-4 justify-center"
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
 
             {/* Scroll indicator */}
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1.5 }}
               className="absolute bottom-10 left-1/2 -translate-x-1/2"
             >
               <motion.div
                 animate={{ y: [0, 10, 0] }}
                 transition={{ duration: 1.5, repeat: Infinity }}
                 className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
               >
                 <motion.div
                   animate={{ opacity: [1, 0.3, 1] }}
                   transition={{ duration: 1.5, repeat: Infinity }}
                   className="w-1.5 h-3 bg-primary rounded-full"
                 />
               </motion.div>
             </motion.div>
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
