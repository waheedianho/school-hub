import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SafeguardingAlertsCardComponent } from './safeguarding-alerts-card';
import { SAFEGUARDING_ALERTS } from '../../data/super-admin-dashboard.data';

describe('SafeguardingAlertsCardComponent', () => {
  let component: SafeguardingAlertsCardComponent;
  let fixture: ComponentFixture<SafeguardingAlertsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafeguardingAlertsCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SafeguardingAlertsCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('alerts', SAFEGUARDING_ALERTS);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all safeguarding alerts', () => {
    const items = fixture.nativeElement.querySelectorAll('.alert-item');
    expect(items.length).toBe(4);
  });

  it('should render alert title and severity', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Inappropriate content flagged for review');
    expect(text).toContain('High');
    expect(text).toContain('Oakridge High School');
  });
});
