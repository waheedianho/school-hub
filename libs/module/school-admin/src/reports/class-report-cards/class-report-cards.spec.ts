import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsClassReportCardsComponent } from './class-report-cards';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ReportsClassReportCardsComponent', () => {
  let component: ReportsClassReportCardsComponent;
  let fixture: ComponentFixture<ReportsClassReportCardsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsClassReportCardsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsClassReportCardsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    store.setReportClassFilter('All Classes');
    store.setReportSearchQuery('');
    fixture.detectChanges();
  });

  it('should render all 12 class stream cards with metrics and progress', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Academic Stream Report Cards');
    expect(compiled.textContent).toContain('JSS 1A');
    expect(compiled.textContent).toContain('JSS 1B');
    expect(compiled.textContent).toContain('JSS 2A');
    expect(compiled.textContent).toContain('SSS 3B');

    const cards = compiled.querySelectorAll('.class-card');
    expect(cards.length).toBe(12);
  });

  it('should filter classes by grade level dropdown', () => {
    const select = fixture.nativeElement.querySelector(
      '.filter-select',
    ) as HTMLSelectElement;
    select.value = 'JSS 1';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.classes().length).toBe(2);
    expect(component.classes()[0].className).toBe('JSS 1A');
    expect(component.classes()[1].className).toBe('JSS 1B');
  });

  it('should filter classes by search input', () => {
    component.onSearch({
      target: { value: 'JSS 1A' },
    } as unknown as Event);
    fixture.detectChanges();

    expect(component.classes().length).toBe(1);
    expect(component.classes()[0].className).toBe('JSS 1A');
  });

  it('should trigger sample preview modal and class report card approval', () => {
    vi.spyOn(store, 'openStudentReportCard');
    vi.spyOn(store, 'approveClassReportCards');

    component.onPreviewSampleReport();
    expect(store.openStudentReportCard).toHaveBeenCalled();

    const mockEvent = new MouseEvent('click');
    component.onApproveClass('cls-rep-2', mockEvent);
    expect(store.approveClassReportCards).toHaveBeenCalledWith('cls-rep-2');
  });

  it('should map status to CSS class names', () => {
    expect(component.getStatusClass('Approved')).toBe('badge-approved');
    expect(component.getStatusClass('In Progress')).toBe('badge-progress');
    expect(component.getStatusClass('Pending Approval')).toBe('badge-pending');
  });
});
