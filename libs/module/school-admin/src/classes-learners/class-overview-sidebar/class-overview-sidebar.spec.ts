import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassOverviewSidebarComponent } from './class-overview-sidebar';
import { SCHOOL_CLASSES_DATA } from '../../data/school-admin-classes.data';

describe('ClassOverviewSidebarComponent', () => {
  let component: ClassOverviewSidebarComponent;
  let fixture: ComponentFixture<ClassOverviewSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassOverviewSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassOverviewSidebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('selectedClass', SCHOOL_CLASSES_DATA[0]);
    fixture.detectChanges();
  });

  it('should create and render class overview details', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-title')?.textContent).toContain(
      'Class Overview: JSS 1A',
    );
    expect(compiled.textContent).toContain('Mrs. Fatima Yusuf');
    expect(compiled.textContent).toContain('JSS Block A1');
    expect(compiled.textContent).toContain('76%');
    expect(compiled.textContent).toContain('92%');
  });

  it('should render all 3 attention cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Learners Below Mastery');
    expect(compiled.textContent).toContain('Attendance Concerns');
    expect(compiled.textContent).toContain('Learners Needing Intervention');
  });

  it('should emit quickActionClicked when action button is clicked', () => {
    const spy = vi.spyOn(component.quickActionClicked, 'emit');
    const actionBtns = fixture.nativeElement.querySelectorAll(
      '.action-item-btn',
    ) as NodeListOf<HTMLButtonElement>;
    actionBtns[0].click();
    expect(spy).toHaveBeenCalledWith('assign-learner');
  });
});
