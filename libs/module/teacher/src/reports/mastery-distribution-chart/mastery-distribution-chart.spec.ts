import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasteryDistributionChartComponent } from './mastery-distribution-chart';
import { MASTERY_DISTRIBUTION_DATA } from '../../data/teacher-reports.data';

describe('MasteryDistributionChartComponent', () => {
  let component: MasteryDistributionChartComponent;
  let fixture: ComponentFixture<MasteryDistributionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasteryDistributionChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MasteryDistributionChartComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', MASTERY_DISTRIBUTION_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 legend items', () => {
    const items = fixture.nativeElement.querySelectorAll('.legend-item');
    expect(items.length).toBe(4);
    expect(items[0].textContent).toContain('Strong');
    expect(items[1].textContent).toContain('Good');
    expect(items[2].textContent).toContain('Developing');
    expect(items[3].textContent).toContain('Weak');
  });

  it('should render center learner count', () => {
    const centerNum = fixture.nativeElement.querySelector('.donut-center-num');
    expect(centerNum.textContent).toContain('112');
  });
});
