export interface LiveClassMetric {
  id: string;
  label: string;
  value: string | number;
  subtitle: string;
  icon: string;
  tone: 'purple' | 'blue' | 'green' | 'orange' | 'indigo';
}

export type LiveClassStatus =
  | 'Live Now'
  | 'Upcoming'
  | 'Completed'
  | 'Needs Follow-up';

export interface ScheduledLiveClass {
  id: string;
  className: string;
  subject: string;
  topic: string;
  date: string;
  time: string;
  meetingLink: string;
  attendancePresent?: number;
  attendanceTotal?: number;
  attendanceRate?: number;
  recordingAvailable: boolean;
  status: LiveClassStatus;
}

export interface LiveClassesFilterValues {
  term: string;
  className: string;
  subject: string;
  status: string;
  searchQuery: string;
}

export interface AttendanceSnapshotData {
  averageRate: number;
  presentCount: number;
  presentRate: number;
  absentCount: number;
  absentRate: number;
  lateCount: number;
  lateRate: number;
  totalSessions: number;
  periodLabel: string;
}

export interface ClassMaterialItem {
  id: string;
  title: string;
  type: 'slide' | 'notes' | 'recording' | 'worksheet';
  className: string;
  uploadTime: string;
}

export interface TodayLiveClassScheduleItem {
  id: string;
  time: string;
  className: string;
  subject: string;
  topic: string;
  attendanceOrTimeText: string;
  isLearnerCount?: boolean;
  statusText?: string;
  isLiveNow: boolean;
  accentColor: 'green' | 'blue';
}

export interface LiveClassQuickAction {
  id: string;
  label: string;
  icon: string;
}

export interface SessionParticipant {
  id: string;
  name: string;
  role: 'tutor' | 'learner';
  isCurrentUser?: boolean;
  avatarText: string;
  avatarColor: string;
  micOn: boolean;
  cameraOn?: boolean;
  handRaised?: boolean;
}

export interface SessionChatMessage {
  id: string;
  senderName: string;
  role: 'tutor' | 'learner';
  time: string;
  message: string;
  avatarText: string;
  avatarColor: string;
  isSelf?: boolean;
}

export interface SessionMaterial {
  id: string;
  name: string;
  format: 'PDF' | 'DOCX' | 'PPTX';
  badgeClass: string;
}

export interface SessionActivity {
  id: string;
  title: string;
  description: string;
  buttonText: string;
}

export interface LiveClassSessionDetails {
  id: string;
  className: string;
  subject: string;
  statusBadge: string;
  topic: string;
  lessonObjective: string;
  scheduledTime: string;
  durationText: string;
  onlineLearnersCount: number;
  lessonPlanSteps: { step: string; duration: string }[];
  keyPoints: string[];
  todayActivity: SessionActivity;
  homework: SessionActivity;
  attachedMaterials: SessionMaterial[];
}

export const TEACHER_LIVE_CLASSES_METRICS: LiveClassMetric[] = [
  {
    id: 'total-classes',
    label: 'Total Live Classes',
    value: 56,
    subtitle: 'Across all classes',
    icon: 'videocam',
    tone: 'purple',
  },
  {
    id: 'classes-week',
    label: 'Classes This Week',
    value: 12,
    subtitle: '21% of total',
    icon: 'calendar_month',
    tone: 'blue',
  },
  {
    id: 'upcoming-today',
    label: 'Upcoming Today',
    value: 3,
    subtitle: 'Next class in 15 mins',
    icon: 'schedule',
    tone: 'green',
  },
  {
    id: 'completed-week',
    label: 'Completed This Week',
    value: 7,
    subtitle: '58% of weekly classes',
    icon: 'check_circle',
    tone: 'orange',
  },
  {
    id: 'attendance-rate',
    label: 'Attendance Rate',
    value: '87%',
    subtitle: 'Average this week',
    icon: 'groups',
    tone: 'indigo',
  },
];

