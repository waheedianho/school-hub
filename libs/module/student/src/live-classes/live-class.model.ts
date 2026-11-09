import { PresentationSlide, UiTone } from '@school-hub/ui-elements';
import { LearnerSubjectId } from '../data/subject-catalog.data';
export type LiveClassStatus = 'upcoming' | 'live' | 'ended';
export type LessonSlide = PresentationSlide;
export interface ClassPracticeQuestion {
  id: string;
  prompt: string;
  answer: string;
  explanation: string;
}
export interface LiveClass {
  id: string;
  title: string;
  description: string;
  subjectId: LearnerSubjectId;
  subject: string;
  lessonId: string;
  tutor: string;
  tutorImage: string;
  icon: string;
  tone: UiTone;
  startsAt: string;
  endsAt: string;
  code: string;
  capacity: number;
  enrolled: number;
  accessible: boolean;
  attended: boolean;
  objectives: readonly string[];
  vocabulary: readonly { word: string; meaning: string }[];
  slides: readonly LessonSlide[];
  practice: readonly ClassPracticeQuestion[];
  worksheetId?: string;
  portfolioId?: string;
}
export interface LocalClassMessage {
  id: string;
  text: string;
  at: number;
}
export interface LiveClassDraft {
  classId: string;
  sessionOpen: boolean;
  joinedAt?: number;
  elapsedSeconds: number;
  notes: string;
  chatDraft: string;
  messages: readonly LocalClassMessage[];
  reactions: readonly string[];
  answers: readonly string[];
  checked: boolean;
  slide: number;
  handRaised: boolean;
  saved: boolean;
}
