import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { TeacherResourcesComponent } from './resources';

describe('TeacherResourcesComponent', () => {
  let component: TeacherResourcesComponent;
  let fixture: ComponentFixture<TeacherResourcesComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherResourcesComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherResourcesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the resources dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should render page title and subtitle', () => {
    const el: HTMLElement = fixture.nativeElement;
    const title = el.querySelector('.page-title');
    const subtitle = el.querySelector('.page-subtitle');
    expect(title?.textContent?.trim()).toBe('Resources');
    expect(subtitle?.textContent?.trim()).toContain(
      'Access, organize, and share lesson materials',
    );
  });

  it('should navigate to upload on onUploadResource()', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onUploadResource();
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/resources/upload']);
  });

  it('should navigate to upload on onViewResource()', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onViewResource(component.allResources()[0]);
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/resources/upload']);
  });

  it('should navigate to upload on onViewUploadDetail()', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onViewUploadDetail(component.recentUploads()[0]);
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/resources/upload']);
  });

  it('should navigate to upload on onViewUsedResourceDetail()', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onViewUsedResourceDetail(component.mostUsedResources()[0]);
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/resources/upload']);
  });

  it('should filter resources by class', () => {
    component.onFiltersChanged({
      className: 'JSS 1B',
      subject: 'All Subjects',
      resourceType: 'All Types',
      topic: 'All Topics',
      searchQuery: '',
    });
    fixture.detectChanges();

    const filtered = component.filteredResources();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((r) => r.className === 'JSS 1B')).toBe(true);
  });

  it('should filter resources by search query', () => {
    component.onFiltersChanged({
      className: 'All Classes',
      subject: 'All Subjects',
      resourceType: 'All Types',
      topic: 'All Topics',
      searchQuery: 'Whole Numbers',
    });
    fixture.detectChanges();

    const filtered = component.filteredResources();
    expect(filtered.length).toBeGreaterThan(0);
    expect(
      filtered.every(
        (r) =>
          r.title.toLowerCase().includes('whole numbers') ||
          r.topic.toLowerCase().includes('whole numbers'),
      ),
    ).toBe(true);
  });

  it('should handle quick actions appropriately', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component.onQuickAction('upload-worksheet');
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/resources/upload']);

    component.onQuickAction('share-with-class');
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/live-classes']);

    const folderSpy = vi.spyOn(component, 'onCreateFolder');
    component.onQuickAction('create-resource-folder');
    expect(folderSpy).toHaveBeenCalled();
  });

  it('should reset filters on onViewAllUploads and onViewAllUsed', () => {
    component.onViewAllUploads();
    expect(component.filters().resourceType).toBe('All Types');

    component.onViewAllUsed();
    expect(component.filters().className).toBe('All Classes');
  });
});
