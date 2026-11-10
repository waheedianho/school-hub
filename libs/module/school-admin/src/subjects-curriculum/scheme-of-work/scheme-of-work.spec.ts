import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchemeOfWorkComponent } from './scheme-of-work';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('SchemeOfWorkComponent', () => {
  let component: SchemeOfWorkComponent;
  let fixture: ComponentFixture<SchemeOfWorkComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchemeOfWorkComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(SchemeOfWorkComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render scheme of work table', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Scheme Overview');
    expect(compiled.textContent).toContain('Whole Numbers');
    expect(compiled.textContent).toContain('Fractions');
    expect(compiled.textContent).toContain('Weekly Flow Preview');
  });

  it('should navigate to week detail when week is selected', () => {
    const week4 = store.schemesOfWork().find((s) => s.week === 4);
    expect(week4).toBeTruthy();
    if (week4) {
      component.onSelectWeek(week4);
      expect(store.activeCurriculumTab()).toBe('scheme-detail');
      expect(store.weekSchemeDetail()?.weekNumber).toBe(4);
    }
  });

  it('should filter by status and query', () => {
    component.onStatusChange('Needs Review');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('HCF');

    component.onStatusChange('All Status');
    component.onSearch('LCM');
    fixture.detectChanges();
    expect(compiled.textContent).toContain('LCM');
  });

  it('should trigger add, import, and export actions', () => {
    component.onAddScheme();
    expect(store.setupSaveStatus()).toContain('Add Scheme of Work wizard');

    component.onBulkImport();
    expect(store.setupSaveStatus()).toContain('Bulk Scheme Import');

    component.onExport();
    expect(store.setupSaveStatus()).toContain('Exporting complete scheme');
  });
});
