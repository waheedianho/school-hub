import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunicationBottomActionCardsComponent } from './bottom-action-cards';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('CommunicationBottomActionCardsComponent', () => {
  let component: CommunicationBottomActionCardsComponent;
  let fixture: ComponentFixture<CommunicationBottomActionCardsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationBottomActionCardsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunicationBottomActionCardsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('creates successfully', () => {
    expect(component).toBeTruthy();
  });

  it('renders all 4 action cards with correct titles and descriptions', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const createCard = compiled.querySelector(
      '[data-testid="card-create-announcement"]',
    );
    expect(createCard).toBeTruthy();
    expect(createCard?.textContent).toContain('Create School Announcement');

    const blastCard = compiled.querySelector(
      '[data-testid="card-schedule-blast"]',
    );
    expect(blastCard).toBeTruthy();
    expect(blastCard?.textContent).toContain('Schedule Message Blast');

    const logsCard = compiled.querySelector('[data-testid="card-review-logs"]');
    expect(logsCard).toBeTruthy();
    expect(logsCard?.textContent).toContain('Review Communication Logs');

    const reportCard = compiled.querySelector(
      '[data-testid="card-generate-report"]',
    );
    expect(reportCard).toBeTruthy();
    expect(reportCard?.textContent).toContain('Generate Communication Report');
  });

  it('triggers store methods when cards are clicked', () => {
    const createSpy = vi.spyOn(store, 'openCreateAnnouncementModal');
    component.onCreateAnnouncement();
    expect(createSpy).toHaveBeenCalled();

    const blastSpy = vi.spyOn(store, 'openScheduleBlastModal');
    component.onScheduleMessageBlast();
    expect(blastSpy).toHaveBeenCalled();

    const logsSpy = vi.spyOn(store, 'setActiveCommunicationTab');
    component.onReviewLogs();
    expect(logsSpy).toHaveBeenCalledWith('logs');

    const reportSpy = vi.spyOn(store, 'openExportCommunicationModal');
    component.onGenerateReport();
    expect(reportSpy).toHaveBeenCalled();
  });
});
