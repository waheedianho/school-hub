export type MetricTone =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'purple';

export interface SuperAdminMetric {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  changeText: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  tone: MetricTone;
}

export interface PlatformUsageDataPoint {
  period: string;
  activeLearners: number;
  formattedValue: string;
}

export interface SubscriptionStatusBreakdown {
  activeCount: number;
  activePercentage: number;
  trialCount: number;
  trialPercentage: number;
  expiringCount: number;
  expiringPercentage: number;
  suspendedCount: number;
  suspendedPercentage: number;
  totalCount: number;
}

export interface ContentReadinessSummary {
  approvedPacks: number;
  approvedTrend: string;
  pendingReview: number;
  pendingTrend: string;
  missingAssets: number;
  missingTrend: string;
}

export interface RevenueSummary {
  mrr: number;
  mrrFormatted: string;
  mrrTrend: string;
  arr: number;
  arrFormatted: string;
  totalInvoices: number;
  invoicesTrend: string;
}

export interface SchoolAttentionItem {
  id: string;
  name: string;
  domain: string;
  initials: string;
  issue: string;
  usageLevel: 'High' | 'Medium' | 'Low';
  usagePercent: number;
  subscriptionStatus: 'Expiring Soon' | 'Active' | 'Suspended' | 'Trial';
  status: 'Action Needed' | 'Monitor';
}

export interface SupportTicketSummary {
  id: string;
  ticketNumber: string;
  title: string;
  schoolName: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  timeAgo: string;
}

export interface SafeguardingAlert {
  id: string;
  title: string;
  schoolName: string;
  severity: 'High' | 'Medium' | 'Low' | 'Critical';
  timeAgo: string;
  icon: string;
}

export interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
}

export interface PlatformHealthStatus {
  overallStatus: 'Operational' | 'Degraded' | 'Incident';
  overallDescription: string;
  systemStatus: string;
  services: string;
  database: string;
  storageUsedPercent: number;
  storageDescription: string;
  backupStatus: string;
  securityStatus: string;
}
