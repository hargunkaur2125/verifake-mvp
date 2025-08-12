import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, real, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"), // user, admin, analyst
  isActive: boolean("is_active").notNull().default(true),
  lastActive: timestamp("last_active").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const accounts = pgTable("accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  platform: text("platform").notNull(), // twitter, instagram, facebook
  username: text("username").notNull(),
  url: text("url").notNull(),
  profileData: jsonb("profile_data"), // raw profile data from platform
  analyzedAt: timestamp("analyzed_at").defaultNow(),
  analyzedBy: varchar("analyzed_by").references(() => users.id),
});

export const detections = pgTable("detections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accountId: varchar("account_id").notNull().references(() => accounts.id),
  fakeScore: real("fake_score").notNull(), // 0-100 percentage
  riskLevel: text("risk_level").notNull(), // low, medium, high
  confidence: real("confidence").notNull(), // 0-100 percentage
  indicators: jsonb("indicators"), // array of detected risk indicators
  analysisDetails: jsonb("analysis_details"), // detailed analysis results
  detectedAt: timestamp("detected_at").defaultNow(),
});

export const analytics = pgTable("analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: timestamp("date").notNull(),
  totalAnalyzed: integer("total_analyzed").notNull().default(0),
  fakeDetected: integer("fake_detected").notNull().default(0),
  accuracyRate: real("accuracy_rate").notNull().default(0),
  avgAnalysisTime: real("avg_analysis_time").notNull().default(0), // in seconds
  platformBreakdown: jsonb("platform_breakdown"), // platform-wise stats
});

export const systemMetrics = pgTable("system_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  timestamp: timestamp("timestamp").defaultNow(),
  cpuUsage: real("cpu_usage").notNull(),
  memoryUsage: real("memory_usage").notNull(),
  activeUsers: integer("active_users").notNull(),
  apiResponseTime: real("api_response_time").notNull(),
  uptime: real("uptime").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  lastActive: true,
});

export const insertAccountSchema = createInsertSchema(accounts).omit({
  id: true,
  analyzedAt: true,
});

export const insertDetectionSchema = createInsertSchema(detections).omit({
  id: true,
  detectedAt: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
});

export const insertSystemMetricsSchema = createInsertSchema(systemMetrics).omit({
  id: true,
  timestamp: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Account = typeof accounts.$inferSelect;
export type InsertAccount = z.infer<typeof insertAccountSchema>;
export type Detection = typeof detections.$inferSelect;
export type InsertDetection = z.infer<typeof insertDetectionSchema>;
export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type SystemMetrics = typeof systemMetrics.$inferSelect;
export type InsertSystemMetrics = z.infer<typeof insertSystemMetricsSchema>;

// Additional validation schemas
export const analyzeAccountSchema = z.object({
  url: z.string().url("Please provide a valid URL"),
  platform: z.enum(["twitter", "instagram", "facebook"]),
});

export type AnalyzeAccountRequest = z.infer<typeof analyzeAccountSchema>;
