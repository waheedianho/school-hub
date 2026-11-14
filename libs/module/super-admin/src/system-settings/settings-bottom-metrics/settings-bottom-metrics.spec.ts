import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsBottomMetricsComponent } from './settings-bottom-metrics';
import { SETTINGS_BOTTOM_METRICS } from '../../data/super-admin-settings.data';

describe('SettingsBottomMetricsComponent', () => {
  let component: SettingsBottomMetricsComponent;
  let fixture: ComponentFixture<SettingsBottomMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsBottomMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsBottomMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', SETTINGS_BOTTOM_METRICS);
    fixture.detectChanges();
  });

  it('should create and render all 4 bottom metric cards', () => {
    expect(component).toBeTruthy();
    const cards = fixture.nativeElement.querySelectorAll('.bottom-card');
    expect(cards.length).toBe(4);
  });

  it('should compute valid sparkline SVG paths and points', () => {
    const data = [10, 20, 30, 25, 40];
    const path = component.getSparklinePath(data);
    expect(path).toContain('M 0.0');
    expect(path).toContain('L 120.0');

    const points = component.getSparklinePoints(data);
    expect(points.length).toBe(5);
    expect(points[0].x).toBe(0);
    expect(points[4].x).toBe(120);
  });
});
