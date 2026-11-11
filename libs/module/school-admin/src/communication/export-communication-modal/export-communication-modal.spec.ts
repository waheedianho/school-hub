import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExportCommunicationModalComponent } from './export-communication-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ExportCommunicationModalComponent', () => {
  let component: ExportCommunicationModalComponent;
  let fixture: ComponentFixture<ExportCommunicationModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportCommunicationModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportCommunicationModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    store.openExportCommunicationModal();
    fixture.detectChanges();
  });

  it('creates successfully', () => {
    expect(component).toBeTruthy();
  });

  it('selects export format and triggers export', () => {
    const exportSpy = vi.spyOn(store, 'exportCommunicationReport');
    component.selectedFormat.set('CSV');
    component.onSubmit();
    expect(exportSpy).toHaveBeenCalledWith('CSV');
  });

  it('closes dialog on cancel', () => {
    const closeSpy = vi.spyOn(store, 'closeExportCommunicationModal');
    component.onClose();
    expect(closeSpy).toHaveBeenCalled();
  });
});
