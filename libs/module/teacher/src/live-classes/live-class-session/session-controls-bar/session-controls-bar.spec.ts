import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionControlsBarComponent } from './session-controls-bar';

describe('SessionControlsBarComponent', () => {
  let component: SessionControlsBarComponent;
  let fixture: ComponentFixture<SessionControlsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionControlsBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionControlsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle mic state', () => {
    expect(component.micOn()).toBe(true);
    component.toggleMic();
    expect(component.micOn()).toBe(false);
  });

  it('should toggle camera state', () => {
    expect(component.cameraOn()).toBe(false);
    component.toggleCamera();
    expect(component.cameraOn()).toBe(true);
  });

  it('should stop sharing', () => {
    component.stopSharing();
    expect(component.screenSharing()).toBe(false);
    expect(component.whiteboardActive()).toBe(false);
  });
});
