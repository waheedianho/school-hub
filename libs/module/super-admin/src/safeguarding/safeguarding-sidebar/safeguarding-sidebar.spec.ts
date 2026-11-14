import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeguardingSidebarComponent } from './safeguarding-sidebar';
import {
  INITIAL_COMPLIANCE_HEALTH_CATEGORIES,
  INITIAL_CONSENT_BREAKDOWN,
  INITIAL_POLICY_CHECKLIST,
  INITIAL_RECENT_SAFEGUARDING_ACTIVITIES,
  INITIAL_URGENT_ESCALATIONS,
} from '../../data/super-admin-safeguarding.data';

describe('SafeguardingSidebarComponent', () => {
  let component: SafeguardingSidebarComponent;
  let fixture: ComponentFixture<SafeguardingSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafeguardingSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SafeguardingSidebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'healthCategories',
      INITIAL_COMPLIANCE_HEALTH_CATEGORIES,
    );
    fixture.componentRef.setInput(
      'urgentEscalations',
      INITIAL_URGENT_ESCALATIONS,
    );
    fixture.componentRef.setInput(
      'consentBreakdown',
      INITIAL_CONSENT_BREAKDOWN,
    );
    fixture.componentRef.setInput(
      'recentActivities',
      INITIAL_RECENT_SAFEGUARDING_ACTIVITIES,
    );
    fixture.componentRef.setInput('policyChecklist', INITIAL_POLICY_CHECKLIST);
    fixture.detectChanges();
  });

  it('should create and render all 5 sidebar cards', () => {
    expect(component).toBeTruthy();
    const cards = fixture.nativeElement.querySelectorAll('.sidebar-card');
    expect(cards.length).toBe(5);
  });

  it('should display donut statistics and items', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Compliance Health Overview');
    expect(text).toContain('82%');
    expect(text).toContain('Healthy');
    expect(text).toContain('Urgent Escalations');
    expect(text).toContain('Consent Review Queue');
    expect(text).toContain('64');
    expect(text).toContain('Recent Safeguarding Activity');
    expect(text).toContain('Quick Policy Checklist');
  });

  it('should emit period change event', () => {
    const spy = vi.spyOn(component.periodChange, 'emit');
    const select = fixture.nativeElement.querySelector('select');
    select.value = 'This Quarter';
    select.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledWith('This Quarter');
  });
});
