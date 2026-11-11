import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsShareModalComponent } from './share-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ReportsShareModalComponent', () => {
  let component: ReportsShareModalComponent;
  let fixture: ComponentFixture<ReportsShareModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsShareModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsShareModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    store.openShareLeadershipModal();
    fixture.detectChanges();
  });

  it('should render share dialog with recipient checkboxes', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Share Report with Leadership');
    expect(compiled.textContent).toContain('Principal & Head of School');
    expect(compiled.textContent).toContain('Board of Governors');
    expect(compiled.textContent).toContain('Academic Quality Committee');
  });

  it('should toggle recipient selection and update note', () => {
    component.toggleRecipient('Principal & Head of School');
    expect(component.recipients().includes('Principal & Head of School')).toBe(
      false,
    );

    component.toggleRecipient('Principal & Head of School');
    expect(component.recipients().includes('Principal & Head of School')).toBe(
      true,
    );

    const textarea = fixture.nativeElement.querySelector(
      '.form-textarea',
    ) as HTMLTextAreaElement;
    textarea.value = 'Important leadership briefing notes';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.executiveNote()).toBe(
      'Important leadership briefing notes',
    );
  });

  it('should trigger store share action on submit and close on cancel', () => {
    vi.spyOn(store, 'shareReportWithLeadership');
    vi.spyOn(store, 'closeShareLeadershipModal');

    component.onSubmit();
    expect(store.shareReportWithLeadership).toHaveBeenCalled();

    component.onClose();
    expect(store.closeShareLeadershipModal).toHaveBeenCalled();
  });
});
