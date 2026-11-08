export interface ResourceMetric {
  id: string;
  label: string;
  value: string | number;
  subtitle: string;
  icon: string;
  tone: 'purple' | 'orange' | 'green' | 'blue' | 'purple-dark';
  subtitleTone?: 'green' | 'orange' | 'blue' | 'default';
}

export interface ResourceFilterValues {
  className: string;
  subject: string;
  resourceType: string;
  topic: string;
  searchQuery: string;
}

export type ResourceFormat = 'PDF' | 'XLSX' | 'PPTX' | 'MP4' | 'DOCX';
export type ResourceTypeLabel =
  | 'PDF Note'
  | 'Worksheet'
  | 'Slides'
  | 'PDF'
  | 'Video'
  | 'Answer Guide';

export interface ResourceItem {
  id: string;
  title: string;
  format: ResourceFormat;
  size: string;
  className: string;
  subject: string;
  topic: string;
  typeLabel: ResourceTypeLabel;
  dateAdded: string;
  downloadsCount?: number;
}

export interface RecentUploadItem {
  id: string;
  title: string;
  date: string;
  className: string;
  format: ResourceFormat;
}

export interface MostUsedResourceItem {
  id: string;
  title: string;
  className: string;
  subject: string;
  format: ResourceFormat;
  usageCount: number;
}

export interface ResourceQuickAction {
  id: string;
  label: string;
  icon: string;
  colorClass: string;
}

export const TEACHER_RESOURCES_METRICS: ResourceMetric[] = [
  {
    id: 'total-resources',
    label: 'Total Resources',
    value: 248,
    subtitle: 'All time',
    icon: 'folder',
    tone: 'purple',
  },
  {
    id: 'lesson-notes',
    label: 'Lesson Notes',
    value: 64,
    subtitle: '25.8% of total',
    icon: 'description',
    tone: 'orange',
    subtitleTone: 'orange',
  },
  {
    id: 'worksheets',
    label: 'Worksheets',
    value: 78,
    subtitle: '31.5% of total',
    icon: 'assignment',
    tone: 'green',
    subtitleTone: 'green',
  },
  {
    id: 'video-lessons',
    label: 'Video Lessons',
    value: 32,
    subtitle: '12.9% of total',
    icon: 'play_circle',
    tone: 'purple-dark',
    subtitleTone: 'default',
  },
  {
    id: 'shared-this-week',
    label: 'Shared This Week',
    value: 14,
    subtitle: '+27% vs last week',
    icon: 'share',
    tone: 'blue',
    subtitleTone: 'blue',
  },
];

export const TEACHER_RESOURCES_LIST: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Whole Numbers Lesson Note',
    format: 'PDF',
    size: '2.4 MB',
    className: 'JSS 1A',
    subject: 'Mathematics',
    topic: 'Whole Numbers',
    typeLabel: 'PDF Note',
    dateAdded: 'May 14, 2025',
    downloadsCount: 32,
  },
  {
    id: 'res-2',
    title: 'Fractions Worksheet Set 1',
    format: 'XLSX',
    size: '1.6 MB',
    className: 'JSS 1B',
    subject: 'Mathematics',
    topic: 'Fractions',
    typeLabel: 'Worksheet',
    dateAdded: 'May 12, 2025',
    downloadsCount: 28,
  },
  {
    id: 'res-3',
    title: 'Parts of Speech Slides',
    format: 'PPTX',
    size: '5.1 MB',
    className: 'JSS 1A',
    subject: 'English Language',
    topic: 'Parts of Speech',
    typeLabel: 'Slides',
    dateAdded: 'May 11, 2025',
    downloadsCount: 24,
  },
  {
    id: 'res-4',
    title: 'Reading Comprehension Passage',
    format: 'PDF',
    size: '1.8 MB',
    className: 'JSS 1A',
    subject: 'English Language',
    topic: 'Comprehension',
    typeLabel: 'PDF',
    dateAdded: 'May 10, 2025',
    downloadsCount: 21,
  },
  {
    id: 'res-5',
    title: 'Civic Education Video: Rights & Duties',
    format: 'MP4',
    size: '48.7 MB',
    className: 'JSS 1C',
    subject: 'Civic Education',
    topic: 'Rights & Duties',
    typeLabel: 'Video',
    dateAdded: 'May 8, 2025',
    downloadsCount: 19,
  },
  {
    id: 'res-6',
    title: 'Marking Guide: Whole Numbers Quiz',
    format: 'PDF',
    size: '912 KB',
    className: 'JSS 1A',
    subject: 'Mathematics',
    topic: 'Whole Numbers',
    typeLabel: 'Answer Guide',
    dateAdded: 'May 7, 2025',
    downloadsCount: 18,
  },
];

