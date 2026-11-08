import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradebookFiltersComponent } from './gradebook-filters';

describe('GradebookFiltersComponent', () => {
  let component: GradebookFiltersComponent;
  let fixture: ComponentFixture<GradebookFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradebookFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GradebookFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filtersChanged when class selection changes', () => {
    const emitSpy = vi.fn();
    component.filtersChanged.subscribe(emitSpy);

    component.selectedClass.set('JSS 1B');
    component.onFilterChange();

    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'JSS 1B',
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
});
