import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import SystemStatus from "@/components/admin/system-status";
import UserTable from "@/components/admin/user-table";
import AnalyticsChart from "@/components/admin/analytics-chart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Gauge, 
  Users, 
  Settings, 
  BarChart3, 
  Shield 
} from "lucide-react";
import { staggerContainer, fadeInUp, fadeInLeft } from "@/lib/animations";

const navItems = [
  { id: "overview", label: "Overview", icon: Gauge },
  { id: "users", label: "User Management", icon: Users },
  { id: "settings", label: "System Settings", icon: Settings },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "security", label: "Security", icon: Shield },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            <SystemStatus />
            <AnalyticsChart />
          </div>
        );
      case "users":
        return <UserTable />;
      case "analytics":
        return <AnalyticsChart />;
      default:
        return (
          <Card className="glassmorphism border-electric-blue/20">
            <CardContent className="p-12 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Coming Soon</h3>
              <p className="text-gray-400">This section is under development</p>
            </CardContent>
          </Card>
        );
    }
  };

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
                Admin <span className="text-electric-blue">Control Panel</span>
              </h1>
              <p className="text-xl text-gray-300">
                Advanced administrative tools for system monitoring and management
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <motion.div 
                variants={fadeInLeft}
                className="lg:col-span-1"
              >
                <Card className="glassmorphism border-electric-blue/20 sticky top-24">
                  <CardContent className="p-6">
                    <nav className="space-y-2">
                      {navItems.map((item) => (
                        <Button
                          key={item.id}
                          variant={activeTab === item.id ? "default" : "ghost"}
                          className={`w-full justify-start ${
                            activeTab === item.id
                              ? "bg-electric-blue/20 text-electric-blue border-electric-blue/30"
                              : "hover:bg-gray-700 text-gray-300"
                          }`}
                          onClick={() => setActiveTab(item.id)}
                          data-testid={`nav-tab-${item.id}`}
                        >
                          <item.icon className="mr-3 w-4 h-4" />
                          {item.label}
                        </Button>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Main Content */}
              <motion.div 
                variants={fadeInUp}
                className="lg:col-span-3"
                key={activeTab} // Force re-render when tab changes
              >
                {renderContent()}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
