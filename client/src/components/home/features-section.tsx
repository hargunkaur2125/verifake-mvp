import { motion } from "framer-motion";
import { Brain, Network, Clock, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";

const features = [
  {
    icon: Brain,
    title: "AI Behavioral Analysis",
    description: "Advanced machine learning algorithms analyze posting patterns, interaction behaviors, and account metadata to identify suspicious activities.",
    gradient: "from-electric-blue to-neon-green",
    delay: 0
  },
  {
    icon: Network,
    title: "Network Analysis",
    description: "Examine connection patterns, follower networks, and engagement clusters to detect coordinated inauthentic behavior.",
    gradient: "from-purple-500 to-pink-500",
    delay: 0.1
  },
  {
    icon: Clock,
    title: "Real-time Monitoring",
    description: "Continuous monitoring and instant alerts when suspicious accounts are detected in your network or mentions.",
    gradient: "from-neon-green to-electric-blue",
    delay: 0.2
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-bold"
          >
            Core <span className="text-electric-blue">Detection</span> Features
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Comprehensive AI-powered analysis tools designed to identify fake accounts with unprecedented accuracy
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={scaleIn}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 40px rgba(0, 212, 255, 0.2)" 
              }}
              className="glassmorphism rounded-2xl p-8 cursor-pointer group transition-all duration-300"
              data-testid={`feature-card-${index}`}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-semibold mb-4 group-hover:text-electric-blue transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <motion.div
                className="flex items-center text-electric-blue text-sm font-medium group-hover:text-neon-green transition-colors"
                whileHover={{ x: 5 }}
              >
                <span>Learn More</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
