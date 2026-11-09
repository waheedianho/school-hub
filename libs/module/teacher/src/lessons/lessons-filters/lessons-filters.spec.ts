import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  LessonsFiltersComponent,
  LessonsFilterValues,
} from './lessons-filters';

describe('LessonsFiltersComponent', () => {
  let component: LessonsFiltersComponent;
  let fixture: ComponentFixture<LessonsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsFiltersComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with initial default filters', () => {
    expect(component).toBeTruthy();
    expect(component.selectedTerm).toBe('Term 1 2025/2026');
    expect(component.selectedClass).toBe('All Classes');
    expect(component.selectedSubject).toBe('All Subjects');
    expect(component.selectedStatus).toBe('All Status');
    expect(component.searchQuery).toBe('');
  });

  it('should emit filterChange when filter updated', () => {
    let emitted: LessonsFilterValues | undefined;
    component.filterChange.subscribe((val) => (emitted = val));

    component.searchQuery = 'Speech';
    component.onFilterUpdated();

    expect(emitted).toEqual({
      term: 'Term 1 2025/2026',
      classId: 'All Classes',
      subject: 'All Subjects',
      status: 'All Status',
      search: 'Speech',
    });
  });
});
