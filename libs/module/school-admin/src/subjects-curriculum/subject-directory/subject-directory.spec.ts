import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubjectDirectoryComponent } from './subject-directory';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('SubjectDirectoryComponent', () => {
  let component: SubjectDirectoryComponent;
  let fixture: ComponentFixture<SubjectDirectoryComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectDirectoryComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectDirectoryComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render directory table with subjects', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.directory-title')?.textContent).toContain(
      'Subject Directory',
    );
    expect(compiled.textContent).toContain('Mathematics');
    expect(compiled.textContent).toContain('English Language');
    expect(compiled.textContent).toContain('Basic Science');
  });

  it('should filter subjects on search', () => {
    component.onSearch('English');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('English Language');
    expect(compiled.textContent).not.toContain('Basic Science');

    component.onSearch('');
    fixture.detectChanges();
    expect(compiled.textContent).toContain('Mathematics');
  });

  it('should filter subjects on status change', () => {
    component.onStatusChange('Needs Review');
    fixture.detectChanges();

    expect(store.filteredSubjects().length).toBe(2);
    component.onStatusChange('All Status');
  });

  it('should select a subject on row click', () => {
    const subj = store.subjects()[1];
    component.onSelectSubject(subj);
    expect(store.selectedSubjectId()).toBe(subj.id);
  });

  it('should trigger quick actions and alerts', () => {
    component.onQuickAction('map-curriculum');
    expect(store.activeCurriculumTab()).toBe('curriculum-map');

    component.onAlertClick('packs');
    expect(store.activeCurriculumTab()).toBe('topic-delivery-packs');
  });
});
