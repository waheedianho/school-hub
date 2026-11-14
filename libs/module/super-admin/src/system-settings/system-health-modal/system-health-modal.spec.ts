import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemHealthModalComponent } from './system-health-modal';
import { SYSTEM_HEALTH_ITEMS } from '../../data/super-admin-settings.data';

describe('SystemHealthModalComponent', () => {
  let component: SystemHealthModalComponent;
  let fixture: ComponentFixture<SystemHealthModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemHealthModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SystemHealthModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('healthItems', SYSTEM_HEALTH_ITEMS);
    fixture.detectChanges();
  });

  it('should create and render dialog when isOpen is true', () => {
    expect(component).toBeTruthy();
    const dialog = fixture.nativeElement.querySelector('.modal-dialog');
    expect(dialog).toBeTruthy();
  });

  it('should render all 5 service rows in the table', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(5);
  });

  it('should emit closeModal when close button is clicked', () => {
    let closed = false;
    component.closeModal.subscribe(() => (closed = true));
    component.onClose();
    expect(closed).toBe(true);
  });
});
