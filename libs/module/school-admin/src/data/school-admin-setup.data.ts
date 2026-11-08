import {
  AcademicStructure,
  AssessmentReportingSettings,
  CommunicationSafeguardingSettings,
  RolePermissionRow,
  SchoolProfile,
  SetupChecklistItem,
  SetupQuickAction,
} from './school-admin.models';

export const SCHOOL_PROFILE_DATA: SchoolProfile = {
  name: 'Greenfield Secondary School',
  schoolType: 'Secondary School',
  address: '12 Knowledge Avenue, Gbagada, Lagos State, Nigeria',
  phone: '+234 805 123 4567',
  email: 'info@greenfield.edu.ng',
  principalName: 'Mr. Adekunle Oladipo',
  logoUrl: 'images/admin.png',
  primaryColor: '#6366f1',
  setupCompletionPercentage: 87,
  activeSession: '2024/2025 Academic Session',
  activeTerm: 'Third Term',
  totalClasses: 18,
  totalTeachers: 32,
  gradingScale: 'A - F (5.0 Scale)',
};

export const ACADEMIC_STRUCTURE_DATA: AcademicStructure = {
  session: '2024/2025 Academic Session',
  term: 'Third Term',
  namingConvention: 'JSS 1 - SS 3 (e.g. JSS 1A)',
  classArms: 2,
  startDate: '2024-09-16',
  endDate: '2025-07-18',
  primaryCount: 6,
  jssCount: 6,
  ssCount: 6,
};

export const ASSESSMENT_SETTINGS_DATA: AssessmentReportingSettings = {
  gradingScale: 'A - F (5.0 Scale)',
  classworkWeight: 30,
  assessmentsWeight: 40,
  examsWeight: 30,
  reportCardFormat: 'Standard (With GPA)',
  parentReportFrequency: 'End of Term',
  scoreApprovalWorkflow: true,
};

export const ROLE_PERMISSIONS_DATA: RolePermissionRow[] = [
  {
    role: 'School Admin',
    contentApproval: true,
    gradeApproval: true,
    communicationVisibility: true,
    auditLogs: true,
  },
  {
    role: 'Academic Lead',
    contentApproval: true,
    gradeApproval: true,
    communicationVisibility: true,
    auditLogs: true,
  },
  {
    role: 'Teacher',
    contentApproval: true,
    gradeApproval: true,
    communicationVisibility: false,
    auditLogs: false,
  },
  {
    role: 'Tutor',
    contentApproval: false,
    gradeApproval: false,
    communicationVisibility: false,
    auditLogs: false,
  },
];

export const COMMUNICATION_SAFEGUARDING_DATA: CommunicationSafeguardingSettings =
  {
    parentCommunicationPreference: 'Email & SMS',
    announcementEmail: true,
    announcementSms: true,
    announcementApp: true,
    learnerCommunicationLogging: true,
    safeguardingContact: 'safeguarding@greenfield.edu.ng',
    parentalConsentRequired: true,
    mediaConsentRequired: true,
  };

export const SETUP_CHECKLIST_DATA: SetupChecklistItem[] = [
  {
    id: 'chk-1',
    label: 'School profile completed',
    status: 'Completed',
  },
  {
    id: 'chk-2',
    label: 'Academic session set',
    status: 'Completed',
  },
  {
    id: 'chk-3',
    label: 'Classes created',
    status: 'Completed',
  },
  {
    id: 'chk-4',
    label: 'Teachers assigned',
    status: 'Completed',
  },
  {
    id: 'chk-5',
    label: 'Subjects mapped',
    status: 'Completed',
  },
  {
    id: 'chk-6',
    label: 'Grading policy confirmed',
    status: 'Completed',
  },
  {
    id: 'chk-7',
    label: 'Safeguarding rules enabled',
    status: 'In Progress',
  },
];

export const SETUP_QUICK_ACTIONS_DATA: SetupQuickAction[] = [
  {
    id: 'import-data',
    title: 'Import School Data',
    description: 'Import students, teachers, classes & subjects',
    icon: 'cloud_upload',
    actionText: 'Import School Data',
  },
  {
    id: 'download-template',
    title: 'Download Setup Template',
    description: 'Get template for bulk data import',
    icon: 'description',
    actionText: 'Download Setup Template',
  },
  {
    id: 'view-audit',
    title: 'View Audit Trail',
    description: 'Review all setup changes and history',
    icon: 'verified_user',
    actionText: 'View Audit Trail',
  },
];
