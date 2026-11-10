import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiveClassesQuickActionsComponent } from './quick-actions';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('LiveClassesQuickActionsComponent', () => {
  let component: LiveClassesQuickActionsComponent;
  let fixture: ComponentFixture<LiveClassesQuickActionsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveClassesQuickActionsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveClassesQuickActionsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 4 quick action cards', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll('.action-card');
    expect(cards.length).toBe(4);

    expect(el.textContent).toContain('Schedule New Class');
    expect(el.textContent).toContain('Review Recordings');
    expect(el.textContent).toContain('Monitor Attendance');
    expect(el.textContent).toContain('Generate Live Class Report');
  });

  it('should handle button clicks properly', () => {
    component.onScheduleNewClass();
    expect(store.isScheduleModalOpen()).toBe(true);

    component.onReviewRecordings();
    expect(store.activeLiveClassTab()).toBe('recordings');

    component.onGenerateReport();
    expect(store.setupSaveStatus()).toContain('report generated');
  });
});
