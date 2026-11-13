import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UsersRolesComponent } from './users-roles';
import { SuperAdminStore } from '../data/super-admin.store';
import { SAMPLE_PLATFORM_USERS } from '../data/super-admin-users.data';

describe('UsersRolesComponent', () => {
  let component: UsersRolesComponent;
  let fixture: ComponentFixture<UsersRolesComponent>;
  let store: SuperAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersRolesComponent],
      providers: [provideRouter([]), SuperAdminStore],
    }).compileComponents();

    store = TestBed.inject(SuperAdminStore);
    fixture = TestBed.createComponent(UsersRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display page title and subtitle', () => {
    const title = fixture.nativeElement.querySelector('.page-title');
    const subtitle = fixture.nativeElement.querySelector('.page-subtitle');
    expect(title.textContent).toBe('Users & Roles');
    expect(subtitle.textContent).toContain('Manage platform users');
  });

  it('should switch tabs and update store', () => {
    const tabSpy = vi.spyOn(store, 'setUserTab');
    component.setTab('roles');
    expect(tabSpy).toHaveBeenCalledWith('roles');
    expect(component.selectedTab()).toBe('roles');
  });

  it('should open modal when user view is requested', () => {
    expect(component.selectedUserForModal()).toBeNull();
    component.onViewUser(SAMPLE_PLATFORM_USERS[0]);
    expect(component.selectedUserForModal()).toEqual(SAMPLE_PLATFORM_USERS[0]);

    component.closeDetailModal();
    expect(component.selectedUserForModal()).toBeNull();
  });

  it('should open and close add user modal', () => {
    expect(component.isAddUserModalOpen()).toBe(false);
    component.openAddUserModal();
    expect(component.isAddUserModalOpen()).toBe(true);

    component.closeAddUserModal();
    expect(component.isAddUserModalOpen()).toBe(false);
  });

  it('should create new user through store', () => {
    const createSpy = vi.spyOn(store, 'createUser');
    component.onCreateUser({
      name: 'New Instructor',
      email: 'instructor@school.edu',
      role: 'Teacher',
      institution: 'Greenfield International',
      sendInvite: true,
      requireMfa: true,
    });

    expect(createSpy).toHaveBeenCalled();
    expect(component.notificationMessage()).toContain('New Instructor');
  });

  it('should handle toggle MFA', () => {
    const mfaSpy = vi.spyOn(store, 'toggleUserMfa');
    component.onToggleMfa(SAMPLE_PLATFORM_USERS[0]);
    expect(mfaSpy).toHaveBeenCalledWith(SAMPLE_PLATFORM_USERS[0].id);
  });
});
