import WarperHeader from "@/components/WarperHeader";
import WarperFooter from "@/components/WarperFooter";
import { Button } from "@/components/ui/button";
import { 
  FileText, Image, Wand2, Download, Upload, Sparkles,
  ZoomIn, Palette, Crop, RotateCw, Eraser, Layers, Mic, Languages, Check, Loader2
} from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/GlassCard";

type TabType = "pdf" | "photo" | "voice";

const photoTools = [
  { id: "enhance", icon: Sparkles, label: "AI Enhance", description: "Improve photo quality" },
  { id: "upscale", icon: ZoomIn, label: "Upscale", description: "Increase resolution" },
  { id: "colorize", icon: Palette, label: "Colorize", description: "Add color to B&W photos" },
  { id: "restore", icon: Wand2, label: "Restore", description: "Fix old or damaged photos" },
  { id: "remove-bg", icon: Eraser, label: "Remove BG", description: "Remove background" },
];

const Tools = () => {
  const [activeTab, setActiveTab] = useState<TabType>("photo");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (activeTab === "pdf") {
      if (!file.type.includes("pdf")) {
        toast({ title: "Invalid file", description: "Please upload a PDF file", variant: "destructive" });
        return;
      }
      setPdfFile(file);
      setPdfUrl(URL.createObjectURL(file));
      toast({ title: "PDF Loaded", description: file.name });
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image file", variant: "destructive" });
      return;
    }

    setUploadedFile(file);
    setProcessedImage(null);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
    toast({ title: "Image uploaded", description: "Now select a tool to process it" });
  }, [activeTab, toast]);

  const handleProcessImage = async (toolId: string) => {
    if (!uploadedPreview) {
      toast({ title: "Upload an image first", description: "Please upload an image before processing", variant: "destructive" });
      return;
    }

    setSelectedTool(toolId);
    setIsProcessing(true);
    setProcessedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke('photo-edit', {
        body: { imageBase64: uploadedPreview, tool: toolId }
      });

      if (error) throw new Error(error.message);
      if (data.error) throw new Error(data.error);

      if (data.imageUrl) {
        setProcessedImage(data.imageUrl);
        toast({ title: "✨ Processing Complete!", description: `${photoTools.find(t => t.id === toolId)?.label} applied successfully` });
      }
    } catch (error) {
      console.error('Photo processing error:', error);
      toast({ title: "Processing Failed", description: error instanceof Error ? error.message : "Failed to process image", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadProcessed = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `edited-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Download Started" });
  };

  const toggleVoiceRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({ title: "Not Supported", description: "Speech recognition is not supported in this browser. Try Chrome.", variant: "destructive" });
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      toast({ title: "Recognition Error", description: event.error, variant: "destructive" });
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
    toast({ title: "🎤 Listening...", description: "Speak clearly into your microphone" });
  };

  const copyTranscript = () => {
    navigator.clipboard.writeText(transcript);
    toast({ title: "Copied!", description: "Transcript copied to clipboard" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary/20 via-accent/10 to-transparent rounded-full blur-3xl" />
      </div>

      <WarperHeader />

      <main className="flex-1 container mx-auto px-4 py-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="text-foreground">AI </span>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Toolbox</span>
            </h1>
            <p className="text-muted-foreground text-lg">Professional AI-powered tools at your fingertips</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-8">
            {[
              { id: "photo" as TabType, icon: Image, label: "Photo Editor" },
              { id: "pdf" as TabType, icon: FileText, label: "PDF Tools" },
              { id: "voice" as TabType, icon: Mic, label: "Voice to Text" },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className={`gap-2 ${activeTab === tab.id ? "bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30" : ""}`}
                size="lg"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Photo Editor */}
            {activeTab === "photo" && (
              <motion.div key="photo" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Upload & Preview */}
                  <GlassCard glowColor="primary" className="p-5">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Upload className="w-5 h-5 text-primary" /> Upload Image
                    </h3>
                    {!uploadedPreview ? (
                      <label className="block cursor-pointer">
                        <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 hover:bg-primary/5 transition-all">
                          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="font-medium mb-1">Drop your image here</p>
                          <p className="text-sm text-muted-foreground">JPG, PNG, WEBP up to 25MB</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                      </label>
                    ) : (
                      <div className="space-y-4">
                        <div className="rounded-xl overflow-hidden bg-muted aspect-square">
                          <img src={uploadedPreview} alt="Uploaded" className="w-full h-full object-cover" />
                        </div>
                        <label className="block">
                          <Button variant="outline" className="w-full gap-2" asChild>
                            <span><RotateCw className="w-4 h-4" /> Change Image</span>
                          </Button>
                          <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                        </label>
                      </div>
                    )}
                  </GlassCard>

                  {/* Tools & Result */}
                  <div className="space-y-6">
                    <GlassCard glowColor="secondary" className="p-5">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Wand2 className="w-5 h-5 text-secondary" /> AI Tools
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {photoTools.map((tool) => (
                          <button
                            key={tool.id}
                            onClick={() => handleProcessImage(tool.id)}
                            disabled={isProcessing || !uploadedPreview}
                            className={`p-4 rounded-xl text-left transition-all duration-200 disabled:opacity-50 ${
                              selectedTool === tool.id && isProcessing
                                ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                                : "bg-muted/80 hover:bg-muted border border-border/50 hover:border-primary/30"
                            }`}
                          >
                            <tool.icon className="w-5 h-5 mb-2" />
                            <p className="text-sm font-semibold">{tool.label}</p>
                            <p className="text-xs opacity-70">{tool.description}</p>
                          </button>
                        ))}
                      </div>
                    </GlassCard>

                    {(isProcessing || processedImage) && (
                      <GlassCard glowColor="accent" className="p-5">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-accent" /> Result
                        </h3>
                        <div className="rounded-xl overflow-hidden bg-muted aspect-square relative">
                          {isProcessing ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                              <p className="text-muted-foreground">Processing with AI...</p>
                            </div>
                          ) : processedImage ? (
                            <img src={processedImage} alt="Processed" className="w-full h-full object-cover" />
                          ) : null}
                        </div>
                        {processedImage && (
                          <Button onClick={handleDownloadProcessed} className="w-full mt-4 gap-2 bg-gradient-to-r from-primary to-secondary">
                            <Download className="w-4 h-4" /> Download Result
                          </Button>
                        )}
                      </GlassCard>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* PDF Tools */}
            {activeTab === "pdf" && (
              <motion.div key="pdf" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <GlassCard glowColor="primary" className="p-6">
                  {!pdfUrl ? (
                    <label className="block cursor-pointer">
                      <div className="border-2 border-dashed border-border rounded-xl p-16 text-center hover:border-primary/50 hover:bg-primary/5 transition-all">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="font-semibold mb-2 text-lg">Upload a PDF</h3>
                        <p className="text-sm text-muted-foreground">Drop or click to browse • PDF files up to 50MB</p>
                      </div>
                      <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
                    </label>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          {pdfFile?.name}
                        </h3>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => { setPdfUrl(null); setPdfFile(null); }}>
                            <RotateCw className="w-4 h-4 mr-1" /> Change
                          </Button>
                          <Button size="sm" className="gap-1 bg-gradient-to-r from-primary to-secondary" onClick={() => {
                            if (pdfFile) {
                              const link = document.createElement('a');
                              link.href = pdfUrl!;
                              link.download = pdfFile.name;
                              link.click();
                            }
                          }}>
                            <Download className="w-4 h-4" /> Download
                          </Button>
                        </div>
                      </div>
                      <iframe src={pdfUrl} className="w-full h-[70vh] rounded-xl border border-border" title="PDF Viewer" />
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            )}

            {/* Voice to Text */}
            {activeTab === "voice" && (
              <motion.div key="voice" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <GlassCard glowColor="secondary" className="p-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">Voice to Text</h3>
                    <p className="text-muted-foreground">Convert speech to text in real-time</p>
                  </div>

                  <div className="flex justify-center mb-8">
                    <motion.button
                      onClick={toggleVoiceRecognition}
                      whileTap={{ scale: 0.95 }}
                      className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isListening
                          ? "bg-destructive/20 border-2 border-destructive"
                          : "bg-primary/20 border-2 border-primary hover:bg-primary/30"
                      }`}
                    >
                      {isListening && (
                        <>
                          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full bg-destructive/20" />
                          <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 rounded-full bg-destructive/30" />
                        </>
                      )}
                      <Mic className={`w-12 h-12 relative z-10 ${isListening ? "text-destructive" : "text-primary"}`} />
                    </motion.button>
                  </div>

                  <p className="text-center text-muted-foreground mb-6">
                    {isListening ? "🔴 Listening... Tap to stop" : "Tap the microphone to start speaking"}
                  </p>

                  <div className="bg-muted/50 rounded-xl p-6 min-h-[200px] border border-border/50">
                    {transcript ? (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-muted-foreground">Transcript:</span>
                          <Button variant="outline" size="sm" onClick={copyTranscript} className="gap-1">
                            <Languages className="w-3 h-3" /> Copy
                          </Button>
                        </div>
                        <p className="text-foreground leading-relaxed">{transcript}</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <p>Your transcribed text will appear here...</p>
                      </div>
                    )}
                  </div>

                  {transcript && (
                    <div className="mt-4 flex gap-3">
                      <Button onClick={copyTranscript} className="flex-1 gap-2 bg-gradient-to-r from-primary to-secondary">
                        <Check className="w-4 h-4" /> Copy Text
                      </Button>
                      <Button variant="outline" onClick={() => setTranscript("")} className="gap-2">
                        <RotateCw className="w-4 h-4" /> Clear
                      </Button>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <WarperFooter />
    </div>
  );
};

export default Tools;
