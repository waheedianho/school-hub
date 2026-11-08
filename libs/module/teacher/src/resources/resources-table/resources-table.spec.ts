import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourcesTableComponent } from './resources-table';
import { TEACHER_RESOURCES_LIST } from '../../data/teacher-resources.data';

describe('ResourcesTableComponent', () => {
  let component: ResourcesTableComponent;
  let fixture: ComponentFixture<ResourcesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('resources', TEACHER_RESOURCES_LIST);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 6 resource rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(6);
    expect(rows[0].textContent).toContain('Whole Numbers Lesson Note');
    expect(rows[0].textContent).toContain('PDF Note');
  });

  it('should emit viewResource and downloadResource on click', () => {
    const viewSpy = vi.fn();
    const dlSpy = vi.fn();
    component.viewResource.subscribe(viewSpy);
    component.downloadResource.subscribe(dlSpy);

    const buttons = fixture.nativeElement.querySelectorAll('.icon-btn');
    buttons[0].click();
    expect(viewSpy).toHaveBeenCalledWith(TEACHER_RESOURCES_LIST[0]);

    buttons[1].click();
    expect(dlSpy).toHaveBeenCalledWith(TEACHER_RESOURCES_LIST[0]);
  });
});
