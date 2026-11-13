import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculumContentComponent } from './curriculum-content';
import { SuperAdminStore } from '../data/super-admin.store';
import { Router } from '@angular/router';
import { SAMPLE_CURRICULUM_PACKS } from '../data/super-admin-curriculum.data';

describe('CurriculumContentComponent', () => {
  let component: CurriculumContentComponent;
  let fixture: ComponentFixture<CurriculumContentComponent>;
  let store: SuperAdminStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumContentComponent],
      providers: [
        SuperAdminStore,
        {
          provide: Router,
          useValue: {
            navigate: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumContentComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SuperAdminStore);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display page title and subtitle', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Curriculum & Content');
    expect(text).toContain(
      'Manage master curriculum packs, content governance, and platform-wide academic assets across all institutions.',
    );
  });

  it('should switch tabs and update store', () => {
    const tabSpy = vi.spyOn(store, 'setCurriculumTab');

    component.setTab('review');
    expect(tabSpy).toHaveBeenCalledWith('review');

    component.setTab('library');
    expect(tabSpy).toHaveBeenCalledWith('library');

    component.setTab('templates');
    expect(tabSpy).toHaveBeenCalledWith('templates');
  });

  it('should navigate to create pack route when create pack is clicked', () => {
    component.navigateToCreatePack();
    expect(router.navigate).toHaveBeenCalledWith([
      '/super-admin/curriculum-content/create',
    ]);
  });

  it('should open and close pack detail modal', () => {
    const pack = SAMPLE_CURRICULUM_PACKS[0];
    component.openPackDetail(pack);
    expect(component.selectedPack()).toBe(pack);

    component.closePackDetail();
    expect(component.selectedPack()).toBeNull();
  });

  it('should update pack status and delete pack via store', () => {
    const updateSpy = vi.spyOn(store, 'updateCurriculumPackStatus');
    const deleteSpy = vi.spyOn(store, 'deleteCurriculumPack');

    component.handleStatusUpdate({ id: 'CP-1001', status: 'Approved' });
    expect(updateSpy).toHaveBeenCalledWith('CP-1001', 'Approved');

    component.handleDeletePack('CP-1001');
    expect(deleteSpy).toHaveBeenCalledWith('CP-1001');
  });

  it('should trigger curriculum data export', () => {
    expect(() => component.exportCurriculumData()).not.toThrow();
  });
});
