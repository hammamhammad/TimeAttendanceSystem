/**
 * Employee vacation record model for frontend consumption.
 * Matches the backend EmployeeVacationDto structure.
 */
export interface EmployeeVacation {
  id: number;
  employeeId: number;
  employeeNumber: string;
  employeeName: string;
  vacationTypeId: number;
  vacationTypeName: string;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  businessDays: number;
  isApproved: boolean;
  notes?: string;
  isCurrentlyActive: boolean;
  isUpcoming: boolean;
  isCompleted: boolean;
  createdAtUtc: Date;
  createdBy: string;
  modifiedAtUtc?: Date;
  modifiedBy?: string;
}

/**
 * Data Transfer Object for creating new employee vacation records.
 */
export interface CreateEmployeeVacationRequest {
  employeeId: number;
  vacationTypeId: number;
  startDate: Date;
  endDate: Date;
  isApproved?: boolean;
  notes?: string;
}

/**
 * Data Transfer Object for updating existing employee vacation records.
 */
export interface UpdateEmployeeVacationRequest {
  vacationTypeId: number;
  startDate: Date;
  endDate: Date;
  isApproved: boolean;
  notes?: string;
}

/**
 * Vacation calendar item for calendar display.
 */
export interface VacationCalendarItem {
  id: number;
  employeeId: number;
  employeeName: string;
  vacationTypeName: string;
  startDate: Date;
  endDate: Date;
  isApproved: boolean;
  color: string;
}

/**
 * Filter options for vacation queries.
 */
export interface VacationFilters {
  employeeId?: number;
  vacationTypeId?: number;
  startDate?: Date;
  endDate?: Date;
  isApproved?: boolean;
  isCurrentlyActive?: boolean;
  isUpcoming?: boolean;
  searchTerm?: string;
  year?: number;
  month?: number;
}

/**
 * Pagination and sorting options for vacation queries.
 */
export interface VacationQueryOptions {
  page?: number;
  pageSize?: number;
  sortBy?: 'StartDate' | 'EndDate' | 'EmployeeName' | 'VacationTypeName' | 'CreatedAtUtc' | 'TotalDays';
  sortDescending?: boolean;
}

/**
 * Complete vacation query parameters combining filters and options.
 */
export interface VacationQueryParams extends VacationFilters, VacationQueryOptions {}

/**
 * Vacation status enumeration for type safety.
 */
export enum VacationStatus {
  All = 'all',
  Approved = 'approved',
  Pending = 'pending',
  Active = 'active',
  Upcoming = 'upcoming',
  Completed = 'completed'
}

/**
 * Vacation form data interface for reactive forms.
 */
export interface VacationFormData {
  employeeId: number | null;
  vacationTypeId: number | null;
  startDate: Date | null;
  endDate: Date | null;
  isApproved: boolean;
  notes: string | null;
}

/**
 * Vacation conflict detection result.
 */
export interface VacationConflict {
  hasConflict: boolean;
  conflictingVacations: EmployeeVacation[];
  message: string;
}

/**
 * Vacation statistics for reporting and dashboard.
 */
export interface VacationStatistics {
  totalVacations: number;
  approvedVacations: number;
  pendingVacations: number;
  activeVacations: number;
  upcomingVacations: number;
  totalDays: number;
  averageDaysPerVacation: number;
}

/**
 * Employee vacation summary for employee-specific views.
 */
export interface EmployeeVacationSummary {
  employeeId: number;
  employeeName: string;
  totalVacationDays: number;
  remainingDays?: number;
  usedDays: number;
  pendingDays: number;
  currentVacation?: EmployeeVacation;
  nextVacation?: EmployeeVacation;
}

/**
 * Vacation type with additional metadata for dropdowns.
 */
export interface VacationTypeOption {
  id: number;
  name: string;
  nameAr?: string;
  isActive: boolean;
  color?: string;
  icon?: string;
}

/**
 * Employee option for dropdowns and selection.
 */
export interface EmployeeOption {
  id: number;
  employeeNumber: string;
  name: string;
  departmentName?: string;
  isActive: boolean;
}

/**
 * Vacation bulk operation request.
 */
export interface VacationBulkOperationRequest {
  vacationIds: number[];
  operation: 'approve' | 'reject' | 'delete';
  reason?: string;
}

/**
 * Vacation import/export data structure.
 */
export interface VacationImportData {
  employeeNumber: string;
  vacationTypeName: string;
  startDate: string;
  endDate: string;
  isApproved: boolean;
  notes?: string;
}

/**
 * Type guard to check if an object is an EmployeeVacation.
 */
export function isEmployeeVacation(obj: any): obj is EmployeeVacation {
  return obj &&
    typeof obj.id === 'number' &&
    typeof obj.employeeId === 'number' &&
    typeof obj.vacationTypeId === 'number' &&
    obj.startDate instanceof Date &&
    obj.endDate instanceof Date;
}

/**
 * Utility function to calculate vacation duration in business days.
 */
export function calculateBusinessDays(startDate: Date, endDate: Date): number {
  let businessDays = 0;
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
      businessDays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return businessDays;
}

/**
 * Utility function to check if a vacation is currently active.
 */
export function isVacationActive(vacation: EmployeeVacation): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(vacation.startDate);
  const endDate = new Date(vacation.endDate);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  return vacation.isApproved && today >= startDate && today <= endDate;
}

/**
 * Utility function to format vacation period as string.
 */
export function formatVacationPeriod(vacation: EmployeeVacation): string {
  const startDate = new Date(vacation.startDate).toLocaleDateString();
  const endDate = new Date(vacation.endDate).toLocaleDateString();

  if (vacation.startDate.getTime() === vacation.endDate.getTime()) {
    return startDate;
  }

  return `${startDate} - ${endDate}`;
}