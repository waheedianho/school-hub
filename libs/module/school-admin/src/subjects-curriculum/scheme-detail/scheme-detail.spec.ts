import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchemeDetailComponent } from './scheme-detail';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('SchemeDetailComponent', () => {
  let component: SchemeDetailComponent;
  let fixture: ComponentFixture<SchemeDetailComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchemeDetailComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(SchemeDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render week 4 details and lesson breakdown', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Week 4 Scheme of Work');
    expect(compiled.textContent).toContain('Fractions');
    expect(compiled.textContent).toContain('Introduction to Fractions');
    expect(compiled.textContent).toContain('Simplifying Fractions');
    expect(compiled.textContent).toContain('Comparing Fractions');
    expect(compiled.textContent).toContain('Delivery Readiness');
    expect(compiled.textContent).toContain('92%');
  });

  it('should switch between lesson breakdown and resources sub-tabs', () => {
    expect(component.activeSubTab()).toBe('lessons');

    component.setSubTab('resources');
    fixture.detectChanges();
    expect(component.activeSubTab()).toBe('resources');

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('All Resources (12)');
    expect(compiled.textContent).toContain('Fraction Lesson Slides');
    expect(compiled.textContent).toContain(
      'Worksheet 1: Introduction to Fractions',
    );
  });

  it('should filter resources by audience category', () => {
    component.setSubTab('resources');
    component.setResourceFilter('Teacher');
    fixture.detectChanges();

    const filtered = component.filteredResources();
    expect(filtered.every((r) => r.audience.includes('Teacher'))).toBe(true);
    expect(filtered.length).toBeGreaterThan(0);

    component.setResourceFilter('Learner');
    fixture.detectChanges();
    expect(
      component
        .filteredResources()
        .every((r) => r.audience.includes('Learner')),
    ).toBe(true);
  });

  it('should filter resources by search query', () => {
    component.setSubTab('resources');
    component.resourceSearch.set('video');
    fixture.detectChanges();

    const filtered = component.filteredResources();
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toContain('Video Resource');
  });

  it('should navigate back to scheme of work and view delivery pack', () => {
    component.onBackToScheme();
    expect(store.activeCurriculumTab()).toBe('scheme-of-work');

    component.onViewDeliveryPack();
    expect(store.activeCurriculumTab()).toBe('topic-delivery-packs');
  });

  it('should trigger week and resource actions', () => {
    component.onEditScheme();
    expect(store.setupSaveStatus()).toContain('Edit Week Scheme');

    component.onUploadResource();
    expect(store.setupSaveStatus()).toContain('Upload Resource');

    component.onSubmitForReview();
    expect(store.setupSaveStatus()).toContain('submitted for HOD');

    const res = store.weekResources()[0];
    component.onResourceAction(res);
    expect(store.setupSaveStatus()).toContain(res.action);
  });
});
