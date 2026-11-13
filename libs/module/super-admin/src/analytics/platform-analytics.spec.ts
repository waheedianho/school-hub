import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PlatformAnalyticsComponent } from './platform-analytics';
import { SuperAdminStore } from '../data/super-admin.store';
import { ATTENTION_SCHOOLS_DATA } from '../data/super-admin-analytics.data';

describe('PlatformAnalyticsComponent', () => {
  let component: PlatformAnalyticsComponent;
  let fixture: ComponentFixture<PlatformAnalyticsComponent>;
  let store: SuperAdminStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformAnalyticsComponent],
      providers: [
        SuperAdminStore,
        {
          provide: Router,
          useValue: {
            navigate: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformAnalyticsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SuperAdminStore);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header title and description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Platform Analytics',
    );
    expect(compiled.textContent).toContain(
      'Monitor usage, adoption, academic activity',
    );
  });

  it('should allow changing the date range via method', () => {
    vi.spyOn(store, 'setAnalyticsDateRange');
    component.onDateRangeChange('Last 30 Days');
    expect(store.setAnalyticsDateRange).toHaveBeenCalledWith('Last 30 Days');
    expect(component.toastMessage()).toContain(
      'Updated analytics view for Last 30 Days',
    );
  });

  it('should toggle and select date range from menu', () => {
    expect(component.isDatePickerOpen()).toBe(false);
    component.toggleDatePicker();
    expect(component.isDatePickerOpen()).toBe(true);

    vi.spyOn(store, 'setAnalyticsDateRange');
    component.selectDateRange('This Quarter (Q2 2025)');
    expect(store.setAnalyticsDateRange).toHaveBeenCalledWith(
      'This Quarter (Q2 2025)',
    );
    expect(component.isDatePickerOpen()).toBe(false);
  });

  it('should open and close school attention modal', () => {
    const school = ATTENTION_SCHOOLS_DATA[0];
    component.handleSchoolSelect(school);
    fixture.detectChanges();

    expect(component.selectedSchool()).toEqual(school);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(school.name);
    expect(compiled.textContent).toContain('Engagement Rate');

    component.closeSchoolModal();
    fixture.detectChanges();
    expect(component.selectedSchool()).toBeNull();
  });

  it('should navigate to schools list', () => {
    component.navigateToSchools();
    expect(router.navigate).toHaveBeenCalledWith(['/super-admin/schools']);
  });

  it('should show toast on export report', () => {
    component.exportReport();
    expect(component.toastMessage()).toContain('Exporting platform analytics');
  });

  it('should dismiss attention school', () => {
    const school = ATTENTION_SCHOOLS_DATA[0];
    component.handleSchoolSelect(school);
    vi.spyOn(store, 'dismissAttentionSchool');

    store.dismissAttentionSchool(school.id);
    component.closeSchoolModal();

    expect(store.dismissAttentionSchool).toHaveBeenCalledWith(school.id);
    expect(component.selectedSchool()).toBeNull();
  });
});
