import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  CurriculumFiltersComponent,
  CurriculumFilterValues,
} from './curriculum-filters';

describe('CurriculumFiltersComponent', () => {
  let component: CurriculumFiltersComponent;
  let fixture: ComponentFixture<CurriculumFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumFiltersComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with initial default filters', () => {
    expect(component).toBeTruthy();
    expect(component.selectedTerm).toBe('Term 1 2025/2026');
    expect(component.selectedClass).toBe('All Classes');
    expect(component.selectedSubject).toBe('All Subjects');
    expect(component.searchQuery).toBe('');
  });

  it('should emit filterChange when filter updated', () => {
    let emitted: CurriculumFilterValues | undefined;
    component.filterChange.subscribe((val) => (emitted = val));

    component.searchQuery = 'Speech';
    component.onFilterUpdated();

    expect(emitted).toEqual({
      term: 'Term 1 2025/2026',
      classId: 'All Classes',
      subject: 'All Subjects',
      search: 'Speech',
    });
  });
});
