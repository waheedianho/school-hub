import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceDetailsModalComponent } from './resource-details-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { ResourceItem } from '../../data/school-admin.models';

describe('ResourceDetailsModalComponent', () => {
  let component: ResourceDetailsModalComponent;
  let fixture: ComponentFixture<ResourceDetailsModalComponent>;
  let store: SchoolAdminStore;

  const mockItem: ResourceItem = {
    id: 'res-003',
    className: 'JSS 2A',
    subject: 'Basic Science',
    week: 'Week 3',
    topic: 'Living Things',
    title: 'Living Things Worksheet',
    resourceType: 'Worksheet',
    audience: 'Learners',
    format: 'PDF',
    fileSize: '2.1 MB',
    approvalStatus: 'Pending Review',
    linkedDeliveryPack: 'JSS 2A - Sci W3',
    uploadedBy: 'Mrs. Nkechi O.',
    lastUpdated: '13 May 2025',
    isLowData: true,
    description: 'Guided worksheet with classification exercises.',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceDetailsModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceDetailsModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);

    store.closeResourceDetails();
    fixture.detectChanges();
  });

  it('should not render dialog when no resource is selected', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-backdrop')).toBeNull();
  });

  it('should render dialog when resource is selected', () => {
    store.openResourceDetails(mockItem);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-backdrop')).toBeTruthy();
    expect(compiled.textContent).toContain('Living Things Worksheet');
    expect(compiled.textContent).toContain('JSS 2A');
    expect(compiled.textContent).toContain('Basic Science');
    expect(compiled.textContent).toContain('Pending Review');
    expect(compiled.textContent).toContain(
      'Guided worksheet with classification exercises.',
    );
  });

  it('should close when close button is clicked', () => {
    store.openResourceDetails(mockItem);
    fixture.detectChanges();

    const closeBtn = fixture.nativeElement.querySelector(
      '.btn-close',
    ) as HTMLButtonElement;
    closeBtn.click();
    fixture.detectChanges();

    expect(store.selectedResourceItem()).toBeNull();
  });

  it('should approve resource and close modal', () => {
    store.openResourceDetails(mockItem);
    fixture.detectChanges();

    const approveBtn = fixture.nativeElement.querySelector(
      '.btn-approve',
    ) as HTMLButtonElement;
    expect(approveBtn).toBeTruthy();

    approveBtn.click();
    fixture.detectChanges();

    expect(store.selectedResourceItem()).toBeNull();
    const updated = store.resources().find((r) => r.id === mockItem.id);
    expect(updated?.approvalStatus).toBe('Approved');
  });

  it('should reject resource and mark as draft', () => {
    store.openResourceDetails(mockItem);
    fixture.detectChanges();

    const rejectBtn = fixture.nativeElement.querySelector(
      '.btn-reject',
    ) as HTMLButtonElement;
    expect(rejectBtn).toBeTruthy();

    rejectBtn.click();
    fixture.detectChanges();

    expect(store.selectedResourceItem()).toBeNull();
    const updated = store.resources().find((r) => r.id === mockItem.id);
    expect(updated?.approvalStatus).toBe('Draft');
  });
});
