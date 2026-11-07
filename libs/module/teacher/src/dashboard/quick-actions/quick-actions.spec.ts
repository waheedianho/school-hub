import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { QuickActionsComponent } from './quick-actions';
import { TEACHER_QUICK_ACTIONS_DATA } from '../../data/teacher-dashboard.data';

describe('QuickActionsComponent', () => {
  let component: QuickActionsComponent;
  let fixture: ComponentFixture<QuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickActionsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickActionsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('actions', TEACHER_QUICK_ACTIONS_DATA);
    fixture.detectChanges();
  });

  it('should create and render all quick action items', () => {
    expect(component).toBeTruthy();
    const items = fixture.nativeElement.querySelectorAll('.action-item');
    expect(items.length).toBe(5);
  });

  it('should display correct action labels and links', () => {
    const labels = fixture.nativeElement.querySelectorAll('.action-label');
    expect(labels[0].textContent).toContain('Start Live Class');
    expect(labels[3].textContent).toContain('Open Gradebook');
  });
});
