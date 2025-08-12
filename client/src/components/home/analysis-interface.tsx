import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, Search, History } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";
import type { AnalysisResult } from "@/types";

export default function AnalysisInterface() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: async (data: { url: string; platform: string }) => {
      const response = await apiRequest("POST", "/api/analyze", data);
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
      toast({
        title: "Analysis Complete",
        description: "Account has been successfully analyzed."
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleAnalyze = () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a social media URL to analyze.",
        variant: "destructive"
      });
      return;
    }

    // Detect platform from URL
    let platform = "twitter";
    if (url.includes("instagram.com")) platform = "instagram";
    else if (url.includes("facebook.com")) platform = "facebook";

    analyzeMutation.mutate({ url, platform });
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high": return "text-red-400";
      case "medium": return "text-yellow-400";
      case "low": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "default";
      default: return "outline";
    }
  };

  return (
    <section id="analysis" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold">
            Account <span className="text-neon-green">Analysis</span> Tool
          </h2>
          <p className="text-xl text-gray-300">
            Simply paste a social media URL to get instant fake account detection results
          </p>
        </motion.div>
        
        <div className="glassmorphism rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-3">
                  Social Media URL
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="https://twitter.com/username or instagram.com/profile"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pr-16 bg-dark-surface border-gray-600 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-electric-blue/20"
                    data-testid="input-url"
                  />
                  <Button
                    onClick={handleAnalyze}
                    disabled={analyzeMutation.isPending}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-electric-blue to-neon-green"
                    data-testid="button-analyze"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="glassmorphism-dark rounded-xl p-6">
                <h4 className="font-semibold mb-4 text-electric-blue flex items-center">
                  <Upload className="mr-2 w-5 h-5" />
                  Drag & Drop Analysis
                </h4>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-electric-blue transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mb-4 mx-auto" />
                  <p className="text-gray-300 mb-2">Drop URL list or CSV file here</p>
                  <p className="text-sm text-gray-500">Supports batch analysis of up to 1000 accounts</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button
                  onClick={handleAnalyze}
                  disabled={analyzeMutation.isPending || !url}
                  className="flex-1 bg-gradient-to-r from-electric-blue to-neon-green hover:opacity-90"
                  data-testid="button-analyze-account"
                >
                  <Search className="mr-2 w-5 h-5" />
                  {analyzeMutation.isPending ? "Analyzing..." : "Analyze Account"}
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 hover:border-electric-blue"
                  data-testid="button-history"
                >
                  <History className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
            
            {/* Results Section */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {result ? (
                <>
                  <div className="glassmorphism-dark rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Detection Results</h4>
                      <Badge variant={getRiskBadgeVariant(result.detection.riskLevel)}>
                        {result.detection.riskLevel.charAt(0).toUpperCase() + result.detection.riskLevel.slice(1)} Risk
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Fake Probability</span>
                        <span className={`text-sm font-semibold ${getRiskColor(result.detection.riskLevel)}`}>
                          {result.detection.fakeScore}%
                        </span>
                      </div>
                      <Progress 
                        value={result.detection.fakeScore} 
                        className="h-3"
                        data-testid="progress-fake-score"
                      />
                      
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="text-center">
                          <div className={`text-lg font-semibold ${getRiskColor(result.detection.riskLevel)}`}>
                            {result.detection.indicators.length}
                          </div>
                          <div className="text-xs text-gray-400">Risk Factors</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-electric-blue">
                            {result.detection.confidence}%
                          </div>
                          <div className="text-xs text-gray-400">Confidence</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glassmorphism-dark rounded-xl p-6">
                    <h4 className="font-semibold mb-4 text-electric-blue">Key Indicators</h4>
                    <div className="space-y-3">
                      {Object.entries(result.detection.analysisDetails).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm text-gray-300 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className={`text-sm ${
                            value === 'Poor' || value === 'Low' || value === 'Irregular' || value === 'Suspicious' 
                              ? 'text-red-400' 
                              : value === 'Medium' 
                                ? 'text-yellow-400' 
                                : 'text-green-400'
                          }`}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="glassmorphism-dark rounded-xl p-6">
                  <div className="text-center py-12">
                    <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Ready to Analyze</h4>
                    <p className="text-gray-400">Enter a social media URL above to begin detection analysis</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
