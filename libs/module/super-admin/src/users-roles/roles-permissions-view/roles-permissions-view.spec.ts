import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesPermissionsViewComponent } from './roles-permissions-view';
import {
  PERMISSION_TEMPLATES_DATA,
  ROLE_PERMISSION_MATRIX,
} from '../../data/super-admin-users.data';

describe('RolesPermissionsViewComponent', () => {
  let component: RolesPermissionsViewComponent;
  let fixture: ComponentFixture<RolesPermissionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesPermissionsViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RolesPermissionsViewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('templates', PERMISSION_TEMPLATES_DATA);
    fixture.componentRef.setInput('matrix', ROLE_PERMISSION_MATRIX);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render role cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.role-card');
    expect(cards.length).toBe(PERMISSION_TEMPLATES_DATA.length);
  });

  it('should render matrix table rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('.matrix-row');
    expect(rows.length).toBe(ROLE_PERMISSION_MATRIX.length);
  });

  it('should emit editTemplate when configure button is clicked', () => {
    let configuredTplId = '';
    component.editTemplate.subscribe((tpl) => {
      configuredTplId = tpl.id;
    });

    const configBtn = fixture.nativeElement.querySelector('.btn-edit-role');
    configBtn.click();
    expect(configuredTplId).toBe(PERMISSION_TEMPLATES_DATA[0].id);
  });

  it('should emit createRole when create role button is clicked', () => {
    let clicked = false;
    component.createRole.subscribe(() => {
      clicked = true;
    });

    const createBtn = fixture.nativeElement.querySelector('.btn-create-role');
    createBtn.click();
    expect(clicked).toBe(true);
  });
});
