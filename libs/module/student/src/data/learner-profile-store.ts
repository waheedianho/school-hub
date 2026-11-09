import {
  Injectable,
  afterNextRender,
  computed,
  inject,
  signal,
  DestroyRef,
} from '@angular/core';
import { LEARNER_PROFILE } from './learning-context.data';
import {
  defaultLearnerProfile,
  learnerInitials,
  readLearnerProfile,
  resourceConnectionPolicy,
  shortLearnerName,
  validLearnerGoals,
  validateIdentity,
} from './learner-profile-engine';
import { LearnerGoal, LearnerIdentity } from './learner-profile.model';
export const LEARNER_PROFILE_STORAGE_KEY = 'school-hub:learner-profile:v1';
@Injectable({ providedIn: 'root' })
export class LearnerProfileStore {
  readonly state = signal(defaultLearnerProfile());
  readonly ready = signal(false);
  readonly persistent = signal(true);
  readonly identity = computed(() => this.state().identity);
  readonly goals = computed(() => this.state().goals);
  readonly preferences = computed(() => this.state().preferences);
  readonly initials = computed(() => learnerInitials(this.identity().fullName));
  readonly firstName = computed(
    () => this.identity().fullName.trim().split(/\s+/)[0],
  );
  readonly learner = computed(() => ({
    ...LEARNER_PROFILE,
    ...this.identity(),
    firstName: this.firstName(),
  }));
  readonly header = computed(() => ({
    name: shortLearnerName(this.identity().fullName),
    role: LEARNER_PROFILE.className,
    avatarUrl: LEARNER_PROFILE.avatarUrl,
    profileRoute: '/student/profile',
    settingsRoute: '/student/settings',
  }));
  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const restore = () => {
        try {
          this.state.set(
            readLearnerProfile(
              localStorage.getItem(LEARNER_PROFILE_STORAGE_KEY),
            ),
          );
          this.persistent.set(true);
        } catch {
          this.persistent.set(false);
        }
      };
      restore();
      this.ready.set(true);
      const storage = (event: StorageEvent) => {
        if (event.key === LEARNER_PROFILE_STORAGE_KEY || event.key === null)
          restore();
      };
      window.addEventListener('storage', storage);
      destroy.onDestroy(() => window.removeEventListener('storage', storage));
    });
  }
  saveIdentity(identity: LearnerIdentity): boolean {
    if (!this.ready() || Object.keys(validateIdentity(identity)).length)
      return false;
    this.state.update((state) => ({
      ...state,
      identity: {
        fullName: identity.fullName.trim().replace(/\s+/g, ' '),
        email: identity.email.trim(),
        phone: identity.phone.trim(),
        location: identity.location.trim(),
      },
    }));
    this.save();
    return true;
  }
  saveGoals(goals: readonly LearnerGoal[]): boolean {
    if (!this.ready() || !validLearnerGoals(goals)) return false;
    this.state.update((state) => ({
      ...state,
      goals: goals.map((goal) => ({ ...goal })),
    }));
    this.save();
    return true;
  }
  wifiOnly(value: boolean): void {
    if (this.ready()) {
      this.state.update((state) => ({
        ...state,
        preferences: { wifiOnly: value },
      }));
      this.save();
    }
  }
  downloadPolicy() {
    const connection =
      typeof navigator === 'undefined'
        ? undefined
        : (navigator as Navigator & { connection?: { type?: string } })
            .connection?.type;
    return resourceConnectionPolicy(this.preferences().wifiOnly, connection);
  }
  private save(): void {
    try {
      localStorage.setItem(
        LEARNER_PROFILE_STORAGE_KEY,
        JSON.stringify({ version: 1, ...this.state() }),
      );
      this.persistent.set(true);
    } catch {
      this.persistent.set(false);
    }
  }
}
