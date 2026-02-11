 import { Link } from "react-router-dom";
 import { motion } from "framer-motion";
 import { Zap, Github, Twitter, Linkedin, Mail, Sparkles, Heart } from "lucide-react";
 
 const WarperFooter = () => {
   const footerLinks = {
     product: [
       { label: "AI Chat", path: "/chat" },
       { label: "Voice Assistant", path: "/voice" },
       { label: "Image Studio", path: "/image" },
       { label: "Tools", path: "/tools" },
     ],
     company: [
       { label: "About", path: "/about" },
       { label: "Blog", path: "/blog" },
       { label: "Careers", path: "/careers" },
       { label: "Contact", path: "/contact" },
     ],
     legal: [
       { label: "Privacy", path: "/privacy" },
       { label: "Terms", path: "/terms" },
       { label: "Cookies", path: "/cookies" },
     ],
   };
 
   const socialLinks = [
     { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-primary" },
     { icon: Github, href: "#", label: "GitHub", color: "hover:text-foreground" },
     { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-secondary" },
     { icon: Mail, href: "#", label: "Email", color: "hover:text-accent" },
   ];
 
   return (
     <footer className="relative border-t border-white/10 bg-gradient-to-b from-card/30 to-background">
       {/* Top gradient line */}
       <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
       
       {/* Ambient glow */}
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
       
       <div className="container mx-auto px-4 py-16 relative z-10">
         <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
           {/* Brand */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="col-span-2"
           >
             <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
               <motion.div 
                 whileHover={{ scale: 1.1, rotate: 5 }}
                 className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-cyan-400 to-secondary 
                            flex items-center justify-center shadow-lg shadow-primary/20"
               >
                 <Zap className="w-6 h-6 text-primary-foreground" />
                 <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary opacity-40 blur-lg -z-10" />
               </motion.div>
               <span className="text-xl font-bold">
                 <span className="text-foreground">Warper</span>
                 <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent"> AI</span>
               </span>
             </Link>
             <p className="text-muted-foreground text-sm max-w-xs mb-6 leading-relaxed">
               Your intelligent AI assistant platform. Chat, create images, use voice, and access powerful tools.
             </p>
             <div className="flex gap-2">
               {socialLinks.map((social, index) => (
                 <motion.a
                   key={social.label}
                   href={social.href}
                   aria-label={social.label}
                   initial={{ opacity: 0, scale: 0.5 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: index * 0.1 }}
                   whileHover={{ scale: 1.15, y: -3 }}
                   whileTap={{ scale: 0.95 }}
                   className={`w-10 h-10 rounded-xl bg-card/50 border border-white/10 
                               flex items-center justify-center text-muted-foreground 
                               ${social.color} hover:border-primary/30 
                               hover:shadow-lg hover:shadow-primary/10 transition-all duration-300`}
                 >
                   <social.icon className="w-5 h-5" />
                 </motion.a>
               ))}
             </div>
           </motion.div>
 
           {/* Links */}
           {[
             { title: "Product", links: footerLinks.product },
             { title: "Company", links: footerLinks.company },
             { title: "Legal", links: footerLinks.legal },
           ].map((section, sectionIndex) => (
             <motion.div
               key={section.title}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: sectionIndex * 0.1 + 0.2 }}
             >
               <h4 className="font-semibold text-foreground mb-5 flex items-center gap-2">
                 <Sparkles className="w-3 h-3 text-primary" />
                 {section.title}
               </h4>
               <ul className="space-y-3">
                 {section.links.map((link) => (
                   <li key={link.path}>
                     <Link
                       to={link.path}
                       className="text-sm text-muted-foreground hover:text-primary transition-colors 
                                  inline-flex items-center group"
                     >
                       <span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all duration-300" />
                       {link.label}
                     </Link>
                   </li>
                 ))}
               </ul>
             </motion.div>
           ))}
         </div>
 
         {/* Bottom */}
         <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5 }}
           className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
         >
          <p className="text-sm text-muted-foreground">
            © 2024 Warper AI. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            Founded by <span className="font-semibold bg-gradient-to-r from-primary via-cyan-400 to-secondary bg-clip-text text-transparent">Shaik Waheed Babu</span>
            <span className="mx-1">•</span>
            Made with <Heart className="w-3 h-3 text-accent animate-pulse" /> using advanced AI
          </p>
         </motion.div>
       </div>
     </footer>
   );
 };
 
 export default WarperFooter;
