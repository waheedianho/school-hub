import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentUploadsPanelComponent } from './recent-uploads-panel';
import { RECENT_UPLOADS_LIST } from '../../data/teacher-resources.data';

describe('RecentUploadsPanelComponent', () => {
  let component: RecentUploadsPanelComponent;
  let fixture: ComponentFixture<RecentUploadsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentUploadsPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentUploadsPanelComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('uploads', RECENT_UPLOADS_LIST);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 upload items', () => {
    const items = fixture.nativeElement.querySelectorAll('.upload-item');
    expect(items.length).toBe(5);
    expect(items[0].textContent).toContain('Whole Numbers Lesson Note');
    expect(items[0].textContent).toContain('JSS 1A');
  });

  it('should emit viewUpload when item clicked', () => {
    const spy = vi.fn();
    component.viewUpload.subscribe(spy);
    const items = fixture.nativeElement.querySelectorAll('.upload-item');
    items[0].click();
    expect(spy).toHaveBeenCalledWith(RECENT_UPLOADS_LIST[0]);
  });
});