export const SCHEDULED_LIVE_CLASSES: ScheduledLiveClass[] = [
  {
    id: 'live-class-1',
    className: 'JSS 1A',
    subject: 'English Language',
    topic: 'Parts of Speech',
    date: 'Today 2 May 2026',
    time: '9:30 AM - 10:30 AM',
    meetingLink: '/teacher/live-classes/session',
    attendancePresent: 24,
    attendanceTotal: 28,
    attendanceRate: 86,
    recordingAvailable: false,
    status: 'Live Now',
  },
  {
    id: 'live-class-2',
    className: 'JSS 1B',
    subject: 'English Language',
    topic: 'Sentence Structure',
    date: 'Today 2 May 2026',
    time: '11:00 AM - 12:00 PM',
    meetingLink: '/teacher/live-classes/session',
    recordingAvailable: false,
    status: 'Upcoming',
  },
  {
    id: 'live-class-3',
    className: 'JSS 2A',
    subject: 'English Language',
    topic: 'Comprehension Skills',
    date: 'Today 2 May 2026',
    time: '2:00 PM - 3:00 PM',
    meetingLink: '/teacher/live-classes/session',
    recordingAvailable: false,
    status: 'Upcoming',
  },
  {
    id: 'live-class-4',
    className: 'JSS 1A',
    subject: 'English Language',
    topic: 'Guided Reading',
    date: 'Yesterday 1 May 2026',
    time: '9:30 AM - 10:30 AM',
    meetingLink: '/teacher/live-classes/session',
    attendancePresent: 23,
    attendanceTotal: 28,
    attendanceRate: 82,
    recordingAvailable: true,
    status: 'Completed',
  },
  {
    id: 'live-class-5',
    className: 'JSS 1B',
    subject: 'English Language',
    topic: 'Vocabulary Building',
    date: 'Yesterday 1 May 2026',
    time: '11:00 AM - 12:00 PM',
    meetingLink: '/teacher/live-classes/session',
    attendancePresent: 18,
    attendanceTotal: 28,
    attendanceRate: 64,
    recordingAvailable: true,
    status: 'Needs Follow-up',
  },
  {
    id: 'live-class-6',
    className: 'JSS 2A',
    subject: 'English Language',
    topic: 'Essay Writing',
    date: '30 Apr 2026',
    time: '2:00 PM - 3:00 PM',
    meetingLink: '/teacher/live-classes/session',
    attendancePresent: 25,
    attendanceTotal: 29,
    attendanceRate: 86,
    recordingAvailable: true,
    status: 'Completed',
  },
];

export const ATTENDANCE_SNAPSHOT_DATA: AttendanceSnapshotData = {
  averageRate: 87,
  presentCount: 157,
  presentRate: 87,
  absentCount: 20,
  absentRate: 11,
  lateCount: 3,
  lateRate: 2,
  totalSessions: 12,
  periodLabel: 'This Week',
};

export const CLASS_MATERIALS_RECORDINGS: ClassMaterialItem[] = [
  {
    id: 'mat-1',
    title: 'Parts of Speech - Slide Deck',
    type: 'slide',
    className: 'JSS 1A',
    uploadTime: 'Uploaded today, 9:15 AM',
  },
  {
    id: 'mat-2',
    title: 'Sentence Structure - Class Notes',
    type: 'notes',
    className: 'JSS 1B',
    uploadTime: 'Uploaded today, 10:45 AM',
  },
  {
    id: 'mat-3',
    title: 'Vocabulary Building - Recording',
    type: 'recording',
    className: 'JSS 1B',
    uploadTime: 'Uploaded yesterday, 12:15 PM',
  },
  {
    id: 'mat-4',
    title: 'Comprehension Skills - Worksheet',
    type: 'worksheet',
    className: 'JSS 2A',
    uploadTime: 'Shared yesterday, 2:05 PM',
  },
];

export const TODAY_LIVE_CLASS_SCHEDULE: TodayLiveClassScheduleItem[] = [
  {
    id: 'today-schedule-1',
    time: '9:30 AM - 10:30 AM',
    className: 'JSS 1A',
    subject: 'English Language',
    topic: 'Parts of Speech',
    attendanceOrTimeText: '24 / 28 learners',
    isLearnerCount: true,
    statusText: 'LIVE NOW',
    isLiveNow: true,
    accentColor: 'green',
  },
  {
    id: 'today-schedule-2',
    time: '11:00 AM - 12:00 PM',
    className: 'JSS 1B',
    subject: 'English Language',
    topic: 'Sentence Structure',
    attendanceOrTimeText: 'Starts in 45 mins',
    isLearnerCount: false,
    isLiveNow: false,
    accentColor: 'blue',
  },
  {
    id: 'today-schedule-3',
    time: '2:00 PM - 3:00 PM',
    className: 'JSS 2A',
    subject: 'English Language',
    topic: 'Comprehension Skills',
    attendanceOrTimeText: 'Starts in 3h 45m',
    isLearnerCount: false,
    isLiveNow: false,
    accentColor: 'blue',
  },
];

export const LIVE_CLASSES_QUICK_ACTIONS: LiveClassQuickAction[] = [
  {
    id: 'schedule-live-class',
    label: 'Schedule Live Class',
    icon: 'calendar_today',
  },
  {
    id: 'start-class',
    label: 'Start Class',
    icon: 'videocam',
  },
  {
    id: 'upload-recording',
    label: 'Upload Recording',
    icon: 'cloud_upload',
  },
  {
    id: 'share-class-notes',
    label: 'Share Class Notes',
    icon: 'description',
  },
  {
    id: 'send-reminder',
    label: 'Send Reminder',
    icon: 'send',
  },
];

