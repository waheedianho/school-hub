export interface AssignmentMetric {
  id: string;
  label: string;
  value: number;
  subtitle: string;
  icon: string;
  tone: 'purple' | 'blue' | 'orange' | 'red' | 'green';
}

export type SubmissionStatus = 'Pending Review' | 'Needs Scoring' | 'Approved';

export type ScoringMethodType =
  | 'Teacher Review'
  | 'Rubric Review'
  | 'Auto-Scored';

export interface PendingSubmissionItem {
  id: string;
  learnerName: string;
  learnerId: string;
  avatarText: string;
  avatarColor: string;
  className: string;
  submissionType: string;
  topic: string;
  submittedAt: string;
  scoringMethod: ScoringMethodType;
  status: SubmissionStatus;
  actionLabel: 'Review Now' | 'Grade Now' | 'View Result';
  actionStyle: 'outline' | 'solid-purple' | 'outline-blue';
}

export interface AssignmentsFilterValues {
  term: string;
  className: string;
  subject: string;
  submissionType: string;
  status: string;
  searchQuery: string;
}

export interface SubmissionBreakdownItem {
  type: string;
  count: number;
  percentage: number;
  color: string;
}

export interface RecentFeedbackItem {
  id: string;
  learnerName: string;
  topic: string;
  timestamp: string;
  comment: string;
  avatarText: string;
  avatarColor: string;
}

export interface CommonIssueItem {
  id: string;
  title: string;
  description: string;
  iconText: string;
  badgeTone: 'yellow' | 'green' | 'blue';
}

export interface ReviewQueueItem {
  id: string;
  label: string;
  count: number;
  icon: string;
}

export interface AssignmentQuickAction {
  id: string;
  label: string;
  icon: string;
}

export interface RubricCriteriaItem {
  id: string;
  criteria: string;
  description: string;
  maxMarks: number;
  score: number;
}

export interface SubmissionReviewDetail {
  id: string;
  learnerName: string;
  learnerId: string;
  className: string;
  subject: string;
  topic: string;
  submissionType: string;
  submittedOn: string;
  scoringMethod: ScoringMethodType;
  status: SubmissionStatus;
  totalMarks: number;
  scoreAwarded: number;
  percentage: number;
  grade: string;
  feedbackText: string;
  teacherComments: string;
  visibleToLearner: boolean;
  rubrics: RubricCriteriaItem[];
  misconceptionTags: string[];
  worksheetQuestions: {
    number: number;
    text: string;
    underlinedPart: string;
    studentAnswer: string;
  }[];
}

export const TEACHER_ASSIGNMENTS_METRICS: AssignmentMetric[] = [
  {
    id: 'pending-review',
    label: 'Pending Review',
    value: 18,
    subtitle: 'Awaiting your review',
    icon: 'rate_review',
    tone: 'purple',
  },
  {
    id: 'submitted-today',
    label: 'Submitted Today',
    value: 12,
    subtitle: 'Across all classes',
    icon: 'calendar_month',
    tone: 'blue',
  },
  {
    id: 'needs-scoring',
    label: 'Needs Scoring',
    value: 7,
    subtitle: 'Ready to be scored',
    icon: 'edit_document',
    tone: 'orange',
  },
  {
    id: 'overdue-reviews',
    label: 'Overdue Reviews',
    value: 3,
    subtitle: 'Past due date',
    icon: 'schedule',
    tone: 'red',
  },
  {
    id: 'auto-scored',
    label: 'Auto-Scored Items',
    value: 24,
    subtitle: 'Approved automatically',
    icon: 'check_circle',
    tone: 'green',
  },
];

