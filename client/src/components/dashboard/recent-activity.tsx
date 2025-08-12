import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { RecentActivity } from "@/types";

export default function RecentActivityComponent() {
  const { data: activityData, isLoading } = useQuery({
    queryKey: ["/api/activity/recent"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const getActivityIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case "medium":
        return <HelpCircle className="w-4 h-4 text-yellow-400" />;
      case "low":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      default:
        return <HelpCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getActivityBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "default";
      default: return "outline";
    }
  };

  const getActivityMessage = (activity: RecentActivity) => {
    switch (activity.riskLevel) {
      case "high":
        return "High risk detected";
      case "medium":
        return "Needs review";
      case "low":
        return "Authentic profile";
      default:
        return "Analysis complete";
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  if (isLoading) {
    return (
      <Card className="glassmorphism border-electric-blue/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Recent Detections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-dark-surface rounded-lg animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-full" />
                  <div className="space-y-1">
                    <div className="w-24 h-4 bg-gray-700 rounded" />
                    <div className="w-16 h-3 bg-gray-700 rounded" />
                  </div>
                </div>
                <div className="w-12 h-4 bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const activities: RecentActivity[] = (activityData as any)?.activities || [];

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <Card className="glassmorphism border-electric-blue/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Recent Detections</CardTitle>
        </CardHeader>
        <CardContent>
          {activities.length > 0 ? (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(55, 65, 81, 0.5)" }}
                  className="flex items-center justify-between p-3 bg-dark-surface rounded-lg transition-colors cursor-pointer"
                  data-testid={`activity-item-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                      {getActivityIcon(activity.riskLevel)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">@{activity.username}</div>
                      <div className="text-xs text-gray-400">{getActivityMessage(activity)}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getActivityBadgeVariant(activity.riskLevel)} className="text-xs">
                      {activity.fakeScore}%
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {formatTimeAgo(activity.analyzedAt)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-8">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-400">No recent activity</p>
              <p className="text-sm text-gray-500">Start analyzing accounts to see activity here</p>
            </div>
          )}
          
          <Button 
            variant="outline" 
            className="w-full mt-4 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white transition-all"
            data-testid="button-view-all-activity"
          >
            View All Activity
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
