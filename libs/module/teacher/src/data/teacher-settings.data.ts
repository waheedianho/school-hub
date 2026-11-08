export interface TeacherProfileInfo {
  name: string;
  email: string;
  phone: string;
  staffId: string;
  specialty: string;
  avatar: string;
}

export interface NotificationPreferences {
  assignmentAlerts: boolean;
  submissionReviews: boolean;
  liveClassReminders: boolean;
  messageNotifications: boolean;
  reportGenerationAlerts: boolean;
  parentCommunication: boolean;
}

export interface GradingPreferences {
  gradingScale: string;
  autoSyncScores: boolean;
  requireConfirmation: boolean;
  showAuditTrail: boolean;
  rubricPreference: string;
  lateSubmissionHandling: string;
}

export interface AccountSecurityInfo {
  twoFactorEnabled: boolean;
  lastLogin: string;
  activeSession: string;
}

export interface ClassCommunicationPreferences {
  defaultLandingPage: string;
  announcementVisibility: string;
  parentCopyDefault: string;
  messageSignature: string;
}

export interface RecentSettingChange {
  id: string;
  title: string;
  timestamp: string;
}

export interface SupportHelpItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  actionUrl?: string;
}

export const INITIAL_TEACHER_PROFILE: TeacherProfileInfo = {
  name: 'Mr. Tunde A.',
  email: 'tunde.a@learno.com',
  phone: '+234 801 234 5678',
  staffId: 'LRN-TE-1024',
  specialty: 'English Language',
  avatar: 'assets/images/users/user1.jpg',
};

export const INITIAL_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  assignmentAlerts: true,
  submissionReviews: true,
  liveClassReminders: true,
  messageNotifications: true,
  reportGenerationAlerts: true,
  parentCommunication: true,
};

export const INITIAL_GRADING_PREFERENCES: GradingPreferences = {
  gradingScale: 'Percentage (%)',
  autoSyncScores: true,
  requireConfirmation: true,
  showAuditTrail: true,
  rubricPreference: 'Use Rubrics (Recommended)',
  lateSubmissionHandling: 'Deduct points automatically',
};

export const INITIAL_ACCOUNT_SECURITY: AccountSecurityInfo = {
  twoFactorEnabled: true,
  lastLogin: 'May 22, 2024, 10:12 AM',
  activeSession: 'Chrome on Windows • Lagos, NG',
};

export const INITIAL_CLASS_COMMUNICATION_PREFERENCES: ClassCommunicationPreferences =
  {
    defaultLandingPage: 'Class Dashboard',
    announcementVisibility: 'Visible to All Classes',
    parentCopyDefault: 'Include by Default',
    messageSignature: `Best regards,
Mr. Tunde A.
English Language Tutor`,
  };

export const SETTINGS_TIPS: string[] = [
  'Keep your profile up to date for accurate communication.',
  'Enable notifications to stay informed about important activities.',
  'Use grading preferences to maintain consistency across classes.',
  'Review your security settings regularly to protect your account.',
];

export const RECENT_SETTINGS_CHANGES: RecentSettingChange[] = [
  {
    id: 'ch-1',
    title: 'Notification preference updated',
    timestamp: 'May 22, 2024 • 9:15 AM',
  },
  {
    id: 'ch-2',
    title: 'Two-factor authentication enabled',
    timestamp: 'May 21, 2024 • 4:32 PM',
  },
  {
    id: 'ch-3',
    title: 'Password changed',
    timestamp: 'May 20, 2024 • 11:08 AM',
  },
];

export const SUPPORT_HELP_ITEMS: SupportHelpItem[] = [
  {
    id: 'teacher-guide',
    title: 'Teacher Guide',
    subtitle: 'Step-by-step guides and best practices',
    icon: 'menu_book',
  },
  {
    id: 'help-center',
    title: 'Help Center',
    subtitle: 'Browse articles and FAQs',
    icon: 'help',
  },
  {
    id: 'contact-support',
    title: 'Contact Support',
    subtitle: 'Get help from our support team',
    icon: 'mail',
  },
  {
    id: 'report-issue',
    title: 'Report an Issue',
    subtitle: 'Submit a bug or request an improvement',
    icon: 'warning',
  },
];
