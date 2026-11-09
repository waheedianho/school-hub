import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradebookHowItWorksComponent } from './gradebook-how-it-works';

describe('GradebookHowItWorksComponent', () => {
  let component: GradebookHowItWorksComponent;
  let fixture: ComponentFixture<GradebookHowItWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradebookHowItWorksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GradebookHowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 4 steps', () => {
    const steps = fixture.nativeElement.querySelectorAll('.step-item');
    expect(steps.length).toBe(4);
  });
});
