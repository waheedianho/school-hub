import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentsFiltersComponent } from './assessments-filters';

describe('AssessmentsFiltersComponent', () => {
  let component: AssessmentsFiltersComponent;
  let fixture: ComponentFixture<AssessmentsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filtersChanged when filter selection changes', () => {
    const emitSpy = vi.fn();
    component.filtersChanged.subscribe(emitSpy);

    component.selectedClass.set('JSS 1A');
    component.onFilterChange();

    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'JSS 1A',
        term: 'Term 1 2025/2026',
      }),
    );
  });

  it('should update search query and emit filtersChanged', () => {
    const emitSpy = vi.fn();
    component.filtersChanged.subscribe(emitSpy);

    component.onSearchInput('Speech');

    expect(component.searchQuery()).toBe('Speech');
    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        searchQuery: 'Speech',
      }),
    );
  });
});
