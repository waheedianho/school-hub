import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { UploadResourceComponent } from './upload-resource';

describe('UploadResourceComponent', () => {
  let component: UploadResourceComponent;
  let fixture: ComponentFixture<UploadResourceComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadResourceComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadResourceComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the upload resource component', () => {
    expect(component).toBeTruthy();
  });

  it('should render page header and breadcrumbs', () => {
    const el: HTMLElement = fixture.nativeElement;
    const title = el.querySelector('.page-title');
    expect(title?.textContent?.trim()).toBe('Upload Resource');
  });

  it('should navigate to resources on cancel', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onCancel();
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/resources']);
  });

  it('should show toast on save draft', () => {
    component.onSaveDraft();
    expect(component.toastMessage()).toBe('Draft saved successfully');
  });

  it('should validate title on submit', () => {
    component.resourceTitle.set('   ');
    component.onSubmit();
    expect(component.toastMessage()).toBe('Please enter a resource title');
  });

  it('should submit and navigate after delay on valid title', () => {
    vi.useFakeTimers();
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.resourceTitle.set('Algebra Worksheet');
    component.onSubmit();
    expect(component.isSubmitting()).toBe(true);

    vi.advanceTimersByTime(600);
    expect(component.isSubmitting()).toBe(false);
    expect(component.toastMessage()).toBe('Resource uploaded successfully!');

    vi.advanceTimersByTime(1000);
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/resources']);
    vi.useRealTimers();
  });

  it('should handle file selection', () => {
    const file = new File(['dummy content'], 'sample.pdf', {
      type: 'application/pdf',
    });
    const event = {
      target: {
        files: [file],
      },
    } as unknown as Event;

    component.onFileSelected(event);
    expect(component.uploadedFile()).toEqual(
      expect.objectContaining({
        name: 'sample.pdf',
      }),
    );
  });

  it('should handle drag and drop events', () => {
    const preventSpy = vi.fn();
    const stopSpy = vi.fn();
    const dragEvent = {
      preventDefault: preventSpy,
      stopPropagation: stopSpy,
    } as unknown as DragEvent;

    component.onDragOver(dragEvent);
    expect(component.isDragging()).toBe(true);

    component.onDragLeave(dragEvent);
    expect(component.isDragging()).toBe(false);

    const file = new File(['content'], 'test.docx', {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const dropEvent = {
      preventDefault: preventSpy,
      stopPropagation: stopSpy,
      dataTransfer: {
        files: [file],
      },
    } as unknown as DragEvent;

    component.onDrop(dropEvent);
    expect(component.isDragging()).toBe(false);
    expect(component.uploadedFile()?.name).toBe('test.docx');
  });

  it('should remove uploaded file', () => {
    component.uploadedFile.set({
      name: 'notes.pdf',
      size: '1.2 MB',
      type: 'PDF',
    });
    component.onRemoveFile();
    expect(component.uploadedFile()).toBeNull();
  });

  it('should add and remove tags', () => {
    component.currentTagInput.set('geometry');
    component.onAddTag();
    expect(component.tags()).toContain('geometry');
    expect(component.currentTagInput()).toBe('');

    component.onRemoveTag('geometry');
    expect(component.tags()).not.toContain('geometry');
  });

  it('should handle quick actions on upload page', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component.onQuickAction('create-delivery-pack');
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/delivery-packs']);

    component.onQuickAction('add-video-lesson');
    expect(component.resourceType()).toBe('Video');

    component.onQuickAction('create-worksheet');
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/worksheets']);

    component.onQuickAction('go-to-library');
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/resources']);
  });
});
