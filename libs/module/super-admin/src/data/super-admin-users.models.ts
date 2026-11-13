export type UserRole =
  | 'Super Admin'
  | 'School Admin'
  | 'Teacher'
  | 'Learner'
  | 'Parent';

export type UserStatus = 'Active' | 'Invited' | 'Pending' | 'Suspended';

export type UserTab = 'all' | 'roles' | 'pending' | 'logs';

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution: string;
  institutionId?: string;
  status: UserStatus;
  mfaEnabled: boolean;
  lastActive: string;
  initials: string;
  avatarColor: string;
  phone?: string;
  createdAt: string;
  region: string;
  sessionsCount?: number;
}

export interface UsersMetric {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  changeText: string;
  trend: 'up' | 'down';
  icon: string;
  tone:
    | 'primary'
    | 'warning'
    | 'purple'
    | 'success'
    | 'danger'
    | 'info'
    | 'pink';
}

export interface RoleDistributionItem {
  role: UserRole;
  count: number;
  percentage: number;
  color: string;
}

export interface RoleDistribution {
  items: RoleDistributionItem[];
  totalUsers: number;
}

export interface PermissionTemplate {
  id: string;
  role: UserRole;
  name: string;
  assignedUsersCount: number;
  accessLevel:
    | 'Full Access'
    | 'Standard'
    | 'Limited Access'
    | 'Restricted'
    | 'View Only';
  icon: string;
  tone: 'primary' | 'warning' | 'purple' | 'success' | 'danger';
  description: string;
}

export interface AccessActivity {
  id: string;
  userName: string;
  action: string;
  timeAgo: string;
  avatarInitials: string;
  avatarColor: string;
  ipAddress?: string;
}

export interface RolePermissionMatrixItem {
  module: string;
  superAdmin: boolean;
  schoolAdmin: boolean;
  teacher: boolean;
  learner: boolean;
  parent: boolean;
}

export interface AccessLogEntry {
  id: string;
  timestamp: string;
  userName: string;
  userEmail: string;
  role: UserRole;
  action: string;
  status: 'Success' | 'Warning' | 'Failed';
  ipAddress: string;
  device: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  role: UserRole;
  institution: string;
  phone?: string;
  sendInvite: boolean;
  requireMfa: boolean;
}
