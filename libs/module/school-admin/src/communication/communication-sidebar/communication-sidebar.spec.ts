import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunicationSidebarComponent } from './communication-sidebar';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('CommunicationSidebarComponent', () => {
  let component: CommunicationSidebarComponent;
  let fixture: ComponentFixture<CommunicationSidebarComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationSidebarComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunicationSidebarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('creates successfully', () => {
    expect(component).toBeTruthy();
  });

  it('renders Communication Summary stats', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const summaryCard = compiled.querySelector(
      '[data-testid="sidebar-communication-summary"]',
    );
    expect(summaryCard).toBeTruthy();
    expect(summaryCard?.textContent).toContain('96');
    expect(summaryCard?.textContent).toContain('2,184');
    expect(summaryCard?.textContent).toContain('156');
    expect(summaryCard?.textContent).toContain('94.2%');
  });

  it('renders Attention Needed items with tone badges', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const attentionCard = compiled.querySelector(
      '[data-testid="sidebar-attention-needed"]',
    );
    expect(attentionCard).toBeTruthy();
    expect(attentionCard?.textContent).toContain('Failed Deliveries');
    expect(attentionCard?.textContent).toContain('4');
    expect(attentionCard?.textContent).toContain('Unsent Drafts');
    expect(attentionCard?.textContent).toContain('6');
    expect(attentionCard?.textContent).toContain('Pending Parent Replies');
    expect(attentionCard?.textContent).toContain('37');
  });

  it('toggles attention item selection on click', () => {
    const item = component.attentionItems()[0];
    component.onSelectAttention(item);
    expect(store.selectedCommunicationAttentionItem()?.id).toBe(item.id);

    component.onSelectAttention(item);
    expect(store.selectedCommunicationAttentionItem()).toBeNull();
  });

  it('triggers quick actions', () => {
    const createSpy = vi.spyOn(store, 'openCreateAnnouncementModal');
    component.onCreateAnnouncement();
    expect(createSpy).toHaveBeenCalled();

    const sendParentSpy = vi.spyOn(store, 'openSendParentMessageModal');
    component.onSendParentMessage();
    expect(sendParentSpy).toHaveBeenCalled();

    const logsSpy = vi.spyOn(store, 'setActiveCommunicationTab');
    component.onReviewLogs();
    expect(logsSpy).toHaveBeenCalledWith('logs');

    const reportSpy = vi.spyOn(store, 'openExportCommunicationModal');
    component.onExportReport();
    expect(reportSpy).toHaveBeenCalled();
  });
});
