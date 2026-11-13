import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsTableComponent } from './reports-table';
import { INITIAL_PLATFORM_REPORTS } from '../../data/super-admin-reports.data';

describe('ReportsTableComponent', () => {
  let component: ReportsTableComponent;
  let fixture: ComponentFixture<ReportsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('reports', INITIAL_PLATFORM_REPORTS);
    fixture.componentRef.setInput(
      'totalCount',
      INITIAL_PLATFORM_REPORTS.length,
    );
    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalPages', 1);
    fixture.componentRef.setInput('pageSize', 7);
    fixture.componentRef.setInput('searchQuery', '');
    fixture.componentRef.setInput('selectedSchool', 'All Schools');
    fixture.componentRef.setInput('selectedType', 'All Report Types');
    fixture.componentRef.setInput('selectedStatus', 'All Statuses');
    fixture.componentRef.setInput('selectedDateRange', 'May 1 – May 31, 2025');
    fixture.detectChanges();
  });

  it('should create and render all table rows', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr.table-row');
    expect(rows.length).toBe(INITIAL_PLATFORM_REPORTS.length);
  });

  it('should display report details and status badges correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstRow = compiled.querySelector('tbody tr.table-row');
    expect(firstRow?.textContent).toContain('School Performance Summary');
    expect(firstRow?.textContent).toContain('School Performance');
    expect(firstRow?.textContent).toContain('All Schools');
    expect(firstRow?.textContent).toContain('Ready');
    expect(firstRow?.textContent).toContain('Super Admin');
  });

  it('should emit events on search, filter, and action button clicks', () => {
    const searchSpy = vi.fn();
    const createSpy = vi.fn();
    const scheduleSpy = vi.fn();
    const exportSpy = vi.fn();

    component.searchChange.subscribe(searchSpy);
    component.createReportClicked.subscribe(createSpy);
    component.scheduleReportClicked.subscribe(scheduleSpy);
    component.exportClicked.subscribe(exportSpy);

    component.onSearchInput('Coverage');
    expect(searchSpy).toHaveBeenCalledWith('Coverage');

    const compiled = fixture.nativeElement as HTMLElement;
    const createBtn = compiled.querySelector(
      '.btn-primary',
    ) as HTMLButtonElement;
    createBtn.click();
    expect(createSpy).toHaveBeenCalled();
  });
});
