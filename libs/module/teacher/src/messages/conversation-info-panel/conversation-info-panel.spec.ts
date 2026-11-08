import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MESSAGE_QUICK_TEMPLATES,
  RECENT_ANNOUNCEMENTS,
  TEACHER_CONVERSATIONS,
} from '../../data/teacher-messages.data';
import { ConversationInfoPanelComponent } from './conversation-info-panel';

describe('ConversationInfoPanelComponent', () => {
  let component: ConversationInfoPanelComponent;
  let fixture: ComponentFixture<ConversationInfoPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationInfoPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConversationInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('conversation', TEACHER_CONVERSATIONS[0]);
    fixture.componentRef.setInput('templates', MESSAGE_QUICK_TEMPLATES);
    fixture.componentRef.setInput('announcements', RECENT_ANNOUNCEMENTS);
    fixture.detectChanges();
  });

  it('should create the conversation info panel component', () => {
    expect(component).toBeTruthy();
  });

  it('should render contact details from conversation input', () => {
    const el: HTMLElement = fixture.nativeElement;
    const highlight = el.querySelector('.detail-value.highlight');
    expect(highlight?.textContent?.trim()).toBe('Hajia A. Ibrahim');
  });

  it('should emit templateSelected on template click', () => {
    const emitSpy = vi.spyOn(component.templateSelected, 'emit');
    component.onSelectTemplate(MESSAGE_QUICK_TEMPLATES[0]);
    expect(emitSpy).toHaveBeenCalledWith(MESSAGE_QUICK_TEMPLATES[0]);
  });

  it('should emit viewAllAnnouncements on View all click', () => {
    const emitSpy = vi.spyOn(component.viewAllAnnouncements, 'emit');
    component.onViewAllAnnouncements();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit announcementClicked on announcement click', () => {
    const emitSpy = vi.spyOn(component.announcementClicked, 'emit');
    component.onAnnouncementClick(RECENT_ANNOUNCEMENTS[0]);
    expect(emitSpy).toHaveBeenCalledWith(RECENT_ANNOUNCEMENTS[0]);
  });
});
