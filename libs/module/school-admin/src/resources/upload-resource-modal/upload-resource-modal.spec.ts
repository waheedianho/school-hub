import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadResourceModalComponent } from './upload-resource-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('UploadResourceModalComponent', () => {
  let component: UploadResourceModalComponent;
  let fixture: ComponentFixture<UploadResourceModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadResourceModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadResourceModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);

    store.closeUploadResourceModal();
    fixture.detectChanges();
  });

  it('should not render dialog when closed', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-backdrop')).toBeNull();
  });

  it('should render dialog when opened', () => {
    store.openUploadResourceModal();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-backdrop')).toBeTruthy();
    expect(
      compiled.querySelector('#upload-resource-title')?.textContent,
    ).toContain('Upload New Learning Resource');
  });

  it('should close when cancel or close button is clicked', () => {
    store.openUploadResourceModal();
    fixture.detectChanges();

    const closeBtn = fixture.nativeElement.querySelector(
      '.btn-close',
    ) as HTMLButtonElement;
    closeBtn.click();
    fixture.detectChanges();

    expect(store.isUploadResourceModalOpen()).toBe(false);

    store.openUploadResourceModal();
    fixture.detectChanges();

    const cancelBtn = fixture.nativeElement.querySelector(
      '.btn-cancel',
    ) as HTMLButtonElement;
    cancelBtn.click();
    fixture.detectChanges();

    expect(store.isUploadResourceModalOpen()).toBe(false);
  });

  it('should submit valid form and add new resource', () => {
    store.openUploadResourceModal();
    fixture.detectChanges();

    component.updateField('title', 'Geometric Shapes Interactive Guide');
    component.updateField('className', 'JSS 1C');
    component.updateField('subject', 'Mathematics');
    component.updateField('week', 'Week 6');
    component.updateField('topic', 'Geometry');
    component.updateField('resourceType', 'Worksheet');
    component.updateField('audience', 'Learners');
    component.updateField('format', 'PDF');
    component.updateField('linkedDeliveryPack', 'JSS 1C - Math W6');

    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector(
      '.btn-submit',
    ) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(false);

    submitBtn.click();
    fixture.detectChanges();

    expect(store.isUploadResourceModalOpen()).toBe(false);
    expect(
      store
        .resources()
        .some((r) => r.title === 'Geometric Shapes Interactive Guide'),
    ).toBe(true);
  });

  it('should disable submit when required fields are missing', () => {
    store.openUploadResourceModal();
    fixture.detectChanges();

    component.updateField('title', '');
    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector(
      '.btn-submit',
    ) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);
  });
});
