import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradebookLearnersAttentionComponent } from './learners-attention';
import { LEARNERS_NEEDING_ATTENTION } from '../../data/teacher-gradebook.data';

describe('GradebookLearnersAttentionComponent', () => {
  let component: GradebookLearnersAttentionComponent;
  let fixture: ComponentFixture<GradebookLearnersAttentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradebookLearnersAttentionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GradebookLearnersAttentionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('learners', LEARNERS_NEEDING_ATTENTION);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 learners needing attention', () => {
    const items = fixture.nativeElement.querySelectorAll('.learner-item');
    expect(items.length).toBe(LEARNERS_NEEDING_ATTENTION.length);
  });

  it('should emit viewAll when View all link is clicked', () => {
    const emitSpy = vi.fn();
    component.viewAll.subscribe(emitSpy);

    const btn = fixture.nativeElement.querySelector('.view-all-link');
    btn?.click();

    expect(emitSpy).toHaveBeenCalled();
  });
});
