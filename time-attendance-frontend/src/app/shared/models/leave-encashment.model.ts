export interface LeaveEncashment {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNameAr?: string;
  employeeNumber: string;
  branchName?: string;
  departmentName?: string;
  vacationTypeId: number;
  vacationTypeName: string;
  vacationTypeNameAr?: string;
  year: number;
  daysEncashed: number;
  amountPerDay: number;
  totalAmount: number;
  status: string;
  statusName: string;
  payrollRecordId?: number;
  approvedByUserId?: number;
  notes?: string;
  createdAtUtc: string;
}

export interface EligibleLeaveType {
  vacationTypeId: number;
  vacationTypeName: string;
  vacationTypeNameAr?: string;
  currentBalance: number;
  maxEncashmentDays?: number;
  alreadyEncashedThisYear: number;
  availableForEncashment: number;
}
