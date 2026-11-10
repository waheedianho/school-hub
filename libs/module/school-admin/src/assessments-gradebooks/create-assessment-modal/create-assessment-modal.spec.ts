import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAssessmentModalComponent } from './create-assessment-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('CreateAssessmentModalComponent', () => {
  let component: CreateAssessmentModalComponent;
  let fixture: ComponentFixture<CreateAssessmentModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAssessmentModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAssessmentModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);

    store.openCreateAssessmentModal();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render modal when open', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Create / Schedule Assessment');
    expect(compiled.textContent).toContain('Class Level');
    expect(compiled.textContent).toContain('Assessment Name');
  });

  it('should close modal when cancel is clicked', () => {
    const spy = vi.spyOn(store, 'closeCreateAssessmentModal');
    component.onClose();
    expect(spy).toHaveBeenCalled();
  });

  it('should create assessment when form is submitted with a name', () => {
    const spy = vi.spyOn(store, 'createAssessment');
    component.assessmentName.set('Science Project 1');
    component.onSubmit();
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        assessmentName: 'Science Project 1',
      }),
    );
  });
});
