export interface ShiftSwapRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNameAr?: string;
  swapWithEmployeeId: number;
  swapWithEmployeeName: string;
  swapWithEmployeeNameAr?: string;
  originalDate: string;
  swapDate: string;
  originalShiftId?: number;
  originalShiftName?: string;
  swapShiftId?: number;
  swapShiftName?: string;
  reason?: string;
  reasonAr?: string;
  status: string;
  statusName: string;
  rejectionReason?: string;
  workflowInstanceId?: number;
  createdAtUtc: string;
}
