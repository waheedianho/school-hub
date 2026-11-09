import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  ClassesFiltersComponent,
  ClassesFilterValues,
} from './classes-filters';

describe('ClassesFiltersComponent', () => {
  let component: ClassesFiltersComponent;
  let fixture: ComponentFixture<ClassesFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesFiltersComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassesFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and have default filter values', () => {
    expect(component).toBeTruthy();
    expect(component.selectedTerm).toBe('Term 1 2025/2026');
    expect(component.selectedSubject).toBe('English Language');
    expect(component.selectedStatus).toBe('All Status');
  });

  it('should emit filterChange when filter updated', () => {
    let emitted: ClassesFilterValues | undefined;
    component.filterChange.subscribe((val) => (emitted = val));

    component.searchQuery = 'JSS 1';
    component.onFilterUpdated();

    expect(emitted).toEqual({
      term: 'Term 1 2025/2026',
      subject: 'English Language',
      status: 'All Status',
      search: 'JSS 1',
    });
  });
});
