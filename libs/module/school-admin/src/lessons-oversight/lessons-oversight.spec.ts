import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonsOversightComponent } from './lessons-oversight';
import { SchoolAdminStore } from '../data/school-admin.store';

describe('LessonsOversightComponent', () => {
  let component: LessonsOversightComponent;
  let fixture: ComponentFixture<LessonsOversightComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsOversightComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonsOversightComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render lessons oversight header and metrics', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.page-title')?.textContent).toContain(
      'Lessons & Delivery Oversight',
    );
    expect(compiled.textContent).toContain('Active Lessons This Week');
    expect(compiled.textContent).toContain('42');
    expect(compiled.textContent).toContain('Delivery Oversight');
    expect(compiled.textContent).toContain('Lesson Reviews');
    expect(compiled.textContent).toContain('Readiness Alerts');
  });

  it('should switch tabs and update store active tab', () => {
    component.setTab('delivery-oversight');
    fixture.detectChanges();
    expect(store.activeLessonsTab()).toBe('delivery-oversight');

    component.setTab('lesson-reviews');
    fixture.detectChanges();
    expect(store.activeLessonsTab()).toBe('lesson-reviews');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Lesson Reviews & Approvals');

    component.setTab('readiness-alerts');
    fixture.detectChanges();
    expect(store.activeLessonsTab()).toBe('readiness-alerts');
    expect(compiled.textContent).toContain('Lesson Delivery Readiness Alerts');
  });

  it('should handle check delivery packs and schedule observation actions', () => {
    component.onCheckDeliveryPacks();
    expect(store.activeLessonsTab()).toBe('delivery-oversight');

    component.onScheduleObservation();
    expect(store.setupSaveStatus()).toContain(
      'Classroom observation scheduler opened',
    );
  });

  it('should show and dismiss status notification', () => {
    store.setupSaveStatus.set('Observation scheduled successfully');
    fixture.detectChanges();

    let banner = fixture.nativeElement.querySelector('.status-banner');
    expect(banner?.textContent).toContain('Observation scheduled successfully');

    component.dismissNotification();
    fixture.detectChanges();

    banner = fixture.nativeElement.querySelector('.status-banner');
    expect(banner).toBeNull();
  });
});
