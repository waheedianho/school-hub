import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SafeguardingTableComponent } from './safeguarding-table';
import { INITIAL_SAFEGUARDING_CASES } from '../../data/super-admin-safeguarding.data';

describe('SafeguardingTableComponent', () => {
  let component: SafeguardingTableComponent;
  let fixture: ComponentFixture<SafeguardingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafeguardingTableComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SafeguardingTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cases', INITIAL_SAFEGUARDING_CASES);
    fixture.componentRef.setInput('totalCount', 87);
    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalPages', 11);
    fixture.detectChanges();
  });

  it('should create and render case rows', () => {
    expect(component).toBeTruthy();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(INITIAL_SAFEGUARDING_CASES.length);
  });

  it('should display column headers properly', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Case ID');
    expect(text).toContain('Institution');
    expect(text).toContain('Category');
    expect(text).toContain('Severity');
    expect(text).toContain('Reported By');
    expect(text).toContain('Assigned To');
    expect(text).toContain('Status');
    expect(text).toContain('Last Updated');
  });

  it('should emit search change when input changes', () => {
    const spy = vi.spyOn(component.searchChange, 'emit');
    const input = fixture.nativeElement.querySelector(
      '#safeguarding-search-input',
    );
    input.value = 'Greenwood';
    input.dispatchEvent(new Event('input'));
    expect(spy).toHaveBeenCalledWith('Greenwood');
  });

  it('should emit filter events on select changes', () => {
    const schoolSpy = vi.spyOn(component.schoolChange, 'emit');
    const schoolSelect = fixture.nativeElement.querySelector(
      '#school-filter-select',
    );
    schoolSelect.value = 'Greenwood High School';
    schoolSelect.dispatchEvent(new Event('change'));
    expect(schoolSpy).toHaveBeenCalledWith('Greenwood High School');

    const sevSpy = vi.spyOn(component.severityChange, 'emit');
    const sevSelect = fixture.nativeElement.querySelector(
      '#severity-filter-select',
    );
    sevSelect.value = 'High';
    sevSelect.dispatchEvent(new Event('change'));
    expect(sevSpy).toHaveBeenCalledWith('High');

    const statusSpy = vi.spyOn(component.statusChange, 'emit');
    const statusSelect = fixture.nativeElement.querySelector(
      '#status-filter-select',
    );
    statusSelect.value = 'Under Review';
    statusSelect.dispatchEvent(new Event('change'));
    expect(statusSpy).toHaveBeenCalledWith('Under Review');
  });

  it('should emit viewCase when case link is clicked', () => {
    const spy = vi.spyOn(component.viewCase, 'emit');
    const linkBtn = fixture.nativeElement.querySelector('.case-link-btn');
    linkBtn.click();
    expect(spy).toHaveBeenCalledWith('CASE-2025-0871');
  });

  it('should toggle action menu and emit actions', () => {
    const actionBtn = fixture.nativeElement.querySelector('.action-btn');
    actionBtn.click();
    fixture.detectChanges();

    expect(component.openActionMenuId()).toBe('CASE-2025-0871');
  });
});
