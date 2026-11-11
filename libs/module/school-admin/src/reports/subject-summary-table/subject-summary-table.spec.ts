import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsSubjectSummaryTableComponent } from './subject-summary-table';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ReportsSubjectSummaryTableComponent', () => {
  let component: ReportsSubjectSummaryTableComponent;
  let fixture: ComponentFixture<ReportsSubjectSummaryTableComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsSubjectSummaryTableComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsSubjectSummaryTableComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should render table with all 7 subjects and their columns', () => {
    expect(component).toBeTruthy();
    expect(store.subjectPerformanceRows().length).toBe(7);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Subject Performance Summary');
    expect(compiled.textContent).toContain('Mathematics');
    expect(compiled.textContent).toContain('English Language');
    expect(compiled.textContent).toContain('Basic Science');
    expect(compiled.textContent).toContain('Civic Education');
    expect(compiled.textContent).toContain('Computer Studies');
    expect(compiled.textContent).toContain('Agricultural Science');

    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(7);
  });

  it('should filter subjects when typing in search input', () => {
    const searchInput = fixture.nativeElement.querySelector(
      '.search-input',
    ) as HTMLInputElement;
    searchInput.value = 'Computer';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.rows().length).toBe(1);
    expect(component.rows()[0].subject).toBe('Computer Studies');
  });

  it('should filter subjects using subject dropdown', () => {
    const select = fixture.nativeElement.querySelector(
      '.filter-select',
    ) as HTMLSelectElement;
    select.value = 'Mathematics';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.rows().length).toBe(1);
    expect(component.rows()[0].subject).toBe('Mathematics');
  });

  it('should map status to corresponding CSS classes', () => {
    expect(component.getStatusClass('Good')).toBe('status-good');
    expect(component.getStatusClass('Needs Attention')).toBe(
      'status-attention',
    );
    expect(component.getStatusClass('Monitor')).toBe('status-monitor');
  });
});
