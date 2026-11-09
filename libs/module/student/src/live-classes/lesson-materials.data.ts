import { ClassPracticeQuestion, LiveClass } from './live-class.model';

function materials(
  title: string,
  definition: string,
  objectives: readonly string[],
  vocabulary: LiveClass['vocabulary'],
  questions: readonly [string, string, string][],
): Pick<LiveClass, 'slides' | 'practice' | 'objectives' | 'vocabulary'> {
  const practice: ClassPracticeQuestion[] = questions.map(
    ([prompt, answer, explanation], index) => ({
      id: `question-${index + 1}`,
      prompt,
      answer,
      explanation,
    }),
  );
  return {
    objectives,
    vocabulary,
    practice,
    slides: [
      {
        id: 'introduction',
        title,
        definition,
        bullets: objectives,
        examples: [],
      },
      {
        id: 'examples',
        title: 'Worked Examples',
        definition: 'Read each example and explain how the answer was found.',
        bullets: [],
        examples: practice.map((question) => ({
          lead: question.prompt,
          rest: question.answer,
          note: question.explanation,
        })),
      },
      {
        id: 'your-turn',
        title: 'Your Turn',
        definition: 'Try the in-class activity below, then check your answers.',
        bullets: practice.map((question) => question.prompt),
        examples: [],
      },
      {
        id: 'summary',
        title: 'Summary & Next Steps',
        definition: 'Explain your learning in your own words.',
        bullets: [
          'Review the examples.',
          'Keep a question or example in your notes.',
          'Continue the related lesson or worksheet.',
        ],
        examples: [],
      },
    ],
  };
}

const TOPICS: Partial<
  Record<
    string,
    Pick<LiveClass, 'slides' | 'practice' | 'objectives' | 'vocabulary'>
  >
> = {
  'parts-of-speech': materials(
    'Parts of Speech',
    'Words have different jobs in a sentence. Their use tells us their part of speech.',
    [
      'Identify nouns, verbs, and adjectives.',
      'Explain the job of a pronoun.',
      'Choose words that complete a sentence.',
    ],
    [
      { word: 'Noun', meaning: 'Names a person, place, thing, or idea.' },
      { word: 'Verb', meaning: 'Expresses an action or state.' },
      { word: 'Adjective', meaning: 'Describes a noun or pronoun.' },
      { word: 'Pronoun', meaning: 'Takes the place of a noun or noun phrase.' },
    ],
    [
      [
        'What part of speech is “teacher” in “The teacher smiled”?',
        'noun',
        'Teacher names a person.',
      ],
      [
        'What part of speech is “runs” in “She runs fast”?',
        'verb',
        'Runs expresses an action.',
      ],
      [
        'What part of speech is “red” in “a red bag”?',
        'adjective',
        'Red describes the bag.',
      ],
    ],
  ),
  'plant-parts': materials(
    'Parts of a Plant',
    'Roots, stems, and leaves have different jobs that help a plant live and grow.',
    [
      'Name the main parts of a plant.',
      'Explain how roots and stems help a plant.',
      'Describe the role of leaves.',
    ],
    [
      {
        word: 'Roots',
        meaning: 'Anchor the plant and absorb water and minerals.',
      },
      {
        word: 'Stem',
        meaning: 'Supports the plant and carries water and nutrients.',
      },
      { word: 'Leaves', meaning: 'Use light to help the plant make food.' },
    ],
    [
      [
        'Which plant part absorbs water from the soil?',
        'roots',
        'Roots take in water and minerals.',
      ],
      [
        'Which plant part supports leaves and carries water?',
        'stem',
        'The stem supports the plant and transports water.',
      ],
      [
        'Which plant parts use light to make food?',
        'leaves',
        'Green leaves use light to make food.',
      ],
    ],
  ),
  'rounding-numbers': materials(
    'Rounding Numbers',
    'Rounding finds a nearby number at a chosen place value.',
    [
      'Find the rounding place.',
      'Use the digit to its right to decide.',
      'Check whether an estimate is reasonable.',
    ],
    [
      { word: 'Estimate', meaning: 'A value close enough for a purpose.' },
      { word: 'Nearest', meaning: 'Closest in value.' },
      {
        word: 'Place value',
        meaning: 'The value of a digit determined by its position.',
      },
    ],
    [
      [
        'Round 347 to the nearest ten.',
        '350',
        'The ones digit is 7, so round up.',
      ],
      [
        'Round 1,249 to the nearest hundred.',
        '1200',
        'The tens digit is 4, so round down.',
      ],
      [
        'Round 6,520 to the nearest thousand.',
        '7000',
        'The hundreds digit is 5, so round up.',
      ],
    ],
  ),
  'reading-whole-numbers': materials(
    'Reading Large Numbers',
    'Use place value to read and compare whole numbers.',
    [
      'Identify thousands, hundreds, tens, and ones.',
      'Read numbers in groups.',
      'Compare numbers from the largest place first.',
    ],
    [
      { word: 'Digit', meaning: 'One of the symbols 0 to 9.' },
      {
        word: 'Place value',
        meaning: 'The value of a digit determined by its position.',
      },
    ],
    [
      [
        'What is the value of 6 in 6,205?',
        '6000',
        'The digit 6 is in the thousands place.',
      ],
      [
        'Which is greater: 4,250 or 4,205?',
        '4250',
        'The thousands and hundreds are equal; compare the tens.',
      ],
      [
        'Write two thousand and thirty in digits.',
        '2030',
        'There are two thousands, no hundreds, three tens, and no ones.',
      ],
    ],
  ),
  'number-patterns': materials(
    'Number Patterns',
    'A number pattern follows a rule. Find the rule to continue it.',
    [
      'Describe a pattern rule.',
      'Continue increasing and decreasing sequences.',
      'Check a rule against every step.',
    ],
    [
      { word: 'Sequence', meaning: 'An ordered list of values.' },
      { word: 'Rule', meaning: 'The instruction connecting the terms.' },
    ],
    [
      ['What comes next: 3, 6, 9, 12, …?', '15', 'Add 3 each time.'],
      ['What comes next: 20, 16, 12, …?', '8', 'Subtract 4 each time.'],
      ['What comes next: 2, 4, 8, 16, …?', '32', 'Multiply by 2 each time.'],
    ],
  ),
};

export function classLessonMaterials(lessonId: string): Partial<LiveClass> {
  return TOPICS[lessonId] ?? {};
}
