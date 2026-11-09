export type ConversationFilter =
  | 'All'
  | 'Learners'
  | 'Parents'
  | 'Classes'
  | 'Unread';

export interface ConversationItem {
  id: string;
  name: string;
  type: 'parent' | 'class' | 'learner' | 'admin';
  subtitle: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  avatar: string;
  isOnline?: boolean;
  relationship?: string;
  learnerName?: string;
  className?: string;
  subject?: string;
  joinedDate?: string;
}

export interface ChatMessageAttachment {
  name: string;
  format: 'PDF' | 'DOCX' | 'XLSX' | 'MP4' | 'IMG';
  size: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: 'incoming' | 'outgoing';
  senderName: string;
  avatar?: string;
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  attachment?: ChatMessageAttachment;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  snippet: string;
  audience: string;
  className: string;
  subject?: string;
  priority: 'High' | 'Medium' | 'Low' | 'Urgent';
  body?: string;
  hasAttachment?: boolean;
  attachmentName?: string;
}

export interface MessageQuickTemplate {
  id: string;
  label: string;
  templateText: string;
}

export const TEACHER_CONVERSATIONS: ConversationItem[] = [
  {
    id: 'conv-1',
    name: 'Hajia A. Ibrahim',
    type: 'parent',
    subtitle: 'Parent of Maryam Ibrahim (JSS 1A)',
    lastMessage: 'Thank you, Mr. Tunde. We will work on...',
    time: '10:24 AM',
    unreadCount: 2,
    avatar: 'assets/images/users/user1.jpg',
    isOnline: true,
    relationship: 'Parent',
    learnerName: 'Maryam Ibrahim',
    className: 'JSS 1A',
    subject: 'Mathematics',
    joinedDate: 'Aug 18, 2024',
  },
  {
    id: 'conv-2',
    name: 'JSS 1A Class Group',
    type: 'class',
    subtitle: 'JSS 1A Mathematics & Form Group',
    lastMessage:
      'Reminder: Live class starts in 10 minutes. Please join on time.',
    time: '9:15 AM',
    unreadCount: 1,
    avatar: 'groups',
    isOnline: true,
    relationship: 'Class Group',
    className: 'JSS 1A',
    subject: 'Mathematics',
    joinedDate: 'Sep 01, 2024',
  },
  {
    id: 'conv-3',
    name: 'Maryam Ibrahim',
    type: 'learner',
    subtitle: 'Learner (JSS 1A)',
    lastMessage: 'Thanks so much, Mr. Tunde!',
    time: 'Yesterday',
    unreadCount: 0,
    avatar: 'assets/images/users/user2.jpg',
    isOnline: false,
    relationship: 'Learner',
    learnerName: 'Maryam Ibrahim',
    className: 'JSS 1A',
    subject: 'Mathematics',
    joinedDate: 'Aug 18, 2024',
  },
  {
    id: 'conv-4',
    name: 'Daniel Okafor',
    type: 'learner',
    subtitle: 'Learner (JSS 1B)',
    lastMessage: "I've uploaded the assignment now.",
    time: 'Yesterday',
    unreadCount: 1,
    avatar: 'assets/images/users/user3.jpg',
    isOnline: true,
    relationship: 'Learner',
    learnerName: 'Daniel Okafor',
    className: 'JSS 1B',
    subject: 'Mathematics',
    joinedDate: 'Sep 05, 2024',
  },
  {
    id: 'conv-5',
    name: 'School Admin',
    type: 'admin',
    subtitle: 'Academic Administration',
    lastMessage: 'Staff meeting rescheduled to Friday at 3:00 PM.',
    time: 'Mon',
    unreadCount: 0,
    avatar: 'account_balance',
    isOnline: true,
    relationship: 'Administration',
    className: 'All Staff',
    subject: 'General Administration',
    joinedDate: 'Jan 10, 2024',
  },
  {
    id: 'conv-6',
    name: 'Mrs. Folake Adeyemi',
    type: 'parent',
    subtitle: 'Parent of David Adeyemi (JSS 1A)',
    lastMessage: 'David will be absent tomorrow due to a clinic appointment.',
    time: 'May 18',
    unreadCount: 0,
    avatar: 'assets/images/users/user4.jpg',
    isOnline: false,
    relationship: 'Parent',
    learnerName: 'David Adeyemi',
    className: 'JSS 1A',
    subject: 'Mathematics',
    joinedDate: 'Aug 20, 2024',
  },
  {
    id: 'conv-7',
    name: 'JSS 1B Class Group',
    type: 'class',
    subtitle: 'JSS 1B Mathematics',
    lastMessage: 'Please review lesson notes on Fractions before Thursday.',
    time: 'May 16',
    unreadCount: 0,
    avatar: 'groups',
    isOnline: true,
    relationship: 'Class Group',
    className: 'JSS 1B',
    subject: 'Mathematics',
    joinedDate: 'Sep 01, 2024',
  },
  {
    id: 'conv-8',
    name: 'Zainab Bello',
    type: 'learner',
    subtitle: 'Learner (JSS 1C)',
    lastMessage: 'Sir, I have a question about question 4 in the worksheet.',
    time: 'May 14',
    unreadCount: 0,
    avatar: 'assets/images/users/user5.jpg',
    isOnline: false,
    relationship: 'Learner',
    learnerName: 'Zainab Bello',
    className: 'JSS 1C',
    subject: 'Mathematics',
    joinedDate: 'Sep 10, 2024',
  },
];

