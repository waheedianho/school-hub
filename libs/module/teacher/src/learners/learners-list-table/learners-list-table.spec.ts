import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearnersListTableComponent } from './learners-list-table';
import { TEACHER_LEARNERS_LIST } from '../../data/teacher-learners.data';

describe('LearnersListTableComponent', () => {
  let component: LearnersListTableComponent;
  let fixture: ComponentFixture<LearnersListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnersListTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnersListTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('learners', TEACHER_LEARNERS_LIST);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all learner rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('.table-row');
    expect(rows.length).toBe(TEACHER_LEARNERS_LIST.length);
  });

  it('should toggle select all checkboxes', () => {
    component.toggleSelectAll();
    expect(component.selectedIds().size).toBe(TEACHER_LEARNERS_LIST.length);

    component.toggleSelectAll();
    expect(component.selectedIds().size).toBe(0);
  });

  it('should toggle individual row selection', () => {
    const firstId = TEACHER_LEARNERS_LIST[0].id;
    component.toggleSelect(firstId);
    expect(component.isSelected(firstId)).toBe(true);

    component.toggleSelect(firstId);
    expect(component.isSelected(firstId)).toBe(false);
  });

  it('should emit viewLearner when view icon is clicked', () => {
    const emitSpy = vi.fn();
    component.viewLearner.subscribe(emitSpy);

    const firstViewBtn = fixture.nativeElement.querySelectorAll('.icon-btn')[0];
    firstViewBtn.click();

    expect(emitSpy).toHaveBeenCalledWith(TEACHER_LEARNERS_LIST[0]);
  });

  it('should emit openMenu when menu icon is clicked', () => {
    const emitSpy = vi.fn();
    component.openMenu.subscribe(emitSpy);

    const firstMenuBtn = fixture.nativeElement.querySelectorAll('.icon-btn')[1];
    firstMenuBtn.click();

    expect(emitSpy).toHaveBeenCalledWith(TEACHER_LEARNERS_LIST[0]);
  });
});
