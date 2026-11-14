export type ResourceType =
  | 'Lesson Notes'
  | 'Videos'
  | 'Worksheets'
  | 'Assessments'
  | 'Question Banks'
  | 'Portfolio Tasks'
  | 'Templates'
  | 'Policy Documents'
  | 'Other';

export type ResourceStatus =
  | 'Approved'
  | 'Pending Review'
  | 'Rejected'
  | 'Expired'
  | 'Draft';

export type ResourceCategoryTab =
  | 'All Resources'
  | 'Lesson Notes'
  | 'Videos'
  | 'Worksheets'
  | 'Assessments'
  | 'Question Banks'
  | 'Portfolio Tasks'
  | 'Templates'
  | 'Policy Documents';

export type FileFormat =
  | 'PDF'
  | 'DOCX'
  | 'MP4'
  | 'ZIP'
  | 'PPTX'
  | 'JPG'
  | 'PNG';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: ResourceType;
  fileFormat: FileFormat;
  fileSize: string;
  fileUrl?: string;
  pagesCount?: number;
  linkedPack: string;
  linkedTopic: string;
  classLevel: string;
  subject: string;
  termWeek?: string;
  source: string;
  owner: string;
  status: ResourceStatus;
  lastUpdated: string;
  lastUpdatedTime: string;
  usageCount: number;
  downloadsCount?: number;
  audience?: string[];
  visibility?: 'All Schools' | 'Selected Schools';
  downloadPermission?: string;
  lowDataVersion?: boolean;
  language?: string;
  estimatedStudyTime?: string;
  version?: string;
  tags?: string[];
  author?: string;
  license?: string;
  publishDate?: string;
  reviewNotes?: string;
}

export interface ResourceMetric {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
  subtext: string;
  icon: string;
  colorClass: string;
}

export interface ResourceBottomMetric {
  id: string;
  label: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
  subtext?: string;
  sparklinePoints?: string;
  sparklineColor?: string;
  type?: 'sparkline' | 'storage';
  storageUsed?: string;
  storageLimit?: string;
  storagePercentage?: number;
}

export interface ResourceHealthCategory {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ApprovalQueueItem {
  id: string;
  title: string;
  category: string;
  timestamp: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface MostUsedResourceType {
  type: string;
  count: number;
  percentage: number;
}

export interface RecentUploadActivity {
  id: string;
  fileName: string;
  fileFormat: string;
  uploadedBy: string;
  timeAgo: string;
  icon: string;
  iconClass: string;
}

export interface CreateResourceFormData {
  title: string;
  description: string;
  resourceType: ResourceType;
  linkedPack: string;
  linkedTopic: string;
  linkedSubject: string;
  classLevel: string;
  termWeek?: string;
  tags: string[];
  fileName?: string;
  fileSize?: string;
  fileFormat?: FileFormat;
  visibility: 'All Schools' | 'Selected Schools';
  audience: string[];
  downloadPermission: string;
  lowDataVersion: boolean;
  language: string;
  estimatedStudyTime: string;
  version: string;
  author: string;
  license: string;
  approvalStatus: ResourceStatus;
  reviewNotes?: string;
  publishDate?: string;
}
