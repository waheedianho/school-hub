import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentsListTableComponent } from './assessments-list-table';
import { ASSESSMENTS_LIST } from '../../data/teacher-assessments.data';

describe('AssessmentsListTableComponent', () => {
  let component: AssessmentsListTableComponent;
  let fixture: ComponentFixture<AssessmentsListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsListTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsListTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('assessments', ASSESSMENTS_LIST);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all assessment rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('.table-row');
    expect(rows.length).toBe(ASSESSMENTS_LIST.length);
  });

  it('should emit openAssessment when Open button is clicked', () => {
    const emitSpy = vi.fn();
    component.openAssessment.subscribe(emitSpy);

    const firstActionBtn = fixture.nativeElement.querySelector(
      '.action-btn.btn-open',
    );
    firstActionBtn?.click();

    expect(emitSpy).toHaveBeenCalledWith(ASSESSMENTS_LIST[0]);
  });

  it('should emit reviewAssessment when Review button is clicked for pending review item', () => {
    const emitSpy = vi.fn();
    component.reviewAssessment.subscribe(emitSpy);

    const reviewBtn = fixture.nativeElement.querySelector(
      '.action-btn.btn-review',
    );
    reviewBtn?.click();

    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'Pending Review',
      }),
    );
  });

  it('should display empty state when list is empty', () => {
    fixture.componentRef.setInput('assessments', []);
    fixture.detectChanges();

    const empty = fixture.nativeElement.querySelector('.empty-state');
    expect(empty).toBeTruthy();
    expect(empty.textContent).toContain('No assessments found');
  });
});
