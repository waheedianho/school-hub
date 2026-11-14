import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SupportCentreComponent } from './support-centre';
import { SuperAdminStore } from '../data/super-admin.store';

describe('SupportCentreComponent', () => {
  let component: SupportCentreComponent;
  let fixture: ComponentFixture<SupportCentreComponent>;
  let store: SuperAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportCentreComponent],
      providers: [provideRouter([]), SuperAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportCentreComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SuperAdminStore);
    fixture.detectChanges();
  });

  it('should create and render header, metrics, tabs, and layout', () => {
    expect(component).toBeTruthy();
    const title = fixture.nativeElement.querySelector('.page-title');
    expect(title.textContent).toContain('Support Centre');

    const tabs = fixture.nativeElement.querySelectorAll('.tab-btn');
    expect(tabs.length).toBe(7);
  });

  it('should switch tabs on click', () => {
    const tabBtns = fixture.nativeElement.querySelectorAll('.tab-btn');
    tabBtns[1].click();
    fixture.detectChanges();

    expect(store.selectedSupportTab()).toBe('Escalations');
  });

  it('should open and close create ticket modal', () => {
    component.openCreateModal();
    fixture.detectChanges();

    expect(component.activeModal()).toBe('create');

    component.closeModal();
    fixture.detectChanges();
    expect(component.activeModal()).toBeNull();
  });

  it('should open and close assign agent modal', () => {
    component.openAssignModal('TKT-2025-5128');
    fixture.detectChanges();

    expect(component.activeModal()).toBe('assign');
    expect(component.selectedTicketIdForAssign()).toBe('TKT-2025-5128');

    component.closeModal();
    fixture.detectChanges();
    expect(component.activeModal()).toBeNull();
  });

  it('should export data without throwing error', () => {
    expect(() => component.exportData()).not.toThrow();
  });
});
