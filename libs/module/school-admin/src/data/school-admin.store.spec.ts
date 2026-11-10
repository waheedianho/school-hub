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
});
