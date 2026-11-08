import {
  Injectable,
  PLATFORM_ID,
  inject,
  signal,
  computed,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  AcademicPerformanceOverview,
  AcademicSession,
  AcademicStructure,
  AssessmentReportingSettings,
  CommunicationSafeguardingSettings,
  CurriculumCoverage,
  InterventionCase,
  LearnerRecord,
  RolePermissionRow,
  SafeguardingNotice,
  SchoolAdminMetric,
  SchoolAlert,
  SchoolClass,
  SchoolProfile,
  SetupChecklistItem,
  SetupQuickAction,
  StaffMember,
  TeacherActivityMetric,
  TopPerformingSubject,
  UpcomingSchoolEvent,
} from './school-admin.models';
import {
  ACADEMIC_PERFORMANCE_DATA,
  ACADEMIC_SESSIONS_DATA,
  CURRICULUM_COVERAGE_DATA,
  DASHBOARD_METRICS_DATA,
  SAFEGUARDING_NOTICE_DATA,
  SCHOOL_ALERTS_DATA,
  TEACHER_ACTIVITY_DATA,
  TOP_PERFORMING_SUBJECTS_DATA,
  UPCOMING_EVENTS_DATA,
} from './school-admin-dashboard.data';
import {
  SCHOOL_CLASSES_DATA,
  SAMPLE_LEARNERS_DATA,
} from './school-admin-classes.data';
import { SCHOOL_STAFF_DATA } from './school-admin-staff.data';
import { SCHOOL_INTERVENTIONS_DATA } from './school-admin-interventions.data';
import {
  ACADEMIC_STRUCTURE_DATA,
  ASSESSMENT_SETTINGS_DATA,
  COMMUNICATION_SAFEGUARDING_DATA,
  ROLE_PERMISSIONS_DATA,
  SCHOOL_PROFILE_DATA,
  SETUP_CHECKLIST_DATA,
  SETUP_QUICK_ACTIONS_DATA,
} from './school-admin-setup.data';

const STORAGE_KEY_SESSION = 'schoolhub_admin_session';
const STORAGE_KEY_TERM = 'schoolhub_admin_term';

@Injectable({
  providedIn: 'root',
})
export class SchoolAdminStore {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // Sessions and Terms State
  readonly sessions = signal<AcademicSession[]>(ACADEMIC_SESSIONS_DATA);
  readonly currentSession = signal<string>(this.getInitialSession());
  readonly currentTerm = signal<string>(this.getInitialTerm());
  readonly lastUpdated = signal<string>('Today, 08:45 AM');

  // Computed Session & Term helpers
  readonly activeSessionObj = computed(() => {
    return (
      this.sessions().find((s) => s.name === this.currentSession()) ??
      this.sessions()[0]
    );
  });

  readonly activeTermObj = computed(() => {
    const session = this.activeSessionObj();
    return (
      session.terms.find((t) => t.name === this.currentTerm()) ??
      session.terms.find((t) => t.isCurrent) ??
      session.terms[0]
    );
  });

  // Dashboard Data Signals
  readonly metrics = signal<SchoolAdminMetric[]>(DASHBOARD_METRICS_DATA);
  readonly performanceOverview = signal<AcademicPerformanceOverview>(
    ACADEMIC_PERFORMANCE_DATA,
  );
  readonly curriculumCoverage = signal<CurriculumCoverage>(
    CURRICULUM_COVERAGE_DATA,
  );
  readonly topPerformingSubjects = signal<TopPerformingSubject[]>(
    TOP_PERFORMING_SUBJECTS_DATA,
  );
  readonly alerts = signal<SchoolAlert[]>(SCHOOL_ALERTS_DATA);
  readonly teacherActivities = signal<TeacherActivityMetric[]>(
    TEACHER_ACTIVITY_DATA,
  );
  readonly upcomingEvents = signal<UpcomingSchoolEvent[]>(UPCOMING_EVENTS_DATA);
  readonly safeguardingNotice = signal<SafeguardingNotice>(
    SAFEGUARDING_NOTICE_DATA,
  );

  // Entities Signals
  readonly classes = signal<SchoolClass[]>(SCHOOL_CLASSES_DATA);
  readonly learners = signal<LearnerRecord[]>(SAMPLE_LEARNERS_DATA);
  readonly staff = signal<StaffMember[]>(SCHOOL_STAFF_DATA);
  readonly interventions = signal<InterventionCase[]>(
    SCHOOL_INTERVENTIONS_DATA,
  );

  // Setup Signals
  readonly profile = signal<SchoolProfile>(SCHOOL_PROFILE_DATA);
  readonly academicStructure = signal<AcademicStructure>(
    ACADEMIC_STRUCTURE_DATA,
  );
  readonly assessmentSettings = signal<AssessmentReportingSettings>(
    ASSESSMENT_SETTINGS_DATA,
  );
  readonly rolePermissions = signal<RolePermissionRow[]>(ROLE_PERMISSIONS_DATA);
  readonly communicationSafeguarding =
    signal<CommunicationSafeguardingSettings>(COMMUNICATION_SAFEGUARDING_DATA);
  readonly setupChecklist = signal<SetupChecklistItem[]>(SETUP_CHECKLIST_DATA);
  readonly setupQuickActions = signal<SetupQuickAction[]>(
    SETUP_QUICK_ACTIONS_DATA,
  );
  readonly setupSaveStatus = signal<string | null>(null);
  readonly lastPublished = signal<string>('Never');

