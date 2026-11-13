export type ReportCategory =
  | 'Academic Reports'
  | 'School Performance'
  | 'Subscription Reports'
  | 'Usage Reports'
  | 'Safeguarding Reports'
  | 'Custom Reports';

export type ReportFrequency =
  | 'Daily'
  | 'Weekly'
  | 'Monthly'
  | 'Quarterly'
  | 'Annual'
  | 'On-Demand';

export type ReportStatus =
  | 'Ready'
  | 'Scheduled'
  | 'Pending Review'
  | 'Needs Update'
  | 'Generating';

export type ReportFormat = 'PDF' | 'XLSX' | 'CSV' | 'PDF, XLSX' | 'PDF, CSV';

export interface ReportMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  tone: 'primary' | 'success' | 'amber' | 'purple' | 'info' | 'danger';
  icon: string;
  comparisonPeriod: string;
}

export interface PlatformReport {
  id: string;
  name: string;
  description: string;
  category: ReportCategory;
  icon: string;
  iconTone: 'primary' | 'purple' | 'success' | 'amber' | 'danger' | 'info';
  scope: string;
  scopeSchoolsCount: number;
  frequency: ReportFrequency;
  lastGeneratedDate: string;
  lastGeneratedTime: string;
  status: ReportStatus;
  scheduledDate?: string;
  format: ReportFormat;
  ownerName: string;
  ownerInitials: string;
  ownerRole?: string;
  fileSizeBytes?: string;
  downloadCount?: number;
}

export interface ReportBottomMetric {
  id: string;
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  comparisonPeriod?: string;
  sparkline?: number[];
  tone: 'success' | 'primary' | 'purple' | 'info';
  isStatusCard?: boolean;
  statusBadge?: string;
  hasInfoTooltip?: boolean;
}

export interface ReportHealthCategory {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ScheduledReportQueueItem {
  id: string;
  title: string;
  scheduledTime: string;
  icon: string;
  iconTone: 'purple' | 'primary' | 'success' | 'danger';
  badge: string;
}

export interface RecentReportActivity {
  id: string;
  title: string;
  actorAndTimestamp: string;
  icon: string;
  iconTone: 'success' | 'primary' | 'amber';
}

export interface QuickReportTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconTone: 'primary' | 'info' | 'purple' | 'indigo';
}

export interface CreateReportFormData {
  reportName: string;
  description: string;
  category: ReportCategory;
  scope: string;
  frequency: ReportFrequency;
  format: ReportFormat;
  includeCharts: boolean;
  notifyRecipients: boolean;
}

export interface ScheduleReportFormData {
  reportId: string;
  scheduleTime: string;
  frequency: ReportFrequency;
  deliveryEmail: string;
  format: ReportFormat;
}
