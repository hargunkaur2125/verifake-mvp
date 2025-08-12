import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeAccountSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

// Mock AI detection algorithm
function generateDetectionResult(url: string, platform: string) {
  // Simulate different risk levels based on URL patterns
  const riskFactors = [
    url.includes('suspicious') ? 30 : 0,
    url.includes('fake') ? 40 : 0,
    url.includes('bot') ? 35 : 0,
    Math.random() * 50 // Random component
  ];
  
  const fakeScore = Math.min(100, riskFactors.reduce((sum, factor) => sum + factor, 0));
  const confidence = 85 + Math.random() * 10; // 85-95% confidence
  
  let riskLevel: "low" | "medium" | "high";
  if (fakeScore < 30) riskLevel = "low";
  else if (fakeScore < 70) riskLevel = "medium";
  else riskLevel = "high";
  
  const indicators = [];
  if (fakeScore > 20) indicators.push("Irregular posting pattern");
  if (fakeScore > 40) indicators.push("Low profile completeness");
  if (fakeScore > 60) indicators.push("Suspicious network connections");
  if (fakeScore > 80) indicators.push("Poor content authenticity");
  
  return {
    fakeScore: Math.round(fakeScore),
    confidence: Math.round(confidence),
    riskLevel,
    indicators,
    analysisDetails: {
      profileCompleteness: fakeScore > 40 ? "Low" : fakeScore > 20 ? "Medium" : "High",
      postingPattern: fakeScore > 30 ? "Irregular" : "Normal",
      networkQuality: fakeScore > 50 ? "Suspicious" : "Good",
      contentAuthenticity: fakeScore > 70 ? "Poor" : "Good"
    }
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Account analysis endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const { url, platform } = analyzeAccountSchema.parse(req.body);
      
      // Check if account already exists
      let account = await storage.getAccountByUrl(url);
      
      if (!account) {
        // Extract username from URL (simplified)
        const username = url.split('/').pop() || 'unknown';
        
        // Create new account record
        account = await storage.createAccount({
          platform,
          username,
          url,
          profileData: { url, platform }, // In real app, would fetch from platform API
          analyzedBy: null // Would be set to current user ID in authenticated app
        });
      }
      
      // Generate AI detection results
      const detectionData = generateDetectionResult(url, platform);
      
      // Create detection record
      const detection = await storage.createDetection({
        accountId: account.id,
        ...detectionData
      });
      
      res.json({
        account,
        detection,
        success: true
      });
    } catch (error) {
      console.error('Analysis error:', error);
      res.status(400).json({ 
        error: error instanceof z.ZodError ? error.errors : "Analysis failed",
        success: false
      });
    }
  });
  
  // Get dashboard analytics
  app.get("/api/analytics/dashboard", async (req, res) => {
    try {
      const analytics = await storage.getLatestAnalytics();
      const recentDetections = await storage.getRecentDetections(10);
      
      res.json({
        analytics,
        recentDetections,
        success: true
      });
    } catch (error) {
      console.error('Dashboard analytics error:', error);
      res.status(500).json({ error: "Failed to fetch analytics", success: false });
    }
  });
  
  // Get recent activity
  app.get("/api/activity/recent", async (req, res) => {
    try {
      const recentAccounts = await storage.getRecentAccounts(20);
      const activities = [];
      
      for (const account of recentAccounts) {
        const detections = await storage.getDetectionsByAccount(account.id);
        const latestDetection = detections[detections.length - 1];
        
        if (latestDetection) {
          activities.push({
            id: account.id,
            username: account.username,
            platform: account.platform,
            riskLevel: latestDetection.riskLevel,
            analyzedAt: account.analyzedAt,
            fakeScore: latestDetection.fakeScore
          });
        }
      }
      
      activities.sort((a, b) => (b.analyzedAt?.getTime() || 0) - (a.analyzedAt?.getTime() || 0));
      
      res.json({ activities: activities.slice(0, 10), success: true });
    } catch (error) {
      console.error('Recent activity error:', error);
      res.status(500).json({ error: "Failed to fetch recent activity", success: false });
    }
  });
  
  // Admin endpoints
  app.get("/api/admin/system-status", async (req, res) => {
    try {
      const metrics = await storage.getLatestSystemMetrics();
      res.json({ metrics, success: true });
    } catch (error) {
      console.error('System status error:', error);
      res.status(500).json({ error: "Failed to fetch system status", success: false });
    }
  });
  
  app.get("/api/admin/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      // Remove password from response
      const safeUsers = users.map(({ password, ...user }) => user);
      res.json({ users: safeUsers, success: true });
    } catch (error) {
      console.error('Users fetch error:', error);
      res.status(500).json({ error: "Failed to fetch users", success: false });
    }
  });
  
  app.post("/api/admin/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      const { password, ...safeUser } = user;
      res.json({ user: safeUser, success: true });
    } catch (error) {
      console.error('User creation error:', error);
      res.status(400).json({ 
        error: error instanceof z.ZodError ? error.errors : "Failed to create user",
        success: false
      });
    }
  });
  
  app.get("/api/admin/analytics/trends", async (req, res) => {
    try {
      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000); // Last 30 days
      
      const trends = await storage.getAnalyticsByDateRange(startDate, endDate);
      
      // Generate sample trend data if none exists
      if (trends.length === 0) {
        const sampleTrends = [];
        for (let i = 0; i < 30; i++) {
          const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
          sampleTrends.push({
            date: date.toISOString().split('T')[0],
            analyzed: Math.floor(80 + Math.random() * 40),
            fake: Math.floor(5 + Math.random() * 15),
            accuracy: 95 + Math.random() * 4
          });
        }
        res.json({ trends: sampleTrends, success: true });
      } else {
        res.json({ trends, success: true });
      }
    } catch (error) {
      console.error('Analytics trends error:', error);
      res.status(500).json({ error: "Failed to fetch analytics trends", success: false });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