export const PENDING_SUBMISSIONS: PendingSubmissionItem[] = [
  {
    id: 'sub-1',
    learnerName: 'Maryam Ibrahim',
    learnerId: 'LN-2025-0187',
    avatarText: 'MI',
    avatarColor: '#8b5cf6',
    className: 'JSS 1A',
    submissionType: 'Worksheet',
    topic: 'Parts of Speech',
    submittedAt: '9:12 AM',
    scoringMethod: 'Teacher Review',
    status: 'Pending Review',
    actionLabel: 'Review Now',
    actionStyle: 'outline',
  },
  {
    id: 'sub-2',
    learnerName: 'Chinedu Okafor',
    learnerId: 'LN-2025-0142',
    avatarText: 'CO',
    avatarColor: '#3b82f6',
    className: 'JSS 1A',
    submissionType: 'Portfolio Task',
    topic: 'Descriptive Writing',
    submittedAt: '8:45 AM',
    scoringMethod: 'Rubric Review',
    status: 'Pending Review',
    actionLabel: 'Review Now',
    actionStyle: 'outline',
  },
  {
    id: 'sub-3',
    learnerName: 'Aisha Musa',
    learnerId: 'LN-2025-0199',
    avatarText: 'AM',
    avatarColor: '#ec4899',
    className: 'JSS 1B',
    submissionType: 'Essay / Theory',
    topic: 'Comprehension',
    submittedAt: '7:58 AM',
    scoringMethod: 'Teacher Review',
    status: 'Needs Scoring',
    actionLabel: 'Grade Now',
    actionStyle: 'solid-purple',
  },
  {
    id: 'sub-4',
    learnerName: 'Ibrahim Bello',
    learnerId: 'LN-2025-0215',
    avatarText: 'IB',
    avatarColor: '#10b981',
    className: 'JSS 2A',
    submissionType: 'Homework',
    topic: 'Sentence Structure',
    submittedAt: 'Yesterday, 4:20 PM',
    scoringMethod: 'Teacher Review',
    status: 'Pending Review',
    actionLabel: 'Review Now',
    actionStyle: 'outline',
  },
  {
    id: 'sub-5',
    learnerName: 'Amaka Nwosu',
    learnerId: 'LN-2025-0167',
    avatarText: 'AN',
    avatarColor: '#f59e0b',
    className: 'JSS 1C',
    submissionType: 'Quiz Response Upload',
    topic: 'Nouns and Their Kinds',
    submittedAt: 'Yesterday, 2:10 PM',
    scoringMethod: 'Teacher Review',
    status: 'Pending Review',
    actionLabel: 'Review Now',
    actionStyle: 'outline',
  },
  {
    id: 'sub-6',
    learnerName: 'Uche Eze',
    learnerId: 'LN-2025-0133',
    avatarText: 'UE',
    avatarColor: '#06b6d4',
    className: 'JSS 1A',
    submissionType: 'Objective Quiz',
    topic: 'Parts of Speech',
    submittedAt: 'Today, 8:10 AM',
    scoringMethod: 'Auto-Scored',
    status: 'Approved',
    actionLabel: 'View Result',
    actionStyle: 'outline-blue',
  },
];

export const SUBMISSION_BREAKDOWN_DATA: SubmissionBreakdownItem[] = [
  {
    type: 'Worksheets',
    count: 18,
    percentage: 30,
    color: '#8b5cf6',
  },
  {
    type: 'Portfolio Tasks',
    count: 12,
    percentage: 20,
    color: '#3b82f6',
  },
  {
    type: 'Essays / Theory',
    count: 9,
    percentage: 15,
    color: '#f97316',
  },
  {
    type: 'Homework Uploads',
    count: 6,
    percentage: 10,
    color: '#10b981',
  },
  {
    type: 'Objective / Auto-Scored',
    count: 15,
    percentage: 25,
    color: '#06b6d4',
  },
];

export const RECENT_FEEDBACK_ACTIVITY: RecentFeedbackItem[] = [
  {
    id: 'fb-1',
    learnerName: 'Aisha Musa',
    topic: 'Comprehension Essay',
    timestamp: 'Today, 9:35 AM',
    comment:
      'Good use of examples. Improve conclusion by summarizing key points.',
    avatarText: 'AM',
    avatarColor: '#ec4899',
  },
  {
    id: 'fb-2',
    learnerName: 'Chinedu Okafor',
    topic: 'Descriptive Writing',
    timestamp: 'Today, 8:50 AM',
    comment: 'Excellent vocabulary. Work on sentence flow and transitions.',
    avatarText: 'CO',
    avatarColor: '#3b82f6',
  },
  {
    id: 'fb-3',
    learnerName: 'Maryam Ibrahim',
    topic: 'Parts of Speech Worksheet',
    timestamp: 'Today, 8:20 AM',
    comment: 'Well done! Review plural nouns and irregular verbs.',
    avatarText: 'MI',
    avatarColor: '#8b5cf6',
  },
];

export const COMMON_ISSUES_OBSERVED: CommonIssueItem[] = [
  {
    id: 'issue-1',
    title: 'Confusing adjectives with adverbs',
    description: "Learners often use 'very quick' instead of 'quickly'.",
    iconText: 'Aa',
    badgeTone: 'yellow',
  },
  {
    id: 'issue-2',
    title: 'Incomplete comprehension answers',
    description: 'Answers do not fully address all parts of the question.',
    iconText: 'description',
    badgeTone: 'green',
  },
  {
    id: 'issue-3',
    title: 'Weak sentence punctuation',
    description: 'Missing commas, full stops, and correct capitalization.',
    iconText: ';',
    badgeTone: 'blue',
  },
];

