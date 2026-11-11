import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterventionsSidebarComponent } from './interventions-sidebar';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('InterventionsSidebarComponent', () => {
  let component: InterventionsSidebarComponent;
  let fixture: ComponentFixture<InterventionsSidebarComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionsSidebarComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(InterventionsSidebarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should render summary counts, 4 attention items, and 4 quick actions', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.querySelector('[data-testid="sidebar-summary-card"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="sidebar-attention-card"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="sidebar-actions-card"]'),
    ).toBeTruthy();

    expect(compiled.textContent).toContain('Intervention Summary');
    expect(compiled.textContent).toContain('22');
    expect(compiled.textContent).toContain('36');
    expect(compiled.textContent).toContain('14');
    expect(compiled.textContent).toContain('128');

    expect(compiled.textContent).toContain('Attention Needed');
    expect(compiled.textContent).toContain('Overdue review meeting');
    expect(compiled.textContent).toContain(
      'Learners with declining attendance',
    );

    expect(compiled.textContent).toContain('Create Intervention Plan');
    expect(compiled.textContent).toContain('Assign Follow-up');
    expect(compiled.textContent).toContain('Schedule Parent Meeting');
    expect(compiled.textContent).toContain('Export Intervention Report');
  });

  it('should trigger modals when quick actions are clicked', () => {
    vi.spyOn(store, 'openCreateInterventionModal');
    vi.spyOn(store, 'openAssignFollowUpModal');
    vi.spyOn(store, 'openScheduleParentMeetingModal');
    vi.spyOn(store, 'openExportInterventionModal');

    component.onCreatePlan();
    expect(store.openCreateInterventionModal).toHaveBeenCalled();

    component.onAssignFollowUp();
    expect(store.openAssignFollowUpModal).toHaveBeenCalled();

    component.onScheduleParentMeeting();
    expect(store.openScheduleParentMeetingModal).toHaveBeenCalled();

    component.onExportReport();
    expect(store.openExportInterventionModal).toHaveBeenCalled();
  });

  it('should toggle attention item selection when clicked', () => {
    const item = store.interventionsAttentionItems()[0];
    component.onSelectAttentionItem(item);
    expect(store.selectedInterventionAttentionItem()?.id).toBe(item.id);
  });
});
