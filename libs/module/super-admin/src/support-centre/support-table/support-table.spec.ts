import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SupportTableComponent } from './support-table';
import { INITIAL_SUPPORT_TICKETS } from '../../data/super-admin-support.data';

describe('SupportTableComponent', () => {
  let component: SupportTableComponent;
  let fixture: ComponentFixture<SupportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportTableComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tickets', INITIAL_SUPPORT_TICKETS);
    fixture.componentRef.setInput('totalCount', 128);
    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalPages', 13);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();
  });

  it('should create and render ticket rows', () => {
    expect(component).toBeTruthy();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(INITIAL_SUPPORT_TICKETS.length);
  });

  it('should display column headers properly', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Ticket ID');
    expect(text).toContain('School / Institution');
    expect(text).toContain('Issue Type');
    expect(text).toContain('Priority');
    expect(text).toContain('Raised By');
    expect(text).toContain('Assigned To');
    expect(text).toContain('Status');
    expect(text).toContain('Last Updated');
    expect(text).toContain('SLA');
  });

  it('should emit search change when input changes', () => {
    const spy = vi.spyOn(component.searchChange, 'emit');
    const input = fixture.nativeElement.querySelector('#support-search-input');
    input.value = 'Sunrise';
    input.dispatchEvent(new Event('input'));
    expect(spy).toHaveBeenCalledWith('Sunrise');
  });

  it('should emit filter events on select changes', () => {
    const schoolSpy = vi.spyOn(component.schoolChange, 'emit');
    const schoolSelect = fixture.nativeElement.querySelector(
      '#support-school-select',
    );
    schoolSelect.value = 'Sunrise International School';
    schoolSelect.dispatchEvent(new Event('change'));
    expect(schoolSpy).toHaveBeenCalledWith('Sunrise International School');

    const catSpy = vi.spyOn(component.categoryChange, 'emit');
    const catSelect = fixture.nativeElement.querySelector(
      '#support-category-select',
    );
    catSelect.value = 'Login Problem';
    catSelect.dispatchEvent(new Event('change'));
    expect(catSpy).toHaveBeenCalledWith('Login Problem');
  });

  it('should handle select all and individual row selection', () => {
    expect(component.selectedTicketIds().length).toBe(0);
    const selectAllCheckbox =
      fixture.nativeElement.querySelector('.th-checkbox input');
    selectAllCheckbox.checked = true;
    selectAllCheckbox.dispatchEvent(new Event('change'));
    expect(component.selectedTicketIds().length).toBe(
      INITIAL_SUPPORT_TICKETS.length,
    );
  });
});
