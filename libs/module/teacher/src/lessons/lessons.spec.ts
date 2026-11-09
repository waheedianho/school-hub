import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { TeacherLessonsComponent } from './lessons';
import { TEACHER_TOPIC_DELIVERY_PACKS } from '../data/teacher-lessons.data';

describe('TeacherLessonsComponent', () => {
  let component: TeacherLessonsComponent;
  let fixture: ComponentFixture<TeacherLessonsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherLessonsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherLessonsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component and render page header', () => {
    expect(component).toBeTruthy();
    const title = fixture.nativeElement.querySelector('.page-title');
    expect(title.textContent).toContain('Lessons & Delivery Packs');

    const subtitle = fixture.nativeElement.querySelector('.page-subtitle');
    expect(subtitle.textContent).toContain('Manage lesson packs');
  });

  it('should render all top metrics', () => {
    const metricsComponent = fixture.nativeElement.querySelector(
      'school-hub-lessons-metrics',
    );
    expect(metricsComponent).toBeTruthy();
    expect(component.metrics.length).toBe(5);
  });

  it('should filter packs by search query', () => {
    expect(component.filteredPacks().length).toBe(4);

    component.onFilterChange({
      term: 'Term 1 2025/2026',
      classId: 'All Classes',
      subject: 'All Subjects',
      status: 'All Status',
      search: 'Sentence Structure',
    });

    expect(component.filteredPacks().length).toBe(1);
    expect(component.filteredPacks()[0].topic).toBe('Sentence Structure');
  });

  it('should update selected pack on onSelectPack', () => {
    component.onSelectPack(TEACHER_TOPIC_DELIVERY_PACKS[1]);
    expect(component.selectedPack().title).toContain(
      'Sentence Structure – Week 5 Pack',
    );
  });

  it('should navigate on onOpenPack and onEditPack', () => {
    let navigatedCommands: unknown[] | undefined;
    let navigatedExtras:
      | { queryParams?: { packId?: string; edit?: string } }
      | undefined;
    router.navigate = ((commands: unknown[], extras?: unknown) => {
      navigatedCommands = commands;
      navigatedExtras = extras as {
        queryParams?: { packId?: string; edit?: string };
      };
      return Promise.resolve(true);
    }) as Router['navigate'];

    component.onOpenPack(component.selectedPack());
    expect(navigatedCommands).toEqual(['/teacher/lessons']);
    expect(navigatedExtras?.queryParams?.packId).toBe('tdp-1');

    component.onEditPack(component.selectedPack());
    expect(navigatedExtras?.queryParams?.edit).toBe('tdp-1');
  });

  it('should render subgrid and right-column components', () => {
    const table = fixture.nativeElement.querySelector(
      'school-hub-topic-delivery-packs-table',
    );
    const timeline = fixture.nativeElement.querySelector(
      'school-hub-lesson-timeline',
    );
    const completion = fixture.nativeElement.querySelector(
      'school-hub-pack-completion-status',
    );
    const quickActions = fixture.nativeElement.querySelector(
      'school-hub-lessons-quick-actions',
    );
    const overview = fixture.nativeElement.querySelector(
      'school-hub-selected-pack-overview',
    );
    const notes = fixture.nativeElement.querySelector(
      'school-hub-misconception-notes',
    );

    expect(table).toBeTruthy();
    expect(timeline).toBeTruthy();
    expect(completion).toBeTruthy();
    expect(quickActions).toBeTruthy();
    expect(overview).toBeTruthy();
    expect(notes).toBeTruthy();
  });
});
