import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { CreateCaseComponent } from './create-case';
import { SuperAdminStore } from '../../data/super-admin.store';

describe('CreateCaseComponent', () => {
  let component: CreateCaseComponent;
  let fixture: ComponentFixture<CreateCaseComponent>;
  let store: SuperAdminStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCaseComponent],
      providers: [provideRouter([]), SuperAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCaseComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SuperAdminStore);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create and render all numbered form sections and sidebar widgets', () => {
    expect(component).toBeTruthy();
    const title = fixture.nativeElement.querySelector('.page-title');
    expect(title.textContent).toContain('Create Safeguarding Case');

    const sections =
      fixture.nativeElement.querySelectorAll('.form-section-card');
    expect(sections.length).toBe(6);

    const sidebarCards = fixture.nativeElement.querySelectorAll(
      '.create-sidebar-col .sidebar-card',
    );
    expect(sidebarCards.length).toBe(4);
  });

  it('should update readiness checklist dynamically based on inputs', () => {
    expect(component.isTitleDone()).toBe(false);
    expect(component.isInstitutionDone()).toBe(false);

    component.caseTitle.set('Cyberbullying Incident in Study Lounge');
    component.selectedInstitution.set('Greenwood High School');
    component.description.set(
      'Detailed statement regarding student messages in study room.',
    );
    fixture.detectChanges();

    expect(component.isTitleDone()).toBe(true);
    expect(component.isInstitutionDone()).toBe(true);
    expect(component.isSeverityDone()).toBe(true);
    expect(component.isDescriptionDone()).toBe(true);
  });

  it('should add and remove tags', () => {
    const initialTags = component.tags().length;
    component.tagInput.set('online-harassment');
    component.addTag();
    expect(component.tags().length).toBe(initialTags + 1);
    expect(component.tags()).toContain('online-harassment');

    component.removeTag('online-harassment');
    expect(component.tags()).not.toContain('online-harassment');
  });

  it('should create a safeguarding case on form submit', () => {
    const initialCount = store.safeguardingCases().length;
    const navSpy = vi.spyOn(router, 'navigate');

    component.caseTitle.set('Test Safeguarding Case');
    component.selectedInstitution.set('Greenwood High School');
    component.description.set('A valid description with sufficient length.');
    component.onSubmit();

    expect(store.safeguardingCases().length).toBe(initialCount + 1);
    expect(navSpy).toHaveBeenCalledWith([
      '/super-admin/safeguarding-compliance',
    ]);
  });

  it('should navigate back when draft is saved', () => {
    const navSpy = vi.spyOn(router, 'navigate');
    component.saveDraft();
    expect(navSpy).toHaveBeenCalledWith([
      '/super-admin/safeguarding-compliance',
    ]);
  });
});
