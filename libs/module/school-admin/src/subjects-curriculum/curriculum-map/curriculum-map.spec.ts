import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculumMapComponent } from './curriculum-map';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('CurriculumMapComponent', () => {
  let component: CurriculumMapComponent;
  let fixture: ComponentFixture<CurriculumMapComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumMapComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumMapComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render curriculum map table', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Whole Numbers');
    expect(compiled.textContent).toContain('LCM');
    expect(compiled.textContent).toContain('Mathematics – JSS 1');
    expect(compiled.textContent).toContain('Curriculum Flow Preview');
  });

  it('should filter curriculum maps by class level', () => {
    component.onClassChange('JSS 2');
    fixture.detectChanges();

    const tableBody = fixture.nativeElement.querySelector(
      '.curriculum-table tbody',
    ) as HTMLElement;
    expect(tableBody.textContent).toContain('Living Things');
    expect(tableBody.textContent).not.toContain('Whole Numbers');

    component.onClassChange('All Classes');
    fixture.detectChanges();
    expect(tableBody.textContent).toContain('Whole Numbers');
  });

  it('should handle quick action buttons', () => {
    component.onCreateMap();
    expect(store.setupSaveStatus()).toContain('Curriculum Map wizard opened');

    component.onReviewPacks();
    expect(store.activeCurriculumTab()).toBe('topic-delivery-packs');
  });
});
