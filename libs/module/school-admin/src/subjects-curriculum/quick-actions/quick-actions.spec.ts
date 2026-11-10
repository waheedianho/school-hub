import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculumQuickActionsComponent } from './quick-actions';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('CurriculumQuickActionsComponent', () => {
  let component: CurriculumQuickActionsComponent;
  let fixture: ComponentFixture<CurriculumQuickActionsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumQuickActionsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumQuickActionsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render 4 quick action cards', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Manage Scheme of Work');
    expect(compiled.textContent).toContain('View Curriculum Map');
    expect(compiled.textContent).toContain('Review Delivery Packs');
    expect(compiled.textContent).toContain('Generate Curriculum Report');
  });

  it('should switch tabs and set status on action triggers', () => {
    component.triggerAction('manage-scheme');
    expect(store.activeCurriculumTab()).toBe('scheme-of-work');

    component.triggerAction('curriculum-map');
    expect(store.activeCurriculumTab()).toBe('curriculum-map');

    component.triggerAction('delivery-packs');
    expect(store.activeCurriculumTab()).toBe('topic-delivery-packs');

    component.triggerAction('curriculum-report');
    expect(store.setupSaveStatus()).toContain('audit report');
  });
});
