export type SubscriptionPlanType =
  | 'Enterprise'
  | 'Professional'
  | 'Starter'
  | 'Trial';

export type BillingCycle = 'Annual' | 'Quarterly' | 'Monthly';

export type SubscriptionStatus =
  | 'Active'
  | 'Expiring Soon'
  | 'Payment Failed'
  | 'Trial'
  | 'Suspended';

export interface SubscriptionMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  tone: 'purple' | 'primary' | 'amber' | 'danger' | 'success' | 'indigo';
  icon: string;
  comparisonPeriod: string;
}

export interface SchoolSubscription {
  id: string;
  schoolId: string;
  schoolName: string;
  domain: string;
  logoBg: string;
  logoColor: string;
  logoIcon: string;
  plan: SubscriptionPlanType;
  billingCycle: BillingCycle;
  renewalDate: string;
  renewalRemainingDays: number;
  renewalLabel: string;
  isExpired?: boolean;
  amount: number;
  currency: string;
  amountFormatted: string;
  cycleRate: string;
  status: SubscriptionStatus;
  lastPaymentDate: string;
  lastPaymentAmount: string;
  lastPaymentStatus: 'Success' | 'Failed' | 'Pending' | 'None';
  seatsAllocated: number;
  seatsUsed: number;
}

export interface SubscriptionPlanDefinition {
  id: string;
  name: SubscriptionPlanType;
  tagline: string;
  priceAnnual: number;
  priceQuarterly: number;
  priceMonthly: number;
  maxLearners: number | string;
  features: string[];
  isPopular?: boolean;
  activeSchoolsCount: number;
}

export interface SubscriptionInvoice {
  id: string;
  invoiceNumber: string;
  schoolName: string;
  schoolDomain: string;
  plan: SubscriptionPlanType;
  amount: number;
  amountFormatted: string;
  issueDate: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Failed';
}

export interface SubscriptionBottomMetric {
  id: string;
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: string;
  tone: 'primary' | 'success' | 'danger' | 'purple';
  sparkline?: number[];
  comparisonPeriod?: string;
  statusBadge?: string;
  statusTone?: 'success' | 'warning' | 'danger';
}

export interface RevenueOverviewCategory {
  name: string;
  percentage: number;
  amount: number;
  amountFormatted: string;
  color: string;
}

export interface RenewalQueueItem {
  id: string;
  periodLabel: string;
  count: number;
  icon: string;
  tone: 'primary' | 'info' | 'success' | 'danger';
}

export interface RecentBillingActivity {
  id: string;
  type:
    | 'invoice_sent'
    | 'payment_received'
    | 'payment_failed'
    | 'subscription_suspended';
  title: string;
  schoolName: string;
  timestamp: string;
  icon: string;
  tone: 'primary' | 'success' | 'danger' | 'purple';
}

export interface PlanDistributionItem {
  plan: string;
  percentage: number;
  count: number;
  color: string;
}

export interface BillingHealth {
  percentage: number;
  statusLabel: string;
  comparison: string;
  change: string;
  trend: 'up' | 'down';
}
