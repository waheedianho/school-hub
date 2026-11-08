import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsAttentionPanelComponent } from './reports-attention-panel';
import { REPORT_LEARNERS_ATTENTION } from '../../data/teacher-reports.data';

describe('ReportsAttentionPanelComponent', () => {
  let component: ReportsAttentionPanelComponent;
  let fixture: ComponentFixture<ReportsAttentionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsAttentionPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsAttentionPanelComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('learners', REPORT_LEARNERS_ATTENTION);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 attention learners', () => {
    const items = fixture.nativeElement.querySelectorAll('.learner-item');
    expect(items.length).toBe(4);
    expect(items[0].textContent).toContain('Emeka Bassey');
    expect(items[0].textContent).toContain('Below Mastery');
    expect(items[0].textContent).toContain('38%');
  });

  it('should emit viewLearner when clicked', () => {
    const spy = vi.fn();
    component.viewLearner.subscribe(spy);
    const items = fixture.nativeElement.querySelectorAll('.learner-item');
    items[0].click();
    expect(spy).toHaveBeenCalledWith(REPORT_LEARNERS_ATTENTION[0]);
  });
});
