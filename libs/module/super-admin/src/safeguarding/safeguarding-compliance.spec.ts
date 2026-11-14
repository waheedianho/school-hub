import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SafeguardingComplianceComponent } from './safeguarding-compliance';
import { SuperAdminStore } from '../data/super-admin.store';

describe('SafeguardingComplianceComponent', () => {
  let component: SafeguardingComplianceComponent;
  let fixture: ComponentFixture<SafeguardingComplianceComponent>;
  let store: SuperAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafeguardingComplianceComponent],
      providers: [provideRouter([]), SuperAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(SafeguardingComplianceComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SuperAdminStore);
    fixture.detectChanges();
  });

  it('should create and render header, metrics, tabs, and layout', () => {
    expect(component).toBeTruthy();
    const title = fixture.nativeElement.querySelector('.page-title');
    expect(title.textContent).toContain('Safeguarding & Compliance');

    const tabs = fixture.nativeElement.querySelectorAll('.tab-btn');
    expect(tabs.length).toBe(6);
  });

  it('should switch tabs on click', () => {
    const tabBtns = fixture.nativeElement.querySelectorAll('.tab-btn');
    tabBtns[1].click();
    fixture.detectChanges();

    expect(store.selectedSafeguardingTab()).toBe('Flagged Communications');
  });

  it('should open and close assign review modal', () => {
    component.openAssignModal('CASE-2025-0871');
    fixture.detectChanges();

    expect(component.activeModal()).toBe('assign');
    expect(component.selectedCaseIdForAction()).toBe('CASE-2025-0871');

    component.closeModal();
    fixture.detectChanges();
    expect(component.activeModal()).toBeNull();
  });

  it('should open and close case detail modal', () => {
    component.openDetailModal('CASE-2025-0871');
    fixture.detectChanges();

    expect(component.activeModal()).toBe('detail');
    expect(component.selectedCase?.id).toBe('CASE-2025-0871');

    component.closeModal();
    fixture.detectChanges();
    expect(component.activeModal()).toBeNull();
  });

  it('should handle exportData without error', () => {
    expect(() => component.exportData()).not.toThrow();
  });
});
