export type SettingsTabId =
  | 'general'
  | 'academic'
  | 'branding'
  | 'notifications'
  | 'integrations'
  | 'security'
  | 'storage'
  | 'feature-flags'
  | 'privacy'
  | 'maintenance';

export interface SettingsTab {
  id: SettingsTabId;
  label: string;
  icon: string;
  description?: string;
  badge?: string;
}

export interface SettingsTopMetric {
  id: string;
  title: string;
  value: string;
  subtext: string;
  icon: string;
  iconColor: string;
  statusColor?: string;
  hasProgressBar?: boolean;
  progressPercentage?: number;
}

export interface PlatformIdentitySettings {
  platformName: string;
  supportEmail: string;
  defaultTimezone: string;
  regionalFormat: string;
  academicNamingConvention: string;
}

export interface AcademicDefaultsSettings {
  termStructure: string;
  gradingScaleTemplate: string;
  reportCardDefault: string;
  curriculumSource: string;
  classNamingConvention: string;
}

export interface AccessSecuritySettings {
  passwordPolicy: string;
  twoFactorAuthentication: boolean;
  sessionTimeout: string;
  ipRestrictions: string;
  roleBasedAccessControl: boolean;
}

export interface NotificationSettings {
  emailAlerts: boolean;
  inAppAlerts: boolean;
  escalationNotices: boolean;
  schoolOnboardingAlerts: boolean;
}

export interface FileStorageSettings {
  maxUploadSize: string;
  allowedFileTypes: string;
  lowDataCompression: boolean;
  mediaRetentionRule: string;
}

export interface IntegrationsSettings {
  paymentGateway: string;
  emailService: string;
  videoPlatform: string;
  analyticsIntegration: string;
  apiStatus: string;
}

export interface FeatureControlsSettings {
  parentPortal: boolean;
  liveClasses: boolean;
  portfolioModule: boolean;
  safeguardingCaseModule: boolean;
}

export interface BackupMaintenanceSettings {
  lastBackup: string;
  backupCadence: string;
  maintenanceWindow: string;
  systemStatus: string;
}

export interface SystemSettingsState {
  platformIdentity: PlatformIdentitySettings;
  academicDefaults: AcademicDefaultsSettings;
  accessSecurity: AccessSecuritySettings;
  notifications: NotificationSettings;
  fileStorage: FileStorageSettings;
  integrations: IntegrationsSettings;
  featureControls: FeatureControlsSettings;
  backupMaintenance: BackupMaintenanceSettings;
}

export interface SystemHealthItem {
  name: string;
  status: 'Healthy' | 'Degraded' | 'Down';
  latency: string;
  uptime: string;
  lastChecked: string;
  cpuLoad?: string;
  memoryUsage?: string;
}

export interface RecentConfigChange {
  id: string;
  action: string;
  author: string;
  timeAgo: string;
  timestamp: string;
  category: string;
  details?: string;
}

export interface SettingsBottomMetric {
  id: string;
  title: string;
  value: string;
  changeText: string;
  isPositive: boolean;
  sparklineData: number[];
  color: string;
}

export interface ExportConfigOptions {
  format: 'json' | 'yaml' | 'csv';
  maskSecrets: boolean;
  includeAuditHash: boolean;
  prettyPrint: boolean;
}
