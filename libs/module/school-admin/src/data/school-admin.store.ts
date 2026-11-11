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
  AssessmentAttentionItem,
  AssessmentRecord,
  AssessmentReportingSettings,
  AssessmentReviewSubTab,
  AssessmentScheduleTab,
  AssessmentSidebarSummary,
  AssessmentsSummaryMetrics,
  AssignFollowUpFormData,
  ClassReportCardSummary,
  ClassSubjectPerformance,
  ClassesOverviewMetrics,
  CommunicationAttentionItem,
  CommunicationMessage,
  CommunicationSafeguardingSettings,
  CommunicationSidebarSummary,
  CommunicationSummaryMetrics,
  CommunicationTab,
  CreateAnnouncementFormData,
  CreateRoleFormData,
  CurriculumCoverage,
  CurriculumMapEntry,
  CurriculumOverviewMetrics,
  GeneralSettingsForm,
  GeneralSettingsSummaryItem,
  GradeDistributionBucket,
  InterventionAttentionItem,
  InterventionCase,
  InterventionInsightData,
  InterventionsSidebarSummary,
  InterventionsSummaryMetrics,
  InterventionsTab,
  LearnerRecord,
  LearnerSubmissionReview,
  LessonMonitoringRecord,
  LessonOversightMetrics,
  LessonReadinessAlert,
  LessonReviewRecord,
  LinkDeliveryPackFormData,
  LiveClassAttentionItem,
  LiveClassRecord,
  LiveClassSidebarSummary,
  LiveClassTab,
  LiveClassesSummaryMetrics,
  NewInterventionPlanFormData,
  NewLearnerFormData,
  NewStaffFormData,
  OversightSidebarSummary,
  PermissionSidebarSummary,
  PriorityAttentionArea,
  ReportsHighlightInsights,
  ReportsSidebarSummary,
  ReportsSummaryMetrics,
  ReportTab,
  ResourceAttentionItem,
  ResourceItem,
  ResourcesSidebarSummary,
  ResourcesSummaryMetrics,
  ResourcesTab,
  RolePermissionRow,
  SafeguardingNotice,
  ScheduleParentMeetingFormData,
  SchemeOfWorkEntry,
  SchoolAdminMetric,
  SchoolAlert,
  SchoolClass,
  SchoolProfile,
  SchoolRole,
  SendParentMessageFormData,
  SettingsAttentionItem,
  SettingsSummaryMetrics,
  SettingsTab,
  SetupChecklistItem,
  SetupQuickAction,
  StaffMember,
  StaffOperationalAlert,
  StudentReportCard,
  SubjectPerformanceRow,
  SubjectRecord,
  TeacherActivityMetric,
  TeachersStaffOverviewMetrics,
  TermPerformanceTrendPoint,
  TopicDeliveryPack,
  TopPerformingSubject,
  UpcomingSchoolEvent,
  UploadResourceFormData,
  WeekResourceItem,
  WeekSchemeDetail,
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
  CLASSES_OVERVIEW_METRICS_DATA,
  SAMPLE_LEARNERS_DATA,
  SCHOOL_CLASSES_DATA,
} from './school-admin-classes.data';
import {
  SCHOOL_STAFF_DATA,
  STAFF_OPERATIONAL_ALERTS_DATA,
  TEACHERS_STAFF_METRICS_DATA,
} from './school-admin-staff.data';
import {
  INTERVENTIONS_ATTENTION_ITEMS,
  INTERVENTIONS_SIDEBAR_SUMMARY,
  INTERVENTIONS_SUMMARY_METRICS,
  INTERVENTION_INSIGHTS_DATA,
  SCHOOL_INTERVENTIONS_DATA,
} from './school-admin-interventions.data';
import {
  CURRICULUM_MAP_DATA,
  CURRICULUM_METRICS_DATA,
  SCHEME_OF_WORK_DATA,
  SUBJECTS_DIRECTORY_DATA,
  TOPIC_DELIVERY_PACK_DATA,
  WEEK_4_RESOURCES_DATA,
  WEEK_4_SCHEME_DETAIL_DATA,
} from './school-admin-curriculum.data';
import {
  ACTIVE_LESSONS_METRICS,
  DELIVERY_OVERSIGHT_METRICS,
  LESSON_MONITORING_RECORDS_DATA,
  LESSON_READINESS_ALERTS_DATA,
  LESSON_REVIEWS_DATA,
  OVERSIGHT_SIDEBAR_DATA,
} from './school-admin-lessons.data';
import {
  LIVE_CLASSES_SUMMARY_METRICS,
  LIVE_CLASS_SIDEBAR_SUMMARY,
  LIVE_CLASS_ATTENTION_ITEMS,
  LIVE_CLASS_RECORDS_DATA,
} from './school-admin-live-classes.data';
import {
  ASSESSMENTS_SUMMARY_METRICS,
  ASSESSMENT_SIDEBAR_SUMMARY,
  ASSESSMENT_ATTENTION_ITEMS,
  ASSESSMENT_RECORDS_DATA,
  LEARNER_SUBMISSIONS_REVIEW_DATA,
  GRADE_DISTRIBUTION_BUCKETS,
} from './school-admin-assessments.data';
import {
  CLASS_PERFORMANCE_OVERVIEW_DATA,
  CLASS_REPORT_CARDS_DATA,
  PRIORITY_ATTENTION_AREAS,
  REPORTS_HIGHLIGHT_INSIGHTS,
  REPORTS_SIDEBAR_SUMMARY,
  REPORTS_SUMMARY_METRICS,
  SAMPLE_STUDENT_REPORT_CARD,
  SUBJECT_PERFORMANCE_SUMMARY_DATA,
  TERM_PERFORMANCE_TREND,
} from './school-admin-reports.data';
import {
  ACADEMIC_STRUCTURE_DATA,
  ASSESSMENT_SETTINGS_DATA,
  COMMUNICATION_SAFEGUARDING_DATA,
  ROLE_PERMISSIONS_DATA,
  SCHOOL_PROFILE_DATA,
  SETUP_CHECKLIST_DATA,
  SETUP_QUICK_ACTIONS_DATA,
} from './school-admin-setup.data';
import {
  RESOURCES_DATA,
  RESOURCES_SUMMARY_METRICS,
  RESOURCES_SIDEBAR_SUMMARY,
  RESOURCE_ATTENTION_ITEMS,
} from './school-admin-resources.data';
import {
  COMMUNICATION_MESSAGES_DATA,
  COMMUNICATION_SUMMARY_METRICS,
  COMMUNICATION_SIDEBAR_SUMMARY,
  COMMUNICATION_ATTENTION_ITEMS,
} from './school-admin-communication.data';
import {
  GENERAL_SETTINGS_ATTENTION_ITEMS,
  GENERAL_SETTINGS_DATA,
  GENERAL_SETTINGS_SUMMARY_DATA,
  PERMISSION_ATTENTION_ITEMS,
  PERMISSION_SIDEBAR_SUMMARY_DATA,
  SCHOOL_ROLES_DATA,
  SETTINGS_SUMMARY_METRICS,
} from './school-admin-settings.data';

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

  // Classes & Learners Signals
  readonly classesMetrics = signal<ClassesOverviewMetrics>(
    CLASSES_OVERVIEW_METRICS_DATA,
  );
  readonly selectedClassId = signal<string>('class-jss-1a');
  readonly activeClassesTab = signal<
    'classes' | 'learners' | 'enrollment' | 'attendance'
  >('classes');
  readonly learnerSearchQuery = signal<string>('');
  readonly learnerClassFilter = signal<string>('All Classes');
  readonly learnerStatusFilter = signal<string>('All Statuses');
  readonly learnerPage = signal<number>(1);
  readonly learnerPageSize = signal<number>(8);

  // Computed properties for selected class and learners
  readonly selectedClass = computed(() => {
    return (
      this.classes().find((c) => c.id === this.selectedClassId()) ??
      this.classes()[0]
    );
  });

  readonly filteredLearners = computed(() => {
    const selectedCls = this.selectedClass();
    const query = this.learnerSearchQuery().toLowerCase().trim();
    const classFilter = this.learnerClassFilter();
    const statusFilter = this.learnerStatusFilter();

    return this.learners().filter((l) => {
      const matchesClass =
        classFilter === 'All Classes'
          ? l.classId === selectedCls?.id
          : l.className === classFilter;

      const matchesQuery =
        !query ||
        l.name.toLowerCase().includes(query) ||
        l.admissionNo.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === 'All Statuses' || l.currentStatus === statusFilter;

      return matchesClass && matchesQuery && matchesStatus;
    });
  });

  readonly totalFilteredLearners = computed(
    () => this.filteredLearners().length,
  );

  readonly totalPages = computed(() => {
    return (
      Math.ceil(this.totalFilteredLearners() / this.learnerPageSize()) || 1
    );
  });

  readonly paginatedLearners = computed(() => {
    const page = this.learnerPage();
    const pageSize = this.learnerPageSize();
    const start = (page - 1) * pageSize;
    return this.filteredLearners().slice(start, start + pageSize);
  });

  // Teachers & Staff Signals
  readonly staffOverviewMetrics = signal<TeachersStaffOverviewMetrics>(
    TEACHERS_STAFF_METRICS_DATA,
  );
  readonly staffAlerts = signal<StaffOperationalAlert[]>(
    STAFF_OPERATIONAL_ALERTS_DATA,
  );
  readonly selectedStaffId = signal<string>('staff-001');
  readonly activeStaffTab = signal<
    'teachers' | 'support' | 'assignments' | 'permissions'
  >('teachers');
  readonly staffSearchQuery = signal<string>('');
  readonly staffDepartmentFilter = signal<string>('All Departments');
  readonly staffRoleFilter = signal<string>('All Roles');
  readonly staffStatusFilter = signal<string>('All Statuses');
  readonly staffPage = signal<number>(1);
  readonly staffPageSize = signal<number>(7);

  // Computed properties for Teachers & Staff
  readonly selectedStaff = computed(() => {
    return (
      this.staff().find((s) => s.id === this.selectedStaffId()) ??
      this.staff()[0]
    );
  });

  readonly filteredStaff = computed(() => {
    const query = this.staffSearchQuery().toLowerCase().trim();
    const deptFilter = this.staffDepartmentFilter();
    const roleFilter = this.staffRoleFilter();
    const statusFilter = this.staffStatusFilter();
    const activeTab = this.activeStaffTab();

    return this.staff().filter((s) => {
      // Tab filter
      if (activeTab === 'support' && s.staffType === 'Academic') {
        return false;
      }

      // Query filter
      const matchesQuery =
        !query ||
        s.name.toLowerCase().includes(query) ||
        s.staffId.toLowerCase().includes(query) ||
        s.department.toLowerCase().includes(query) ||
        s.role.toLowerCase().includes(query) ||
        s.assignedSubjects.some((subj) => subj.toLowerCase().includes(query));

      // Department filter
      const matchesDept =
        deptFilter === 'All Departments' ||
        s.department.toLowerCase().includes(deptFilter.toLowerCase());

      // Role filter
      const matchesRole =
        roleFilter === 'All Roles' ||
        s.role.toLowerCase() === roleFilter.toLowerCase();

      // Status filter
      const matchesStatus =
        statusFilter === 'All Statuses' || s.status === statusFilter;

      return matchesQuery && matchesDept && matchesRole && matchesStatus;
    });
  });

  readonly totalFilteredStaff = computed(() => this.filteredStaff().length);

  readonly staffTotalPages = computed(() => {
    return Math.ceil(this.totalFilteredStaff() / this.staffPageSize()) || 1;
  });

  readonly paginatedStaff = computed(() => {
    const page = this.staffPage();
    const pageSize = this.staffPageSize();
    const start = (page - 1) * pageSize;
    return this.filteredStaff().slice(start, start + pageSize);
  });

  // Subjects & Curriculum State
  readonly curriculumMetrics = signal<CurriculumOverviewMetrics>(
    CURRICULUM_METRICS_DATA,
  );
  readonly subjects = signal<SubjectRecord[]>(SUBJECTS_DIRECTORY_DATA);
  readonly selectedSubjectId = signal<string>('subj-math');
  readonly activeCurriculumTab = signal<
    | 'subjects'
    | 'curriculum-map'
    | 'scheme-of-work'
    | 'scheme-detail'
    | 'topic-delivery-packs'
    | 'approval-queue'
  >('subjects');

  readonly curriculumMaps = signal<CurriculumMapEntry[]>(CURRICULUM_MAP_DATA);
  readonly schemesOfWork = signal<SchemeOfWorkEntry[]>(SCHEME_OF_WORK_DATA);
  readonly weekSchemeDetail = signal<WeekSchemeDetail>(
    WEEK_4_SCHEME_DETAIL_DATA,
  );
  readonly weekResources = signal<WeekResourceItem[]>(WEEK_4_RESOURCES_DATA);
  readonly topicDeliveryPack = signal<TopicDeliveryPack>(
    TOPIC_DELIVERY_PACK_DATA,
  );

  // Curriculum Filter Signals
  readonly subjectSearchQuery = signal<string>('');
  readonly subjectStatusFilter = signal<string>('All Status');
  readonly curriculumClassFilter = signal<string>('All Classes');
  readonly curriculumSubjectFilter = signal<string>('All Subjects');
  readonly curriculumTermFilter = signal<string>('Third Term');
  readonly curriculumStatusFilter = signal<string>('All Status');

  // Computed properties for Curriculum
  readonly selectedSubject = computed(() => {
    return (
      this.subjects().find((s) => s.id === this.selectedSubjectId()) ??
      this.subjects()[0]
    );
  });

  readonly filteredSubjects = computed(() => {
    const query = this.subjectSearchQuery().toLowerCase().trim();
    const status = this.subjectStatusFilter();

    return this.subjects().filter((s) => {
      const matchesQuery =
        !query ||
        s.name.toLowerCase().includes(query) ||
        s.code.toLowerCase().includes(query) ||
        s.leadTeacher.toLowerCase().includes(query);

      const matchesStatus = status === 'All Status' || s.status === status;

      return matchesQuery && matchesStatus;
    });
  });

  readonly filteredCurriculumMaps = computed(() => {
    const classFilter = this.curriculumClassFilter();
    const subjFilter = this.curriculumSubjectFilter();
    const termFilter = this.curriculumTermFilter();
    const statusFilter = this.curriculumStatusFilter();
    const query = this.subjectSearchQuery().toLowerCase().trim();

    return this.curriculumMaps().filter((m) => {
      const matchesClass =
        classFilter === 'All Classes' || m.classLevel === classFilter;
      const matchesSubject =
        subjFilter === 'All Subjects' || m.subject === subjFilter;
      const matchesTerm = termFilter === 'All Terms' || m.term === termFilter;
      const matchesStatus =
        statusFilter === 'All Status' || m.status === statusFilter;
      const matchesQuery =
        !query ||
        m.topic.toLowerCase().includes(query) ||
        m.curriculumObjective.toLowerCase().includes(query);

      return (
        matchesClass &&
        matchesSubject &&
        matchesTerm &&
        matchesStatus &&
        matchesQuery
      );
    });
  });

  readonly filteredSchemesOfWork = computed(() => {
    const statusFilter = this.curriculumStatusFilter();
    const query = this.subjectSearchQuery().toLowerCase().trim();

    return this.schemesOfWork().filter((s) => {
      const matchesStatus =
        statusFilter === 'All Status' || s.status === statusFilter;
      const matchesQuery =
        !query ||
        s.topic.toLowerCase().includes(query) ||
        s.learningObjective.toLowerCase().includes(query);

      return matchesStatus && matchesQuery;
    });
  });

  // Lessons & Delivery Oversight State
  readonly activeLessonsTab = signal<
    | 'active-lessons'
    | 'delivery-oversight'
    | 'lesson-reviews'
    | 'readiness-alerts'
  >('active-lessons');
  readonly lessonMonitoringRecords = signal<LessonMonitoringRecord[]>(
    LESSON_MONITORING_RECORDS_DATA,
  );
  readonly lessonReviews = signal<LessonReviewRecord[]>(LESSON_REVIEWS_DATA);
  readonly lessonReadinessAlerts = signal<LessonReadinessAlert[]>(
    LESSON_READINESS_ALERTS_DATA,
  );
  readonly oversightSidebarData = signal<OversightSidebarSummary>(
    OVERSIGHT_SIDEBAR_DATA,
  );
  readonly lessonClassFilter = signal<string>('All Classes');
  readonly lessonSubjectFilter = signal<string>('All Subjects');
  readonly lessonTeacherFilter = signal<string>('All Teachers');
  readonly lessonStatusFilter = signal<string>('All Status');
  readonly lessonSearchQuery = signal<string>('');
  readonly selectedLessonRecord = signal<LessonMonitoringRecord>(
    LESSON_MONITORING_RECORDS_DATA[0],
  );

  readonly lessonOversightMetrics = computed<LessonOversightMetrics>(() => {
    return this.activeLessonsTab() === 'delivery-oversight'
      ? DELIVERY_OVERSIGHT_METRICS
      : ACTIVE_LESSONS_METRICS;
  });

  readonly filteredLessonRecords = computed<LessonMonitoringRecord[]>(() => {
    const classFilter = this.lessonClassFilter();
    const subjectFilter = this.lessonSubjectFilter();
    const teacherFilter = this.lessonTeacherFilter();
    const statusFilter = this.lessonStatusFilter();
    const query = this.lessonSearchQuery().toLowerCase().trim();

    return this.lessonMonitoringRecords().filter((rec) => {
      const matchesClass =
        classFilter === 'All Classes' || rec.className.startsWith(classFilter);
      const matchesSubject =
        subjectFilter === 'All Subjects' || rec.subject === subjectFilter;
      const matchesTeacher =
        teacherFilter === 'All Teachers' ||
        rec.assignedTeacher.name === teacherFilter;
      const matchesStatus =
        statusFilter === 'All Status' ||
        rec.lessonStatus === statusFilter ||
        rec.deliveryPackStatus === statusFilter ||
        rec.lessonReadiness === statusFilter ||
        rec.deliveryProgress === statusFilter;
      const matchesQuery =
        !query ||
        rec.className.toLowerCase().includes(query) ||
        rec.subject.toLowerCase().includes(query) ||
        rec.currentTopic.toLowerCase().includes(query) ||
        rec.assignedTeacher.name.toLowerCase().includes(query);

      return (
        matchesClass &&
        matchesSubject &&
        matchesTeacher &&
        matchesStatus &&
        matchesQuery
      );
    });
  });

  readonly filteredLessonReviews = computed<LessonReviewRecord[]>(() => {
    const query = this.lessonSearchQuery().toLowerCase().trim();
    if (!query) return this.lessonReviews();

    return this.lessonReviews().filter(
      (r) =>
        r.className.toLowerCase().includes(query) ||
        r.subject.toLowerCase().includes(query) ||
        r.topic.toLowerCase().includes(query) ||
        r.teacherName.toLowerCase().includes(query) ||
        r.reviewStatus.toLowerCase().includes(query),
    );
  });

  readonly filteredLessonAlerts = computed<LessonReadinessAlert[]>(() => {
    const query = this.lessonSearchQuery().toLowerCase().trim();
    if (!query) return this.lessonReadinessAlerts();

    return this.lessonReadinessAlerts().filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query) ||
        a.affectedClass.toLowerCase().includes(query) ||
        a.affectedSubject.toLowerCase().includes(query),
    );
  });

  // Live Classes State
  readonly activeLiveClassTab = signal<LiveClassTab>('upcoming');
  readonly liveClassRecords = signal<LiveClassRecord[]>(
    LIVE_CLASS_RECORDS_DATA,
  );
  readonly liveClassesSummaryMetrics = signal<LiveClassesSummaryMetrics>(
    LIVE_CLASSES_SUMMARY_METRICS,
  );
  readonly liveClassSidebarSummary = signal<LiveClassSidebarSummary>(
    LIVE_CLASS_SIDEBAR_SUMMARY,
  );
  readonly liveClassAttentionItems = signal<LiveClassAttentionItem[]>(
    LIVE_CLASS_ATTENTION_ITEMS,
  );
  readonly liveClassLevelFilter = signal<string>('All Classes');
  readonly liveClassSubjectFilter = signal<string>('All Subjects');
  readonly liveClassTeacherFilter = signal<string>('All Teachers');
  readonly liveClassStatusFilter = signal<string>('All Status');
  readonly liveClassSearchQuery = signal<string>('');
  readonly selectedLiveClass = signal<LiveClassRecord | null>(null);
  readonly activeAttentionFilterKey = signal<string | null>(null);
  readonly liveClassCurrentPage = signal<number>(1);
  readonly liveClassPageSize = signal<number>(8);
  readonly isScheduleModalOpen = signal<boolean>(false);
  readonly isObserverModalOpen = signal<boolean>(false);
  readonly observingLiveClass = signal<LiveClassRecord | null>(null);

  readonly filteredLiveClasses = computed<LiveClassRecord[]>(() => {
    const tab = this.activeLiveClassTab();
    const classFilter = this.liveClassLevelFilter();
    const subjectFilter = this.liveClassSubjectFilter();
    const teacherFilter = this.liveClassTeacherFilter();
    const statusFilter = this.liveClassStatusFilter();
    const query = this.liveClassSearchQuery().toLowerCase().trim();
    const attentionKey = this.activeAttentionFilterKey();

    return this.liveClassRecords().filter((cls) => {
      // Tab filtering
      if (tab === 'upcoming' && cls.liveStatus !== 'Upcoming') {
        return false;
      }
      if (tab === 'ongoing' && cls.liveStatus !== 'Live Now') {
        return false;
      }
      if (tab === 'completed' && cls.liveStatus !== 'Completed') {
        return false;
      }
      if (tab === 'recordings' && cls.recording.status !== 'Available') {
        return false;
      }

      // Attention Key filtering (if clicked from Attention Needed card)
      if (attentionKey === 'low-attendance' && cls.attendance.rate >= 60) {
        return false;
      }
      if (
        attentionKey === 'missing-recordings' &&
        cls.recording.status !== 'Not Available'
      ) {
        return false;
      }
      if (
        attentionKey === 'starting-soon' &&
        !(cls.startTime.includes('09:') || cls.startTime.includes('10:'))
      ) {
        return false;
      }
      if (
        attentionKey === 'no-teacher' &&
        !cls.teacherName.toLowerCase().includes('unassigned')
      ) {
        return false;
      }

      // Dropdown filters
      const matchesClass =
        classFilter === 'All Classes' || cls.className.startsWith(classFilter);
      const matchesSubject =
        subjectFilter === 'All Subjects' || cls.subject === subjectFilter;
      const matchesTeacher =
        teacherFilter === 'All Teachers' || cls.teacherName === teacherFilter;
      const matchesStatus =
        statusFilter === 'All Status' || cls.liveStatus === statusFilter;

      // Text query
      const matchesQuery =
        !query ||
        cls.className.toLowerCase().includes(query) ||
        cls.subject.toLowerCase().includes(query) ||
        cls.topic.toLowerCase().includes(query) ||
        cls.teacherName.toLowerCase().includes(query);

      return (
        matchesClass &&
        matchesSubject &&
        matchesTeacher &&
        matchesStatus &&
        matchesQuery
      );
    });
  });

  readonly totalFilteredLiveClasses = computed(
    () => this.filteredLiveClasses().length,
  );

  readonly liveClassTotalPages = computed(() => {
    return (
      Math.ceil(this.totalFilteredLiveClasses() / this.liveClassPageSize()) || 1
    );
  });

  readonly paginatedLiveClasses = computed(() => {
    const page = this.liveClassCurrentPage();
    const pageSize = this.liveClassPageSize();
    const start = (page - 1) * pageSize;
    return this.filteredLiveClasses().slice(start, start + pageSize);
  });

  // Assessments & Gradebooks State
  readonly activeAssessmentTab = signal<AssessmentScheduleTab>('schedule');
  readonly activeReviewSubTab =
    signal<AssessmentReviewSubTab>('submission-review');
  readonly assessmentRecords = signal<AssessmentRecord[]>(
    ASSESSMENT_RECORDS_DATA,
  );
  readonly assessmentsSummaryMetrics = signal<AssessmentsSummaryMetrics>(
    ASSESSMENTS_SUMMARY_METRICS,
  );
  readonly assessmentSidebarSummary = signal<AssessmentSidebarSummary>(
    ASSESSMENT_SIDEBAR_SUMMARY,
  );
  readonly assessmentAttentionItems = signal<AssessmentAttentionItem[]>(
    ASSESSMENT_ATTENTION_ITEMS,
  );
  readonly learnerSubmissions = signal<LearnerSubmissionReview[]>(
    LEARNER_SUBMISSIONS_REVIEW_DATA,
  );
  readonly gradeDistributionBuckets = signal<GradeDistributionBucket[]>(
    GRADE_DISTRIBUTION_BUCKETS,
  );
  readonly selectedAssessmentForReview = signal<AssessmentRecord | null>(null);
  readonly selectedSubmissionForModeration =
    signal<LearnerSubmissionReview | null>(null);
  readonly assessmentClassFilter = signal<string>('All Classes');
  readonly assessmentSubjectFilter = signal<string>('All Subjects');
  readonly assessmentTeacherFilter = signal<string>('All Teachers');
  readonly assessmentTypeFilter = signal<string>('All Types');
  readonly assessmentSearchQuery = signal<string>('');
  readonly assessmentAttentionFilterKey = signal<string | null>(null);
  readonly assessmentCurrentPage = signal<number>(1);
  readonly assessmentPageSize = signal<number>(8);
  readonly isCreateAssessmentModalOpen = signal<boolean>(false);
  readonly isModerationModalOpen = signal<boolean>(false);

  readonly filteredAssessments = computed<AssessmentRecord[]>(() => {
    const tab = this.activeAssessmentTab();
    const classFilter = this.assessmentClassFilter();
    const subjectFilter = this.assessmentSubjectFilter();
    const teacherFilter = this.assessmentTeacherFilter();
    const typeFilter = this.assessmentTypeFilter();
    const query = this.assessmentSearchQuery().toLowerCase().trim();
    const attentionKey = this.assessmentAttentionFilterKey();

    return this.assessmentRecords().filter((asm) => {
      // Tab filtering
      if (tab === 'submissions' && asm.submissionsCount === 0) {
        return false;
      }
      if (tab === 'gradebooks' && asm.gradebookStatus === 'Not Started') {
        return false;
      }
      if (
        tab === 'moderation' &&
        asm.gradingStatus !== 'Needs Review' &&
        asm.gradingStatus !== 'Missing Scores'
      ) {
        return false;
      }
      if (
        tab === 'exam-records' &&
        asm.assessmentType !== 'Exam' &&
        asm.week !== 'Week 6'
      ) {
        return false;
      }

      // Attention criterion filtering
      if (
        attentionKey === 'awaiting-finalization' &&
        asm.gradebookStatus !== 'In Progress'
      ) {
        return false;
      }
      if (
        attentionKey === 'missing-scores' &&
        asm.gradingStatus !== 'Missing Scores' &&
        (asm.missingScoresCount ?? 0) === 0
      ) {
        return false;
      }
      if (
        attentionKey === 'overdue-grading' &&
        !(asm.gradingStatus === 'Grading' && asm.week.includes('5'))
      ) {
        return false;
      }
      if (
        attentionKey === 'low-performance' &&
        (asm.averageScore ?? 100) >= 65
      ) {
        return false;
      }

      // Dropdown filters
      const matchesClass =
        classFilter === 'All Classes' || asm.className.startsWith(classFilter);
      const matchesSubject =
        subjectFilter === 'All Subjects' || asm.subject === subjectFilter;
      const matchesTeacher =
        teacherFilter === 'All Teachers' || asm.teacherName === teacherFilter;
      const matchesType =
        typeFilter === 'All Types' || asm.assessmentType === typeFilter;

      // Search query
      const matchesQuery =
        !query ||
        asm.assessmentName.toLowerCase().includes(query) ||
        asm.className.toLowerCase().includes(query) ||
        asm.subject.toLowerCase().includes(query) ||
        asm.teacherName.toLowerCase().includes(query);

      return (
        matchesClass &&
        matchesSubject &&
        matchesTeacher &&
        matchesType &&
        matchesQuery
      );
    });
  });

  readonly totalFilteredAssessments = computed(
    () => this.filteredAssessments().length,
  );

  readonly assessmentTotalPages = computed(() => {
    return (
      Math.ceil(this.totalFilteredAssessments() / this.assessmentPageSize()) ||
      1
    );
  });

  readonly paginatedAssessments = computed(() => {
    const page = this.assessmentCurrentPage();
    const pageSize = this.assessmentPageSize();
    const start = (page - 1) * pageSize;
    return this.filteredAssessments().slice(start, start + pageSize);
  });

  readonly reviewSummaryStats = computed(() => {
    const subs = this.learnerSubmissions();
    const submitted = subs.filter(
      (s) => s.submissionStatus === 'Submitted',
    ).length;
    const reviewed = subs.filter((s) => s.reviewStatus === 'Reviewed').length;
    const needsReview = subs.filter(
      (s) => s.reviewStatus === 'Needs Review',
    ).length;
    const missing = subs.filter(
      (s) => s.reviewStatus === 'Missing Score',
    ).length;
    return {
      submittedCount: submitted,
      reviewedCount: reviewed,
      needsReviewCount: needsReview,
      missingScoresCount: missing,
      averageScoreText: '19.8 / 30 (66.0%)',
    };
  });

  // Reports & Report Cards State
  readonly activeReportTab = signal<ReportTab>('overview');
  readonly reportsSummaryMetrics = signal<ReportsSummaryMetrics>(
    REPORTS_SUMMARY_METRICS,
  );
  readonly termPerformanceTrend = signal<TermPerformanceTrendPoint[]>(
    TERM_PERFORMANCE_TREND,
  );
  readonly classPerformanceOverview = signal<ClassSubjectPerformance[]>(
    CLASS_PERFORMANCE_OVERVIEW_DATA,
  );
  readonly subjectPerformanceRows = signal<SubjectPerformanceRow[]>(
    SUBJECT_PERFORMANCE_SUMMARY_DATA,
  );
  readonly reportsHighlightInsights = signal<ReportsHighlightInsights>(
    REPORTS_HIGHLIGHT_INSIGHTS,
  );
  readonly reportsSidebarSummary = signal<ReportsSidebarSummary>(
    REPORTS_SIDEBAR_SUMMARY,
  );
  readonly priorityAttentionAreas = signal<PriorityAttentionArea[]>(
    PRIORITY_ATTENTION_AREAS,
  );
  readonly classReportCards = signal<ClassReportCardSummary[]>(
    CLASS_REPORT_CARDS_DATA,
  );
  readonly selectedStudentReportCard = signal<StudentReportCard | null>(
    SAMPLE_STUDENT_REPORT_CARD,
  );
  readonly isStudentReportModalOpen = signal<boolean>(false);
  readonly isExportReportModalOpen = signal<boolean>(false);
  readonly isShareLeadershipModalOpen = signal<boolean>(false);
  readonly selectedReportAttentionArea = signal<PriorityAttentionArea | null>(
    null,
  );
  readonly reportClassFilter = signal<string>('All Classes');
  readonly reportSubjectFilter = signal<string>('All Subjects');
  readonly reportSearchQuery = signal<string>('');

  readonly filteredSubjectPerformance = computed(() => {
    const query = this.reportSearchQuery().toLowerCase().trim();
    const subjectFilter = this.reportSubjectFilter();

    return this.subjectPerformanceRows().filter((row) => {
      const matchesSubject =
        subjectFilter === 'All Subjects' || row.subject === subjectFilter;
      const matchesQuery = !query || row.subject.toLowerCase().includes(query);
      return matchesSubject && matchesQuery;
    });
  });

  readonly filteredClassReportCards = computed(() => {
    const classFilter = this.reportClassFilter();
    const query = this.reportSearchQuery().toLowerCase().trim();

    return this.classReportCards().filter((card) => {
      const matchesClass =
        classFilter === 'All Classes' ||
        card.classLevel === classFilter ||
        card.className === classFilter;
      const matchesQuery =
        !query ||
        card.className.toLowerCase().includes(query) ||
        card.classTeacher.toLowerCase().includes(query);
      return matchesClass && matchesQuery;
    });
  });

  readonly overallReportsApprovalRate = computed(() => {
    const list = this.classReportCards();
    if (list.length === 0) return 100;
    const approved = list.filter((c) => c.status === 'Approved').length;
    return Math.round((approved / list.length) * 100);
  });

  // Interventions State
  readonly activeInterventionsTab = signal<InterventionsTab>('active');
  readonly interventionsSummaryMetrics = signal<InterventionsSummaryMetrics>(
    INTERVENTIONS_SUMMARY_METRICS,
  );
  readonly interventionsSidebarSummary = signal<InterventionsSidebarSummary>(
    INTERVENTIONS_SIDEBAR_SUMMARY,
  );
  readonly interventionsAttentionItems = signal<InterventionAttentionItem[]>(
    INTERVENTIONS_ATTENTION_ITEMS,
  );
  readonly interventionsInsights = signal<InterventionInsightData>(
    INTERVENTION_INSIGHTS_DATA,
  );
  readonly selectedInterventionCase = signal<InterventionCase | null>(null);
  readonly isCreateInterventionModalOpen = signal<boolean>(false);
  readonly isAssignFollowUpModalOpen = signal<boolean>(false);
  readonly isScheduleParentMeetingModalOpen = signal<boolean>(false);
  readonly isExportInterventionModalOpen = signal<boolean>(false);
  readonly selectedInterventionAttentionItem =
    signal<InterventionAttentionItem | null>(null);
  readonly interventionSearchQuery = signal<string>('');
  readonly interventionClassFilter = signal<string>('All Classes');
  readonly interventionPriorityFilter = signal<string>('All Priorities');
  readonly interventionStatusFilter = signal<string>('All Statuses');
  readonly interventionPage = signal<number>(1);
  readonly interventionPageSize = signal<number>(8);

  readonly filteredInterventions = computed(() => {
    const list = this.interventions();
    const tab = this.activeInterventionsTab();
    const query = this.interventionSearchQuery().toLowerCase().trim();
    const classFilter = this.interventionClassFilter();
    const priorityFilter = this.interventionPriorityFilter();
    const statusFilter = this.interventionStatusFilter();
    const attentionItem = this.selectedInterventionAttentionItem();

    return list.filter((item) => {
      // Tab filter
      if (tab === 'active' && item.status === 'Resolved') return false;
      if (tab === 'resolved' && item.status !== 'Resolved') return false;
      if (
        tab === 'support-plans' &&
        !item.interventionType.toLowerCase().includes('plan')
      )
        return false;

      // Attention item filter
      if (attentionItem) {
        if (attentionItem.filterType === 'overdue' && item.priority !== 'High')
          return false;
        if (
          attentionItem.filterType === 'declining-attendance' &&
          !item.concernArea.toLowerCase().includes('attendance')
        )
          return false;
        if (
          attentionItem.filterType === 'pending-followup' &&
          item.status !== 'In Progress'
        )
          return false;
        if (
          attentionItem.filterType === 'unresolved' &&
          item.status === 'Resolved'
        )
          return false;
      }

      // Class filter
      if (classFilter !== 'All Classes' && item.className !== classFilter) {
        return false;
      }

      // Priority filter
      if (
        priorityFilter !== 'All Priorities' &&
        item.priority !== priorityFilter
      ) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'All Statuses' && item.status !== statusFilter) {
        return false;
      }

      // Search query
      if (query) {
        const matchesName = item.learnerName.toLowerCase().includes(query);
        const matchesAdm = item.admissionNo.toLowerCase().includes(query);
        const matchesConcern = item.concernArea.toLowerCase().includes(query);
        const matchesType = item.interventionType.toLowerCase().includes(query);
        const matchesStaff = item.assignedStaff.toLowerCase().includes(query);
        if (
          !matchesName &&
          !matchesAdm &&
          !matchesConcern &&
          !matchesType &&
          !matchesStaff
        ) {
          return false;
        }
      }

      return true;
    });
  });

  readonly paginatedInterventions = computed(() => {
    const list = this.filteredInterventions();
    const page = this.interventionPage();
    const size = this.interventionPageSize();
    const start = (page - 1) * size;
    return list.slice(start, start + size);
  });

  readonly interventionTotalPages = computed(() => {
    const list = this.filteredInterventions();
    const size = this.interventionPageSize();
    return Math.max(1, Math.ceil(list.length / size));
  });

  // Resources State (.design/SCHOOL ADMIN/Resources_SA.png)
  readonly resources = signal<ResourceItem[]>(RESOURCES_DATA);
  readonly activeResourcesTab = signal<ResourcesTab>('library');
  readonly resourcesSummaryMetrics = signal<ResourcesSummaryMetrics>(
    RESOURCES_SUMMARY_METRICS,
  );
  readonly resourcesSidebarSummary = signal<ResourcesSidebarSummary>(
    RESOURCES_SIDEBAR_SUMMARY,
  );
  readonly resourceAttentionItems = signal<ResourceAttentionItem[]>(
    RESOURCE_ATTENTION_ITEMS,
  );
  readonly selectedResourceItem = signal<ResourceItem | null>(null);
  readonly selectedResourceAttentionItem = signal<ResourceAttentionItem | null>(
    null,
  );
  readonly isUploadResourceModalOpen = signal<boolean>(false);
  readonly isLinkDeliveryPackModalOpen = signal<boolean>(false);
  readonly isExportResourceModalOpen = signal<boolean>(false);
  readonly resourceSearchQuery = signal<string>('');
  readonly resourceClassFilter = signal<string>('All Classes');
  readonly resourceSubjectFilter = signal<string>('All Subjects');
  readonly resourceTypeFilter = signal<string>('All Types');
  readonly resourceStatusFilter = signal<string>('All Statuses');
  readonly resourcePage = signal<number>(1);
  readonly resourcePageSize = signal<number>(10);

  readonly filteredResources = computed(() => {
    const list = this.resources();
    const tab = this.activeResourcesTab();
    const query = this.resourceSearchQuery().toLowerCase().trim();
    const classFilter = this.resourceClassFilter();
    const subjectFilter = this.resourceSubjectFilter();
    const typeFilter = this.resourceTypeFilter();
    const statusFilter = this.resourceStatusFilter();
    const attention = this.selectedResourceAttentionItem();

    return list.filter((item) => {
      // Tab filter
      if (tab === 'queue' && item.approvalStatus !== 'Pending Review')
        return false;
      if (tab === 'delivery' && !item.linkedDeliveryPack) return false;
      if (tab === 'templates' && item.resourceType !== 'Template') return false;

      // Attention item filter
      if (attention) {
        if (
          attention.filterType === 'queue' &&
          item.approvalStatus !== 'Pending Review'
        )
          return false;
        if (
          attention.filterType === 'gaps' &&
          item.approvalStatus !== 'Missing Link' &&
          item.linkedDeliveryPack !== undefined
        )
          return false;
        if (attention.filterType === 'low-data' && item.isLowData !== false)
          return false;
      }

      // Dropdown filters
      if (classFilter !== 'All Classes' && item.className !== classFilter)
        return false;
      if (subjectFilter !== 'All Subjects' && item.subject !== subjectFilter)
        return false;
      if (typeFilter !== 'All Types' && item.resourceType !== typeFilter)
        return false;
      if (
        statusFilter !== 'All Statuses' &&
        item.approvalStatus !== statusFilter
      )
        return false;

      // Search query
      if (query) {
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchSubject = item.subject.toLowerCase().includes(query);
        const matchClass = item.className.toLowerCase().includes(query);
        const matchTopic = item.topic.toLowerCase().includes(query);
        const matchAuthor = item.uploadedBy.toLowerCase().includes(query);
        const matchType = item.resourceType.toLowerCase().includes(query);
        if (
          !matchTitle &&
          !matchSubject &&
          !matchClass &&
          !matchTopic &&
          !matchAuthor &&
          !matchType
        ) {
          return false;
        }
      }

      return true;
    });
  });

  readonly paginatedResources = computed(() => {
    const filtered = this.filteredResources();
    const page = this.resourcePage();
    const size = this.resourcePageSize();
    const start = (page - 1) * size;
    return filtered.slice(start, start + size);
  });

  readonly resourceTotalPages = computed(() => {
    const total = this.filteredResources().length;
    const size = this.resourcePageSize();
    return Math.max(1, Math.ceil(total / size));
  });

  readonly approvalQueueCount = computed(() => {
    return this.resources().filter((r) => r.approvalStatus === 'Pending Review')
      .length;
  });

  // Communication State (.design/SCHOOL ADMIN/Communication_SA.png)
  readonly communicationMessages = signal<CommunicationMessage[]>(
    COMMUNICATION_MESSAGES_DATA,
  );
  readonly activeCommunicationTab = signal<CommunicationTab>('announcements');
  readonly communicationSummaryMetrics = signal<CommunicationSummaryMetrics>(
    COMMUNICATION_SUMMARY_METRICS,
  );
  readonly communicationSidebarSummary = signal<CommunicationSidebarSummary>(
    COMMUNICATION_SIDEBAR_SUMMARY,
  );
  readonly communicationAttentionItems = signal<CommunicationAttentionItem[]>(
    COMMUNICATION_ATTENTION_ITEMS,
  );
  readonly selectedCommunicationMessage = signal<CommunicationMessage | null>(
    null,
  );
  readonly selectedCommunicationAttentionItem =
    signal<CommunicationAttentionItem | null>(null);
  readonly isCreateAnnouncementModalOpen = signal<boolean>(false);
  readonly isSendParentMessageModalOpen = signal<boolean>(false);
  readonly isScheduleBlastModalOpen = signal<boolean>(false);
  readonly isExportCommunicationModalOpen = signal<boolean>(false);
  readonly communicationSearchQuery = signal<string>('');
  readonly communicationAudienceFilter = signal<string>('All Audiences');
  readonly communicationCategoryFilter = signal<string>('All Categories');
  readonly communicationStatusFilter = signal<string>('All Statuses');
  readonly communicationDateFilter = signal<string>('All Dates');
  readonly communicationPage = signal<number>(1);
  readonly communicationPageSize = signal<number>(10);

  readonly filteredCommunicationMessages = computed(() => {
    const list = this.communicationMessages();
    const tab = this.activeCommunicationTab();
    const query = this.communicationSearchQuery().toLowerCase().trim();
    const audienceFilter = this.communicationAudienceFilter();
    const categoryFilter = this.communicationCategoryFilter();
    const statusFilter = this.communicationStatusFilter();
    const dateFilter = this.communicationDateFilter();
    const attention = this.selectedCommunicationAttentionItem();

    return list.filter((item) => {
      // Tab filter
      if (tab === 'announcements') {
        const isAnnouncementRow =
          item.tab === 'announcements' ||
          [
            'msg-001',
            'msg-002',
            'msg-003',
            'msg-004',
            'msg-005',
            'msg-006',
            'msg-012',
          ].includes(item.id);
        if (!isAnnouncementRow) return false;
      } else if (tab === 'teacher-messages') {
        const isTeacherMessage =
          item.tab === 'teacher-messages' || item.audience.includes('Teacher');
        if (!isTeacherMessage) return false;
      } else if (tab === 'parent-messages') {
        const isParentMessage =
          item.tab === 'parent-messages' || item.audience.includes('Parent');
        if (!isParentMessage) return false;
      }
      // 'logs' displays all messages

      // Attention item filter
      if (attention) {
        if (
          attention.filterStatus &&
          item.deliveryStatus !== attention.filterStatus
        ) {
          return false;
        }
        if (attention.filterType === 'pending') {
          const isPending =
            item.tab === 'parent-messages' || item.audience.includes('Parent');
          if (!isPending) return false;
        }
      }

      // Dropdown filters
      if (
        audienceFilter !== 'All Audiences' &&
        item.audience !== audienceFilter
      ) {
        return false;
      }
      if (
        categoryFilter !== 'All Categories' &&
        item.category !== categoryFilter
      ) {
        return false;
      }
      if (
        statusFilter !== 'All Statuses' &&
        item.deliveryStatus !== statusFilter
      ) {
        return false;
      }
      if (dateFilter !== 'All Dates') {
        const matchScheduled = item.scheduledDate?.includes(dateFilter);
        const matchUpdated = item.lastUpdatedDate.includes(dateFilter);
        if (!matchScheduled && !matchUpdated) return false;
      }

      // Search query
      if (query) {
        const matchTitle = item.messageTitle.toLowerCase().includes(query);
        const matchAudience = item.audience.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        const matchSentBy = item.sentBy.toLowerCase().includes(query);
        const matchBody = item.body?.toLowerCase().includes(query) ?? false;
        if (
          !matchTitle &&
          !matchAudience &&
          !matchCategory &&
          !matchSentBy &&
          !matchBody
        ) {
          return false;
        }
      }

      return true;
    });
  });

  readonly paginatedCommunicationMessages = computed(() => {
    const filtered = this.filteredCommunicationMessages();
    const page = this.communicationPage();
    const size = this.communicationPageSize();
    const start = (page - 1) * size;
    return filtered.slice(start, start + size);
  });

  readonly communicationTotalPages = computed(() => {
    const total = this.filteredCommunicationMessages().length;
    const size = this.communicationPageSize();
    return Math.max(1, Math.ceil(total / size));
  });

  // Settings & Permissions Signals
  readonly activeSettingsTab = signal<SettingsTab>('general');
  readonly settingsSummaryMetrics = signal<SettingsSummaryMetrics>(
    SETTINGS_SUMMARY_METRICS,
  );
  readonly generalSettings = signal<GeneralSettingsForm>(GENERAL_SETTINGS_DATA);
  readonly initialGeneralSettings = signal<GeneralSettingsForm>(
    GENERAL_SETTINGS_DATA,
  );
  readonly generalSettingsSummary = signal<GeneralSettingsSummaryItem[]>(
    GENERAL_SETTINGS_SUMMARY_DATA,
  );
  readonly generalSettingsAttentionItems = signal<SettingsAttentionItem[]>(
    GENERAL_SETTINGS_ATTENTION_ITEMS,
  );
  readonly schoolRoles = signal<SchoolRole[]>(SCHOOL_ROLES_DATA);
  readonly permissionSidebarSummary = signal<PermissionSidebarSummary>(
    PERMISSION_SIDEBAR_SUMMARY_DATA,
  );
  readonly permissionAttentionItems = signal<SettingsAttentionItem[]>(
    PERMISSION_ATTENTION_ITEMS,
  );
  readonly selectedSettingsAttentionItem = signal<SettingsAttentionItem | null>(
    null,
  );
  readonly selectedRole = signal<SchoolRole | null>(null);
  readonly isCreateRoleModalOpen = signal<boolean>(false);
  readonly isExportPermissionModalOpen = signal<boolean>(false);
  readonly isConfirmDiscardModalOpen = signal<boolean>(false);
  readonly roleSearchQuery = signal<string>('');
  readonly roleAccessScopeFilter = signal<string>('All Scopes');
  readonly rolePermissionLevelFilter = signal<string>('All Levels');
  readonly roleStatusFilter = signal<string>('All Statuses');
  readonly rolePage = signal<number>(1);
  readonly rolePageSize = signal<number>(10);

  readonly isGeneralSettingsDirty = computed(() => {
    const curr = this.generalSettings();
    const init = this.initialGeneralSettings();
    return (
      curr.schoolName !== init.schoolName ||
      curr.schoolCode !== init.schoolCode ||
      curr.email !== init.email ||
      curr.phone !== init.phone ||
      curr.address !== init.address ||
      curr.logoUrl !== init.logoUrl ||
      curr.timeZone !== init.timeZone ||
      curr.dateFormat !== init.dateFormat ||
      curr.language !== init.language ||
      curr.emailAlerts !== init.emailAlerts ||
      curr.reportNotifications !== init.reportNotifications ||
      curr.parentCommunication !== init.parentCommunication ||
      curr.currentSession !== init.currentSession ||
      curr.defaultTerm !== init.defaultTerm ||
      curr.gradingScale !== init.gradingScale ||
      curr.namingConvention !== init.namingConvention ||
      curr.classStructure !== init.classStructure ||
      curr.primaryColor !== init.primaryColor ||
      curr.portalName !== init.portalName ||
      curr.faviconUrl !== init.faviconUrl ||
      curr.autoSave !== init.autoSave ||
      curr.archivePolicy !== init.archivePolicy ||
      curr.defaultApprovalWorkflow !== init.defaultApprovalWorkflow
    );
  });

  readonly filteredSchoolRoles = computed(() => {
    const roles = this.schoolRoles();
    const query = this.roleSearchQuery().toLowerCase().trim();
    const scopeFilter = this.roleAccessScopeFilter();
    const levelFilter = this.rolePermissionLevelFilter();
    const statusFilter = this.roleStatusFilter();
    const attention = this.selectedSettingsAttentionItem();

    return roles.filter((role) => {
      // Attention item filter
      if (attention) {
        if (
          attention.filterType === 'pending-approvals' &&
          role.status !== 'Review Needed'
        ) {
          return false;
        }
        if (
          attention.filterType === 'password-resets' &&
          role.status !== 'Restricted'
        ) {
          return false;
        }
        if (
          attention.filterType === 'policy-updates' &&
          role.accessScope !== 'Assigned Classes'
        ) {
          return false;
        }
        if (
          attention.filterType === 'elevated-access' &&
          role.permissionLevel !== 'Full Access' &&
          role.permissionLevel !== 'High Access'
        ) {
          return false;
        }
      }

      // Dropdown filters
      if (scopeFilter !== 'All Scopes' && role.accessScope !== scopeFilter) {
        return false;
      }
      if (
        levelFilter !== 'All Levels' &&
        role.permissionLevel !== levelFilter
      ) {
        return false;
      }
      if (statusFilter !== 'All Statuses' && role.status !== statusFilter) {
        return false;
      }

      // Search query
      if (query) {
        const matchName = role.name.toLowerCase().includes(query);
        const matchDesc = role.description.toLowerCase().includes(query);
        const matchScope = role.accessScope.toLowerCase().includes(query);
        const matchLevel = role.permissionLevel.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchScope && !matchLevel) {
          return false;
        }
      }

      return true;
    });
  });

  readonly paginatedSchoolRoles = computed(() => {
    const list = this.filteredSchoolRoles();
    const page = this.rolePage();
    const size = this.rolePageSize();
    const start = (page - 1) * size;
    return list.slice(start, start + size);
  });

  readonly rolesTotalPages = computed(() => {
    const total = this.filteredSchoolRoles().length;
    const size = this.rolePageSize();
    return Math.max(1, Math.ceil(total / size));
  });

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
   * Classes & Learners Actions
   */
  selectClass(classId: string): void {
    this.selectedClassId.set(classId);
    this.learnerPage.set(1);
  }

  setActiveClassesTab(
    tab: 'classes' | 'learners' | 'enrollment' | 'attendance',
  ): void {
    this.activeClassesTab.set(tab);
  }

  setLearnerSearchQuery(query: string): void {
    this.learnerSearchQuery.set(query);
    this.learnerPage.set(1);
  }

  setLearnerClassFilter(className: string): void {
    this.learnerClassFilter.set(className);
    this.learnerPage.set(1);
  }

  setLearnerStatusFilter(status: string): void {
    this.learnerStatusFilter.set(status);
    this.learnerPage.set(1);
  }

  setLearnerPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.learnerPage.set(page);
    }
  }

  createLearner(formData: NewLearnerFormData): LearnerRecord {
    const initials =
      `${formData.firstName[0] || ''}${formData.lastName[0] || ''}`.toUpperCase();
    const colors = [
      '#818cf8',
      '#60a5fa',
      '#f472b6',
      '#34d399',
      '#fb923c',
      '#c084fc',
      '#2dd4bf',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const classObj =
      this.classes().find(
        (c) =>
          c.name === `${formData.classLevel} ${formData.arm}`.trim() ||
          c.level === formData.classLevel,
      ) ?? this.selectedClass();

    const newRecord: LearnerRecord = {
      id: `lrn-${Date.now()}`,
      name: `${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}`.trim(),
      admissionNo:
        formData.admissionNumber ||
        `ADM/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
      classId: classObj?.id ?? 'class-jss-1a',
      className: classObj?.name ?? 'JSS 1A',
      gender: formData.gender === 'Other' ? 'Female' : formData.gender,
      attendanceRate: 100,
      averageScore: 70,
      currentStatus:
        formData.enrollmentStatus === 'Pending'
          ? 'Active'
          : formData.enrollmentStatus,
      interventionFlag: false,
      initials,
      avatarColor: randomColor,
      guardianName: formData.parentName,
      guardianPhone: formData.parentPhone,
      guardianEmail: formData.parentEmail,
    };

    this.learners.update((prev) => [newRecord, ...prev]);

    // Update class learner count
    if (classObj) {
      this.classes.update((classes) =>
        classes.map((c) =>
          c.id === classObj.id
            ? {
                ...c,
                learnersCount: c.learnersCount + 1,
                activeEnrollments: c.activeEnrollments + 1,
              }
            : c,
        ),
      );
    }

    this.setupSaveStatus.set(`Learner ${newRecord.name} created successfully.`);
    return newRecord;
  }

  /**
   * Teachers & Staff Actions
   */
  selectStaff(staffId: string): void {
    this.selectedStaffId.set(staffId);
  }

  setActiveStaffTab(
    tab: 'teachers' | 'support' | 'assignments' | 'permissions',
  ): void {
    this.activeStaffTab.set(tab);
    this.staffPage.set(1);
  }

  setStaffSearchQuery(query: string): void {
    this.staffSearchQuery.set(query);
    this.staffPage.set(1);
  }

  setStaffDepartmentFilter(department: string): void {
    this.staffDepartmentFilter.set(department);
    this.staffPage.set(1);
  }

  setStaffRoleFilter(role: string): void {
    this.staffRoleFilter.set(role);
    this.staffPage.set(1);
  }

  setStaffStatusFilter(status: string): void {
    this.staffStatusFilter.set(status);
    this.staffPage.set(1);
  }

  setStaffPage(page: number): void {
    if (page >= 1 && page <= this.staffTotalPages()) {
      this.staffPage.set(page);
    }
  }

  setStaffPageSize(size: number): void {
    this.staffPageSize.set(size);
    this.staffPage.set(1);
  }

  createStaffMember(formData: NewStaffFormData): StaffMember {
    const initials =
      `${formData.firstName[0] || ''}${formData.lastName[0] || ''}`.toUpperCase();
    const colors = [
      '#7c3aed',
      '#2563eb',
      '#059669',
      '#d97706',
      '#db2777',
      '#8b5cf6',
      '#10b981',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newStaff: StaffMember = {
      id: `staff-${Date.now()}`,
      name: `${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}`.trim(),
      staffId:
        formData.staffId || `TCH-${Math.floor(1000 + Math.random() * 9000)}`,
      avatarUrl: formData.avatarUrl,
      initials,
      avatarColor: randomColor,
      role: formData.role || 'Subject Teacher',
      department: formData.department || 'General Studies',
      assignedSubjects: formData.assignedSubjects || [],
      assignedClasses: formData.assignedClasses || [],
      attendanceRate: 100,
      attendanceRating: 'Excellent',
      feedbackCompletionRate: 80,
      status:
        formData.assignedSubjects.length === 0
          ? 'Pending Assignment'
          : 'Active',
      activeLessonsCount: 4,
      pendingReviewsCount: 0,
      avgLearnerPerformance: 75,
      email: formData.email,
      phone: `${formData.phoneCode} ${formData.phoneNumber}`.trim(),
      staffType:
        (formData.staffType as
          | 'Academic'
          | 'Support'
          | 'Leadership'
          | 'Specialist') || 'Academic',
      qualification: formData.qualification,
      employmentType:
        (formData.employmentType as
          | 'Full-time'
          | 'Part-time'
          | 'Contract'
          | 'Probationary') || 'Full-time',
      dateJoined: formData.dateJoined,
      yearsOfExperience: formData.yearsOfExperience,
      isClassTeacher: formData.isClassTeacher,
      academicLevel: formData.academicLevel,
      reportingLine: formData.reportingLine,
    };

    this.staff.update((prev) => [newStaff, ...prev]);
    this.staffOverviewMetrics.update((m) => ({
      ...m,
      totalTeachers: m.totalTeachers + 1,
      activeStaff: m.activeStaff + 1,
    }));
    this.setupSaveStatus.set(
      `Staff member ${newStaff.name} created successfully.`,
    );
    return newStaff;
  }

  updateStaffStatus(
    staffId: string,
    status: 'Active' | 'On Leave' | 'Pending Assignment' | 'Suspended',
  ): void {
    this.staff.update((list) =>
      list.map((s) => (s.id === staffId ? { ...s, status } : s)),
    );
    this.setupSaveStatus.set(`Staff status updated to ${status}.`);
  }

  /**
   * Subjects & Curriculum Actions
   */
  setActiveCurriculumTab(
    tab:
      | 'subjects'
      | 'curriculum-map'
      | 'scheme-of-work'
      | 'scheme-detail'
      | 'topic-delivery-packs'
      | 'approval-queue',
  ): void {
    this.activeCurriculumTab.set(tab);
  }

  selectSubject(subjectId: string): void {
    this.selectedSubjectId.set(subjectId);
  }

  setSubjectSearchQuery(query: string): void {
    this.subjectSearchQuery.set(query);
  }

  setSubjectStatusFilter(status: string): void {
    this.subjectStatusFilter.set(status);
  }

  setCurriculumClassFilter(cls: string): void {
    this.curriculumClassFilter.set(cls);
  }

  setCurriculumSubjectFilter(subj: string): void {
    this.curriculumSubjectFilter.set(subj);
  }

  setCurriculumTermFilter(term: string): void {
    this.curriculumTermFilter.set(term);
  }

  setCurriculumStatusFilter(status: string): void {
    this.curriculumStatusFilter.set(status);
  }

  viewSchemeWeekDetail(weekNumber: number): void {
    this.weekSchemeDetail.update((w) => ({
      ...w,
      weekNumber,
    }));
    this.activeCurriculumTab.set('scheme-detail');
  }

  viewTopicDeliveryPack(topicId = 'pack-whole-numbers'): void {
    if (topicId) {
      this.topicDeliveryPack.update((pack) => ({ ...pack, id: topicId }));
    }
    this.activeCurriculumTab.set('topic-delivery-packs');
  }

  /**
   * Lessons & Delivery Oversight Mutations
   */
  setActiveLessonsTab(
    tab:
      | 'active-lessons'
      | 'delivery-oversight'
      | 'lesson-reviews'
      | 'readiness-alerts',
  ): void {
    this.activeLessonsTab.set(tab);
  }

  setLessonClassFilter(filter: string): void {
    this.lessonClassFilter.set(filter);
  }

  setLessonSubjectFilter(filter: string): void {
    this.lessonSubjectFilter.set(filter);
  }

  setLessonTeacherFilter(filter: string): void {
    this.lessonTeacherFilter.set(filter);
  }

  setLessonStatusFilter(filter: string): void {
    this.lessonStatusFilter.set(filter);
  }

  setLessonSearchQuery(query: string): void {
    this.lessonSearchQuery.set(query);
  }

  selectLessonRecord(record: LessonMonitoringRecord): void {
    this.selectedLessonRecord.set(record);
  }

  approveLessonPlan(id: string): void {
    this.lessonReviews.update((reviews) =>
      reviews.map((r) =>
        r.id === id ? { ...r, reviewStatus: 'Approved' as const } : r,
      ),
    );
    this.setupSaveStatus.set(
      'Lesson plan approved and published to classroom delivery portal.',
    );
  }

  requestLessonRevision(id: string): void {
    this.lessonReviews.update((reviews) =>
      reviews.map((r) =>
        r.id === id ? { ...r, reviewStatus: 'Revision Requested' as const } : r,
      ),
    );
    this.setupSaveStatus.set(
      'Revision requested. Teacher notified with specific curriculum feedback.',
    );
  }

  resolveReadinessAlert(id: string): void {
    this.lessonReadinessAlerts.update((alerts) =>
      alerts.filter((a) => a.id !== id),
    );
    this.setupSaveStatus.set(
      'Readiness alert marked as resolved and logged in governance audit.',
    );
  }

  /**
   * Live Classes Mutations
   */
  setActiveLiveClassTab(tab: LiveClassTab): void {
    this.activeLiveClassTab.set(tab);
    this.liveClassCurrentPage.set(1);
    this.activeAttentionFilterKey.set(null);
  }

  setLiveClassLevelFilter(filter: string): void {
    this.liveClassLevelFilter.set(filter);
    this.liveClassCurrentPage.set(1);
  }

  setLiveClassSubjectFilter(filter: string): void {
    this.liveClassSubjectFilter.set(filter);
    this.liveClassCurrentPage.set(1);
  }

  setLiveClassTeacherFilter(filter: string): void {
    this.liveClassTeacherFilter.set(filter);
    this.liveClassCurrentPage.set(1);
  }

  setLiveClassStatusFilter(filter: string): void {
    this.liveClassStatusFilter.set(filter);
    this.liveClassCurrentPage.set(1);
  }

  setLiveClassSearchQuery(query: string): void {
    this.liveClassSearchQuery.set(query);
    this.liveClassCurrentPage.set(1);
  }

  setLiveClassCurrentPage(page: number): void {
    this.liveClassCurrentPage.set(page);
  }

  selectLiveClass(record: LiveClassRecord | null): void {
    this.selectedLiveClass.set(record);
  }

  toggleAttentionFilter(
    key:
      | 'low-attendance'
      | 'missing-recordings'
      | 'starting-soon'
      | 'no-teacher',
  ): void {
    const current = this.activeAttentionFilterKey();
    if (current === key) {
      this.activeAttentionFilterKey.set(null);
    } else {
      this.activeAttentionFilterKey.set(key);
    }
    this.liveClassCurrentPage.set(1);
  }

  clearAttentionFilter(): void {
    this.activeAttentionFilterKey.set(null);
    this.liveClassCurrentPage.set(1);
  }

  openScheduleModal(): void {
    this.isScheduleModalOpen.set(true);
  }

  closeScheduleModal(): void {
    this.isScheduleModalOpen.set(false);
  }

  scheduleNewLiveClass(newClass: Partial<LiveClassRecord>): void {
    const created: LiveClassRecord = {
      id: `live-${Date.now()}`,
      className: newClass.className ?? 'JSS 1A',
      subject: newClass.subject ?? 'General Studies',
      topic: newClass.topic ?? 'General Orientation',
      teacherName: newClass.teacherName ?? 'Unassigned Teacher',
      startTime: newClass.startTime ?? '09:00 AM',
      endTime: newClass.endTime ?? '09:40 AM',
      startDate: newClass.startDate ?? '2026-11-10',
      duration: newClass.duration ?? '40 min',
      attendance: {
        rate: 0,
        rating: 'Pending',
        presentCount: 0,
        totalEnrolled: 40,
      },
      liveStatus: 'Upcoming',
      recording: {
        status: 'Not Available',
      },
      meetingLink: `https://learno.school/live/${Date.now()}`,
      classroomRoomId: `ROOM-${Math.floor(100 + Math.random() * 900)}`,
      roomCapacity: 50,
      ...newClass,
    };

    this.liveClassRecords.update((records) => [created, ...records]);
    this.liveClassesSummaryMetrics.update((m) => ({
      ...m,
      scheduledToday: m.scheduledToday + 1,
    }));
    this.liveClassSidebarSummary.update((s) => ({
      ...s,
      scheduledToday: s.scheduledToday + 1,
    }));
    this.isScheduleModalOpen.set(false);
    this.setupSaveStatus.set(
      `Live class scheduled successfully: ${created.className} - ${created.subject} (${created.startTime})`,
    );
  }

  openLiveClassObserver(record: LiveClassRecord): void {
    this.observingLiveClass.set(record);
    this.isObserverModalOpen.set(true);
  }

  closeLiveClassObserver(): void {
    this.isObserverModalOpen.set(false);
    this.observingLiveClass.set(null);
  }

  exportLiveClassesReport(): void {
    this.setupSaveStatus.set(
      'Live classes attendance and session report generated for school administration.',
    );
  }

  /**
   * Assessments & Gradebooks Mutations
   */
  setActiveAssessmentTab(tab: AssessmentScheduleTab): void {
    this.activeAssessmentTab.set(tab);
    this.assessmentCurrentPage.set(1);
    this.assessmentAttentionFilterKey.set(null);
  }

  setActiveReviewSubTab(tab: AssessmentReviewSubTab): void {
    this.activeReviewSubTab.set(tab);
  }

  setAssessmentClassFilter(filter: string): void {
    this.assessmentClassFilter.set(filter);
    this.assessmentCurrentPage.set(1);
  }

  setAssessmentSubjectFilter(filter: string): void {
    this.assessmentSubjectFilter.set(filter);
    this.assessmentCurrentPage.set(1);
  }

  setAssessmentTeacherFilter(filter: string): void {
    this.assessmentTeacherFilter.set(filter);
    this.assessmentCurrentPage.set(1);
  }

  setAssessmentTypeFilter(filter: string): void {
    this.assessmentTypeFilter.set(filter);
    this.assessmentCurrentPage.set(1);
  }

  setAssessmentSearchQuery(query: string): void {
    this.assessmentSearchQuery.set(query);
    this.assessmentCurrentPage.set(1);
  }

  setAssessmentCurrentPage(page: number): void {
    this.assessmentCurrentPage.set(page);
  }

  toggleAssessmentAttentionFilter(
    key:
      | 'awaiting-finalization'
      | 'missing-scores'
      | 'overdue-grading'
      | 'low-performance',
  ): void {
    const current = this.assessmentAttentionFilterKey();
    if (current === key) {
      this.assessmentAttentionFilterKey.set(null);
    } else {
      this.assessmentAttentionFilterKey.set(key);
    }
    this.assessmentCurrentPage.set(1);
  }

  clearAssessmentAttentionFilter(): void {
    this.assessmentAttentionFilterKey.set(null);
    this.assessmentCurrentPage.set(1);
  }

  openAssessmentReview(assessment: AssessmentRecord): void {
    this.selectedAssessmentForReview.set(assessment);
    this.activeReviewSubTab.set('submission-review');
  }

  closeAssessmentReview(): void {
    this.selectedAssessmentForReview.set(null);
  }

  openCreateAssessmentModal(): void {
    this.isCreateAssessmentModalOpen.set(true);
  }

  closeCreateAssessmentModal(): void {
    this.isCreateAssessmentModalOpen.set(false);
  }

  createAssessment(data: Partial<AssessmentRecord>): void {
    const created: AssessmentRecord = {
      id: `asm-${Date.now()}`,
      className: data.className ?? 'JSS 1A',
      subject: data.subject ?? 'Mathematics',
      assessmentName: data.assessmentName ?? 'Continuous Assessment Quiz',
      week: data.week ?? 'Week 6',
      teacherName: data.teacherName ?? 'Mr. Tunde Adewale',
      assessmentType: data.assessmentType ?? 'Quiz',
      submissionsCount: 0,
      totalLearners: data.totalLearners ?? 30,
      submissionRate: 0,
      gradingStatus: 'Pending',
      averageScore: undefined,
      maxScore: data.maxScore ?? 30,
      gradebookStatus: 'Not Started',
      lastUpdated: 'Just now',
      ...data,
    };

    this.assessmentRecords.update((records) => [created, ...records]);
    this.assessmentsSummaryMetrics.update((m) => ({
      ...m,
      totalAssessments: m.totalAssessments + 1,
    }));
    this.assessmentSidebarSummary.update((s) => ({
      ...s,
      totalScheduled: s.totalScheduled + 1,
    }));
    this.isCreateAssessmentModalOpen.set(false);
    this.setupSaveStatus.set(
      `Assessment created: ${created.assessmentName} (${created.className} - ${created.subject})`,
    );
  }

  openModerationModal(submission: LearnerSubmissionReview): void {
    this.selectedSubmissionForModeration.set(submission);
    this.isModerationModalOpen.set(true);
  }

  closeModerationModal(): void {
    this.isModerationModalOpen.set(false);
    this.selectedSubmissionForModeration.set(null);
  }

  saveModeratedScore(id: string, score: number, comment: string): void {
    this.learnerSubmissions.update((subs) =>
      subs.map((s) =>
        s.id === id
          ? {
              ...s,
              moderatedScore: score,
              reviewStatus: 'Reviewed' as const,
              flag: '—',
              rubricComment: comment,
            }
          : s,
      ),
    );
    this.isModerationModalOpen.set(false);
    this.selectedSubmissionForModeration.set(null);
    this.setupSaveStatus.set(
      `Score moderated and saved. Rubric comments recorded for moderation log.`,
    );
  }

  approveAssessmentGradebook(assessmentId: string): void {
    this.assessmentRecords.update((records) =>
      records.map((r) =>
        r.id === assessmentId
          ? {
              ...r,
              gradingStatus: 'Finalized' as const,
              gradebookStatus: 'Finalized' as const,
              pendingReviewCount: 0,
            }
          : r,
      ),
    );
    if (this.selectedAssessmentForReview()?.id === assessmentId) {
      this.selectedAssessmentForReview.update((cur) =>
        cur
          ? {
              ...cur,
              gradingStatus: 'Finalized' as const,
              gradebookStatus: 'Finalized' as const,
              pendingReviewCount: 0,
            }
          : null,
      );
    }
    this.assessmentsSummaryMetrics.update((m) => ({
      ...m,
      gradebooksFinalized: m.gradebooksFinalized + 1,
      assessmentsCompleted: m.assessmentsCompleted + 1,
    }));
    this.setupSaveStatus.set(
      `Gradebook finalized and approved for official school record.`,
    );
  }

  returnGradebookToTeacher(assessmentId: string): void {
    this.setupSaveStatus.set(
      `Gradebook (${assessmentId}) returned to subject teacher with specific rubric and moderation instructions.`,
    );
  }

  exportAssessmentReport(): void {
    this.setupSaveStatus.set(
      `Official assessment and continuous evaluation report generated for administration.`,
    );
  }

  /**
   * Reports & Report Cards Mutations
   */
  setActiveReportTab(tab: ReportTab): void {
    this.activeReportTab.set(tab);
  }

  setReportClassFilter(filter: string): void {
    this.reportClassFilter.set(filter);
  }

  setReportSubjectFilter(filter: string): void {
    this.reportSubjectFilter.set(filter);
  }

  setReportSearchQuery(query: string): void {
    this.reportSearchQuery.set(query);
  }

  selectReportAttentionArea(item: PriorityAttentionArea): void {
    const current = this.selectedReportAttentionArea();
    if (current?.id === item.id) {
      this.selectedReportAttentionArea.set(null);
    } else {
      this.selectedReportAttentionArea.set(item);
    }
  }

  clearReportAttentionArea(): void {
    this.selectedReportAttentionArea.set(null);
  }

  openStudentReportCard(report?: StudentReportCard): void {
    if (report) {
      this.selectedStudentReportCard.set(report);
    }
    this.isStudentReportModalOpen.set(true);
  }

  closeStudentReportCard(): void {
    this.isStudentReportModalOpen.set(false);
  }

  openExportReportModal(): void {
    this.isExportReportModalOpen.set(true);
  }

  closeExportReportModal(): void {
    this.isExportReportModalOpen.set(false);
  }

  openShareLeadershipModal(): void {
    this.isShareLeadershipModalOpen.set(true);
  }

  closeShareLeadershipModal(): void {
    this.isShareLeadershipModalOpen.set(false);
  }

  approveAllSchoolReports(): void {
    this.reportsSidebarSummary.update((s) => ({
      ...s,
      approvalStatus: 'Approved',
    }));
    this.classReportCards.update((list) =>
      list.map((c) => ({
        ...c,
        status: 'Approved' as const,
        reportsApproved: c.reportsGenerated,
      })),
    );
    this.setupSaveStatus.set(
      'All school term report cards approved and signed for official release.',
    );
  }

  approveClassReportCards(classId: string): void {
    this.classReportCards.update((list) =>
      list.map((c) =>
        c.id === classId
          ? {
              ...c,
              status: 'Approved' as const,
              reportsApproved: c.reportsGenerated,
            }
          : c,
      ),
    );
    this.setupSaveStatus.set(`Class report cards approved successfully.`);
  }

  exportSchoolReport(format = 'PDF'): void {
    this.isExportReportModalOpen.set(false);
    this.setupSaveStatus.set(
      `Official School Performance Report exported successfully (${format} format).`,
    );
  }

  shareReportWithLeadership(
    recipients: string[] = ['Principal', 'School Board'],
  ): void {
    this.isShareLeadershipModalOpen.set(false);
    this.setupSaveStatus.set(
      `Performance Report securely shared with ${recipients.join(', ')}.`,
    );
  }

  /**
   * Interventions Mutations
   */
  setActiveInterventionsTab(tab: InterventionsTab): void {
    this.activeInterventionsTab.set(tab);
    this.interventionPage.set(1);
  }

  setInterventionSearchQuery(query: string): void {
    this.interventionSearchQuery.set(query);
    this.interventionPage.set(1);
  }

  setInterventionClassFilter(cls: string): void {
    this.interventionClassFilter.set(cls);
    this.interventionPage.set(1);
  }

  setInterventionPriorityFilter(priority: string): void {
    this.interventionPriorityFilter.set(priority);
    this.interventionPage.set(1);
  }

  setInterventionStatusFilter(status: string): void {
    this.interventionStatusFilter.set(status);
    this.interventionPage.set(1);
  }

  setInterventionPage(page: number): void {
    this.interventionPage.set(page);
  }

  selectInterventionAttentionItem(item: InterventionAttentionItem): void {
    const current = this.selectedInterventionAttentionItem();
    if (current?.id === item.id) {
      this.selectedInterventionAttentionItem.set(null);
    } else {
      this.selectedInterventionAttentionItem.set(item);
    }
    this.interventionPage.set(1);
  }

  clearInterventionAttentionItem(): void {
    this.selectedInterventionAttentionItem.set(null);
    this.interventionPage.set(1);
  }

  openCreateInterventionModal(): void {
    this.isCreateInterventionModalOpen.set(true);
  }

  closeCreateInterventionModal(): void {
    this.isCreateInterventionModalOpen.set(false);
  }

  createInterventionPlan(form: NewInterventionPlanFormData): void {
    const nameParts = form.learnerName.split(' ');
    const initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
        : form.learnerName.slice(0, 2).toUpperCase();

    const newCase: InterventionCase = {
      id: `case-${Date.now()}`,
      learnerId: `lrn-${Date.now()}`,
      learnerName: form.learnerName,
      initials,
      admissionNo: form.admissionNo,
      className: form.className,
      concernArea: form.concernArea,
      interventionType: form.interventionType,
      assignedStaff: form.assignedStaff,
      assignedStaffRole: form.assignedStaffRole,
      status: 'In Progress',
      priority: form.priority,
      nextReviewDate: form.nextReviewDate,
      progress: 10,
    };

    this.interventions.update((list) => [newCase, ...list]);
    this.interventionsSummaryMetrics.update((m) => ({
      ...m,
      activeInterventions: m.activeInterventions + 1,
      learnersFlagged: m.learnersFlagged + 1,
    }));
    this.isCreateInterventionModalOpen.set(false);
    this.setupSaveStatus.set(
      `Intervention plan created for ${form.learnerName} assigned to ${form.assignedStaff}.`,
    );
  }

  openAssignFollowUpModal(c?: InterventionCase): void {
    if (c) {
      this.selectedInterventionCase.set(c);
    }
    this.isAssignFollowUpModalOpen.set(true);
  }

  closeAssignFollowUpModal(): void {
    this.isAssignFollowUpModalOpen.set(false);
  }

  assignFollowUp(form: AssignFollowUpFormData): void {
    this.interventions.update((list) =>
      list.map((c) =>
        c.id === form.caseId
          ? {
              ...c,
              assignedStaff: form.assignedStaff,
              nextReviewDate: form.dueDate,
            }
          : c,
      ),
    );
    this.isAssignFollowUpModalOpen.set(false);
    this.setupSaveStatus.set(
      `Follow-up task for ${form.learnerName} assigned to ${form.assignedStaff} due on ${form.dueDate}.`,
    );
  }

  openScheduleParentMeetingModal(c?: InterventionCase): void {
    if (c) {
      this.selectedInterventionCase.set(c);
    }
    this.isScheduleParentMeetingModalOpen.set(true);
  }

  closeScheduleParentMeetingModal(): void {
    this.isScheduleParentMeetingModalOpen.set(false);
  }

  scheduleParentMeeting(form: ScheduleParentMeetingFormData): void {
    this.interventionsSidebarSummary.update((s) => ({
      ...s,
      parentMeetingsScheduled: s.parentMeetingsScheduled + 1,
    }));
    this.isScheduleParentMeetingModalOpen.set(false);
    this.setupSaveStatus.set(
      `Parent meeting scheduled for ${form.learnerName} on ${form.meetingDate} at ${form.meetingTime}.`,
    );
  }

  openExportInterventionModal(): void {
    this.isExportInterventionModalOpen.set(true);
  }

  closeExportInterventionModal(): void {
    this.isExportInterventionModalOpen.set(false);
  }

  exportInterventionReport(format = 'PDF'): void {
    this.isExportInterventionModalOpen.set(false);
    this.setupSaveStatus.set(
      `Intervention and learner support report exported successfully (${format} format).`,
    );
  }

  openInterventionDetails(c: InterventionCase): void {
    this.selectedInterventionCase.set(c);
  }

  closeInterventionDetails(): void {
    this.selectedInterventionCase.set(null);
  }

  updateInterventionProgress(caseId: string, progress: number): void {
    this.interventions.update((list) =>
      list.map((c) => (c.id === caseId ? { ...c, progress } : c)),
    );
    this.setupSaveStatus.set(`Intervention progress updated to ${progress}%.`);
  }

  resolveInterventionCase(caseId: string): void {
    this.interventions.update((list) =>
      list.map((c) =>
        c.id === caseId
          ? { ...c, status: 'Resolved' as const, progress: 100 }
          : c,
      ),
    );
    this.interventionsSummaryMetrics.update((m) => ({
      ...m,
      resolvedCases: m.resolvedCases + 1,
      activeInterventions: Math.max(0, m.activeInterventions - 1),
    }));
    this.setupSaveStatus.set(`Intervention case resolved successfully.`);
  }

  /**
   * Resources Mutations (.design/SCHOOL ADMIN/Resources_SA.png)
   */
  setActiveResourcesTab(tab: ResourcesTab): void {
    this.activeResourcesTab.set(tab);
    this.resourcePage.set(1);
    if (tab === 'queue') {
      this.resourceStatusFilter.set('Pending Review');
    } else if (this.resourceStatusFilter() === 'Pending Review') {
      this.resourceStatusFilter.set('All Statuses');
    }
  }

  setResourceSearchQuery(query: string): void {
    this.resourceSearchQuery.set(query);
    this.resourcePage.set(1);
  }

  setResourceClassFilter(cls: string): void {
    this.resourceClassFilter.set(cls);
    this.resourcePage.set(1);
  }

  setResourceSubjectFilter(subj: string): void {
    this.resourceSubjectFilter.set(subj);
    this.resourcePage.set(1);
  }

  setResourceTypeFilter(type: string): void {
    this.resourceTypeFilter.set(type);
    this.resourcePage.set(1);
  }

  setResourceStatusFilter(status: string): void {
    this.resourceStatusFilter.set(status);
    this.resourcePage.set(1);
  }

  setResourcePage(page: number): void {
    const validPage = Math.max(1, Math.min(page, this.resourceTotalPages()));
    this.resourcePage.set(validPage);
  }

  selectResourceAttentionItem(item: ResourceAttentionItem): void {
    const current = this.selectedResourceAttentionItem();
    if (current?.id === item.id) {
      this.selectedResourceAttentionItem.set(null);
    } else {
      this.selectedResourceAttentionItem.set(item);
    }
    this.resourcePage.set(1);
  }

  clearResourceAttentionItem(): void {
    this.selectedResourceAttentionItem.set(null);
    this.resourcePage.set(1);
  }

  openUploadResourceModal(): void {
    this.isUploadResourceModalOpen.set(true);
  }

  closeUploadResourceModal(): void {
    this.isUploadResourceModalOpen.set(false);
  }

  uploadResource(form: UploadResourceFormData): void {
    const newId = `res-${Date.now().toString().slice(-4)}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const newResource: ResourceItem = {
      id: newId,
      className: form.className,
      subject: form.subject,
      week: form.week || 'Week 1',
      topic: form.topic || '',
      title: form.title,
      resourceType: form.resourceType as ResourceItem['resourceType'],
      audience: form.audience,
      format: form.format,
      fileSize: '1.5 MB',
      approvalStatus: 'Pending Review',
      linkedDeliveryPack: form.linkedDeliveryPack,
      uploadedBy: 'School Admin',
      lastUpdated: dateStr,
      isLowData: form.isLowDataVersion ?? true,
      description: form.description,
    };

    this.resources.update((list) => [newResource, ...list]);
    this.resourcesSummaryMetrics.update((m) => ({
      ...m,
      totalResources: m.totalResources + 1,
      pendingReview: m.pendingReview + 1,
    }));
    this.resourcesSidebarSummary.update((s) => ({
      ...s,
      totalUploaded: s.totalUploaded + 1,
      pendingReview: s.pendingReview + 1,
    }));
    this.isUploadResourceModalOpen.set(false);
    this.setupSaveStatus.set(
      `Resource "${form.title}" uploaded and queued for review.`,
    );
  }

  openLinkDeliveryPackModal(item?: ResourceItem): void {
    if (item) {
      this.selectedResourceItem.set(item);
    }
    this.isLinkDeliveryPackModalOpen.set(true);
  }

  closeLinkDeliveryPackModal(): void {
    this.isLinkDeliveryPackModalOpen.set(false);
  }

  linkResourceToDeliveryPack(form: LinkDeliveryPackFormData): void {
    this.resources.update((list) =>
      list.map((r) =>
        r.id === form.resourceId
          ? {
              ...r,
              linkedDeliveryPack: form.deliveryPackId,
              approvalStatus:
                r.approvalStatus === 'Missing Link'
                  ? 'Approved'
                  : r.approvalStatus,
            }
          : r,
      ),
    );
    this.isLinkDeliveryPackModalOpen.set(false);
    this.setupSaveStatus.set(
      `Resource linked to delivery pack ${form.deliveryPackId}.`,
    );
  }

  openResourceDetails(item: ResourceItem): void {
    this.selectedResourceItem.set(item);
  }

  closeResourceDetails(): void {
    this.selectedResourceItem.set(null);
  }

  approveResource(id: string): void {
    this.resources.update((list) =>
      list.map((r) =>
        r.id === id ? { ...r, approvalStatus: 'Approved' as const } : r,
      ),
    );
    this.resourcesSummaryMetrics.update((m) => ({
      ...m,
      approvedResources: m.approvedResources + 1,
      pendingReview: Math.max(0, m.pendingReview - 1),
    }));
    this.resourcesSidebarSummary.update((s) => ({
      ...s,
      approved: s.approved + 1,
      pendingReview: Math.max(0, s.pendingReview - 1),
    }));
    this.setupSaveStatus.set(`Resource approved for teaching.`);
  }

  rejectResource(id: string): void {
    this.resources.update((list) =>
      list.map((r) =>
        r.id === id ? { ...r, approvalStatus: 'Draft' as const } : r,
      ),
    );
    this.resourcesSummaryMetrics.update((m) => ({
      ...m,
      pendingReview: Math.max(0, m.pendingReview - 1),
    }));
    this.setupSaveStatus.set(`Resource marked as draft.`);
  }

  openExportResourceModal(): void {
    this.isExportResourceModalOpen.set(true);
  }

  closeExportResourceModal(): void {
    this.isExportResourceModalOpen.set(false);
  }

  exportResourceReport(format = 'PDF'): void {
    this.isExportResourceModalOpen.set(false);
    this.setupSaveStatus.set(
      `Resource inventory report exported successfully (${format}).`,
    );
  }

  // Communication Actions
  setActiveCommunicationTab(tab: CommunicationTab): void {
    this.activeCommunicationTab.set(tab);
    this.communicationPage.set(1);
  }

  setCommunicationSearchQuery(q: string): void {
    this.communicationSearchQuery.set(q);
    this.communicationPage.set(1);
  }

  setCommunicationAudienceFilter(audience: string): void {
    this.communicationAudienceFilter.set(audience);
    this.communicationPage.set(1);
  }

  setCommunicationCategoryFilter(category: string): void {
    this.communicationCategoryFilter.set(category);
    this.communicationPage.set(1);
  }

  setCommunicationStatusFilter(status: string): void {
    this.communicationStatusFilter.set(status);
    this.communicationPage.set(1);
  }

  setCommunicationDateFilter(date: string): void {
    this.communicationDateFilter.set(date);
    this.communicationPage.set(1);
  }

  setCommunicationPage(page: number): void {
    this.communicationPage.set(page);
  }

  setCommunicationPageSize(size: number): void {
    this.communicationPageSize.set(size);
    this.communicationPage.set(1);
  }

  selectCommunicationAttentionItem(item: CommunicationAttentionItem): void {
    if (this.selectedCommunicationAttentionItem()?.id === item.id) {
      this.selectedCommunicationAttentionItem.set(null);
    } else {
      this.selectedCommunicationAttentionItem.set(item);
      this.communicationPage.set(1);
    }
  }

  clearCommunicationAttentionItem(): void {
    this.selectedCommunicationAttentionItem.set(null);
  }

  openCreateAnnouncementModal(): void {
    this.isCreateAnnouncementModalOpen.set(true);
  }

  closeCreateAnnouncementModal(): void {
    this.isCreateAnnouncementModalOpen.set(false);
  }

  createAnnouncement(form: CreateAnnouncementFormData): void {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const isScheduled = !!form.scheduleDate;
    const newMessage: CommunicationMessage = {
      id: `msg-${Date.now().toString().slice(-4)}`,
      audience: form.audience,
      messageTitle: form.title,
      category: form.category,
      sentBy: 'School Admin',
      sentByInitials: 'SA',
      deliveryStatus: isScheduled ? 'Scheduled' : 'Delivered',
      scheduledDate: form.scheduleDate ?? dateStr,
      scheduledTime: form.scheduleTime ?? timeStr,
      lastUpdatedDate: dateStr,
      lastUpdatedTime: timeStr,
      tab: 'announcements',
      channels: form.channels,
      body: form.body,
      recipientsCount: form.audience.includes('All') ? 2184 : 156,
      deliveredCount: isScheduled
        ? 0
        : form.audience.includes('All')
          ? 2184
          : 156,
      failedCount: 0,
    };

    this.communicationMessages.update((list) => [newMessage, ...list]);
    this.communicationSummaryMetrics.update((m) => ({
      ...m,
      totalMessagesSent: m.totalMessagesSent + (isScheduled ? 0 : 1),
      announcementsPublished: m.announcementsPublished + 1,
    }));
    this.communicationSidebarSummary.update((s) => ({
      ...s,
      messagesThisWeek: s.messagesThisWeek + 1,
    }));
    this.isCreateAnnouncementModalOpen.set(false);
    this.setupSaveStatus.set(
      `Announcement "${form.title}" ${isScheduled ? 'scheduled' : 'published'} successfully.`,
    );
  }

  openSendParentMessageModal(): void {
    this.isSendParentMessageModalOpen.set(true);
  }

  closeSendParentMessageModal(): void {
    this.isSendParentMessageModalOpen.set(false);
  }

  sendParentMessage(form: SendParentMessageFormData): void {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newMessage: CommunicationMessage = {
      id: `msg-${Date.now().toString().slice(-4)}`,
      audience: form.recipientAudience,
      messageTitle: form.subject,
      category: form.category,
      sentBy: 'School Admin',
      sentByInitials: 'SA',
      deliveryStatus: 'Delivered',
      scheduledDate: dateStr,
      scheduledTime: timeStr,
      lastUpdatedDate: dateStr,
      lastUpdatedTime: timeStr,
      tab: 'parent-messages',
      channels: ['In-App', 'Email'],
      body: form.body,
      recipientsCount: form.recipientAudience === 'All Parents' ? 1450 : 38,
      deliveredCount: form.recipientAudience === 'All Parents' ? 1450 : 38,
      failedCount: 0,
    };

    this.communicationMessages.update((list) => [newMessage, ...list]);
    this.communicationSummaryMetrics.update((m) => ({
      ...m,
      totalMessagesSent: m.totalMessagesSent + 1,
      parentCommunications: m.parentCommunications + 1,
    }));
    this.communicationSidebarSummary.update((s) => ({
      ...s,
      messagesThisWeek: s.messagesThisWeek + 1,
      parentRecipients:
        s.parentRecipients +
        (form.recipientAudience === 'All Parents' ? 1450 : 38),
    }));
    this.isSendParentMessageModalOpen.set(false);
    this.setupSaveStatus.set(
      `Message "${form.subject}" sent to parents successfully.`,
    );
  }

  openScheduleBlastModal(): void {
    this.isScheduleBlastModalOpen.set(true);
  }

  closeScheduleBlastModal(): void {
    this.isScheduleBlastModalOpen.set(false);
  }

  openMessageDetails(msg: CommunicationMessage): void {
    this.selectedCommunicationMessage.set(msg);
  }

  closeMessageDetails(): void {
    this.selectedCommunicationMessage.set(null);
  }

  resendFailedMessage(id: string): void {
    this.communicationMessages.update((list) =>
      list.map((m) =>
        m.id === id
          ? {
              ...m,
              deliveryStatus: 'Delivered' as const,
              failedCount: 0,
              deliveredCount: m.recipientsCount ?? m.deliveredCount,
            }
          : m,
      ),
    );
    this.communicationAttentionItems.update((items) =>
      items.map((item) =>
        item.filterType === 'failed'
          ? { ...item, count: Math.max(0, item.count - 1) }
          : item,
      ),
    );
    this.setupSaveStatus.set(
      `Failed message resent and delivered successfully.`,
    );
  }

  openExportCommunicationModal(): void {
    this.isExportCommunicationModalOpen.set(true);
  }

  closeExportCommunicationModal(): void {
    this.isExportCommunicationModalOpen.set(false);
  }

  exportCommunicationReport(format = 'PDF'): void {
    this.isExportCommunicationModalOpen.set(false);
    this.setupSaveStatus.set(
      `Communication report exported successfully (${format}).`,
    );
  }

  /**
   * Settings & Permissions Actions
   */
  setActiveSettingsTab(tab: SettingsTab): void {
    this.activeSettingsTab.set(tab);
    this.rolePage.set(1);
    this.selectedSettingsAttentionItem.set(null);
  }

  updateGeneralSettings(partial: Partial<GeneralSettingsForm>): void {
    this.generalSettings.update((curr) => ({ ...curr, ...partial }));
  }

  saveGeneralSettings(): void {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const updated: GeneralSettingsForm = {
      ...this.generalSettings(),
      lastUpdatedDate: dateStr,
      lastUpdatedTime: timeStr,
      lastUpdatedBy: 'School Admin',
    };

    this.generalSettings.set(updated);
    this.initialGeneralSettings.set(updated);
    this.setupSaveStatus.set(`Settings saved successfully at ${timeStr}.`);
  }

  discardGeneralSettings(): void {
    this.generalSettings.set(this.initialGeneralSettings());
    this.isConfirmDiscardModalOpen.set(false);
  }

  openDiscardConfirmModal(): void {
    if (this.isGeneralSettingsDirty()) {
      this.isConfirmDiscardModalOpen.set(true);
    } else {
      this.discardGeneralSettings();
    }
  }

  closeDiscardConfirmModal(): void {
    this.isConfirmDiscardModalOpen.set(false);
  }

  setRoleSearchQuery(query: string): void {
    this.roleSearchQuery.set(query);
    this.rolePage.set(1);
  }

  setRoleAccessScopeFilter(scope: string): void {
    this.roleAccessScopeFilter.set(scope);
    this.rolePage.set(1);
  }

  setRolePermissionLevelFilter(level: string): void {
    this.rolePermissionLevelFilter.set(level);
    this.rolePage.set(1);
  }

  setRoleStatusFilter(status: string): void {
    this.roleStatusFilter.set(status);
    this.rolePage.set(1);
  }

  setRolePage(page: number): void {
    if (page >= 1 && page <= this.rolesTotalPages()) {
      this.rolePage.set(page);
    }
  }

  setRolePageSize(size: number): void {
    this.rolePageSize.set(size);
    this.rolePage.set(1);
  }

  selectSettingsAttentionItem(item: SettingsAttentionItem): void {
    const current = this.selectedSettingsAttentionItem();
    if (current?.id === item.id) {
      this.selectedSettingsAttentionItem.set(null);
    } else {
      this.selectedSettingsAttentionItem.set(item);
    }
    this.rolePage.set(1);
  }

  clearSettingsAttentionItem(): void {
    this.selectedSettingsAttentionItem.set(null);
    this.rolePage.set(1);
  }

  openCreateRoleModal(): void {
    this.isCreateRoleModalOpen.set(true);
  }

  closeCreateRoleModal(): void {
    this.isCreateRoleModalOpen.set(false);
  }

  createRole(form: CreateRoleFormData): void {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const initials = form.name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const newRole: SchoolRole = {
      id: `role-${Date.now().toString().slice(-4)}`,
      name: form.name,
      description: form.description,
      initials,
      usersAssigned: form.usersAssigned ?? 0,
      accessScope: form.accessScope,
      permissionLevel: form.permissionLevel,
      lastUpdatedDate: dateStr,
      lastUpdatedTime: timeStr,
      status: form.status ?? 'Active',
      modules: {
        dashboard: true,
        setup: false,
        classes: true,
        teachers: false,
        curriculum: false,
        lessons: true,
        liveClasses: false,
        assessments: true,
        reports: false,
        interventions: false,
        resources: true,
        communication: false,
        settings: false,
      },
    };

    this.schoolRoles.update((list) => [newRole, ...list]);
    this.settingsSummaryMetrics.update((m) => ({
      ...m,
      totalRoles: m.totalRoles + 1,
      activePermissionSets: m.activePermissionSets + 1,
    }));
    this.permissionSidebarSummary.update((s) => ({
      ...s,
      customRoles: s.customRoles + 1,
      activeRoles: s.activeRoles + 1,
    }));
    this.isCreateRoleModalOpen.set(false);
    this.setupSaveStatus.set(`Role "${form.name}" created successfully.`);
  }

  openRoleDetails(role: SchoolRole): void {
    this.selectedRole.set(role);
  }

  closeRoleDetails(): void {
    this.selectedRole.set(null);
  }

  openExportPermissionModal(): void {
    this.isExportPermissionModalOpen.set(true);
  }

  closeExportPermissionModal(): void {
    this.isExportPermissionModalOpen.set(false);
  }

  exportPermissionReport(format = 'PDF'): void {
    this.isExportPermissionModalOpen.set(false);
    this.setupSaveStatus.set(
      `Roles & permissions report exported successfully (${format}).`,
    );
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
