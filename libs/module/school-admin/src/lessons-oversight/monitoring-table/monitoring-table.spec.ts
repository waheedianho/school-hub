import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonMonitoringTableComponent } from './monitoring-table';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('LessonMonitoringTableComponent', () => {
  let component: LessonMonitoringTableComponent;
  let fixture: ComponentFixture<LessonMonitoringTableComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonMonitoringTableComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonMonitoringTableComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render monitoring table records', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('School Lesson Monitoring');
    expect(compiled.textContent).toContain('Whole Numbers');
    expect(compiled.textContent).toContain('Parts of Speech');
    expect(compiled.textContent).toContain('Living Things');
    expect(compiled.textContent).toContain('Our Government');
  });

  it('should filter records by class level', () => {
    component.onClassChange('JSS 2');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Living Things');
    expect(compiled.textContent).toContain('Our Government');
    expect(compiled.textContent).not.toContain('Whole Numbers');

    component.onClassChange('All Classes');
    fixture.detectChanges();
    expect(compiled.textContent).toContain('Whole Numbers');
  });

  it('should adapt headers when switching to delivery oversight tab', () => {
    store.setActiveLessonsTab('delivery-oversight');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Lesson Readiness');
    expect(compiled.textContent).toContain('Delivery Progress');
  });

  it('should handle row selection and action triggers', () => {
    const rec = store.lessonMonitoringRecords()[1];
    component.onSelectRow(rec);
    expect(store.selectedLessonRecord().id).toBe(rec.id);

    component.onViewDetails(rec);
    expect(store.setupSaveStatus()).toContain(
      'Viewing detailed delivery record',
    );

    component.onInspectDeliveryPack(rec);
    expect(store.setupSaveStatus()).toContain('Opening Delivery Pack');

    component.onMessageTeacher(rec);
    expect(store.setupSaveStatus()).toContain('Direct message window opened');
  });
});
