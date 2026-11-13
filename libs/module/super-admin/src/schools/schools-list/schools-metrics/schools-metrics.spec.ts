import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolsMetricsComponent } from './schools-metrics';
import { SCHOOLS_METRICS } from '../../../data/super-admin-schools.data';

describe('SchoolsMetricsComponent', () => {
  let component: SchoolsMetricsComponent;
  let fixture: ComponentFixture<SchoolsMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolsMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolsMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', SCHOOLS_METRICS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 6 metric cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(6);
  });

  it('should render correct metric values', () => {
    const values = fixture.nativeElement.querySelectorAll('.metric-value');
    expect(values[0].textContent.trim()).toBe('1,248');
    expect(values[1].textContent.trim()).toBe('985');
  });

  it('should apply appropriate tone backgrounds', () => {
    expect(component.getToneBg('primary')).toContain('text-blue-600');
    expect(component.getToneBg('success')).toContain('text-emerald-600');
    expect(component.getToneBg('warning')).toContain('text-amber-600');
    expect(component.getToneBg('danger')).toContain('text-rose-600');
  });
});
