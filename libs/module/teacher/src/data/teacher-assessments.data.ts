export interface AssessmentMetric {
  id: string;
  label: string;
  value: number;
  subtitle: string;
  icon: string;
  tone: 'purple' | 'blue' | 'green' | 'orange' | 'red';
  actionIcon?: string;
}

export type AssessmentStatus =
  | 'Scheduled'
  | 'Open'
  | 'Pending Review'
  | 'Completed';

export type AssessmentType = 'Quiz' | 'Test' | 'Essay' | 'Mixed';

export type ScoringMethod = 'Auto-Scored' | 'Mixed' | 'Teacher Review';

export interface AssessmentItem {
  id: string;
  title: string;
  className: string;
  topic: string;
  type: AssessmentType;
  questionsCount: number;
  scoringMethod: ScoringMethod;
  scheduledDate: string;
  submissionsText: string;
  averageScoreText: string;
  status: AssessmentStatus;
}

export interface AssessmentsFilterValues {
  term: string;
  className: string;
  subject: string;
  assessmentType: string;
  status: string;
  searchQuery: string;
}

export interface QBSummaryItem {
  id: string;
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface RecentQBActivityItem {
  id: string;
  userName: string;
  actionText: string;
  topic: string;
  timestamp: string;
  avatarText: string;
  avatarColor: string;
}

export interface AssessmentBestPracticeItem {
  id: string;
  icon: string;
  title: string;
  tone: 'yellow' | 'orange' | 'blue' | 'purple';
}

export interface AssessmentQuickAction {
  id: string;
  label: string;
  icon: string;
}

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface QuestionBankItem {
  id: string;
  titlePreview: string;
  className: string;
  topic: string;
  questionType: string;
  difficulty: DifficultyLevel;
  marks: number;
  scoring: 'Auto' | 'Manual';
  misconceptionTag: string;
  lastUpdated: string;
}

export interface SelectedQuestionDetail {
  id: string;
  questionText: string;
  underlinedWord: string;
  options: { label: string; text: string; isCorrect: boolean }[];
  correctAnswer: string;
  explanation: string;
  misconceptionTag: string;
  bloomsLevel: string;
  rubricNote: string;
  className: string;
  subject: string;
  term: string;
  weekTopic: string;
  difficulty: DifficultyLevel;
  marks: number;
  scoringType: string;
  linkedAssessments: string;
  lastUsed: string;
}

export const TEACHER_ASSESSMENTS_METRICS: AssessmentMetric[] = [
  {
    id: 'total-assessments',
    label: 'Total Assessments',
    value: 36,
    subtitle: 'Across all classes',
    icon: 'article',
    tone: 'purple',
  },
  {
    id: 'qb-items',
    label: 'Question Bank Items',
    value: 248,
    subtitle: 'Across all topics',
    icon: 'inventory_2',
    tone: 'blue',
  },
  {
    id: 'scheduled-week',
    label: 'Scheduled This Week',
    value: 5,
    subtitle: 'Across all classes',
    icon: 'calendar_month',
    tone: 'green',
  },
  {
    id: 'pending-marking',
    label: 'Pending Manual Marking',
    value: 9,
    subtitle: 'Essays & uploads',
    icon: 'person',
    tone: 'orange',
    actionIcon: 'checklist',
  },
];

export const ASSESSMENTS_LIST: AssessmentItem[] = [
  {
    id: 'ass-1',
    title: 'Weekly Quiz – Parts of Speech',
    className: 'JSS 1A',
    topic: 'Parts of Speech',
    type: 'Quiz',
    questionsCount: 10,
    scoringMethod: 'Auto-Scored',
    scheduledDate: '3 May 2026',
    submissionsText: '24/28',
    averageScoreText: '74%',
    status: 'Scheduled',
  },
  {
    id: 'ass-2',
    title: 'Comprehension Test',
    className: 'JSS 1B',
    topic: 'Comprehension Skills',
    type: 'Test',
    questionsCount: 12,
    scoringMethod: 'Mixed',
    scheduledDate: '4 May 2026',
    submissionsText: '19/27',
    averageScoreText: '68%',
    status: 'Open',
  },
  {
    id: 'ass-3',
    title: 'Essay Writing Assessment',
    className: 'JSS 2A',
    topic: 'Descriptive Writing',
    type: 'Essay',
    questionsCount: 4,
    scoringMethod: 'Teacher Review',
    scheduledDate: '5 May 2026',
    submissionsText: '17/25',
    averageScoreText: '63%',
    status: 'Pending Review',
  },
  {
    id: 'ass-4',
    title: 'Sentence Structure Checkpoint',
    className: 'JSS 1B',
    topic: 'Sentence Structure',
    type: 'Quiz',
    questionsCount: 8,
    scoringMethod: 'Auto-Scored',
    scheduledDate: '1 May 2026',
    submissionsText: '27/27',
    averageScoreText: '79%',
    status: 'Completed',
  },
  {
    id: 'ass-5',
    title: 'End-of-Topic Assessment',
    className: 'JSS 1A',
    topic: 'Nouns and Their Kinds',
    type: 'Mixed',
    questionsCount: 15,
    scoringMethod: 'Mixed',
    scheduledDate: '30 Apr 2026',
    submissionsText: '25/28',
    averageScoreText: '71%',
    status: 'Completed',
  },
];

export const QB_SUMMARY_ITEMS: QBSummaryItem[] = [
  {
    id: 'qb-mc',
    label: 'Multiple Choice',
    count: 96,
    percentage: 38.7,
    color: '#4f46e5',
  },
  {
    id: 'qb-sa',
    label: 'Short Answer',
    count: 58,
    percentage: 23.4,
    color: '#10b981',
  },
  {
    id: 'qb-et',
    label: 'Essay / Theory',
    count: 34,
    percentage: 13.7,
    color: '#f97316',
  },
  {
    id: 'qb-wp',
    label: 'Word Problems',
    count: 28,
    percentage: 11.3,
    color: '#06b6d4',
  },
  {
    id: 'qb-at',
    label: 'Application Tasks',
    count: 32,
    percentage: 12.9,
    color: '#ec4899',
  },
];

export const RECENT_QB_ACTIVITY: RecentQBActivityItem[] = [
  {
    id: 'act-1',
    userName: 'Aisha Musa',
    actionText: 'added 8 Multiple Choice questions',
    topic: 'Topic: Parts of Speech',
    timestamp: 'Today, 9:15 AM',
    avatarText: 'AM',
    avatarColor: '#ec4899',
  },
  {
    id: 'act-2',
    userName: 'Chinedu Okafor',
    actionText: 'edited 5 Short Answer questions',
    topic: 'Topic: Comprehension Skills',
    timestamp: 'Today, 8:30 AM',
    avatarText: 'CO',
    avatarColor: '#3b82f6',
  },
  {
    id: 'act-3',
    userName: 'Maryam Ibrahim',
    actionText: 'added 3 Essay questions',
    topic: 'Topic: Descriptive Writing',
    timestamp: 'Yesterday, 4:20 PM',
    avatarText: 'MI',
    avatarColor: '#8b5cf6',
  },
  {
    id: 'act-4',
    userName: 'Ibrahim Bello',
    actionText: 'imported 12 questions from file',
    topic: 'Topic: Sentence Structure',
    timestamp: 'Yesterday, 2:10 PM',
    avatarText: 'IB',
    avatarColor: '#10b981',
  },
];

export const ASSESSMENT_BEST_PRACTICES: AssessmentBestPracticeItem[] = [
  {
    id: 'bp-1',
    icon: 'lightbulb',
    title:
      'Auto-marked quizzes and tests are entered in the Gradebook immediately after the due date.',
    tone: 'yellow',
  },
  {
    id: 'bp-2',
    icon: 'person',
    title:
      'Essays, uploads, and portfolio-linked assessments require teacher review before scores are approved.',
    tone: 'orange',
  },
  {
    id: 'bp-3',
    icon: 'balance',
    title:
      'Use Mixed scoring to combine auto-scored items with teacher-reviewed items in the same assessment.',
    tone: 'blue',
  },
  {
    id: 'bp-4',
    icon: 'bar_chart',
    title:
      'Review analytics after each assessment to identify learning gaps and plan targeted interventions.',
    tone: 'purple',
  },
];

export const ASSESSMENTS_QUICK_ACTIONS: AssessmentQuickAction[] = [
  {
    id: 'create-assessment',
    label: 'Create Assessment',
    icon: 'add_circle',
  },
  {
    id: 'build-weekly-quiz',
    label: 'Build Weekly Quiz',
    icon: 'assignment',
  },
  {
    id: 'open-qb',
    label: 'Open Question Bank',
    icon: 'inventory_2',
  },
  {
    id: 'import-questions',
    label: 'Import Questions',
    icon: 'cloud_upload',
  },
  {
    id: 'generate-test',
    label: 'Generate End-of-Topic Test',
    icon: 'auto_awesome',
  },
];

export const QUESTION_BANK_METRICS: AssessmentMetric[] = [
  {
    id: 'qb-total-questions',
    label: 'Total Questions',
    value: 248,
    subtitle: 'Across all topics',
    icon: 'quiz',
    tone: 'purple',
  },
  {
    id: 'qb-auto-markable',
    label: 'Auto-Markable',
    value: 164,
    subtitle: '66.1% of total',
    icon: 'assignment_turned_in',
    tone: 'green',
  },
  {
    id: 'qb-teacher-reviewed',
    label: 'Teacher-Reviewed',
    value: 198,
    subtitle: '79.8% of total',
    icon: 'person',
    tone: 'orange',
  },
  {
    id: 'qb-topics-covered',
    label: 'Topics Covered',
    value: 18,
    subtitle: 'Across all classes',
    icon: 'menu_book',
    tone: 'blue',
  },
  {
    id: 'qb-recently-added',
    label: 'Recently Added',
    value: 16,
    subtitle: 'This week',
    icon: 'schedule',
    tone: 'red',
  },
];

export const QUESTION_BANK_ITEMS: QuestionBankItem[] = [
  {
    id: 'qb-1',
    titlePreview:
      'Identify the part of speech of the underlined word. She quickly finished her homework before...',
    className: 'JSS 1A',
    topic: 'Parts of Speech',
    questionType: 'Multiple Choice',
    difficulty: 'Easy',
    marks: 1,
    scoring: 'Auto',
    misconceptionTag: 'Verb vs Adverb',
    lastUpdated: '3 May 2026 by Mr. Tunde A.',
  },
  {
    id: 'qb-2',
    titlePreview:
      'Rewrite the sentence using the correct order. Because she was tired, she went to bed...',
    className: 'JSS 1A',
    topic: 'Sentence Structure',
    questionType: 'Short Answer',
    difficulty: 'Medium',
    marks: 2,
    scoring: 'Auto',
    misconceptionTag: 'Sentence Order',
    lastUpdated: '4 May 2026 by Mr. Tunde A.',
  },
  {
    id: 'qb-3',
    titlePreview:
      'Read the passage and answer the questions. The old man lived in a small village near...',
    className: 'JSS 1B',
    topic: 'Comprehension Skills',
    questionType: 'Multiple Choice',
    difficulty: 'Medium',
    marks: 2,
    scoring: 'Auto',
    misconceptionTag: 'Main Idea',
    lastUpdated: '1 May 2026 by Mr. Tunde A.',
  },
  {
    id: 'qb-4',
    titlePreview:
      'Write a descriptive essay about a place you love. Describe the place and explain why it is...',
    className: 'JSS 2A',
    topic: 'Descriptive Writing',
    questionType: 'Essay / Theory',
    difficulty: 'Hard',
    marks: 10,
    scoring: 'Manual',
    misconceptionTag: 'Detail & Organization',
    lastUpdated: '5 May 2026 by Mr. Tunde A.',
  },
  {
    id: 'qb-5',
    titlePreview:
      'Find the error in the following sentence. He go to the market every day.',
    className: 'JSS 1B',
    topic: 'Grammar - Tenses',
    questionType: 'Short Answer',
    difficulty: 'Easy',
    marks: 1,
    scoring: 'Auto',
    misconceptionTag: 'Verb Tense',
    lastUpdated: '2 May 2026 by Mr. Tunde A.',
  },
  {
    id: 'qb-6',
    titlePreview:
      'Solve the following word problem and explain... If a train travels 120 km in 2 hours...',
    className: 'JSS 2B',
    topic: 'Word Problems',
    questionType: 'Word Problem / Application',
    difficulty: 'Medium',
    marks: 3,
    scoring: 'Manual',
    misconceptionTag: 'Unit Conversion',
    lastUpdated: '30 Apr 2026 by Mr. Tunde A.',
  },
  {
    id: 'qb-7',
    titlePreview:
      "Create a portfolio entry on 'A Day in My Life'. Write a short reflection and add a photo or...",
    className: 'JSS 3A',
    topic: 'Portfolio Tasks',
    questionType: 'Portfolio-linked Prompt',
    difficulty: 'Medium',
    marks: 5,
    scoring: 'Manual',
    misconceptionTag: 'Creativity',
    lastUpdated: '29 Apr 2026 by Mr. Tunde A.',
  },
];

export const SELECTED_QUESTION_PREVIEW: SelectedQuestionDetail = {
  id: 'qb-1',
  questionText:
    'Identify the part of speech of the underlined word. She quickly finished her homework before dinner.',
  underlinedWord: 'quickly',
  options: [
    { label: 'A', text: 'Noun', isCorrect: false },
    { label: 'B', text: 'Verb', isCorrect: false },
    { label: 'C', text: 'Adjective', isCorrect: false },
    { label: 'D', text: 'Adverb', isCorrect: true },
  ],
  correctAnswer: 'D. Adverb',
  explanation:
    '"Quickly" describes how she finished her homework. It tells us the manner, so it is an adverb.',
  misconceptionTag: 'Verb vs Adverb',
  bloomsLevel: 'Remember',
  rubricNote: '—',
  className: 'JSS 1A',
  subject: 'English Language',
  term: 'Term 1 2025/2026',
  weekTopic: 'Week 2 - Parts of Speech',
  difficulty: 'Easy',
  marks: 1,
  scoringType: 'Auto-marked',
  linkedAssessments: 'Weekly Quiz - Week 2 JSS 1A | 3 May 2026',
  lastUsed: '3 May 2026 (24 times)',
};
