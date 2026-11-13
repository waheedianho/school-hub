import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailModalComponent } from './user-detail-modal';
import { SAMPLE_PLATFORM_USERS } from '../../data/super-admin-users.data';

describe('UserDetailModalComponent', () => {
  let component: UserDetailModalComponent;
  let fixture: ComponentFixture<UserDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', SAMPLE_PLATFORM_USERS[0]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user name and ID', () => {
    const title = fixture.nativeElement.querySelector('.user-title');
    const badge = fixture.nativeElement.querySelector('.user-id-badge');
    expect(title.textContent).toBe('Amanda Lees');
    expect(badge.textContent).toBe('ID: USR-0001');
  });

  it('should emit closeModal when close button is clicked', () => {
    let closed = false;
    component.closeModal.subscribe(() => {
      closed = true;
    });

    const closeBtn = fixture.nativeElement.querySelector('.btn-close');
    closeBtn.click();
    expect(closed).toBe(true);
  });

  it('should emit editUser when edit button is clicked', () => {
    let editedUserId = '';
    component.editUser.subscribe((u) => {
      editedUserId = u.id;
    });

    const editBtn = fixture.nativeElement.querySelector('.btn-primary');
    editBtn.click();
    expect(editedUserId).toBe('USR-0001');
  });

  it('should emit updateStatus to suspend an active user', () => {
    let nextStatus = '';
    component.updateStatus.subscribe((payload) => {
      nextStatus = payload.status;
    });

    component.onToggleStatus();
    expect(nextStatus).toBe('Suspended');
  });
});
