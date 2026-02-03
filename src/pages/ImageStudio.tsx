import WarperHeader from "@/components/WarperHeader";
import WarperFooter from "@/components/WarperFooter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sparkles, Download, RefreshCw, Wand2, Maximize2, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const qualityOptions = [
  { id: "hd", label: "HD", description: "1024×1024" },
  { id: "4k", label: "4K", description: "2048×2048" },
  { id: "ultra", label: "Ultra", description: "4096×4096" },
];

const styleOptions = [
  { id: "default", label: "Default" },
  { id: "realistic", label: "Photorealistic" },
  { id: "digital", label: "Digital Art" },
  { id: "oil", label: "Oil Painting" },
  { id: "watercolor", label: "Watercolor" },
  { id: "3d", label: "3D Render" },
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
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedImage(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt, style, quality }
      });

      if (error) {
        throw new Error(error.message || 'Failed to generate image');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setGeneratedImages(prev => [data.imageUrl, ...prev]);
        toast({
          title: "Image Generated!",
          description: data.description || "Your AI image has been created successfully.",
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
    link.download = `ai-image-${Date.now()}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Download Started",
      description: "Your image is being downloaded.",
    });
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <WarperHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-3d">
              <span className="text-foreground">AI Photo </span>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Transform your words into stunning images
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Controls */}
            <div className="lg:col-span-1 space-y-6">
              {/* Prompt Input */}
              <div className="bg-card rounded-xl border border-border p-5 card-3d">
                <label className="text-sm font-semibold mb-3 block">
                  Describe the image you want to create:
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A majestic dragon flying over a medieval castle at sunset..."
                  className="w-full h-32 bg-muted rounded-lg p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              {/* Style Selection */}
              <div className="bg-card rounded-xl border border-border p-5 card-3d">
                <label className="text-sm font-semibold mb-3 block">Choose a style (optional):</label>
                <div className="grid grid-cols-2 gap-2">
                  {styleOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setStyle(option.id)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all btn-3d ${
                        style === option.id
                          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80 border border-transparent"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Selection */}
              <div className="bg-card rounded-xl border border-border p-5 card-3d">
                <label className="text-sm font-semibold mb-3 block">Quality</label>
                <div className="grid grid-cols-3 gap-2">
                  {qualityOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setQuality(option.id)}
                      className={`p-3 rounded-lg text-center transition-all btn-3d ${
                        quality === option.id
                          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80 border border-transparent"
                      }`}
                    >
                      <p className="text-sm font-semibold">{option.label}</p>
                      <p className="text-xs opacity-80">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full gap-2 glow-box btn-3d bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Image
                  </>
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
                    <li
                      key={index}
                      onClick={() => handleExampleClick(example)}
                      className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors flex items-start gap-2"
                    >
                      <span className="text-primary">💡</span>
                      <span className="hover:underline">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Result Section */}
            <div className="lg:col-span-2">
              {/* Current Generation */}
              {(isGenerating || generatedImage) && (
                <div className="bg-card rounded-xl border border-border p-5 mb-6 card-3d">
                  <h3 className="font-semibold mb-4">Generated Image</h3>
                  <div className="rounded-xl overflow-hidden bg-muted aspect-square relative">
                    {isGenerating ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 border-4 border-muted-foreground/20 border-t-primary rounded-full animate-spin mb-4" />
                        <p className="text-muted-foreground animate-pulse">
                          Creating your image... This may take a moment
                        </p>
                      </div>
                    ) : generatedImage ? (
                      <>
                        <img
                          src={generatedImage}
                          alt="Generated"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-4 right-4">
                          <Button
                            onClick={() => handleDownload(generatedImage)}
                            className="w-full gap-2 bg-primary hover:bg-primary/90"
                            size="lg"
                          >
                            <Download className="w-5 h-5" />
                            Download Image
                          </Button>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              )}

              {/* Gallery */}
              <div className="bg-card rounded-xl border border-border p-5 card-3d">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Generated Images</h3>
                  <span className="text-sm text-muted-foreground">{generatedImages.length} images</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {generatedImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative group rounded-xl overflow-hidden aspect-square bg-muted card-3d-subtle"
                    >
                      <img
                        src={img}
                        alt={`Generated ${index + 1}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="icon" variant="ghost" className="h-10 w-10">
                          <Maximize2 className="w-5 h-5" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-10 w-10"
                          onClick={() => handleDownload(img)}
                        >
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
