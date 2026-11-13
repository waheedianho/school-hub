import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePackComponent } from './create-pack';
import { SuperAdminStore } from '../../data/super-admin.store';
import { Router } from '@angular/router';

describe('CreatePackComponent', () => {
  let component: CreatePackComponent;
  let fixture: ComponentFixture<CreatePackComponent>;
  let store: SuperAdminStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePackComponent],
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

    fixture = TestBed.createComponent(CreatePackComponent);
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
    expect(text).toContain('Create Curriculum Pack');
    expect(text).toContain(
      'Build and publish a master curriculum pack for schools and institutions.',
    );
  });

  it('should render all 5 stepper steps', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Pack Details');
    expect(text).toContain('Curriculum Structure');
    expect(text).toContain('Content Components');
    expect(text).toContain('Standards & Access');
    expect(text).toContain('Review & Publish');
  });

  it('should toggle content components', () => {
    const initialChecked = store.contentComponents()[0].checked;
    component.toggleComponent(store.contentComponents()[0].id);
    expect(store.contentComponents()[0].checked).toBe(!initialChecked);
  });

  it('should add a new week to the topic plan', () => {
    const initialLength = store.weeklyTopics().length;
    component.openAddWeek();
    expect(component.isAddWeekModalOpen()).toBe(true);

    component.newWeekTopic.set('Ratio and Proportion');
    component.newWeekObjective.set('Solve real world word problems on ratios.');
    component.saveNewWeek();

    expect(component.isAddWeekModalOpen()).toBe(false);
    expect(store.weeklyTopics().length).toBe(initialLength + 1);
  });

  it('should submit pack and navigate back to curriculum-content', () => {
    const createSpy = vi.spyOn(store, 'createCurriculumPack');
    component.submitPack(false);
    expect(createSpy).toHaveBeenCalled();
  });

  it('should cancel and navigate back to curriculum-content', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith([
      '/super-admin/curriculum-content',
    ]);
  });
});
