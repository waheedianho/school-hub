import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignmentsFiltersComponent } from './assignments-filters';

describe('AssignmentsFiltersComponent', () => {
  let component: AssignmentsFiltersComponent;
  let fixture: ComponentFixture<AssignmentsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentsFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignmentsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filter changes when search input changes', () => {
    let emitted = false;
    component.filtersChanged.subscribe((filters) => {
      emitted = true;
      expect(filters.searchQuery).toBe('Maryam');
    });

    const event = {
      target: { value: 'Maryam' } as unknown as HTMLInputElement,
    } as unknown as Event;
    component.onSearch(event);

    expect(emitted).toBe(true);
  });
});
