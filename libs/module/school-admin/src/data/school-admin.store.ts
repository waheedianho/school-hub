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
  ClassesOverviewMetrics,
  CommunicationSafeguardingSettings,
  CurriculumCoverage,
  CurriculumMapEntry,
  CurriculumOverviewMetrics,
  InterventionCase,
  LearnerRecord,
  LessonMonitoringRecord,
  LessonOversightMetrics,
  LessonReadinessAlert,
  LessonReviewRecord,
  NewLearnerFormData,
  NewStaffFormData,
  OversightSidebarSummary,
  RolePermissionRow,
  SafeguardingNotice,
  SchemeOfWorkEntry,
  SchoolAdminMetric,
  SchoolAlert,
  SchoolClass,
  SchoolProfile,
  SetupChecklistItem,
  SetupQuickAction,
  StaffMember,
  StaffOperationalAlert,
  SubjectRecord,
  TeacherActivityMetric,
  TeachersStaffOverviewMetrics,
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
import { SCHOOL_INTERVENTIONS_DATA } from './school-admin-interventions.data';
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