export const RECENT_UPLOADS_LIST: RecentUploadItem[] = [
  {
    id: 'up-1',
    title: 'Whole Numbers Lesson Note',
    date: 'May 14, 2025',
    className: 'JSS 1A',
    format: 'PDF',
  },
  {
    id: 'up-2',
    title: 'Fractions Worksheet Set 1',
    date: 'May 12, 2025',
    className: 'JSS 1B',
    format: 'XLSX',
  },
  {
    id: 'up-3',
    title: 'Parts of Speech Slides',
    date: 'May 11, 2025',
    className: 'JSS 1A',
    format: 'PPTX',
  },
  {
    id: 'up-4',
    title: 'Reading Comprehension Passage',
    date: 'May 10, 2025',
    className: 'JSS 1A',
    format: 'PDF',
  },
  {
    id: 'up-5',
    title: 'Civic Ed. Video: Rights & Duties',
    date: 'May 8, 2025',
    className: 'JSS 1C',
    format: 'MP4',
  },
];

export const MOST_USED_RESOURCES_LIST: MostUsedResourceItem[] = [
  {
    id: 'most-1',
    title: 'Whole Numbers Lesson Note',
    className: 'JSS 1A',
    subject: 'Mathematics',
    format: 'PDF',
    usageCount: 32,
  },
  {
    id: 'most-2',
    title: 'Fractions Worksheet Set 1',
    className: 'JSS 1B',
    subject: 'Mathematics',
    format: 'XLSX',
    usageCount: 28,
  },
  {
    id: 'most-3',
    title: 'Parts of Speech Slides',
    className: 'JSS 1A',
    subject: 'English Language',
    format: 'PPTX',
    usageCount: 24,
  },
  {
    id: 'most-4',
    title: 'Reading Comprehension Passage',
    className: 'JSS 1A',
    subject: 'English Language',
    format: 'PDF',
    usageCount: 21,
  },
  {
    id: 'most-5',
    title: 'Marking Guide: W. Numbers Quiz',
    className: 'JSS 1A',
    subject: 'Mathematics',
    format: 'PDF',
    usageCount: 18,
  },
];

export const RESOURCES_QUICK_ACTIONS: ResourceQuickAction[] = [
  {
    id: 'upload-worksheet',
    label: 'Upload Worksheet',
    icon: 'assignment',
    colorClass: 'icon-green',
  },
  {
    id: 'add-video-lesson',
    label: 'Add Video Lesson',
    icon: 'play_circle',
    colorClass: 'icon-purple',
  },
  {
    id: 'share-with-class',
    label: 'Share with Class',
    icon: 'share',
    colorClass: 'icon-blue',
  },
  {
    id: 'create-resource-folder',
    label: 'Create Resource Folder',
    icon: 'folder',
    colorClass: 'icon-purple-dark',
  },
];

export const UPLOAD_PAGE_QUICK_ACTIONS: ResourceQuickAction[] = [
  {
    id: 'create-delivery-pack',
    label: 'Create Delivery Pack',
    icon: 'folder',
    colorClass: 'icon-purple',
  },
  {
    id: 'add-video-lesson',
    label: 'Add Video Lesson',
    icon: 'play_circle',
    colorClass: 'icon-purple',
  },
  {
    id: 'create-worksheet',
    label: 'Create Worksheet',
    icon: 'assignment',
    colorClass: 'icon-green',
  },
  {
    id: 'go-to-library',
    label: 'Go to Resources Library',
    icon: 'folder_open',
    colorClass: 'icon-purple-dark',
  },
];

export const RESOURCE_UPLOAD_GUIDELINES = [
  'Use clear and descriptive titles.',
  'Ensure content is accurate and curriculum-aligned.',
  'Upload high-quality files for better learning.',
  'Respect copyright and attribution.',
  'Keep file sizes under 100 MB.',
];

export const RECENT_UPLOAD_TIPS = [
  'Use Lesson Notes for structured explanations.',
  'Worksheets help reinforce practice.',
  'Slides are great for presentations.',
  'Videos should be concise and engaging.',
  'Answer Guides support self-assessment.',
];
