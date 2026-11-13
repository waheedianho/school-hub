import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SchoolsListComponent } from './schools-list';
import { SuperAdminStore } from '../../data/super-admin.store';
import { SAMPLE_SCHOOLS_DIRECTORY } from '../../data/super-admin-schools.data';

describe('SchoolsListComponent', () => {
  let component: SchoolsListComponent;
  let fixture: ComponentFixture<SchoolsListComponent>;
  let store: SuperAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolsListComponent],
      providers: [provideRouter([]), SuperAdminStore],
    }).compileComponents();

    store = TestBed.inject(SuperAdminStore);
    fixture = TestBed.createComponent(SchoolsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display page title and subtitle', () => {
    const title = fixture.nativeElement.querySelector('.page-title');
    const subtitle = fixture.nativeElement.querySelector('.page-subtitle');
    expect(title.textContent).toBe('Schools / Institutions');
    expect(subtitle.textContent).toContain('Onboard, manage, and monitor');
  });

  it('should switch tabs and update store', () => {
    const tabSpy = vi.spyOn(store, 'setSchoolTab');
    component.setTab('pending');
    expect(tabSpy).toHaveBeenCalledWith('pending');
    expect(component.selectedTab()).toBe('pending');
  });

  it('should open modal when school view is selected and close on modal close', () => {
    expect(component.selectedSchoolForModal()).toBeNull();
    component.onViewSchool(SAMPLE_SCHOOLS_DIRECTORY[0]);
    expect(component.selectedSchoolForModal()).toEqual(
      SAMPLE_SCHOOLS_DIRECTORY[0],
    );

    component.closeModal();
    expect(component.selectedSchoolForModal()).toBeNull();
  });

  it('should handle school status update via store', () => {
    const updateSpy = vi.spyOn(store, 'updateSchoolStatus');
    component.onUpdateSchoolStatus({
      school: SAMPLE_SCHOOLS_DIRECTORY[0],
      status: 'Suspended',
    });
    expect(updateSpy).toHaveBeenCalledWith(
      SAMPLE_SCHOOLS_DIRECTORY[0].id,
      'Suspended',
    );
  });

  it('should handle quick action events', () => {
    component.onQuickAction('verify-setup');
    expect(component.selectedTab()).toBe('pending');
  });
});
