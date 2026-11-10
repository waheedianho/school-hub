import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentsSidebarComponent } from './assessments-sidebar';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('AssessmentsSidebarComponent', () => {
  let component: AssessmentsSidebarComponent;
  let fixture: ComponentFixture<AssessmentsSidebarComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsSidebarComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsSidebarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display sidebar summary and attention badges', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Assessment Summary');
    expect(compiled.textContent).toContain('Attention Needed');
    expect(compiled.textContent).toContain('128');
    expect(compiled.textContent).toContain('84.7%');
  });

  it('should trigger store action on attention click', () => {
    const spy = vi.spyOn(store, 'toggleAssessmentAttentionFilter');
    const firstAttention = store.assessmentAttentionItems()[0];
    component.toggleAttention(firstAttention);
    expect(spy).toHaveBeenCalledWith(firstAttention.filterKey);
  });

  it('should trigger create assessment modal on button click', () => {
    const spy = vi.spyOn(store, 'openCreateAssessmentModal');
    component.onCreateAssessment();
    expect(spy).toHaveBeenCalled();
  });
});
