import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QBMetricsComponent } from './qb-metrics';
import { QUESTION_BANK_METRICS } from '../../../data/teacher-assessments.data';

describe('QBMetricsComponent', () => {
  let component: QBMetricsComponent;
  let fixture: ComponentFixture<QBMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QBMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QBMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', QUESTION_BANK_METRICS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 5 metric cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(5);
  });

  it('should display correct metric values and labels', () => {
    const values = fixture.nativeElement.querySelectorAll('.metric-value');
    expect(values[0].textContent.trim()).toBe('248');
    expect(values[1].textContent.trim()).toBe('164');
    expect(values[2].textContent.trim()).toBe('198');
    expect(values[3].textContent.trim()).toBe('18');
    expect(values[4].textContent.trim()).toBe('16');
  });
});
