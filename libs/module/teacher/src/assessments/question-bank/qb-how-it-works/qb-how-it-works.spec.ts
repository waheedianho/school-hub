import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QBHowItWorksComponent } from './qb-how-it-works';

describe('QBHowItWorksComponent', () => {
  let component: QBHowItWorksComponent;
  let fixture: ComponentFixture<QBHowItWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QBHowItWorksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QBHowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 5 workflow steps', () => {
    const steps = fixture.nativeElement.querySelectorAll('.step-item');
    expect(steps.length).toBe(5);
  });
});
