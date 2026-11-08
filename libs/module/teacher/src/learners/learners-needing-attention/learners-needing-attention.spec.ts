import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearnersDirectoryAttentionComponent } from './learners-needing-attention';
import { LEARNERS_NEEDING_ATTENTION_DATA } from '../../data/teacher-learners.data';

describe('LearnersDirectoryAttentionComponent', () => {
  let component: LearnersDirectoryAttentionComponent;
  let fixture: ComponentFixture<LearnersDirectoryAttentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnersDirectoryAttentionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnersDirectoryAttentionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('learners', LEARNERS_NEEDING_ATTENTION_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 3 learners needing attention', () => {
    const items = fixture.nativeElement.querySelectorAll('.learner-item');
    expect(items.length).toBe(LEARNERS_NEEDING_ATTENTION_DATA.length);
  });

  it('should emit viewAll when View all is clicked', () => {
    const emitSpy = vi.fn();
    component.viewAll.subscribe(emitSpy);

    const btn = fixture.nativeElement.querySelector('.view-all-link');
    btn?.click();

    expect(emitSpy).toHaveBeenCalled();
  });
});
