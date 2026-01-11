import WarperHeader from "@/components/WarperHeader";
import WarperFooter from "@/components/WarperFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Sparkles, Download, RefreshCw, Wand2, Image, Maximize2 } from "lucide-react";

const qualityOptions = [
  { id: "hd", label: "HD", description: "1024x1024" },
  { id: "4k", label: "4K", description: "2048x2048" },
  { id: "ultra", label: "Ultra", description: "4096x4096" },
];

const styleOptions = [
  { id: "realistic", label: "Photorealistic" },
  { id: "artistic", label: "Artistic" },
  { id: "anime", label: "Anime" },
  { id: "3d", label: "3D Render" },
  { id: "abstract", label: "Abstract" },
  { id: "vintage", label: "Vintage" },
];

const ImageStudio = () => {
  const [prompt, setPrompt] = useState("");
  const [quality, setQuality] = useState("hd");
  const [style, setStyle] = useState("realistic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=512&h=512&fit=crop",
    "https://images.unsplash.com/photo-1686191128892-3b37add4ad1d?w=512&h=512&fit=crop",
    "https://images.unsplash.com/photo-1684779847639-fbcc5a57dfe9?w=512&h=512&fit=crop",
    "https://images.unsplash.com/photo-1699116548123-95406d7cfbfe?w=512&h=512&fit=crop",
  ]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <WarperHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-foreground">AI Image </span>
              <span className="text-accent glow-text">Studio</span>
            </h1>
            <p className="text-muted-foreground">
              Create stunning AI-generated images with various styles and qualities
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Controls */}
            <div className="lg:col-span-1 space-y-6">
              {/* Prompt Input */}
              <div className="bg-card rounded-xl border border-border p-4">
                <label className="text-sm font-medium mb-2 block">Describe your image</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A majestic dragon flying over a medieval castle at sunset..."
                  className="w-full h-32 bg-muted rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Quality Selection */}
              <div className="bg-card rounded-xl border border-border p-4">
                <label className="text-sm font-medium mb-3 block">Quality</label>
                <div className="grid grid-cols-3 gap-2">
                  {qualityOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setQuality(option.id)}
                      className={`p-3 rounded-lg text-center transition-all ${
                        quality === option.id
                          ? "bg-accent/20 border border-accent"
                          : "bg-muted hover:bg-muted/80 border border-transparent"
                      }`}
                    >
                      <p className={`text-sm font-medium ${quality === option.id ? "text-accent" : ""}`}>
                        {option.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Selection */}
              <div className="bg-card rounded-xl border border-border p-4">
                <label className="text-sm font-medium mb-3 block">Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {styleOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setStyle(option.id)}
                      className={`p-3 rounded-lg text-sm transition-all ${
                        style === option.id
                          ? "bg-accent/20 border border-accent text-accent"
                          : "bg-muted hover:bg-muted/80 border border-transparent"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full gap-2 glow-box-accent"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Image
                  </>
                )}
              </Button>
            </div>

            {/* Gallery */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Generated Images</h3>
                  <span className="text-sm text-muted-foreground">{generatedImages.length} images</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {generatedImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative group rounded-xl overflow-hidden aspect-square bg-muted"
                    >
                      <img
                        src={img}
                        alt={`Generated ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="icon" variant="ghost" className="h-10 w-10">
                          <Maximize2 className="w-5 h-5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-10 w-10">
                          <Download className="w-5 h-5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-10 w-10">
                          <Wand2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WarperFooter />
    </div>
  );
};

export default ImageStudio;
