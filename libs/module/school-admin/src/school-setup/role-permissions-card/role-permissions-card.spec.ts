import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolePermissionsCardComponent } from './role-permissions-card';
import { ROLE_PERMISSIONS_DATA } from '../../data/school-admin-setup.data';

describe('RolePermissionsCardComponent', () => {
  let component: RolePermissionsCardComponent;
  let fixture: ComponentFixture<RolePermissionsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolePermissionsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RolePermissionsCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('permissions', ROLE_PERMISSIONS_DATA);
    fixture.detectChanges();
  });

  it('should create and render role permissions table', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-title')?.textContent).toContain(
      '4. Teacher & Role Permissions',
    );
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(4);
    expect(rows[0].textContent).toContain('School Admin');
    expect(rows[2].textContent).toContain('Teacher');
  });

  it('should emit togglePermission when switch is clicked', () => {
    const spy = vi.spyOn(component.togglePermission, 'emit');
    component.onToggle('Teacher', 'auditLogs');
    expect(spy).toHaveBeenCalledWith({
      role: 'Teacher',
      field: 'auditLogs',
    });
  });
});
