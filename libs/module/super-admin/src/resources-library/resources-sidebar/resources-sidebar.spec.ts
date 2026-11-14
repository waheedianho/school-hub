import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ResourcesSidebarComponent } from './resources-sidebar';
import {
  INITIAL_APPROVAL_QUEUE,
  INITIAL_MOST_USED_TYPES,
  INITIAL_RECENT_UPLOAD_ACTIVITIES,
  INITIAL_RESOURCE_HEALTH,
} from '../../data/super-admin-resources.data';

describe('ResourcesSidebarComponent', () => {
  let component: ResourcesSidebarComponent;
  let fixture: ComponentFixture<ResourcesSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesSidebarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesSidebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('healthCategories', INITIAL_RESOURCE_HEALTH);
    fixture.componentRef.setInput('approvalQueue', INITIAL_APPROVAL_QUEUE);
    fixture.componentRef.setInput('mostUsedTypes', INITIAL_MOST_USED_TYPES);
    fixture.componentRef.setInput(
      'recentActivities',
      INITIAL_RECENT_UPLOAD_ACTIVITIES,
    );
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all sidebar cards and data', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Resource Health Overview');
    expect(compiled.textContent).toContain('8,742');
    expect(compiled.textContent).toContain('Approval Queue');
    expect(compiled.textContent).toContain('Most Used Resource Types');
    expect(compiled.textContent).toContain('Recent Upload Activity');
    expect(compiled.textContent).toContain('Quick Actions');

    expect(compiled.textContent).toContain('JSS2 Mathematics Quiz Bank');
    expect(compiled.textContent).toContain('Photosynthesis Worksheet');
  });

  it('should emit action events when clicked', () => {
    const bulkImportSpy = vi.spyOn(component.bulkImportAction, 'emit');
    const createFolderSpy = vi.spyOn(component.createFolderAction, 'emit');
    const downloadReportSpy = vi.spyOn(component.downloadReportAction, 'emit');

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('.actions-list button');

    (buttons[0] as HTMLButtonElement).click();
    expect(bulkImportSpy).toHaveBeenCalled();

    (buttons[1] as HTMLButtonElement).click();
    expect(createFolderSpy).toHaveBeenCalled();

    (buttons[2] as HTMLButtonElement).click();
    expect(downloadReportSpy).toHaveBeenCalled();
  });

  it('should emit selectQueueItem when queue item is clicked', () => {
    const queueSpy = vi.spyOn(component.selectQueueItem, 'emit');
    const compiled = fixture.nativeElement as HTMLElement;
    const firstQueueItem = compiled.querySelector('.queue-item') as HTMLElement;

    firstQueueItem.click();
    expect(queueSpy).toHaveBeenCalledWith('JSS2 Mathematics Quiz Bank');
  });
});
