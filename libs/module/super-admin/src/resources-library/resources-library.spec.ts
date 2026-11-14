import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ResourcesLibraryComponent } from './resources-library';
import { SuperAdminStore } from '../data/super-admin.store';
import { INITIAL_RESOURCES } from '../data/super-admin-resources.data';

describe('ResourcesLibraryComponent', () => {
  let component: ResourcesLibraryComponent;
  let fixture: ComponentFixture<ResourcesLibraryComponent>;
  let store: SuperAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesLibraryComponent],
      providers: [SuperAdminStore, provideRouter([])],
    }).compileComponents();

    store = TestBed.inject(SuperAdminStore);
    fixture = TestBed.createComponent(ResourcesLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and render page header', () => {
    expect(component).toBeTruthy();
    expect(store).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Resources Library');
    expect(compiled.textContent).toContain(
      'Manage platform-wide academic resources',
    );
  });

  it('should render navigation tabs with badges', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('All Resources');
    expect(compiled.textContent).toContain('Lesson Notes');
    expect(compiled.textContent).toContain('1,842');
    expect(compiled.textContent).toContain('Videos');
    expect(compiled.textContent).toContain('Worksheets');
  });

  it('should switch tabs on tab click', () => {
    const tabSpy = vi.spyOn(store, 'setResourceTab');
    component.onTabChange('Videos');
    expect(tabSpy).toHaveBeenCalledWith('Videos');
  });

  it('should open and close modals', () => {
    expect(component.activeModal()).toBeNull();

    component.openCreateFolder();
    expect(component.activeModal()).toBe('folder');

    component.closeModal();
    expect(component.activeModal()).toBeNull();

    component.openBulkImport();
    expect(component.activeModal()).toBe('import');

    component.closeModal();
    expect(component.activeModal()).toBeNull();

    component.openResourceDetail(INITIAL_RESOURCES[0]);
    expect(component.activeModal()).toBe('detail');
    expect(component.selectedResourceForDetail()).toBe(INITIAL_RESOURCES[0]);

    component.closeModal();
    expect(component.activeModal()).toBeNull();
  });

  it('should handle approve and reject resource actions', () => {
    const target = INITIAL_RESOURCES[2];
    component.onApproveResource(target.id);
    expect(store.allResources().find((r) => r.id === target.id)?.status).toBe(
      'Approved',
    );

    component.onRejectResource(target.id);
    expect(store.allResources().find((r) => r.id === target.id)?.status).toBe(
      'Rejected',
    );
  });

  it('should handle delete resource action', () => {
    const initialCount = store.allResources().length;
    const targetId = INITIAL_RESOURCES[0].id;
    component.onDeleteResource(targetId);
    expect(store.allResources().length).toBe(initialCount - 1);
  });

  it('should clear all filters', () => {
    store.setResourceSearch('Test search');
    store.setResourceTab('Videos');
    component.clearFilters();

    expect(store.resourceSearchQuery()).toBe('');
    expect(store.selectedResourceTab()).toBe('All Resources');
    expect(store.selectedResourceSchoolFilter()).toBe('All Schools');
  });
});
