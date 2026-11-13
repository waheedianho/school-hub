import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersTableComponent } from './users-table';
import { SAMPLE_PLATFORM_USERS } from '../../data/super-admin-users.data';

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('users', SAMPLE_PLATFORM_USERS);
    fixture.componentRef.setInput('totalCount', 12846);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render users rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('.table-row');
    expect(rows.length).toBe(SAMPLE_PLATFORM_USERS.length);
  });

  it('should emit search change when typing in search input', () => {
    let query = '';
    component.searchChange.subscribe((q) => {
      query = q;
    });

    component.onSearchInput('Amanda');
    expect(query).toBe('Amanda');
    expect(component.currentPage()).toBe(1);
  });

  it('should emit role filter change', () => {
    let role = '';
    component.roleChange.subscribe((r) => {
      role = r;
    });

    component.onRoleSelect('Teacher');
    expect(role).toBe('Teacher');
    expect(component.currentPage()).toBe(1);
  });

  it('should toggle actions menu for user', () => {
    component.toggleActionsMenu('USR-0001');
    expect(component.activeMenuUserId()).toBe('USR-0001');

    component.closeActionsMenu();
    expect(component.activeMenuUserId()).toBeNull();
  });

  it('should emit view user event', () => {
    let viewedUserId = '';
    component.viewUser.subscribe((u) => {
      viewedUserId = u.id;
    });

    component.onView(SAMPLE_PLATFORM_USERS[0]);
    expect(viewedUserId).toBe(SAMPLE_PLATFORM_USERS[0].id);
  });
});
