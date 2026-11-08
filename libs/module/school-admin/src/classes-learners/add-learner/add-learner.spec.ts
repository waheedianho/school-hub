import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AddLearnerComponent } from './add-learner';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('AddLearnerComponent', () => {
  let component: AddLearnerComponent;
  let fixture: ComponentFixture<AddLearnerComponent>;
  let store: SchoolAdminStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLearnerComponent],
      providers: [
        SchoolAdminStore,
        {
          provide: Router,
          useValue: { navigate: vi.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddLearnerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create and render all 6 form sections and side cards', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1.page-title')?.textContent).toContain(
      'Add Learner',
    );
    expect(compiled.querySelectorAll('.form-section-card').length).toBe(6);
    expect(compiled.querySelector('.enrollment-summary')).toBeTruthy();
    expect(compiled.querySelector('.progress-checklist')).toBeTruthy();
  });

  it('should auto-generate username when first and last names are entered', () => {
    component.updateField('firstName', 'Chioma');
    component.updateField('lastName', 'Okeke');
    expect(component.formData().username).toBe('chioma.okeke');
  });

  it('should navigate back on cancel', () => {
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith([
      '/school-admin/classes-learners',
    ]);
  });

  it('should submit form, call store.createLearner, and navigate back', () => {
    const spy = vi.spyOn(store, 'createLearner');
    component.updateField('firstName', 'Emeka');
    component.updateField('lastName', 'Nwankwo');
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith([
      '/school-admin/classes-learners',
    ]);
  });
});
