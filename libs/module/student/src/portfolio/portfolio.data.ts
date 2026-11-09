import { LEARNER_LESSONS } from '../lessons/lessons.data';
import {
  PortfolioTask,
  PortfolioStatus,
  PortfolioWork,
} from './portfolio.model';

export const PORTFOLIO_STATUS = {
  'not-started': { label: 'Not Started', tone: 'neutral' },
  'in-progress': { label: 'In Progress', tone: 'orange' },
  submitted: { label: 'Submitted', tone: 'blue' },
  completed: { label: 'Completed', tone: 'green' },
  'needs-revision': { label: 'Needs Revision', tone: 'red' },
} as const;
export const PORTFOLIO_TABS = [
  { id: 'overview', label: 'Task Overview' },
  { id: 'work', label: 'My Work' },
  { id: 'submission', label: 'Submission' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'rubric', label: 'Rubric' },
] as const;
export const PORTFOLIO_RUBRIC = [
  {
    id: 'research',
    title: 'Research and planning',
    max: 20,
    description:
      'Gather relevant information, explain your sources, and make a clear plan.',
  },
  {
    id: 'understanding',
    title: 'Accuracy and understanding',
    max: 25,
    description:
      'Use correct facts, calculations, or language and show how you reached your conclusions.',
  },
  {
    id: 'presentation',
    title: 'Organisation and presentation',
    max: 20,
    description:
      'Present your work clearly, with useful headings, labels, and readable evidence.',
  },
  {
    id: 'application',
    title: 'Real-world application',
    max: 15,
    description:
      'Apply what you have learned to a practical example and explain your choices.',
  },
  {
    id: 'reflection',
    title: 'Reflection',
    max: 20,
    description:
      'Explain what you learned, what was challenging, and what you would improve.',
  },
] as const;
export const PORTFOLIO_SKILLS = [
  {
    id: 'problem-solving',
    label: 'Problem Solving',
    icon: 'ri-lightbulb-line',
    tone: 'purple',
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: 'ri-chat-1-line',
    tone: 'blue',
  },
  {
    id: 'creativity',
    label: 'Creativity',
    icon: 'ri-palette-line',
    tone: 'green',
  },
  {
    id: 'research',
    label: 'Research',
    icon: 'ri-search-eye-line',
    tone: 'orange',
  },
  {
    id: 'digital-literacy',
    label: 'Digital Literacy',
    icon: 'ri-computer-line',
    tone: 'red',
  },
] as const;
const TITLES: Record<string, [string, string, string]> = {
  'whole-numbers': [
    'Market Price Comparison',
    'Compare prices at two shops and plan a budget for a small fruit stall.',
    'ri-store-2-line',
  ],
  'living-things': [
    'Water Sources in My Community',
    'Investigate local water sources and explain why clean water matters to living things.',
    'ri-water-flash-line',
  ],
  'plant-parts': [
    'My Plant Observation Journal',
    'Observe a plant, label its parts, and record how each part helps it grow.',
    'ri-plant-line',
  ],
  'reading-whole-numbers': [
    'Real-life Problems with Whole Numbers',
    'Solve and explain everyday problems using whole numbers.',
    'ri-calculator-line',
  ],
  animals: [
    'Animal Habitats Around Me',
    'Observe familiar animals and describe how their habitats meet their needs.',
    'ri-bear-smile-line',
  ],
  'healthy-habits': [
    'A Healthy Community Campaign',
    'Create a simple campaign that encourages healthy habits in your community.',
    'ri-heart-pulse-line',
  ],
  'number-patterns': [
    'Patterns in Everyday Life',
    'Find number patterns, describe their rules, and create your own examples.',
    'ri-shapes-line',
  ],
  'rounding-numbers': [
    'Estimating a Shopping Budget',
    'Round prices and compare estimated totals with exact shopping costs.',
    'ri-shopping-basket-2-line',
  ],
};
const ORDER = [
  'whole-numbers',
  'living-things',
  'plant-parts',
  'reading-whole-numbers',
  'rounding-numbers',
  'animals',
  'healthy-habits',
];

