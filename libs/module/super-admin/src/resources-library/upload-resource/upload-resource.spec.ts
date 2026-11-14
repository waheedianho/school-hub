import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UploadResourceComponent } from './upload-resource';
import { SuperAdminStore } from '../../data/super-admin.store';

describe('UploadResourceComponent', () => {
  let component: UploadResourceComponent;
  let fixture: ComponentFixture<UploadResourceComponent>;
  let store: SuperAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadResourceComponent],
      providers: [SuperAdminStore, provideRouter([])],
    }).compileComponents();

    store = TestBed.inject(SuperAdminStore);
    fixture = TestBed.createComponent(UploadResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and render upload form sections', () => {
    expect(component).toBeTruthy();
    expect(store).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Upload Resource');
    expect(compiled.textContent).toContain('Resource Details');
    expect(compiled.textContent).toContain('File Upload');
    expect(compiled.textContent).toContain('Audience & Access');
    expect(compiled.textContent).toContain('Metadata & Quality');
    expect(compiled.textContent).toContain('Resource Preview');
    expect(compiled.textContent).toContain('Upload Checklist');
  });

  it('should manage tag list', () => {
    const initialTagsCount = component.tags().length;

    component.tagInput.set('equations');
    component.addTag();
    expect(component.tags().length).toBe(initialTagsCount + 1);
    expect(component.tags()).toContain('equations');

    component.removeTag('equations');
    expect(component.tags().length).toBe(initialTagsCount);
  });

  it('should cancel upload and reset progress', () => {
    expect(component.isUploading()).toBe(true);
    component.cancelUpload();
    expect(component.isUploading()).toBe(false);
    expect(component.uploadProgress()).toBe(0);
  });

  it('should save draft resource to store', () => {
    const initialCount = store.allResources().length;
    component.saveDraft();
    expect(store.allResources().length).toBe(initialCount + 1);
    expect(store.allResources()[0].status).toBe('Draft');
  });

  it('should submit for review with Pending Review status', () => {
    const initialCount = store.allResources().length;
    component.submitForReview();
    expect(store.allResources().length).toBe(initialCount + 1);
    expect(store.allResources()[0].status).toBe('Pending Review');
  });

  it('should publish resource with Approved status', () => {
    const initialCount = store.allResources().length;
    component.publishResource();
    expect(store.allResources().length).toBe(initialCount + 1);
    expect(store.allResources()[0].status).toBe('Approved');
  });
});
