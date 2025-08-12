import { 
  type User, 
  type InsertUser, 
  type Account, 
  type InsertAccount,
  type Detection, 
  type InsertDetection,
  type Analytics,
  type InsertAnalytics,
  type SystemMetrics,
  type InsertSystemMetrics
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  
  // Accounts
  getAccount(id: string): Promise<Account | undefined>;
  getAccountByUrl(url: string): Promise<Account | undefined>;
  createAccount(account: InsertAccount): Promise<Account>;
  getAccountsByUser(userId: string): Promise<Account[]>;
  getRecentAccounts(limit: number): Promise<Account[]>;
  
  // Detections
  getDetection(id: string): Promise<Detection | undefined>;
  createDetection(detection: InsertDetection): Promise<Detection>;
  getDetectionsByAccount(accountId: string): Promise<Detection[]>;
  getRecentDetections(limit: number): Promise<Detection[]>;
  
  // Analytics
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  getAnalyticsByDateRange(startDate: Date, endDate: Date): Promise<Analytics[]>;
  getLatestAnalytics(): Promise<Analytics | undefined>;
  
  // System Metrics
  createSystemMetrics(metrics: InsertSystemMetrics): Promise<SystemMetrics>;
  getLatestSystemMetrics(): Promise<SystemMetrics | undefined>;
  getSystemMetricsHistory(hours: number): Promise<SystemMetrics[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private accounts: Map<string, Account> = new Map();
  private detections: Map<string, Detection> = new Map();
  private analytics: Map<string, Analytics> = new Map();
  private systemMetrics: Map<string, SystemMetrics> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Create admin user
    const adminUser: User = {
      id: randomUUID(),
      username: "admin",
      email: "admin@verifake.com",
      password: "hashed_password",
      role: "admin",
      isActive: true,
      lastActive: new Date(),
      createdAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);

    // Create sample analytics
    const today = new Date();
    const analytics: Analytics = {
      id: randomUUID(),
      date: today,
      totalAnalyzed: 2847,
      fakeDetected: 342,
      accuracyRate: 99.2,
      avgAnalysisTime: 1.2,
      platformBreakdown: {
        twitter: { analyzed: 1195, fake: 143 },
        instagram: { analyzed: 996, fake: 119 },
        facebook: { analyzed: 656, fake: 80 }
      }
    };
    this.analytics.set(analytics.id, analytics);

    // Create sample system metrics
    const metrics: SystemMetrics = {
      id: randomUUID(),
      timestamp: new Date(),
      cpuUsage: 45.2,
      memoryUsage: 62.8,
      activeUsers: 1247,
      apiResponseTime: 847,
      uptime: 98.9
    };
    this.systemMetrics.set(metrics.id, metrics);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      role: insertUser.role || "user",
      isActive: insertUser.isActive !== undefined ? insertUser.isActive : true,
      createdAt: new Date(),
      lastActive: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getAccount(id: string): Promise<Account | undefined> {
    return this.accounts.get(id);
  }

  async getAccountByUrl(url: string): Promise<Account | undefined> {
    return Array.from(this.accounts.values()).find(account => account.url === url);
  }

  async createAccount(insertAccount: InsertAccount): Promise<Account> {
    const id = randomUUID();
    const account: Account = {
      ...insertAccount,
      id,
      profileData: insertAccount.profileData || null,
      analyzedBy: insertAccount.analyzedBy || null,
      analyzedAt: new Date(),
    };
    this.accounts.set(id, account);
    return account;
  }

  async getAccountsByUser(userId: string): Promise<Account[]> {
    return Array.from(this.accounts.values()).filter(account => account.analyzedBy === userId);
  }

  async getRecentAccounts(limit: number): Promise<Account[]> {
    return Array.from(this.accounts.values())
      .sort((a, b) => (b.analyzedAt?.getTime() || 0) - (a.analyzedAt?.getTime() || 0))
      .slice(0, limit);
  }

  async getDetection(id: string): Promise<Detection | undefined> {
    return this.detections.get(id);
  }

  async createDetection(insertDetection: InsertDetection): Promise<Detection> {
    const id = randomUUID();
    const detection: Detection = {
      ...insertDetection,
      id,
      indicators: insertDetection.indicators || null,
      analysisDetails: insertDetection.analysisDetails || null,
      detectedAt: new Date(),
    };
    this.detections.set(id, detection);
    return detection;
  }

  async getDetectionsByAccount(accountId: string): Promise<Detection[]> {
    return Array.from(this.detections.values()).filter(detection => detection.accountId === accountId);
  }

  async getRecentDetections(limit: number): Promise<Detection[]> {
    return Array.from(this.detections.values())
      .sort((a, b) => (b.detectedAt?.getTime() || 0) - (a.detectedAt?.getTime() || 0))
      .slice(0, limit);
  }

  async createAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const id = randomUUID();
    const analytics: Analytics = {
      ...insertAnalytics,
      id,
      totalAnalyzed: insertAnalytics.totalAnalyzed || 0,
      fakeDetected: insertAnalytics.fakeDetected || 0,
      accuracyRate: insertAnalytics.accuracyRate || 0,
      avgAnalysisTime: insertAnalytics.avgAnalysisTime || 0,
      platformBreakdown: insertAnalytics.platformBreakdown || null,
    };
    this.analytics.set(id, analytics);
    return analytics;
  }

  async getAnalyticsByDateRange(startDate: Date, endDate: Date): Promise<Analytics[]> {
    return Array.from(this.analytics.values()).filter(analytics => 
      analytics.date >= startDate && analytics.date <= endDate
    );
  }

  async getLatestAnalytics(): Promise<Analytics | undefined> {
    const analyticsArray = Array.from(this.analytics.values());
    return analyticsArray.sort((a, b) => b.date.getTime() - a.date.getTime())[0];
  }

  async createSystemMetrics(insertMetrics: InsertSystemMetrics): Promise<SystemMetrics> {
    const id = randomUUID();
    const metrics: SystemMetrics = {
      ...insertMetrics,
      id,
      timestamp: new Date(),
    };
    this.systemMetrics.set(id, metrics);
    return metrics;
  }

  async getLatestSystemMetrics(): Promise<SystemMetrics | undefined> {
    const metricsArray = Array.from(this.systemMetrics.values());
    return metricsArray.sort((a, b) => (b.timestamp?.getTime() || 0) - (a.timestamp?.getTime() || 0))[0];
  }

  async getSystemMetricsHistory(hours: number): Promise<SystemMetrics[]> {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    return Array.from(this.systemMetrics.values())
      .filter(metrics => (metrics.timestamp?.getTime() || 0) >= cutoff.getTime())
      .sort((a, b) => (a.timestamp?.getTime() || 0) - (b.timestamp?.getTime() || 0));
  }
}

export const storage = new MemStorage();
