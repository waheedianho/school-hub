import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostUsedResourcesPanelComponent } from './most-used-resources-panel';
import { MOST_USED_RESOURCES_LIST } from '../../data/teacher-resources.data';

describe('MostUsedResourcesPanelComponent', () => {
  let component: MostUsedResourcesPanelComponent;
  let fixture: ComponentFixture<MostUsedResourcesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostUsedResourcesPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MostUsedResourcesPanelComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', MOST_USED_RESOURCES_LIST);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 most used resources', () => {
    const items = fixture.nativeElement.querySelectorAll('.resource-item');
    expect(items.length).toBe(5);
    expect(items[0].textContent).toContain('Whole Numbers Lesson Note');
    expect(items[0].textContent).toContain('32');
  });

  it('should emit viewResource on item click', () => {
    const spy = vi.fn();
    component.viewResource.subscribe(spy);
    const items = fixture.nativeElement.querySelectorAll('.resource-item');
    items[0].click();
    expect(spy).toHaveBeenCalledWith(MOST_USED_RESOURCES_LIST[0]);
  });
});
