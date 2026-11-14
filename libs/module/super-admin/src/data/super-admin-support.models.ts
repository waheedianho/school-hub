export type TicketPriority = 'High' | 'Medium' | 'Low' | 'Critical';

export type TicketStatus =
  | 'Open'
  | 'In Progress'
  | 'Awaiting School'
  | 'Escalated'
  | 'Resolved'
  | 'Closed';

export type TicketIssueType =
  | 'Login Problem'
  | 'Onboarding Support'
  | 'Billing Issue'
  | 'Content Upload Error'
  | 'Report Generation Bug'
  | 'Role Permission Issue'
  | 'Live Class Failure'
  | 'Billing Invoice Error'
  | 'Feature Request'
  | 'Other';

export type SupportTab =
  | 'All Tickets'
  | 'Escalations'
  | 'Onboarding'
  | 'Billing Issues'
  | 'Bugs & Technical'
  | 'Feature Requests'
  | 'Resolved';

export interface SupportPerson {
  name: string;
  role: string;
  avatar?: string;
}

export interface SupportAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  uploadedBy: string;
  uploadedAt: string;
  downloadUrl?: string;
}

export interface TimelineEntry {
  id: string;
  type: 'message' | 'internal_note' | 'status_change';
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  isInternal?: boolean;
}

export interface ResolutionChecklistItem {
  label: string;
  completed: boolean;
}

export interface SchoolContactInfo {
  name: string;
  role: string;
  schoolName: string;
  email: string;
  phone: string;
  location: string;
}

export interface SupportTicket {
  id: string;
  school: string;
  title: string;
  issueType: TicketIssueType;
  priority: TicketPriority;
  raisedBy: SupportPerson;
  assignedTo: SupportPerson;
  status: TicketStatus;
  lastUpdated: string;
  lastUpdatedTime: string;
  slaStatus: string;
  slaLevel: 'on-track' | 'urgent' | 'breached' | 'na';
  createdAt: string;
  summary?: string;
  affectedUsers?: string;
  impact?: string;
  occurrence?: string;
  probableCause?: string;
  affectedModule?: string;
  environment?: string;
  affectedRoles?: string[];
  severityTechnical?: string;
  schoolContact?: SchoolContactInfo;
  attachments?: SupportAttachment[];
  timeline?: TimelineEntry[];
  resolutionChecklist?: ResolutionChecklistItem[];
}

export interface SupportMetric {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
  subtext: string;
  icon: string;
  colorClass: string;
}

export interface SupportBottomMetric {
  id: string;
  label: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
  subtext?: string;
  type: 'sparkline' | 'status';
  sparklinePoints?: string;
  sparklineColor?: string;
  statusBadge?: string;
  updatedTime?: string;
}

export interface SupportHealthCategory {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface SupportUrgentEscalation {
  id: string;
  ticketId: string;
  title: string;
  timestamp: string;
  priority: TicketPriority;
}

export interface SLAQueueBreakdown {
  overdue: number;
  due1to4: number;
  due4to12: number;
  onTrack: number;
}

export interface RecentSupportActivity {
  id: string;
  title: string;
  meta?: string;
  timestamp: string;
  icon: string;
  iconClass: string;
}

export interface CreateTicketFormData {
  title: string;
  school: string;
  issueType: TicketIssueType;
  priority: TicketPriority;
  description: string;
  affectedUsers?: string;
  assignedAgent?: string;
  raisedBy?: string;
}
