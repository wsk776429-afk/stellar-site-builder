import WarperHeader from "@/components/WarperHeader";
import WarperFooter from "@/components/WarperFooter";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Image, 
  Wand2, 
  Download, 
  Upload, 
  Sparkles,
  ZoomIn,
  Palette,
  Crop,
  RotateCw,
  Eraser,
  Layers
} from "lucide-react";
import { useState } from "react";

const pdfTools = [
  { id: "view", icon: FileText, label: "View PDF", description: "Open and read PDF files" },
  { id: "merge", icon: Layers, label: "Merge PDFs", description: "Combine multiple PDFs" },
  { id: "compress", icon: Download, label: "Compress PDF", description: "Reduce file size" },
  { id: "convert", icon: RotateCw, label: "Convert PDF", description: "PDF to image or document" },
];

const photoTools = [
  { id: "enhance", icon: Sparkles, label: "AI Enhance", description: "Improve photo quality" },
  { id: "upscale", icon: ZoomIn, label: "Upscale", description: "Increase resolution" },
  { id: "colorize", icon: Palette, label: "Colorize", description: "Add color to B&W photos" },
  { id: "crop", icon: Crop, label: "Smart Crop", description: "Intelligent cropping" },
  { id: "remove-bg", icon: Eraser, label: "Remove Background", description: "Transparent background" },
  { id: "restore", icon: Wand2, label: "Restore", description: "Fix old or damaged photos" },
];

const Tools = () => {
  const [activeTab, setActiveTab] = useState<"pdf" | "photo">("pdf");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <WarperHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-foreground">PDF & Photo </span>
              <span className="text-secondary glow-text">Tools</span>
            </h1>
            <p className="text-muted-foreground">
              Professional tools powered by AI for documents and images
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-8">
            <Button
              variant={activeTab === "pdf" ? "default" : "outline"}
              onClick={() => setActiveTab("pdf")}
              className="gap-2"
              size="lg"
            >
              <FileText className="w-4 h-4" />
              PDF Tools
            </Button>
            <Button
              variant={activeTab === "photo" ? "default" : "outline"}
              onClick={() => setActiveTab("photo")}
              className="gap-2"
              size="lg"
            >
              <Image className="w-4 h-4" />
              Photo Tools
            </Button>
          </div>

          {/* Upload Area */}
          <div className="mb-8">
            <label className="block">
              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">
                  Drop your {activeTab === "pdf" ? "PDF" : "image"} here
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to browse from your computer
                </p>
                <p className="text-xs text-muted-foreground">
                  {activeTab === "pdf" 
                    ? "Supports: PDF files up to 50MB"
                    : "Supports: JPG, PNG, WEBP up to 25MB"
                  }
                </p>
              </div>
              <input type="file" className="hidden" accept={activeTab === "pdf" ? ".pdf" : "image/*"} />
            </label>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(activeTab === "pdf" ? pdfTools : photoTools).map((tool, index) => (
              <button
                key={tool.id}
                className="bg-card rounded-xl border border-border p-6 text-left hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/10 transition-all group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <tool.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-1">{tool.label}</h3>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </button>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { title: "Fast Processing", description: "Get results in seconds with our optimized AI" },
              { title: "High Quality", description: "Professional-grade output every time" },
              { title: "Secure", description: "Files are encrypted and deleted after processing" },
            ].map((item) => (
              <div key={item.title} className="text-center p-4">
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <WarperFooter />
    </div>
  );
};

export default Tools;
