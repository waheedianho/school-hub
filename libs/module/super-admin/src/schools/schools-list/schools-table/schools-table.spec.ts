import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolsTableComponent } from './schools-table';
import { SAMPLE_SCHOOLS_DIRECTORY } from '../../../data/super-admin-schools.data';

describe('SchoolsTableComponent', () => {
  let component: SchoolsTableComponent;
  let fixture: ComponentFixture<SchoolsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolsTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('schools', SAMPLE_SCHOOLS_DIRECTORY);
    fixture.componentRef.setInput('totalCount', 1248);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render schools rows based on pagination', () => {
    const rows = fixture.nativeElement.querySelectorAll('.table-row');
    expect(rows.length).toBe(SAMPLE_SCHOOLS_DIRECTORY.length);
  });

  it('should emit searchChange when user types in search', () => {
    let query = '';
    component.searchChange.subscribe((q) => {
      query = q;
    });

    component.onSearchInput('Greenfield');
    expect(query).toBe('Greenfield');
    expect(component.currentPage()).toBe(1);
  });

  it('should emit filter changes and reset page to 1', () => {
    let selectedStatus = '';
    component.statusChange.subscribe((s) => {
      selectedStatus = s;
    });

    component.onStatusSelect('Active');
    expect(selectedStatus).toBe('Active');
    expect(component.currentPage()).toBe(1);
  });

  it('should emit viewSchool when view button is clicked', () => {
    let viewedSchoolId = '';
    component.viewSchool.subscribe((school) => {
      viewedSchoolId = school.id;
    });

    component.onView(SAMPLE_SCHOOLS_DIRECTORY[0]);
    expect(viewedSchoolId).toBe(SAMPLE_SCHOOLS_DIRECTORY[0].id);
  });

  it('should toggle and close action menu', () => {
    component.toggleActionsMenu('sch-001');
    expect(component.activeMenuSchoolId()).toBe('sch-001');

    component.closeActionsMenu();
    expect(component.activeMenuSchoolId()).toBeNull();
  });
});
