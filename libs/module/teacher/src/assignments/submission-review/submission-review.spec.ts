import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SubmissionReviewComponent } from './submission-review';

describe('SubmissionReviewComponent', () => {
  let component: SubmissionReviewComponent;
  let fixture: ComponentFixture<SubmissionReviewComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionReviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmissionReviewComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component and render page header', () => {
    expect(component).toBeTruthy();
    const title = fixture.nativeElement.querySelector('.page-title');
    expect(title.textContent).toContain('Maryam Ibrahim');
  });

  it('should navigate back to /teacher/assignments on onBack', () => {
    let navigatedCommands: unknown[] = [];
    router.navigate = ((commands: unknown[]) => {
      navigatedCommands = commands;
      return Promise.resolve(true);
    }) as unknown as typeof router.navigate;

    component.onBack();
    expect(navigatedCommands).toEqual(['/teacher/assignments']);
  });

  it('should navigate on onScoreSubmitted', () => {
    let navigatedCommands: unknown[] = [];
    router.navigate = ((commands: unknown[]) => {
      navigatedCommands = commands;
      return Promise.resolve(true);
    }) as unknown as typeof router.navigate;

    component.onScoreSubmitted();
    expect(navigatedCommands).toEqual(['/teacher/assignments']);
  });

  it('should render all child review components', () => {
    const viewer = fixture.nativeElement.querySelector(
      'school-hub-submission-worksheet-viewer',
    );
    const rubrics = fixture.nativeElement.querySelector(
      'school-hub-rubric-marking-guide',
    );
    const panel = fixture.nativeElement.querySelector(
      'school-hub-scoring-feedback-panel',
    );

    expect(viewer).toBeTruthy();
    expect(rubrics).toBeTruthy();
    expect(panel).toBeTruthy();
  });
});
