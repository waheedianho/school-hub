import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourcesSidebarComponent } from './resources-sidebar';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ResourcesSidebarComponent', () => {
  let component: ResourcesSidebarComponent;
  let fixture: ComponentFixture<ResourcesSidebarComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesSidebarComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesSidebarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);

    store.closeUploadResourceModal();
    store.closeLinkDeliveryPackModal();
    store.closeExportResourceModal();
    store.clearResourceAttentionItem();
    store.setActiveResourcesTab('library');

    fixture.detectChanges();
  });

  it('should render Resource Summary values from mock data', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.querySelector('[data-testid="sidebar-resource-summary"]'),
    ).toBeTruthy();
    expect(compiled.textContent).toContain('1,248');
    expect(compiled.textContent).toContain('842');
    expect(compiled.textContent).toContain('186');
    expect(compiled.textContent).toContain('1,036');
    expect(compiled.textContent).toContain('892');
  });

  it('should render Attention Needed items and handle selection', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const attentionRows = compiled.querySelectorAll('.attention-row');

    expect(attentionRows.length).toBe(4);
    expect(compiled.textContent).toContain('Resources awaiting approval');
    expect(compiled.textContent).toContain(
      'Delivery packs with missing resources',
    );

    const firstRow = attentionRows[0] as HTMLElement;
    firstRow.click();
    fixture.detectChanges();

    expect(store.selectedResourceAttentionItem()?.filterType).toBe('queue');
  });

  it('should trigger quick actions and call corresponding store methods', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.quick-action-btn',
    ) as NodeListOf<HTMLButtonElement>;

    expect(buttons.length).toBe(4);

    // 1. Upload Resource
    buttons[0].click();
    fixture.detectChanges();
    expect(store.isUploadResourceModalOpen()).toBe(true);

    // 2. Review Approval Queue
    buttons[1].click();
    fixture.detectChanges();
    expect(store.activeResourcesTab()).toBe('queue');

    // 3. Link to Delivery Pack
    buttons[2].click();
    fixture.detectChanges();
    expect(store.isLinkDeliveryPackModalOpen()).toBe(true);

    // 4. Export Resource Report
    buttons[3].click();
    fixture.detectChanges();
    expect(store.isExportResourceModalOpen()).toBe(true);
  });
});
