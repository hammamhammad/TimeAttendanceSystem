
export interface ReportFilter {
    fromDate: string; // ISO Date
    toDate: string; // ISO Date
    branchId?: number;
    departmentId?: number;
    employeeId?: number;
}

export interface AttendanceReportItem {
    employeeId: number;
    employeeName: string;
    departmentName: string;
    date: string;
    shiftName: string;
    checkIn?: string; // Time span string "09:00:00"
    checkOut?: string;
    status: string;
    workedHours: number;
    lateMinutes: number;
    overtimeMinutes: number;
    isRegularHoliday: boolean;
    isPublicHoliday: boolean;
    weeklyTotalHours?: number;
    weeklyRequiredHours?: number;
    weeklyOvertimeHours?: number;
    weeklyShortageHours?: number;
}

export interface AttendanceReportSummary {
    filter: ReportFilter;
    items: AttendanceReportItem[];
    totalDays: number;
    totalPresent: number;
    totalAbsent: number;
    totalLate: number;
    totalLeaves: number;
}

export interface LeaveReportItem {
    employeeId: number;
    employeeName: string;
    departmentName: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    status: string;
    reason: string;
}

export interface LeaveReportSummary {
    filter: ReportFilter;
    items: LeaveReportItem[];
    totalRequests: number;
    totalApprovedDays: number;
}
