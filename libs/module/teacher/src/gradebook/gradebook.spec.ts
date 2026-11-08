import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TeacherGradebookComponent } from './gradebook';

describe('TeacherGradebookComponent', () => {
  let component: TeacherGradebookComponent;
  let fixture: ComponentFixture<TeacherGradebookComponent>;
  let routerMock: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    routerMock = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TeacherGradebookComponent],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherGradebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter records by search query', () => {
    component.onFiltersChanged({
      term: 'Term 1 2025/2026',
      className: 'JSS 1A',
      subject: 'English Language',
      assessmentGroup: 'All Assessments',
      searchQuery: 'Maryam',
    });

    const filtered = component.filteredRecords();
    expect(filtered.length).toBe(1);
    expect(filtered[0].learnerName).toBe('Maryam Ibrahim');
  });

  it('should navigate to classes with query param when viewing a record', () => {
    const record = component.allRecords()[0];
    component.onViewRecord(record);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/teacher/classes'], {
      queryParams: { student: record.id },
    });
  });

  it('should navigate to assignments when approve pending action triggered', () => {
    component.onQuickAction('approve-pending');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/teacher/assignments']);
  });

  it('should navigate to reports when open reports action triggered', () => {
    component.onQuickAction('open-reports');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/teacher/reports']);
  });
});