  // Summary Computations
  readonly totalClassesCount = computed(() => this.classes().length);
  readonly totalLearnersCount = computed(() =>
    this.classes().reduce((acc, c) => acc + c.learnersCount, 0),
  );
  readonly totalStaffCount = computed(() => this.staff().length);
  readonly criticalAlertsCount = computed(
    () => this.alerts().filter((a) => a.severity === 'critical').length,
  );

  /**
   * Switch the active academic session
   */
  switchSession(sessionName: string): void {
    const found = this.sessions().find((s) => s.name === sessionName);
    if (!found) return;

    this.currentSession.set(sessionName);
    const activeTerm =
      found.terms.find((t) => t.isCurrent)?.name ??
      found.terms[0]?.name ??
      'Third Term';
    this.currentTerm.set(activeTerm);

    if (this.isBrowser) {
      try {
        localStorage.setItem(STORAGE_KEY_SESSION, sessionName);
        localStorage.setItem(STORAGE_KEY_TERM, activeTerm);
      } catch {
        // Safe storage fallback
      }
    }
  }

  /**
   * Switch the active term
   */
  switchTerm(termName: string): void {
    this.currentTerm.set(termName);
    if (this.isBrowser) {
      try {
        localStorage.setItem(STORAGE_KEY_TERM, termName);
      } catch {
        // Safe storage fallback
      }
    }
  }

  /**
   * Dismiss an alert by id
   */
  dismissAlert(alertId: string): void {
    this.alerts.update((items) => items.filter((a) => a.id !== alertId));
  }

  /**
   * Refresh timestamp and KPI values
   */
  refreshMetrics(): void {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    this.lastUpdated.set(`Today, ${timeStr}`);
  }

  /**
   * Helper to retrieve class by ID
   */
  getClassById(classId: string): SchoolClass | undefined {
    return this.classes().find((c) => c.id === classId);
  }

  /**
   * Helper to retrieve staff member by ID
   */
  getStaffById(staffId: string): StaffMember | undefined {
    return this.staff().find((s) => s.id === staffId || s.staffId === staffId);
  }

  /**
   * Helper to retrieve learners for a specific class
   */
  getLearnersByClass(classId: string): LearnerRecord[] {
    return this.learners().filter((l) => l.classId === classId);
  }

  /**
   * School Setup Mutations
   */
  updateSchoolProfile(partial: Partial<SchoolProfile>): void {
    this.profile.update((p) => ({ ...p, ...partial }));
  }

  updateAcademicStructure(partial: Partial<AcademicStructure>): void {
    this.academicStructure.update((s) => ({ ...s, ...partial }));
  }

  updateAssessmentSettings(
    partial: Partial<AssessmentReportingSettings>,
  ): void {
    this.assessmentSettings.update((a) => ({ ...a, ...partial }));
  }

  toggleRolePermission(
    roleName: string,
    field: keyof Omit<RolePermissionRow, 'role'>,
  ): void {
    this.rolePermissions.update((rows) =>
      rows.map((r) => (r.role === roleName ? { ...r, [field]: !r[field] } : r)),
    );
  }

  updateCommunicationSafeguarding(
    partial: Partial<CommunicationSafeguardingSettings>,
  ): void {
    this.communicationSafeguarding.update((c) => ({ ...c, ...partial }));
  }

  toggleChecklistItem(id: string): void {
    this.setupChecklist.update((items) =>
      items.map((item) => {
        if (item.id === id) {
          const nextStatus =
            item.status === 'Completed'
              ? 'In Progress'
              : item.status === 'In Progress'
                ? 'Completed'
                : 'In Progress';
          return { ...item, status: nextStatus };
        }
        return item;
      }),
    );
  }

  saveSetupChanges(): void {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    this.setupSaveStatus.set(`All changes saved at ${timeStr}`);
  }

  publishSettings(): void {
    const now = new Date();
    const dateStr = now.toLocaleDateString([], {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    this.lastPublished.set(`${dateStr}, ${timeStr}`);
    this.setupSaveStatus.set(`Settings published successfully (${dateStr})`);
  }

  private getInitialSession(): string {
    if (this.isBrowser) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_SESSION);
        if (stored && ACADEMIC_SESSIONS_DATA.some((s) => s.name === stored)) {
          return stored;
        }
      } catch {
        // Safe fallback
      }
    }
    return '2024/2025 Academic Session';
  }

  private getInitialTerm(): string {
    if (this.isBrowser) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_TERM);
        if (stored) {
          return stored;
        }
      } catch {
        // Safe fallback
      }
    }
    return 'Third Term';
  }
}
