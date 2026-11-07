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
  selector: 'school-hub-scoring-feedback-panel',
  imports: [FormsModule],
  templateUrl: './scoring-feedback-panel.html',
  styleUrl: './scoring-feedback-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoringFeedbackPanelComponent implements OnInit {
  readonly totalMarks = input<number>(20);
  readonly initialScore = input<number>(13);
  readonly initialGrade = input<string>('C');
  readonly initialFeedback = input<string>('');
  readonly rubrics = input<RubricCriteriaItem[]>([]);
  readonly initialTags = input<string[]>([]);

  readonly currentScore = signal(13);
  readonly currentGrade = signal('C');
  readonly feedbackText = signal('');
  readonly tags = signal<string[]>([]);

  readonly scoreSubmitted = output<{
    score: number;
    grade: string;
    feedback: string;
  }>();

  ngOnInit(): void {
    this.currentScore.set(this.initialScore());
    this.currentGrade.set(this.initialGrade());
    this.feedbackText.set(this.initialFeedback());
    this.tags.set([...this.initialTags()]);
  }

  readonly percentage = computed(() => {
    const total = this.totalMarks();
    if (!total) return 0;
    return Math.round((this.currentScore() / total) * 100);
  });

  onScoreChange(newScore: number): void {
    const clamped = Math.max(0, Math.min(this.totalMarks(), newScore || 0));
    this.currentScore.set(clamped);
  }

  removeTag(tagToRemove: string): void {
    this.tags.update((t) => t.filter((item) => item !== tagToRemove));
  }

  addTag(): void {
    const newTag = 'Needs clearer explanation';
    if (!this.tags().includes(newTag)) {
      this.tags.update((t) => [...t, newTag]);
    }
  }

  onSaveDraft(): void {
    // Draft saved
  }

  onApproveScore(): void {
    this.scoreSubmitted.emit({
      score: this.currentScore(),
      grade: this.currentGrade(),
      feedback: this.feedbackText(),
    });
  }

  onSendToGradebook(): void {
    this.scoreSubmitted.emit({
      score: this.currentScore(),
      grade: this.currentGrade(),
      feedback: this.feedbackText(),
    });
  }
}
