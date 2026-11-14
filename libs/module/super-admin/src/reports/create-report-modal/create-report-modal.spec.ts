import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateReportModalComponent } from './create-report-modal';

describe('CreateReportModalComponent', () => {
  let component: CreateReportModalComponent;
  let fixture: ComponentFixture<CreateReportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateReportModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize with default report values', () => {
    expect(component).toBeTruthy();
    expect(component.category()).toBe('Academic Reports');
    expect(component.scope()).toBe('All Schools');
    expect(component.frequency()).toBe('Monthly');
  });

  it('should emit reportCreated when form is submitted with valid data', () => {
    const emitSpy = vi.fn();
    component.reportCreated.subscribe(emitSpy);

    component.reportName.set('Annual Compliance Audit');
    component.description.set('Full audit of all schools');
    component.category.set('Safeguarding Reports');
    component.onSubmit();

    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        reportName: 'Annual Compliance Audit',
        description: 'Full audit of all schools',
        category: 'Safeguarding Reports',
      }),
    );
  });

  it('should emit closed when cancel button or close icon is clicked', () => {
    const closeSpy = vi.fn();
    component.closed.subscribe(closeSpy);

    component.onClose();
    expect(closeSpy).toHaveBeenCalled();
  });
});
