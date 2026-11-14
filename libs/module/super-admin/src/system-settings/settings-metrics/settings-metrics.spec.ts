import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsMetricsComponent } from './settings-metrics';
import { SYSTEM_SETTINGS_TOP_METRICS } from '../../data/super-admin-settings.data';

describe('SettingsMetricsComponent', () => {
  let component: SettingsMetricsComponent;
  let fixture: ComponentFixture<SettingsMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', SYSTEM_SETTINGS_TOP_METRICS);
    fixture.detectChanges();
  });

  it('should create and render all 6 metrics cards', () => {
    expect(component).toBeTruthy();
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(6);
  });

  it('should emit maintenanceToggled when clicking maintenance mode card', () => {
    let toggled = false;
    component.maintenanceToggled.subscribe(() => (toggled = true));

    const maintenanceMetric = SYSTEM_SETTINGS_TOP_METRICS.find(
      (m) => m.id === 'maintenance-mode',
    );
    if (maintenanceMetric) {
      component.onMetricAction(maintenanceMetric);
      expect(toggled).toBe(true);
    }
  });
});
