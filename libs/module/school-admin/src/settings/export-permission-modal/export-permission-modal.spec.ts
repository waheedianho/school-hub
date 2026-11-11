import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExportPermissionModalComponent } from './export-permission-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ExportPermissionModalComponent', () => {
  let component: ExportPermissionModalComponent;
  let fixture: ComponentFixture<ExportPermissionModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportPermissionModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    store = TestBed.inject(SchoolAdminStore);
    fixture = TestBed.createComponent(ExportPermissionModalComponent);
    component = fixture.componentInstance;
    store.openExportPermissionModal();
    fixture.detectChanges();
  });

  it('should render dialog with format options', () => {
    expect(component).toBeTruthy();
    const dialog = fixture.nativeElement.querySelector('.modal-dialog');
    expect(dialog).toBeTruthy();
    expect(dialog.textContent).toContain('Export Permissions Report');
    expect(dialog.textContent).toContain('PDF Document');
    expect(dialog.textContent).toContain('CSV Spreadsheet');
  });

  it('should toggle format selection', () => {
    expect(component.selectedFormat()).toBe('PDF');
    const csvCard = fixture.nativeElement.querySelector(
      '[data-testid="format-csv"]',
    ) as HTMLElement;
    csvCard.click();
    expect(component.selectedFormat()).toBe('CSV');
  });

  it('should call store.exportPermissionReport when export is clicked', () => {
    const exportSpy = vi.spyOn(store, 'exportPermissionReport');
    const submitBtn = fixture.nativeElement.querySelector(
      '[data-testid="submit-export-btn"]',
    ) as HTMLButtonElement;
    submitBtn.click();
    expect(exportSpy).toHaveBeenCalledWith('PDF');
  });

  it('should close when cancel button is clicked', () => {
    const closeSpy = vi.spyOn(store, 'closeExportPermissionModal');
    const cancelBtn = fixture.nativeElement.querySelector(
      '.modal-footer .btn-outline',
    ) as HTMLButtonElement;
    cancelBtn.click();
    expect(closeSpy).toHaveBeenCalled();
  });
});
