import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RubricCriteriaItem } from '../../../data/teacher-assignments.data';

@Component({
  selector: 'school-hub-rubric-marking-guide',
  imports: [FormsModule],
  templateUrl: './rubric-marking-guide.html',
  styleUrl: './rubric-marking-guide.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RubricMarkingGuideComponent implements OnInit {
  readonly initialRubrics = input.required<RubricCriteriaItem[]>();
  readonly teacherComments = input<string>('');
  readonly visibleToLearner = signal(true);

  readonly rubricsList = signal<RubricCriteriaItem[]>([]);
  readonly commentsText = signal<string>('');

  readonly rubricsUpdated = output<RubricCriteriaItem[]>();
  readonly commentsUpdated = output<string>();

  ngOnInit(): void {
    this.rubricsList.set([...this.initialRubrics()]);
    this.commentsText.set(this.teacherComments());
  }

  readonly totalMaxMarks = computed(() =>
    this.rubricsList().reduce((acc, curr) => acc + curr.maxMarks, 0),
  );

  readonly totalAwardedScore = computed(() =>
    this.rubricsList().reduce((acc, curr) => acc + curr.score, 0),
  );

  onScoreChange(item: RubricCriteriaItem, newScore: number): void {
    const clampedScore = Math.max(0, Math.min(item.maxMarks, newScore || 0));
    this.rubricsList.update((list) =>
      list.map((r) => (r.id === item.id ? { ...r, score: clampedScore } : r)),
    );
    this.rubricsUpdated.emit(this.rubricsList());
  }

  onCommentsChange(text: string): void {
    this.commentsText.set(text);
    this.commentsUpdated.emit(text);
  }

  toggleVisible(): void {
    this.visibleToLearner.update((v) => !v);
  }
}
