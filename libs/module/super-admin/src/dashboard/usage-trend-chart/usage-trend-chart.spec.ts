import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsageTrendChartComponent } from './usage-trend-chart';
import { PLATFORM_USAGE_TREND } from '../../data/super-admin-dashboard.data';

describe('UsageTrendChartComponent', () => {
  let component: UsageTrendChartComponent;
  let fixture: ComponentFixture<UsageTrendChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsageTrendChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsageTrendChartComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', PLATFORM_USAGE_TREND);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute chart points', () => {
    expect(component.points().length).toBe(6);
    expect(component.polylinePoints()).toBeTruthy();
  });

  it('should emit period change event', () => {
    let selected = '';
    component.periodChange.subscribe((val) => (selected = val));

    const select = fixture.nativeElement.querySelector(
      '.period-select',
    ) as HTMLSelectElement;
    select.value = 'Last 30 Days';
    select.dispatchEvent(new Event('change'));

    expect(selected).toBe('Last 30 Days');
  });
});
