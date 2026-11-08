import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradebookSummaryComponent } from './gradebook-summary';
import { GRADEBOOK_SUMMARY_SEGMENTS } from '../../data/teacher-gradebook.data';

describe('GradebookSummaryComponent', () => {
  let component: GradebookSummaryComponent;
  let fixture: ComponentFixture<GradebookSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradebookSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GradebookSummaryComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('segments', GRADEBOOK_SUMMARY_SEGMENTS);
    fixture.componentRef.setInput('classAverage', '72%');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total learners correctly', () => {
    expect(component.totalLearners()).toBe(112);
  });

  it('should render all 4 legend items', () => {
    const rows = fixture.nativeElement.querySelectorAll('.legend-row');
    expect(rows.length).toBe(4);
  });

  it('should display class average', () => {
    const avg = fixture.nativeElement.querySelector('.avg-val');
    expect(avg.textContent.trim()).toBe('72%');
  });
});
