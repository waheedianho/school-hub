import { UiTone } from '@school-hub/ui-elements';
import { LearnerSubjectId } from '../data/subject-catalog.data';

export type ResourceKind =
  | 'note'
  | 'video'
  | 'past-question'
  | 'download'
  | 'link';
export interface ResourceChapter {
  title: string;
  text: string;
  example: string;
  start: number;
}
export interface ResourceVideo {
  src: string;
  poster: string;
  captions: string;
  duration: number;
  bytes: number;
  chapters: readonly ResourceChapter[];
}
export interface ResourceSection {
  title: string;
  paragraphs: readonly string[];
}
export interface LearnerResource {
  id: string;
  title: string;
  description: string;
  kind: ResourceKind;
  subjectId: LearnerSubjectId;
  lessonId?: string;
  topicIds: readonly string[];
  term: string;
  addedAt: string;
  featured: boolean;
  available: boolean;
  tone: UiTone;
  artTone?: UiTone;
  symbol: string;
  objectives: readonly string[];
  sections: readonly ResourceSection[];
  relatedIds: readonly string[];
  video?: ResourceVideo;
  externalUrl?: string;
}
export interface PersonalResourceNote {
  id: string;
  text: string;
  at: number;
  position?: number;
}
export interface ResourceRecord {
  resourceId: string;
  saved: boolean;
  liked: boolean;
  completed: boolean;
  viewedAt?: number;
  bookmark?: number;
  position: number;
  notes: readonly PersonalResourceNote[];
}
export interface ResourceDownload {
  resourceId: string;
  name: string;
  bytes: number;
  at: number;
}
export interface ResourceState {
  records: readonly ResourceRecord[];
  downloads: readonly ResourceDownload[];
}
