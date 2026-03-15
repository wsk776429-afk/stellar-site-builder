import WarperHeader from "@/components/WarperHeader";
import WarperFooter from "@/components/WarperFooter";
import MobileNav from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { Image, Wand2, Download, Upload, Sparkles, ZoomIn, Palette, RotateCw, Eraser, Loader2, PenTool } from "lucide-react";
import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";

const photoTools = [
  { id: "enhance", icon: Sparkles, label: "AI Enhance", description: "Improve quality" },
  { id: "upscale", icon: ZoomIn, label: "Upscale", description: "Increase resolution" },
  { id: "colorize", icon: Palette, label: "Colorize", description: "Add color to B&W" },
  { id: "restore", icon: Wand2, label: "Restore", description: "Fix old photos" },
  { id: "remove-bg", icon: Eraser, label: "Remove BG", description: "Remove background" },
  { id: "custom", icon: PenTool, label: "Custom Edit", description: "Edit with prompt" },
];

const PhotoTools = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const { toast } = useToast();

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image file", variant: "destructive" });
      return;
    }
    setUploadedFile(file);
    setProcessedImage(null);
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    toast({ title: "Image uploaded", description: "Now select a tool to process it" });
  }, [toast]);

  const handleProcessImage = async (toolId: string) => {
    if (!uploadedPreview) {
      toast({ title: "Upload an image first", variant: "destructive" });
      return;
    }
    setSelectedTool(toolId);
    setIsProcessing(true);
    setProcessedImage(null);
    try {
      const body: any = { imageBase64: uploadedPreview, tool: toolId };
      if (toolId === 'custom' && customPrompt.trim()) {
        body.instruction = customPrompt.trim();
      }
      const { data, error } = await supabase.functions.invoke('photo-edit', {
        body
      });
      if (error) throw new Error(error.message);
      if (data.error) throw new Error(data.error);
      if (data.imageUrl) {
        setProcessedImage(data.imageUrl);
        toast({ title: "✨ Processing Complete!", description: `${photoTools.find(t => t.id === toolId)?.label} applied` });
      }
    } catch (error) {
      toast({ title: "Processing Failed", description: error instanceof Error ? error.message : "Failed", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `edited-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden relative pb-20 md:pb-0">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent rounded-full blur-3xl" />
      </div>

      <WarperHeader />

      <main className="flex-1 container mx-auto px-4 py-4 md:py-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-3">
              <Image className="w-4 h-4" /> Photo Editor
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-1">
              <span className="text-foreground">AI Photo </span>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Editor</span>
            </h1>
            <p className="text-muted-foreground">Enhance, upscale, and transform your photos with AI</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
            <GlassCard glowColor="primary" className="p-4 md:p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm md:text-base">
                <Upload className="w-4 h-4 text-primary" /> Upload Image
              </h3>
              {!uploadedPreview ? (
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-border rounded-xl p-8 md:p-12 text-center hover:border-primary/50 hover:bg-primary/5 transition-all active:scale-[0.98]">
                    <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                    <p className="font-medium mb-1 text-sm md:text-base">Tap to upload</p>
                    <p className="text-xs text-muted-foreground">JPG, PNG, WEBP up to 25MB</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </label>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden bg-muted aspect-square">
                    <img src={uploadedPreview} alt="Uploaded" className="w-full h-full object-cover" />
                  </div>
                  <label className="block">
                    <Button variant="outline" className="w-full gap-2 text-sm" asChild>
                      <span><RotateCw className="w-4 h-4" /> Change Image</span>
                    </Button>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  </label>
                </div>
              )}
            </GlassCard>

            <div className="space-y-4 md:space-y-6">
              <GlassCard glowColor="secondary" className="p-4 md:p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm md:text-base">
                  <Wand2 className="w-4 h-4 text-secondary" /> AI Tools
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                  {photoTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleProcessImage(tool.id)}
                      disabled={isProcessing || !uploadedPreview}
                      className={`p-3 rounded-xl text-left transition-all duration-200 disabled:opacity-50 active:scale-[0.96] ${
                        selectedTool === tool.id && isProcessing
                          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                          : "bg-muted/80 hover:bg-muted border border-border/50 hover:border-primary/30"
                      }`}
                    >
                      <tool.icon className="w-4 h-4 mb-1.5" />
                      <p className="text-xs font-semibold">{tool.label}</p>
                      <p className="text-[10px] opacity-70 hidden sm:block">{tool.description}</p>
                    </button>
                  ))}
                </div>

                {selectedTool === 'custom' || (!isProcessing && !selectedTool) ? null : null}
                <div className="mt-3">
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Custom Instruction (optional)</label>
                  <Textarea
                    placeholder="Describe how you want to edit the photo... e.g. 'Make it look like a watercolor painting' or 'Add warm sunset lighting'"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="min-h-[60px] text-sm bg-background/50 border-border/50 resize-none"
                  />
                  {customPrompt.trim() && (
                    <Button
                      onClick={() => handleProcessImage('custom')}
                      disabled={isProcessing || !uploadedPreview}
                      className="w-full mt-2 gap-2 bg-gradient-to-r from-primary to-secondary text-sm"
                    >
                      <PenTool className="w-4 h-4" /> Apply Custom Edit
                    </Button>
                  )}
                </div>
              </GlassCard>

              {(isProcessing || processedImage) && (
                <GlassCard glowColor="accent" className="p-4 md:p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-accent" /> Result
                  </h3>
                  <div className="rounded-xl overflow-hidden bg-muted aspect-square relative">
                    {isProcessing ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
                        <p className="text-sm text-muted-foreground">Processing...</p>
                      </div>
                    ) : processedImage ? (
                      <img src={processedImage} alt="Processed" className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  {processedImage && (
                    <Button onClick={handleDownload} className="w-full mt-3 gap-2 bg-gradient-to-r from-primary to-secondary text-sm">
                      <Download className="w-4 h-4" /> Download
                    </Button>
                  )}
                </GlassCard>
              )}
            </div>
          </div>
        </div>
      </main>

      <div className="hidden md:block"><WarperFooter /></div>
      <MobileNav />
    </div>
  );
};

export default PhotoTools;
