import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiveClassesFiltersComponent } from './live-classes-filters';

describe('LiveClassesFiltersComponent', () => {
  let component: LiveClassesFiltersComponent;
  let fixture: ComponentFixture<LiveClassesFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveClassesFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveClassesFiltersComponent);
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
      expect(filters.searchQuery).toBe('English');
    });

    const event = {
      target: { value: 'English' } as unknown as HTMLInputElement,
    } as unknown as Event;
    component.onSearch(event);

    expect(emitted).toBe(true);
  });
});