export const LIVE_CLASS_SESSION_DETAILS: LiveClassSessionDetails = {
  id: 'session-jss-1b',
  className: 'JSS 1B',
  subject: 'English Language',
  statusBadge: 'Ongoing',
  topic: 'Topic: Sentence Types',
  lessonObjective:
    'Lesson Objective: By the end of the lesson, learners should be able to identify and use simple, compound and complex sentences correctly.',
  scheduledTime: '6:00 PM - 7:00 PM',
  durationText: '43:21 / 60 min',
  onlineLearnersCount: 25,
  lessonPlanSteps: [
    { step: 'Review of previous lesson', duration: '5 mins' },
    { step: 'Explanation: Types of Sentences', duration: '20 mins' },
    { step: 'Examples and class practice', duration: '20 mins' },
    { step: 'Guided activity', duration: '10 mins' },
    { step: 'Summary and assignment', duration: '5 mins' },
  ],
  keyPoints: [
    'A sentence expresses a complete thought.',
    'Simple sentences have one independent clause.',
    'Compound sentences join two independent clauses.',
    'Complex sentences have a dependent clause.',
    'Punctuation is important in sentence construction.',
  ],
  todayActivity: {
    id: 'act-1',
    title: "Today's Activity",
    description: 'Identify the type of sentence in the given examples.',
    buttonText: 'View Activity Details',
  },
  homework: {
    id: 'hw-1',
    title: 'Homework',
    description:
      'Write 5 sentences (one of each type) about your daily routine.',
    buttonText: 'View Homework',
  },
  attachedMaterials: [
    {
      id: 'att-1',
      name: 'Sentence Types Notes.pdf',
      format: 'PDF',
      badgeClass: 'badge-pdf',
    },
    {
      id: 'att-2',
      name: 'Worksheet - Sentence Types.docx',
      format: 'DOCX',
      badgeClass: 'badge-docx',
    },
    {
      id: 'att-3',
      name: 'Slide - Sentence Types.pptx',
      format: 'PPTX',
      badgeClass: 'badge-pptx',
    },
  ],
};

export const SESSION_PARTICIPANTS: SessionParticipant[] = [
  {
    id: 'part-tutor',
    name: 'Tunde A. (You)',
    role: 'tutor',
    isCurrentUser: true,
    avatarText: 'TA',
    avatarColor: '#4f46e5',
    micOn: true,
    cameraOn: true,
  },
  {
    id: 'part-1',
    name: 'Maryam Ibrahim',
    role: 'learner',
    avatarText: 'M',
    avatarColor: '#ec4899',
    micOn: true,
    cameraOn: false,
  },
  {
    id: 'part-2',
    name: 'Chinedu Okafor',
    role: 'learner',
    avatarText: 'C',
    avatarColor: '#38bdf8',
    micOn: false,
    cameraOn: false,
  },
  {
    id: 'part-3',
    name: 'Amaka Nwosu',
    role: 'learner',
    avatarText: 'A',
    avatarColor: '#10b981',
    micOn: true,
    cameraOn: false,
  },
  {
    id: 'part-4',
    name: 'Tolu Adeyemi',
    role: 'learner',
    avatarText: 'T',
    avatarColor: '#f59e0b',
    micOn: false,
    cameraOn: false,
  },
];

export const SESSION_CHAT_MESSAGES: SessionChatMessage[] = [
  {
    id: 'chat-1',
    senderName: 'Tunde (Tutor)',
    role: 'tutor',
    time: '6:05 PM',
    message:
      'Good evening everyone! Let’s get started. Please be ready with your notebooks.',
    avatarText: 'TA',
    avatarColor: '#4f46e5',
  },
  {
    id: 'chat-2',
    senderName: 'Maryam',
    role: 'learner',
    time: '6:06 PM',
    message: 'Good evening sir!',
    avatarText: 'M',
    avatarColor: '#ec4899',
  },
  {
    id: 'chat-3',
    senderName: 'Chinedu',
    role: 'learner',
    time: '6:06 PM',
    message: 'Ready sir.',
    avatarText: 'C',
    avatarColor: '#38bdf8',
  },
  {
    id: 'chat-4',
    senderName: 'Tunde (Tutor)',
    role: 'tutor',
    time: '6:06 PM',
    message: 'Great! Today we are learning about sentence types.',
    avatarText: 'TA',
    avatarColor: '#4f46e5',
  },
];
