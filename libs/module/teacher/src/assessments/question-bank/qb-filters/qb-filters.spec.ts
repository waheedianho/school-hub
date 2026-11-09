import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QBFiltersComponent } from './qb-filters';

describe('QBFiltersComponent', () => {
  let component: QBFiltersComponent;
  let fixture: ComponentFixture<QBFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QBFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QBFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filtersChanged when difficulty changes', () => {
    const emitSpy = vi.fn();
    component.filtersChanged.subscribe(emitSpy);

    component.selectedDifficulty.set('Easy');
    component.onFilterChange();

    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        difficulty: 'Easy',
      }),
    );
  });

  it('should update search query and emit filtersChanged', () => {
    const emitSpy = vi.fn();
    component.filtersChanged.subscribe(emitSpy);

    component.onSearchInput('speech');

    expect(component.searchQuery()).toBe('speech');
    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        searchQuery: 'speech',
      }),
    );
  });
});
