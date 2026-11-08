import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourcesFiltersComponent } from './resources-filters';

describe('ResourcesFiltersComponent', () => {
  let component: ResourcesFiltersComponent;
  let fixture: ComponentFixture<ResourcesFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filtersChanged when class selection changes', () => {
    const spy = vi.fn();
    component.filtersChanged.subscribe(spy);
    component.selectedClass.set('JSS 1A');
    component.onFilterChange();
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'JSS 1A',
      }),
    );
  });

  it('should update searchQuery and emit', () => {
    const spy = vi.fn();
    component.filtersChanged.subscribe(spy);
    component.onSearchInput('Fractions');
    expect(component.searchQuery()).toBe('Fractions');
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        searchQuery: 'Fractions',
      }),
    );
  });

  it('should emit toggleAdvancedFilters', () => {
    const spy = vi.fn();
    component.toggleAdvancedFilters.subscribe(spy);
    const btn = fixture.nativeElement.querySelector('.btn-filters-toggle');
    btn.click();
    expect(spy).toHaveBeenCalled();
  });
});
