import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Users, Zap, Clock } from "lucide-react";
import { scaleIn } from "@/lib/animations";
import type { SystemMetrics } from "@/types";

export default function SystemStatus() {
  const { data: systemData, isLoading } = useQuery({
    queryKey: ["/api/admin/system-status"],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const metrics: SystemMetrics | null = (systemData as any)?.metrics || null;

  const statusCards = [
    {
      title: "System Health",
      value: `${metrics?.uptime?.toFixed(1) || "0"}%`,
      subtitle: "Uptime",
      icon: Activity,
      status: (metrics?.uptime || 0) > 95 ? "online" : "warning",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "API Performance",
      value: `${metrics?.apiResponseTime || "0"}ms`,
      subtitle: "Avg Response",
      icon: Zap,
      status: (metrics?.apiResponseTime || 0) < 1000 ? "online" : "warning",
      gradient: "from-electric-blue to-cyan-500"
    },
    {
      title: "Active Users",
      value: metrics?.activeUsers?.toLocaleString() || "0",
      subtitle: "Online Now",
      icon: Users,
      status: "online",
      gradient: "from-neon-green to-green-500"
    },
    {
      title: "CPU Usage",
      value: `${metrics?.cpuUsage?.toFixed(1) || "0"}%`,
      subtitle: "Current Load",
      icon: Clock,
      status: (metrics?.cpuUsage || 0) < 80 ? "online" : "warning",
      gradient: "from-purple-500 to-violet-500"
    }
  ];

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="glassmorphism border-gray-700 animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-700 rounded-xl" />
                <div className="w-3 h-3 bg-gray-700 rounded-full" />
              </div>
              <div className="w-16 h-8 bg-gray-700 rounded mb-2" />
              <div className="w-20 h-4 bg-gray-700 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statusCards.map((card, index) => (
        <motion.div
          key={card.title}
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 212, 255, 0.3)" }}
        >
          <Card className="glassmorphism border-gray-700 hover:border-electric-blue/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${card.gradient} rounded-xl flex items-center justify-center`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div 
                    className={`w-3 h-3 rounded-full ${
                      card.status === "online" 
                        ? "bg-green-400" 
                        : card.status === "warning"
                          ? "bg-yellow-400"
                          : "bg-red-400"
                    }`}
                  />
                </motion.div>
              </div>
              <CardTitle className="text-sm font-medium text-gray-300 mb-2">
                {card.title}
              </CardTitle>
              <div className="text-2xl font-bold text-white mb-1" data-testid={`system-metric-${index}`}>
                {card.value}
              </div>
              <div className="text-sm text-gray-400">{card.subtitle}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
