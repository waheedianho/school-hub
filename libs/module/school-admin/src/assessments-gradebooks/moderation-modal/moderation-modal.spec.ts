import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModerationModalComponent } from './moderation-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ModerationModalComponent', () => {
  let component: ModerationModalComponent;
  let fixture: ComponentFixture<ModerationModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModerationModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ModerationModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);

    const sub = store.learnerSubmissions()[0];
    store.openModerationModal(sub);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display learner details in the modal', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Score Moderation & Verification');
    expect(compiled.textContent).toContain('Maryam Ibrahim');
    expect(compiled.textContent).toContain('Teacher Score');
  });

  it('should close modal when cancel is clicked', () => {
    const spy = vi.spyOn(store, 'closeModerationModal');
    component.onClose();
    expect(spy).toHaveBeenCalled();
  });

  it('should save moderated score when submitted', () => {
    const spy = vi.spyOn(store, 'saveModeratedScore');
    component.moderatedScore.set(27);
    component.rubricComment.set('Excellent improvements noted');
    component.onSave();
    expect(spy).toHaveBeenCalledWith(
      'sub-1',
      27,
      'Excellent improvements noted',
    );
  });
});
