import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseDetailModalComponent } from './case-detail-modal';
import { INITIAL_SAFEGUARDING_CASES } from '../../data/super-admin-safeguarding.data';

describe('CaseDetailModalComponent', () => {
  let component: CaseDetailModalComponent;
  let fixture: ComponentFixture<CaseDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseDetailModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseDetailModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'safeguardingCase',
      INITIAL_SAFEGUARDING_CASES[0],
    );
    fixture.detectChanges();
  });

  it('should create and render case details', () => {
    expect(component).toBeTruthy();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('CASE-2025-0871');
    expect(text).toContain('Greenwood High School');
    expect(text).toContain('High Severity');
    expect(text).toContain('Under Review');
  });

  it('should emit statusChange when resolved button is clicked', () => {
    const spy = vi.spyOn(component.statusChange, 'emit');
    const resolvedBtn = fixture.nativeElement.querySelector('.btn-success');
    resolvedBtn.click();
    expect(spy).toHaveBeenCalledWith({
      caseId: 'CASE-2025-0871',
      newStatus: 'Resolved',
    });
  });

  it('should emit reassign when reassign button is clicked', () => {
    const spy = vi.spyOn(component.reassign, 'emit');
    const reassignBtn = fixture.nativeElement.querySelector('.btn-outline');
    reassignBtn.click();
    expect(spy).toHaveBeenCalledWith('CASE-2025-0871');
  });

  it('should emit closeModal event', () => {
    const spy = vi.spyOn(component.closeModal, 'emit');
    const closeBtn = fixture.nativeElement.querySelector('.close-btn');
    closeBtn.click();
    expect(spy).toHaveBeenCalled();
  });
});
