import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersSidebarComponent } from './users-sidebar';
import {
  PERMISSION_TEMPLATES_DATA,
  RECENT_ACCESS_ACTIVITIES,
  ROLE_DISTRIBUTION_DATA,
} from '../../data/super-admin-users.data';

describe('UsersSidebarComponent', () => {
  let component: UsersSidebarComponent;
  let fixture: ComponentFixture<UsersSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersSidebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('roleDistribution', ROLE_DISTRIBUTION_DATA);
    fixture.componentRef.setInput(
      'permissionTemplates',
      PERMISSION_TEMPLATES_DATA,
    );
    fixture.componentRef.setInput('recentActivities', RECENT_ACCESS_ACTIVITIES);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 sidebar cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.sidebar-card');
    expect(cards.length).toBe(3);
  });

  it('should render permission template items', () => {
    const items = fixture.nativeElement.querySelectorAll('.template-item');
    expect(items.length).toBe(PERMISSION_TEMPLATES_DATA.length);
  });

  it('should emit templateSelected when template button is clicked', () => {
    let selectedId = '';
    component.templateSelected.subscribe((tpl) => {
      selectedId = tpl.id;
    });

    const firstBtn = fixture.nativeElement.querySelector('.template-item');
    firstBtn.click();
    expect(selectedId).toBe(PERMISSION_TEMPLATES_DATA[0].id);
  });
});
