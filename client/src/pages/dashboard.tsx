import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import StatsCards from "@/components/dashboard/stats-cards";
import DetectionTrends from "@/components/dashboard/detection-trends";
import RecentActivity from "@/components/dashboard/recent-activity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export default function Dashboard() {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/analytics/dashboard"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const analytics = (dashboardData as any)?.analytics;

  return (
    <div className="min-h-screen bg-deep-navy text-white">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Header */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold">
                Analytics <span className="text-purple-400">Dashboard</span>
              </h1>
              <p className="text-xl text-gray-300">
                Comprehensive insights and real-time monitoring of your detection activities
              </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div variants={fadeInUp}>
              <StatsCards analytics={analytics} />
            </motion.div>

            {/* Main Dashboard Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Charts Section */}
              <div className="lg:col-span-2 space-y-8">
                <DetectionTrends />
              </div>
              
              {/* Sidebar */}
              <div className="space-y-8">
                <RecentActivity />
                
                {/* Risk Distribution */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  <Card className="glassmorphism border-electric-blue/20">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-white">Risk Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-red-400">High Risk</span>
                            <span className="text-sm font-semibold text-white">15%</span>
                          </div>
                          <Progress value={15} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-yellow-400">Medium Risk</span>
                            <span className="text-sm font-semibold text-white">23%</span>
                          </div>
                          <Progress value={23} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-green-400">Low Risk</span>
                            <span className="text-sm font-semibold text-white">62%</span>
                          </div>
                          <Progress value={62} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
