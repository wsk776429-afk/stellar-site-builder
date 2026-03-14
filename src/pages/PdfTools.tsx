import WarperHeader from "@/components/WarperHeader";
import WarperFooter from "@/components/WarperFooter";
import MobileNav from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload, RotateCw } from "lucide-react";
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";

const PdfTools = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("pdf")) {
      toast({ title: "Invalid file", description: "Please upload a PDF file", variant: "destructive" });
      return;
    }
    setPdfFile(file);
    setPdfUrl(URL.createObjectURL(file));
    toast({ title: "PDF Loaded", description: file.name });
  }, [toast]);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden relative pb-20 md:pb-0">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-secondary/20 via-primary/10 to-transparent rounded-full blur-3xl" />
      </div>

      <WarperHeader />

      <main className="flex-1 container mx-auto px-4 py-4 md:py-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm mb-3">
              <FileText className="w-4 h-4" /> PDF Tools
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-1">
              <span className="text-foreground">PDF </span>
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Viewer</span>
            </h1>
            <p className="text-muted-foreground">View and manage your PDF documents</p>
          </motion.div>

          <GlassCard glowColor="secondary" className="p-4 md:p-6">
            {!pdfUrl ? (
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-border rounded-xl p-10 md:p-16 text-center hover:border-secondary/50 hover:bg-secondary/5 transition-all active:scale-[0.98]">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <h3 className="font-semibold mb-1">Tap to upload PDF</h3>
                  <p className="text-sm text-muted-foreground">PDF files up to 50MB</p>
                </div>
                <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
              </label>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-semibold flex items-center gap-2 text-sm truncate max-w-[200px]">
                    <FileText className="w-4 h-4 text-secondary shrink-0" />
                    {pdfFile?.name}
                  </h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => { setPdfUrl(null); setPdfFile(null); }}>
                      <RotateCw className="w-4 h-4 mr-1" /> Change
                    </Button>
                    <Button size="sm" className="gap-1 bg-gradient-to-r from-secondary to-accent" onClick={() => {
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
                <iframe src={pdfUrl} className="w-full h-[60vh] md:h-[70vh] rounded-xl border border-border" title="PDF Viewer" />
              </div>
            )}
          </GlassCard>
        </div>
      </main>

      <div className="hidden md:block"><WarperFooter /></div>
      <MobileNav />
    </div>
  );
};

export default PdfTools;
