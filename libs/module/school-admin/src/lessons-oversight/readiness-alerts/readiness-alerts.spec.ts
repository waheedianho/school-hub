import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadinessAlertsComponent } from './readiness-alerts';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ReadinessAlertsComponent', () => {
  let component: ReadinessAlertsComponent;
  let fixture: ComponentFixture<ReadinessAlertsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadinessAlertsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadinessAlertsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render readiness alerts', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Lesson Delivery Readiness Alerts');
    expect(compiled.textContent).toContain(
      '3 lessons without approved delivery packs',
    );
    expect(compiled.textContent).toContain('2 classes behind weekly schedule');
  });

  it('should filter alerts by severity', () => {
    component.setFilter('Critical');
    fixture.detectChanges();
    expect(
      component.filteredAlerts().every((a) => a.severity === 'critical'),
    ).toBe(true);

    component.setFilter('All');
    fixture.detectChanges();
    expect(component.filteredAlerts().length).toBe(
      store.lessonReadinessAlerts().length,
    );
  });

  it('should trigger alert action and resolve alerts', () => {
    const alert = store.lessonReadinessAlerts()[0];
    component.onAction(alert);
    expect(store.setupSaveStatus()).toContain(alert.actionLabel);

    component.onResolve(alert);
    expect(store.setupSaveStatus()).toContain(
      'Readiness alert marked as resolved',
    );
  });
});
