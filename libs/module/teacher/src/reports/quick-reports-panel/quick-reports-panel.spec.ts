import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuickReportsPanelComponent } from './quick-reports-panel';
import { QUICK_REPORTS_LIST } from '../../data/teacher-reports.data';

describe('QuickReportsPanelComponent', () => {
  let component: QuickReportsPanelComponent;
  let fixture: ComponentFixture<QuickReportsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickReportsPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickReportsPanelComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('reports', QUICK_REPORTS_LIST);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 quick report options', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.report-item-btn');
    expect(buttons.length).toBe(4);
    expect(buttons[0].textContent).toContain('Progress Report');
    expect(buttons[1].textContent).toContain('Report Card');
    expect(buttons[2].textContent).toContain('Assessment Analysis');
    expect(buttons[3].textContent).toContain('Misconception Report');
  });

  it('should emit reportSelected when button clicked', () => {
    const spy = vi.fn();
    component.reportSelected.subscribe(spy);
    const buttons = fixture.nativeElement.querySelectorAll('.report-item-btn');
    buttons[0].click();
    expect(spy).toHaveBeenCalledWith('progress-report');
  });
});
