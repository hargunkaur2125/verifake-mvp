import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, AlertTriangle, Shield, Clock } from "lucide-react";
import { scaleIn } from "@/lib/animations";
import type { DashboardAnalytics } from "@/types";

interface StatsCardsProps {
  analytics: DashboardAnalytics["analytics"] | null;
}

export default function StatsCards({ analytics }: StatsCardsProps) {
  const stats = [
    {
      icon: Users,
      title: "Accounts Analyzed",
      value: analytics?.totalAnalyzed?.toLocaleString() || "0",
      change: "+12%",
      changeType: "positive" as const,
      gradient: "from-electric-blue to-neon-green"
    },
    {
      icon: AlertTriangle,
      title: "Fake Detected",
      value: analytics?.fakeDetected?.toLocaleString() || "0",
      change: "+5%",
      changeType: "negative" as const,
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Accuracy Rate",
      value: `${analytics?.accuracyRate?.toFixed(1) || "0"}%`,
      change: "+8%",
      changeType: "positive" as const,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Avg Analysis Time",
      value: `${analytics?.avgAnalysisTime?.toFixed(1) || "0"}s`,
      change: "-15%",
      changeType: "positive" as const,
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 212, 255, 0.3)" }}
        >
          <Card className="glassmorphism border-gray-700 hover:border-electric-blue/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm ${
                  stat.changeType === "positive" ? "text-green-400" : "text-red-400"
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-1" data-testid={`stat-value-${index}`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.title}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
