import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsExportPanelComponent } from './reports-export-panel';

describe('ReportsExportPanelComponent', () => {
  let component: ReportsExportPanelComponent;
  let fixture: ComponentFixture<ReportsExportPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsExportPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsExportPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit export events', () => {
    const pdfSpy = vi.fn();
    const excelSpy = vi.fn();
    const shareSpy = vi.fn();

    component.exportPdf.subscribe(pdfSpy);
    component.exportExcel.subscribe(excelSpy);
    component.shareWithParent.subscribe(shareSpy);

    const buttons = fixture.nativeElement.querySelectorAll('.export-btn');
    buttons[0].click();
    expect(pdfSpy).toHaveBeenCalled();

    buttons[1].click();
    expect(excelSpy).toHaveBeenCalled();

    buttons[2].click();
    expect(shareSpy).toHaveBeenCalled();
  });
});
