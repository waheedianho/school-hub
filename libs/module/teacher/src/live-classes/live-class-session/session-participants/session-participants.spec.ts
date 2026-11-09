import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SESSION_PARTICIPANTS } from '../../../data/teacher-live-classes.data';
import { SessionParticipantsComponent } from './session-participants';

describe('SessionParticipantsComponent', () => {
  let component: SessionParticipantsComponent;
  let fixture: ComponentFixture<SessionParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionParticipantsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render participant rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('.participant-row');
    expect(rows.length).toBe(SESSION_PARTICIPANTS.length);
  });
});
