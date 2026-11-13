import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackDetailModalComponent } from './pack-detail-modal';
import { SAMPLE_CURRICULUM_PACKS } from '../../data/super-admin-curriculum.data';

describe('PackDetailModalComponent', () => {
  let component: PackDetailModalComponent;
  let fixture: ComponentFixture<PackDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackDetailModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PackDetailModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pack', SAMPLE_CURRICULUM_PACKS[0]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display pack title, status, and metadata', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('JSS 1 Mathematics – First Term');
    expect(text).toContain('Approved');
    expect(text).toContain('92%');
    expect(text).toContain('Sarah J.');
  });

  it('should emit close on close button click and escape key', () => {
    const closeSpy = vi.spyOn(component.modalClose, 'emit');
    const closeBtn = fixture.nativeElement.querySelector(
      'button[aria-label="Close dialog"]',
    );
    closeBtn.click();
    expect(closeSpy).toHaveBeenCalled();

    component.onEscape();
    expect(closeSpy).toHaveBeenCalledTimes(2);
  });

  it('should emit edit and delete outputs', () => {
    const editSpy = vi.spyOn(component.edit, 'emit');
    const deleteSpy = vi.spyOn(component.delete, 'emit');

    component.edit.emit(SAMPLE_CURRICULUM_PACKS[0]);
    component.delete.emit(SAMPLE_CURRICULUM_PACKS[0].id);

    expect(editSpy).toHaveBeenCalledWith(SAMPLE_CURRICULUM_PACKS[0]);
    expect(deleteSpy).toHaveBeenCalledWith(SAMPLE_CURRICULUM_PACKS[0].id);
  });
});