export const INITIAL_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-1': [
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      sender: 'incoming',
      senderName: 'Hajia A. Ibrahim',
      avatar: 'assets/images/users/user1.jpg',
      text: "Good morning, Mr. Tunde. How is Maryam doing in Mathematics? We're concerned about her recent test score.",
      time: '10:10 AM',
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      sender: 'outgoing',
      senderName: 'Mr. Tunde',
      text: "Good morning, Hajiia. Maryam is a bright and focused learner. She understands the concepts well but needs more practice with word problems and accuracy.\n\nI've attached her latest worksheet with feedback.",
      time: '10:16 AM',
      status: 'read',
      attachment: {
        name: 'Maryam_Ibrahim_Maths_Worksheet.pdf',
        format: 'PDF',
        size: '412 KB',
      },
    },
    {
      id: 'msg-3',
      conversationId: 'conv-1',
      sender: 'incoming',
      senderName: 'Hajia A. Ibrahim',
      avatar: 'assets/images/users/user1.jpg',
      text: 'Thank you, Mr. Tunde. We will work on the areas you highlighted. Please keep us updated.',
      time: '10:19 AM',
    },
    {
      id: 'msg-4',
      conversationId: 'conv-1',
      sender: 'outgoing',
      senderName: 'Mr. Tunde',
      text: "You're welcome. I'll share her next progress update after the end of term assessment.",
      time: '10:22 AM',
      status: 'read',
    },
  ],
  'conv-2': [
    {
      id: 'msg-2-1',
      conversationId: 'conv-2',
      sender: 'outgoing',
      senderName: 'Mr. Tunde',
      text: 'Good morning Class, remember to bring your geometry sets to our live session today.',
      time: '8:45 AM',
      status: 'read',
    },
    {
      id: 'msg-2-2',
      conversationId: 'conv-2',
      sender: 'incoming',
      senderName: 'JSS 1A Bot',
      text: 'Reminder: Live class starts in 10 minutes. Please join on time.',
      time: '9:15 AM',
    },
  ],
  'conv-3': [
    {
      id: 'msg-3-1',
      conversationId: 'conv-3',
      sender: 'incoming',
      senderName: 'Maryam Ibrahim',
      avatar: 'assets/images/users/user2.jpg',
      text: 'Thanks so much, Mr. Tunde! I have finished the practice questions on decimals.',
      time: 'Yesterday',
    },
    {
      id: 'msg-3-2',
      conversationId: 'conv-3',
      sender: 'outgoing',
      senderName: 'Mr. Tunde',
      text: 'Well done Maryam! Keep up the great effort.',
      time: 'Yesterday',
      status: 'read',
    },
  ],
  'conv-4': [
    {
      id: 'msg-4-1',
      conversationId: 'conv-4',
      sender: 'incoming',
      senderName: 'Daniel Okafor',
      avatar: 'assets/images/users/user3.jpg',
      text: "I've uploaded the assignment now.",
      time: 'Yesterday',
    },
  ],
  'conv-5': [
    {
      id: 'msg-5-1',
      conversationId: 'conv-5',
      sender: 'incoming',
      senderName: 'School Admin',
      avatar: 'account_balance',
      text: 'Staff meeting rescheduled to Friday at 3:00 PM.',
      time: 'Mon',
    },
  ],
};

