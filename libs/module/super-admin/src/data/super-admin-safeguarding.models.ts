export type SafeguardingCaseCategory =
  | 'Inappropriate Communication'
  | 'Consent Pending'
  | 'Media-Upload Review'
  | 'Data Privacy Concern'
  | 'Policy Breach'
  | 'Escalation Review'
  | 'Inappropriate Content'
  | 'Consent Withdrawal'
  | 'Bullying & Harassment'
  | 'Staff Conduct';

export type SafeguardingSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export type SafeguardingCaseStatus =
  | 'Under Review'
  | 'Pending Consent'
  | 'Investigating'
  | 'Pending Review'
  | 'Escalated'
  | 'Resolved'
  | 'Closed';

export type SafeguardingTab =
  | 'Incident Queue'
  | 'Flagged Communications'
  | 'Consent & Permissions'
  | 'Policy Compliance'
  | 'Escalations'
  | 'Audit Reviews';

export interface SafeguardingPerson {
  name: string;
  role: string;
  type?: string;
  avatar?: string;
}

export interface SafeguardingCase {
  id: string;
  institution: string;
  location: string;
  category: SafeguardingCaseCategory;
  severity: SafeguardingSeverity;
  reportedBy: SafeguardingPerson;
  assignedTo: SafeguardingPerson;
  status: SafeguardingCaseStatus;
  lastUpdated: string;
  lastUpdatedTime: string;
  details?: string;
  learnerName?: string;
  staffName?: string;
  additionalUsers?: string;
  gradeClass?: string;
  parentLinked?: string;
  evidenceFilesCount?: number;
  slaDeadline?: string;
  escalatedTo?: string;
  dateCreated?: string;
}

export interface SafeguardingMetric {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
  subtext: string;
  icon: string;
  colorClass: string;
}

export interface SafeguardingBottomMetric {
  id: string;
  label: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
  subtext?: string;
  type: 'sparkline' | 'gauge' | 'status';
  percentage?: number;
  sparklinePoints?: string;
  sparklineColor?: string;
  statusBadge?: string;
}

export interface ComplianceHealthCategory {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface UrgentEscalation {
  id: string;
  caseId: string;
  school: string;
  title: string;
  severity: SafeguardingSeverity;
  timestamp: string;
  icon: string;
  iconClass: string;
}

export interface ConsentQueueBreakdown {
  total: number;
  overdue: number;
  dueToday: number;
  dueThisWeek: number;
}

export interface RecentSafeguardingActivity {
  id: string;
  action: string;
  meta: string;
  timestamp: string;
  icon: string;
  iconClass: string;
}

export interface PolicyChecklistItem {
  id: string;
  title: string;
  status: 'Up to date' | 'Update due' | 'Review due';
  statusType: 'success' | 'warning';
}

export interface CreateSafeguardingCaseFormData {
  title: string;
  institution: string;
  category: SafeguardingCaseCategory;
  severity: SafeguardingSeverity;
  incidentDateTime: string;
  reportedBy: string;
  referenceId?: string;
  learnerName?: string;
  staffName?: string;
  additionalUsers?: string;
  gradeClass?: string;
  parentLinked?: string;
  description: string;
  locationContext: string;
  tags?: string[];
  sensitiveEvidence: boolean;
  containsLearnerInfo: boolean;
  requiresRestrictedAccess: boolean;
  assignedReviewer: string;
  escalationStatus: string;
  responseDeadline: string;
  notifySchoolAdmin: boolean;
  notifyComplianceOfficer: boolean;
  restrictUserAccess: boolean;
  parentConsentStatus: string;
  policyAcknowledged: string;
  dataPrivacyReviewRequired: string;
  externalReportingRequired: boolean;
  internalNotes?: string;
  relatedCase?: string;
  additionalNotes?: string;
}
