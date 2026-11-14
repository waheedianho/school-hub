export interface AnalyticsMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  tone: 'primary' | 'success' | 'purple' | 'orange' | 'indigo' | 'danger';
  icon: string;
  comparisonPeriod: string;
  sparkline: number[];
}

export interface PlatformUsagePoint {
  date: string;
  dayLabel: string;
  dau: number;
  formattedDau: string;
}

export interface ActiveInstitution {
  name: string;
  activeLearners: number;
  capacityPercentage: number;
}

export interface RoleUsageBreakdown {
  role: string;
  count: number;
  percentage: number;
  color: string;
}

export interface AssessmentCompletionPoint {
  date: string;
  completed: number;
  inProgress: number;
  notStarted: number;
  total: number;
}

export interface SubjectConsumption {
  subject: string;
  value: number;
  percentage: number;
}

export interface RegionSpread {
  region: string;
  institutions: number;
  activeLearners: number;
  growth: string;
  growthTrend: 'up' | 'down';
}

export interface HeatmapCell {
  week: string;
  weekLabel: string;
  day: string;
  intensity: 1 | 2 | 3 | 4 | 5; // 1 = lowest (lightest), 5 = highest (darkest)
  value: number;
}

export interface AttentionSchool {
  id: string;
  name: string;
  reason: string;
  engagementRate: number;
  status: 'critical' | 'warning';
}

export interface AdoptionInsight {
  id: string;
  schoolName: string;
  metric: string;
  tag: 'Strong Growth' | 'High Adoption' | 'On Track';
  trend: 'up' | 'down';
  icon: string;
}

export interface PlatformActivityItem {
  id: string;
  title: string;
  timestamp: string;
  icon: string;
  type: 'school' | 'assessment' | 'user' | 'content' | 'system';
}

export interface AnalyticsPerformanceSummary {
  avgSessionDuration: string;
  sessionDurationChange: string;
  retentionRate: string;
  retentionChange: string;
  ticketVolume: number;
  ticketVolumeChange: string;
  systemStatus: string;
  dataSyncHealth: string;
  lastSynced: string;
}
