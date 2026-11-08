import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { CreateAnnouncementComponent } from './create-announcement';

describe('CreateAnnouncementComponent', () => {
  let component: CreateAnnouncementComponent;
  let fixture: ComponentFixture<CreateAnnouncementComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAnnouncementComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAnnouncementComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the create announcement component', () => {
    expect(component).toBeTruthy();
  });

  it('should render page header and breadcrumbs', () => {
    const el: HTMLElement = fixture.nativeElement;
    const title = el.querySelector('.page-title');
    expect(title?.textContent?.trim()).toBe('Create Announcement');
  });

  it('should navigate to messages on onCancel()', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onCancel();
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/messages']);
  });

  it('should show toast on onSaveDraft()', () => {
    component.onSaveDraft();
    expect(component.toastMessage()).toBe(
      'Announcement draft saved successfully',
    );
  });

  it('should validate title and message on onSendAnnouncement()', () => {
    component.announcementTitle.set('   ');
    component.onSendAnnouncement();
    expect(component.toastMessage()).toBe('Please enter an announcement title');

    component.announcementTitle.set('Valid Title');
    component.messageContent.set('   ');
    component.onSendAnnouncement();
    expect(component.toastMessage()).toBe(
      'Please enter announcement message content',
    );
  });

  it('should send announcement and navigate after delay', () => {
    vi.useFakeTimers();
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.announcementTitle.set('Important Exam Notice');
    component.messageContent.set('Exam is tomorrow at 9 AM.');

    component.onSendAnnouncement();
    expect(component.isSending()).toBe(true);

    vi.advanceTimersByTime(600);
    expect(component.isSending()).toBe(false);
    expect(component.toastMessage()).toBe('Announcement sent successfully!');

    vi.advanceTimersByTime(1000);
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/messages']);
    vi.useRealTimers();
  });

  it('should apply quick template', () => {
    component.onApplyTemplate(component.quickTemplates[0]);
    expect(component.messageContent()).toBe(
      component.quickTemplates[0].templateText,
    );
    expect(component.toastMessage()).toContain('Applied');
  });

  it('should handle file selection and removal', () => {
    const file = new File(['content'], 'schedule.pdf', {
      type: 'application/pdf',
    });
    const event = {
      target: {
        files: [file],
      },
    } as unknown as Event;

    component.onFileSelected(event);
    expect(component.attachedFile()).toEqual(
      expect.objectContaining({
        name: 'schedule.pdf',
        format: 'PDF',
      }),
    );

    component.onRemoveAttachment();
    expect(component.attachedFile()).toBeNull();
  });

  it('should compute recipient summary based on audience', () => {
    component.audience.set('Selected Class');
    let summary = component.recipientSummary();
    expect(summary.total).toBe(56);

    component.audience.set('Learners Only');
    summary = component.recipientSummary();
    expect(summary.learners).toBe(28);
    expect(summary.parents).toBe(0);
    expect(summary.total).toBe(28);
  });
});
