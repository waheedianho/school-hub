import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterventionsTableComponent } from './interventions-table';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('InterventionsTableComponent', () => {
  let component: InterventionsTableComponent;
  let fixture: ComponentFixture<InterventionsTableComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionsTableComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(InterventionsTableComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    store.setInterventionSearchQuery('');
    store.setInterventionClassFilter('All Classes');
    store.setInterventionPriorityFilter('All Priorities');
    store.setInterventionStatusFilter('All Statuses');
    store.setInterventionPage(1);
    fixture.detectChanges();
  });

  it('should render table headers and 8 rows from page 1', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Learner');
    expect(compiled.textContent).toContain('Concern Area');
    expect(compiled.textContent).toContain('Intervention Type');
    expect(compiled.textContent).toContain('Assigned Staff');
    expect(compiled.textContent).toContain('Next Review Date');

    // Row 1
    expect(compiled.textContent).toContain('Adebayo, Oluwatobi');
    expect(compiled.textContent).toContain('LRN-240101');
    expect(compiled.textContent).toContain('Mathematics Weak Performance');
    expect(compiled.textContent).toContain('Mr. Adekunle J.');

    // Row 2
    expect(compiled.textContent).toContain('Bello, Chiamaka');
    expect(compiled.textContent).toContain('Low Attendance');

    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(8);
  });

  it('should filter rows by search query', () => {
    component.onSearch({
      target: { value: 'Adebayo' },
    } as unknown as Event);
    fixture.detectChanges();

    expect(component.interventions().length).toBe(1);
    expect(component.interventions()[0].learnerName).toContain('Adebayo');
  });

  it('should filter rows by class dropdown', () => {
    component.onClassFilter({
      target: { value: 'JSS 1A' },
    } as unknown as Event);
    fixture.detectChanges();

    expect(component.interventions().length).toBe(2);
    expect(
      component.interventions().every((i) => i.className === 'JSS 1A'),
    ).toBe(true);
  });

  it('should open case details when row is clicked', () => {
    vi.spyOn(store, 'openInterventionDetails');
    const firstRow = component.interventions()[0];
    component.onSelectCase(firstRow);

    expect(store.openInterventionDetails).toHaveBeenCalledWith(firstRow);
  });

  it('should change page when pagination controls are clicked', () => {
    component.onPageChange(2);
    expect(store.interventionPage()).toBe(2);
  });

  it('should map status and priority to correct CSS classes', () => {
    expect(component.getStatusClass('In Progress')).toBe('status-progress');
    expect(component.getStatusClass('Monitoring')).toBe('status-monitoring');
    expect(component.getStatusClass('Under Review')).toBe('status-review');
    expect(component.getStatusClass('Resolved')).toBe('status-resolved');

    expect(component.getPriorityClass('High')).toBe('priority-high');
    expect(component.getPriorityClass('Medium')).toBe('priority-medium');
    expect(component.getPriorityClass('Low')).toBe('priority-low');
  });
});
