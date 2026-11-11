import { TestBed } from '@angular/core/testing';
import { SchoolAdminStore } from './school-admin.store';

describe('SchoolAdminStore', () => {
  let store: SchoolAdminStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolAdminStore],
    });
    store = TestBed.inject(SchoolAdminStore);
  });

  it('should be created and have initial state matching designs', () => {
    expect(store).toBeTruthy();
    expect(store.currentSession()).toBe('2024/2025 Academic Session');
    expect(store.currentTerm()).toBe('Third Term');
    expect(store.metrics().length).toBe(6);
    expect(store.classes().length).toBe(12);
    expect(store.staff().length).toBe(10);
    expect(store.alerts().length).toBe(4);
    expect(store.academicStructure().classArms).toBe(2);
    expect(store.assessmentSettings().gradingScale).toContain('A - F');
    expect(store.rolePermissions().length).toBe(4);
    expect(store.communicationSafeguarding().safeguardingContact).toContain(
      'safeguarding@greenfield.edu.ng',
    );
    expect(store.setupChecklist().length).toBe(7);
    expect(store.setupQuickActions().length).toBe(3);
  });

  it('should correctly compute active session and term objects', () => {
    const session = store.activeSessionObj();
    expect(session.name).toBe('2024/2025 Academic Session');
    expect(session.isActive).toBe(true);

    const term = store.activeTermObj();
    expect(term.name).toBe('Third Term');
    expect(term.isCurrent).toBe(true);
  });

  it('should switch session and auto-select its active term', () => {
    store.switchSession('2023/2024 Academic Session');
    expect(store.currentSession()).toBe('2023/2024 Academic Session');
    expect(store.activeSessionObj().id).toBe('session-2023-2024');
  });

  it('should switch term independently', () => {
    store.switchTerm('First Term');
    expect(store.currentTerm()).toBe('First Term');
    expect(store.activeTermObj().name).toBe('First Term');
  });

  it('should dismiss an alert and reduce alert count', () => {
    const initialCount = store.alerts().length;
    const alertToDismiss = store.alerts()[0].id;

    store.dismissAlert(alertToDismiss);
    expect(store.alerts().length).toBe(initialCount - 1);
    expect(store.alerts().some((a) => a.id === alertToDismiss)).toBe(false);
  });

  it('should update timestamp when refreshMetrics is called', () => {
    store.refreshMetrics();
    expect(store.lastUpdated()).toContain('Today,');
  });

  it('should retrieve classes and staff by ID', () => {
    const cls = store.getClassById('class-jss-1a');
    expect(cls).toBeDefined();
    expect(cls?.name).toBe('JSS 1A');
    expect(cls?.classTeacher).toBe('Mrs. Fatima Yusuf');

    const staff = store.getStaffById('TCH-1001');
    expect(staff).toBeDefined();
    expect(staff?.name).toBe('Mrs. Fatima Yusuf');

    const nonExistent = store.getClassById('unknown-id');
    expect(nonExistent).toBeUndefined();
  });

  it('should retrieve learners by class ID', () => {
    const learners = store.getLearnersByClass('class-jss-1a');
    expect(learners.length).toBeGreaterThan(0);
    expect(learners.every((l) => l.classId === 'class-jss-1a')).toBe(true);
  });

  it('should compute summary counts correctly', () => {
    expect(store.totalClassesCount()).toBe(12);
    expect(store.totalStaffCount()).toBe(10);
    expect(store.criticalAlertsCount()).toBe(2);
    expect(store.totalLearnersCount()).toBeGreaterThan(200);
  });

  it('should update school profile fields', () => {
    store.updateSchoolProfile({
      name: 'Greenfield International College',
      phone: '+234 800 000 0000',
    });
    expect(store.profile().name).toBe('Greenfield International College');
    expect(store.profile().phone).toBe('+234 800 000 0000');
  });

  it('should update academic structure', () => {
    store.updateAcademicStructure({
      classArms: 3,
      namingConvention: 'Year 7 - Year 12',
    });
    expect(store.academicStructure().classArms).toBe(3);
    expect(store.academicStructure().namingConvention).toBe('Year 7 - Year 12');
  });

  it('should update assessment reporting settings', () => {
    store.updateAssessmentSettings({
      classworkWeight: 25,
      assessmentsWeight: 35,
      examsWeight: 40,
    });
    expect(store.assessmentSettings().classworkWeight).toBe(25);
    expect(store.assessmentSettings().assessmentsWeight).toBe(35);
    expect(store.assessmentSettings().examsWeight).toBe(40);
  });

  it('should toggle role permissions', () => {
    const teacherPerm = store
      .rolePermissions()
      .find((r) => r.role === 'Teacher');
    expect(teacherPerm?.auditLogs).toBe(false);

    store.toggleRolePermission('Teacher', 'auditLogs');
    const updated = store.rolePermissions().find((r) => r.role === 'Teacher');
    expect(updated?.auditLogs).toBe(true);
  });

  it('should update communication and safeguarding settings', () => {
    store.updateCommunicationSafeguarding({
      parentCommunicationPreference: 'SMS Only',
      safeguardingContact: 'lead@greenfield.edu.ng',
    });
    expect(
      store.communicationSafeguarding().parentCommunicationPreference,
    ).toBe('SMS Only');
    expect(store.communicationSafeguarding().safeguardingContact).toBe(
      'lead@greenfield.edu.ng',
    );
  });

  it('should toggle setup checklist item status', () => {
    const item = store.setupChecklist().find((i) => i.id === 'chk-7');
    expect(item?.status).toBe('In Progress');

    store.toggleChecklistItem('chk-7');
    const updated = store.setupChecklist().find((i) => i.id === 'chk-7');
    expect(updated?.status).toBe('Completed');
  });

  it('should record save setup changes and publish settings', () => {
    expect(store.setupSaveStatus()).toBeNull();
    store.saveSetupChanges();
    expect(store.setupSaveStatus()).toContain('All changes saved at');

    store.publishSettings();
    expect(store.lastPublished()).not.toBe('Never');
    expect(store.setupSaveStatus()).toContain(
      'Settings published successfully',
    );
  });

  it('should manage classes and learners state correctly', () => {
    expect(store.classesMetrics().totalClasses).toBe(24);
    expect(store.classesMetrics().totalLearners).toBe(612);
    expect(store.selectedClassId()).toBe('class-jss-1a');
    expect(store.selectedClass().name).toBe('JSS 1A');

    // Select class
    store.selectClass('class-jss-1b');
    expect(store.selectedClassId()).toBe('class-jss-1b');
    expect(store.selectedClass().name).toBe('JSS 1B');

    // Filter learners
    store.selectClass('class-jss-1a');
    store.setLearnerSearchQuery('Maryam');
    expect(store.filteredLearners().length).toBe(1);
    expect(store.filteredLearners()[0].name).toBe('Maryam Ibrahim');

    store.setLearnerSearchQuery('');
    expect(store.filteredLearners().length).toBeGreaterThan(1);
  });

  it('should create new learner and update state', () => {
    const initialLearnersCount = store.learners().length;
    const initialJss1aCount = store.selectedClass().learnersCount;

    const created = store.createLearner({
      firstName: 'Test',
      lastName: 'Student',
      gender: 'Male',
      dateOfBirth: '2012-05-10',
      admissionNumber: 'TEST/2024/999',
      classLevel: 'JSS 1',
      arm: 'A',
      admissionDate: '2024-09-10',
      enrollmentStatus: 'Active',
      username: 'test.student',
      loginMethod: 'Password Only',
      accountActive: true,
      parentName: 'Parent Student',
      parentRelationship: 'Father',
      parentPhone: '+234 800 000 1111',
      homeAddress: 'Test Address',
      emergencyContact: 'Emergency Contact',
      guardianAccountActive: true,
      transportMode: 'Day Student',
      parentConsentConfirmed: true,
      mediaConsent: true,
      dataPrivacyAcknowledged: true,
      communicationPreference: 'Email & SMS',
    });

    expect(created.name).toBe('Test Student');
    expect(store.learners().length).toBe(initialLearnersCount + 1);
    const updatedClass = store.getClassById('class-jss-1a');
    expect(updatedClass?.learnersCount).toBe(initialJss1aCount + 1);
  });

  it('should manage teachers and staff state correctly', () => {
    expect(store.staffOverviewMetrics().totalTeachers).toBe(48);
    expect(store.staffAlerts().length).toBe(3);
    expect(store.selectedStaff().name).toBe('Mrs. Fatima Yusuf');

    // Select staff
    store.selectStaff('staff-002');
    expect(store.selectedStaff().name).toBe('Mr. Tunde Adewale');

    // Search staff
    store.setStaffSearchQuery('Nkechi');
    expect(store.filteredStaff().length).toBe(1);
    expect(store.filteredStaff()[0].name).toBe('Mrs. Nkechi Okoro');

    store.setStaffSearchQuery('');
    expect(store.filteredStaff().length).toBe(10);

    // Filter by department
    store.setStaffDepartmentFilter('Mathematics');
    expect(store.filteredStaff().length).toBe(1);
    expect(store.filteredStaff()[0].name).toBe('Mr. Tunde Adewale');

    store.setStaffDepartmentFilter('All Departments');

    // Filter by status
    store.setStaffStatusFilter('On Leave');
    expect(store.filteredStaff().length).toBe(1);
    expect(store.filteredStaff()[0].name).toBe('Mr. Emmanuel John');

    store.setStaffStatusFilter('All Statuses');

    // Switch tab
    store.setActiveStaffTab('support');
    expect(store.activeStaffTab()).toBe('support');
    store.setActiveStaffTab('teachers');

    // Pagination
    store.setStaffPageSize(4);
    expect(store.staffTotalPages()).toBe(3);
    expect(store.paginatedStaff().length).toBe(4);
    store.setStaffPage(2);
    expect(store.staffPage()).toBe(2);
  });

  it('should create new staff member and update metrics', () => {
    const initialStaffCount = store.staff().length;
    const initialTotalTeachers = store.staffOverviewMetrics().totalTeachers;

    const created = store.createStaffMember({
      firstName: 'Dr. Chidi',
      lastName: 'Okafor',
      gender: 'Male',
      dateOfBirth: '1985-04-12',
      staffId: 'TCH-9999',
      phoneCode: '+234',
      phoneNumber: '809 111 2222',
      email: 'chidi.okafor@schoolhub.org',
      staffType: 'Academic',
      department: 'Science Department',
      qualification: 'Ph.D. Physics',
      employmentType: 'Full-time',
      dateJoined: '2024-09-01',
      yearsOfExperience: '12 years',
      role: 'Senior Teacher',
      isClassTeacher: false,
      assignedClasses: ['SS 3A'],
      assignedSubjects: ['Physics'],
      academicLevel: 'Senior Secondary',
      reportingLine: 'Principal',
      username: 'chidi.okafor',
      temporaryPassword: 'TempPassword123!',
      loginMethod: 'Email & Password',
      accountActive: true,
      contentApproval: true,
      gradeApproval: true,
      communicationVisibility: true,
      auditLogVisibility: true,
      parentCommunication: true,
      learnerMessageAccess: false,
      identityVerified: true,
      childSafeguardingTraining: true,
      conductPolicyAcknowledged: true,
      emergencyContact: 'Mrs. Okafor (+234 809 333 4444)',
      address: '15 Academic Close, Victoria Island, Lagos',
    });

    expect(created.name).toBe('Dr. Chidi Okafor');
    expect(store.staff().length).toBe(initialStaffCount + 1);
    expect(store.staffOverviewMetrics().totalTeachers).toBe(
      initialTotalTeachers + 1,
    );

    // Update staff status
    store.updateStaffStatus(created.id, 'On Leave');
    const updated = store.getStaffById(created.id);
    expect(updated?.status).toBe('On Leave');
  });

  it('should manage subjects and curriculum state correctly', () => {
    expect(store.curriculumMetrics().totalSubjects).toBe(7);
    expect(store.subjects().length).toBe(7);
    expect(store.selectedSubject().name).toBe('Mathematics');

    // Select subject
    store.selectSubject('subj-eng');
    expect(store.selectedSubject().name).toBe('English Language');

    // Filter subjects
    store.setSubjectSearchQuery('Science');
    expect(store.filteredSubjects().length).toBe(1);
    expect(store.filteredSubjects()[0].name).toBe('Basic Science');

    store.setSubjectSearchQuery('');
    expect(store.filteredSubjects().length).toBe(7);

    // Filter by status
    store.setSubjectStatusFilter('Needs Review');
    expect(store.filteredSubjects().length).toBe(2);
    store.setSubjectStatusFilter('All Status');

    // Tab navigation
    store.setActiveCurriculumTab('curriculum-map');
    expect(store.activeCurriculumTab()).toBe('curriculum-map');
    expect(store.filteredCurriculumMaps().length).toBe(8);

    // Curriculum map filters
    store.setCurriculumClassFilter('JSS 1');
    expect(store.filteredCurriculumMaps().length).toBe(4);
    store.setCurriculumClassFilter('All Classes');

    // Scheme of Work
    store.setActiveCurriculumTab('scheme-of-work');
    expect(store.activeCurriculumTab()).toBe('scheme-of-work');
    expect(store.filteredSchemesOfWork().length).toBe(8);

    // Drill down to week detail
    store.viewSchemeWeekDetail(4);
    expect(store.activeCurriculumTab()).toBe('scheme-detail');
    expect(store.weekSchemeDetail().weekNumber).toBe(4);

    // Drill down to topic delivery pack
    store.viewTopicDeliveryPack('pack-whole-numbers');
    expect(store.activeCurriculumTab()).toBe('topic-delivery-packs');
    expect(store.topicDeliveryPack().topic).toBe('Whole Numbers');
  });

  it('should manage lessons and delivery oversight state correctly', () => {
    // Initial active lessons metrics
    expect(store.lessonOversightMetrics().activeLessonsThisWeek).toBe(42);
    expect(store.lessonOversightMetrics().lessonsCompleted).toBe(31);
    expect(store.lessonOversightMetrics().classesOnTrack).toBe(18);

    // Switch to delivery oversight tab updates metrics
    store.setActiveLessonsTab('delivery-oversight');
    expect(store.activeLessonsTab()).toBe('delivery-oversight');
    expect(store.lessonOversightMetrics().activeLessonsThisWeek).toBe(48);
    expect(store.lessonOversightMetrics().deliveryPacksReady).toBe(92);

    // Switch back
    store.setActiveLessonsTab('active-lessons');
    expect(store.lessonOversightMetrics().activeLessonsThisWeek).toBe(42);

    // Filter lessons by query
    store.setLessonSearchQuery('Fractions');
    expect(store.filteredLessonRecords().length).toBe(1);
    expect(store.filteredLessonRecords()[0].className).toBe('JSS 3A');
    store.setLessonSearchQuery('');

    // Filter by class
    store.setLessonClassFilter('JSS 1');
    expect(store.filteredLessonRecords().length).toBe(2);
    store.setLessonClassFilter('All Classes');

    // Filter by subject
    store.setLessonSubjectFilter('Mathematics');
    expect(store.filteredLessonRecords().length).toBe(2);
    store.setLessonSubjectFilter('All Subjects');

    // Filter by status
    store.setLessonStatusFilter('Delayed');
    expect(store.filteredLessonRecords().length).toBe(1);
    expect(store.filteredLessonRecords()[0].currentTopic).toBe(
      'Our Government',
    );
    store.setLessonStatusFilter('All Status');

    // Select lesson record
    const targetRec = store.lessonMonitoringRecords()[2];
    store.selectLessonRecord(targetRec);
    expect(store.selectedLessonRecord().id).toBe(targetRec.id);

    // Review lesson plan
    expect(store.lessonReviews().length).toBeGreaterThan(0);
    store.approveLessonPlan('rev-1');
    const updatedReview = store.lessonReviews().find((r) => r.id === 'rev-1');
    expect(updatedReview?.reviewStatus).toBe('Approved');
    expect(store.setupSaveStatus()).toContain('Lesson plan approved');

    store.requestLessonRevision('rev-3');
    const revisedReview = store.lessonReviews().find((r) => r.id === 'rev-3');
    expect(revisedReview?.reviewStatus).toBe('Revision Requested');
    expect(store.setupSaveStatus()).toContain('Revision requested');

    // Readiness alerts
    const initialAlertsCount = store.lessonReadinessAlerts().length;
    store.resolveReadinessAlert('alt-1');
    expect(store.lessonReadinessAlerts().length).toBe(initialAlertsCount - 1);
    expect(store.setupSaveStatus()).toContain(
      'Readiness alert marked as resolved',
    );
  });

  it('should manage live classes state and mutations correctly', () => {
    // Initial metric checks matching design
    expect(store.liveClassesSummaryMetrics().scheduledToday).toBe(28);
    expect(store.liveClassesSummaryMetrics().ongoingClasses).toBe(6);
    expect(store.liveClassesSummaryMetrics().completedThisWeek).toBe(94);
    expect(store.liveClassesSummaryMetrics().averageAttendanceRate).toBe(87);
    expect(store.liveClassesSummaryMetrics().missedClassesCount).toBe(5);

    // Initial sidebar summary checks
    expect(store.liveClassSidebarSummary().scheduledToday).toBe(28);
    expect(store.liveClassAttentionItems().length).toBe(4);

    // Initial tab is 'upcoming'
    expect(store.activeLiveClassTab()).toBe('upcoming');
    expect(store.paginatedLiveClasses().length).toBe(8);
    expect(store.paginatedLiveClasses()[0].className).toBe('JSS 1A');
    expect(store.paginatedLiveClasses()[0].subject).toBe('Mathematics');
    expect(store.paginatedLiveClasses()[0].topic).toBe('Whole Numbers');

    // Switch tab to 'ongoing'
    store.setActiveLiveClassTab('ongoing');
    expect(store.activeLiveClassTab()).toBe('ongoing');
    expect(store.filteredLiveClasses().length).toBe(6);
    expect(store.filteredLiveClasses()[0].liveStatus).toBe('Live Now');

    // Switch tab to 'completed'
    store.setActiveLiveClassTab('completed');
    expect(
      store.filteredLiveClasses().every((c) => c.liveStatus === 'Completed'),
    ).toBe(true);

    // Switch tab to 'recordings'
    store.setActiveLiveClassTab('recordings');
    expect(
      store
        .filteredLiveClasses()
        .every((c) => c.recording.status === 'Available'),
    ).toBe(true);

    // Switch back to upcoming
    store.setActiveLiveClassTab('upcoming');

    // Search query
    store.setLiveClassSearchQuery('Living Things');
    expect(store.filteredLiveClasses().length).toBe(1);
    expect(store.filteredLiveClasses()[0].className).toBe('JSS 2A');
    store.setLiveClassSearchQuery('');

    // Filter by class level
    store.setLiveClassLevelFilter('JSS 1');
    expect(store.filteredLiveClasses().length).toBe(3);
    store.setLiveClassLevelFilter('All Classes');

    // Filter by subject
    store.setLiveClassSubjectFilter('Mathematics');
    expect(store.filteredLiveClasses().length).toBe(2);
    store.setLiveClassSubjectFilter('All Subjects');

    // Filter by teacher
    store.setLiveClassTeacherFilter('Mr. Tunde Adewale');
    expect(store.filteredLiveClasses().length).toBe(1);
    store.setLiveClassTeacherFilter('All Teachers');

    // Filter by attention key
    store.toggleAttentionFilter('low-attendance');
    expect(store.activeAttentionFilterKey()).toBe('low-attendance');
    // Toggle off
    store.toggleAttentionFilter('low-attendance');
    expect(store.activeAttentionFilterKey()).toBeNull();

    // Select live class
    const sampleClass = store.liveClassRecords()[0];
    store.selectLiveClass(sampleClass);
    expect(store.selectedLiveClass()?.id).toBe(sampleClass.id);

    // Schedule modal and new class creation
    expect(store.isScheduleModalOpen()).toBe(false);
    store.openScheduleModal();
    expect(store.isScheduleModalOpen()).toBe(true);

    const initialScheduled = store.liveClassesSummaryMetrics().scheduledToday;
    store.scheduleNewLiveClass({
      className: 'SSS 3A',
      subject: 'Physics',
      topic: 'Quantum Mechanics',
      teacherName: 'Dr. Kelechi Nwosu',
      startTime: '11:00 AM',
      duration: '45 min',
    });
    expect(store.isScheduleModalOpen()).toBe(false);
    expect(store.liveClassesSummaryMetrics().scheduledToday).toBe(
      initialScheduled + 1,
    );
    expect(store.setupSaveStatus()).toContain(
      'Live class scheduled successfully',
    );

    // Live observer modal
    expect(store.isObserverModalOpen()).toBe(false);
    store.openLiveClassObserver(sampleClass);
    expect(store.isObserverModalOpen()).toBe(true);
    expect(store.observingLiveClass()?.id).toBe(sampleClass.id);
    store.closeLiveClassObserver();
    expect(store.isObserverModalOpen()).toBe(false);
    expect(store.observingLiveClass()).toBeNull();

    // Export report
    store.exportLiveClassesReport();
    expect(store.setupSaveStatus()).toContain('report generated');
  });

  it('should manage assessments and gradebooks state and mutations correctly', () => {
    // Initial metrics matching design Screen 1
    expect(store.assessmentsSummaryMetrics().totalAssessments).toBe(128);
    expect(store.assessmentsSummaryMetrics().assessmentsCompleted).toBe(72);
    expect(store.assessmentsSummaryMetrics().pendingGrading).toBe(28);
    expect(store.assessmentsSummaryMetrics().gradebooksFinalized).toBe(46);
    expect(store.assessmentsSummaryMetrics().averageScoreAcrossAll).toBe(72.4);

    // Initial sidebar summary
    expect(store.assessmentSidebarSummary().totalScheduled).toBe(128);
    expect(store.assessmentSidebarSummary().autoGraded).toBe(46);
    expect(store.assessmentSidebarSummary().manuallyGraded).toBe(54);
    expect(store.assessmentSidebarSummary().awaitingModeration).toBe(18);
    expect(store.assessmentSidebarSummary().averageCompletionRate).toBe(84.7);
    expect(store.assessmentAttentionItems().length).toBe(4);

    // Initial tab is 'schedule'
    expect(store.activeAssessmentTab()).toBe('schedule');
    expect(store.paginatedAssessments().length).toBe(8);
    expect(store.paginatedAssessments()[0].className).toBe('JSS 1A');
    expect(store.paginatedAssessments()[0].assessmentName).toBe(
      'Algebra Basics Quiz',
    );

    // Switch tab to 'submissions'
    store.setActiveAssessmentTab('submissions');
    expect(store.activeAssessmentTab()).toBe('submissions');
    expect(
      store.filteredAssessments().every((a) => a.submissionsCount > 0),
    ).toBe(true);

    // Switch tab to 'gradebooks'
    store.setActiveAssessmentTab('gradebooks');
    expect(
      store
        .filteredAssessments()
        .every((a) => a.gradebookStatus !== 'Not Started'),
    ).toBe(true);

    // Switch tab to 'moderation'
    store.setActiveAssessmentTab('moderation');
    expect(
      store
        .filteredAssessments()
        .every(
          (a) =>
            a.gradingStatus === 'Needs Review' ||
            a.gradingStatus === 'Missing Scores',
        ),
    ).toBe(true);

    // Switch back to 'schedule'
    store.setActiveAssessmentTab('schedule');

    // Search query
    store.setAssessmentSearchQuery('Narrative');
    expect(store.filteredAssessments().length).toBe(1);
    expect(store.filteredAssessments()[0].assessmentName).toBe(
      'Narrative Writing Test',
    );
    store.setAssessmentSearchQuery('');

    // Dropdown filters
    store.setAssessmentClassFilter('JSS 1');
    expect(store.filteredAssessments().length).toBe(3);
    store.setAssessmentClassFilter('All Classes');

    store.setAssessmentSubjectFilter('English Language');
    expect(store.filteredAssessments().length).toBe(2);
    store.setAssessmentSubjectFilter('All Subjects');

    store.setAssessmentTeacherFilter('Mrs. Funmi Yusuf');
    expect(store.filteredAssessments().length).toBe(1);
    store.setAssessmentTeacherFilter('All Teachers');

    store.setAssessmentTypeFilter('Test');
    expect(
      store.filteredAssessments().every((a) => a.assessmentType === 'Test'),
    ).toBe(true);
    expect(store.filteredAssessments().length).toBe(8);
    store.setAssessmentTypeFilter('All Types');

    // Attention filter toggle
    store.toggleAssessmentAttentionFilter('awaiting-finalization');
    expect(store.assessmentAttentionFilterKey()).toBe('awaiting-finalization');
    expect(
      store
        .filteredAssessments()
        .every((a) => a.gradebookStatus === 'In Progress'),
    ).toBe(true);
    store.clearAssessmentAttentionFilter();
    expect(store.assessmentAttentionFilterKey()).toBeNull();

    // Review flow (Screen 2)
    const targetAssessment = store.assessmentRecords()[0];
    expect(store.selectedAssessmentForReview()).toBeNull();
    store.openAssessmentReview(targetAssessment);
    expect(store.selectedAssessmentForReview()?.id).toBe(targetAssessment.id);
    expect(store.activeReviewSubTab()).toBe('submission-review');

    // Sub-tab switching
    store.setActiveReviewSubTab('overview');
    expect(store.activeReviewSubTab()).toBe('overview');
    store.setActiveReviewSubTab('gradebook-entries');
    expect(store.activeReviewSubTab()).toBe('gradebook-entries');
    store.setActiveReviewSubTab('moderation-notes');
    expect(store.activeReviewSubTab()).toBe('moderation-notes');

    // Review summary stats computed
    const stats = store.reviewSummaryStats();
    expect(stats.submittedCount).toBe(7);
    expect(stats.reviewedCount).toBeGreaterThan(0);

    // Moderation modal and score saving
    const sampleSubmission = store.learnerSubmissions()[0];
    expect(store.isModerationModalOpen()).toBe(false);
    store.openModerationModal(sampleSubmission);
    expect(store.isModerationModalOpen()).toBe(true);
    expect(store.selectedSubmissionForModeration()?.id).toBe(
      sampleSubmission.id,
    );

    store.saveModeratedScore(
      sampleSubmission.id,
      26,
      'Excellent vocabulary adjustment',
    );
    expect(store.isModerationModalOpen()).toBe(false);
    expect(store.selectedSubmissionForModeration()).toBeNull();
    const updatedSub = store
      .learnerSubmissions()
      .find((s) => s.id === sampleSubmission.id);
    expect(updatedSub?.moderatedScore).toBe(26);
    expect(updatedSub?.reviewStatus).toBe('Reviewed');

    // Approve gradebook
    const initialFinalized =
      store.assessmentsSummaryMetrics().gradebooksFinalized;
    store.approveAssessmentGradebook(targetAssessment.id);
    expect(store.assessmentsSummaryMetrics().gradebooksFinalized).toBe(
      initialFinalized + 1,
    );
    expect(store.selectedAssessmentForReview()?.gradebookStatus).toBe(
      'Finalized',
    );

    // Return to teacher
    store.returnGradebookToTeacher(targetAssessment.id);
    expect(store.setupSaveStatus()).toContain('returned to subject teacher');

    // Close review drill-down
    store.closeAssessmentReview();
    expect(store.selectedAssessmentForReview()).toBeNull();

    // Create assessment modal
    expect(store.isCreateAssessmentModalOpen()).toBe(false);
    store.openCreateAssessmentModal();
    expect(store.isCreateAssessmentModalOpen()).toBe(true);

    const initialTotal = store.assessmentsSummaryMetrics().totalAssessments;
    store.createAssessment({
      className: 'SSS 2A',
      subject: 'Chemistry',
      assessmentName: 'Organic Chemistry Practical Test',
      week: 'Week 7',
      teacherName: 'Dr. Kelechi Nwosu',
      assessmentType: 'Test',
      totalLearners: 32,
      maxScore: 30,
    });
    expect(store.isCreateAssessmentModalOpen()).toBe(false);
    expect(store.assessmentsSummaryMetrics().totalAssessments).toBe(
      initialTotal + 1,
    );
    expect(store.setupSaveStatus()).toContain('Assessment created');

    // Export report
    store.exportAssessmentReport();
    expect(store.setupSaveStatus()).toContain(
      'assessment and continuous evaluation report',
    );
  });

  it('should manage reports and report cards state and mutations correctly', () => {
    // Initial state
    expect(store.activeReportTab()).toBe('overview');
    expect(store.reportsSummaryMetrics().schoolAverage).toBe(74.8);
    expect(store.reportsSummaryMetrics().totalLearnersReported).toBe(386);
    expect(store.reportsSummaryMetrics().classesAnalysed).toBe(12);
    expect(store.reportsSummaryMetrics().subjectsAnalysed).toBe(10);
    expect(store.reportsSummaryMetrics().attendanceAverage).toBe(91.6);
    expect(store.reportsSummaryMetrics().reportCompletionRate).toBe(89);

    expect(store.termPerformanceTrend().length).toBe(3);
    expect(store.classPerformanceOverview().length).toBe(7);
    expect(store.subjectPerformanceRows().length).toBe(7);
    expect(store.reportsHighlightInsights().topPerformingClass.className).toBe(
      'JSS 3B',
    );
    expect(store.reportsSidebarSummary().totalLearners).toBe(386);
    expect(store.priorityAttentionAreas().length).toBe(4);
    expect(store.classReportCards().length).toBe(12);
    expect(store.selectedStudentReportCard()?.learnerName).toBe(
      'Maryam Ibrahim',
    );

    // Filter computeds
    expect(store.filteredSubjectPerformance().length).toBe(7);
    store.setReportSubjectFilter('Mathematics');
    expect(store.filteredSubjectPerformance().length).toBe(1);
    store.setReportSubjectFilter('All Subjects');

    store.setReportSearchQuery('Basic');
    expect(store.filteredSubjectPerformance().length).toBe(1);
    expect(store.filteredSubjectPerformance()[0].subject).toBe('Basic Science');
    store.setReportSearchQuery('');

    // Class report cards filtering
    expect(store.filteredClassReportCards().length).toBe(12);
    store.setReportClassFilter('JSS 1');
    expect(store.filteredClassReportCards().length).toBe(2);
    store.setReportClassFilter('All Classes');

    // Attention area toggle
    const area = store.priorityAttentionAreas()[0];
    store.selectReportAttentionArea(area);
    expect(store.selectedReportAttentionArea()?.id).toBe(area.id);
    store.selectReportAttentionArea(area);
    expect(store.selectedReportAttentionArea()).toBeNull();
    store.selectReportAttentionArea(area);
    store.clearReportAttentionArea();
    expect(store.selectedReportAttentionArea()).toBeNull();

    // Tab switching
    store.setActiveReportTab('academic-performance');
    expect(store.activeReportTab()).toBe('academic-performance');
    store.setActiveReportTab('overview');

    // Modals
    expect(store.isStudentReportModalOpen()).toBe(false);
    store.openStudentReportCard();
    expect(store.isStudentReportModalOpen()).toBe(true);
    store.closeStudentReportCard();
    expect(store.isStudentReportModalOpen()).toBe(false);

    expect(store.isExportReportModalOpen()).toBe(false);
    store.openExportReportModal();
    expect(store.isExportReportModalOpen()).toBe(true);
    store.exportSchoolReport('Excel');
    expect(store.isExportReportModalOpen()).toBe(false);
    expect(store.setupSaveStatus()).toContain('exported successfully');

    expect(store.isShareLeadershipModalOpen()).toBe(false);
    store.openShareLeadershipModal();
    expect(store.isShareLeadershipModalOpen()).toBe(true);
    store.shareReportWithLeadership(['Board of Directors']);
    expect(store.isShareLeadershipModalOpen()).toBe(false);
    expect(store.setupSaveStatus()).toContain('Board of Directors');

    // Class approval & All approval
    const targetClass = store.classReportCards()[1]; // e.g. JSS 1B
    store.approveClassReportCards(targetClass.id);
    const updatedClass = store
      .classReportCards()
      .find((c) => c.id === targetClass.id);
    expect(updatedClass?.status).toBe('Approved');

    store.approveAllSchoolReports();
    expect(store.reportsSidebarSummary().approvalStatus).toBe('Approved');
    expect(store.overallReportsApprovalRate()).toBe(100);
    expect(store.setupSaveStatus()).toContain('approved and signed');
  });

  it('should manage interventions state, filtering, pagination, and mutations correctly', () => {
    // Initial state
    expect(store.activeInterventionsTab()).toBe('active');
    expect(store.interventionsSummaryMetrics().learnersFlagged).toBe(86);
    expect(store.interventionsSummaryMetrics().activeInterventions).toBe(54);
    expect(store.interventionsSummaryMetrics().overdueFollowUps).toBe(18);
    expect(store.interventionsSummaryMetrics().resolvedCases).toBe(42);
    expect(store.interventionsSummaryMetrics().interventionSuccessRate).toBe(
      81,
    );

    expect(store.interventionsSidebarSummary().highPriorityCases).toBe(22);
    expect(store.interventionsSidebarSummary().remediationPlans).toBe(36);
    expect(store.interventionsSidebarSummary().parentMeetingsScheduled).toBe(
      14,
    );
    expect(store.interventionsSidebarSummary().completedFollowUps).toBe(128);

    expect(store.interventionsAttentionItems().length).toBe(4);
    expect(store.interventionsInsights().commonConcern.title).toBe(
      'Mathematics Weakness',
    );
    expect(store.interventionsInsights().bestPerformingType.type).toBe(
      'Small Group Remediation',
    );

    // Filtered and paginated list
    expect(store.filteredInterventions().length).toBe(10); // 12 total minus 2 resolved
    expect(store.paginatedInterventions().length).toBe(8);
    expect(store.interventionTotalPages()).toBe(2);

    // Search query
    store.setInterventionSearchQuery('Adebayo');
    expect(store.filteredInterventions().length).toBe(1);
    expect(store.filteredInterventions()[0].learnerName).toContain('Adebayo');
    store.setInterventionSearchQuery('');

    // Class filter
    store.setInterventionClassFilter('JSS 1A');
    expect(store.filteredInterventions().length).toBe(2);
    store.setInterventionClassFilter('All Classes');

    // Priority filter
    store.setInterventionPriorityFilter('High');
    expect(
      store.filteredInterventions().every((i) => i.priority === 'High'),
    ).toBe(true);
    store.setInterventionPriorityFilter('All Priorities');

    // Tab filter
    store.setActiveInterventionsTab('resolved');
    expect(store.filteredInterventions().length).toBe(2);
    expect(
      store.filteredInterventions().every((i) => i.status === 'Resolved'),
    ).toBe(true);
    store.setActiveInterventionsTab('active');

    // Attention item selection
    const attItem = store.interventionsAttentionItems()[0];
    store.selectInterventionAttentionItem(attItem);
    expect(store.selectedInterventionAttentionItem()?.id).toBe(attItem.id);
    store.selectInterventionAttentionItem(attItem);
    expect(store.selectedInterventionAttentionItem()).toBeNull();
    store.selectInterventionAttentionItem(attItem);
    store.clearInterventionAttentionItem();
    expect(store.selectedInterventionAttentionItem()).toBeNull();

    // Create plan modal & mutation
    expect(store.isCreateInterventionModalOpen()).toBe(false);
    store.openCreateInterventionModal();
    expect(store.isCreateInterventionModalOpen()).toBe(true);

    const initialActive =
      store.interventionsSummaryMetrics().activeInterventions;
    store.createInterventionPlan({
      learnerName: 'Aliyu Garba',
      admissionNo: 'LRN-240300',
      className: 'JSS 1B',
      concernArea: 'English Vocabulary',
      interventionType: 'Guided Reading Practice',
      assignedStaff: 'Mrs. Balogun K.',
      assignedStaffRole: 'English Teacher',
      priority: 'Medium',
      nextReviewDate: '30 May 2025',
    });
    expect(store.isCreateInterventionModalOpen()).toBe(false);
    expect(store.interventionsSummaryMetrics().activeInterventions).toBe(
      initialActive + 1,
    );
    expect(store.setupSaveStatus()).toContain('Aliyu Garba');

    // Assign follow-up modal & mutation
    expect(store.isAssignFollowUpModalOpen()).toBe(false);
    store.openAssignFollowUpModal();
    expect(store.isAssignFollowUpModalOpen()).toBe(true);
    store.assignFollowUp({
      caseId: 'case-001',
      learnerName: 'Adebayo, Oluwatobi',
      assignedStaff: 'Mr. Akinola T.',
      dueDate: '01 June 2025',
      instructions: 'Check test scores after 2 weeks of remediation',
    });
    expect(store.isAssignFollowUpModalOpen()).toBe(false);
    const updatedCase001 = store
      .interventions()
      .find((c) => c.id === 'case-001');
    expect(updatedCase001?.assignedStaff).toBe('Mr. Akinola T.');

    // Schedule parent meeting modal & mutation
    expect(store.isScheduleParentMeetingModalOpen()).toBe(false);
    store.openScheduleParentMeetingModal();
    expect(store.isScheduleParentMeetingModalOpen()).toBe(true);
    const initialMeetings =
      store.interventionsSidebarSummary().parentMeetingsScheduled;
    store.scheduleParentMeeting({
      learnerName: 'Bello, Chiamaka',
      parentName: 'Mr. and Mrs. Bello',
      className: 'JSS 2B',
      meetingDate: '25 May 2025',
      meetingTime: '10:00 AM',
      meetingType: 'In-Person',
      agenda: 'Discuss attendance pattern and transport challenges',
    });
    expect(store.isScheduleParentMeetingModalOpen()).toBe(false);
    expect(store.interventionsSidebarSummary().parentMeetingsScheduled).toBe(
      initialMeetings + 1,
    );

    // Export modal & mutation
    expect(store.isExportInterventionModalOpen()).toBe(false);
    store.openExportInterventionModal();
    expect(store.isExportInterventionModalOpen()).toBe(true);
    store.exportInterventionReport('Excel');
    expect(store.isExportInterventionModalOpen()).toBe(false);
    expect(store.setupSaveStatus()).toContain('Excel format');

    // Details & resolution
    const sampleCase = store.interventions()[0];
    store.openInterventionDetails(sampleCase);
    expect(store.selectedInterventionCase()?.id).toBe(sampleCase.id);

    store.updateInterventionProgress(sampleCase.id, 85);
    const progressed = store
      .interventions()
      .find((c) => c.id === sampleCase.id);
    expect(progressed?.progress).toBe(85);

    const initialResolved = store.interventionsSummaryMetrics().resolvedCases;
    store.resolveInterventionCase(sampleCase.id);
    const resolved = store.interventions().find((c) => c.id === sampleCase.id);
    expect(resolved?.status).toBe('Resolved');
    expect(store.interventionsSummaryMetrics().resolvedCases).toBe(
      initialResolved + 1,
    );

    store.closeInterventionDetails();
    expect(store.selectedInterventionCase()).toBeNull();
  });

  it('should manage resources state, filters, and mutations correctly', () => {
    // Initial metrics matching design (.design/SCHOOL ADMIN/Resources_SA.png)
    expect(store.resourcesSummaryMetrics().totalResources).toBe(1248);
    expect(store.resourcesSummaryMetrics().approvedResources).toBe(842);
    expect(store.resourcesSummaryMetrics().pendingReview).toBe(186);
    expect(store.resourcesSummaryMetrics().lowDataResources).toBe(72);
    expect(store.resourcesSummaryMetrics().resourceGaps).toBe(68);

    // Initial sidebar summary
    expect(store.resourcesSidebarSummary().totalUploaded).toBe(1248);
    expect(store.resourcesSidebarSummary().approved).toBe(842);
    expect(store.resourcesSidebarSummary().pendingReview).toBe(186);
    expect(store.resourcesSidebarSummary().sharedWithTeachers).toBe(1036);
    expect(store.resourcesSidebarSummary().sharedWithLearners).toBe(892);
    expect(store.resourceAttentionItems().length).toBe(4);

    // Tab default is 'library'
    expect(store.activeResourcesTab()).toBe('library');
    expect(store.paginatedResources().length).toBe(10);
    expect(store.paginatedResources()[0].title).toBe(
      'Whole Numbers Lesson Note',
    );

    // Switch tab to 'queue'
    store.setActiveResourcesTab('queue');
    expect(store.activeResourcesTab()).toBe('queue');
    expect(
      store
        .filteredResources()
        .every((r) => r.approvalStatus === 'Pending Review'),
    ).toBe(true);

    // Switch tab to 'templates'
    store.setActiveResourcesTab('templates');
    expect(store.activeResourcesTab()).toBe('templates');
    expect(
      store.filteredResources().every((r) => r.resourceType === 'Template'),
    ).toBe(true);

    // Reset tab to 'library'
    store.setActiveResourcesTab('library');

    // Filter by class
    store.setResourceClassFilter('JSS 1A');
    expect(
      store.filteredResources().every((r) => r.className === 'JSS 1A'),
    ).toBe(true);
    store.setResourceClassFilter('All Classes');

    // Filter by subject
    store.setResourceSubjectFilter('Mathematics');
    expect(
      store.filteredResources().every((r) => r.subject === 'Mathematics'),
    ).toBe(true);
    store.setResourceSubjectFilter('All Subjects');

    // Search query
    store.setResourceSearchQuery('Infographic');
    expect(
      store
        .filteredResources()
        .every(
          (r) =>
            r.title.toLowerCase().includes('infographic') ||
            r.resourceType.toLowerCase().includes('infographic'),
        ),
    ).toBe(true);
    store.setResourceSearchQuery('');

    // Pagination
    store.setResourcePage(2);
    expect(store.resourcePage()).toBe(2);
    store.setResourcePage(1);

    // Upload resource modal & mutation
    expect(store.isUploadResourceModalOpen()).toBe(false);
    store.openUploadResourceModal();
    expect(store.isUploadResourceModalOpen()).toBe(true);

    const initialTotal = store.resources().length;
    store.uploadResource({
      title: 'Quadratic Equations Worksheet',
      className: 'SSS 2A',
      subject: 'Mathematics',
      week: 'Week 4',
      topic: 'Algebra',
      resourceType: 'Worksheet',
      audience: 'Learners',
      format: 'PDF',
      isLowDataVersion: true,
      description: 'Practice worksheet for factoring quadratic equations.',
    });
    expect(store.isUploadResourceModalOpen()).toBe(false);
    expect(store.resources().length).toBe(initialTotal + 1);
    expect(store.resources()[0].title).toBe('Quadratic Equations Worksheet');
    expect(store.resources()[0].approvalStatus).toBe('Pending Review');

    // Approve resource
    const pendingItem = store.resources()[0];
    const initialApproved = store.resourcesSummaryMetrics().approvedResources;
    store.approveResource(pendingItem.id);
    expect(
      store.resources().find((r) => r.id === pendingItem.id)?.approvalStatus,
    ).toBe('Approved');
    expect(store.resourcesSummaryMetrics().approvedResources).toBe(
      initialApproved + 1,
    );

    // Link delivery pack modal & mutation
    expect(store.isLinkDeliveryPackModalOpen()).toBe(false);
    store.openLinkDeliveryPackModal(pendingItem);
    expect(store.isLinkDeliveryPackModalOpen()).toBe(true);
    store.linkResourceToDeliveryPack({
      resourceId: pendingItem.id,
      deliveryPackId: 'SSS 2A - Math W4',
      className: 'SSS 2A',
      subject: 'Mathematics',
      week: 'Week 4',
    });
    expect(store.isLinkDeliveryPackModalOpen()).toBe(false);
    expect(
      store.resources().find((r) => r.id === pendingItem.id)
        ?.linkedDeliveryPack,
    ).toBe('SSS 2A - Math W4');

    // Details modal
    store.openResourceDetails(pendingItem);
    expect(store.selectedResourceItem()?.id).toBe(pendingItem.id);
    store.closeResourceDetails();
    expect(store.selectedResourceItem()).toBeNull();

    // Export report
    expect(store.isExportResourceModalOpen()).toBe(false);
    store.openExportResourceModal();
    expect(store.isExportResourceModalOpen()).toBe(true);
    store.exportResourceReport('CSV');
    expect(store.isExportResourceModalOpen()).toBe(false);
    expect(store.setupSaveStatus()).toContain('CSV');
  });

  it('manages communication state and mutations', () => {
    // Initial summary metrics (.design/SCHOOL ADMIN/Communication_SA.png)
    expect(store.communicationSummaryMetrics().totalMessagesSent).toBe(428);
    expect(store.communicationSummaryMetrics().announcementsPublished).toBe(24);
    expect(store.communicationSummaryMetrics().parentCommunications).toBe(276);
    expect(store.communicationSummaryMetrics().pendingReplies).toBe(37);

    // Initial sidebar summary & attention items
    expect(store.communicationSidebarSummary().messagesThisWeek).toBe(96);
    expect(store.communicationSidebarSummary().parentRecipients).toBe(2184);
    expect(store.communicationSidebarSummary().teachersReached).toBe(156);
    expect(store.communicationSidebarSummary().deliveryRate).toBe(94.2);
    expect(store.communicationAttentionItems().length).toBe(3);

    // Default tab is 'announcements'
    expect(store.activeCommunicationTab()).toBe('announcements');
    expect(store.filteredCommunicationMessages().length).toBeGreaterThanOrEqual(
      6,
    );

    // Switch tab to 'teacher-messages'
    store.setActiveCommunicationTab('teacher-messages');
    expect(store.activeCommunicationTab()).toBe('teacher-messages');
    expect(
      store
        .filteredCommunicationMessages()
        .every(
          (m) =>
            m.tab === 'teacher-messages' || m.audience.includes('Teachers'),
        ),
    ).toBe(true);

    // Switch tab to 'parent-messages'
    store.setActiveCommunicationTab('parent-messages');
    expect(store.activeCommunicationTab()).toBe('parent-messages');
    expect(
      store
        .filteredCommunicationMessages()
        .every(
          (m) => m.tab === 'parent-messages' || m.audience.includes('Parents'),
        ),
    ).toBe(true);

    // Switch tab to 'logs'
    store.setActiveCommunicationTab('logs');
    expect(store.activeCommunicationTab()).toBe('logs');
    expect(store.filteredCommunicationMessages().length).toBe(
      store.communicationMessages().length,
    );

    // Reset to announcements tab
    store.setActiveCommunicationTab('announcements');

    // Search query filter
    store.setCommunicationSearchQuery('PTA');
    expect(
      store
        .filteredCommunicationMessages()
        .some((m) => m.messageTitle.includes('PTA')),
    ).toBe(true);
    store.setCommunicationSearchQuery('');

    // Audience filter
    store.setCommunicationAudienceFilter('All Parents');
    expect(
      store
        .filteredCommunicationMessages()
        .every((m) => m.audience === 'All Parents'),
    ).toBe(true);
    store.setCommunicationAudienceFilter('All Audiences');

    // Category filter
    store.setCommunicationCategoryFilter('Events');
    expect(
      store
        .filteredCommunicationMessages()
        .every((m) => m.category === 'Events'),
    ).toBe(true);
    store.setCommunicationCategoryFilter('All Categories');

    // Status filter
    store.setCommunicationStatusFilter('Delivered');
    expect(
      store
        .filteredCommunicationMessages()
        .every((m) => m.deliveryStatus === 'Delivered'),
    ).toBe(true);
    store.setCommunicationStatusFilter('All Statuses');

    // Attention item filter toggle
    const failedAttention = store
      .communicationAttentionItems()
      .find((a) => a.filterType === 'failed');
    if (failedAttention) {
      store.selectCommunicationAttentionItem(failedAttention);
      expect(store.selectedCommunicationAttentionItem()?.id).toBe(
        failedAttention.id,
      );
      expect(
        store
          .filteredCommunicationMessages()
          .every((m) => m.deliveryStatus === 'Failed'),
      ).toBe(true);

      // Deselect by clicking again
      store.selectCommunicationAttentionItem(failedAttention);
      expect(store.selectedCommunicationAttentionItem()).toBeNull();
    }

    // Pagination
    store.setCommunicationPage(2);
    expect(store.communicationPage()).toBe(2);
    store.setCommunicationPage(1);

    // Create Announcement Modal & Mutation
    expect(store.isCreateAnnouncementModalOpen()).toBe(false);
    store.openCreateAnnouncementModal();
    expect(store.isCreateAnnouncementModalOpen()).toBe(true);

    const initialTotal = store.communicationMessages().length;
    const initialAnnouncements =
      store.communicationSummaryMetrics().announcementsPublished;
    store.createAnnouncement({
      title: 'Inter-House Sports Competition Notice',
      audience: 'All Students & Parents',
      category: 'Events',
      channels: ['In-App', 'Email'],
      body: 'The annual inter-house sports competition will hold on June 12.',
    });
    expect(store.isCreateAnnouncementModalOpen()).toBe(false);
    expect(store.communicationMessages().length).toBe(initialTotal + 1);
    expect(store.communicationMessages()[0].messageTitle).toBe(
      'Inter-House Sports Competition Notice',
    );
    expect(store.communicationSummaryMetrics().announcementsPublished).toBe(
      initialAnnouncements + 1,
    );

    // Send Parent Message Modal & Mutation
    expect(store.isSendParentMessageModalOpen()).toBe(false);
    store.openSendParentMessageModal();
    expect(store.isSendParentMessageModalOpen()).toBe(true);

    const initialParentComm =
      store.communicationSummaryMetrics().parentCommunications;
    store.sendParentMessage({
      className: 'JSS 1A',
      recipientAudience: 'Selected Parents',
      subject: 'Special Science Workshop Invitation',
      category: 'Academics',
      body: 'Your ward has been selected for the STEM robotics clinic.',
      priority: 'Normal',
    });
    expect(store.isSendParentMessageModalOpen()).toBe(false);
    expect(store.communicationSummaryMetrics().parentCommunications).toBe(
      initialParentComm + 1,
    );

    // Message details modal
    const testMsg = store.communicationMessages()[0];
    store.openMessageDetails(testMsg);
    expect(store.selectedCommunicationMessage()?.id).toBe(testMsg.id);
    store.closeMessageDetails();
    expect(store.selectedCommunicationMessage()).toBeNull();

    // Resend failed message
    const failedMsg = store
      .communicationMessages()
      .find((m) => m.deliveryStatus === 'Failed');
    if (failedMsg) {
      store.resendFailedMessage(failedMsg.id);
      expect(
        store.communicationMessages().find((m) => m.id === failedMsg.id)
          ?.deliveryStatus,
      ).toBe('Delivered');
    }

    // Schedule blast modal toggle
    expect(store.isScheduleBlastModalOpen()).toBe(false);
    store.openScheduleBlastModal();
    expect(store.isScheduleBlastModalOpen()).toBe(true);
    store.closeScheduleBlastModal();
    expect(store.isScheduleBlastModalOpen()).toBe(false);

    // Export communication report
    expect(store.isExportCommunicationModalOpen()).toBe(false);
    store.openExportCommunicationModal();
    expect(store.isExportCommunicationModalOpen()).toBe(true);
    store.exportCommunicationReport('PDF');
    expect(store.isExportCommunicationModalOpen()).toBe(false);
    expect(store.setupSaveStatus()).toContain('PDF');
  });

  it('manages settings and permissions state, dirty tracking, filters, and mutations', () => {
    // Initial KPI Metrics
    expect(store.settingsSummaryMetrics().totalRoles).toBe(12);
    expect(store.settingsSummaryMetrics().activePermissionSets).toBe(24);
    expect(store.settingsSummaryMetrics().pendingApprovalChanges).toBe(8);
    expect(store.settingsSummaryMetrics().twoFactorEnabled).toBe(87);
    expect(store.settingsSummaryMetrics().auditAlerts).toBe(3);

    // Initial General Settings
    expect(store.activeSettingsTab()).toBe('general');
    expect(store.generalSettings().schoolName).toBe('Greenfield Academy');
    expect(store.generalSettings().portalName).toBe('Learno School Portal');
    expect(store.generalSettings().primaryColor).toBe('#6D28D9');
    expect(store.isGeneralSettingsDirty()).toBe(false);

    // Initial Sidebar Summaries
    expect(store.generalSettingsSummary().length).toBe(6);
    expect(store.generalSettingsAttentionItems().length).toBe(3);
    expect(store.permissionSidebarSummary().activeRoles).toBe(9);
    expect(store.permissionSidebarSummary().customRoles).toBe(5);
    expect(store.permissionAttentionItems().length).toBe(4);

    // Dirty state tracking & Save
    store.updateGeneralSettings({
      schoolName: 'Greenfield International Academy',
    });
    expect(store.isGeneralSettingsDirty()).toBe(true);
    store.saveGeneralSettings();
    expect(store.isGeneralSettingsDirty()).toBe(false);
    expect(store.generalSettings().schoolName).toBe(
      'Greenfield International Academy',
    );
    expect(store.setupSaveStatus()).toContain('Settings saved successfully');

    // Discard mutation
    store.updateGeneralSettings({ phone: '+1 (555) 999-8888' });
    expect(store.isGeneralSettingsDirty()).toBe(true);
    expect(store.isConfirmDiscardModalOpen()).toBe(false);
    store.openDiscardConfirmModal();
    expect(store.isConfirmDiscardModalOpen()).toBe(true);
    store.discardGeneralSettings();
    expect(store.isConfirmDiscardModalOpen()).toBe(false);
    expect(store.isGeneralSettingsDirty()).toBe(false);
    expect(store.generalSettings().phone).toBe('+1 (555) 123-4567');

    // Switch Tab to Roles & Permissions
    store.setActiveSettingsTab('roles-permissions');
    expect(store.activeSettingsTab()).toBe('roles-permissions');
    expect(store.schoolRoles().length).toBe(6);
    expect(store.filteredSchoolRoles().length).toBe(6);

    // Search Filter
    store.setRoleSearchQuery('Vice Principal');
    expect(store.filteredSchoolRoles().length).toBe(1);
    expect(store.filteredSchoolRoles()[0].name).toBe(
      'Vice Principal Academics',
    );
    store.setRoleSearchQuery('');

    // Access Scope Filter
    store.setRoleAccessScopeFilter('Assigned Classes');
    expect(store.filteredSchoolRoles().length).toBe(2);
    expect(store.filteredSchoolRoles().map((r) => r.name)).toContain('Teacher');
    expect(store.filteredSchoolRoles().map((r) => r.name)).toContain(
      'Class Teacher',
    );
    store.setRoleAccessScopeFilter('All Scopes');

    // Permission Level Filter
    store.setRolePermissionLevelFilter('Full Access');
    expect(store.filteredSchoolRoles().length).toBe(1);
    expect(store.filteredSchoolRoles()[0].name).toBe('School Admin');
    store.setRolePermissionLevelFilter('All Levels');

    // Status Filter
    store.setRoleStatusFilter('Review Needed');
    expect(store.filteredSchoolRoles().length).toBe(1);
    expect(store.filteredSchoolRoles()[0].name).toBe('Class Teacher');
    store.setRoleStatusFilter('All Statuses');

    // Attention Item Selection
    const pendingItem = store
      .permissionAttentionItems()
      .find((i) => i.id === 'att-perm-1');
    if (pendingItem) {
      store.selectSettingsAttentionItem(pendingItem);
      expect(store.selectedSettingsAttentionItem()?.id).toBe(pendingItem.id);
      expect(store.filteredSchoolRoles().length).toBe(1);
      expect(store.filteredSchoolRoles()[0].status).toBe('Review Needed');
      // Toggle off
      store.selectSettingsAttentionItem(pendingItem);
      expect(store.selectedSettingsAttentionItem()).toBeNull();
      expect(store.filteredSchoolRoles().length).toBe(6);
    }

    // Pagination
    store.setRolePageSize(4);
    expect(store.rolesTotalPages()).toBe(2);
    expect(store.paginatedSchoolRoles().length).toBe(4);
    store.setRolePage(2);
    expect(store.rolePage()).toBe(2);
    expect(store.paginatedSchoolRoles().length).toBe(2);
    store.setRolePageSize(10);
    expect(store.rolePage()).toBe(1);

    // Role Details Modal
    const roleSample = store.schoolRoles()[0];
    expect(store.selectedRole()).toBeNull();
    store.openRoleDetails(roleSample);
    expect(store.selectedRole()?.id).toBe(roleSample.id);
    store.closeRoleDetails();
    expect(store.selectedRole()).toBeNull();

    // Create Role Modal & Mutation
    expect(store.isCreateRoleModalOpen()).toBe(false);
    store.openCreateRoleModal();
    expect(store.isCreateRoleModalOpen()).toBe(true);

    const initialTotalRoles = store.settingsSummaryMetrics().totalRoles;
    const initialCustomRoles = store.permissionSidebarSummary().customRoles;
    store.createRole({
      name: 'Department Head',
      description: 'Departmental leadership and curriculum review',
      accessScope: 'All School',
      permissionLevel: 'High Access',
      usersAssigned: 8,
    });
    expect(store.isCreateRoleModalOpen()).toBe(false);
    expect(store.settingsSummaryMetrics().totalRoles).toBe(
      initialTotalRoles + 1,
    );
    expect(store.permissionSidebarSummary().customRoles).toBe(
      initialCustomRoles + 1,
    );
    expect(store.schoolRoles()[0].name).toBe('Department Head');

    // Export Permission Report Modal
    expect(store.isExportPermissionModalOpen()).toBe(false);
    store.openExportPermissionModal();
    expect(store.isExportPermissionModalOpen()).toBe(true);
    store.exportPermissionReport('CSV');
    expect(store.isExportPermissionModalOpen()).toBe(false);
    expect(store.setupSaveStatus()).toContain('CSV');
  });
});
