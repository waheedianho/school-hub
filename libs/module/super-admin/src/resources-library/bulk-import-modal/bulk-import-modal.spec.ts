import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BulkImportModalComponent } from './bulk-import-modal';

describe('BulkImportModalComponent', () => {
  let component: BulkImportModalComponent;
  let fixture: ComponentFixture<BulkImportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkImportModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BulkImportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit imported and closeModal on submit', () => {
    const importSpy = vi.spyOn(component.imported, 'emit');
    const closeSpy = vi.spyOn(component.closeModal, 'emit');

    component.packName.set('JSS2 Basic Science Pack');
    component.targetSubject.set('Basic Science');
    component.autoApprove.set(true);

    component.onSubmit();

    expect(importSpy).toHaveBeenCalledWith({
      packName: 'JSS2 Basic Science Pack',
      targetSubject: 'Basic Science',
      fileCount: 18,
      autoApprove: true,
    });
    expect(closeSpy).toHaveBeenCalled();
  });
});
