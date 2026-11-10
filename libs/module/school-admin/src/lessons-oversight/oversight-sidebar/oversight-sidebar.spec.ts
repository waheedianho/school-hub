import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OversightSidebarComponent } from './oversight-sidebar';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('OversightSidebarComponent', () => {
  let component: OversightSidebarComponent;
  let fixture: ComponentFixture<OversightSidebarComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OversightSidebarComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(OversightSidebarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render oversight summary', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Oversight Summary');
    expect(compiled.textContent).toContain('Whole School');
    expect(compiled.textContent).toContain('Total Active Teachers');
    expect(compiled.textContent).toContain('Attention Needed');
    expect(compiled.textContent).toContain(
      'lessons without approved delivery packs',
    );
  });

  it('should adapt to delivery oversight summary when active tab changes', () => {
    store.setActiveLessonsTab('delivery-oversight');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Delivery Oversight Summary');
    expect(compiled.textContent).toContain('Total Classes Monitored');
    expect(compiled.textContent).toContain('Lessons On Schedule');
    expect(compiled.textContent).toContain('Lessons Delayed');
  });

  it('should trigger sidebar quick actions', () => {
    component.onReviewLessons();
    expect(store.activeLessonsTab()).toBe('lesson-reviews');

    component.onCheckDeliveryPacks();
    expect(store.activeLessonsTab()).toBe('delivery-oversight');

    component.onAssignFollowUp();
    expect(store.setupSaveStatus()).toContain('Assign follow-up task modal');

    component.onExportReport();
    expect(store.setupSaveStatus()).toContain('audit report as PDF');
  });
});
