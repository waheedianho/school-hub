import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesPermissionsComponent } from './roles-permissions';
import { SCHOOL_ROLES_DATA } from '../../data/school-admin-settings.data';

describe('RolesPermissionsComponent', () => {
  let component: RolesPermissionsComponent;
  let fixture: ComponentFixture<RolesPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesPermissionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RolesPermissionsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('roles', SCHOOL_ROLES_DATA);
    fixture.componentRef.setInput('totalRolesCount', SCHOOL_ROLES_DATA.length);
    fixture.componentRef.setInput('searchQuery', '');
    fixture.componentRef.setInput('scopeFilter', 'All Scopes');
    fixture.componentRef.setInput('levelFilter', 'All Levels');
    fixture.componentRef.setInput('statusFilter', 'All Statuses');
    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput('totalPages', 1);
    fixture.detectChanges();
  });

  it('should render roles table with 6 rows', () => {
    expect(component).toBeTruthy();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr.role-row');
    expect(rows.length).toBe(6);

    const firstRowText = rows[0].textContent;
    expect(firstRowText).toContain('School Admin');
    expect(firstRowText).toContain('All School');
    expect(firstRowText).toContain('Full Access');
    expect(firstRowText).toContain('Active');
  });

  it('should emit filter and search events', () => {
    const searchSpy = vi.fn();
    const scopeSpy = vi.fn();
    const levelSpy = vi.fn();
    const statusSpy = vi.fn();

    component.searchQueryChange.subscribe(searchSpy);
    component.scopeFilterChange.subscribe(scopeSpy);
    component.levelFilterChange.subscribe(levelSpy);
    component.statusFilterChange.subscribe(statusSpy);

    const searchInput = fixture.nativeElement.querySelector(
      '[data-testid="roles-search-input"]',
    ) as HTMLInputElement;
    searchInput.value = 'Teacher';
    searchInput.dispatchEvent(new Event('input'));
    expect(searchSpy).toHaveBeenCalledWith('Teacher');

    const scopeSelect = fixture.nativeElement.querySelector(
      '[data-testid="roles-scope-filter"]',
    ) as HTMLSelectElement;
    scopeSelect.value = 'Assigned Classes';
    scopeSelect.dispatchEvent(new Event('change'));
    expect(scopeSpy).toHaveBeenCalledWith('Assigned Classes');

    const levelSelect = fixture.nativeElement.querySelector(
      '[data-testid="roles-level-filter"]',
    ) as HTMLSelectElement;
    levelSelect.value = 'High Access';
    levelSelect.dispatchEvent(new Event('change'));
    expect(levelSpy).toHaveBeenCalledWith('High Access');

    const statusSelect = fixture.nativeElement.querySelector(
      '[data-testid="roles-status-filter"]',
    ) as HTMLSelectElement;
    statusSelect.value = 'Review Needed';
    statusSelect.dispatchEvent(new Event('change'));
    expect(statusSpy).toHaveBeenCalledWith('Review Needed');
  });

  it('should emit viewRole when view button is clicked', () => {
    const viewSpy = vi.fn();
    component.viewRole.subscribe(viewSpy);

    const viewBtn = fixture.nativeElement.querySelector(
      '[data-testid="role-row-role-001"] .btn-icon',
    ) as HTMLButtonElement;
    viewBtn.click();

    expect(viewSpy).toHaveBeenCalledWith(SCHOOL_ROLES_DATA[0]);
  });

  it('should emit cardClick when action cards are clicked', () => {
    const cardSpy = vi.fn();
    component.cardClick.subscribe(cardSpy);

    const gradingCard = fixture.nativeElement.querySelector(
      '[data-testid="action-card-grading-policy"]',
    ) as HTMLElement;
    gradingCard.click();

    expect(cardSpy).toHaveBeenCalledWith('grading-policy');
  });
});
