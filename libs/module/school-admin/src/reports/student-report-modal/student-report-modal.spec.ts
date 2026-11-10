import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsStudentReportModalComponent } from './student-report-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ReportsStudentReportModalComponent', () => {
  let component: ReportsStudentReportModalComponent;
  let fixture: ComponentFixture<ReportsStudentReportModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsStudentReportModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsStudentReportModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    store.openStudentReportCard();
    fixture.detectChanges();
  });

  it('should render student report modal with subject scores, summary KPIs, and remarks', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Maryam Ibrahim');
    expect(compiled.textContent).toContain('SH-2024-042');
    expect(compiled.textContent).toContain('JSS 1B');
    expect(compiled.textContent).toContain('78.4%');
    expect(compiled.textContent).toContain('4 / 28');
    expect(compiled.textContent).toContain('Mathematics');
    expect(compiled.textContent).toContain('English Language');
    expect(compiled.textContent).toContain('Basic Science');
    expect(compiled.textContent).toContain("Principal's Endorsement");
  });

  it('should trigger print and download actions', () => {
    component.onPrint();
    expect(store.setupSaveStatus()).toContain('Print command dispatched');

    component.onDownload();
    expect(store.setupSaveStatus()).toContain('Official PDF generated');
  });

  it('should close modal when clicking close button or backdrop', () => {
    vi.spyOn(store, 'closeStudentReportCard');

    component.onClose();
    expect(store.closeStudentReportCard).toHaveBeenCalled();
  });

  it('should map grades to correct badge classes', () => {
    expect(component.getGradeClass('A')).toBe('grade-a');
    expect(component.getGradeClass('B')).toBe('grade-b');
    expect(component.getGradeClass('C')).toBe('grade-c');
    expect(component.getGradeClass('F')).toBe('grade-other');
  });
});
