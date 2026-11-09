import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionWhiteboardComponent } from './session-whiteboard';

describe('SessionWhiteboardComponent', () => {
  let component: SessionWhiteboardComponent;
  let fixture: ComponentFixture<SessionWhiteboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionWhiteboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionWhiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle tools and colors', () => {
    component.selectTool('eraser');
    expect(component.activeTool()).toBe('eraser');

    component.selectColor('#2563eb');
    expect(component.activeColor()).toBe('#2563eb');
  });

  it('should zoom in and zoom out', () => {
    component.zoomIn();
    expect(component.zoomLevel()).toBe(110);

    component.zoomOut();
    expect(component.zoomLevel()).toBe(100);
  });
});
