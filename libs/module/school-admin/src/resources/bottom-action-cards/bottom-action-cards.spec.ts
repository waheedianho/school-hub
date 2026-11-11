import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourcesBottomActionCardsComponent } from './bottom-action-cards';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ResourcesBottomActionCardsComponent', () => {
  let component: ResourcesBottomActionCardsComponent;
  let fixture: ComponentFixture<ResourcesBottomActionCardsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesBottomActionCardsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesBottomActionCardsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);

    store.closeUploadResourceModal();
    store.closeExportResourceModal();
    store.setActiveResourcesTab('library');

    fixture.detectChanges();
  });

  it('should render all 4 action cards and the footer notice', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.querySelector('[data-testid="card-upload-resource"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="card-review-queue"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="card-shared-templates"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="card-generate-report"]'),
    ).toBeTruthy();

    expect(compiled.textContent).toContain('Upload New Resource');
    expect(compiled.textContent).toContain('Review Approval Queue');
    expect(compiled.textContent).toContain('Manage Shared Templates');
    expect(compiled.textContent).toContain('Generate Resource Report');
    expect(compiled.textContent).toContain(
      'All resources are tagged by class, subject, week, topic, type, and audience',
    );
  });

  it('should trigger upload modal on clicking Upload New Resource card', () => {
    const card = fixture.nativeElement.querySelector(
      '[data-testid="card-upload-resource"]',
    ) as HTMLElement;
    card.click();
    fixture.detectChanges();

    expect(store.isUploadResourceModalOpen()).toBe(true);
  });

  it('should switch tab to queue on clicking Review Approval Queue card', () => {
    const card = fixture.nativeElement.querySelector(
      '[data-testid="card-review-queue"]',
    ) as HTMLElement;
    card.click();
    fixture.detectChanges();

    expect(store.activeResourcesTab()).toBe('queue');
  });

  it('should switch tab to templates on clicking Manage Shared Templates card', () => {
    const card = fixture.nativeElement.querySelector(
      '[data-testid="card-shared-templates"]',
    ) as HTMLElement;
    card.click();
    fixture.detectChanges();

    expect(store.activeResourcesTab()).toBe('templates');
  });

  it('should open export modal on clicking Generate Resource Report card', () => {
    const card = fixture.nativeElement.querySelector(
      '[data-testid="card-generate-report"]',
    ) as HTMLElement;
    card.click();
    fixture.detectChanges();

    expect(store.isExportResourceModalOpen()).toBe(true);
  });
});
