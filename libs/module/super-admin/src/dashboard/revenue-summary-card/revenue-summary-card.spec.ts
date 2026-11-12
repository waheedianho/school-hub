import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RevenueSummaryCardComponent } from './revenue-summary-card';
import { REVENUE_SUMMARY_DATA } from '../../data/super-admin-dashboard.data';

describe('RevenueSummaryCardComponent', () => {
  let component: RevenueSummaryCardComponent;
  let fixture: ComponentFixture<RevenueSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenueSummaryCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RevenueSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', REVENUE_SUMMARY_DATA);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render revenue numbers correctly', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('$486,760');
    expect(text).toContain('$5,841,120');
    expect(text).toContain('1,356');
    expect(text).toContain('View Billing Reports');
  });
});
