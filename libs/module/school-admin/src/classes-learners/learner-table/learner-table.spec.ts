import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearnerTableComponent } from './learner-table';
import {
  SAMPLE_LEARNERS_DATA,
  SCHOOL_CLASSES_DATA,
} from '../../data/school-admin-classes.data';

describe('LearnerTableComponent', () => {
  let component: LearnerTableComponent;
  let fixture: ComponentFixture<LearnerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnerTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnerTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('learners', SAMPLE_LEARNERS_DATA.slice(0, 8));
    fixture.componentRef.setInput('selectedClass', SCHOOL_CLASSES_DATA[0]);
    fixture.componentRef.setInput('totalLearners', 28);
    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalPages', 4);
    fixture.componentRef.setInput('allClasses', SCHOOL_CLASSES_DATA);
    fixture.detectChanges();
  });

  it('should create and render learner table rows', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.table-title')?.textContent).toContain(
      'Learners in JSS 1A',
    );
    expect(compiled.querySelectorAll('tbody tr').length).toBe(8);
    expect(compiled.textContent).toContain('Maryam Ibrahim');
    expect(compiled.textContent).toContain('JSS1A/2024/001');
  });

  it('should emit searchChange on input', () => {
    const spy = vi.spyOn(component.searchChange, 'emit');
    const input = fixture.nativeElement.querySelector(
      '.search-input',
    ) as HTMLInputElement;
    input.value = 'Daniel';
    input.dispatchEvent(new Event('input'));
    expect(spy).toHaveBeenCalledWith('Daniel');
  });

  it('should emit pageChange when pagination button is clicked', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    component.goToPage(2);
    expect(spy).toHaveBeenCalledWith(2);
  });

  it('should emit addLearnerClicked when Add Learner button is clicked', () => {
    const spy = vi.spyOn(component.addLearnerClicked, 'emit');
    const addBtn = fixture.nativeElement.querySelector(
      '.btn-add-learner',
    ) as HTMLButtonElement;
    addBtn.click();
    expect(spy).toHaveBeenCalled();
  });
});
