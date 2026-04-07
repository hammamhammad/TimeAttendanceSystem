export interface CompensatoryOff {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNameAr?: string;
  employeeNumber: string;
  branchName?: string;
  departmentName?: string;
  earnedDate: string;
  expiryDate: string;
  reason: string;
  reasonAr?: string;
  status: string;
  statusName: string;
  usedVacationId?: number;
  hoursWorked?: number;
  approvedByUserId?: number;
  notes?: string;
  createdAtUtc: string;
}
