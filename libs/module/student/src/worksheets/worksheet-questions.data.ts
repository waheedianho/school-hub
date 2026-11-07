import {
  LIVING_THINGS_QUESTIONS,
  PARTS_OF_SPEECH_QUESTIONS,
} from '../assessments/questions.data';
import { QuizQuestion } from '../assessments/assessment.model';
import { WrittenQuestion } from './worksheet.model';

function arithmetic(
  section: string,
  items: readonly [string, number, string][],
): WrittenQuestion[] {
  return items.map(([prompt, answer, explanation], index) => ({
    id: `${section.toLowerCase()}-${index + 1}`,
    section,
    prompt,
    answer: String(answer),
    kind: /shop|library|pencils|equally/i.test(prompt) ? 'long' : 'number',
    explanation,
  }));
}
export const OPERATIONS_QUESTIONS: readonly WrittenQuestion[] = [
  ...arithmetic('Addition', [
    [
      '345 + 278 =',
      623,
      'Add the ones, tens, and hundreds, carrying where needed.',
    ],
    ['6,789 + 2,345 =', 9134, '6,789 + 2,000 + 345 = 9,134.'],
    [
      '4,563 + 2,781 + 1,234 =',
      8578,
      '4,563 + 2,781 = 7,344; add 1,234 to get 8,578.',
    ],
    [
      'A shopkeeper has 2,450 pencils and buys 3,275 more. How many pencils does he have altogether?',
      5725,
      '2,450 + 3,275 = 5,725 pencils. Enter the number as your answer.',
    ],
    ['12,080 + 9,920 =', 22000, '12,080 + 9,920 = 22,000.'],
  ]),
  ...arithmetic('Subtraction', [
    ['732 − 456 =', 276, 'Regroup to subtract: 732 − 456 = 276.'],
    ['5,000 − 1,287 =', 3713, '5,000 − 1,000 − 287 = 3,713.'],
    ['8,642 − 3,219 =', 5423, 'Subtract each place value to get 5,423.'],
    [
      'A library has 9,850 books. If 3,475 are borrowed, how many books remain?',
      6375,
      '9,850 − 3,475 = 6,375 books. Enter the number.',
    ],
    ['20,000 − 8,765 =', 11235, '20,000 − 8,765 = 11,235.'],
  ]),
  ...arithmetic('Multiplication', [
    ['23 × 4 =', 92, '20 × 4 + 3 × 4 = 80 + 12 = 92.'],
    ['125 × 6 =', 750, '100 × 6 + 25 × 6 = 600 + 150 = 750.'],
    ['34 × 12 =', 408, '34 × 10 + 34 × 2 = 340 + 68 = 408.'],
    ['48 × 25 =', 1200, '48 × 100 ÷ 4 = 1,200.'],
    ['207 × 3 =', 621, '200 × 3 + 7 × 3 = 600 + 21 = 621.'],
  ]),
  ...arithmetic('Division', [
    ['84 ÷ 7 =', 12, '7 × 12 = 84, so 84 ÷ 7 = 12.'],
    ['144 ÷ 12 =', 12, '12 × 12 = 144.'],
    ['360 ÷ 9 =', 40, '9 × 40 = 360.'],
    ['525 ÷ 5 =', 105, '500 ÷ 5 + 25 ÷ 5 = 100 + 5 = 105.'],
    [
      '960 pencils are shared equally among 8 classes. How many pencils does each class receive?',
      120,
      '960 ÷ 8 = 120 pencils per class. Enter the number.',
    ],
  ]),
];
export const PLACE_VALUE_QUESTIONS: readonly WrittenQuestion[] = [
  ...arithmetic('Digit Values', [
    [
      'What is the value of 6 in 682,743?',
      600000,
      'The 6 is in the hundred-thousands column.',
    ],
    [
      'What is the value of 8 in 682,743?',
      80000,
      'The 8 represents 8 ten-thousands.',
    ],
    [
      'What is the value of 2 in 682,743?',
      2000,
      'The 2 is in the thousands column.',
    ],
    [
      'What is the value of 7 in 682,743?',
      700,
      'The 7 is in the hundreds column.',
    ],
    ['What is the value of 4 in 682,743?', 40, 'The 4 is in the tens column.'],
  ]),
  ...arithmetic('Numbers and Notation', [
    [
      'Write 40,000 + 5,000 + 30 + 2 as a number.',
      45032,
      'Put each digit in its correct place: 45,032.',
    ],
    [
      'Round 4,567 to the nearest thousand.',
      5000,
      'The hundreds digit is 5, so round up.',
    ],
    [
      'What number comes immediately after 99,999?',
      100000,
      'Adding one gives 100,000.',
    ],
    [
      'Write the largest number using 4, 9, 2, and 7 once each.',
      9742,
      'Arrange the digits from largest to smallest.',
    ],
    [
      'Write the smallest number using 4, 9, 2, and 7 once each.',
      2479,
      'Arrange the digits from smallest to largest.',
    ],
  ]),
];
export const PATTERN_QUESTIONS = arithmetic('Number Patterns', [
  ['Complete the pattern: 2, 4, 6, 8, __', 10, 'Add 2 each time.'],
  ['Complete the pattern: 5, 10, 15, 20, __', 25, 'Add 5 each time.'],
  ['Complete the pattern: 100, 90, 80, 70, __', 60, 'Subtract 10 each time.'],
  ['Complete the pattern: 3, 6, 12, 24, __', 48, 'Multiply by 2 each time.'],
  [
    'Complete the pattern: 1, 4, 9, 16, __',
    25,
    'These are square numbers: 1², 2², 3², 4², 5².',
  ],
]);
function writtenReview(
  section: string,
  questions: readonly QuizQuestion[],
): WrittenQuestion[] {
  return questions.map((question) => ({
    id: question.id,
    section,
    prompt: `${question.prompt} (${question.options.join(' / ')})`,
    answer: question.options[question.correctIndex],
    explanation: question.explanation,
    kind: 'text',
  }));
}
export const ENGLISH_WORKSHEET_QUESTIONS = writtenReview(
  'Parts of Speech',
  PARTS_OF_SPEECH_QUESTIONS,
);
export const SCIENCE_WORKSHEET_QUESTIONS = writtenReview(
  'Living Things',
  LIVING_THINGS_QUESTIONS,
);
export const SENTENCE_QUESTIONS: readonly WrittenQuestion[] = [
  ['The sun is shining.', 'statement'],
  ['Where is your book?', 'question'],
  ['Please close the door.', 'command'],
  ['What a wonderful day!', 'exclamation'],
  ['I enjoy reading.', 'statement'],
  ['Have you finished?', 'question'],
  ['Sit down, please.', 'command'],
  ['That is amazing!', 'exclamation'],
].map(([sentence, answer], index) => ({
  id: `sentence-${index + 1}`,
  section: 'Sentence Types',
  prompt: `Identify the sentence type (statement, question, command, or exclamation): “${sentence}”`,
  answer,
  kind: 'text',
  explanation:
    answer === 'question'
      ? 'This sentence asks something.'
      : answer === 'command'
        ? 'This sentence tells someone what to do.'
        : answer === 'exclamation'
          ? 'This sentence expresses strong feeling.'
          : 'This sentence gives information.',
}));
