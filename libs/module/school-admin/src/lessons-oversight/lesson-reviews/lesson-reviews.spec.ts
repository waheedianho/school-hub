import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonReviewsComponent } from './lesson-reviews';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('LessonReviewsComponent', () => {
  let component: LessonReviewsComponent;
  let fixture: ComponentFixture<LessonReviewsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonReviewsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonReviewsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render lesson reviews list', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Lesson Reviews & Approvals');
    expect(compiled.textContent).toContain('Living Things');
    expect(compiled.textContent).toContain('Our Government');
  });

  it('should handle approve, revision request, and preview actions', () => {
    const rev = store.lessonReviews()[0];
    component.onApprove(rev);
    expect(store.setupSaveStatus()).toContain('Lesson plan approved');

    const rev2 = store.lessonReviews()[1];
    component.onRequestRevision(rev2);
    expect(store.setupSaveStatus()).toContain('Revision requested');

    component.onPreviewMaterials(rev);
    expect(store.setupSaveStatus()).toContain('Previewing');
  });
});
