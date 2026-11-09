import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourcesQuickActionsComponent } from './resources-quick-actions';
import { RESOURCES_QUICK_ACTIONS } from '../../data/teacher-resources.data';

describe('ResourcesQuickActionsComponent', () => {
  let component: ResourcesQuickActionsComponent;
  let fixture: ComponentFixture<ResourcesQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesQuickActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('actions', RESOURCES_QUICK_ACTIONS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 quick actions', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.action-item-btn');
    expect(buttons.length).toBe(4);
    expect(buttons[0].textContent).toContain('Upload Worksheet');
    expect(buttons[1].textContent).toContain('Add Video Lesson');
    expect(buttons[2].textContent).toContain('Share with Class');
    expect(buttons[3].textContent).toContain('Create Resource Folder');
  });

  it('should emit actionSelected when button clicked', () => {
    const spy = vi.fn();
    component.actionSelected.subscribe(spy);
    const buttons = fixture.nativeElement.querySelectorAll('.action-item-btn');
    buttons[0].click();
    expect(spy).toHaveBeenCalledWith('upload-worksheet');
  });
});
