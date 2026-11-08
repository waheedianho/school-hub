import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupSummaryCardComponent } from './setup-summary-card';
import { SCHOOL_PROFILE_DATA } from '../../data/school-admin-setup.data';

describe('SetupSummaryCardComponent', () => {
  let component: SetupSummaryCardComponent;
  let fixture: ComponentFixture<SetupSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupSummaryCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SetupSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('profile', SCHOOL_PROFILE_DATA);
    fixture.detectChanges();
  });

  it('should create and display setup completion percentage', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-title')?.textContent).toContain(
      'School Setup Summary',
    );
    expect(compiled.querySelector('.gauge-number')?.textContent).toContain(
      '87%',
    );
    expect(compiled.querySelector('.metric-val')?.textContent).toContain(
      'Greenfield Secondary School',
    );
  });

  it('should compute circular gauge stroke-dashoffset accurately', () => {
    const offset = component.strokeDashoffset();
    expect(offset).toBeGreaterThan(0);
    expect(offset).toBeLessThan(component.circumference);
  });
});
