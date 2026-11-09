import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QBTableComponent } from './qb-table';
import { QUESTION_BANK_ITEMS } from '../../../data/teacher-assessments.data';

describe('QBTableComponent', () => {
  let component: QBTableComponent;
  let fixture: ComponentFixture<QBTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QBTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QBTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('questions', QUESTION_BANK_ITEMS);
    fixture.componentRef.setInput('selectedId', 'qb-1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all question rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('.table-row');
    expect(rows.length).toBe(QUESTION_BANK_ITEMS.length);
  });

  it('should highlight the selected row', () => {
    const selected = fixture.nativeElement.querySelector('.selected-row');
    expect(selected).toBeTruthy();
  });

  it('should emit selectQuestion when row is clicked', () => {
    const emitSpy = vi.fn();
    component.selectQuestion.subscribe(emitSpy);

    const secondRow = fixture.nativeElement.querySelectorAll('.table-row')[1];
    secondRow.click();

    expect(emitSpy).toHaveBeenCalledWith(QUESTION_BANK_ITEMS[1]);
  });

  it('should emit editQuestion when edit button is clicked', () => {
    const emitSpy = vi.fn();
    component.editQuestion.subscribe(emitSpy);

    const editBtn = fixture.nativeElement.querySelectorAll(
      '.action-buttons .icon-btn',
    )[1];
    editBtn.click();

    expect(emitSpy).toHaveBeenCalledWith(QUESTION_BANK_ITEMS[0]);
  });
});
