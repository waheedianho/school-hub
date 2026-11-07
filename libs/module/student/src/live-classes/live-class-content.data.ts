import { ClassPracticeQuestion, LessonSlide } from './live-class.model';

export const ENGLISH_SLIDES: readonly LessonSlide[] = [
  {
    id: 'sentence',
    title: 'What is a Sentence?',
    definition:
      'A sentence is a group of words that expresses a complete thought.',
    bullets: [
      'Begin with a capital letter.',
      'End with a full stop, question mark, or exclamation mark.',
    ],
    examples: [
      { lead: 'The boy', rest: 'plays football.', note: 'A complete thought' },
      {
        lead: 'My sister',
        rest: 'reads story books.',
        note: 'A complete thought',
      },
    ],
  },
  {
    id: 'subject-intro',
    title: 'What is a Subject?',
    definition: 'The subject tells us who or what a sentence is about.',
    bullets: [
      'A noun or a pronoun can be the subject.',
      'Ask who or what before the verb.',
    ],
    examples: [
      { lead: 'The boy', rest: 'plays football.', note: 'Who plays? The boy.' },
    ],
  },
  {
    id: 'predicate-intro',
    title: 'What is a Predicate?',
    definition:
      'The predicate tells us what the subject does or what is said about it.',
    bullets: [
      'The predicate contains a verb.',
      'Include the words that complete its meaning.',
    ],
    examples: [
      {
        lead: 'My sister',
        rest: 'reads story books.',
        note: 'What does my sister do? Reads story books.',
      },
    ],
  },
  {
    id: 'subject',
    title: 'Subject and Predicate',
    definition:
      'Every complete sentence has a subject (who or what the sentence is about) and a predicate (what the subject does).',
    bullets: [],
    examples: [
      {
        lead: 'The boy',
        rest: 'plays football.',
        note: '',
        leadLabel: 'Subject',
        restLabel: 'Predicate',
      },
      {
        lead: 'My sister',
        rest: 'reads story books.',
        note: '',
        leadLabel: 'Subject',
        restLabel: 'Predicate',
      },
      {
        lead: 'The sun',
        rest: 'shines brightly.',
        note: '',
        leadLabel: 'Subject',
        restLabel: 'Predicate',
      },
    ],
  },
  {
    id: 'find-subject',
    title: 'Identifying Subjects',
    definition: 'Ask: who or what is the sentence about?',
    bullets: [
      'The subject can be a noun or a pronoun.',
      'Look for the whole subject, not just one word.',
    ],
    examples: [
      {
        lead: 'The little cat',
        rest: 'sleeps on the mat.',
        note: 'Who sleeps? The little cat.',
      },
      { lead: 'They', rest: 'won the match.', note: 'Who won? They.' },
    ],
  },
  {
    id: 'find-predicate',
    title: 'Identifying Predicates',
    definition: 'Ask: what does the subject do, or what is said about it?',
    bullets: [
      'The predicate includes a verb.',
      'It can include more words that complete the meaning.',
    ],
    examples: [
      {
        lead: 'Our teacher',
        rest: 'explains clearly.',
        note: 'What does our teacher do? Explains clearly.',
      },
      {
        lead: 'The children',
        rest: 'are happy.',
        note: 'What is said about the children? They are happy.',
      },
    ],
  },
  {
    id: 'practice',
    title: 'Let’s Practise Together',
    definition:
      'Read each sentence. Find the subject first, then the predicate.',
    bullets: [
      'The cat sleeps on the mat.',
      'Our teacher explains clearly.',
      'They played a great game.',
    ],
    examples: [],
  },
  {
    id: 'summary',
    title: 'Summary & Next Steps',
    definition:
      'The subject tells us who or what. The predicate tells us what the subject does or is.',
    bullets: [
      'Complete the in-class practice below.',
      'Write three sentences of your own.',
      'Review the related lesson and keep your notes.',
    ],
    examples: [
      {
        lead: 'You',
        rest: 'are making progress!',
        note: 'Keep practising complete sentences.',
      },
    ],
  },
];
export const ENGLISH_PRACTICE: readonly ClassPracticeQuestion[] = [
  {
    id: 'subject-cat',
    prompt: 'What is the subject in “The cat sleeps on the mat”?',
    answer: 'The cat',
    explanation: '“The cat” is who the sentence is about.',
  },
  {
    id: 'predicate-teacher',
    prompt: 'What is the predicate in “Our teacher explains clearly”?',
    answer: 'explains clearly',
    explanation: '“Explains clearly” tells us what our teacher does.',
  },
  {
    id: 'subject-they',
    prompt: 'What is the subject in “They played a great game”?',
    answer: 'They',
    explanation: '“They” is a pronoun used as the subject.',
  },
];
export const MATH_SLIDES: readonly LessonSlide[] = [
  {
    id: 'whole-numbers',
    title: 'Whole Numbers — Operations',
    definition:
      'Whole numbers help us count, compare quantities, and solve everyday problems.',
    bullets: [
      'Addition combines quantities.',
      'Subtraction finds a difference.',
      'Multiplication groups equal quantities.',
      'Division shares quantities equally.',
    ],
    examples: [],
  },
  {
    id: 'addition',
    title: 'Addition and Place Value',
    definition: 'Line up the digits by place value. Add from the ones column.',
    bullets: [
      'Check the place value of every digit.',
      'Regroup when a column totals ten or more.',
    ],
    examples: [
      {
        lead: '245 + 378',
        rest: '= 623',
        note: 'Add the ones, tens, then hundreds.',
      },
      {
        lead: '4,268 + 4,866',
        rest: '= 9,134',
        note: 'Keep the thousands columns aligned.',
      },
    ],
  },
  {
    id: 'subtraction',
    title: 'Subtraction with Regrouping',
    definition:
      'Regroup when the top digit is smaller than the digit you are subtracting.',
    bullets: [
      'Write one digit in each place-value column.',
      'Check the difference by adding it back.',
    ],
    examples: [
      {
        lead: '5,000 − 1,287',
        rest: '= 3,713',
        note: 'Regroup carefully across the zeros.',
      },
    ],
  },
  {
    id: 'multiply',
    title: 'Multiplication and Division',
    definition: 'Use equal groups to explain multiplication and division.',
    bullets: [
      'Multiplication and division are inverse operations.',
      'Check a division answer by multiplying.',
    ],
    examples: [
      {
        lead: '24 × 5',
        rest: '= 120',
        note: 'Five equal groups of twenty-four.',
      },
      {
        lead: '120 ÷ 5',
        rest: '= 24',
        note: 'Share one hundred and twenty into five equal groups.',
      },
    ],
  },
  {
    id: 'practice',
    title: 'Your Turn',
    definition:
      'Work through the questions in your notebook. Check your place-value columns.',
    bullets: ['245 + 378', '5,000 − 1,287', '24 × 5'],
    examples: [],
  },
  {
    id: 'summary',
    title: 'Keep Building Your Number Skills',
    definition:
      'Show your working and choose an operation that matches the problem.',
    bullets: [
      'Complete the in-class practice.',
      'Continue the related worksheet.',
      'Apply your number skills to your portfolio task.',
    ],
    examples: [],
  },
];
export const MATH_PRACTICE: readonly ClassPracticeQuestion[] = [
  {
    id: 'sum',
    prompt: 'Calculate 245 + 378.',
    answer: '623',
    explanation: '245 + 378 = 623. Regroup the ones and tens.',
  },
  {
    id: 'difference',
    prompt: 'Calculate 5,000 − 1,287.',
    answer: '3713',
    explanation: 'Regroup across the zeros. The difference is 3,713.',
  },
  {
    id: 'product',
    prompt: 'Calculate 24 × 5.',
    answer: '120',
    explanation: '20 × 5 + 4 × 5 = 100 + 20 = 120.',
  },
];
export const SCIENCE_SLIDES: readonly LessonSlide[] = [
  {
    id: 'living-things',
    title: 'Living and Non-living Things',
    definition:
      'Living things carry out life processes. Non-living things do not carry out all of these processes.',
    bullets: [
      'Look for evidence, rather than just movement.',
      'A moving car is not a living thing.',
    ],
    examples: [
      {
        lead: 'A plant',
        rest: 'is a living thing.',
        note: 'It grows, responds, and needs nutrients.',
      },
    ],
  },
  {
    id: 'processes',
    title: 'Characteristics of Living Things',
    definition:
      'Living things grow, respire, reproduce, respond, excrete, and need nutrients.',
    bullets: [
      'Plants and animals are living things.',
      'Different living things meet their needs in different ways.',
    ],
    examples: [],
  },
  {
    id: 'plants',
    title: 'What Do Plants Need?',
    definition:
      'Green plants use light to make food. They also need water, air, and suitable conditions.',
    bullets: [
      'Roots take in water.',
      'Leaves help the plant make food.',
      'The stem supports the plant.',
    ],
    examples: [],
  },
  {
    id: 'sort',
    title: 'Compare and Classify',
    definition: 'Use a clear reason to place an object in a group.',
    bullets: [
      'A stone does not grow or reproduce.',
      'A seed can grow into a plant under suitable conditions.',
    ],
    examples: [
      {
        lead: 'A tree',
        rest: 'is living.',
        note: 'Explain your reason using a life process.',
      },
      {
        lead: 'A chair',
        rest: 'is non-living.',
        note: 'It does not carry out life processes.',
      },
    ],
  },
  {
    id: 'practice',
    title: 'Let’s Check Your Understanding',
    definition: 'Use the in-class activity to explain what you have learned.',
    bullets: [
      'Name a living thing.',
      'Name a plant part that absorbs water.',
      'Name a non-living thing.',
    ],
    examples: [],
  },
  {
    id: 'summary',
    title: 'Observe the World Around You',
    definition:
      'Look for evidence of life processes when classifying living and non-living things.',
    bullets: [
      'Complete the activity below.',
      'Review the related science lesson.',
      'Keep examples and questions in your lesson notes.',
    ],
    examples: [],
  },
];
export const SCIENCE_PRACTICE: readonly ClassPracticeQuestion[] = [
  {
    id: 'living',
    prompt: 'Which is living: a tree or a chair?',
    answer: 'a tree',
    explanation: 'A tree grows and carries out life processes.',
  },
  {
    id: 'roots',
    prompt: 'Which plant part absorbs water from the soil?',
    answer: 'roots',
    explanation: 'The roots absorb water and minerals from the soil.',
  },
  {
    id: 'non-living',
    prompt: 'Which is non-living: a stone or a seed?',
    answer: 'a stone',
    explanation: 'A stone does not grow or reproduce.',
  },
];
