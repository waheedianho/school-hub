import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ClassesLearnersComponent } from './classes-learners';
import { SchoolAdminStore } from '../data/school-admin.store';

describe('ClassesLearnersComponent', () => {
  let component: ClassesLearnersComponent;
  let fixture: ComponentFixture<ClassesLearnersComponent>;
  let store: SchoolAdminStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesLearnersComponent],
      providers: [
        SchoolAdminStore,
        {
          provide: Router,
          useValue: { navigate: vi.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassesLearnersComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create and render header', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1.page-title')?.textContent).toContain(
      'Classes & Learners',
    );
    expect(compiled.querySelector('.page-subtitle')?.textContent).toContain(
      'Manage class structure',
    );
  });

  it('should render all 4 main sub-components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('school-hub-classes-summary-metrics'),
    ).toBeTruthy();
    expect(compiled.querySelector('school-hub-class-list')).toBeTruthy();
    expect(compiled.querySelector('school-hub-learner-table')).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-class-overview-sidebar'),
    ).toBeTruthy();
  });

  it('should switch tabs', () => {
    component.setTab('learners');
    expect(store.activeClassesTab()).toBe('learners');
  });

  it('should navigate to add learner view', () => {
    component.navigateToAddLearner();
    expect(router.navigate).toHaveBeenCalledWith([
      '/school-admin/classes-learners/add',
    ]);
  });

  it('should handle class selection', () => {
    component.onClassSelect('class-jss-1b');
    expect(store.selectedClassId()).toBe('class-jss-1b');
  });
});
