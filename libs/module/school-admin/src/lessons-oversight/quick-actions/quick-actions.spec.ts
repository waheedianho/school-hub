import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonsQuickActionsComponent } from './quick-actions';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('LessonsQuickActionsComponent', () => {
  let component: LessonsQuickActionsComponent;
  let fixture: ComponentFixture<LessonsQuickActionsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsQuickActionsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonsQuickActionsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render 4 quick action cards', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Review Lesson Plans');
    expect(compiled.textContent).toContain('Monitor Coverage');
    expect(compiled.textContent).toContain('View Teacher Activity');
    expect(compiled.textContent).toContain('Generate Oversight Report');
  });

  it('should switch tabs and update store status on action triggers', () => {
    component.triggerAction('review-plans');
    expect(store.activeLessonsTab()).toBe('lesson-reviews');

    component.triggerAction('monitor-coverage');
    expect(store.activeLessonsTab()).toBe('delivery-oversight');

    component.triggerAction('teacher-activity');
    expect(store.activeLessonsTab()).toBe('active-lessons');

    component.triggerAction('oversight-report');
    expect(store.setupSaveStatus()).toContain('oversight report');
  });
});
