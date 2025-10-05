export interface RemoteWorkPolicy {
  id: number;
  branchId?: number; // Nullable - null means company-wide
  branchName?: string;
  maxDaysPerWeek?: number;
  maxDaysPerMonth?: number;
  maxDaysPerYear?: number;
  requiresManagerApproval: boolean;
  allowConsecutiveDays: boolean;
  maxConsecutiveDays?: number;
  minAdvanceNoticeDays?: number;
  blackoutPeriods?: string;
  countForOvertime: boolean;
  enforceShiftTimes: boolean;
  isActive: boolean;
  createdAtUtc: string;
  modifiedAtUtc?: string;
}

export interface CreateRemoteWorkPolicyRequest {
  branchId?: number; // Nullable - null means company-wide
  maxDaysPerWeek?: number;
  maxDaysPerMonth?: number;
  maxDaysPerYear?: number;
  requiresManagerApproval: boolean;
  allowConsecutiveDays: boolean;
  maxConsecutiveDays?: number;
  minAdvanceNoticeDays?: number;
  blackoutPeriods?: string;
  countForOvertime: boolean;
  enforceShiftTimes: boolean;
  isActive: boolean;
}

export interface UpdateRemoteWorkPolicyRequest {
  id: number;
  maxDaysPerWeek?: number;
  maxDaysPerMonth?: number;
  maxDaysPerYear?: number;
  requiresManagerApproval: boolean;
  allowConsecutiveDays: boolean;
  maxConsecutiveDays?: number;
  minAdvanceNoticeDays?: number;
  blackoutPeriods?: string;
  countForOvertime: boolean;
  enforceShiftTimes: boolean;
}
