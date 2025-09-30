import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AttendanceRecord,
  AttendanceTransaction,
  AttendanceStatistics,
  AttendanceReportRequest,
  CreateAttendanceTransactionRequest,
  AttendanceGenerationResult,
  AttendanceDashboardData,
  UpdateAttendanceRecordRequest,
  BulkAttendanceUpdateRequest,
  BulkUpdateResult,
  BulkCalculationRequest,
  BulkCalculationResult
} from '../../shared/models/attendance.model';
import { LeaveExcuseDetailsResponse } from '../../shared/models/leave-excuse-details.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/attendance`;

  constructor(private http: HttpClient) {}

  /**
   * Get attendance report with filtering and pagination
   */
  getAttendanceReport(request: AttendanceReportRequest): Observable<AttendanceRecord[]> {
    return this.http.post<AttendanceRecord[]>(`${this.apiUrl}/report`, request);
  }

  /**
   * Get attendance record for specific employee and date
   */
  getEmployeeAttendanceRecord(employeeId: number, date: string): Observable<AttendanceRecord> {
    return this.http.get<AttendanceRecord>(`${this.apiUrl}/employee/${employeeId}/date/${date}`);
  }

  /**
   * Create a new attendance transaction
   */
  createTransaction(request: CreateAttendanceTransactionRequest): Observable<AttendanceTransaction> {
    return this.http.post<AttendanceTransaction>(`${this.apiUrl}/transactions`, request);
  }

  /**
   * Get specific attendance transaction by ID
   */
  getTransaction(id: number): Observable<AttendanceTransaction> {
    return this.http.get<AttendanceTransaction>(`${this.apiUrl}/transactions/${id}`);
  }

  /**
   * Get attendance statistics for specified period
   */
  getAttendanceStatistics(
    startDate: string,
    endDate: string,
    branchId?: number,
    departmentId?: number
  ): Observable<AttendanceStatistics> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    if (branchId) {
      params = params.set('branchId', branchId.toString());
    }
    if (departmentId) {
      params = params.set('departmentId', departmentId.toString());
    }

    return this.http.get<AttendanceStatistics>(`${this.apiUrl}/statistics`, { params });
  }

  /**
   * Get incomplete attendance records (missing check-out)
   */
  getIncompleteRecords(branchId?: number, upToDate?: string): Observable<AttendanceRecord[]> {
    let params = new HttpParams();

    if (branchId) {
      params = params.set('branchId', branchId.toString());
    }
    if (upToDate) {
      params = params.set('upToDate', upToDate);
    }

    return this.http.get<AttendanceRecord[]>(`${this.apiUrl}/incomplete`, { params });
  }

  /**
   * Generate attendance records for a specific date (Admin only)
   */
  generateAttendance(date: string, branchId?: number): Observable<AttendanceGenerationResult> {
    let params = new HttpParams();

    if (branchId) {
      params = params.set('branchId', branchId.toString());
    }

    return this.http.post<AttendanceGenerationResult>(
      `${this.apiUrl}/generate/${date}`,
      {},
      { params }
    );
  }

  /**
   * Run the daily attendance generation process (Admin only)
   * This simulates the background job that runs automatically each day
   */
  runDailyGeneration(): Observable<AttendanceGenerationResult> {
    return this.http.post<AttendanceGenerationResult>(`${this.apiUrl}/generate/daily`, {});
  }

  /**
   * Get dashboard data with today's statistics and recent activity
   */
  getDashboardData(branchId?: number, departmentId?: number): Observable<AttendanceDashboardData> {
    let params = new HttpParams();

    if (branchId) {
      params = params.set('branchId', branchId.toString());
    }
    if (departmentId) {
      params = params.set('departmentId', departmentId.toString());
    }

    return this.http.get<AttendanceDashboardData>(`${this.apiUrl}/dashboard`, { params });
  }

  /**
   * Get attendance record by ID
   */
  getAttendanceById(attendanceId: number): Observable<AttendanceRecord> {
    return this.http.get<AttendanceRecord>(`${this.apiUrl}/${attendanceId}`);
  }

  /**
   * Get attendance records for a specific date range and employee
   */
  getEmployeeAttendanceHistory(
    employeeId: number,
    startDate: string,
    endDate: string
  ): Observable<AttendanceRecord[]> {
    const request: AttendanceReportRequest = {
      startDate,
      endDate,
      employeeId,
      includeTransactions: true,
      includeWorkingDayAnalysis: true,
      pageNumber: 1,
      pageSize: 1000 // Large number to get all records
    };

    return this.getAttendanceReport(request);
  }

  /**
   * Get comprehensive attendance history for a specific employee with absent days included.
   * This method ensures that missing attendance records are generated as "Absent" status.
   */
  getEmployeeAttendanceHistoryComplete(
    employeeId: number,
    startDate: string,
    endDate: string
  ): Observable<AttendanceRecord[]> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<AttendanceRecord[]>(`${this.apiUrl}/employee/${employeeId}/history`, { params });
  }

  /**
   * Get daily attendance for all employees on a specific date
   */
  getDailyAttendance(
    date: string,
    branchId?: number,
    departmentId?: number,
    employeeId?: number
  ): Observable<AttendanceRecord[]> {
    const request: AttendanceReportRequest = {
      startDate: date,
      endDate: date,
      branchId,
      departmentId,
      employeeId,
      includeTransactions: false,
      includeWorkingDayAnalysis: false,
      pageNumber: 1,
      pageSize: 1000
    };

    return this.getAttendanceReport(request);
  }

  /**
   * Bulk create transactions (for import functionality)
   */
  bulkCreateTransactions(transactions: CreateAttendanceTransactionRequest[]): Observable<AttendanceTransaction[]> {
    // This would require a bulk endpoint on the backend
    // For now, we'll make individual calls
    return new Observable(observer => {
      const results: AttendanceTransaction[] = [];
      let completed = 0;

      transactions.forEach(transaction => {
        this.createTransaction(transaction).subscribe({
          next: (result) => {
            results.push(result);
            completed++;
            if (completed === transactions.length) {
              observer.next(results);
              observer.complete();
            }
          },
          error: (error) => observer.error(error)
        });
      });
    });
  }

  /**
   * Get transactions by date
   */
  getTransactionsByDate(date: string): Observable<AttendanceTransaction[]> {
    return this.http.get<AttendanceTransaction[]>(`${this.apiUrl}/transactions/date/${date}`);
  }

  /**
   * Delete transaction
   */
  deleteTransaction(transactionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/transactions/${transactionId}`);
  }

  /**
   * Get employee attendance records (multiple records)
   */
  getEmployeeAttendanceRecords(
    employeeId: number,
    startDate: string,
    endDate: string
  ): Observable<AttendanceRecord[]> {
    return this.getEmployeeAttendanceHistory(employeeId, startDate, endDate);
  }

  /**
   * Get employee recent transactions
   */
  getEmployeeRecentTransactions(employeeId: number, limit: number = 10): Observable<AttendanceTransaction[]> {
    let params = new HttpParams()
      .set('employeeId', employeeId.toString())
      .set('limit', limit.toString());

    return this.http.get<AttendanceTransaction[]>(`${this.apiUrl}/transactions/recent`, { params });
  }

  /**
   * Get attendance record by ID for editing
   */
  getAttendanceRecordById(recordId: number): Observable<AttendanceRecord> {
    return this.http.get<AttendanceRecord>(`${this.apiUrl}/${recordId}`);
  }

  /**
   * Update attendance record with manual overrides
   */
  updateAttendanceRecord(recordId: number, request: UpdateAttendanceRecordRequest): Observable<AttendanceRecord> {
    return this.http.put<AttendanceRecord>(`${this.apiUrl}/${recordId}`, request);
  }

  /**
   * Update multiple attendance records in bulk
   */
  bulkUpdateAttendanceRecords(requests: BulkAttendanceUpdateRequest[]): Observable<BulkUpdateResult[]> {
    return this.http.put<BulkUpdateResult[]>(`${this.apiUrl}/bulk-update`, requests);
  }

  // ====================================================================
  // ENHANCED MANUAL CALCULATION METHODS
  // ====================================================================

  /**
   * Manually calculate attendance for a specific employee on a specific date.
   * This allows manual recalculation of attendance based on the shift assigned on that date.
   */
  calculateAttendanceForEmployeeDate(employeeId: number, date: string): Observable<AttendanceRecord> {
    return this.http.post<AttendanceRecord>(`${this.apiUrl}/calculate/employee/${employeeId}/date/${date}`, {});
  }

  /**
   * Manually calculate attendance for all employees on a specific date.
   * This forces recalculation/generation for all active employees.
   */
  calculateAttendanceForDate(date: string, forceRecalculate: boolean = false): Observable<AttendanceGenerationResult> {
    let params = new HttpParams();
    if (forceRecalculate) {
      params = params.set('forceRecalculate', forceRecalculate.toString());
    }

    return this.http.post<AttendanceGenerationResult>(`${this.apiUrl}/calculate/date/${date}`, {}, { params });
  }

  /**
   * Bulk manual calculation for multiple employees and dates.
   * Useful for fixing attendance records after system issues or data imports.
   */
  bulkCalculateAttendance(request: BulkCalculationRequest): Observable<BulkCalculationResult> {
    return this.http.post<BulkCalculationResult>(`${this.apiUrl}/calculate/bulk`, request);
  }

  /**
   * Recalculate a specific attendance record (useful after editing transactions)
   */
  recalculateAttendanceRecord(recordId: number): Observable<AttendanceRecord> {
    return this.http.post<AttendanceRecord>(`${this.apiUrl}/${recordId}/recalculate`, {});
  }

  /**
   * Force generation of attendance record for employee on specific date
   * This is useful when an employee was added after the daily generation ran
   */
  forceGenerateAttendanceRecord(employeeId: number, date: string): Observable<AttendanceRecord> {
    return this.calculateAttendanceForEmployeeDate(employeeId, date);
  }

  /**
   * Change shift for a specific attendance record
   * This creates a temporary shift assignment for the attendance date and recalculates attendance
   */
  changeAttendanceShift(changeData: {attendanceId: number, shiftId: number, notes?: string}): Observable<AttendanceRecord> {
    const request = {
      shiftId: changeData.shiftId,
      notes: changeData.notes
    };
    return this.http.post<AttendanceRecord>(`${this.apiUrl}/${changeData.attendanceId}/change-shift`, request);
  }

  /**
   * Get monthly attendance report with summary statistics and employee records
   */
  getMonthlyReport(request: {
    month: number;
    year: number;
    branchIds?: number[];
    departmentIds?: number[];
    employeeIds?: number[];
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/monthly-report`, request);
  }

  /**
   * Get leave, excuse, and remote work details for a specific employee and date.
   * Used in the Daily Attendance Detail page to show comprehensive absence information.
   */
  getLeaveExcuseDetails(employeeId: number, date: string): Observable<LeaveExcuseDetailsResponse> {
    let params = new HttpParams().set('date', date);
    return this.http.get<LeaveExcuseDetailsResponse>(`${this.apiUrl}/employee/${employeeId}/leave-excuse-details`, { params });
  }
}