import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentReportsTableComponent } from './recent-reports-table';
import { RECENT_GENERATED_REPORTS } from '../../data/teacher-reports.data';

describe('RecentReportsTableComponent', () => {
  let component: RecentReportsTableComponent;
  let fixture: ComponentFixture<RecentReportsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentReportsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentReportsTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('reports', RECENT_GENERATED_REPORTS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 report rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(4);
    expect(rows[0].textContent).toContain(
      'JSS 1A – Third Term Progress Report',
    );
    expect(rows[0].textContent).toContain('Ready');
  });

  it('should emit viewReport when view button clicked', () => {
    const spy = vi.fn();
    component.viewReport.subscribe(spy);
    const btn = fixture.nativeElement.querySelector('.icon-btn');
    btn.click();
    expect(spy).toHaveBeenCalledWith(RECENT_GENERATED_REPORTS[0]);
  });
});
