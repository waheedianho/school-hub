import {
  LearnerSubjectId,
  LEARNER_SUBJECTS,
} from '../data/subject-catalog.data';
import { LearnerResource, ResourceKind } from './resource.model';
import { RESOURCE_VIDEOS } from './resources-videos.data';

export const RESOURCE_TYPES = [
  { id: 'all', label: 'All' },
  { id: 'note', label: 'Notes' },
  { id: 'video', label: 'Videos' },
  { id: 'past-question', label: 'Past Questions' },
  { id: 'download', label: 'Downloads' },
  { id: 'link', label: 'Links' },
];
export const RESOURCE_KINDS = {
  note: { label: 'Note', icon: 'ri-file-text-line', tone: 'green' as const },
  video: {
    label: 'Video',
    icon: 'ri-play-circle-line',
    tone: 'orange' as const,
  },
  'past-question': {
    label: 'Past Question',
    icon: 'ri-question-line',
    tone: 'blue' as const,
  },
  download: {
    label: 'Download',
    icon: 'ri-download-line',
    tone: 'red' as const,
  },
  link: { label: 'Link', icon: 'ri-links-line', tone: 'purple' as const },
};
function resource(
  id: string,
  title: string,
  kind: ResourceKind,
  subjectId: LearnerSubjectId,
  description: string,
  sections: readonly [string, ...string[]][],
  options: Partial<LearnerResource> = {},
): LearnerResource {
  return {
    id,
    title,
    kind,
    subjectId,
    description,
    sections: sections.map(([title, ...paragraphs]) => ({ title, paragraphs })),
    topicIds: [],
    term: 'all',
    addedAt: '2026-10-20T12:00:00+01:00',
    featured: false,
    available: true,
    tone:
      subjectId === 'english-language'
        ? 'purple'
        : subjectId === 'mathematics'
          ? 'blue'
          : 'green',
    symbol:
      subjectId === 'english-language'
        ? 'Aa'
        : subjectId === 'mathematics'
          ? '123'
          : '✧',
    objectives: sections.slice(0, 3).map(([title]) => title),
    relatedIds: [],
    ...options,
  };
}
function video(
  id: string,
  subjectId: LearnerSubjectId,
  lessonId: string,
  description: string,
  options: Partial<LearnerResource> = {},
): LearnerResource {
  const clip = RESOURCE_VIDEOS[id];
  return resource(
    id,
    {
      'parts-of-speech': 'Parts of Speech Explained',
      'direct-indirect-speech': 'Direct and Indirect Speech',
      'whole-number-operations': 'Whole Numbers: Operations',
      'living-things': 'Living and Non-living Things',
    }[id] ?? id,
    'video',
    subjectId,
    description,
    clip.chapters.map((chapter) => [
      chapter.title,
      chapter.text,
      chapter.example,
    ]),
    {
      lessonId,
      video: clip,
      topicIds: [lessonId],
      objectives: clip.chapters.slice(1, 5).map((chapter) => chapter.title),
      ...options,
    },
  );
}
export const LEARNER_RESOURCES: readonly LearnerResource[] = [
  video(
    'parts-of-speech',
    'english-language',
    'parts-of-speech',
    'Learn eight parts of speech through clear definitions and everyday examples.',
    {
      featured: true,
      addedAt: '2026-10-28T12:00:00+01:00',
      relatedIds: [
        'parts-of-speech-summary',
        'noun-worksheets',
        'english-revision-paper',
        'common-sentence-errors',
      ],
    },
  ),
  resource(
    'common-sentence-errors',
    'Common Sentence Errors',
    'note',
    'english-language',
    'Identify and correct common errors in English sentences.',
    [
      [
        'Write a complete thought',
        'A complete sentence has a subject and a predicate. “The children played outside” expresses a complete thought. “Because it rained” needs another clause to complete the thought.',
      ],
      [
        'Match subject and verb',
        'Use “She reads” with a singular subject and “They read” with a plural subject. Check the subject before choosing the verb.',
      ],
      [
        'Use punctuation carefully',
        'Begin with a capital letter and end with suitable punctuation. Avoid joining complete sentences with only a comma. Write “I finished my work. Then I went outside.”',
      ],
      [
        'Try it',
        'Correct: “she walk to school every day”',
        'Answer: “She walks to school every day.” Capitalise the first word, use walks, and add a full stop.',
      ],
    ],
    {
      featured: true,
      lessonId: 'simple-sentences',
      topicIds: ['simple-sentences', 'subject-predicate'],
      relatedIds: ['parts-of-speech', 'english-revision-paper'],
    },
  ),
  resource(
    'english-revision-paper',
    'JSS 1 English Practice Questions',
    'past-question',
    'english-language',
    'An original exam-style revision set with answer explanations.',
    [
      [
        'About this practice set',
        'SchoolHub sample revision material. These original questions are not an official examination paper or a reproduction of a past exam. Try the questions before reading the answers.',
      ],
      [
        'Questions',
        '1. What is the subject in “The small dog barked loudly”?',
        '2. What is the verb in “Amina writes carefully”?',
        '3. What part of speech is “blue” in “a blue bag”?',
        '4. Replace “Mary and Tunde” with a pronoun: “Mary and Tunde are friends.”',
        '5. Write the plural of child.',
        '6. Add punctuation: “where is my book”',
      ],
      [
        'Answers and explanations',
        '1. The small dog. It is who the sentence is about.',
        '2. Writes. It expresses an action.',
        '3. Adjective. Blue describes the bag.',
        '4. They are friends.',
        '5. Children. Child has an irregular plural.',
        '6. Where is my book? Capitalise the first word and use a question mark.',
      ],
    ],
    {
      featured: true,
      lessonId: 'parts-of-speech',
      topicIds: ['parts-of-speech', 'simple-sentences'],
      relatedIds: ['parts-of-speech', 'common-sentence-errors'],
    },
  ),
  resource(
    'letter-writing-format',
    'Letter Writing Format & Examples',
    'note',
    'english-language',
    'Plan a clear formal or informal letter.',
    [
      [
        'Choose your audience',
        'Use an informal letter for someone you know personally. A formal letter uses polite, clear language for an organisation or an unfamiliar recipient.',
      ],
      [
        'Organise an informal letter',
        'Include your address and date, a greeting, an opening, the main message, a closing, and your name. Keep ideas in paragraphs.',
      ],
      [
        'Plan a formal letter',
        'Include the sender’s address, date, recipient’s address, salutation, heading or subject, clear paragraphs, a suitable closing, and the sender’s name. Follow your school’s conventions.',
      ],
      [
        'Practice task',
        'Write an informal letter inviting a friend to a school reading event. Include when and where the event will take place and why your friend might enjoy it.',
      ],
    ],
    {
      featured: true,
      artTone: 'orange',
      term: 'second',
      topicIds: ['letter-writing'],
      relatedIds: ['common-sentence-errors', 'comprehension-practice'],
    },
  ),
  video(
    'direct-indirect-speech',
    'english-language',
    'simple-sentences',
    'Convert direct speech into a report of what was said.',
    {
      addedAt: '2026-11-05T12:00:00+01:00',
      topicIds: ['direct-indirect-speech'],
      relatedIds: ['common-sentence-errors', 'parts-of-speech'],
    },
  ),
  resource(
    'comprehension-practice',
    'Comprehension Passage – Practice Set 1',
    'note',
    'english-language',
    'Read a short passage and answer questions using evidence.',
    [
      [
        'Read the passage',
        'Every Friday, Amina helps at the school garden. She waters the seedlings early, before the sun becomes hot. Last week she noticed that one seedling was bending towards the light. She moved the pot to give all the seedlings enough space.',
      ],
      [
        'Questions',
        '1. When does Amina help at the garden?',
        '2. Why does she water the seedlings early?',
        '3. What did she notice last week?',
        '4. Why did she move the pot?',
      ],
      [
        'Suggested answers',
        '1. Every Friday.',
        '2. To water them before the sun becomes hot.',
        '3. One seedling was bending towards the light.',
        '4. To give the seedlings enough space. Use evidence from the passage in your own answer.',
      ],
    ],
    {
      addedAt: '2026-11-04T12:00:00+01:00',
      topicIds: ['comprehension'],
      relatedIds: ['letter-writing-format', 'common-sentence-errors'],
    },
  ),
  resource(
    'english-language-practice-2026',
    'English Language JSS 1 – Revision Set',
    'past-question',
    'english-language',
    'Grammar and sentence-building practice with answers.',
    [
      [
        'Original practice material',
        'This is a SchoolHub sample revision set, not an official past examination paper.',
      ],
      [
        'Questions',
        '1. Identify the predicate: “Our teacher explains clearly.”',
        '2. Give an adjective that could describe a road.',
        '3. Join “I was tired” and “I finished my work” with a suitable conjunction.',
        '4. Write a sentence containing a pronoun.',
      ],
      [
        'Suggested answers',
        '1. Explains clearly.',
        '2. Examples include narrow, wide, busy, or long.',
        '3. I was tired, but I finished my work.',
        '4. Example: They won the match. Other complete sentences with pronouns can also be correct.',
      ],
    ],
    {
      lessonId: 'simple-sentences',
      topicIds: ['simple-sentences', 'parts-of-speech'],
      addedAt: '2026-11-03T12:00:00+01:00',
    },
  ),
  resource(
    'noun-worksheets',
    'Noun Worksheets',
    'download',
    'english-language',
    'Practise identifying and using nouns.',
    [
      [
        'Instructions',
        'Write your answers in your notebook. A noun names a person, place, thing, or idea.',
      ],
      [
        'Find the nouns',
        '1. The teacher opened the window.',
        '2. Amina carried a basket to the market.',
        '3. Kindness helps a community grow.',
      ],
      [
        'Check your work',
        '1. Teacher, window.',
        '2. Amina, basket, market.',
        '3. Kindness, community. Kindness is an abstract noun.',
      ],
    ],
    {
      lessonId: 'parts-of-speech',
      topicIds: ['parts-of-speech', 'nouns'],
      addedAt: '2026-11-02T12:00:00+01:00',
      relatedIds: ['parts-of-speech', 'parts-of-speech-summary'],
    },
  ),
  resource(
    'british-council-grammar',
    'Useful Link: British Council Grammar',
    'link',
    'english-language',
    'Explore grammar explanations and practice on the British Council website.',
    [
      [
        'External learning website',
        'Open the British Council’s grammar section in another tab. The external site controls its own content and account requirements.',
      ],
    ],
    {
      externalUrl:
        'https://learnenglish.britishcouncil.org/free-resources/grammar',
      addedAt: '2026-11-01T12:00:00+01:00',
      topicIds: ['parts-of-speech', 'simple-sentences'],
    },
  ),
  resource(
    'parts-of-speech-summary',
    'Parts of Speech Summary',
    'download',
    'english-language',
    'Keep a concise reference to the eight parts of speech.',
    RESOURCE_VIDEOS['parts-of-speech'].chapters.map((chapter) => [
      chapter.title,
      chapter.text,
      chapter.example,
    ]),
    {
      lessonId: 'parts-of-speech',
      topicIds: ['parts-of-speech'],
      relatedIds: ['parts-of-speech', 'noun-worksheets'],
    },
  ),
  video(
    'whole-number-operations',
    'mathematics',
    'whole-numbers',
    'Choose the correct operation, show your working, and check your answer.',
    {
      topicIds: ['whole-numbers', 'place-value', 'addition-facts'],
      relatedIds: [
        'whole-numbers-notes',
        'place-value-notes',
        'operations-practice',
      ],
    },
  ),
  resource(
    'whole-numbers-notes',
    'Whole Numbers: Study Notes',
    'note',
    'mathematics',
    'Review counting, place value, and the four operations.',
    [
      [
        'Understand whole numbers',
        'Whole numbers are 0, 1, 2, 3, and so on. They do not include fractions or negative numbers.',
      ],
      [
        'Choose and explain an operation',
        'Add to combine quantities. Subtract to find a difference. Multiply equal groups. Divide to share into equal groups.',
      ],
      [
        'Show your working',
        '245 + 378 = 623. Align the place-value columns. Regroup the ones and tens when needed. Check by subtracting one addend from the sum.',
      ],
    ],
    {
      lessonId: 'whole-numbers',
      topicIds: ['whole-numbers', 'place-value'],
      relatedIds: ['whole-number-operations', 'operations-practice'],
    },
  ),
  resource(
    'place-value-notes',
    'Place Value Made Clear',
    'note',
    'mathematics',
    'Identify the value of a digit in a whole number.',
    [
      [
        'Read the positions',
        'From right to left, the first positions are ones, tens, hundreds, thousands, ten-thousands, and hundred-thousands.',
      ],
      [
        'Expand a number',
        '4,268 = 4,000 + 200 + 60 + 8. The digit 6 has value 60 because it is in the tens place.',
      ],
      [
        'Try and check',
        'What is the value of 7 in 17,305? Answer: 7,000. The digit is in the thousands place.',
      ],
    ],
    {
      lessonId: 'whole-numbers',
      topicIds: ['place-value', 'whole-numbers'],
      relatedIds: ['whole-number-operations', 'number-ordering'],
    },
  ),
  resource(
    'number-ordering',
    'Ordering Whole Numbers',
    'note',
    'mathematics',
    'Put whole numbers in ascending or descending order.',
    [
      [
        'Compare before ordering',
        'Compare the largest place value first. If those digits are equal, compare the next place to the right.',
      ],
      [
        'Ascending order',
        'Ascending means smallest to largest. Example: 2,405; 2,450; 2,504.',
      ],
      [
        'Descending order',
        'Descending means largest to smallest. Example: 2,504; 2,450; 2,405. Check each adjacent pair.',
      ],
    ],
    {
      lessonId: 'whole-numbers',
      topicIds: ['number-ordering', 'whole-numbers'],
      relatedIds: ['comparing-numbers', 'place-value-notes'],
    },
  ),
  resource(
    'comparing-numbers',
    'Greater Than / Less Than',
    'note',
    'mathematics',
    'Use comparison symbols and explain your choice.',
    [
      [
        'Use the symbols',
        '> means greater than. < means less than. = means equal to. The open side faces the larger number.',
      ],
      [
        'Compare place values',
        '4,250 > 4,205. The thousands and hundreds are equal, but 5 tens is greater than 0 tens.',
      ],
      [
        'Try it',
        'Compare 7,099 and 7,100. Answer: 7,099 < 7,100. The hundreds digit decides the comparison.',
      ],
    ],
    {
      lessonId: 'whole-numbers',
      topicIds: ['comparing-numbers', 'place-value', 'whole-numbers'],
      relatedIds: ['number-ordering', 'place-value-notes'],
    },
  ),
  resource(
    'mathematics-revision-paper',
    'JSS 1 Mathematics Practice Questions',
    'past-question',
    'mathematics',
    'An original number-skills revision set with worked answers.',
    [
      [
        'About this set',
        'SchoolHub original practice material, not an official past examination paper. Show your working before checking the answers.',
      ],
      [
        'Questions',
        '1. Calculate 245 + 378.',
        '2. Calculate 5,000 - 1,287.',
        '3. Calculate 24 x 5.',
        '4. Find 120 divided by 5.',
        '5. Round 347 to the nearest ten.',
      ],
      [
        'Worked answers',
        '1. 623. Regroup the ones and tens.',
        '2. 3,713. Regroup carefully across the zeros.',
        '3. 120. Use 20 x 5 + 4 x 5.',
        '4. 24. Check: 24 x 5 = 120.',
        '5. 350. The ones digit is 7, so round up.',
      ],
    ],
    {
      lessonId: 'whole-numbers',
      topicIds: ['whole-numbers', 'rounding-numbers'],
      relatedIds: ['whole-number-operations', 'operations-practice'],
    },
  ),
  resource(
    'operations-practice',
    'Whole Number Operations – Practice Sheet',
    'download',
    'mathematics',
    'A short printable activity for addition, subtraction, multiplication, and division.',
    [
      [
        'Instructions',
        'Use one line for each place value. Show each step and check with an inverse operation.',
      ],
      [
        'Questions',
        '1. 326 + 487',
        '2. 2,000 - 765',
        '3. 36 x 4',
        '4. 144 divided by 4',
      ],
      ['Answers', '1. 813', '2. 1,235', '3. 144', '4. 36'],
    ],
    {
      lessonId: 'whole-numbers',
      topicIds: ['whole-numbers', 'place-value'],
      relatedIds: ['whole-number-operations', 'mathematics-revision-paper'],
    },
  ),
  resource(
    'khan-academy-arithmetic',
    'Useful Link: Khan Academy Arithmetic',
    'link',
    'mathematics',
    'Explore arithmetic explanations and practice on Khan Academy.',
    [
      [
        'External learning website',
        'Open the arithmetic course on Khan Academy in another tab. The external site controls its own content and account requirements.',
      ],
    ],
    {
      externalUrl: 'https://www.khanacademy.org/math/arithmetic',
      topicIds: ['whole-numbers', 'place-value'],
    },
  ),
  video(
    'living-things',
    'basic-science',
    'living-things',
    'Use life processes to classify everyday examples.',
    {
      relatedIds: [
        'living-things-notes',
        'classification-practice',
        'plant-parts-notes',
      ],
    },
  ),
  resource(
    'living-things-notes',
    'Living and Non-living Things – Notes',
    'note',
    'basic-science',
    'Look for evidence of life processes, rather than movement alone.',
    [
      [
        'Look for life processes',
        'Living things grow, respire, reproduce, respond, excrete, and need nutrients. Plants and animals carry out life processes in different ways.',
      ],
      [
        'Use evidence',
        'A car can move but does not grow or reproduce. A seed is living even when it is not visibly growing.',
      ],
      [
        'Explain an example',
        'A tree is living because it grows, takes in materials, and carries out life processes. A stone does not carry out these processes.',
      ],
    ],
    {
      lessonId: 'living-things',
      topicIds: ['living-things'],
      relatedIds: ['living-things', 'classification-practice'],
    },
  ),
  resource(
    'plant-parts-notes',
    'Parts of a Plant',
    'note',
    'basic-science',
    'Explore roots, stems, leaves, and their jobs.',
    [
      [
        'Roots',
        'Roots anchor the plant and absorb water and minerals from the soil.',
      ],
      [
        'Stems',
        'The stem supports leaves and flowers and transports water and other materials.',
      ],
      [
        'Leaves',
        'Green leaves use light to help the plant make food. Plants also need water, air, and suitable conditions.',
      ],
    ],
    {
      lessonId: 'plant-parts',
      topicIds: ['plant-parts', 'living-things'],
      relatedIds: ['living-things', 'living-things-notes'],
    },
  ),
  resource(
    'classification-practice',
    'Living Things – Classification Sheet',
    'download',
    'basic-science',
    'Classify familiar objects and explain your evidence.',
    [
      [
        'Instructions',
        'Decide whether each example is living or non-living. Give a reason using life processes.',
      ],
      [
        'Examples to classify',
        'A seed; a wooden chair; a cat; a stone; a tree; a moving car.',
      ],
      [
        'Suggested answers',
        'Living: a seed, a cat, and a tree. Non-living: a wooden chair, a stone, and a moving car. A chair is made from once-living material, but the chair itself does not carry out life processes.',
      ],
    ],
    {
      lessonId: 'living-things',
      topicIds: ['living-things'],
      relatedIds: ['living-things', 'living-things-notes'],
    },
  ),
  resource(
    'lcm-preview',
    'Lowest Common Multiple – Preview',
    'note',
    'mathematics',
    'This resource will unlock with the upcoming LCM lesson.',
    [
      [
        'Coming up',
        'Find common multiples and select the smallest positive one. This sample resource is currently locked.',
      ],
    ],
    { available: false, term: 'first', lessonId: 'lcm', topicIds: ['lcm'] },
  ),
];
export function resourceSubject(resource: LearnerResource): string {
  return (
    LEARNER_SUBJECTS.find((subject) => subject.id === resource.subjectId)
      ?.name ?? ''
  );
}
