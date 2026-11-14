import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExportConfigModalComponent } from './export-config-modal';
import { DEFAULT_SYSTEM_SETTINGS } from '../../data/super-admin-settings.data';
import { ExportConfigOptions } from '../../data/super-admin-settings.models';

describe('ExportConfigModalComponent', () => {
  let component: ExportConfigModalComponent;
  let fixture: ComponentFixture<ExportConfigModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportConfigModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportConfigModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('settings', DEFAULT_SYSTEM_SETTINGS);
    fixture.detectChanges();
  });

  it('should create and render dialog when isOpen is true', () => {
    expect(component).toBeTruthy();
    const dialog = fixture.nativeElement.querySelector('.modal-dialog');
    expect(dialog).toBeTruthy();
  });

  it('should emit closeModal when close button or cancel is clicked', () => {
    let closed = false;
    component.closeModal.subscribe(() => (closed = true));
    component.onClose();
    expect(closed).toBe(true);
  });

  it('should emit exportExecuted with selected options on download', () => {
    const captured: ExportConfigOptions[] = [];
    component.exportExecuted.subscribe((opts) => captured.push(opts));
    component.onDownload();
    expect(captured.length).toBe(1);
    expect(captured[0].format).toBe('json');
    expect(captured[0].maskSecrets).toBe(true);
  });
});
