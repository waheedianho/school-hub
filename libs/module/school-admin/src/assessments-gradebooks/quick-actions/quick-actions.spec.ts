import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentsQuickActionsComponent } from './quick-actions';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('AssessmentsQuickActionsComponent', () => {
  let component: AssessmentsQuickActionsComponent;
  let fixture: ComponentFixture<AssessmentsQuickActionsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsQuickActionsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsQuickActionsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 4 quick action cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Review Gradebook Completion');
    expect(compiled.textContent).toContain('Check Submission Queue');
    expect(compiled.textContent).toContain('View Moderation Log');
    expect(compiled.textContent).toContain('Generate Assessment Report');
  });

  it('should trigger store tab changes on button clicks', () => {
    const spy = vi.spyOn(store, 'setActiveAssessmentTab');
    component.onReviewGradebooks();
    expect(spy).toHaveBeenCalledWith('gradebooks');

    component.onCheckSubmissions();
    expect(spy).toHaveBeenCalledWith('submissions');

    component.onViewModerationLog();
    expect(spy).toHaveBeenCalledWith('moderation');
  });

  it('should trigger export report on generate button click', () => {
    const spy = vi.spyOn(store, 'exportAssessmentReport');
    component.onGenerateReport();
    expect(spy).toHaveBeenCalled();
  });
});
