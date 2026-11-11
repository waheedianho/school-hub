import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunicationComponent } from './communication';
import { SchoolAdminStore } from '../data/school-admin.store';

describe('CommunicationComponent', () => {
  let component: CommunicationComponent;
  let fixture: ComponentFixture<CommunicationComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunicationComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);

    store.setActiveCommunicationTab('announcements');
    store.setCommunicationSearchQuery('');
    store.setCommunicationAudienceFilter('All Audiences');
    store.setCommunicationCategoryFilter('All Categories');
    store.setCommunicationStatusFilter('All Statuses');
    store.setCommunicationDateFilter('All Dates');
    store.setCommunicationPage(1);

    fixture.detectChanges();
  });

  it('renders page header title and subtitle', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.page-title')?.textContent).toContain(
      'Communication',
    );
    expect(compiled.querySelector('.page-subtitle')?.textContent).toContain(
      'Manage school-wide announcements, teacher notices, parent updates, and communication logs.',
    );
  });

  it('renders 4 navigation tabs with Announcements active by default', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tabButtons = compiled.querySelectorAll('.tab-btn');

    expect(tabButtons.length).toBe(4);
    expect(tabButtons[0].textContent).toContain('Announcements');
    expect(tabButtons[1].textContent).toContain('Teacher Messages');
    expect(tabButtons[2].textContent).toContain('Parent Messages');
    expect(tabButtons[3].textContent).toContain('Communication Logs');

    expect(tabButtons[0].classList.contains('active')).toBe(true);
  });

  it('switches tabs when tab button is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tabButtons = compiled.querySelectorAll(
      '.tab-btn',
    ) as NodeListOf<HTMLButtonElement>;

    tabButtons[1].click();
    fixture.detectChanges();
    expect(store.activeCommunicationTab()).toBe('teacher-messages');
    expect(tabButtons[1].classList.contains('active')).toBe(true);

    tabButtons[2].click();
    fixture.detectChanges();
    expect(store.activeCommunicationTab()).toBe('parent-messages');
    expect(tabButtons[2].classList.contains('active')).toBe(true);

    tabButtons[3].click();
    fixture.detectChanges();
    expect(store.activeCommunicationTab()).toBe('logs');
    expect(tabButtons[3].classList.contains('active')).toBe(true);
  });
});
