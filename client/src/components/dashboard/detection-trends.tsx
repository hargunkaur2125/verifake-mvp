import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { fadeInUp } from "@/lib/animations";

// Sample trend data
const trendData = [
  { date: "Jan 1", analyzed: 85, fake: 8, accuracy: 97.2 },
  { date: "Jan 2", analyzed: 92, fake: 12, accuracy: 96.8 },
  { date: "Jan 3", analyzed: 78, fake: 6, accuracy: 98.1 },
  { date: "Jan 4", analyzed: 105, fake: 15, accuracy: 97.5 },
  { date: "Jan 5", analyzed: 88, fake: 9, accuracy: 97.8 },
  { date: "Jan 6", analyzed: 112, fake: 18, accuracy: 96.2 },
  { date: "Jan 7", analyzed: 95, fake: 7, accuracy: 98.4 }
];

const platformData = [
  { platform: "Twitter", percentage: 42, color: "#1DA1F2" },
  { platform: "Instagram", percentage: 35, color: "#E4405F" },
  { platform: "Facebook", percentage: 23, color: "#1877F2" }
];

export default function DetectionTrends() {
  return (
    <div className="space-y-8">
      {/* Trends Chart */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <Card className="glassmorphism border-electric-blue/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white">Detection Trends</CardTitle>
              <Select defaultValue="7days">
                <SelectTrigger className="w-40 bg-dark-surface border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="3months">Last 3 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
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
                  <Line 
                    type="monotone" 
                    dataKey="analyzed" 
                    stroke="#00D4FF" 
                    strokeWidth={3}
                    dot={{ fill: "#00D4FF", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#00D4FF" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="fake" 
                    stroke="#EF4444" 
                    strokeWidth={3}
                    dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#EF4444" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Platform Distribution */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <Card className="glassmorphism border-electric-blue/20">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformData.map((platform, index) => (
                <motion.div 
                  key={platform.platform}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: platform.color }}
                      />
                      <span className="text-sm text-white">{platform.platform}</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{platform.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: platform.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${platform.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
