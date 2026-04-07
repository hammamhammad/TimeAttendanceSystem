export interface OnCallSchedule {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNameAr?: string;
  employeeNumber: string;
  branchName?: string;
  departmentName?: string;
  startDate: string;
  endDate: string;
  onCallType: string;
  onCallTypeName: string;
  shiftId?: number;
  shiftName?: string;
  notes?: string;
  notesAr?: string;
  isActive: boolean;
  createdAtUtc: string;
}
