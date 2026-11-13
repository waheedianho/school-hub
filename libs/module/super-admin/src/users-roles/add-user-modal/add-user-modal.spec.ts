import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserModalComponent } from './add-user-modal';
import { CreateUserData } from '../../data/super-admin-users.models';

describe('AddUserModalComponent', () => {
  let component: AddUserModalComponent;
  let fixture: ComponentFixture<AddUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fail validation if name is missing', () => {
    component.updateField('name', '');
    component.onSubmit();
    expect(component.validationError()).toBe(
      'Please provide a full user name.',
    );
  });

  it('should fail validation if email is invalid', () => {
    component.updateField('name', 'John Doe');
    component.updateField('email', 'invalid-email');
    component.onSubmit();
    expect(component.validationError()).toBe(
      'Please provide a valid email address.',
    );
  });

  it('should emit userCreated when valid data is submitted', () => {
    let created: CreateUserData | null = null;
    component.userCreated.subscribe((data) => {
      created = data;
    });

    component.updateField('name', 'Professor X');
    component.updateField('email', 'x@school.edu');
    component.updateField('role', 'Super Admin');
    component.updateField('institution', 'Greenfield International');
    component.onSubmit();

    expect(created).toBeTruthy();
    expect((created as CreateUserData | null)?.name).toBe('Professor X');
    expect((created as CreateUserData | null)?.role).toBe('Super Admin');
  });

  it('should emit closeModal when close is clicked', () => {
    let closed = false;
    component.closeModal.subscribe(() => {
      closed = true;
    });

    const closeBtn = fixture.nativeElement.querySelector('.btn-close');
    closeBtn.click();
    expect(closed).toBe(true);
  });
});
