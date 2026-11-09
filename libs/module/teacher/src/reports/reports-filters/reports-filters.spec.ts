import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsFiltersComponent } from './reports-filters';

describe('ReportsFiltersComponent', () => {
  let component: ReportsFiltersComponent;
  let fixture: ComponentFixture<ReportsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filtersChanged on change', () => {
    const spy = vi.fn();
    component.filtersChanged.subscribe(spy);
    component.selectedClass.set('JSS 1B');
    component.onFilterChange();
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'JSS 1B',
      }),
    );
  });

  it('should emit generateReport when button is clicked', () => {
    const spy = vi.fn();
    component.generateReport.subscribe(spy);
    const btn = fixture.nativeElement.querySelector('.btn-generate-report');
    btn.click();
    expect(spy).toHaveBeenCalled();
  });
});