export const REVIEW_QUEUE_ITEMS: ReviewQueueItem[] = [
  {
    id: 'q-worksheets',
    label: 'Worksheets',
    count: 6,
    icon: 'description',
  },
  {
    id: 'q-portfolio',
    label: 'Portfolio Tasks',
    count: 4,
    icon: 'assignment',
  },
  {
    id: 'q-essays',
    label: 'Essays / Theory',
    count: 3,
    icon: 'menu_book',
  },
  {
    id: 'q-homework',
    label: 'Homework Uploads',
    count: 2,
    icon: 'cloud_upload',
  },
  {
    id: 'q-resubmissions',
    label: 'Resubmissions',
    count: 3,
    icon: 'replay',
  },
];

export const ASSIGNMENTS_QUICK_ACTIONS: AssignmentQuickAction[] = [
  {
    id: 'review-next',
    label: 'Review Next Submission',
    icon: 'assignment_turned_in',
  },
  {
    id: 'open-rubrics',
    label: 'Open Rubrics',
    icon: 'grid_view',
  },
  {
    id: 'open-gradebook',
    label: 'Open Gradebook',
    icon: 'menu_book',
  },
  {
    id: 'export-list',
    label: 'Export Review List',
    icon: 'file_download',
  },
  {
    id: 'send-reminder',
    label: 'Send Reminder',
    icon: 'send',
  },
];

export const MARYAM_SUBMISSION_DETAIL: SubmissionReviewDetail = {
  id: 'sub-1',
  learnerName: 'Maryam Ibrahim',
  learnerId: 'LN-2025-0187',
  className: 'JSS 1A',
  subject: 'English Language',
  topic: 'Parts of Speech',
  submissionType: 'Worksheet',
  submittedOn: '3 May 2026, 09:42 AM',
  scoringMethod: 'Teacher Review',
  status: 'Pending Review',
  totalMarks: 20,
  scoreAwarded: 13,
  percentage: 65,
  grade: 'C',
  feedbackText:
    'Good effort, Maryam! You identified most parts of speech correctly. Pay more attention to adverbs vs. adjectives and provide clearer explanations when required.',
  teacherComments:
    'Maryam shows a good grasp of basic parts of speech. She needs more practice distinguishing between adjectives and adverbs. Encourage her to read more sentences and note context.\n\nNext step: Review examples of adjectives vs. adverbs and complete additional practice.',
  visibleToLearner: true,
  rubrics: [
    {
      id: 'rub-1',
      criteria: 'Accuracy',
      description: 'Correct identification of parts of speech.',
      maxMarks: 10,
      score: 7,
    },
    {
      id: 'rub-2',
      criteria: 'Understanding',
      description: 'Demonstrates understanding of the concept.',
      maxMarks: 5,
      score: 2,
    },
    {
      id: 'rub-3',
      criteria: 'Written Expression',
      description: 'Neatness, clarity, and correct use of language.',
      maxMarks: 3,
      score: 3,
    },
    {
      id: 'rub-4',
      criteria: 'Completion',
      description: 'All questions attempted.',
      maxMarks: 2,
      score: 1,
    },
  ],
  misconceptionTags: [
    'Confusing adjectives with adverbs',
    'Incomplete sentence explanation',
    'Needs clearer examples',
  ],
  worksheetQuestions: [
    {
      number: 1,
      text: 'The quick brown fox jumps over the lazy dog.',
      underlinedPart: 'quick',
      studentAnswer: 'adjective',
    },
    {
      number: 2,
      text: 'She sings beautifully in the school choir.',
      underlinedPart: 'beautifully',
      studentAnswer: 'adverb',
    },
    {
      number: 3,
      text: 'They went to the market to buy fruits.',
      underlinedPart: 'fruits',
      studentAnswer: 'noun',
    },
    {
      number: 4,
      text: 'Wow! That was an amazing performance.',
      underlinedPart: 'Wow!',
      studentAnswer: 'interjection',
    },
    {
      number: 5,
      text: 'He will complete his homework before dinner.',
      underlinedPart: 'complete',
      studentAnswer: 'verb',
    },
    {
      number: 6,
      text: 'The cat slept on the soft cushion.',
      underlinedPart: 'soft',
      studentAnswer: 'adjective',
    },
    {
      number: 7,
      text: 'Quickly, we ran to catch the bus.',
      underlinedPart: 'Quickly',
      studentAnswer: 'adverb',
    },
    {
      number: 8,
      text: 'Honesty is the best policy.',
      underlinedPart: 'Honesty',
      studentAnswer: 'noun',
    },
    {
      number: 9,
      text: 'Please close the window.',
      underlinedPart: 'close',
      studentAnswer: 'verb',
    },
    {
      number: 10,
      text: 'Alas! We lost the match.',
      underlinedPart: 'Alas!',
      studentAnswer: 'interjection',
    },
  ],
};
