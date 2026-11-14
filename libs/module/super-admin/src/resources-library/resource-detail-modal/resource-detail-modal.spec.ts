import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceDetailModalComponent } from './resource-detail-modal';
import { INITIAL_RESOURCES } from '../../data/super-admin-resources.data';

describe('ResourceDetailModalComponent', () => {
  let component: ResourceDetailModalComponent;
  let fixture: ComponentFixture<ResourceDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceDetailModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceDetailModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('resource', INITIAL_RESOURCES[2]); // Mathematics Weekly Quiz Bank (Pending Review)
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render resource title, description, and metadata', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Mathematics Weekly Quiz Bank');
    expect(compiled.textContent).toContain('JSS2 Mathematics');
    expect(compiled.textContent).toContain('Pending Review');
  });

  it('should emit statusChanged with Approved on onApprove', () => {
    const statusSpy = vi.spyOn(component.statusChanged, 'emit');
    const closeSpy = vi.spyOn(component.closeModal, 'emit');

    component.onApprove();

    expect(statusSpy).toHaveBeenCalledWith({
      resourceId: INITIAL_RESOURCES[2].id,
      newStatus: 'Approved',
    });
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should emit statusChanged with Rejected on onReject', () => {
    const statusSpy = vi.spyOn(component.statusChanged, 'emit');
    const closeSpy = vi.spyOn(component.closeModal, 'emit');

    component.onReject();

    expect(statusSpy).toHaveBeenCalledWith({
      resourceId: INITIAL_RESOURCES[2].id,
      newStatus: 'Rejected',
    });
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should emit downloadRequested on onDownload', () => {
    const dlSpy = vi.spyOn(component.downloadRequested, 'emit');
    component.onDownload();
    expect(dlSpy).toHaveBeenCalledWith(INITIAL_RESOURCES[2].id);
  });
});
