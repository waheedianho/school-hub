import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ResourcesTableComponent } from './resources-table';
import { INITIAL_RESOURCES } from '../../data/super-admin-resources.data';

describe('ResourcesTableComponent', () => {
  let component: ResourcesTableComponent;
  let fixture: ComponentFixture<ResourcesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesTableComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('resources', INITIAL_RESOURCES);
    fixture.componentRef.setInput('totalCount', 8742);
    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalPages', 875);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render table rows and columns correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(INITIAL_RESOURCES.length);

    expect(compiled.textContent).toContain('JSS1 Whole Numbers Lesson Note');
    expect(compiled.textContent).toContain('English Parts of Speech Video');
    expect(compiled.textContent).toContain('Mathematics Weekly Quiz Bank');
    expect(compiled.textContent).toContain('Photosynthesis Worksheet');
  });

  it('should handle row selection and select all', () => {
    expect(component.selectedResourceIds().size).toBe(0);

    component.toggleSelectResource(INITIAL_RESOURCES[0].id);
    expect(component.isResourceSelected(INITIAL_RESOURCES[0].id)).toBe(true);

    component.toggleSelectAll(true);
    expect(component.areAllSelected()).toBe(true);

    component.toggleSelectAll(false);
    expect(component.selectedResourceIds().size).toBe(0);
  });

  it('should toggle action menu and emit actions', () => {
    const approveSpy = vi.spyOn(component.approveResource, 'emit');
    const targetId = INITIAL_RESOURCES[2].id;

    component.onApprove(targetId);
    expect(approveSpy).toHaveBeenCalledWith(targetId);
  });

  it('should emit pageChange when navigating pages', () => {
    const pageSpy = vi.spyOn(component.pageChange, 'emit');
    component.goToPage(2);
    expect(pageSpy).toHaveBeenCalledWith(2);
  });
});
