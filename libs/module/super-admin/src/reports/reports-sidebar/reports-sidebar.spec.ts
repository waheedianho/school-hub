import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsSidebarComponent } from './reports-sidebar';
import {
  INITIAL_QUICK_REPORT_TEMPLATES,
  INITIAL_RECENT_REPORT_ACTIVITIES,
  INITIAL_REPORT_HEALTH_CATEGORIES,
  INITIAL_SCHEDULED_REPORT_QUEUE,
} from '../../data/super-admin-reports.data';

describe('ReportsSidebarComponent', () => {
  let component: ReportsSidebarComponent;
  let fixture: ComponentFixture<ReportsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsSidebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'healthCategories',
      INITIAL_REPORT_HEALTH_CATEGORIES,
    );
    fixture.componentRef.setInput(
      'scheduledQueue',
      INITIAL_SCHEDULED_REPORT_QUEUE,
    );
    fixture.componentRef.setInput(
      'recentActivity',
      INITIAL_RECENT_REPORT_ACTIVITIES,
    );
    fixture.componentRef.setInput(
      'quickTemplates',
      INITIAL_QUICK_REPORT_TEMPLATES,
    );
    fixture.componentRef.setInput('selectedPeriod', 'This Month');
    fixture.detectChanges();
  });

  it('should create and render all 4 sidebar cards', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.sidebar-card');
    expect(cards.length).toBe(4);
  });

  it('should display health overview and calculate totals', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Report Health Overview');
    expect(compiled.textContent).toContain('Successful');
    expect(compiled.textContent).toContain('84.6%');
    expect(component.totalHealthCount).toBe(1248);
  });

  it('should display scheduled queue items with upcoming badges', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Scheduled Report Queue');
    expect(compiled.textContent).toContain('Curriculum Coverage Report');
    expect(compiled.textContent).toContain('Upcoming');
  });

  it('should display recent report activity feed and quick templates', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Recent Report Activity');
    expect(compiled.textContent).toContain('Quick Templates');
    expect(compiled.textContent).toContain('Monthly School Performance Pack');
  });

  it('should emit templateSelected when template card clicked', () => {
    const emitSpy = vi.fn();
    component.templateSelected.subscribe(emitSpy);

    const compiled = fixture.nativeElement as HTMLElement;
    const btn = compiled.querySelector(
      '.template-card-btn',
    ) as HTMLButtonElement;
    btn.click();

    expect(emitSpy).toHaveBeenCalledWith(INITIAL_QUICK_REPORT_TEMPLATES[0]);
  });
});
