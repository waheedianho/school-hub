import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SUBMISSION_BREAKDOWN_DATA } from '../../data/teacher-assignments.data';
import { SubmissionBreakdownComponent } from './submission-breakdown';

describe('SubmissionBreakdownComponent', () => {
  let component: SubmissionBreakdownComponent;
  let fixture: ComponentFixture<SubmissionBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionBreakdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmissionBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all legend items', () => {
    const rows = fixture.nativeElement.querySelectorAll('.legend-row');
    expect(rows.length).toBe(SUBMISSION_BREAKDOWN_DATA.length);
  });

  it('should display total submissions count', () => {
    const totalEl = fixture.nativeElement.querySelector('.donut-total');
    expect(totalEl.textContent.trim()).toBe('60');
  });
});
