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
  CommunicationSafeguardingSettings,
  CurriculumCoverage,
  CurriculumMapEntry,
  CurriculumOverviewMetrics,
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
  LiveClassAttentionItem,
  LiveClassRecord,
  LiveClassSidebarSummary,
  LiveClassTab,
  LiveClassesSummaryMetrics,
  NewInterventionPlanFormData,
  NewLearnerFormData,
  NewStaffFormData,
  OversightSidebarSummary,
  PriorityAttentionArea,
  ReportsHighlightInsights,
  ReportsSidebarSummary,
  ReportsSummaryMetrics,
  ReportTab,
  RolePermissionRow,
  SafeguardingNotice,
  ScheduleParentMeetingFormData,
  SchemeOfWorkEntry,
  SchoolAdminMetric,
  SchoolAlert,
  SchoolClass,
  SchoolProfile,
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
