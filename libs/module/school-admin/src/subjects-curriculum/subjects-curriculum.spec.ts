import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubjectsCurriculumComponent } from './subjects-curriculum';
import { SchoolAdminStore } from '../data/school-admin.store';

describe('SubjectsCurriculumComponent', () => {
  let component: SubjectsCurriculumComponent;
  let fixture: ComponentFixture<SubjectsCurriculumComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectsCurriculumComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectsCurriculumComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render subjects & curriculum header and summary', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.page-title')?.textContent).toContain(
      'Subjects & Curriculum',
    );
    expect(compiled.textContent).toContain('Total Subjects');
    expect(compiled.textContent).toContain('24');
    expect(compiled.textContent).toContain('Curriculum Map');
    expect(compiled.textContent).toContain('Scheme of Work');
  });

  it('should switch tabs and update store active tab', () => {
    component.setTab('curriculum-map');
    fixture.detectChanges();
    expect(store.activeCurriculumTab()).toBe('curriculum-map');

    component.setTab('scheme-of-work');
    fixture.detectChanges();
    expect(store.activeCurriculumTab()).toBe('scheme-of-work');

    component.setTab('topic-delivery-packs');
    fixture.detectChanges();
    expect(store.activeCurriculumTab()).toBe('topic-delivery-packs');

    component.setTab('approval-queue');
    fixture.detectChanges();
    expect(store.activeCurriculumTab()).toBe('approval-queue');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Curriculum Approval Queue');
  });

  it('should trigger add subject, create scheme, and bulk import actions', () => {
    component.onAddSubject();
    expect(store.setupSaveStatus()).toContain('Add Subject modal');

    component.onCreateScheme();
    expect(store.setupSaveStatus()).toContain('Create Scheme of Work');

    component.onBulkImport();
    expect(store.setupSaveStatus()).toContain('Bulk Curriculum Import');
  });

  it('should display and dismiss notification', () => {
    store.setupSaveStatus.set('Test curriculum update message');
    fixture.detectChanges();

    let banner = fixture.nativeElement.querySelector('.status-banner');
    expect(banner?.textContent).toContain('Test curriculum update message');

    component.dismissNotification();
    fixture.detectChanges();

    banner = fixture.nativeElement.querySelector('.status-banner');
    expect(banner).toBeNull();
  });
});
