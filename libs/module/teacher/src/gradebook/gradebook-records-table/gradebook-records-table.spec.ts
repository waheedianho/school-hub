import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradebookRecordsTableComponent } from './gradebook-records-table';
import { GRADEBOOK_RECORDS } from '../../data/teacher-gradebook.data';

describe('GradebookRecordsTableComponent', () => {
  let component: GradebookRecordsTableComponent;
  let fixture: ComponentFixture<GradebookRecordsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradebookRecordsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GradebookRecordsTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('records', GRADEBOOK_RECORDS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all learner rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('.table-row');
    expect(rows.length).toBe(GRADEBOOK_RECORDS.length);
  });

  it('should display learner names accurately', () => {
    const names = fixture.nativeElement.querySelectorAll('.learner-name');
    expect(names[0].textContent.trim()).toBe('Maryam Ibrahim');
    expect(names[1].textContent.trim()).toBe('Chinedu Okafor');
  });

  it('should emit viewRecord when view button is clicked', () => {
    const emitSpy = vi.fn();
    component.viewRecord.subscribe(emitSpy);

    const firstViewBtn = fixture.nativeElement.querySelectorAll('.icon-btn')[0];
    firstViewBtn.click();

    expect(emitSpy).toHaveBeenCalledWith(GRADEBOOK_RECORDS[0]);
  });

  it('should emit openMenu when menu button is clicked', () => {
    const emitSpy = vi.fn();
    component.openMenu.subscribe(emitSpy);

    const firstMenuBtn = fixture.nativeElement.querySelectorAll('.icon-btn')[1];
    firstMenuBtn.click();

    expect(emitSpy).toHaveBeenCalledWith(GRADEBOOK_RECORDS[0]);
  });
});
