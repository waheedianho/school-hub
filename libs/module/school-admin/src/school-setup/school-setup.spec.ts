import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolSetupComponent } from './school-setup';
import { SchoolAdminStore } from '../data/school-admin.store';

describe('SchoolSetupComponent', () => {
  let component: SchoolSetupComponent;
  let fixture: ComponentFixture<SchoolSetupComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolSetupComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolSetupComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render header', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1.page-title')?.textContent).toContain(
      'School Setup',
    );
    expect(compiled.querySelector('.page-subtitle')?.textContent).toContain(
      'Configure your school profile',
    );
  });

  it('should render all 7 core cards and quick actions section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('school-hub-profile-settings-card'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-academic-structure-card'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-setup-summary-card'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-assessment-settings-card'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-role-permissions-card'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-communication-safeguarding-card'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-setup-checklist-card'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-setup-quick-actions'),
    ).toBeTruthy();
  });

  it('should trigger store.saveSetupChanges when Save Changes button is clicked', () => {
    const spy = vi.spyOn(store, 'saveSetupChanges');
    const saveBtn = fixture.nativeElement.querySelector(
      '.btn-save',
    ) as HTMLButtonElement;
    saveBtn.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should trigger store.publishSettings when Publish Settings button is clicked', () => {
    const spy = vi.spyOn(store, 'publishSettings');
    const publishBtn = fixture.nativeElement.querySelector(
      '.btn-publish',
    ) as HTMLButtonElement;
    publishBtn.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should display and dismiss status notification banner', () => {
    store.setupSaveStatus.set('Test Notification Message');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.banner-text')?.textContent).toContain(
      'Test Notification Message',
    );

    component.dismissNotification();
    fixture.detectChanges();
    expect(compiled.querySelector('.status-banner')).toBeNull();
  });
});
