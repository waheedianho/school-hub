import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentsTableComponent } from './assessments-table';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('AssessmentsTableComponent', () => {
  let component: AssessmentsTableComponent;
  let fixture: ComponentFixture<AssessmentsTableComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsTableComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsTableComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render table rows and tab buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('All Assessments');
    expect(compiled.textContent).toContain('C.A. Quizzes');
    expect(compiled.textContent).toContain('Narrative Writing Test');
  });

  it('should switch tabs on click', () => {
    const spy = vi.spyOn(store, 'setActiveAssessmentTab');
    component.onTabChange('submissions');
    expect(spy).toHaveBeenCalledWith('submissions');
  });

  it('should trigger assessment review drilldown when clicking row', () => {
    const spy = vi.spyOn(store, 'openAssessmentReview');
    const first = store.assessmentRecords()[0];
    component.onRowSelect(first);
    expect(spy).toHaveBeenCalledWith(first);
  });

  it('should handle row selection toggling', () => {
    const id = 'asm-1';
    expect(component.isRowSelected(id)).toBe(false);
    component.toggleRowSelection(id);
    expect(component.isRowSelected(id)).toBe(true);
    component.toggleRowSelection(id);
    expect(component.isRowSelected(id)).toBe(false);
  });
});