export const MESSAGE_QUICK_TEMPLATES: MessageQuickTemplate[] = [
  {
    id: 'progress-update',
    label: 'Progress Update',
    templateText:
      'Hello, I would like to share a quick update on your performance in Mathematics this week. Keep up the consistent effort!',
  },
  {
    id: 'homework-reminder',
    label: 'Homework Reminder',
    templateText:
      'Friendly reminder: Please ensure the current homework assignment is submitted before the deadline tomorrow.',
  },
  {
    id: 'missing-submission',
    label: 'Missing Submission',
    templateText:
      'Notice: We noticed your latest worksheet assignment has not been submitted yet. Please submit it as soon as possible.',
  },
  {
    id: 'parent-followup',
    label: 'Parent Follow-up',
    templateText:
      'Dear Parent, following up on our recent conversation regarding lesson participation and study schedule. Please let me know if you have any questions.',
  },
];

export const RECENT_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'Mid-Term Assessment Notice',
    date: 'May 20',
    time: '10:00 AM',
    snippet:
      'Mid-term assessment begins on May 27, 2025. Please ensure all assignments...',
    audience: 'Selected Class',
    className: 'JSS 1A',
    subject: 'Mathematics',
    priority: 'Medium',
    body: 'Dear Learners of JSS 1A,\nThis is to inform you that the Mid-Term Assessment for Mathematics will hold as scheduled below.\n• Date: Friday, May 24, 2024\n• Time: 10:00 AM – 12:00 PM\n• Venue: Main Hall\n\nPlease ensure you revise all topics covered so far and arrive on time. Bring all required materials including your calculator, mathematical set, and writing tools.\n\nThank you.',
    hasAttachment: true,
    attachmentName: 'Mid-Term_Topics_List.pdf',
  },
  {
    id: 'ann-2',
    title: 'Live Class Schedule Update',
    date: 'May 16',
    time: '10:00 AM',
    snippet: 'Mathematics live class will hold on Friday at 10:00 AM.',
    audience: 'All Classes',
    className: 'JSS 1A, JSS 1B',
    subject: 'Mathematics',
    priority: 'High',
    body: 'Please take note that the Friday Mathematics live class has been updated to start promptly at 10:00 AM. Attendance is compulsory.',
  },
  {
    id: 'ann-3',
    title: 'Holiday Break Notice',
    date: 'May 15',
    time: '8:00 AM',
    snippet: 'School will be closed from May 30 – June 2, 2025.',
    audience: 'All Classes',
    className: 'All Classes',
    priority: 'Low',
    body: 'School will be closed for the public holiday break from May 30 to June 2, 2025. Normal classes will resume on Tuesday, June 3.',
  },
];

export const COMMUNICATION_GUIDELINES: string[] = [
  'All communication is professional and respectful.',
  'Messages are logged for safety and accountability.',
  'Do not share personal contact information.',
  'Use clear and positive language at all times.',
];

export const ANNOUNCEMENT_GUIDELINES: string[] = [
  'Be clear, concise, and respectful.',
  'Include all relevant dates and instructions.',
  'Avoid using all caps and excessive emojis.',
  'Ensure attachments are relevant and accessible.',
];
