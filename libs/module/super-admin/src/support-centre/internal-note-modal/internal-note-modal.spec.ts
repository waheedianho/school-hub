import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternalNoteModalComponent } from './internal-note-modal';

describe('InternalNoteModalComponent', () => {
  let component: InternalNoteModalComponent;
  let fixture: ComponentFixture<InternalNoteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalNoteModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InternalNoteModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('ticketId', 'TKT-2025-5128');
    fixture.detectChanges();
  });

  it('should create and render note modal', () => {
    expect(component).toBeTruthy();
    const title = fixture.nativeElement.querySelector('#internal-note-title');
    expect(title.textContent).toContain('Add Internal Note');
  });

  it('should emit noteAdded event on submission', () => {
    const spy = vi.spyOn(component.noteAdded, 'emit');
    component.noteText.set('Investigation findings for cluster deployment.');
    component.onSubmit();

    expect(spy).toHaveBeenCalledWith({
      ticketId: 'TKT-2025-5128',
      note: 'Investigation findings for cluster deployment.',
    });
  });

  it('should emit closeModal when close button is clicked', () => {
    const spy = vi.spyOn(component.closeModal, 'emit');
    const closeBtn = fixture.nativeElement.querySelector('.close-btn');
    closeBtn.click();
    expect(spy).toHaveBeenCalled();
  });
});