function initialWork(title: string, status: PortfolioStatus): PortfolioWork {
  const handedIn = ['completed', 'submitted', 'needs-revision'].includes(
    status,
  );
  return {
    planning:
      status === 'not-started'
        ? ''
        : `I will use my lesson notes and familiar examples to plan “${title}”.`,
    work: handedIn
      ? `I organised my findings for “${title}” into a clear table and explained the main ideas. I included examples from my community and checked them against the lesson.\n\nThis is a sample learner submission for the portfolio demonstration.`
      : '',
    reflection: handedIn
      ? 'I learned to organise information and explain my choices. Next time I will check my evidence more carefully and make my presentation clearer.'
      : '',
    readBrief: status !== 'not-started',
    reviewed: handedIn && status !== 'needs-revision',
  };
}
export const LEARNER_PORTFOLIO_TASKS: readonly PortfolioTask[] = [
  ...LEARNER_LESSONS.filter(
    (lesson) => lesson.subjectId !== 'english-language',
  ).map((lesson): PortfolioTask => {
    const [title, description, icon] = TITLES[lesson.id] ?? [
      `${lesson.title} in Everyday Life`,
      `Apply your understanding of ${lesson.title.toLowerCase()} to a practical example.`,
      'ri-folder-open-line',
    ];
    const status: PortfolioStatus = !lesson.available
      ? 'not-started'
      : ['whole-numbers', 'reading-whole-numbers'].includes(lesson.id)
        ? 'in-progress'
        : ['living-things', 'animals', 'healthy-habits'].includes(lesson.id)
          ? 'submitted'
          : lesson.id === 'rounding-numbers'
            ? 'needs-revision'
            : 'completed';
    const id =
      lesson.id === 'whole-numbers'
        ? 'market-price-comparison'
        : `${lesson.id}-portfolio`;
    const submitted = ['completed', 'submitted', 'needs-revision'].includes(
      status,
    );
    const scores =
      status === 'needs-revision'
        ? [12, 10, 12, 8, 13]
        : lesson.id === 'number-patterns'
          ? [18, 22, 17, 12, 16]
          : lesson.id === 'addition-facts'
            ? [18, 23, 18, 13, 16]
            : [18, 21, 17, 13, 17];
    return {
      id,
      title,
      description,
      subjectId: lesson.subjectId,
      subject: lesson.subject,
      lessonId: lesson.id,
      topicId: lesson.id,
      week: lesson.week,
      term: lesson.term,
      tone: lesson.tone,
      icon,
      available: lesson.available,
      status,
      dueAt:
        lesson.id === 'whole-numbers'
          ? '2026-11-09T16:00:00+01:00'
          : '2026-11-12T16:00:00+01:00',
      startedAt: '2026-10-28T10:00:00+01:00',
      updatedAt: '2026-11-03T12:00:00+01:00',
      secondsSpent:
        status === 'not-started' ? 0 : status === 'in-progress' ? 4500 : 5400,
      brief:
        lesson.id === 'whole-numbers'
          ? 'Compare the prices of at least five fruits at two shops. Use your findings to prepare a small fruit-stall budget: list quantities, purchase costs, selling prices, expected income, and profit. Explain which shop gives the best value and why.'
          : `${description} Use your lesson as a starting point, gather examples, and present your findings in a table, short report, drawing, or photographs with clear labels.`,
      connection:
        lesson.id === 'whole-numbers'
          ? 'Comparing prices and planning a budget help people make sensible choices about spending and running a business.'
          : 'Use your learning to understand the people, places, and everyday choices around you.',
      steps:
        lesson.id === 'whole-numbers'
          ? [
              'Choose at least five fruits and record prices at two shops.',
              'List the quantities you would buy and calculate their total cost.',
              'Choose selling prices and calculate expected income.',
              'Calculate the expected profit and explain your choices.',
              'Present your price comparison and budget clearly.',
              'Write a reflection on what you learned.',
            ]
          : [
              'Read the task brief and review the related lesson.',
              'Gather relevant examples and record where they came from.',
              'Organise your information in a clear table, report, drawing, or labelled photos.',
              'Explain your findings and check them against the lesson.',
              'Write a short reflection on what you learned.',
            ],
      tips: [
        'Use your own examples and explain your thinking.',
        'Keep your work clear and easy to read.',
        'Check facts, spelling, and calculations before submitting.',
      ],
      successCriteria: [
        'Your work addresses every part of the task brief.',
        'Facts and calculations are accurate.',
        'Evidence is clearly labelled and organised.',
        'Your reflection explains what you learned.',
      ],
      skills:
        lesson.subjectId === 'mathematics'
          ? ['problem-solving', 'research', 'digital-literacy']
          : ['communication', 'creativity', 'research'],
      initialWork: initialWork(title, status),
      submission: submitted
        ? {
            id: `sample-${id}`,
            submittedAt: '2026-11-01T12:00:00+01:00',
            version: 1,
            note: 'Here is my work and reflection for this task.',
          }
        : undefined,
      feedback: ['completed', 'needs-revision'].includes(status)
        ? {
            tutor: 'Mr. Adewale',
            date: '2026-11-03T12:00:00+01:00',
            scores,
            comment:
              status === 'needs-revision'
                ? 'Your presentation is clear, but the estimated total needs checking. Round each price consistently and compare the estimate with the exact total.'
                : 'You organised your findings clearly and connected the task to everyday life. Your reflection shows that you understand the main ideas.',
            nextSteps:
              status === 'needs-revision'
                ? [
                    'Check how you rounded each price.',
                    'Show both the estimated and exact totals.',
                    'Explain the difference in your reflection, then resubmit.',
                  ]
                : [
                    'Keep showing your working and explaining your choices.',
                    'Use another example to extend your understanding.',
                  ],
          }
        : undefined,
    };
  }),
  {
    id: 'personal-dictionary',
    title: 'My Personal Dictionary',
    description:
      'Create a dictionary of ten new English words and use them in sentences.',
    subjectId: 'english-language',
    subject: 'English Language',
    lessonId: 'parts-of-speech',
    topicId: 'parts-of-speech',
    week: 1,
    term: 'first',
    tone: 'green',
    icon: 'ri-book-2-line',
    available: true,
    status: 'completed',
    dueAt: '2026-11-06T16:00:00+01:00',
    startedAt: '2026-10-22T10:00:00+01:00',
    updatedAt: '2026-11-02T12:00:00+01:00',
    secondsSpent: 4200,
    brief:
      'Choose ten new words. Give each word’s meaning and part of speech, then use it in an original sentence. Arrange your dictionary alphabetically.',
    connection:
      'A personal dictionary builds vocabulary and helps you express ideas clearly.',
    steps: [
      'Choose ten useful new words.',
      'Find each meaning and part of speech.',
      'Write an original sentence for every word.',
      'Arrange the words alphabetically and check your spelling.',
      'Reflect on the words you will use in everyday conversation.',
    ],
    tips: [
      'Use a trusted dictionary.',
      'Write sentences that show each meaning clearly.',
    ],
    successCriteria: [
      'Ten words with correct meanings.',
      'Correct parts of speech and original sentences.',
      'Clear alphabetical order and a thoughtful reflection.',
    ],
    skills: ['communication', 'creativity', 'research'],
    initialWork: initialWork('My Personal Dictionary', 'completed'),
    submission: {
      id: 'sample-personal-dictionary',
      submittedAt: '2026-10-30T12:00:00+01:00',
      version: 1,
      note: 'My dictionary is ready for review.',
    },
    feedback: {
      tutor: 'Mrs. Bello',
      date: '2026-11-02T12:00:00+01:00',
      scores: [17, 21, 17, 12, 15],
      comment:
        'Your dictionary is well organised and your sentences show understanding. Keep checking the parts of speech when a word has more than one use.',
      nextSteps: ['Add five more words as you meet them in your reading.'],
    },
  } satisfies PortfolioTask,
].sort((a, b) => {
  const rank = (id: string) => {
    const index = ORDER.indexOf(id);
    return index < 0 ? ORDER.length : index;
  };
  return rank(a.lessonId) - rank(b.lessonId);
});
export function portfolioDate(value: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Africa/Lagos',
  }).format(new Date(value));
}
export function portfolioTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  return minutes >= 60
    ? `${Math.floor(minutes / 60)}h ${minutes % 60}m`
    : `${minutes}m`;
}
