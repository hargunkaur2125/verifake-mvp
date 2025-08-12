import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Download } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

export default function AnalyticsChart() {
  const { data: trendsData, isLoading } = useQuery({
    queryKey: ["/api/admin/analytics/trends"],
  });

  const trends = (trendsData as any)?.trends || [];

  if (isLoading) {
    return (
      <Card className="glassmorphism border-electric-blue/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-white">Real-time Detection Analytics</CardTitle>
            <div className="flex space-x-2">
              <div className="w-16 h-8 bg-gray-700 rounded animate-pulse" />
              <div className="w-20 h-8 bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gray-800 rounded-xl animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <Card className="glassmorphism border-electric-blue/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-white flex items-center">
              <TrendingUp className="mr-2 w-5 h-5 text-electric-blue" />
              Real-time Detection Analytics
            </CardTitle>
            <div className="flex space-x-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  backgroundColor: ["rgba(0, 212, 255, 0.2)", "rgba(0, 212, 255, 0.4)", "rgba(0, 212, 255, 0.2)"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Button 
                  size="sm" 
                  className="bg-electric-blue hover:bg-electric-blue/80"
                  data-testid="button-live-data"
                >
                  Live
                </Button>
              </motion.div>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-gray-600 hover:border-electric-blue"
                data-testid="button-export-data"
              >
                <Download className="mr-2 w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends}>
                <defs>
                  <linearGradient id="colorAnalyzed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFake" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FF88" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00FF88" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    border: "1px solid #00D4FF",
                    borderRadius: "8px",
                    color: "#fff"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="analyzed"
                  stroke="#00D4FF"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAnalyzed)"
                />
                <Area
                  type="monotone"
                  dataKey="fake"
                  stroke="#EF4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorFake)"
                />
                <Area
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#00FF88"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAccuracy)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-electric-blue">
                {trends.reduce((sum: number, day: any) => sum + day.analyzed, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Total Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {trends.reduce((sum: number, day: any) => sum + day.fake, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Fake Detected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-green">
                {trends.length > 0 
                  ? (trends.reduce((sum: number, day: any) => sum + day.accuracy, 0) / trends.length).toFixed(1)
                  : "0"
                }%
              </div>
              <div className="text-sm text-gray-400">Avg Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
