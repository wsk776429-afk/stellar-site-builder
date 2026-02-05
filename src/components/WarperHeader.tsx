 import { Link, useLocation, useNavigate } from "react-router-dom";
 import { motion, AnimatePresence } from "framer-motion";
 import { Zap, Menu, X, LogOut, User, Sparkles } from "lucide-react";
 import { useState } from "react";
 import { useAuth } from "@/hooks/useAuth";
 import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu";
 import NeonButton from "./NeonButton";
 
 const WarperHeader = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const { user, signOut, loading } = useAuth();
 
   const navLinks = [
     { path: "/", label: "Home" },
     { path: "/chat", label: "Chat" },
     { path: "/voice", label: "Voice" },
     { path: "/image", label: "Image" },
     { path: "/tools", label: "Tools" },
     { path: "/dashboard", label: "Dashboard" },
   ];
 
   const isActive = (path: string) => location.pathname === path;
 
   const handleSignOut = async () => {
     await signOut();
     navigate("/");
   };
 
   return (
     <motion.header 
       initial={{ y: -100, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ duration: 0.6, ease: "easeOut" }}
       className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-white/10"
     >
       {/* Gradient line at top */}
       <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
       
       <div className="container mx-auto px-4">
         <div className="flex items-center justify-between h-18 py-3">
           {/* Logo */}
           <Link to="/" className="flex items-center gap-3 group">
             <motion.div 
               whileHover={{ scale: 1.1, rotate: 5 }}
               whileTap={{ scale: 0.95 }}
               className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-cyan-400 to-secondary 
                          flex items-center justify-center shadow-lg shadow-primary/30
                          group-hover:shadow-primary/50 transition-shadow duration-300"
             >
               <Zap className="w-6 h-6 text-primary-foreground" />
               {/* Glow effect */}
               <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary opacity-50 blur-lg -z-10" />
             </motion.div>
             <span className="text-xl font-bold">
               <span className="text-foreground">Warper</span>
               <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent"> AI</span>
             </span>
           </Link>
 
           {/* Desktop Navigation */}
           <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-2xl bg-card/30 backdrop-blur-sm border border-white/5">
             {navLinks.map((link) => (
               <Link
                 key={link.path}
                 to={link.path}
                 className="relative"
               >
                 <motion.div
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.98 }}
                   className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                     isActive(link.path)
                       ? "text-primary"
                       : "text-muted-foreground hover:text-foreground"
                   }`}
                 >
                   {link.label}
                   {isActive(link.path) && (
                     <motion.div
                       layoutId="activeTab"
                       className="absolute inset-0 bg-primary/15 rounded-xl -z-10 border border-primary/20"
                       transition={{ type: "spring", stiffness: 400, damping: 30 }}
                     />
                   )}
                 </motion.div>
               </Link>
             ))}
           </nav>
 
           {/* Auth Buttons */}
           <div className="hidden md:flex items-center gap-3">
             {loading ? (
               <div className="w-20 h-9 bg-muted/50 animate-pulse rounded-xl" />
             ) : user ? (
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <motion.button 
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.98 }}
                     className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/50 border border-white/10 
                                hover:border-primary/30 transition-colors"
                   >
                     <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 
                                     flex items-center justify-center border border-primary/20">
                       <User className="w-4 h-4 text-primary" />
                     </div>
                     <span className="max-w-[100px] truncate text-sm font-medium">
                       {user.email?.split("@")[0]}
                     </span>
                   </motion.button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent align="end" className="w-48 backdrop-blur-xl bg-card/90 border-white/10">
                   <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer">
                     <User className="w-4 h-4 mr-2" />
                     Dashboard
                   </DropdownMenuItem>
                   <DropdownMenuSeparator className="bg-white/10" />
                   <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                     <LogOut className="w-4 h-4 mr-2" />
                     Sign Out
                   </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
             ) : (
               <div className="flex items-center gap-2">
                 <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => navigate("/auth")}
                   className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground 
                              hover:text-foreground transition-colors"
                 >
                   Sign In
                 </motion.button>
                 <NeonButton variant="primary" size="sm" onClick={() => navigate("/auth")}>
                   <Sparkles className="w-4 h-4" />
                   Get Started
                 </NeonButton>
               </div>
             )}
           </div>
 
           {/* Mobile Menu Button */}
           <motion.button
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             className="md:hidden p-2.5 rounded-xl bg-card/50 border border-white/10 hover:border-primary/30 transition-colors"
             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
           >
             <AnimatePresence mode="wait">
               {mobileMenuOpen ? (
                 <motion.div
                   key="close"
                   initial={{ rotate: -90, opacity: 0 }}
                   animate={{ rotate: 0, opacity: 1 }}
                   exit={{ rotate: 90, opacity: 0 }}
                   transition={{ duration: 0.2 }}
                 >
                   <X className="w-5 h-5" />
                 </motion.div>
               ) : (
                 <motion.div
                   key="menu"
                   initial={{ rotate: 90, opacity: 0 }}
                   animate={{ rotate: 0, opacity: 1 }}
                   exit={{ rotate: -90, opacity: 0 }}
                   transition={{ duration: 0.2 }}
                 >
                   <Menu className="w-5 h-5" />
                 </motion.div>
               )}
             </AnimatePresence>
           </motion.button>
         </div>
 
         {/* Mobile Navigation */}
         <AnimatePresence>
           {mobileMenuOpen && (
             <motion.nav
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: "auto", opacity: 1 }}
               exit={{ height: 0, opacity: 0 }}
               transition={{ duration: 0.3 }}
               className="md:hidden overflow-hidden"
             >
               <div className="py-4 border-t border-white/10">
                 <div className="flex flex-col gap-2">
                   {navLinks.map((link, index) => (
                     <motion.div
                       key={link.path}
                       initial={{ x: -20, opacity: 0 }}
                       animate={{ x: 0, opacity: 1 }}
                       transition={{ delay: index * 0.05 }}
                     >
                       <Link
                         to={link.path}
                         onClick={() => setMobileMenuOpen(false)}
                         className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                           isActive(link.path)
                             ? "bg-primary/15 text-primary border border-primary/20"
                             : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                         }`}
                       >
                         {link.label}
                       </Link>
                     </motion.div>
                   ))}
                   <motion.div 
                     initial={{ y: 10, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.3 }}
                     className="flex gap-2 mt-4 pt-4 border-t border-white/10"
                   >
                     {user ? (
                       <NeonButton variant="secondary" size="sm" onClick={handleSignOut} className="flex-1">
                         <LogOut className="w-4 h-4" />
                         Sign Out
                       </NeonButton>
                     ) : (
                       <>
                         <motion.button
                           whileTap={{ scale: 0.98 }}
                           onClick={() => navigate("/auth")}
                           className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium 
                                      bg-card/50 border border-white/10 hover:border-primary/30"
                         >
                           Sign In
                         </motion.button>
                         <NeonButton variant="primary" size="sm" onClick={() => navigate("/auth")} className="flex-1">
                           Get Started
                         </NeonButton>
                       </>
                     )}
                   </motion.div>
                 </div>
               </div>
             </motion.nav>
           )}
         </AnimatePresence>
       </div>
     </motion.header>
   );
 };
 
 export default WarperHeader;
