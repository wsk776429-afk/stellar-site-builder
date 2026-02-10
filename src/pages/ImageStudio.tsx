import WarperHeader from "@/components/WarperHeader";
import WarperFooter from "@/components/WarperFooter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sparkles, Download, RefreshCw, Wand2, Maximize2, Lightbulb, Zap, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/GlassCard";

const qualityOptions = [
  { id: "hd", label: "HD", description: "Standard" },
  { id: "4k", label: "4K", description: "High Detail" },
  { id: "ultra", label: "Ultra", description: "Maximum" },
];

const styleOptions = [
  { id: "default", label: "✨ Default" },
  { id: "realistic", label: "📷 Photorealistic" },
  { id: "digital", label: "🎨 Digital Art" },
  { id: "oil", label: "🖌️ Oil Painting" },
  { id: "watercolor", label: "💧 Watercolor" },
  { id: "3d", label: "🧊 3D Render" },
];

const examplePrompts = [
  "A futuristic city with flying cars at night, neon lights",
  "A cute robot playing with a puppy in a garden",
  "An astronaut floating in space with Earth in the background",
  "A magical forest with glowing mushrooms and fireflies",
  "A vintage cafe on a rainy Paris street, impressionist style",
];

const ImageStudio = () => {
  const [prompt, setPrompt] = useState("");
  const [quality, setQuality] = useState("hd");
  const [style, setStyle] = useState("default");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({ title: "Enter a prompt", description: "Please describe the image you want to generate.", variant: "destructive" });
      return;
    }
    setIsGenerating(true);
    setGeneratedImage(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt, style, quality }
      });

      if (error) throw new Error(error.message || 'Failed to generate image');
      if (data.error) throw new Error(data.error);

      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setGeneratedImages(prev => [data.imageUrl, ...prev]);
        toast({
          title: "✨ Image Generated!",
          description: `Style: ${styleOptions.find(s => s.id === style)?.label || style} | Quality: ${quality.toUpperCase()}`,
        });
      } else {
        throw new Error('No image was returned');
      }
    } catch (error) {
      console.error('Image generation error:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ai-image-${Date.now()}.png`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Download Started", description: "Your image is being downloaded." });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary/20 via-accent/10 to-transparent rounded-full blur-3xl" />
      </div>

      <WarperHeader />

      <main className="flex-1 container mx-auto px-4 py-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20 border border-primary/30 mb-4">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Image Generation</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="text-foreground">AI Image </span>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Studio</span>
            </h1>
            <p className="text-muted-foreground text-lg">Transform your imagination into stunning visuals</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-1 space-y-6">
              {/* Prompt Input */}
              <GlassCard glowColor="primary" className="p-5">
                <label className="text-sm font-semibold mb-3 block flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Describe your image:
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A majestic dragon flying over a medieval castle at sunset..."
                  className="w-full h-32 bg-muted/50 rounded-xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-all border border-border/50"
                />
              </GlassCard>

              {/* Style Selection */}
              <GlassCard glowColor="secondary" className="p-5">
                <label className="text-sm font-semibold mb-3 block">🎨 Art Style:</label>
                <div className="grid grid-cols-2 gap-2">
                  {styleOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setStyle(option.id);
                        toast({ title: `Style: ${option.label}`, description: "Style applied to next generation" });
                      }}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                        style === option.id
                          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/30 scale-[1.02]"
                          : "bg-muted/80 hover:bg-muted border border-border/50 hover:border-primary/30"
                      }`}
                    >
                      {style === option.id && (
                        <Check className="w-3 h-3 absolute top-1.5 right-1.5" />
                      )}
                      {option.label}
                    </button>
                  ))}
                </div>
              </GlassCard>

              {/* Quality Selection */}
              <GlassCard glowColor="accent" className="p-5">
                <label className="text-sm font-semibold mb-3 block">⚡ Quality Level:</label>
                <div className="grid grid-cols-3 gap-2">
                  {qualityOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setQuality(option.id);
                        toast({ title: `Quality: ${option.label}`, description: option.description });
                      }}
                      className={`p-3 rounded-lg text-center transition-all duration-200 relative ${
                        quality === option.id
                          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/30 scale-[1.02]"
                          : "bg-muted/80 hover:bg-muted border border-border/50 hover:border-primary/30"
                      }`}
                    >
                      {quality === option.id && (
                        <Check className="w-3 h-3 absolute top-1.5 right-1.5" />
                      )}
                      <p className="text-sm font-semibold">{option.label}</p>
                      <p className="text-xs opacity-80">{option.description}</p>
                    </button>
                  ))}
                </div>
              </GlassCard>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full gap-2 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 shadow-lg shadow-primary/30"
                size="lg"
              >
                {isGenerating ? (
                  <><RefreshCw className="w-5 h-5 animate-spin" /> Generating...</>
                ) : (
                  <><Sparkles className="w-5 h-5" /> Generate Image</>
                )}
              </Button>

              {/* Example Prompts */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-primary flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4" />
                  Example Prompts
                </h3>
                <ul className="space-y-2">
                  {examplePrompts.map((example, index) => (
                    <li key={index} onClick={() => setPrompt(example)} className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors flex items-start gap-2">
                      <span className="text-primary">💡</span>
                      <span className="hover:underline">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Result Section */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {(isGenerating || generatedImage) && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                    <GlassCard glowColor="secondary" className="p-5 mb-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Wand2 className="w-5 h-5 text-secondary" />
                        Generated Image
                        {!isGenerating && (
                          <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            {styleOptions.find(s => s.id === style)?.label} • {quality.toUpperCase()}
                          </span>
                        )}
                      </h3>
                      <div className="rounded-xl overflow-hidden bg-muted aspect-square relative">
                        {isGenerating ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-4 border-muted-foreground/20 border-t-primary rounded-full mb-4" />
                            <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="text-muted-foreground">Creating your masterpiece...</motion.p>
                          </div>
                        ) : generatedImage ? (
                          <>
                            <motion.img initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
                            <div className="absolute bottom-4 left-4 right-4">
                              <Button onClick={() => handleDownload(generatedImage)} className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90" size="lg">
                                <Download className="w-5 h-5" /> Download Image
                              </Button>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>

              <GlassCard glowColor="accent" className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2"><Sparkles className="w-5 h-5 text-accent" /> Your Creations</h3>
                  <span className="text-sm text-muted-foreground px-3 py-1 rounded-full bg-muted/50">{generatedImages.length} images</span>
                </div>
                {generatedImages.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 text-muted-foreground">
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                      <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    </motion.div>
                    <p>Your generated images will appear here</p>
                    <p className="text-sm mt-1 opacity-70">Start by describing an image above</p>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {generatedImages.map((img, index) => (
                      <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02, y: -5 }} className="relative group rounded-xl overflow-hidden aspect-square bg-muted">
                        <img src={img} alt={`Generated ${index + 1}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 gap-2">
                          <Button size="sm" variant="secondary" className="gap-1"><Maximize2 className="w-4 h-4" /> View</Button>
                          <Button size="sm" variant="secondary" className="gap-1" onClick={() => handleDownload(img)}><Download className="w-4 h-4" /> Save</Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </main>

      <WarperFooter />
    </div>
  );
};

export default ImageStudio;
