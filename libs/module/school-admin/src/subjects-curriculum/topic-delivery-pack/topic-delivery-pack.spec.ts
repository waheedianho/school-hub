import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopicDeliveryPackComponent } from './topic-delivery-pack';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('TopicDeliveryPackComponent', () => {
  let component: TopicDeliveryPackComponent;
  let fixture: ComponentFixture<TopicDeliveryPackComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicDeliveryPackComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicDeliveryPackComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render Whole Numbers topic delivery pack', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Whole Numbers');
    expect(compiled.textContent).toContain('JSS 1 • Mathematics • Week 1');
    expect(compiled.textContent).toContain('Ready for Delivery');
    expect(compiled.textContent).toContain('Included Materials (10 Items)');
    expect(compiled.textContent).toContain('Lesson Sequence (3 Lessons)');
  });

  it('should render included materials with descriptions and status', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Lesson Note');
    expect(compiled.textContent).toContain('Tutor Guide');
    expect(compiled.textContent).toContain('Worksheet 1');
    expect(compiled.textContent).toContain('Quiz 1');
    expect(compiled.textContent).toContain('Parent Support Sheet');
  });

  it('should render lesson sequence items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(
      'Lesson 1: Reading and Writing Whole Numbers',
    );
    expect(compiled.textContent).toContain(
      'Lesson 2: Place Value and Face Value',
    );
    expect(compiled.textContent).toContain(
      'Lesson 3: Comparing and Ordering Whole Numbers',
    );
  });

  it('should trigger pack actions', () => {
    component.onBack();
    expect(store.activeCurriculumTab()).toBe('curriculum-map');

    component.onDownloadPack();
    expect(store.setupSaveStatus()).toContain(
      'downloading complete Whole Numbers',
    );

    component.onShareWithTeacher();
    expect(store.setupSaveStatus()).toContain('Delivery pack shared');

    component.onEditPack();
    expect(store.setupSaveStatus()).toContain('Edit Topic Delivery Pack');

    component.onApprovePack();
    expect(store.setupSaveStatus()).toContain('Topic Delivery Pack approved');

    const mat = store.topicDeliveryPack().includedMaterials[0];
    component.onMaterialAction(mat);
    expect(store.setupSaveStatus()).toContain('Lesson Note');
  });
});
