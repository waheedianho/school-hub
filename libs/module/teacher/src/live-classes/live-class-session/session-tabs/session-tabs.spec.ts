import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LIVE_CLASS_SESSION_DETAILS } from '../../../data/teacher-live-classes.data';
import { SessionTabsComponent } from './session-tabs';

describe('SessionTabsComponent', () => {
  let component: SessionTabsComponent;
  let fixture: ComponentFixture<SessionTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionTabsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('sessionDetails', LIVE_CLASS_SESSION_DETAILS);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should switch tabs when clicked', () => {
    component.selectTab('Lesson Plan');
    expect(component.activeTab()).toBe('Lesson Plan');
  });

  it('should render lesson plan steps in Class Info tab', () => {
    const planItems = fixture.nativeElement.querySelectorAll('.plan-item');
    expect(planItems.length).toBe(
      LIVE_CLASS_SESSION_DETAILS.lessonPlanSteps.length,
    );
  });

  it('should render key points and attached materials', () => {
    const pointItems = fixture.nativeElement.querySelectorAll('.point-item');
    const materialChips =
      fixture.nativeElement.querySelectorAll('.material-chip');

    expect(pointItems.length).toBe(LIVE_CLASS_SESSION_DETAILS.keyPoints.length);
    expect(materialChips.length).toBe(
      LIVE_CLASS_SESSION_DETAILS.attachedMaterials.length,
    );
  });
});
