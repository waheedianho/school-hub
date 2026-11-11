import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkDeliveryPackModalComponent } from './link-delivery-pack-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('LinkDeliveryPackModalComponent', () => {
  let component: LinkDeliveryPackModalComponent;
  let fixture: ComponentFixture<LinkDeliveryPackModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkDeliveryPackModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkDeliveryPackModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);

    store.closeLinkDeliveryPackModal();
    fixture.detectChanges();
  });

  it('should not render dialog when closed', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-backdrop')).toBeNull();
  });

  it('should render dialog when opened', () => {
    store.openLinkDeliveryPackModal();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-backdrop')).toBeTruthy();
    expect(compiled.querySelector('#link-pack-title')?.textContent).toContain(
      'Link Resource to Delivery Pack',
    );
  });

  it('should close when cancel or close button is clicked', () => {
    store.openLinkDeliveryPackModal();
    fixture.detectChanges();

    const closeBtn = fixture.nativeElement.querySelector(
      '.btn-close',
    ) as HTMLButtonElement;
    closeBtn.click();
    fixture.detectChanges();

    expect(store.isLinkDeliveryPackModalOpen()).toBe(false);

    store.openLinkDeliveryPackModal();
    fixture.detectChanges();

    const cancelBtn = fixture.nativeElement.querySelector(
      '.btn-cancel',
    ) as HTMLButtonElement;
    cancelBtn.click();
    fixture.detectChanges();

    expect(store.isLinkDeliveryPackModalOpen()).toBe(false);
  });

  it('should link resource to delivery pack on submit', () => {
    const targetItem = store.resources().find((r) => r.id === 'res-007');
    expect(targetItem).toBeTruthy();

    store.openLinkDeliveryPackModal(targetItem);
    fixture.detectChanges();

    component.updateField('deliveryPackId', 'JSS 1C - Sci W2-Special');
    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector(
      '.btn-submit',
    ) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(false);

    submitBtn.click();
    fixture.detectChanges();

    expect(store.isLinkDeliveryPackModalOpen()).toBe(false);

    const updated = store.resources().find((r) => r.id === 'res-007');
    expect(updated?.linkedDeliveryPack).toBe('JSS 1C - Sci W2-Special');
  });

  it('should disable submit when required fields are empty', () => {
    store.openLinkDeliveryPackModal();
    fixture.detectChanges();

    component.updateField('resourceId', '');
    component.updateField('deliveryPackId', '');
    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector(
      '.btn-submit',
    ) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);
  });
});
