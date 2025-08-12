export interface AnalysisResult {
  account: {
    id: string;
    platform: string;
    username: string;
    url: string;
    analyzedAt: string;
  };
  detection: {
    id: string;
    fakeScore: number;
    riskLevel: 'low' | 'medium' | 'high';
    confidence: number;
    indicators: string[];
    analysisDetails: {
      profileCompleteness: string;
      postingPattern: string;
      networkQuality: string;
      contentAuthenticity: string;
    };
  };
}

export interface DashboardAnalytics {
  analytics: {
    totalAnalyzed: number;
    fakeDetected: number;
    accuracyRate: number;
    avgAnalysisTime: number;
    platformBreakdown: {
      twitter: { analyzed: number; fake: number };
      instagram: { analyzed: number; fake: number };
      facebook: { analyzed: number; fake: number };
    };
  };
  recentDetections: Array<{
    id: string;
    accountId: string;
    fakeScore: number;
    riskLevel: string;
    detectedAt: string;
  }>;
}

export interface RecentActivity {
  id: string;
  username: string;
  platform: string;
  riskLevel: 'low' | 'medium' | 'high';
  analyzedAt: string;
  fakeScore: number;
}

export interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  activeUsers: number;
  apiResponseTime: number;
  uptime: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  lastActive: string;
  createdAt: string;
}
