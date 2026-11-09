import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LiveClassSessionComponent } from './live-class-session';

describe('LiveClassSessionComponent', () => {
  let component: LiveClassSessionComponent;
  let fixture: ComponentFixture<LiveClassSessionComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveClassSessionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveClassSessionComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component and render session title', () => {
    expect(component).toBeTruthy();
    const title = fixture.nativeElement.querySelector('.session-title');
    expect(title.textContent).toContain('JSS 1B - English Language');
  });

  it('should navigate back to /teacher/live-classes on onBack', () => {
    let navigatedCommands: unknown[] = [];
    router.navigate = ((commands: unknown[]) => {
      navigatedCommands = commands;
      return Promise.resolve(true);
    }) as unknown as typeof router.navigate;

    component.onBack();
    expect(navigatedCommands).toEqual(['/teacher/live-classes']);
  });

  it('should navigate back on End Class', () => {
    let navigatedCommands: unknown[] = [];
    router.navigate = ((commands: unknown[]) => {
      navigatedCommands = commands;
      return Promise.resolve(true);
    }) as unknown as typeof router.navigate;

    component.onEndClass();
    expect(navigatedCommands).toEqual(['/teacher/live-classes']);
  });

  it('should render all session subcomponents', () => {
    const whiteboard = fixture.nativeElement.querySelector(
      'school-hub-session-whiteboard',
    );
    const controls = fixture.nativeElement.querySelector(
      'school-hub-session-controls-bar',
    );
    const tabs = fixture.nativeElement.querySelector('school-hub-session-tabs');
    const chat = fixture.nativeElement.querySelector('school-hub-session-chat');
    const participants = fixture.nativeElement.querySelector(
      'school-hub-session-participants',
    );
    const quickActions = fixture.nativeElement.querySelector(
      'school-hub-session-quick-actions',
    );

    expect(whiteboard).toBeTruthy();
    expect(controls).toBeTruthy();
    expect(tabs).toBeTruthy();
    expect(chat).toBeTruthy();
    expect(participants).toBeTruthy();
    expect(quickActions).toBeTruthy();
  });
});
