import { ChatMessage, ResourceListItem } from '@school-hub/ui-elements';
import { LEARNER_PROFILE } from '../../data/learning-context.data';
import { learnerInitials } from '../../data/learner-profile-engine';
import { LiveClass, LiveClassDraft } from '../live-class.model';
import { classNotes } from '../live-class-engine';

export function classroomMessages(
  session: LiveClass,
  draft: LiveClassDraft,
  learnerName = LEARNER_PROFILE.firstName,
  initials = learnerInitials(LEARNER_PROFILE.fullName),
): readonly ChatMessage[] {
  const english = session.subjectId === 'english-language',
    maths = session.subjectId === 'mathematics';
  const seed = [
    {
      id: 'sample-maryam',
      name: 'Maryam B.',
      initials: 'MB',
      role: 'learner' as const,
      text: english
        ? 'Ma, is the subject always a noun?'
        : maths
          ? 'How do we subtract across the zeros?'
          : 'Can a seed be a living thing?',
      reaction: 'heart' as const,
      count: 2,
    },
    {
      id: 'sample-chinedu',
      name: 'Chinedu O.',
      initials: 'CO',
      role: 'learner' as const,
      text: english
        ? 'The subject is who or what the sentence is about.'
        : maths
          ? 'We need to regroup and keep the place-value columns aligned.'
          : 'A seed can grow into a plant when the conditions are right.',
      reaction: 'like' as const,
      count: 1,
    },
    {
      id: 'sample-tutor-1',
      name: session.tutor,
      initials: 'T',
      role: 'tutor' as const,
      text: english
        ? 'Exactly! Well done. Let’s look at more examples.'
        : maths
          ? 'Good explanation. Regroup carefully, then check by adding your answer to the number you subtracted.'
          : 'Well explained. A seed is living, even when it is not visibly growing.',
      reaction: 'heart' as const,
      count: 3,
    },
    {
      id: 'sample-zainab',
      name: 'Zainab I.',
      initials: 'ZI',
      role: 'learner' as const,
      text: english
        ? 'Can a pronoun be the subject too?'
        : maths
          ? 'Can I check a division answer with multiplication?'
          : 'Why is a moving car not a living thing?',
      reaction: 'like' as const,
      count: 0,
    },
    {
      id: 'sample-tutor-2',
      name: session.tutor,
      initials: 'T',
      role: 'tutor' as const,
      text: english
        ? 'Yes, pronouns can be subjects. In “They won the match”, “They” is the subject.'
        : maths
          ? 'Yes. Multiplication and division are inverse operations. Check that the quotient multiplied by the divisor gives the starting number.'
          : 'Movement alone is not enough. A car does not grow, reproduce, or carry out all life processes.',
      reaction: 'like' as const,
      count: 2,
    },
  ];
  if (
    ![
      'simple-sentences',
      'whole-numbers',
      'addition-facts',
      'living-things',
    ].includes(session.lessonId)
  ) {
    seed[0].text = `I am reviewing ${session.title.slice(session.title.indexOf(':') + 1).trim()}. Where should I start?`;
    seed[1].text =
      'The lesson outline has an introduction and worked examples.';
    seed[2].text =
      'Start with the examples, then explain the steps in your own words.';
    seed[3].text = 'Can I keep an example in my lesson notes?';
    seed[4].text =
      'Yes. Save an example and any questions you want to review later.';
  }
  return [
    ...seed.map((message): ChatMessage => {
      const key = `${message.id}:${message.reaction}`;
      const active = draft.reactions.includes(key);
      return {
        ...message,
        image: message.role === 'tutor' ? session.tutorImage : undefined,
        time: 'Example',
        reactions: [
          {
            id: message.reaction,
            label: message.reaction === 'heart' ? 'Heart' : 'Like',
            icon: message.reaction === 'heart' ? '💜' : '👍',
            count: message.count + Number(active),
            active,
          },
        ],
      };
    }),
    ...draft.messages.map(
      (message): ChatMessage => ({
        id: message.id,
        name: `${learnerName} (You)`,
        initials,
        role: 'you',
        time: new Date(message.at).toLocaleTimeString('en-GB', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Africa/Lagos',
        }),
        text: message.text,
        reactions: [
          {
            id: 'heart',
            label: 'Heart',
            icon: '💜',
            count: Number(draft.reactions.includes(`${message.id}:heart`)),
            active: draft.reactions.includes(`${message.id}:heart`),
          },
        ],
      }),
    ),
  ];
}
export function classroomResources(
  session: LiveClass,
): readonly ResourceListItem[] {
  return [
    {
      id: 'lesson-notes',
      title: `Lesson Notes: ${session.title.slice(session.title.indexOf(':') + 1).trim()}`,
      meta: `TXT · ${new TextEncoder().encode(classNotes(session)).length.toLocaleString('en-GB')} bytes`,
      icon: 'ri-file-text-line',
    },
    ...(session.worksheetId
      ? [
          {
            id: 'worksheet',
            title: 'Related Practice Worksheet',
            meta: 'Open your worksheet workspace',
            icon: 'ri-file-edit-line',
            route: ['/student/worksheets', session.worksheetId],
          },
        ]
      : [
          {
            id: 'lesson',
            title: 'Related Lesson & Practice',
            meta: session.subject,
            icon: 'ri-book-open-line',
            route: '/student/lessons',
            queryParams: {
              lessonId: session.lessonId,
              subject: session.subjectId,
            },
          },
        ]),
    ...(session.portfolioId
      ? [
          {
            id: 'portfolio',
            title: 'Apply Your Learning',
            meta: 'Related portfolio task',
            icon: 'ri-briefcase-line',
            route: ['/student/portfolio-tasks', session.portfolioId],
          },
        ]
      : [
          {
            id: 'activity-sheet',
            title: 'In-Class Practice Sheet',
            meta: 'TXT · Questions and answer explanations',
            icon: 'ri-file-list-3-line',
          },
        ]),
  ];
}
