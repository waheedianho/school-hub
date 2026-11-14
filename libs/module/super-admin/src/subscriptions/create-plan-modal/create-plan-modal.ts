import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  SubscriptionPlanDefinition,
  SubscriptionPlanType,
} from '../../data/super-admin-subscriptions.models';

@Component({
  selector: 'school-hub-create-plan-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-plan-modal.html',
  styleUrls: ['./create-plan-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlanModalComponent {
  readonly planCreated = output<SubscriptionPlanDefinition>();
  readonly closed = output<void>();

  readonly planName = signal<SubscriptionPlanType>('Professional');
  readonly tagline = signal<string>('');
  readonly priceAnnual = signal<number>(5000);
  readonly priceQuarterly = signal<number>(1400);
  readonly priceMonthly = signal<number>(499);
  readonly maxLearners = signal<string>('1000');
  readonly featuresText = signal<string>(
    'Up to 1,000 active learners\nStandard curriculum & question bank\nCore analytics and reporting',
  );
  readonly isPopular = signal<boolean>(false);

  readonly availablePlanTypes: SubscriptionPlanType[] = [
    'Enterprise',
    'Professional',
    'Starter',
    'Trial',
  ];

  onSubmit(): void {
    const features = this.featuresText()
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const newPlan: SubscriptionPlanDefinition = {
      id: `plan-${Date.now().toString(36)}`,
      name: this.planName(),
      tagline: this.tagline() || `${this.planName()} platform access tier.`,
      priceAnnual: this.priceAnnual(),
      priceQuarterly: this.priceQuarterly(),
      priceMonthly: this.priceMonthly(),
      maxLearners:
        this.maxLearners() === 'Unlimited'
          ? 'Unlimited'
          : parseInt(this.maxLearners(), 10) || 1000,
      features,
      isPopular: this.isPopular(),
      activeSchoolsCount: 0,
    };

    this.planCreated.emit(newPlan);
  }

  onClose(): void {
    this.closed.emit();
  }
}
