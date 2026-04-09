export interface TenantDto {
  id: number;
  subdomain: string;
  name: string;
  nameAr: string | null;
  logoUrl: string | null;
  apiBaseUrl: string;
  customDomain: string | null;
  isActive: boolean;
  status: string;
  country: string | null;
  city: string | null;
  industry: string | null;
  phone: string | null;
  email: string | null;
  defaultTimezone: string;
  defaultLanguage: string;
  defaultCurrency: string;
  createdAtUtc: string;
  branchCount: number;
  employeeCount: number;
  subscriptionPlanName: string | null;
  subscriptionStatus: string | null;
}

export interface TenantDetailDto extends TenantDto {
  companyRegistrationNumber: string | null;
  taxIdentificationNumber: string | null;
  address: string | null;
  website: string | null;
  trialStartDate: string | null;
  trialEndDate: string | null;
  databaseName: string | null;
  databaseCreatedAt: string | null;
  subscription: TenantSubscriptionDto | null;
}

export interface TenantSubscriptionDto {
  id: number;
  planId: number;
  planCode: string;
  planName: string;
  planTier: string;
  status: string;
  billingCycle: string;
  startDate: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  enabledModules: string[];
  limits: Record<string, number>;
  addOns: TenantModuleAddOnDto[];
}

export interface TenantModuleAddOnDto {
  module: string;
  monthlyPrice: number;
  activatedAt: string;
  isActive: boolean;
}

export interface SubscriptionPlanDto {
  id: number;
  code: string;
  name: string;
  nameAr: string | null;
  description: string | null;
  descriptionAr: string | null;
  tier: string;
  monthlyPriceUsd: number;
  annualPriceUsd: number;
  currency: string;
  isPublic: boolean;
  isActive: boolean;
  sortOrder: number;
  modules: string[];
  limits: Record<string, number>;
}

export interface CreateTenantRequest {
  subdomain?: string;
  name: string;
  nameAr?: string;
  logoUrl?: string;
  apiBaseUrl?: string;
  customDomain?: string;
  companyRegistrationNumber?: string;
  taxIdentificationNumber?: string;
  industry?: string;
  country?: string;
  city?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  defaultTimezone: string;
  defaultLanguage: string;
  defaultCurrency: string;
  planId?: number | null;
  billingCycle?: string;
}

export interface UpdateTenantRequest {
  name: string;
  nameAr?: string;
  logoUrl?: string;
  apiBaseUrl?: string;
  customDomain?: string;
  companyRegistrationNumber?: string;
  taxIdentificationNumber?: string;
  industry?: string;
  country?: string;
  city?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  defaultTimezone: string;
  defaultLanguage: string;
  defaultCurrency: string;
}

export interface AssignPlanRequest {
  planId: number;
  billingCycle: string;
}

export interface ChangePlanRequest {
  newPlanId: number;
}

export interface TenantsPagedResult {
  items: TenantDto[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export type TenantStatus = 'Active' | 'Suspended' | 'Trial' | 'PendingSetup' | 'Cancelled';
