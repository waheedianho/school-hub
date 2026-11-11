import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterventionsComponent } from './interventions';
import { SchoolAdminStore } from '../data/school-admin.store';

describe('InterventionsComponent', () => {
  let component: InterventionsComponent;
  let fixture: ComponentFixture<InterventionsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(InterventionsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    store.setActiveInterventionsTab('active');
    store.setInterventionSearchQuery('');
    store.setInterventionClassFilter('All');
    store.setInterventionPriorityFilter('All');
    store.setInterventionStatusFilter('All');
    fixture.detectChanges();
  });

  it('should render header with title, subtitle, and active term badge', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.page-title')?.textContent).toContain(
      'Interventions',
    );
    expect(compiled.querySelector('.page-subtitle')?.textContent).toContain(
      'Manage learner support plans',
    );
    expect(compiled.querySelector('.term-badge')?.textContent).toContain(
      'Active Term 2, 2024/2025',
    );
  });

  it('should render 4 tabs with Active Interventions active by default', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tabButtons = compiled.querySelectorAll('.tab-btn');

    expect(tabButtons.length).toBe(4);
    expect(tabButtons[0].textContent?.trim()).toBe('Active Interventions');
    expect(tabButtons[1].textContent?.trim()).toBe('Follow-up Schedule');
    expect(tabButtons[2].textContent?.trim()).toBe('Support Plans');
    expect(tabButtons[3].textContent?.trim()).toBe('Resolved Cases');

    expect(tabButtons[0].classList.contains('active')).toBe(true);
  });

  it('should switch tabs and update store when a tab is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tabButtons = compiled.querySelectorAll(
      '.tab-btn',
    ) as NodeListOf<HTMLButtonElement>;

    tabButtons[3].click();
    fixture.detectChanges();

    expect(store.activeInterventionsTab()).toBe('resolved');
    expect(tabButtons[3].classList.contains('active')).toBe(true);

    tabButtons[1].click();
    fixture.detectChanges();

    expect(store.activeInterventionsTab()).toBe('schedule');
    expect(tabButtons[1].classList.contains('active')).toBe(true);
  });

  it('should render sub-components: metrics, table, insights, and sidebar', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.querySelector('school-hub-interventions-summary-metrics'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-interventions-table'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-interventions-insights-cards'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-interventions-sidebar'),
    ).toBeTruthy();
  });
});
