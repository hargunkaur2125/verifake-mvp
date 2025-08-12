import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import AnalysisInterface from "@/components/home/analysis-interface";

export default function Home() {
  return (
    <div className="min-h-screen bg-deep-navy text-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AnalysisInterface />
      </main>
      
      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-dark-surface py-12 mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-electric-blue to-neon-green rounded-lg flex items-center justify-center">
                  <i className="fas fa-shield-alt text-white"></i>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-electric-blue to-neon-green bg-clip-text text-transparent">
                  VeriFake
                </span>
              </div>
              <p className="text-gray-400">
                Advanced AI-powered social media account detection for a safer digital world.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-electric-blue transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">API</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-electric-blue transition-colors">About</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-electric-blue transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 VeriFake. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
