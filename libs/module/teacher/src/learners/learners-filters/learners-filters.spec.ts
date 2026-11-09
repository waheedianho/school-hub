import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearnersFiltersComponent } from './learners-filters';

describe('LearnersFiltersComponent', () => {
  let component: LearnersFiltersComponent;
  let fixture: ComponentFixture<LearnersFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnersFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnersFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filtersChanged when class selection changes', () => {
    const emitSpy = vi.fn();
    component.filtersChanged.subscribe(emitSpy);

    component.selectedClass.set('JSS 1A');
    component.onFilterChange();

    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'JSS 1A',
      }),
    );
  });

  it('should update search query and emit filtersChanged', () => {
    const emitSpy = vi.fn();
    component.filtersChanged.subscribe(emitSpy);

    component.onSearchInput('Maryam');

    expect(component.searchQuery()).toBe('Maryam');
    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        searchQuery: 'Maryam',
      }),
    );
  });

  it('should emit toggleAdvancedFilters when Filters button is clicked', () => {
    const emitSpy = vi.fn();
    component.toggleAdvancedFilters.subscribe(emitSpy);

    const btn = fixture.nativeElement.querySelector('.btn-filters-toggle');
    btn?.click();

    expect(emitSpy).toHaveBeenCalled();
  });
});
