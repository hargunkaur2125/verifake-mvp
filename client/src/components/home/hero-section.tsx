import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Rocket } from "lucide-react";
import { fadeInUp, fadeInLeft, fadeInRight, pulseGlow, floatingAnimation } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 via-transparent to-neon-green/10 animate-gradient" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold leading-tight"
                variants={fadeInUp}
              >
                Detect
                <span className="bg-gradient-to-r from-electric-blue to-neon-green bg-clip-text text-transparent">
                  {" "}Fake{" "}
                </span>
                <br />Social Accounts
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 leading-relaxed"
                variants={fadeInUp}
              >
                Advanced AI-powered detection system that identifies fake social media accounts with 99.7% accuracy using behavioral analysis and machine learning.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeInUp}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="px-8 py-4 bg-gradient-to-r from-electric-blue to-neon-green text-lg font-semibold hover:shadow-lg hover:shadow-electric-blue/25 transition-all"
                  data-testid="button-start-detection"
                >
                  <Rocket className="mr-2 w-5 h-5" />
                  Start Detection
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 text-lg font-semibold border-gray-600 hover:border-electric-blue hover:bg-electric-blue/10 transition-all"
                  data-testid="button-watch-demo"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-3 gap-8 pt-8"
              variants={fadeInUp}
            >
              <div className="text-center">
                <motion.div 
                  className="text-3xl font-bold text-electric-blue"
                  animate={pulseGlow}
                >
                  99.7%
                </motion.div>
                <div className="text-sm text-gray-400">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-3xl font-bold text-neon-green"
                  animate={pulseGlow}
                >
                  50M+
                </motion.div>
                <div className="text-sm text-gray-400">Accounts Analyzed</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-3xl font-bold text-purple-400"
                  animate={pulseGlow}
                >
                  24/7
                </motion.div>
                <div className="text-sm text-gray-400">Real-time Monitoring</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Content - Dashboard Preview */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <motion.div
              animate={floatingAnimation}
              className="glassmorphism rounded-3xl p-8 space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Detection Progress</span>
                  <span className="text-sm text-electric-blue">94%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-electric-blue to-neon-green"
                    initial={{ width: 0 }}
                    animate={{ width: "94%" }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="glassmorphism-dark rounded-lg p-4"
                  >
                    <div className="text-lg font-semibold text-red-400">142</div>
                    <div className="text-xs text-gray-400">Fake Accounts</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="glassmorphism-dark rounded-lg p-4"
                  >
                    <div className="text-lg font-semibold text-green-400">1,847</div>
                    <div className="text-xs text-gray-400">Verified Accounts</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-electric-blue to-neon-green rounded-full opacity-20"
            />
            <motion.div
              animate={{
                y: [-10, 10, -10],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
