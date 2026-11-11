import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourcesComponent } from './resources';
import { SchoolAdminStore } from '../data/school-admin.store';

describe('ResourcesComponent', () => {
  let component: ResourcesComponent;
  let fixture: ComponentFixture<ResourcesComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);

    store.setActiveResourcesTab('library');
    store.setResourceSearchQuery('');
    store.setResourceClassFilter('All Classes');
    store.setResourceSubjectFilter('All Subjects');
    store.setResourceTypeFilter('All Types');
    store.setResourceStatusFilter('All Statuses');
    store.setResourcePage(1);

    fixture.detectChanges();
  });

  it('should render page title and subtitle', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.page-title')?.textContent).toContain(
      'Resources',
    );
    expect(compiled.querySelector('.page-subtitle')?.textContent).toContain(
      'Monitor and manage learning resources across the school',
    );
  });

  it('should render 4 tabs with Resource Library active by default', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tabButtons = compiled.querySelectorAll('.tab-btn');

    expect(tabButtons.length).toBe(4);
    expect(tabButtons[0].textContent).toContain('Resource Library');
    expect(tabButtons[1].textContent).toContain('Approval Queue');
    expect(tabButtons[1].textContent).toContain('186');
    expect(tabButtons[2].textContent).toContain('Delivery Pack Resources');
    expect(tabButtons[3].textContent).toContain('Shared Templates');

    expect(tabButtons[0].classList.contains('active')).toBe(true);
  });

  it('should switch tabs when clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tabButtons = compiled.querySelectorAll(
      '.tab-btn',
    ) as NodeListOf<HTMLButtonElement>;

    tabButtons[1].click();
    fixture.detectChanges();

    expect(store.activeResourcesTab()).toBe('queue');
    expect(tabButtons[1].classList.contains('active')).toBe(true);

    tabButtons[3].click();
    fixture.detectChanges();

    expect(store.activeResourcesTab()).toBe('templates');
    expect(tabButtons[3].classList.contains('active')).toBe(true);
  });

  it('should render subcomponents: metrics, table, bottom cards, and sidebar', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.querySelector('school-hub-resources-summary-metrics'),
    ).toBeTruthy();
    expect(compiled.querySelector('school-hub-resources-table')).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-resources-bottom-action-cards'),
    ).toBeTruthy();
    expect(compiled.querySelector('school-hub-resources-sidebar')).toBeTruthy();
  });
});
