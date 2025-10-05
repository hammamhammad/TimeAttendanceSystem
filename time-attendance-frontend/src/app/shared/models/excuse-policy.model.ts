/**
 * Excuse Policy domain models
 * Matches backend ExcusePolicyDto and command structures
 */

export interface ExcusePolicy {
  id: number;
  branchId: number | null;
  branchName: string | null;
  maxPersonalExcusesPerMonth: number;
  maxPersonalExcuseHoursPerMonth: number;
  maxPersonalExcuseHoursPerDay: number;
  maxHoursPerExcuse: number;
  requiresApproval: boolean;
  allowPartialHourExcuses: boolean;
  minimumExcuseDuration: number;
  isActive: boolean;
  maxRetroactiveDays: number;
  allowSelfServiceRequests: boolean;
  createdAtUtc: string;
  createdBy: string;
  modifiedAtUtc?: string;
  modifiedBy?: string;
}

export interface CreateExcusePolicyRequest {
  branchId: number | null;
  maxPersonalExcusesPerMonth: number;
  maxPersonalExcuseHoursPerMonth: number;
  maxPersonalExcuseHoursPerDay: number;
  maxHoursPerExcuse: number;
  requiresApproval: boolean;
  allowPartialHourExcuses: boolean;
  minimumExcuseDuration: number;
  maxRetroactiveDays: number;
  allowSelfServiceRequests: boolean;
}

export interface UpdateExcusePolicyRequest {
  id: number;
  branchId: number | null;
  maxPersonalExcusesPerMonth: number;
  maxPersonalExcuseHoursPerMonth: number;
  maxPersonalExcuseHoursPerDay: number;
  maxHoursPerExcuse: number;
  requiresApproval: boolean;
  allowPartialHourExcuses: boolean;
  minimumExcuseDuration: number;
  maxRetroactiveDays: number;
  allowSelfServiceRequests: boolean;
  isActive: boolean;
}
