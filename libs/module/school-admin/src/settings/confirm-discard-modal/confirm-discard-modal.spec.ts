import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDiscardModalComponent } from './confirm-discard-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ConfirmDiscardModalComponent', () => {
  let component: ConfirmDiscardModalComponent;
  let fixture: ComponentFixture<ConfirmDiscardModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDiscardModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    store = TestBed.inject(SchoolAdminStore);
    fixture = TestBed.createComponent(ConfirmDiscardModalComponent);
    component = fixture.componentInstance;
    store.updateGeneralSettings({ schoolName: 'Modified Name' });
    store.openDiscardConfirmModal();
    fixture.detectChanges();
  });

  it('should render dialog when open', () => {
    expect(component).toBeTruthy();
    const dialog = fixture.nativeElement.querySelector('.modal-dialog');
    expect(dialog).toBeTruthy();
    expect(dialog.textContent).toContain('Discard Unsaved Changes?');
  });

  it('should close dialog when cancel button is clicked', () => {
    const closeSpy = vi.spyOn(store, 'closeDiscardConfirmModal');
    const cancelBtn = fixture.nativeElement.querySelector(
      '.modal-footer .btn-outline',
    ) as HTMLButtonElement;
    cancelBtn.click();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should call store.discardGeneralSettings when confirm button is clicked', () => {
    const discardSpy = vi.spyOn(store, 'discardGeneralSettings');
    const confirmBtn = fixture.nativeElement.querySelector(
      '[data-testid="confirm-discard-btn"]',
    ) as HTMLButtonElement;
    confirmBtn.click();
    expect(discardSpy).toHaveBeenCalled();
  });
});
